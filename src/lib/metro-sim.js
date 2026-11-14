// Toy metro + SIRS epidemic. Pure logic, no drawing (the home page draws it; Node can test it).
//
// Simplified port of the rules in Desktop/Work/metro-topology (claude/src/metro/sim.py):
//  - Trains run at constant speed, stop at every station, turn back instantly at the line ends.
//  - At a stop: passengers alight one by one, then board one by one (FIFO), each taking t_b.
//    Passengers who arrive during the dwell can still board. Capacity 6 per train.
//  - Trains ghost each other: they interact only through the station queues.
//  - Trains start evenly spaced in distance along their cycle.
// Differences: no station shapes; each commuter picks a random destination station (random OD);
// a fixed population loops between "activity" at a station and trips; time is in frames.
//
// Epidemic (SIRS) on commuters. Contacts happen only on the same train or at the same station
// while waiting. Infected recover; immunity wanes, so the infection stays endemic.

// Tuned by headless runs (728x300, 10 simulated minutes, 6 networks): no reseeds,
// ~30% infected, ~35% of commuters waiting on platforms.
export const PARAMS = {
  speed: 2, // px per frame
  tb: 3, // frames per passenger boarding or alighting
  cap: 6, // passengers per train
  trainsPerLine: 2,
  peoplePerStation: 4.5,
  actMin: 400, actMax: 1100, // frames spent at a station between trips
  betaTrain: 0.006, betaStation: 0.003, // infection prob per frame per infected contact
  infDur: 1100, // frames infected
  immMin: 500, immMax: 1000, // frames immune
  boostRef: 62, boostExp: 3, // see `boost` below
  pace: 0.85, // < 1 slows everything down uniformly (same dynamics, stretched time)
  binFrames: 120, bins: 105, // infection history: bins of 120 frames (~2 s); 105 kept (90 shown + 15 for the 30 s window)
  dashes: [[], [9, 5], [2, 4]],
};

export function createSim(W, H, P0 = PARAMS, rand = Math.random) {
  const pad = 26;
  // Apply the pace: slower movement, longer durations, lower per-frame probabilities.
  const k = P0.pace ?? 1;
  const P = {
    ...P0, speed: P0.speed * k, tb: P0.tb / k, actMin: P0.actMin / k, actMax: P0.actMax / k,
    infDur: P0.infDur / k, immMin: P0.immMin / k, immMax: P0.immMax / k,
    betaTrain: P0.betaTrain * k, betaStation: P0.betaStation * k,
  };

  // ── Stations: random points with a minimum spacing
  const target = Math.round(Math.max(9, Math.min(16, (W * H) / 14000)));
  const minD = Math.sqrt((W * H) / target) * 0.55;
  const pts = [];
  for (let tries = 0; pts.length < target && tries < 5000; tries++) {
    const p = { x: pad + rand() * (W - 2 * pad), y: pad + rand() * (H - 2 * pad) };
    if (pts.every((q) => Math.hypot(p.x - q.x, p.y - q.y) >= minD)) pts.push(p);
  }
  const N = pts.length;
  const dist = (a, b) => Math.hypot(pts[a].x - pts[b].x, pts[a].y - pts[b].y);

  // ── Proximity graph: 3 nearest neighbours, then join components
  const adj = Array.from({ length: N }, () => new Set());
  const link = (a, b) => { adj[a].add(b); adj[b].add(a); };
  for (let i = 0; i < N; i++) {
    const near = [...Array(N).keys()].filter((j) => j !== i).sort((a, b) => dist(i, a) - dist(i, b));
    near.slice(0, 3).forEach((j) => link(i, j));
  }
  const comp = () => {
    const c = new Array(N).fill(-1); let k = 0;
    for (let s = 0; s < N; s++) {
      if (c[s] >= 0) continue;
      const st = [s]; c[s] = k;
      while (st.length) { const u = st.pop(); adj[u].forEach((v) => { if (c[v] < 0) { c[v] = k; st.push(v); } }); }
      k++;
    }
    return { c, k };
  };
  for (let { c, k } = comp(); k > 1; ({ c, k } = comp())) {
    let best = [0, 0], bd = Infinity;
    for (let a = 0; a < N; a++) for (let b = 0; b < N; b++) {
      if (c[a] === 0 && c[b] !== 0 && dist(a, b) < bd) { bd = dist(a, b); best = [a, b]; }
    }
    link(best[0], best[1]);
  }

  // ── Lines: paths between far-apart stations. Each new line passes through a station of an
  //    earlier line, so the metro is always connected. Reused track segments cost more.
  const used = new Map();
  const ek = (a, b) => (a < b ? `${a}-${b}` : `${b}-${a}`);
  const shortest = (a, b, banned) => {
    const D = new Array(N).fill(Infinity), prev = new Array(N).fill(-1), done = new Array(N).fill(false);
    D[a] = 0;
    for (;;) {
      let u = -1;
      for (let i = 0; i < N; i++) if (!done[i] && D[i] < Infinity && (u < 0 || D[i] < D[u])) u = i;
      if (u < 0 || u === b) break;
      done[u] = true;
      adj[u].forEach((v) => {
        if (banned.has(v) && v !== b) return;
        const w = dist(u, v) * (1 + 2 * (used.get(ek(u, v)) || 0));
        if (D[u] + w < D[v]) { D[v] = D[u] + w; prev[v] = u; }
      });
    }
    if (D[b] === Infinity) return null;
    const path = [b];
    while (path[0] !== a) path.unshift(prev[path[0]]);
    return path;
  };
  const extremes = (theta) => {
    const proj = (i) => pts[i].x * Math.cos(theta) + pts[i].y * Math.sin(theta);
    const ids = [...Array(N).keys()].sort((a, b) => proj(a) - proj(b));
    return [ids[0], ids[N - 1]];
  };

  const lineStations = [];
  for (let k = 0; k < 3; k++) {
    let made = null;
    for (let attempt = 0; attempt < 30 && !made; attempt++) {
      const theta = (k * Math.PI) / 3 + (rand() - 0.5) * 0.9;
      const [a, b] = extremes(theta);
      if (k === 0) { made = shortest(a, b, new Set()); continue; }
      const onNet = [...new Set(lineStations.flat())];
      const hub = onNet[Math.floor(rand() * onNet.length)];
      if (hub === a || hub === b) continue;
      const p1 = shortest(a, hub, new Set());
      if (!p1) continue;
      const p2 = shortest(hub, b, new Set(p1));
      if (!p2) continue;
      const cand = [...p1, ...p2.slice(1)];
      if (new Set(cand).size === cand.length) made = cand;
    }
    if (made && made.length >= 3) {
      lineStations.push(made);
      for (let i = 0; i + 1 < made.length; i++) used.set(ek(made[i], made[i + 1]), (used.get(ek(made[i], made[i + 1])) || 0) + 1);
    }
  }

  const onNet = [...new Set(lineStations.flat())];
  const linesAt = Array.from({ length: N }, () => []);
  const lines = lineStations.map((s, li) => {
    s.forEach((sid, idx) => linesAt[sid].push({ line: li, idx }));
    const m = s.length - 1;
    const positions = [];
    for (let p = 0; p < 2 * m; p++) positions.push(p < m ? [s[p], +1] : [s[2 * m - p], -1]);
    const seg = positions.map((pp, p) => dist(pp[0], positions[(p + 1) % positions.length][0]));
    return { stations: s, positions, seg, length: seg.reduce((x, y) => x + y, 0), dash: P.dashes[li % P.dashes.length] };
  });

  // ── Routing: shortest track length over (station, line) states; a transfer costs 40 px.
  //    Small random jitter breaks ties at random.
  const route = (o, dst) => {
    const key = (s, l) => s * 8 + l;
    const D = new Map(), prev = new Map(), done = new Set();
    linesAt[o].forEach(({ line }) => D.set(key(o, line), 0));
    for (;;) {
      let u = -1, du = Infinity;
      D.forEach((v, k) => { if (!done.has(k) && v < du) { du = v; u = k; } });
      if (u < 0) return null;
      const s = Math.floor(u / 8), l = u % 8;
      if (s === dst) {
        const chain = [[s, l]];
        let c = u;
        while (prev.has(c)) { c = prev.get(c); chain.unshift([Math.floor(c / 8), c % 8]); }
        // compress into legs
        const legs = [];
        for (let i = 0; i + 1 < chain.length; i++) {
          const [s1, l1] = chain[i], [s2, l2] = chain[i + 1];
          if (l1 !== l2) continue; // transfer
          const st = lines[l1].stations;
          const dir = st.indexOf(s2) > st.indexOf(s1) ? 1 : -1;
          const last = legs[legs.length - 1];
          if (last && last.line === l1 && last.alight === s1) last.alight = s2;
          else legs.push({ board: s1, line: l1, dir, alight: s2 });
        }
        return legs;
      }
      done.add(u);
      const relax = (k2, w) => { if (!done.has(k2) && du + w < (D.get(k2) ?? Infinity)) { D.set(k2, du + w); prev.set(k2, u); } };
      const st = lines[l].stations, i = st.indexOf(s);
      [i - 1, i + 1].forEach((j) => { if (j >= 0 && j < st.length) relax(key(st[j], l), dist(s, st[j]) * (1 + rand() * 1e-3)); });
      linesAt[s].forEach(({ line }) => { if (line !== l) relax(key(s, line), 40); });
    }
  };

  // ── Trains, evenly spaced in distance
  const trains = [];
  lines.forEach((ln, li) => {
    for (let t = 0; t < P.trainsPerLine; t++) {
      let phase = (t * ln.length) / P.trainsPerLine, pos = 0;
      while (phase >= ln.seg[pos]) { phase -= ln.seg[pos]; pos++; }
      trains.push({ line: li, pos, prog: phase, mode: 'move', timer: 0, onboard: [] });
    }
  });

  // ── People
  const queues = new Map();
  const qk = (s, l, d) => `${s}|${l}|${d}`;
  const people = Array.from({ length: Math.round(onNet.length * P.peoplePerStation) }, () => {
    const a = (rand() * 2 * Math.PI), r = 10 + rand() * 8;
    return {
      state: 'act', at: onNet[Math.floor(rand() * onNet.length)], timer: Math.floor(rand() * P.actMax),
      legs: [], leg: 0, epi: 0, clock: 0, immT: 0, jx: Math.cos(a) * r, jy: Math.sin(a) * r,
    };
  });
  const joinQueue = (pid) => {
    const p = people[pid], lg = p.legs[p.leg];
    const k = qk(lg.board, lg.line, lg.dir);
    if (!queues.has(k)) queues.set(k, []);
    queues.get(k).push(pid);
    p.state = 'wait'; p.at = lg.board;
  };
  // Small screens have fewer stations and people, so fewer contacts: raise the rates there.
  const boost = Math.max(1, P.boostRef / people.length) ** P.boostExp;
  const seedInfection = () => {
    for (let k = 0; k < 2 && people.length; k++) { const p = people[Math.floor(rand() * people.length)]; p.epi = 1; p.clock = 0; }
  };
  seedInfection();

  let reseeds = 0, trips = 0, frame = 0;
  // New infections: on trains per line; on platforms as one total (all lines share a platform).
  // `history` holds finished bins.
  const zeros = () => lines.map(() => 0);
  let cur = { train: zeros(), platform: [0] };
  const history = [];

  const step = () => {
    // people: activity → new trip
    people.forEach((p, pid) => {
      if (p.state !== 'act' || --p.timer > 0) return;
      let legs = null;
      for (let t = 0; t < 5 && !legs?.length; t++) {
        const dst = onNet[Math.floor(rand() * onNet.length)];
        if (dst !== p.at) legs = route(p.at, dst);
      }
      if (!legs?.length) { p.timer = P.actMin; return; }
      p.legs = legs; p.leg = 0; joinQueue(pid);
    });

    // trains
    for (const tr of trains) {
      const ln = lines[tr.line];
      if (tr.mode === 'move') {
        tr.prog += P.speed;
        if (tr.prog >= ln.seg[tr.pos]) { tr.pos = (tr.pos + 1) % ln.positions.length; tr.prog = 0; tr.mode = 'dwell'; tr.timer = 0; }
        continue;
      }
      if (--tr.timer > 0) continue;
      const [s, d] = ln.positions[tr.pos];
      const ai = tr.onboard.findIndex((pid) => people[pid].legs[people[pid].leg].alight === s);
      if (ai >= 0) {
        const pid = tr.onboard.splice(ai, 1)[0], p = people[pid];
        if (p.leg + 1 < p.legs.length) { p.leg++; joinQueue(pid); }
        else { p.state = 'act'; p.at = s; p.timer = P.actMin + rand() * (P.actMax - P.actMin); trips++; }
        tr.timer = P.tb;
        continue;
      }
      const q = queues.get(qk(s, tr.line, d));
      if (q?.length && tr.onboard.length < P.cap) {
        const pid = q.shift();
        people[pid].state = 'ride';
        tr.onboard.push(pid);
        tr.timer = P.tb;
        continue;
      }
      tr.mode = 'move';
    }

    // epidemic: contacts on trains and among people waiting at the same station
    const atStation = new Map();
    people.forEach((p) => { if (p.state === 'wait') { if (!atStation.has(p.at)) atStation.set(p.at, []); atStation.get(p.at).push(p); } });
    const infect = (g, beta, onInfect) => {
      const n = g.filter((p) => p.epi === 1).length;
      if (!n) return;
      const pr = 1 - Math.pow(1 - beta, n);
      g.forEach((p) => { if (p.epi === 0 && rand() < pr) { p.epi = 1; p.clock = -1; onInfect(p); } });
    };
    trains.forEach((tr) => infect(tr.onboard.map((pid) => people[pid]), P.betaTrain * boost, () => cur.train[tr.line]++));
    atStation.forEach((g) => infect(g, P.betaStation * boost, () => cur.platform[0]++));
    if (++frame % P.binFrames === 0) {
      history.push(cur);
      if (history.length > P.bins) history.shift();
      cur = { train: zeros(), platform: [0] };
    }
    let nI = 0;
    people.forEach((p) => {
      if (p.epi === 1) {
        nI++;
        if (++p.clock > P.infDur) { p.epi = 2; p.clock = 0; p.immT = P.immMin + rand() * (P.immMax - P.immMin); }
      } else if (p.epi === 2 && ++p.clock > p.immT) { p.epi = 0; p.clock = 0; }
    });
    if (!nI) { reseeds++; seedInfection(); }
  };

  const trainXY = (tr) => {
    const ln = lines[tr.line], [a] = ln.positions[tr.pos], [b] = ln.positions[(tr.pos + 1) % ln.positions.length];
    if (tr.mode === 'dwell') {
      const [c] = ln.positions[(tr.pos + 1) % ln.positions.length];
      return { x: pts[a].x, y: pts[a].y, ang: Math.atan2(pts[c].y - pts[a].y, pts[c].x - pts[a].x) };
    }
    const f = tr.prog / ln.seg[tr.pos];
    return { x: pts[a].x + (pts[b].x - pts[a].x) * f, y: pts[a].y + (pts[b].y - pts[a].y) * f, ang: Math.atan2(pts[b].y - pts[a].y, pts[b].x - pts[a].x) };
  };

  const stats = () => {
    const c = [0, 0, 0];
    people.forEach((p) => c[p.epi]++);
    return { S: c[0], I: c[1], R: c[2], people: people.length, stations: onNet.length, lines: lines.length, reseeds, trips };
  };

  return { pts, onNet, lines, linesAt, trains, people, step, trainXY, stats, history, current: () => cur, P };
}
