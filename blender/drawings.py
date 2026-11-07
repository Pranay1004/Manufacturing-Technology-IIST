"""
drawings.py - Blueprint style panels with parametric animated line curves and process labels.
"""
import bpy
import bmesh
import math
from mathutils import Vector, Matrix

def create_blueprint_material(name="Blueprint_Backdrop"):
    mat = bpy.data.materials.get(name)
    if mat:
        bpy.data.materials.remove(mat)
    mat = bpy.data.materials.new(name=name)
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    out = nodes.new('ShaderNodeOutputMaterial')
    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    # Deep cyan-navy technical blueprint background
    bsdf.inputs['Base Color'].default_value = (0.015, 0.045, 0.09, 1.0)
    bsdf.inputs['Roughness'].default_value = 0.8
    bsdf.inputs['Specular IOR Level'].default_value = 0.2
    links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    return mat

def create_line_material(name="Blueprint_Glow_Line"):
    mat = bpy.data.materials.get(name)
    if mat:
        bpy.data.materials.remove(mat)
    mat = bpy.data.materials.new(name=name)
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    out = nodes.new('ShaderNodeOutputMaterial')
    emit = nodes.new('ShaderNodeEmission')
    emit.inputs['Color'].default_value = (0.35, 0.75, 1.0, 1.0) # Bright technical cyan
    emit.inputs['Strength'].default_value = 2.5
    links.new(emit.outputs['Emission'], out.inputs['Surface'])
    return mat

def create_curve_line(name, points, bevel_radius=0.0004, mat=None):
    """Creates a 3D curve line from points with bevel depth for rendering."""
    curve_data = bpy.data.curves.new(name, type='CURVE')
    curve_data.dimensions = '3D'
    curve_data.bevel_depth = bevel_radius
    curve_data.bevel_resolution = 2

    spline = curve_data.splines.new('POLY')
    spline.points.add(len(points) - 1)
    for i, pt in enumerate(points):
        spline.points[i].co = (pt[0], pt[1], pt[2], 1.0)

    obj = bpy.data.objects.new(name, curve_data)
    if mat:
        obj.data.materials.append(mat)
    bpy.context.collection.objects.link(obj)
    return obj

def create_text_label(name, text, location, size=0.006, rotation=(0, 0, 0)):
    font_curve = bpy.data.curves.new(type="FONT", name=name)
    font_curve.body = text
    font_curve.size = size
    font_curve.extrude = 0.0002

    obj = bpy.data.objects.new(name, font_curve)
    obj.location = location
    obj.rotation_euler = rotation

    mat = create_line_material("Text_Mat_" + name)
    obj.data.materials.append(mat)
    bpy.context.collection.objects.link(obj)
    return obj

def build_drawing_panel(part_type="BRACKET", location=(0, 0, 0), rotation=(0, 0, 0)):
    """
    Creates a technical drawing panel with border, title block, 3-view outlines,
    dimension lines, and manufacturing process labels.
    """
    mat_bg = create_blueprint_material()
    mat_line = create_line_material()

    panel_group = []
    width = 0.32
    height = 0.22

    # Background plane
    mesh = bpy.data.meshes.new(f"Panel_{part_type}_BG")
    bg_obj = bpy.data.objects.new(f"Panel_{part_type}_BG", mesh)
    bm = bmesh.new()
    bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=0.5)
    bmesh.ops.scale(bm, vec=(width, height, 1.0), verts=bm.verts)
    bm.to_mesh(mesh)
    bm.free()
    bg_obj.data.materials.append(mat_bg)
    bpy.context.collection.objects.link(bg_obj)
    panel_group.append(bg_obj)

    # Border frame (animated curve)
    hw, hh = width / 2.0 - 0.005, height / 2.0 - 0.005
    border_pts = [
        (-hw, -hh, 0.001),
        (hw, -hh, 0.001),
        (hw, hh, 0.001),
        (-hw, hh, 0.001),
        (-hw, -hh, 0.001)
    ]
    border_obj = create_curve_line(f"{part_type}_Border", border_pts, mat=mat_line)
    panel_group.append(border_obj)

    # Inner grid lines
    g1 = create_curve_line(f"{part_type}_G1", [(-hw, hh - 0.035, 0.001), (hw, hh - 0.035, 0.001)], bevel_radius=0.0002, mat=mat_line)
    g2 = create_curve_line(f"{part_type}_G2", [(hw - 0.12, -hh, 0.001), (hw - 0.12, -hh + 0.04, 0.001), (hw, -hh + 0.04, 0.001)], bevel_radius=0.0003, mat=mat_line)
    panel_group.extend([g1, g2])

    # Outlines & Process labels depending on part type
    if part_type == "BRACKET":
        title = "PART 01: L-MOUNT BRACKET"
        proc = "OP: MILLING + DRILLING + TAPPING"
        tol = "TOL: ISO 2768-mK / 6H"
        # Front & top projection lines
        pts_front = [(-0.08, -0.04, 0.001), (-0.08, 0.03, 0.001), (-0.04, 0.03, 0.001), (-0.04, -0.02, 0.001), (0.02, -0.02, 0.001), (0.02, -0.04, 0.001), (-0.08, -0.04, 0.001)]
        l_front = create_curve_line("Bracket_Outline_Front", pts_front, mat=mat_line)
        # Bore circle representation
        bore_pts = [(-0.06 + 0.012 * math.cos(math.radians(a)), 0.005 + 0.012 * math.sin(math.radians(a)), 0.001) for a in range(0, 370, 15)]
        l_bore = create_curve_line("Bracket_Outline_Bore", bore_pts, mat=mat_line)
        panel_group.extend([l_front, l_bore])
    elif part_type == "BOLT":
        title = "PART 02: CUSTOM M8 HEX BOLT"
        proc = "OP: TURNING + THREAD CUTTING"
        tol = "CLASS: 6g / DIN 933"
        # Hex outline & thread pitch lines
        pts_bolt = [(-0.08, 0.01, 0.001), (-0.06, 0.018, 0.001), (-0.06, -0.018, 0.001), (-0.08, -0.01, 0.001), (-0.08, 0.01, 0.001)]
        l_hex = create_curve_line("Bolt_Outline_Hex", pts_bolt, mat=mat_line)
        pts_shank = [(-0.06, 0.01, 0.001), (0.05, 0.01, 0.001), (0.05, -0.01, 0.001), (-0.06, -0.01, 0.001)]
        l_shank = create_curve_line("Bolt_Outline_Shank", pts_shank, mat=mat_line)
        panel_group.extend([l_hex, l_shank])
    else: # SHAFT
        title = "PART 03: STEPPED DRIVE SHAFT"
        proc = "OP: TURNING + KEYWAY + GRINDING"
        tol = "BEARING FIT: h6 / Ra 0.4"
        # Stepped shaft contour
        pts_shaft = [
            (-0.09, 0.016, 0.001), (-0.04, 0.016, 0.001),
            (-0.04, 0.012, 0.001), (0.03, 0.012, 0.001),
            (0.03, 0.008, 0.001), (0.09, 0.008, 0.001),
            (0.09, -0.008, 0.001), (0.03, -0.008, 0.001),
            (0.03, -0.012, 0.001), (-0.04, -0.012, 0.001),
            (-0.04, -0.016, 0.001), (-0.09, -0.016, 0.001),
            (-0.09, 0.016, 0.001)
        ]
        l_shaft = create_curve_line("Shaft_Outline", pts_shaft, mat=mat_line)
        panel_group.append(l_shaft)

    # Text blocks
    t1 = create_text_label(f"{part_type}_T1", title, (-hw + 0.01, hh - 0.022, 0.002), size=0.007)
    t2 = create_text_label(f"{part_type}_T2", proc, (-hw + 0.01, -hh + 0.015, 0.002), size=0.0055)
    t3 = create_text_label(f"{part_type}_T3", tol, (hw - 0.115, -hh + 0.015, 0.002), size=0.0045)
    t4 = create_text_label(f"{part_type}_T4", "IIST AEROSPACE M.TECH", (hw - 0.115, -hh + 0.028, 0.002), size=0.004)
    panel_group.extend([t1, t2, t3, t4])

    # Parent all objects to a master empty for easy layout & animation
    parent_empty = bpy.data.objects.new(f"Blueprint_{part_type}_Root", None)
    bpy.context.collection.objects.link(parent_empty)
    parent_empty.location = location
    parent_empty.rotation_euler = rotation

    for obj in panel_group:
        obj.parent = parent_empty

    return parent_empty, panel_group

def animate_blueprint_draw(panel_group, start_frame=72, end_frame=140):
    """Animates bevel_factor_end on curves to create the self-drawing blueprint effect."""
    for obj in panel_group:
        if obj.type == 'CURVE' and hasattr(obj.data, 'bevel_factor_end'):
            obj.data.bevel_factor_end = 0.0
            obj.data.keyframe_insert('bevel_factor_end', frame=start_frame)
            obj.data.bevel_factor_end = 1.0
            obj.data.keyframe_insert('bevel_factor_end', frame=end_frame)
