"""
Generates the schematic project figures in src/figures/*.svg.

They are original schematics (not copies of paper figures). Colours come from CSS
classes defined in src/components/ProjectFigure.astro, so they follow light/dark mode.
Re-run with:  python scripts/make_figures.py
Replace any of them with a real figure from your papers whenever you like.
"""
import math
import random
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "src" / "figures"
OUT.mkdir(parents=True, exist_ok=True)
W, H = 400, 260


def svg(body, label):
    return (
        f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" role="img" '
        f'aria-label="{label}">\n{body}\n</svg>\n'
    )


def f(x):
    return f"{x:.1f}"


def text(x, y, s, anchor="start", cls="ft"):
    return f'<text x="{f(x)}" y="{f(y)}" class="{cls}" text-anchor="{anchor}">{s}</text>'


# ───────────────────────── 1. MiMoS: multilayer network ─────────────────────────
def mimos():
    random.seed(3)
    out = []
    layers = [("road", 22, "si", 1.0), ("bus", 98, "sa", 2.0), ("bike", 174, "sa3", 1.6)]
    uv = {"A": (0.12, 0.3), "B": (0.38, 0.18), "C": (0.62, 0.32), "D": (0.86, 0.55),
          "E": (0.28, 0.72), "F": (0.54, 0.78), "G": (0.8, 0.88), "H": (0.1, 0.85)}
    edges = {
        "road": ["AB", "BC", "CD", "AE", "EF", "FG", "BE", "CF", "DG", "EH", "AH", "BF"],
        "bus": ["AB", "BC", "CD", "EF", "FG"],
        "bike": ["HE", "EF", "FC", "CB"],
    }

    def P(k, y0):
        u, v = uv[k]
        return 40 + 240 * u + 80 * v, y0 + 56 * v

    for name, y0, cls, sw in layers:
        pts = [(40, y0), (280, y0), (360, y0 + 56), (120, y0 + 56)]
        out.append('<polygon points="' + " ".join(f"{f(x)},{f(y)}" for x, y in pts) +
                   '" class="fb sf" stroke-width="1"/>')
        for e in edges[name]:
            (x1, y1), (x2, y2) = P(e[0], y0), P(e[1], y0)
            out.append(f'<line x1="{f(x1)}" y1="{f(y1)}" x2="{f(x2)}" y2="{f(y2)}" class="{cls}" '
                       f'stroke-width="{sw}" stroke-linecap="round"/>')
        used = set("".join(edges[name]))
        for k in used:
            x, y = P(k, y0)
            if name == "bus":
                out.append(f'<rect x="{f(x-3)}" y="{f(y-3)}" width="6" height="6" rx="1" class="fa"/>')
            else:
                out.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="2.6" class="fi"/>')
        out.append(text(372, y0 + 34, name, "start"))
    # transfers between layers
    for k in ("C", "E"):
        for (_, y0a, _, _), (_, y0b, _, _) in zip(layers, layers[1:]):
            (x1, y1), (x2, y2) = P(k, y0a), P(k, y0b)
            out.append(f'<line x1="{f(x1)}" y1="{f(y1)}" x2="{f(x2)}" y2="{f(y2)}" class="sa2" '
                       f'stroke-width="1.2" stroke-dasharray="3 3"/>')
    # agents on edges
    for name, y0, _, _ in layers:
        for e in random.sample(edges[name], min(3, len(edges[name]))):
            t = random.uniform(0.25, 0.75)
            (x1, y1), (x2, y2) = P(e[0], y0), P(e[1], y0)
            out.append(f'<circle cx="{f(x1+(x2-x1)*t)}" cy="{f(y1+(y2-y1)*t)}" r="3.6" class="fa2"/>')
    out.append(text(16, 250, "agents ● · transfers ┆", "start"))
    return svg("\n".join(out), "Multilayer transport network with agents")


# ───────────────────────── 2. FUZE: emissions around an LEZ ─────────────────────────
def fuze():
    random.seed(7)
    out = []
    cx, cy, R = 200, 122, 62
    step = 28
    xs = list(range(32, 372, step))
    ys = list(range(18, 230, step))

    def level(mx, my):
        d = math.hypot(mx - cx, my - cy)
        if d < R - 6:
            return 0.12 + 0.12 * random.random()
        if d < R + 46:
            return 0.65 + 0.35 * random.random()
        return 0.25 + 0.3 * random.random()

    segs = []
    for i, x in enumerate(xs):
        for j, y in enumerate(ys):
            jx, jy = (random.uniform(-4, 4), random.uniform(-4, 4))
            if i + 1 < len(xs):
                segs.append(((x, y), (xs[i + 1], y)))
            if j + 1 < len(ys):
                segs.append(((x, y), (x, ys[j + 1])))
    for (x1, y1), (x2, y2) in segs:
        lv = level((x1 + x2) / 2, (y1 + y2) / 2)
        cls = "sa" if lv < 0.3 else ("sa2" if lv > 0.6 else "sf")
        out.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" class="{cls}" '
                   f'stroke-width="{f(0.8 + 3.2*lv)}" stroke-linecap="round" opacity="{f(0.45+0.55*lv)}"/>')
    out.append(f'<circle cx="{cx}" cy="{cy}" r="{R}" class="sf-ink" fill="none" stroke-width="1.5" stroke-dasharray="6 4"/>')
    out.append(f'<rect x="{cx-20}" y="{cy-9}" width="40" height="18" rx="9" class="fb"/>')
    out.append(text(cx, cy + 4, "LEZ", "middle", "ft strong"))
    # legend
    out.append('<rect x="16" y="236" width="368" height="20" rx="4" class="fb"/>')
    out.append('<line x1="24" y1="246" x2="44" y2="246" class="sa" stroke-width="2"/>')
    out.append(text(50, 250, "fewer emissions"))
    out.append('<line x1="160" y1="246" x2="180" y2="246" class="sa2" stroke-width="4"/>')
    out.append(text(186, 250, "more emissions (displaced)"))
    return svg("\n".join(out), "Road links coloured by emissions around a low emission zone")


# ───────────────────────── 3. Critical mobility: transition curve ─────────────────────────
def critical():
    random.seed(11)
    out = []
    x0, y0, x1, y1 = 52, 212, 380, 24   # plot box (x0,y0 bottom-left)
    mc = 0.42

    def X(m): return x0 + (x1 - x0) * m
    def Y(s): return y0 - (y0 - y1) * s

    def size(m):
        return 0 if m <= mc else 0.92 * (1 - math.exp(-(m - mc) * 5.5))

    out.append(f'<rect x="{x0}" y="{y1}" width="{f(X(mc)-x0)}" height="{y0-y1}" class="fa-soft"/>')
    out.append(f'<rect x="{f(X(mc))}" y="{y1}" width="{f(x1-X(mc))}" height="{y0-y1}" class="fa2-soft"/>')
    # stochastic realizations
    for k in range(70):
        m = random.random()
        s = size(m)
        if m > mc - 0.06 and random.random() < 0.35:
            s = random.choice([0, s])
        s = max(0, min(1, s + random.gauss(0, 0.04) * (1 if s > 0 else 0.3)))
        out.append(f'<circle cx="{f(X(m))}" cy="{f(Y(s))}" r="2.4" class="fi" opacity="0.35"/>')
    pts = " ".join(f"{f(X(i/200))},{f(Y(size(i/200)))}" for i in range(201))
    out.append(f'<polyline points="{pts}" fill="none" class="sa2" stroke-width="3" stroke-linejoin="round"/>')
    out.append(f'<line x1="{f(X(mc))}" y1="{y1}" x2="{f(X(mc))}" y2="{y0}" class="sf-ink" stroke-width="1.2" stroke-dasharray="4 4"/>')
    # axes
    out.append(f'<line x1="{x0}" y1="{y0}" x2="{x1}" y2="{y0}" class="sf-ink" stroke-width="1.2"/>')
    out.append(f'<line x1="{x0}" y1="{y0}" x2="{x0}" y2="{y1}" class="sf-ink" stroke-width="1.2"/>')
    out.append(text(x1, 230, "mobility →", "end"))
    out.append(f'<text x="22" y="{(y0+y1)/2}" class="ft" text-anchor="middle" transform="rotate(-90 22 {(y0+y1)/2})">outbreak size →</text>')
    out.append(text(X(mc), 230, "critical mobility", "middle", "ft strong"))
    out.append(text(x0 + 10, y1 + 18, "contained"))
    out.append(text(X(mc) + 10, y1 + 18, "outbreak"))
    return svg("\n".join(out), "Outbreak size versus mobility with a critical threshold")


# ───────────────────────── 4. Contact tracing: multi-setting network ─────────────────────────
def tracing():
    random.seed(5)
    out = []
    settings = [("household", 92, 80, 46), ("school", 300, 72, 52), ("work", 296, 190, 52), ("community", 104, 192, 54)]
    nodes = []
    for si, (name, cx, cy, r) in enumerate(settings):
        out.append(f'<circle cx="{cx}" cy="{cy}" r="{r+10}" class="fb sf" stroke-width="1"/>')
        out.append(text(cx, cy - r - 16 if cy < 130 else cy + r + 24, name, "middle"))
        n = 6 if name == "household" else 8
        for k in range(n):
            a = 2 * math.pi * k / n + random.uniform(-0.2, 0.2)
            rr = r * random.uniform(0.35, 0.85)
            nodes.append((cx + rr * math.cos(a), cy + rr * math.sin(a), si))
    edges = set()
    for i, (xa, ya, sa) in enumerate(nodes):
        for j, (xb, yb, sb) in enumerate(nodes):
            if i < j:
                d = math.hypot(xa - xb, ya - yb)
                if (sa == sb and d < 55 and random.random() < 0.55) or (sa != sb and d < 175 and random.random() < 0.035):
                    edges.add((i, j))
    # ensure a tracing chain across settings
    chain = [2, 9, 18, 26]
    for a, b in zip(chain, chain[1:]):
        edges.add((min(a, b), max(a, b)))
    chain_edges = {(min(a, b), max(a, b)) for a, b in zip(chain, chain[1:])}
    for i, j in edges:
        cls, sw = ("sa2", 2.2) if (i, j) in chain_edges else ("sf", 1)
        out.append(f'<line x1="{f(nodes[i][0])}" y1="{f(nodes[i][1])}" x2="{f(nodes[j][0])}" y2="{f(nodes[j][1])}" class="{cls}" stroke-width="{sw}"/>')
    app = set(random.sample(range(len(nodes)), 13)) | set(chain[1:])
    for k, (x, y, _) in enumerate(nodes):
        if k in app:
            out.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="7" fill="none" class="sa" stroke-width="1.6"/>')
        cls = "fa2" if k == chain[0] else ("fa2-mid" if k in chain else "fi")
        out.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="{4 if k in chain else 3}" class="{cls}"/>')
    out.append('<circle cx="22" cy="248" r="4" class="fa2"/>')
    out.append(text(30, 252, "detected case"))
    out.append('<circle cx="142" cy="248" r="6" fill="none" class="sa" stroke-width="1.6"/><circle cx="142" cy="248" r="2.6" class="fi"/>')
    out.append(text(152, 252, "app user"))
    out.append('<line x1="224" y1="248" x2="244" y2="248" class="sa2" stroke-width="2.2"/>')
    out.append(text(250, 252, "traced contacts"))
    return svg("\n".join(out), "Contact network across household, school, work and community settings")


# ───────────────────────── 5. Cooperation: humans & AIs ─────────────────────────
def cooperation():
    random.seed(21)
    out = []
    cols, rows, gap = 9, 7, 26
    ox, oy = 24, 26
    for r in range(rows):
        for c in range(cols):
            x, y = ox + c * gap, oy + r * gap
            if c + 1 < cols:
                out.append(f'<line x1="{x}" y1="{y}" x2="{x+gap}" y2="{y}" class="sf" stroke-width="1"/>')
            if r + 1 < rows:
                out.append(f'<line x1="{x}" y1="{y}" x2="{x}" y2="{y+gap}" class="sf" stroke-width="1"/>')
    ais = {(1, 1), (5, 2), (2, 5), (7, 5), (4, 4), (7, 0)}
    for r in range(rows):
        for c in range(cols):
            x, y = ox + c * gap, oy + r * gap
            near_ai = min(abs(c - a) + abs(r - b) for a, b in ais)
            coop = random.random() < (0.85 if near_ai <= 1 else 0.6 if near_ai == 2 else 0.25)
            if (c, r) in ais:
                out.append(f'<rect x="{x-8}" y="{y-8}" width="16" height="16" rx="4" class="fa3"/>')
                out.append(f'<text x="{x}" y="{y+3.5}" class="ft-on" text-anchor="middle">AI</text>')
            else:
                out.append(f'<circle cx="{x}" cy="{y}" r="7" class="{"fa" if coop else "fa2"}"/>')
    # payoff matrix
    mx, my, cw = 272, 54, 50
    out.append(text(mx + cw, my - 18, "Prisoner’s dilemma", "middle", "ft strong"))
    out.append(text(mx + cw / 2, my - 4, "C", "middle"))
    out.append(text(mx + 1.5 * cw, my - 4, "D", "middle"))
    out.append(text(mx - 8, my + cw / 2 + 4, "C", "end"))
    out.append(text(mx - 8, my + 1.5 * cw + 4, "D", "end"))
    vals = [["R, R", "S, T"], ["T, S", "P, P"]]
    for i in range(2):
        for j in range(2):
            out.append(f'<rect x="{mx + j*cw}" y="{my + i*cw}" width="{cw}" height="{cw}" class="fb sf-ink" stroke-width="1"/>')
            out.append(text(mx + j * cw + cw / 2, my + i * cw + cw / 2 + 4, vals[i][j], "middle", "ft mono-ink"))
    out.append(text(mx + cw, my + 2 * cw + 20, "T > R > P > S", "middle"))
    # legend
    out.append('<circle cx="30" cy="232" r="6" class="fa"/>')
    out.append(text(40, 236, "cooperate"))
    out.append('<circle cx="118" cy="232" r="6" class="fa2"/>')
    out.append(text(128, 236, "defect"))
    out.append('<rect x="186" y="225" width="14" height="14" rx="3" class="fa3"/>')
    out.append(text(206, 236, "AI agent"))
    return svg("\n".join(out), "Humans and AI agents on a lattice playing the Prisoner's dilemma")


# ───────────────────────── 6. Digital twin: what-if with uncertainty ─────────────────────────
def digitaltwin():
    random.seed(2)
    out = []
    x0, y0, x1, y1 = 48, 204, 384, 28
    T = 120
    tp = 50

    def X(t): return x0 + (x1 - x0) * t / T
    def Y(v): return y0 - (y0 - y1) * v

    base = [0.62 + 0.08 * math.sin(t / 7) + 0.02 * math.sin(t / 2.3) for t in range(T + 1)]
    pol = [b if t <= tp else b - 0.22 * (1 - math.exp(-(t - tp) / 18)) for t, b in enumerate(base)]

    def band(series, start, widen, cls, op):
        top, bot = [], []
        for t in range(start, T + 1):
            w = 0.03 + widen * (t - start) / (T - start)
            top.append((X(t), Y(series[t] + w)))
            bot.append((X(t), Y(series[t] - w)))
        pts = top + bot[::-1]
        return f'<polygon points="{" ".join(f"{f(a)},{f(b)}" for a, b in pts)}" class="{cls}" opacity="{op}"/>'

    out.append(band(base, tp, 0.10, "fi", 0.10))
    out.append(band(pol, tp, 0.14, "fa", 0.18))
    out.append(band(pol, tp, 0.07, "fa", 0.22))
    hist = " ".join(f"{f(X(t))},{f(Y(base[t]))}" for t in range(tp + 1))
    out.append(f'<polyline points="{hist}" fill="none" class="si" stroke-width="2.2"/>')
    bl = " ".join(f"{f(X(t))},{f(Y(base[t]))}" for t in range(tp, T + 1))
    out.append(f'<polyline points="{bl}" fill="none" class="si" stroke-width="1.6" stroke-dasharray="5 4"/>')
    pl = " ".join(f"{f(X(t))},{f(Y(pol[t]))}" for t in range(tp, T + 1))
    out.append(f'<polyline points="{pl}" fill="none" class="sa" stroke-width="2.6"/>')
    out.append(f'<line x1="{f(X(tp))}" y1="{y1}" x2="{f(X(tp))}" y2="{y0}" class="sa2" stroke-width="1.4" stroke-dasharray="3 3"/>')
    out.append(text(X(tp) + 6, y1 + 10, "policy starts", "start", "ft strong"))
    out.append(f'<line x1="{x0}" y1="{y0}" x2="{x1}" y2="{y0}" class="sf-ink" stroke-width="1.2"/>')
    out.append(f'<line x1="{x0}" y1="{y0}" x2="{x0}" y2="{y1}" class="sf-ink" stroke-width="1.2"/>')
    out.append(text((x0 + x1) / 2, 226, "time →", "middle"))
    out.append(f'<text x="20" y="{(y0+y1)/2}" class="ft" text-anchor="middle" transform="rotate(-90 20 {(y0+y1)/2})">pollutant level →</text>')
    out.append(f'<line x1="60" y1="248" x2="80" y2="248" class="si" stroke-width="1.6" stroke-dasharray="5 4"/>')
    out.append(text(86, 252, "baseline"))
    out.append(f'<rect x="160" y="242" width="20" height="12" class="fa" opacity="0.35"/>')
    out.append(text(186, 252, "scenario ± uncertainty"))
    return svg("\n".join(out), "What-if scenario with uncertainty bands compared to a baseline")


for name, fn in [("mimos", mimos), ("fuze", fuze), ("critical", critical),
                 ("tracing", tracing), ("cooperation", cooperation), ("digitaltwin", digitaltwin)]:
    (OUT / f"{name}.svg").write_text(fn(), encoding="utf-8")
    print("wrote", name)
