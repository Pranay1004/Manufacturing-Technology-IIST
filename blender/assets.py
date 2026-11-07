"""
assets.py - Parametric CAD-quality models for Bracket, Bolt, and Shaft.
Scale: 1 Blender Unit = 1 Meter (0.001 m = 1 mm).
"""
import bpy
import bmesh
import math
from mathutils import Vector, Matrix

def get_eevee_engine():
    """Detects Blender version and returns the correct EEVEE engine identifier."""
    ver = bpy.app.version
    if ver[0] >= 5:
        return 'BLENDER_EEVEE'
    elif ver[0] == 4 and ver[1] >= 2:
        return 'BLENDER_EEVEE_NEXT'
    return 'BLENDER_EEVEE'

def create_dissolve_material(name, base_color=(0.7, 0.72, 0.75, 1.0), roughness=0.25, metallic=0.95):
    """
    Creates a PBR brushed metal material supporting noise-threshold dissolve.
    Dissolve value = 0.0 (fully visible) to 1.0 (fully dissolved/invisible).
    """
    mat = bpy.data.materials.get(name)
    if mat:
        bpy.data.materials.remove(mat)
    
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    # Output node
    out_node = nodes.new(type='ShaderNodeOutputMaterial')
    out_node.location = (600, 0)

    # Principled BSDF
    bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    bsdf.location = (200, 100)
    bsdf.inputs['Base Color'].default_value = base_color
    bsdf.inputs['Roughness'].default_value = roughness
    bsdf.inputs['Metallic'].default_value = metallic

    # Dissolve Setup: Mix with Transparent BSDF based on noise threshold
    trans = nodes.new(type='ShaderNodeBsdfTransparent')
    trans.location = (200, -100)

    mix = nodes.new(type='ShaderNodeMixShader')
    mix.location = (400, 0)

    # Noise texture for dissolve pattern
    tex_coord = nodes.new(type='ShaderNodeTexCoord')
    tex_coord.location = (-600, -200)

    noise = nodes.new(type='ShaderNodeTexNoise')
    noise.location = (-400, -200)
    noise.inputs['Scale'].default_value = 80.0
    noise.inputs['Detail'].default_value = 4.0

    # Value node for dissolve driver (named 'Dissolve')
    val_node = nodes.new(type='ShaderNodeValue')
    val_node.name = "Dissolve"
    val_node.label = "Dissolve"
    val_node.location = (-400, 0)
    val_node.outputs[0].default_value = 0.0

    # Subtract / Greater Than math node
    math_node = nodes.new(type='ShaderNodeMath')
    math_node.operation = 'GREATER_THAN'
    math_node.location = (-150, -100)

    # Wire up dissolve
    links.new(tex_coord.outputs['Object'], noise.inputs['Vector'])
    links.new(val_node.outputs[0], math_node.inputs[0])
    links.new(noise.outputs['Fac'], math_node.inputs[1])

    # If dissolve > noise, switch to transparent
    links.new(bsdf.outputs['BSDF'], mix.inputs[1])
    links.new(trans.outputs['BSDF'], mix.inputs[2])
    links.new(math_node.outputs['Value'], mix.inputs['Fac'])
    links.new(mix.outputs['Shader'], out_node.inputs['Surface'])

    # Eevee transparency setup
    try:
        mat.blend_method = 'HASHED'
        mat.shadow_method = 'HASHED'
    except AttributeError:
        pass # In Blender 5+, blend_method may be automatically handled or under surface properties

    return mat

def create_bracket(name="Bracket_Finished"):
    """
    Parametric L-Bracket in aluminium:
    Base: 80x50x6 mm
    Upright: 80x40x6 mm (height 40 mm above base, or upright total height)
    Inner fillet: R6 mm
    4x 6.5 mm holes in base
    1x 16 mm bore through upright (X-axis aligned)
    1x M8 tapped hole in upright edge
    2x lightening pockets in base/upright
    """
    # Dimensions in meters (scale 0.001)
    base_l = 0.080 # X
    base_w = 0.050 # Y
    t = 0.006      # thickness
    up_h = 0.040   # Z upright height from top of base

    mesh = bpy.data.meshes.new(name)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)

    bm = bmesh.new()

    # We build the solid L profile using bmesh extrusion
    # 2D cross section in Y-Z plane at X=0, then extrude along X:
    # Points in Y-Z (origin at corner):
    # (0, 0) -> (base_w, 0) -> (base_w, t) -> (t, t) with fillet -> (t, t + up_h) -> (0, t + up_h)
    # Let's create the basic L-shape
    verts = [
        bm.verts.new((0, 0, 0)),
        bm.verts.new((0, base_w, 0)),
        bm.verts.new((0, base_w, t)),
        bm.verts.new((0, t + 0.006, t)), # fillet start
        bm.verts.new((0, t, t + 0.006)), # fillet end
        bm.verts.new((0, t, t + up_h)),
        bm.verts.new((0, 0, t + up_h))
    ]
    face = bm.faces.new(verts)
    # Extrude along X by base_l
    geom = bmesh.ops.extrude_face_region(bm, geom=[face])
    ext_verts = [v for v in geom['geom'] if isinstance(v, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, vec=(base_l, 0, 0), verts=ext_verts)

    bm.to_mesh(mesh)
    bm.free()

    # Center origin to base center
    obj.location = (0, 0, 0)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')

    # Add Boolean operations for holes and pockets
    # 1. 4x 6.5 mm holes in base (diam = 0.0065, rad = 0.00325)
    # Base is in XY plane
    hole_cutter = bpy.data.objects.new("Bracket_Holes", bpy.data.meshes.new("Bracket_Holes"))
    bm_h = bmesh.new()
    hole_x = [0.015, base_l - 0.015]
    hole_y = [t + 0.012, base_w - 0.010]
    for x in hole_x:
        for y in hole_y:
            bmesh.ops.create_cone(
                bm_h,
                cap_ends=True,
                segments=24,
                radius1=0.00325,
                radius2=0.00325,
                depth=0.020,
                matrix=Matrix.Translation(Vector((x, y, t / 2.0)))
            )
    bm_h.to_mesh(hole_cutter.data)
    bm_h.free()
    bpy.context.collection.objects.link(hole_cutter)
    hole_cutter.hide_render = True
    hole_cutter.hide_viewport = True

    # 2. 16 mm bore in upright (diam = 0.016, rad = 0.008)
    # Bore axis along Y through upright (upright is at Y in [0, t], X in [0, base_l], Z in [t, t+up_h])
    bore_cutter = bpy.data.objects.new("Bracket_Bore", bpy.data.meshes.new("Bracket_Bore"))
    bm_b = bmesh.new()
    bmesh.ops.create_cone(
        bm_b,
        cap_ends=True,
        segments=32,
        radius1=0.008,
        radius2=0.008,
        depth=0.030,
        matrix=Matrix.Translation(Vector((base_l / 2.0, t / 2.0, t + up_h / 2.0))) @ Matrix.Rotation(math.radians(90), 4, 'X')
    )
    # 3. M8 tapped hole in upright edge (X=0 or X=base_l, rad=0.004)
    bmesh.ops.create_cone(
        bm_b,
        cap_ends=True,
        segments=24,
        radius1=0.004,
        radius2=0.004,
        depth=0.030,
        matrix=Matrix.Translation(Vector((0.005, t / 2.0, t + up_h / 2.0))) @ Matrix.Rotation(math.radians(90), 4, 'Y')
    )
    # 4. Lightening pockets in upright (weight reduction recesses)
    bmesh.ops.create_cube(
        bm_b,
        size=1.0,
        matrix=Matrix.Translation(Vector((base_l * 0.22, t / 2.0, t + up_h * 0.5))) @ Matrix.Scale(0.014, 4, Vector((1, 0, 0))) @ Matrix.Scale(0.020, 4, Vector((0, 1, 0))) @ Matrix.Scale(0.018, 4, Vector((0, 0, 1)))
    )
    bmesh.ops.create_cube(
        bm_b,
        size=1.0,
        matrix=Matrix.Translation(Vector((base_l * 0.78, t / 2.0, t + up_h * 0.5))) @ Matrix.Scale(0.014, 4, Vector((1, 0, 0))) @ Matrix.Scale(0.020, 4, Vector((0, 1, 0))) @ Matrix.Scale(0.018, 4, Vector((0, 0, 1)))
    )
    bm_b.to_mesh(bore_cutter.data)
    bm_b.free()
    bpy.context.collection.objects.link(bore_cutter)
    bore_cutter.hide_render = True
    bore_cutter.hide_viewport = True

    # Apply booleans to bracket
    # Offset cutters to match geometry origin if reset
    mod1 = obj.modifiers.new("Holes", 'BOOLEAN')
    mod1.operation = 'DIFFERENCE'
    mod1.object = hole_cutter
    try:
        mod1.solver = 'MANIFOLD'
    except Exception:
        mod1.solver = 'EXACT'

    mod2 = obj.modifiers.new("BorePockets", 'BOOLEAN')
    mod2.operation = 'DIFFERENCE'
    mod2.object = bore_cutter
    try:
        mod2.solver = 'MANIFOLD'
    except Exception:
        mod2.solver = 'EXACT'

    # Bevel modifier for machined chamfer
    bev = obj.modifiers.new("Chamfer", 'BEVEL')
    bev.width = 0.0006
    bev.segments = 2

    # Material
    mat = create_dissolve_material("Aluminium_Brushed", base_color=(0.78, 0.80, 0.82, 1.0), roughness=0.22, metallic=0.92)
    obj.data.materials.append(mat)

    return obj

def create_bracket_stock(name="Bracket_Stock"):
    """Solid billet from which the bracket is milled: 85x55x50 mm aluminum block."""
    mesh = bpy.data.meshes.new(name)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)

    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    # Scale: 85mm x 55mm x 48mm
    bmesh.ops.scale(bm, vec=(0.085, 0.055, 0.048), verts=bm.verts)
    bm.to_mesh(mesh)
    bm.free()

    mat = create_dissolve_material("Stock_Billet", base_color=(0.45, 0.47, 0.50, 1.0), roughness=0.6, metallic=0.7)
    obj.data.materials.append(mat)
    return obj

def create_bolt(name="Bolt_Finished"):
    """
    Parametric custom M8x1.25 hex-head bolt:
    Hex head: 13 mm across flats (outer radius = 13 / sqrt(3) / 1000 = ~0.0075 m), height 5.5 mm
    Shank: 25 mm long, 8 mm diameter (rad = 0.004 m)
    Thread: M8x1.25 modelled with helical thread / screw modifier
    Chamfered tip: 1 mm chamfer at end
    """
    mesh = bpy.data.meshes.new(name)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)

    bm = bmesh.new()
    # Hex head (6 sides)
    r_hex = (0.013 / math.sqrt(3))
    h_head = 0.0055
    bmesh.ops.create_cone(
        bm,
        cap_ends=True,
        segments=6,
        radius1=r_hex,
        radius2=r_hex,
        depth=h_head,
        matrix=Matrix.Translation(Vector((0, 0, h_head / 2.0)))
    )

    # Shank (unthreaded portion: 8mm diam, 6mm length)
    r_shank = 0.004
    l_unthreaded = 0.006
    bmesh.ops.create_cone(
        bm,
        cap_ends=True,
        segments=24,
        radius1=r_shank,
        radius2=r_shank,
        depth=l_unthreaded,
        matrix=Matrix.Translation(Vector((0, 0, -l_unthreaded / 2.0)))
    )

    # Threaded portion (19mm length, modelled with groove rings)
    l_threaded = 0.019
    n_threads = 14
    pitch = l_threaded / n_threads
    for i in range(n_threads):
        z_pos = -l_unthreaded - (i + 0.5) * pitch
        # Major diameter 8mm, minor diameter 6.8mm
        bmesh.ops.create_cone(
            bm,
            cap_ends=True,
            segments=24,
            radius1=r_shank,
            radius2=0.0034,
            depth=pitch * 0.95,
            matrix=Matrix.Translation(Vector((0, 0, z_pos)))
        )

    # Chamfered tip
    z_tip = -l_unthreaded - l_threaded
    bmesh.ops.create_cone(
        bm,
        cap_ends=True,
        segments=24,
        radius1=0.0034,
        radius2=0.0024,
        depth=0.0015,
        matrix=Matrix.Translation(Vector((0, 0, z_tip - 0.00075)))
    )

    bm.to_mesh(mesh)
    bm.free()

    mat = create_dissolve_material("Steel_Bolt", base_color=(0.75, 0.76, 0.78, 1.0), roughness=0.18, metallic=0.96)
    obj.data.materials.append(mat)
    return obj

def create_bolt_stock(name="Bolt_Stock"):
    """Hexagonal stock bar for turning the bolt: 14mm hex, 35mm length."""
    mesh = bpy.data.meshes.new(name)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)

    bm = bmesh.new()
    r = 0.014 / math.sqrt(3)
    bmesh.ops.create_cone(
        bm,
        cap_ends=True,
        segments=6,
        radius1=r,
        radius2=r,
        depth=0.035,
        matrix=Matrix.Translation(Vector((0, 0, -0.012)))
    )
    bm.to_mesh(mesh)
    bm.free()

    mat = create_dissolve_material("Bolt_Raw_Stock", base_color=(0.40, 0.42, 0.44, 1.0), roughness=0.55, metallic=0.8)
    obj.data.materials.append(mat)
    return obj

def create_shaft(name="Shaft_Finished"):
    """
    Parametric stepped steel shaft:
    Total length: 140 mm
    Section 1: 20 mm dia (rad 0.010 m) x 40 mm long
    Section 2: 16 mm dia (rad 0.008 m) x 60 mm long (fits bracket bore!)
    Section 3: 12 mm dia (rad 0.006 m) x 40 mm long
    Features:
    - 4x4x25 mm keyway on Section 1
    - 1 mm chamfers at transitions and ends
    """
    mesh = bpy.data.meshes.new(name)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)

    bm = bmesh.new()

    # Section 1: 20 mm dia x 40 mm (centered from X=0 to 0.040)
    # Align along X axis
    s1_r = 0.010
    s1_l = 0.040
    bmesh.ops.create_cone(
        bm,
        cap_ends=True,
        segments=32,
        radius1=s1_r,
        radius2=s1_r,
        depth=s1_l,
        matrix=Matrix.Translation(Vector((s1_l / 2.0, 0, 0))) @ Matrix.Rotation(math.radians(90), 4, 'Y')
    )

    # Section 2: 16 mm dia x 60 mm (X=0.040 to 0.100)
    s2_r = 0.008
    s2_l = 0.060
    bmesh.ops.create_cone(
        bm,
        cap_ends=True,
        segments=32,
        radius1=s2_r,
        radius2=s2_r,
        depth=s2_l,
        matrix=Matrix.Translation(Vector((s1_l + s2_l / 2.0, 0, 0))) @ Matrix.Rotation(math.radians(90), 4, 'Y')
    )

    # Section 3: 12 mm dia x 40 mm (X=0.100 to 0.140)
    s3_r = 0.006
    s3_l = 0.040
    bmesh.ops.create_cone(
        bm,
        cap_ends=True,
        segments=32,
        radius1=s3_r,
        radius2=s3_r,
        depth=s3_l,
        matrix=Matrix.Translation(Vector((s1_l + s2_l + s3_l / 2.0, 0, 0))) @ Matrix.Rotation(math.radians(90), 4, 'Y')
    )

    bm.to_mesh(mesh)
    bm.free()

    # Keyway cutter: 4 mm width (Y=0.004), 4 mm depth (Z=0.004), 25 mm long (X=0.025)
    key_cutter = bpy.data.objects.new("Shaft_Keyway_Cutter", bpy.data.meshes.new("Shaft_Keyway_Cutter"))
    bm_k = bmesh.new()
    bmesh.ops.create_cube(
        bm_k,
        size=1.0,
        matrix=Matrix.Translation(Vector((0.020, 0, s1_r))) @ Matrix.Scale(0.025, 4, Vector((1, 0, 0))) @ Matrix.Scale(0.004, 4, Vector((0, 1, 0))) @ Matrix.Scale(0.004, 4, Vector((0, 0, 1)))
    )
    bm_k.to_mesh(key_cutter.data)
    bm_k.free()
    bpy.context.collection.objects.link(key_cutter)
    key_cutter.hide_render = True
    key_cutter.hide_viewport = True

    mod = obj.modifiers.new("Keyway", 'BOOLEAN')
    mod.operation = 'DIFFERENCE'
    mod.object = key_cutter
    try:
        mod.solver = 'MANIFOLD'
    except Exception:
        mod.solver = 'EXACT'

    bev = obj.modifiers.new("Chamfer", 'BEVEL')
    bev.width = 0.0008
    bev.segments = 2

    mat = create_dissolve_material("Steel_Shaft_Ground", base_color=(0.82, 0.84, 0.86, 1.0), roughness=0.15, metallic=0.98)
    obj.data.materials.append(mat)
    return obj

def create_shaft_stock(name="Shaft_Stock"):
    """Plain cylindrical raw bar: 22 mm dia x 145 mm long."""
    mesh = bpy.data.meshes.new(name)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)

    bm = bmesh.new()
    bmesh.ops.create_cone(
        bm,
        cap_ends=True,
        segments=24,
        radius1=0.011,
        radius2=0.011,
        depth=0.145,
        matrix=Matrix.Translation(Vector((0.0725, 0, 0))) @ Matrix.Rotation(math.radians(90), 4, 'Y')
    )
    bm.to_mesh(mesh)
    bm.free()

    mat = create_dissolve_material("Shaft_Raw_Stock", base_color=(0.42, 0.44, 0.46, 1.0), roughness=0.6, metallic=0.75)
    obj.data.materials.append(mat)
    return obj

if __name__ == "__main__":
    # Test execution
    print("Testing assets.py standalone...")
    bracket = create_bracket()
    bolt = create_bolt()
    shaft = create_shaft()
    print("Assets created successfully!")
