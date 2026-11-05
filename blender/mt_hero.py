# mt_hero.py - one-shot Blender render for the Manufacturing Technology scroll hero
# Run:  blender --background --python blender/mt_hero.py
# Preview: blender --background --python blender/mt_hero.py -- --preview --still 20 50 80 120 150 168
import bpy, math, os, shutil, subprocess, sys, random
from mathutils import Vector

# ------------------------------------------------------------------ settings
ARGV = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
PREVIEW = "--preview" in ARGV
STILLS = []
if "--still" in ARGV:
    i = ARGV.index("--still")
    for a in ARGV[i + 1:]:
        if a.startswith("--"):
            break
        STILLS.append(int(a))
NO_ENCODE = "--no-encode" in ARGV

OUT_DIR = os.path.join(os.path.expanduser("~"), "Desktop",
                       "mt_hero_preview" if PREVIEW else "mt_hero")
FRAMES_DIR = os.path.join(OUT_DIR, "frames")
FPS = 24
N_FRAMES = 168                      # 7.0 s
RES_X, RES_Y = (960, 540) if PREVIEW else (1920, 1080)
SAMPLES = 24 if PREVIEW else 96
os.makedirs(FRAMES_DIR, exist_ok=True)

# part / build geometry
PART_X = 0.10
R, DZ, NL = 0.45, 0.0175, 24
Z0 = 0.10
BEAD_RAD = 0.0135                   # radial half-width of a weld bead
BEAD_VERT = 0.0150                  # vertical half-height (overlaps the next layer)
BEAD_SV = BEAD_VERT / BEAD_RAD
BEAD_TOP = BEAD_VERT - DZ * 0.5     # bead crown above its layer top
SHELL_GAP = 0.0008                  # machined skin sits just proud of the rough bead
RIB_EXTRA = 0.014
RIBS = {3, 4, 11, 12, 19, 20}
PLATE_R = 0.60

# robot
BASE_X, BASE_Y, SHOULDER_Z = PART_X - 0.85, -0.50, 0.60
L1 = L2 = 0.47
TORCH_Y = BASE_Y
TORCH_LEN = 0.20                    # wrist sits this far above the torch tip
TORCH_GAP = 0.010                   # nozzle standoff above the bead crown

# cnc
COLUMN_X = 1.00
TOOL_FLUTE = 0.11                   # cutting length
TOOL_NECK = 0.012                   # thin long-reach neck
TOOL_R = 0.030
CUT_DEPTH = 0.004
MILL_PARK_Z = 0.56
MILL_END_Z = 0.26                   # final retract stays low so the spindle remains in shot
FEED_Z0, FEED_Z1 = 0.56, 0.10
FEED_SPEED = 0.3333                 # units / s

# timeline
T_APPROACH_END = 0.60
T_DEP_START, T_DEP_END = 0.60, 4.05
LAYER_T = (T_DEP_END - T_DEP_START) / NL
T_LIFT_END = 4.35
T_PARK_END = 4.80
T_FEED_START, T_FEED_END = 4.80, 6.18
T_DWELL_END = 6.50
T_MILL_UP_END = 6.80
PARK_X, PARK_Z = PART_X - 1.05, 0.68

# ------------------------------------------------------------------ helpers
def ease(u):
    u = min(max(u, 0.0), 1.0)
    return u * u * (3 - 2 * u)

def lerp(a, b, u):
    return a + (b - a) * u

def lin(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def hexc(h):
    h = h.lstrip('#')
    return tuple(lin(int(h[i:i + 2], 16) / 255) for i in (0, 2, 4)) + (1.0,)

def frame_of(t):
    return max(1, int(round(t * FPS)) + 1)

for o in list(bpy.data.objects):
    bpy.data.objects.remove(o, do_unlink=True)
scene = bpy.context.scene

# ------------------------------------------------------------------ meshes
def finish(name, verts, faces, smooth_n):
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    me.update()
    for i, p in enumerate(me.polygons):
        p.use_smooth = i < smooth_n
    return me

def cyl_mesh(name, r, h, segs=64, caps=True, centered=False):
    z0 = -h / 2 if centered else 0.0
    z1 = z0 + h
    verts, faces = [], []
    for z in (z0, z1):
        for k in range(segs):
            a = 2 * math.pi * k / segs
            verts.append((r * math.cos(a), r * math.sin(a), z))
    for k in range(segs):
        k2 = (k + 1) % segs
        faces.append((k, k2, segs + k2, segs + k))
    n_smooth = len(faces)
    if caps:
        b = len(verts)
        for z in (z0, z1):
            for k in range(segs):
                a = 2 * math.pi * k / segs
                verts.append((r * math.cos(a), r * math.sin(a), z))
        faces.append(tuple(range(b + segs - 1, b - 1, -1)))
        faces.append(tuple(range(b + segs, b + 2 * segs)))
    return finish(name, verts, faces, n_smooth)

def box_mesh(name, sx, sy, sz):
    x, y, z = sx / 2, sy / 2, sz / 2
    v = [(-x, -y, -z), (x, -y, -z), (x, y, -z), (-x, y, -z),
         (-x, -y, z), (x, -y, z), (x, y, z), (-x, y, z)]
    f = [(0, 3, 2, 1), (4, 5, 6, 7), (0, 1, 5, 4),
         (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7)]
    return finish(name, v, f, 0)

def sphere_mesh(name, r, seg=24, rings=12):
    v = [(0, 0, r)]
    for i in range(1, rings):
        th = math.pi * i / rings
        for j in range(seg):
            ph = 2 * math.pi * j / seg
            v.append((r * math.sin(th) * math.cos(ph),
                      r * math.sin(th) * math.sin(ph),
                      r * math.cos(th)))
    v.append((0, 0, -r))
    f = [(0, 1 + j, 1 + (j + 1) % seg) for j in range(seg)]
    for i in range(rings - 2):
        a, b = 1 + i * seg, 1 + (i + 1) * seg
        for j in range(seg):
            j2 = (j + 1) % seg
            f.append((a + j, b + j, b + j2, a + j2))
    last, c = len(v) - 1, 1 + (rings - 2) * seg
    f += [(last, c + (j + 1) % seg, c + j) for j in range(seg)]
    return finish(name, v, f, len(f))

def torus_mesh(name, major, minor, sv=0.85, maj=128, mnr=20, phase=0.0):
    """Face order starts at `phase` about Z, so Build reveals a bead from that point."""
    v, f = [], []
    for i in range(maj):
        a = 2 * math.pi * i / maj + phase
        for j in range(mnr):
            b = 2 * math.pi * j / mnr
            rad = major + minor * math.cos(b)
            v.append((rad * math.cos(a), rad * math.sin(a), sv * minor * math.sin(b)))
    for i in range(maj):
        i2 = (i + 1) % maj
        for j in range(mnr):
            j2 = (j + 1) % mnr
            f.append((i * mnr + j, i2 * mnr + j, i2 * mnr + j2, i * mnr + j2))
    return finish(name, v, f, len(f))

# ------------------------------------------------------------------ materials
def mat_new(name):
    m = bpy.data.materials.new(name)
    try:
        m.use_nodes = True
    except Exception:
        pass
    m.node_tree.nodes.clear()
    return m, m.node_tree, m.node_tree.nodes.new('ShaderNodeOutputMaterial')

def metal(name, color, metallic, rough, aniso=0.0):
    m, nt, out = mat_new(name)
    b = nt.nodes.new('ShaderNodeBsdfPrincipled')
    b.inputs['Base Color'].default_value = color
    b.inputs['Metallic'].default_value = metallic
    b.inputs['Roughness'].default_value = rough
    if aniso > 0:
        try:
            b.inputs['Anisotropic'].default_value = aniso
            t = nt.nodes.new('ShaderNodeTangent')
            t.direction_type, t.axis = 'RADIAL', 'Z'
            nt.links.new(t.outputs['Tangent'], b.inputs['Tangent'])
        except Exception:
            pass
    nt.links.new(b.outputs['BSDF'], out.inputs['Surface'])
    return m

def emit(name, color, strength):
    m, nt, out = mat_new(name)
    e = nt.nodes.new('ShaderNodeEmission')
    e.inputs['Color'].default_value = color
    e.inputs['Strength'].default_value = strength
    nt.links.new(e.outputs['Emission'], out.inputs['Surface'])
    return m

def principled(m):
    for n in m.node_tree.nodes:
        if n.type == 'BSDF_PRINCIPLED':
            return n
    return None

M_TEAL     = metal("teal",     (0.012, 0.52, 0.40, 1), 0.0, 0.32)
M_GRAPHITE = metal("graphite", (0.028, 0.032, 0.038, 1), 0.55, 0.38)
M_BUILT    = metal("built",    (0.30, 0.31, 0.33, 1),  0.90, 0.52)
M_MACH     = metal("machined", (0.68, 0.71, 0.74, 1),  0.95, 0.27, aniso=0.35)
M_PLATE    = metal("plate",    (0.36, 0.38, 0.41, 1),  1.0, 0.34, aniso=0.45)
M_COBALT   = metal("cobalt",   hexc("2f63ff"),         0.45, 0.32)
M_CUTTER   = metal("cutter",   (0.72, 0.74, 0.77, 1),  1.0, 0.18)
M_COPPER   = metal("copper",   (0.80, 0.30, 0.10, 1),  1.0, 0.22)
M_CERAMIC  = metal("ceramic",  (0.86, 0.84, 0.79, 1),  0.0, 0.48)
M_WIRE     = metal("wire",     (0.78, 0.78, 0.81, 1),  1.0, 0.28)
M_ARC      = emit("arc",       (0.55, 0.75, 1.0, 1), 40.0)
M_POOL     = emit("pool",      (1.0, 0.30, 0.04, 1), 12.0)
M_SPARK    = emit("spark",     (1.0, 0.55, 0.10, 1), 25.0)
M_CUTGLOW  = emit("cutglow",   (1.0, 0.72, 0.35, 1), 18.0)
M_BAND     = emit("band",      (0.0, 0.0, 0.0, 1), 1.0)

# Machined shell: one continuous surface, opaque above an animated cut front
# and transparent below it.  This avoids the slatted look of stacked rings.
M_SHELL = M_MACH.copy()
M_SHELL.name = "machined_shell"
_nt = M_SHELL.node_tree
_out = next(n for n in _nt.nodes if n.type == 'OUTPUT_MATERIAL')
_pr = principled(M_SHELL)
for _l in list(_nt.links):
    if _l.to_node == _out and _l.to_socket.name == 'Surface':
        _nt.links.remove(_l)
_geo = _nt.nodes.new('ShaderNodeNewGeometry')
_sep = _nt.nodes.new('ShaderNodeSeparateXYZ')
_nt.links.new(_geo.outputs['Position'], _sep.inputs[0])
_cut = _nt.nodes.new('ShaderNodeValue')
_cut.name = _cut.label = 'CutZ'
_cut.outputs[0].default_value = 1.0
_sub = _nt.nodes.new('ShaderNodeMath')
_sub.operation = 'SUBTRACT'
_nt.links.new(_sep.outputs['Z'], _sub.inputs[0])
_nt.links.new(_cut.outputs[0], _sub.inputs[1])
_mr = _nt.nodes.new('ShaderNodeMapRange')
_mr.clamp = True
_mr.inputs[1].default_value = 0.0
_mr.inputs[2].default_value = 0.0015
_mr.inputs[3].default_value = 0.0
_mr.inputs[4].default_value = 1.0
_nt.links.new(_sub.outputs[0], _mr.inputs[0])
_tr = _nt.nodes.new('ShaderNodeBsdfTransparent')
_mix = _nt.nodes.new('ShaderNodeMixShader')
_nt.links.new(_mr.outputs[0], _mix.inputs[0])
_nt.links.new(_tr.outputs['BSDF'], _mix.inputs[1])
_nt.links.new(_pr.outputs['BSDF'], _mix.inputs[2])
_nt.links.new(_mix.outputs['Shader'], _out.inputs['Surface'])
SHELL_CUT = _cut

# ------------------------------------------------------------------ world (white to camera, soft studio fill)
def build_world():
    w = bpy.data.worlds.new("MT_World")
    scene.world = w
    try:
        w.use_nodes = True
    except Exception:
        pass
    nt = w.node_tree
    nt.nodes.clear()
    N, Lk = nt.nodes, nt.links
    out = N.new('ShaderNodeOutputWorld')
    tc = N.new('ShaderNodeTexCoord')
    nrm = N.new('ShaderNodeVectorMath'); nrm.operation = 'NORMALIZE'
    Lk.new(tc.outputs['Generated'], nrm.inputs[0])
    base = N.new('ShaderNodeValue'); base.outputs[0].default_value = 0.32
    acc = base.outputs[0]
    for vec, amp, power in (((-0.7, -0.7, 0.1), 0.40, 6.0),
                            ((0.8, 0.2, 0.2), 0.20, 6.0)):
        ln = math.sqrt(sum(c * c for c in vec))
        d = N.new('ShaderNodeVectorMath'); d.operation = 'DOT_PRODUCT'
        d.inputs[1].default_value = tuple(c / ln for c in vec)
        Lk.new(nrm.outputs[0], d.inputs[0])
        mx = N.new('ShaderNodeMath'); mx.operation = 'MAXIMUM'; mx.inputs[1].default_value = 0.0
        Lk.new(d.outputs[1], mx.inputs[0])
        pw = N.new('ShaderNodeMath'); pw.operation = 'POWER'; pw.inputs[1].default_value = power
        Lk.new(mx.outputs[0], pw.inputs[0])
        ma = N.new('ShaderNodeMath'); ma.operation = 'MULTIPLY_ADD'; ma.inputs[1].default_value = amp
        Lk.new(pw.outputs[0], ma.inputs[0]); Lk.new(acc, ma.inputs[2])
        acc = ma.outputs[0]
    expo = N.new('ShaderNodeValue'); expo.outputs[0].default_value = 1.0
    mul = N.new('ShaderNodeMath'); mul.operation = 'MULTIPLY'
    Lk.new(acc, mul.inputs[0]); Lk.new(expo.outputs[0], mul.inputs[1])
    bg_l = N.new('ShaderNodeBackground'); bg_l.inputs['Color'].default_value = (1, 1, 1, 1)
    Lk.new(mul.outputs[0], bg_l.inputs['Strength'])
    bg_c = N.new('ShaderNodeBackground'); bg_c.inputs['Color'].default_value = (1, 1, 1, 1)
    bg_c.inputs['Strength'].default_value = 1.0
    lp = N.new('ShaderNodeLightPath')
    mix = N.new('ShaderNodeMixShader')
    Lk.new(lp.outputs['Is Camera Ray'], mix.inputs['Fac'])
    Lk.new(bg_l.outputs['Background'], mix.inputs[1])
    Lk.new(bg_c.outputs['Background'], mix.inputs[2])
    Lk.new(mix.outputs['Shader'], out.inputs['Surface'])
    return expo

EXPO = build_world()

def add_light(name, kind, loc, target, energy, size, color):
    ld = bpy.data.lights.new(name, kind)
    ld.energy = energy
    ld.color = color
    if kind == 'AREA':
        ld.shape = 'SQUARE'
        ld.size = size
    o = bpy.data.objects.new(name, ld)
    o.location = loc
    d = Vector(target) - Vector(loc)
    o.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
    scene.collection.objects.link(o)
    return o

add_light("Key", 'AREA', (-2.0, -3.2, 2.8), (0.10, 0.0, 0.35), 170.0, 4.0, (1.0, 0.96, 0.90))
add_light("Rim", 'AREA', (2.4, 1.8, 2.4), (0.10, 0.0, 0.35), 85.0, 2.5, (0.85, 0.90, 1.0))

# ------------------------------------------------------------------ object helper
def add(name, mesh, mat=None, loc=(0, 0, 0), parent=None, rot=None, scale=None):
    o = bpy.data.objects.new(name, mesh)
    if mat is not None and mesh is not None and len(mesh.materials) == 0:
        mesh.materials.append(mat)
    o.location = loc
    if rot:
        o.rotation_euler = rot
    if scale:
        o.scale = scale
    if parent:
        o.parent = parent
    scene.collection.objects.link(o)
    return o

def empty(name):
    o = bpy.data.objects.new(name, None)
    scene.collection.objects.link(o)
    return o

# ------------------------------------------------------------------ ground band, fixture plate
band_me = finish("band", [(-40, 3, -40), (40, 3, -40), (40, 3, 0), (-40, 3, 0)],
                 [(0, 1, 2, 3)], 0)
add("band", band_me, M_BAND)
add("plate_base", cyl_mesh("plate_base", PLATE_R, 0.07, 128), M_PLATE, loc=(PART_X, 0, 0))
add("plate_ring", cyl_mesh("plate_ring", PLATE_R - 0.05, 0.03, 128), M_COBALT,
    loc=(PART_X, 0, 0.07))
for i, ang in enumerate((30, 150, 270)):
    a = math.radians(ang)
    add("clamp%d" % i, box_mesh("clamp", 0.055, 0.085, 0.025), M_GRAPHITE,
        loc=(PART_X + 0.51 * math.cos(a), 0.51 * math.sin(a), 0.112), rot=(0, 0, a))

# ------------------------------------------------------------------ part meshes
def shell_radius(k):
    return R + (RIB_EXTRA if k in RIBS else 0.0) + BEAD_RAD + SHELL_GAP

def shell_mesh(name, segs=160):
    """Continuous revolved profile with hard steps at the rib layers."""
    prof = [(Z0, shell_radius(0))]
    for k in range(NL):
        zt = Z0 + (k + 1) * DZ
        rk = shell_radius(k)
        prof.append((zt, rk))
        if k < NL - 1:
            rn = shell_radius(k + 1)
            if abs(rn - rk) > 1e-9:
                prof.append((zt, rn))
    # cover the crown of the top bead
    prof.append((Z0 + (NL - 0.5) * DZ + BEAD_VERT, shell_radius(NL - 1)))

    verts, faces, smooth = [], [], []
    for z, r in prof:
        for j in range(segs):
            a = 2 * math.pi * j / segs
            verts.append((r * math.cos(a), r * math.sin(a), z))
    for i in range(len(prof) - 1):
        z0, z1 = prof[i][0], prof[i + 1][0]
        a, b = i * segs, (i + 1) * segs
        is_side = abs(z1 - z0) > 1e-9
        for j in range(segs):
            j2 = (j + 1) % segs
            faces.append((a + j, a + j2, b + j2, b + j))
            smooth.append(is_side)
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    me.update()
    for p, sm in zip(me.polygons, smooth):
        p.use_smooth = sm
    me.materials.append(M_SHELL)
    return me

add("machined_shell", shell_mesh("machined_shell"), None, loc=(PART_X, 0, 0))

T_NORM = torus_mesh("t_norm", R, BEAD_RAD, sv=BEAD_SV, phase=-math.pi / 2)
T_RIB  = torus_mesh("t_rib", R + RIB_EXTRA, BEAD_RAD, sv=BEAD_SV, phase=-math.pi / 2)

# per-bead meshes (unique material for heat fade)
beads = []
for i in range(NL):
    base = T_RIB if i in RIBS else T_NORM
    mat = M_BUILT.copy()
    mat.name = "b%d" % i
    pb = principled(mat)
    pb.inputs['Emission Color'].default_value = (1.0, 0.18, 0.02, 1)
    me = base.copy()
    me.name = "bead_mesh_%02d" % i
    me.materials.clear()
    me.materials.append(mat)
    z = Z0 + (i + 0.5) * DZ
    o = add("bead%02d" % i, me, None, loc=(PART_X, 0, z))
    beads.append((o, mat, z))

# ------------------------------------------------------------------ robot arm
ped      = add("pedestal", cyl_mesh("ped", 0.075, SHOULDER_Z, 48), M_TEAL,
               loc=(BASE_X, BASE_Y, 0))
foot     = add("foot", cyl_mesh("foot", 0.15, 0.035, 48), M_GRAPHITE,
               loc=(BASE_X, BASE_Y, 0))
base_ring = add("base_ring", cyl_mesh("br", 0.105, 0.05, 48), M_GRAPHITE,
                loc=(BASE_X, BASE_Y, 0.035))
shoulder = add("shoulder", cyl_mesh("sh", 0.085, 0.16, 40, centered=True), M_GRAPHITE,
               loc=(BASE_X, BASE_Y - 0.03, SHOULDER_Z), rot=(math.pi / 2, 0, 0))
elbow    = add("elbow", cyl_mesh("el", 0.060, 0.11, 40, centered=True), M_GRAPHITE,
               rot=(math.pi / 2, 0, 0))
wrist    = add("wrist", cyl_mesh("wr", 0.050, 0.10, 40, centered=True), M_GRAPHITE,
               rot=(math.pi / 2, 0, 0))
link1    = add("link1", cyl_mesh("l1", 0.045, 1.0, 40, centered=True), M_TEAL)
link2    = add("link2", cyl_mesh("l2", 0.035, 1.0, 40, centered=True), M_TEAL)
hose1    = add("hose1", cyl_mesh("h1", 0.007, 1.0, 16, centered=True), M_GRAPHITE)
hose2    = add("hose2", cyl_mesh("h2", 0.007, 1.0, 16, centered=True), M_GRAPHITE)

# torch rig (origin = nozzle tip)
torch = empty("TorchRig")
add("nozzle", cyl_mesh("nz", 0.014, 0.035, 32, centered=True), M_COPPER,
    loc=(0, 0, 0.0175), parent=torch)
add("ceramic", cyl_mesh("ce", 0.021, 0.014, 32, centered=True), M_CERAMIC,
    loc=(0, 0, 0.042), parent=torch)
add("tbody", cyl_mesh("tb", 0.026, 0.10, 32, centered=True), M_GRAPHITE,
    loc=(0, 0, 0.099), parent=torch)
add("tneck", cyl_mesh("tn", 0.020, 0.05, 32, centered=True), M_GRAPHITE,
    loc=(0, 0, 0.165), parent=torch)
add("toolmount", cyl_mesh("tm", 0.032, 0.05, 32, centered=True), M_GRAPHITE,
    loc=(0, 0, 0.195), parent=torch)
add("wire", cyl_mesh("wi", 0.0025, 0.012, 12, centered=True), M_WIRE,
    loc=(0, 0, -0.006), parent=torch)
arc = add("arc", sphere_mesh("arc", 0.011, 16, 10), M_ARC,
          loc=(0, 0, -0.002), parent=torch)
pool = add("pool", sphere_mesh("pool", 0.013, 16, 10), M_POOL,
           loc=(0, 0.050, -0.004), parent=torch, scale=(1.5, 0.9, 0.55))

# ------------------------------------------------------------------ cnc head
mill = empty("MillRig")
spin = empty("Spindle")
spin.parent = mill
spin.location = (0, 0, 0.055)
add("cutter", cyl_mesh("cu", TOOL_R, TOOL_FLUTE, 48, centered=True), M_CUTTER,
    parent=spin)
for i in range(4):
    a = 2 * math.pi * i / 4
    add("flute%d" % i, box_mesh("fl", 0.0045, 0.003, 0.095), M_GRAPHITE,
        loc=(0.0295 * math.cos(a), 0.0295 * math.sin(a), 0), rot=(0, 0, a), parent=spin)
add("taper", cyl_mesh("tp", 0.012, 0.025, 32, centered=True), M_CUTTER,
    loc=(0, 0, 0.1225), parent=mill)
add("shank", cyl_mesh("sk", TOOL_NECK, 0.36, 32, centered=True), M_CUTTER,
    loc=(0, 0, 0.315), parent=mill)
add("chuck", cyl_mesh("ch", 0.036, 0.065, 40, centered=True), M_GRAPHITE,
    loc=(0, 0, 0.5275), parent=mill)
add("nose", cyl_mesh("no", 0.055, 0.04, 40, centered=True), M_GRAPHITE,
    loc=(0, 0, 0.58), parent=mill)
add("housing", box_mesh("ho", 0.16, 0.14, 0.20), M_TEAL,
    loc=(0, 0, 0.70), parent=mill)
add("motortop", cyl_mesh("mt", 0.065, 0.05, 32, centered=True), M_GRAPHITE,
    loc=(0, 0, 0.825), parent=mill)
cutglow = add("cutglow", sphere_mesh("cg", 0.012, 16, 10), M_CUTGLOW,
              loc=(-0.026, -0.040, 0.022), parent=mill, scale=(1.0, 1.0, 0.7))

# fixed column and top arm
add("column_base", box_mesh("cb", 0.30, 0.30, 0.06), M_GRAPHITE,
    loc=(COLUMN_X, 0, 0.03))
add("column", box_mesh("co", 0.14, 0.18, 1.42), M_TEAL,
    loc=(COLUMN_X, 0, 0.71))
add("column_rail", box_mesh("cr", 0.035, 0.02, 1.30), M_MACH,
    loc=(COLUMN_X - 0.078, -0.092, 0.68))
add("top_arm", box_mesh("ta", 0.50, 0.14, 0.08), M_TEAL,
    loc=(COLUMN_X - 0.25, 0, 1.38))
add("top_cap", box_mesh("tc", 0.22, 0.20, 0.04), M_GRAPHITE,
    loc=(COLUMN_X, 0, 1.44))
ram = add("ram", box_mesh("ra", 0.060, 0.060, 1.0), M_MACH, loc=(0, 0, 0))
carriage = add("ram_carriage", box_mesh("rc", 0.16, 0.17, 0.13), M_GRAPHITE,
               loc=(0, 0, 1.305))

# ------------------------------------------------------------------ camera
camd = bpy.data.cameras.new("Cam")
camd.type = 'ORTHO'
camd.sensor_fit = 'HORIZONTAL'
camd.clip_start, camd.clip_end = 0.1, 100.0
cam = bpy.data.objects.new("Cam", camd)
cam.rotation_euler = (math.pi / 2, 0, 0)
scene.collection.objects.link(cam)
scene.camera = cam

# ------------------------------------------------------------------ timeline helpers
def dep_n(t):
    return min(max((t - T_DEP_START) / LAYER_T, 0.0), float(NL))

def dep_layer(t):
    n = dep_n(t)
    i = min(int(math.floor(n)), NL - 1)
    return i, min(max(n - i, 0.0), 1.0)

def torch_z_dep(t):
    i, u = dep_layer(t)
    z = Z0 + DZ * (i + 1) + BEAD_TOP + TORCH_GAP
    if i < NL - 1 and u > 0.80:
        z += DZ * ease((u - 0.80) / 0.20)
    return z

def torch_target(t):
    if t < T_APPROACH_END:
        z0 = Z0 + DZ + BEAD_TOP + TORCH_GAP
        return PART_X, lerp(0.72, z0, ease(t / T_APPROACH_END))
    if t < T_DEP_END:
        return PART_X, torch_z_dep(t)
    z_dep = torch_z_dep(T_DEP_END)
    if t < T_LIFT_END:
        return PART_X, lerp(z_dep, 0.62, ease((t - T_DEP_END) / (T_LIFT_END - T_DEP_END)))
    if t < T_PARK_END:
        u = ease((t - T_LIFT_END) / (T_PARK_END - T_LIFT_END))
        return lerp(PART_X, PARK_X, u), lerp(0.62, PARK_Z, u)
    return PARK_X, PARK_Z

def mill_tip(t):
    if t < T_FEED_START:
        return MILL_PARK_Z
    if t < T_FEED_END:
        return lerp(FEED_Z0, FEED_Z1, (t - T_FEED_START) / (T_FEED_END - T_FEED_START))
    if t < T_DWELL_END:
        return FEED_Z1
    if t < T_MILL_UP_END:
        return lerp(FEED_Z1, MILL_END_Z, ease((t - T_DWELL_END) / (T_MILL_UP_END - T_DWELL_END)))
    return MILL_END_Z

def final_radius_at(z):
    k = int(math.floor((z - Z0) / DZ))
    k = min(max(k, 0), NL - 1)
    return shell_radius(k)

def ik(S, Wp):
    dx, dz = Wp[0] - S[0], Wp[1] - S[1]
    raw = max(math.hypot(dx, dz), 1e-6)
    d = min(max(raw, abs(L1 - L2) + 0.04), L1 + L2 - 0.001)
    ux, uz = dx / raw, dz / raw
    a = (L1 * L1 - L2 * L2 + d * d) / (2 * d)
    h = math.sqrt(max(L1 * L1 - a * a, 0.0))
    E = (S[0] + ux * a - uz * h, S[1] + uz * a + ux * h)
    W = (S[0] + ux * d, S[1] + uz * d)
    return E, W

def key_loc(o, f, x, y, z):
    o.location = (x, y, z)
    o.keyframe_insert('location', frame=f)

def key_link3(o, f, a, b):
    a, b = Vector(a), Vector(b)
    d = b - a
    ln = max(d.length, 1e-6)
    o.location = (a + b) / 2
    o.rotation_euler = d.to_track_quat('Z', 'Y').to_euler()
    o.scale = (1.0, 1.0, ln)
    for p in ('location', 'rotation_euler', 'scale'):
        o.keyframe_insert(p, frame=f)

def obj_fcurves(o):
    ad = o.animation_data
    if not ad or not ad.action:
        return []
    out = []
    for layer in ad.action.layers:
        for strip in layer.strips:
            for cb in strip.channelbags:
                out.extend(cb.fcurves)
    return out

def set_fcurve_interp(o, path, interp):
    for fc in obj_fcurves(o):
        if fc.data_path == path:
            for kp in fc.keyframe_points:
                kp.interpolation = interp

def vis_window(o, t_on, t_off=None):
    f_on = frame_of(t_on)
    o.hide_render = True
    o.keyframe_insert('hide_render', frame=1)
    o.hide_render = False
    o.keyframe_insert('hide_render', frame=f_on)
    if t_off is not None:
        o.hide_render = True
        o.keyframe_insert('hide_render', frame=frame_of(t_off))
    set_fcurve_interp(o, 'hide_render', 'CONSTANT')

def flick_scale(o, f0, f1, base, amp=0.10, speed=53.0, phase=0.0):
    for f in range(f0, f1 + 1):
        t = (f - 1) / FPS
        s = 1.0 + amp * math.sin(t * speed + phase) + 0.05 * math.sin(t * 91.0 + phase)
        o.scale = (base[0] * s, base[1] * s, base[2] * s)
        o.keyframe_insert('scale', frame=f)

# ------------------------------------------------------------------ camera
CAM_KEYS = [
    (0.00, 2.42, -0.08, 0.33),
    (0.60, 2.05, -0.04, 0.32),
    (2.30, 1.85, 0.01, 0.31),
    (4.05, 1.72, 0.03, 0.30),
    (4.55, 1.95, 0.00, 0.36),
    (4.80, 2.02, 0.06, 0.46),
    (5.20, 2.12, 0.08, 0.52),
    (5.55, 2.10, 0.08, 0.52),
    (6.35, 2.08, 0.08, 0.50),
    (6.55, 2.20, 0.04, 0.46),
    (6.96, 2.48, -0.08, 0.40),
]

def cam_state(t):
    if t <= CAM_KEYS[0][0]:
        return CAM_KEYS[0][1:]
    for i in range(len(CAM_KEYS) - 1):
        t0, w0, x0, z0 = CAM_KEYS[i]
        t1, w1, x1, z1 = CAM_KEYS[i + 1]
        if t <= t1:
            u = ease((t - t0) / max(t1 - t0, 1e-6))
            return lerp(w0, w1, u), lerp(x0, x1, u), lerp(z0, z1, u)
    return CAM_KEYS[-1][1:]

# ------------------------------------------------------------------ mill path + cutter profile
FRAME_T = [(f - 1) / FPS for f in range(1, N_FRAMES + 1)]
TIPS = [mill_tip(t) for t in FRAME_T]
MILL_XS = []
for t, z in zip(FRAME_T, TIPS):
    MILL_XS.append(PART_X + final_radius_at(z) + TOOL_R - CUT_DEPTH)
# temporal smoothing so the tool steps over the ribs instead of teleporting
for _ in range(2):
    sm = []
    for i in range(len(MILL_XS)):
        vals = [MILL_XS[min(max(i + j, 0), len(MILL_XS) - 1)] for j in (-2, -1, 0, 1, 2)]
        sm.append((vals[0] + 2 * vals[1] + 3 * vals[2] + 2 * vals[3] + vals[4]) / 9.0)
    MILL_XS = sm

# ------------------------------------------------------------------ animate camera + arm
S = (BASE_X, SHOULDER_Z)
HOSE_OFF = (0.020, -0.055, 0.025)
for f in range(1, N_FRAMES + 1):
    t = (f - 1) / FPS
    W, cx, cz = cam_state(t)
    cam.location = (cx, -10.0, cz)
    cam.keyframe_insert('location', frame=f)
    camd.ortho_scale = W
    camd.keyframe_insert('ortho_scale', frame=f)

    tx, tz = torch_target(t)
    wz = tz + TORCH_LEN
    E, Wc = ik(S, (tx, wz))
    E3 = (E[0], BASE_Y, E[1])
    W3 = (Wc[0], BASE_Y, Wc[1])
    S3 = (BASE_X, BASE_Y, SHOULDER_Z)
    key_loc(torch, f, Wc[0], TORCH_Y, Wc[1] - TORCH_LEN)
    key_loc(elbow, f, E3[0], E3[1], E3[2])
    key_loc(wrist, f, W3[0], W3[1], W3[2])
    key_link3(link1, f, S3, E3)
    key_link3(link2, f, E3, W3)
    key_link3(hose1, f, tuple(Vector(S3) + Vector(HOSE_OFF)),
              tuple(Vector(E3) + Vector(HOSE_OFF)))
    key_link3(hose2, f, tuple(Vector(E3) + Vector(HOSE_OFF)),
              tuple(Vector(W3) + Vector(HOSE_OFF)))

# ------------------------------------------------------------------ bead build (one revolution per layer, leading edge held at the torch)
for i, (o, mat, z) in enumerate(beads):
    t0 = T_DEP_START + i * LAYER_T
    f0 = frame_of(t0)
    df = max(1, int(round(LAYER_T * FPS)))
    m = o.modifiers.new('Build', 'BUILD')
    m.frame_start = f0
    m.frame_duration = df
    m.use_reverse = False
    m.use_random_order = False
    o.rotation_euler = (0, 0, 0)
    o.keyframe_insert('rotation_euler', frame=f0)
    o.rotation_euler = (0, 0, -2 * math.pi)
    o.keyframe_insert('rotation_euler', frame=f0 + df)
    set_fcurve_interp(o, 'rotation_euler', 'LINEAR')
    pb = principled(mat)
    pb.inputs['Emission Color'].default_value = (1.0, 0.20, 0.02, 1)
    pb.inputs['Emission Strength'].default_value = 1.2
    pb.inputs['Emission Strength'].keyframe_insert('default_value', frame=f0)
    pb.inputs['Emission Strength'].default_value = 0.0
    pb.inputs['Emission Strength'].keyframe_insert('default_value', frame=f0 + int(0.45 * FPS))

# ------------------------------------------------------------------ machined shell reveal
# The shell is opaque above the cutter and transparent below it, so the
# machined surface follows the tool exactly without stacked-band seams.
for f, val in ((1, 0.60),
               (frame_of(T_FEED_START), FEED_Z0),
               (frame_of(T_FEED_END), FEED_Z1),
               (N_FRAMES, 0.09)):
    SHELL_CUT.outputs[0].default_value = val
    SHELL_CUT.outputs[0].keyframe_insert('default_value', frame=f)
_ad = M_SHELL.node_tree.animation_data
if _ad and _ad.action:
    for _layer in _ad.action.layers:
        for _strip in _layer.strips:
            for _cb in _strip.channelbags:
                for _fc in _cb.fcurves:
                    for _kp in _fc.keyframe_points:
                        _kp.interpolation = 'LINEAR'

# ------------------------------------------------------------------ mill + spindle + ram
for f in range(1, N_FRAMES + 1):
    t = (f - 1) / FPS
    tip = TIPS[f - 1]
    mx = MILL_XS[f - 1]
    key_loc(mill, f, mx, 0, tip)
    key_loc(carriage, f, mx, 0, 1.305)
    spin.rotation_euler.z = -2 * math.pi * 2.0 * t
    spin.keyframe_insert('rotation_euler', frame=f)
    ram_top = 1.34
    ram_bot = tip + 0.80
    if ram_bot < ram_top - 0.002:
        ram.location = (mx, 0, (ram_bot + ram_top) / 2)
        ram.scale = (1, 1, ram_top - ram_bot)
    else:
        ram.location = (mx, 0, ram_top - 0.01)
        ram.scale = (1, 1, 0.001)
    ram.keyframe_insert('location', frame=f)
    ram.keyframe_insert('scale', frame=f)

# ------------------------------------------------------------------ torch glow / melt pool / cut glow
vis_window(pool, 0.55, 4.05)
vis_window(arc, 0.55, 4.05)
vis_window(cutglow, 4.90, 6.55)
flick_scale(pool, frame_of(0.55), frame_of(4.05), (1.5, 0.9, 0.55), amp=0.09, speed=61.0, phase=1.3)
flick_scale(arc, frame_of(0.55), frame_of(4.05), (1.0, 1.0, 1.15), amp=0.16, speed=83.0, phase=0.4)
flick_scale(cutglow, frame_of(4.90), frame_of(6.55), (1.0, 1.0, 0.7), amp=0.18, speed=97.0, phase=2.1)

# ------------------------------------------------------------------ sparks
SPARK_ME = sphere_mesh("sparkball", 0.005, 10, 6)
random.seed(7)
spark_defs = []

# deposition sparks, two per layer, born at the moving melt pool
for i in range(NL):
    tb = T_DEP_START + i * LAYER_T
    ztop = Z0 + (i + 1) * DZ + BEAD_TOP + 0.002
    for _ in range(2):
        t0 = tb + random.uniform(0.02, 0.90) * LAYER_T
        life = random.uniform(0.18, 0.32)
        p0 = Vector((PART_X + random.uniform(-0.018, 0.018),
                     -R - 0.020 + random.uniform(-0.010, 0.010),
                     ztop + random.uniform(0.000, 0.018)))
        v = Vector((random.uniform(-0.28, 0.28),
                    random.uniform(-0.16, 0.16),
                    random.uniform(0.25, 0.75)))
        spark_defs.append((t0, life, p0, v))

# machining sparks, born at the cutter / part contact
for _ in range(26):
    t0 = random.uniform(4.92, 6.48)
    life = random.uniform(0.18, 0.34)
    fi = min(max(int(round(t0 * FPS)), 0), N_FRAMES - 1)
    tip, mx = TIPS[fi], MILL_XS[fi]
    p0 = Vector((mx - 0.026 + random.uniform(-0.008, 0.008),
                 -0.030 + random.uniform(-0.020, 0.020),
                 tip + 0.020 + random.uniform(-0.010, 0.010)))
    v = Vector((random.uniform(0.10, 0.55),
                random.uniform(-0.18, 0.18),
                random.uniform(0.10, 0.55)))
    spark_defs.append((t0, life, p0, v))

for idx, (t0, life, p0, v) in enumerate(spark_defs):
    o = add("spark%02d" % idx, SPARK_ME, M_SPARK, loc=p0)
    f0, f1 = frame_of(t0), frame_of(t0 + life)
    vis_window(o, t0, t0 + life)
    fs = list(range(f0, f1 + 1, 2))
    if fs[-1] != f1:
        fs.append(f1)
    for f in fs:
        dt = (f - 1) / FPS - t0
        p = p0 + v * dt + Vector((0, 0, -1.0 * dt * dt))
        key_loc(o, f, p.x, p.y, p.z)

# ------------------------------------------------------------------ render settings
scene.frame_start, scene.frame_end = 1, N_FRAMES
scene.render.fps = FPS
scene.render.resolution_x, scene.render.resolution_y = RES_X, RES_Y
scene.render.resolution_percentage = 100
scene.render.engine = 'CYCLES'
scene.render.film_transparent = False
scene.render.dither_intensity = 0.0
cy = scene.cycles
cy.samples = SAMPLES
cy.use_adaptive_sampling = True
cy.adaptive_threshold = 0.01
cy.use_denoising = True
try:
    cy.denoiser = 'OPENIMAGEDENOISE'
except Exception:
    pass
cy.max_bounces = 6
cy.glossy_bounces = 4
cy.caustics_reflective = False
cy.caustics_refractive = False
cy.sample_clamp_indirect = 4.0
try:
    cp = bpy.context.preferences.addons['cycles'].preferences
    cp.compute_device_type = 'METAL'
    cp.get_devices()
    for d in cp.devices:
        d.use = (d.type != 'CPU')
    cy.device = 'GPU'
except Exception as e:
    print("GPU setup skipped:", e)
    cy.device = 'CPU'
vs = scene.view_settings
vs.view_transform = 'Standard'
try:
    vs.look = 'None'
except Exception:
    pass
vs.exposure, vs.gamma = 0.0, 1.0
im = scene.render.image_settings
im.file_format, im.color_mode, im.color_depth = 'PNG', 'RGB', '8'

# ------------------------------------------------------------------ render
if STILLS:
    still_dir = os.path.join(OUT_DIR, "stills")
    os.makedirs(still_dir, exist_ok=True)
    for f in STILLS:
        f = min(max(f, 1), N_FRAMES)
        scene.frame_set(f)
        scene.render.filepath = os.path.join(still_dir, "frame_%04d.png" % f)
        bpy.ops.render.render(write_still=True)
        print("STILL", f, "->", scene.render.filepath)
    print("DONE stills in", still_dir)
else:
    scene.render.filepath = os.path.join(FRAMES_DIR, "frame_")
    scene.frame_set(1)
    bpy.ops.render.render(animation=True)

    # ------------------------------------------------------------------ encode
    def find_ffmpeg():
        for p in ("/opt/homebrew/bin/ffmpeg", "/usr/local/bin/ffmpeg"):
            if os.path.exists(p):
                return p
        return shutil.which("ffmpeg")

    ff = find_ffmpeg()
    pattern = os.path.join(FRAMES_DIR, "frame_%04d.png")
    if ff:
        col = ["-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709"]
        enc = ["-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-g", "4", "-keyint_min", "4",
               "-sc_threshold", "0", "-bf", "0", "-movflags", "+faststart"] + col
        try:
            subprocess.run([ff, "-y", "-framerate", str(FPS), "-i", pattern,
                            "-frames:v", str(N_FRAMES),
                            "-vf", "scale=out_color_matrix=bt709:out_range=tv"] + enc +
                           ["-crf", "18", os.path.join(OUT_DIR, "process-1080.mp4")], check=True)
            subprocess.run([ff, "-y", "-framerate", str(FPS), "-i", pattern,
                            "-frames:v", str(N_FRAMES),
                            "-vf", "scale=1280:720:flags=lanczos:out_color_matrix=bt709:out_range=tv"] + enc +
                           ["-crf", "20", os.path.join(OUT_DIR, "process-720.mp4")], check=True)
            subprocess.run([ff, "-y", "-i", os.path.join(FRAMES_DIR, "frame_0001.png"),
                            "-q:v", "2", os.path.join(OUT_DIR, "process-poster.jpg")], check=True)
            print("DONE. Files are in", OUT_DIR)
        except Exception as e:
            print("ffmpeg step failed:", e)
    else:
        print("Frames rendered to", FRAMES_DIR, "- install ffmpeg (brew install ffmpeg) and encode them.")
