"""
mechanic.py - Parametric articulated human mechanic mannequin.
Built from primitives parented to joint empties with boiler suit, safety glasses,
ear defenders, boots, gloves, and procedural walk cycle.
"""
import bpy
import bmesh
import math
from mathutils import Vector, Matrix

def create_color_material(name, color, roughness=0.5, metallic=0.0):
    mat = bpy.data.materials.get(name)
    if mat:
        bpy.data.materials.remove(mat)
    mat = bpy.data.materials.new(name=name)
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    out = nodes.new('ShaderNodeOutputMaterial')
    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.inputs['Base Color'].default_value = color
    bsdf.inputs['Roughness'].default_value = roughness
    bsdf.inputs['Metallic'].default_value = metallic
    links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    return mat

def create_mechanic(name="Mechanic"):
    """
    Creates stylized articulated mannequin.
    Materials:
    - Navy Boiler Suit: (0.02, 0.05, 0.12, 1.0)
    - Skin tone: (0.82, 0.62, 0.50, 1.0)
    - Boots/Gloves/Ear defenders: (0.1, 0.1, 0.1, 1.0)
    - Safety glasses (translucent amber/yellow): (0.9, 0.6, 0.1, 1.0)
    """
    mat_suit = create_color_material("Mat_BoilerSuit", (0.03, 0.07, 0.16, 1.0), roughness=0.7)
    mat_skin = create_color_material("Mat_Skin", (0.80, 0.60, 0.48, 1.0), roughness=0.5)
    mat_gear = create_color_material("Mat_DarkGear", (0.08, 0.08, 0.09, 1.0), roughness=0.4)
    mat_lens = create_color_material("Mat_SafetyLens", (1.0, 0.7, 0.1, 1.0), roughness=0.1, metallic=0.2)

    root = bpy.data.objects.new(name + "_Root", None)
    bpy.context.collection.objects.link(root)

    # Master Hips Empty
    hips = bpy.data.objects.new(name + "_Hips", None)
    hips.location = (0, 0, 1.0) # 1.0m height for hip joint
    hips.parent = root
    bpy.context.collection.objects.link(hips)

    # Pelvis mesh
    pelvis_mesh = bpy.data.meshes.new(name + "_PelvisMesh")
    pelvis_obj = bpy.data.objects.new(name + "_Pelvis", pelvis_mesh)
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0, matrix=Matrix.Scale(0.24, 4, (1, 0, 0)) @ Matrix.Scale(0.16, 4, (0, 1, 0)) @ Matrix.Scale(0.14, 4, (0, 0, 1)))
    bm.to_mesh(pelvis_mesh)
    bm.free()
    pelvis_obj.data.materials.append(mat_suit)
    pelvis_obj.parent = hips
    bpy.context.collection.objects.link(pelvis_obj)

    # Spine Empty & Torso
    spine = bpy.data.objects.new(name + "_Spine", None)
    spine.location = (0, 0, 0.12)
    spine.parent = hips
    bpy.context.collection.objects.link(spine)

    torso_mesh = bpy.data.meshes.new(name + "_TorsoMesh")
    torso_obj = bpy.data.objects.new(name + "_Torso", torso_mesh)
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0, matrix=Matrix.Translation(Vector((0, 0, 0.16))) @ Matrix.Scale(0.28, 4, (1, 0, 0)) @ Matrix.Scale(0.18, 4, (0, 1, 0)) @ Matrix.Scale(0.32, 4, (0, 0, 1)))
    bm.to_mesh(torso_mesh)
    bm.free()
    torso_obj.data.materials.append(mat_suit)
    torso_obj.parent = spine
    bpy.context.collection.objects.link(torso_obj)

    # Neck & Head
    neck = bpy.data.objects.new(name + "_Neck", None)
    neck.location = (0, 0, 0.35)
    neck.parent = spine
    bpy.context.collection.objects.link(neck)

    head_mesh = bpy.data.meshes.new(name + "_HeadMesh")
    head_obj = bpy.data.objects.new(name + "_Head", head_mesh)
    bm = bmesh.new()
    # Stylized head block
    bmesh.ops.create_cube(bm, size=1.0, matrix=Matrix.Translation(Vector((0, 0, 0.12))) @ Matrix.Scale(0.15, 4, (1, 0, 0)) @ Matrix.Scale(0.16, 4, (0, 1, 0)) @ Matrix.Scale(0.18, 4, (0, 0, 1)))
    # Safety Glasses
    bmesh.ops.create_cube(bm, size=1.0, matrix=Matrix.Translation(Vector((0, 0.085, 0.13))) @ Matrix.Scale(0.16, 4, (1, 0, 0)) @ Matrix.Scale(0.02, 4, (0, 1, 0)) @ Matrix.Scale(0.04, 4, (0, 0, 1)))
    # Ear defenders (side muffs)
    bmesh.ops.create_cube(bm, size=1.0, matrix=Matrix.Translation(Vector((-0.085, 0, 0.12))) @ Matrix.Scale(0.03, 4, (1, 0, 0)) @ Matrix.Scale(0.06, 4, (0, 1, 0)) @ Matrix.Scale(0.08, 4, (0, 0, 1)))
    bmesh.ops.create_cube(bm, size=1.0, matrix=Matrix.Translation(Vector((0.085, 0, 0.12))) @ Matrix.Scale(0.03, 4, (1, 0, 0)) @ Matrix.Scale(0.06, 4, (0, 1, 0)) @ Matrix.Scale(0.08, 4, (0, 0, 1)))
    bm.to_mesh(head_mesh)
    bm.free()
    head_obj.data.materials.append(mat_skin)
    head_obj.data.materials.append(mat_lens)
    head_obj.data.materials.append(mat_gear)
    head_obj.parent = neck
    bpy.context.collection.objects.link(head_obj)

    # Limbs creation helper
    def create_limb(side, is_arm):
        sign = 1 if side == 'R' else -1
        prefix = f"{name}_{side}_{'Arm' if is_arm else 'Leg'}"
        if is_arm:
            joint1 = bpy.data.objects.new(f"{prefix}_Shoulder", None)
            joint1.location = (sign * 0.18, 0, 0.28)
            joint1.parent = spine

            upper = bpy.data.objects.new(f"{prefix}_Upper", bpy.data.meshes.new(f"{prefix}_UpperMesh"))
            bm = bmesh.new()
            bmesh.ops.create_cylinder(bm, cap_ends=True, radius=0.045, depth=0.26, matrix=Matrix.Translation(Vector((0, 0, -0.13))))
            bm.to_mesh(upper.data)
            bm.free()
            upper.data.materials.append(mat_suit)
            upper.parent = joint1

            joint2 = bpy.data.objects.new(f"{prefix}_Elbow", None)
            joint2.location = (0, 0, -0.26)
            joint2.parent = joint1

            forearm = bpy.data.objects.new(f"{prefix}_Forearm", bpy.data.meshes.new(f"{prefix}_ForearmMesh"))
            bm = bmesh.new()
            bmesh.ops.create_cylinder(bm, cap_ends=True, radius=0.038, depth=0.24, matrix=Matrix.Translation(Vector((0, 0, -0.12))))
            # Glove
            bmesh.ops.create_cube(bm, size=1.0, matrix=Matrix.Translation(Vector((0, 0, -0.26))) @ Matrix.Scale(0.07, 4, (1, 0, 0)) @ Matrix.Scale(0.05, 4, (0, 1, 0)) @ Matrix.Scale(0.08, 4, (0, 0, 1)))
            bm.to_mesh(forearm.data)
            bm.free()
            forearm.data.materials.append(mat_suit)
            forearm.data.materials.append(mat_gear)
            forearm.parent = joint2

            for o in [joint1, upper, joint2, forearm]:
                bpy.context.collection.objects.link(o)
            return joint1, joint2
        else:
            joint1 = bpy.data.objects.new(f"{prefix}_Hip", None)
            joint1.location = (sign * 0.10, 0, -0.05)
            joint1.parent = hips

            upper = bpy.data.objects.new(f"{prefix}_Thigh", bpy.data.meshes.new(f"{prefix}_ThighMesh"))
            bm = bmesh.new()
            bmesh.ops.create_cylinder(bm, cap_ends=True, radius=0.055, depth=0.42, matrix=Matrix.Translation(Vector((0, 0, -0.21))))
            bm.to_mesh(upper.data)
            bm.free()
            upper.data.materials.append(mat_suit)
            upper.parent = joint1

            joint2 = bpy.data.objects.new(f"{prefix}_Knee", None)
            joint2.location = (0, 0, -0.42)
            joint2.parent = joint1

            shin = bpy.data.objects.new(f"{prefix}_Shin", bpy.data.meshes.new(f"{prefix}_ShinMesh"))
            bm = bmesh.new()
            bmesh.ops.create_cylinder(bm, cap_ends=True, radius=0.048, depth=0.42, matrix=Matrix.Translation(Vector((0, 0, -0.21))))
            # Boot
            bmesh.ops.create_cube(bm, size=1.0, matrix=Matrix.Translation(Vector((0, 0.05, -0.44))) @ Matrix.Scale(0.09, 4, (1, 0, 0)) @ Matrix.Scale(0.20, 4, (0, 1, 0)) @ Matrix.Scale(0.08, 4, (0, 0, 1)))
            bm.to_mesh(shin.data)
            bm.free()
            shin.data.materials.append(mat_suit)
            shin.data.materials.append(mat_gear)
            shin.parent = joint2

            for o in [joint1, upper, joint2, shin]:
                bpy.context.collection.objects.link(o)
            return joint1, joint2

    r_sh, r_el = create_limb('R', is_arm=True)
    l_sh, l_el = create_limb('L', is_arm=True)
    r_hip, r_knee = create_limb('R', is_arm=False)
    l_hip, l_knee = create_limb('L', is_arm=False)

    # Steel transport tray held by hands
    tray = bpy.data.objects.new(name + "_Tray", bpy.data.meshes.new(name + "_TrayMesh"))
    bm_t = bmesh.new()
    bmesh.ops.create_cube(bm_t, size=1.0, matrix=Matrix.Scale(0.35, 4, (1, 0, 0)) @ Matrix.Scale(0.22, 4, (0, 1, 0)) @ Matrix.Scale(0.02, 4, (0, 0, 1)))
    # Tray lip edges
    bmesh.ops.create_cube(bm_t, size=1.0, matrix=Matrix.Translation(Vector((0, 0.105, 0.015))) @ Matrix.Scale(0.35, 4, (1, 0, 0)) @ Matrix.Scale(0.01, 4, (0, 1, 0)) @ Matrix.Scale(0.02, 4, (0, 0, 1)))
    bmesh.ops.create_cube(bm_t, size=1.0, matrix=Matrix.Translation(Vector((0, -0.105, 0.015))) @ Matrix.Scale(0.35, 4, (1, 0, 0)) @ Matrix.Scale(0.01, 4, (0, 1, 0)) @ Matrix.Scale(0.02, 4, (0, 0, 1)))
    bm_t.to_mesh(tray.data)
    bm_t.free()
    mat_tray = create_color_material("Mat_TraySteel", (0.7, 0.72, 0.75, 1.0), roughness=0.3, metallic=0.9)
    tray.data.materials.append(mat_tray)
    tray.location = (0, 0.28, 0.85)
    tray.parent = root
    bpy.context.collection.objects.link(tray)

    joints = {
        'root': root,
        'hips': hips,
        'spine': spine,
        'neck': neck,
        'r_shoulder': r_sh,
        'r_elbow': r_el,
        'l_shoulder': l_sh,
        'l_elbow': l_el,
        'r_hip': r_hip,
        'r_knee': r_knee,
        'l_hip': l_hip,
        'l_knee': l_knee,
        'tray': tray
    }
    return root, joints

def animate_walk_cycle(joints, start_frame=168, end_frame=260, step_freq=0.45):
    """Procedurally keyframes a believable walk cycle onto the joint empties."""
    for f in range(start_frame, end_frame + 1, 2):
        t = (f - start_frame) * step_freq
        # Legs swing
        leg_amp = 0.45
        joints['r_hip'].rotation_euler.x = math.sin(t) * leg_amp
        joints['l_hip'].rotation_euler.x = -math.sin(t) * leg_amp

        # Knees flex on backstroke
        joints['r_knee'].rotation_euler.x = max(0.0, math.sin(t - 1.2) * 0.6)
        joints['l_knee'].rotation_euler.x = max(0.0, -math.sin(t - 1.2) * 0.6)

        # Arms swing opposite to legs (or stay supporting tray)
        arm_amp = 0.25
        joints['r_shoulder'].rotation_euler.x = -math.sin(t) * arm_amp + 0.3
        joints['l_shoulder'].rotation_euler.x = math.sin(t) * arm_amp + 0.3
        joints['r_elbow'].rotation_euler.x = -0.5
        joints['l_elbow'].rotation_euler.x = -0.5

        # Body bounce / vertical bob
        joints['hips'].location.z = 1.0 - abs(math.sin(t * 2.0)) * 0.03

        # Insert keyframes
        for k in ['r_hip', 'l_hip', 'r_knee', 'l_knee', 'r_shoulder', 'l_shoulder', 'hips']:
            joints[k].keyframe_insert('rotation_euler' if k != 'hips' else 'location', frame=f)
