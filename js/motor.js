/*
 * Motor farmacocinético / farmacodinámico.
 *
 * Modelo por sustancia (parámetros en js/sustancias/*.js):
 *   - Farmacocinética: depósito de absorción de primer orden (o infusión de orden cero),
 *     uno o dos compartimentos, eliminación lineal o de Michaelis-Menten (etanol).
 *   - Compartimento efecto (ke0): retraso entre la concentración plasmática y el cerebro.
 *   - Efecto: modelo Emax sigmoide (Hill) sobre la concentración en el sitio efecto.
 *   - Tolerancia farmacodinámica R (desensibilización / downregulation de receptores):
 *       dR/dt = -kdes·f·(R - Rmin) + krec·(1 - R)
 *   - Reservas S de neurotransmisor (p. ej. serotonina con MDMA):
 *       dS/dt = -kdep·f·S + krep·(1 - S)
 *   - Procesos oponentes B_i (alostasis, Solomon y Corbit / Koob y Le Moal):
 *       dB_i/dt = (γ_i·E - B_i) / τ_i
 *   - Efecto percibido = E·R·S - ΣB - bajón por reservas agotadas.
 *   - Línea de costumbre = Aporte·(1 - R·S) + ΣB + bajón.
 * Las variables lentas se integran con la solución exacta de la exponencial en cada paso,
 * lo que permite pasos grandes cuando no hay fármaco y pasos finos durante las sesiones.
 */
(function () {
  'use strict';
  const LN2 = Math.LN2;

  const FRECUENCIAS = {
    diario:     { nombre: 'Todos los días',             p: 1,   d: [0] },
    laborables: { nombre: 'De lunes a viernes',         p: 7,   d: [0, 1, 2, 3, 4] },
    tresSem:    { nombre: '3 días/semana (vie a dom)',  p: 7,   d: [4, 5, 6] },
    finde:      { nombre: 'Fines de semana (vie y sáb)', p: 7,  d: [4, 5] },
    semanal:    { nombre: '1 vez por semana',           p: 7,   d: [5] },
    c3d:        { nombre: 'Cada 3 días',                p: 3,   d: [0] },
    quincenal:  { nombre: 'Cada 2 semanas',             p: 14,  d: [5] },
    mensual:    { nombre: '1 vez al mes',               p: 28,  d: [5] },
    trimestral: { nombre: 'Cada 3 meses',               p: 91,  d: [5] },
    unica:      { nombre: 'Una sola vez',               p: 1e6, d: [1] }
  };

  function hill(c, ec50, n) {
    if (!(c > 0)) return 0;
    const x = Math.pow(c / ec50, n);
    return x / (1 + x);
  }

  function preparar(s, cfg) {
    const forma = s.formas.find(f => f.id === cfg.forma) || s.formas[0];
    const pk = Object.assign({}, s.pk, forma.pk || {});
    const pd = Object.assign({}, s.pd, forma.pd || {});
    const W = cfg.peso || 70;
    const dos = pk.Vp != null;
    const VdKg = pk.VdSexo ? pk.VdSexo[cfg.sexo || 'h'] : pk.Vd;
    const Vc = (dos ? pk.Vc : VdKg) * W;
    let k10, k12 = 0, k21 = 0;
    if (dos) { k10 = pk.CL / pk.Vc; k12 = pk.Q / pk.Vc; k21 = pk.Q / pk.Vp; }
    else k10 = pk.t12 ? LN2 / pk.t12 : 0;
    const canales = (s.canales || []).map(c => Object.assign({}, c, (forma.canales || {})[c.id] || {}));
    const tasas = [k10, k12, k21, pk.ke0 || 0];
    if (pk.mm) tasas.push(pk.mm.Vmax / pk.mm.Km);
    const paso = r => Math.min(1 / 20, Math.max(1 / 900, 0.5 / Math.max.apply(null, r)));
    const dtFino = paso(tasas);
    const dtAbs = paso(tasas.concat([pk.ka || 0]));
    return {
      s, forma, pk, pd, W, Vc, VdKg, k10, k12, k21, canales, dtFino, dtAbs,
      cf: pk.cf, F: pk.F, ka: pk.ka || 1, lag: pk.lag || 0, infusion: pk.infusion || 0,
      ke0: pk.ke0 || 1, pot: pd.potencia || 1, mm: pk.mm || null
    };
  }

  function eventos(cfg, P) {
    const fr = FRECUENCIAS[cfg.frecuencia] || FRECUENCIAS.diario;
    const out = [];
    const Hh = cfg.horizonte * 24;
    const red = cfg.dejar != null && cfg.gradual ? Math.round(cfg.gradual * 7) : 0;
    for (let d = 0; d < cfg.horizonte; d++) {
      let mult = 1;
      if (cfg.dejar != null && d >= cfg.dejar) {
        const reanudado = cfg.reanudar != null && d >= cfg.reanudar;
        if (!reanudado) {
          if (d < cfg.dejar + red) mult = 1 - (d - cfg.dejar + 1) / (red + 1);
          else continue;
        }
      }
      if (fr.d.indexOf(d % fr.p) < 0) continue;
      for (let i = 0; i < cfg.porSesion; i++) {
        const t = d * 24 + cfg.inicio + i * cfg.intervalo + P.lag;
        if (t < Hh) out.push({ t, dosis: cfg.dosis * mult, dia: d });
      }
    }
    out.sort((a, b) => a.t - b.t);
    return out;
  }

  function estadoInicial() {
    return { Ag: 0, Ac: 0, Ap: 0, Ce: 0, R: 1, R2: 1, S: 1, B: [0, 0, 0], H: 0, Mt: 0, I: 0, inf: [] };
  }
  function clonar(st) {
    return {
      Ag: st.Ag, Ac: st.Ac, Ap: st.Ap, Ce: st.Ce, R: st.R, R2: st.R2, S: st.S, B: st.B.slice(),
      H: st.H, Mt: st.Mt, I: st.I, inf: st.inf.map(x => ({ fin: x.fin, tasa: x.tasa }))
    };
  }

  const conc = (P, st) => st.Ac / P.Vc * P.cf;
  const sumB = st => st.B[0] + st.B[1] + st.B[2];
  const bajon = (s, st) => s.reserva ? s.reserva.crash * (1 - st.S) * 100 : 0;

  function efecto(P, st) {
    const pd = P.pd;
    const ce = st.Ce * P.pot;
    const f = hill(ce, pd.ec50, pd.n);
    let E = (pd.emax || 100) * f * st.R * (P.s.reserva ? st.S : 1);
    if (pd.aversion) E -= pd.aversion.emax * hill(ce, pd.aversion.ec50, pd.aversion.n);
    return { f, E };
  }

  function canal(P, st, c) {
    const C = conc(P, st);
    if (c.tipo === 'ocupacion') return 100 * (c.occMax || 1) * C / (C + c.ec50);
    const x = (c.conc === 'C' ? C : st.Ce) * P.pot;
    let v = (c.emax || 100) * hill(x, c.ec50, c.n);
    if (c.tol === 'R') v *= st.R; else if (c.tol === 'R2') v *= st.R2;
    if (c.reserva) v *= st.S;
    return v;
  }

  function dosificar(P, st, ev, t) {
    if (P.infusion > 0) st.inf.push({ fin: t + P.infusion, tasa: ev.dosis / P.infusion });
    else st.Ag += ev.dosis;
    const hb = P.s.habito;
    if (hb && ev.dosis > 0) st.H += hb.k * (1 - st.H);
  }

  const dtDe = (P, st) => (st.Ag > 0 || st.inf.length) ? P.dtAbs : P.dtFino;

  function presente(P, st) {
    if (st.Ag > 1e-9 || st.inf.length) return true;
    const umbral = P.pd.ec50 * 2e-3 / P.pot;
    return conc(P, st) > umbral || st.Ce > umbral;
  }

  function paso(P, st, t, dt) {
    const s = P.s;
    if (st.Ag > 0) {
      const a = st.Ag * (1 - Math.exp(-P.ka * dt));
      st.Ag -= a; st.Ac += a * P.F;
      if (st.Ag < 1e-12) st.Ag = 0;
    }
    if (st.inf.length) {
      for (let i = st.inf.length - 1; i >= 0; i--) {
        const x = st.inf[i];
        const h = Math.min(dt, Math.max(0, x.fin - t));
        st.Ac += x.tasa * P.F * h;
        if (t + dt >= x.fin - 1e-9) st.inf.splice(i, 1);
      }
    }
    if (P.k12) {
      const n = Math.max(1, Math.ceil((P.k12 + P.k21) * dt / 0.2));
      const h = dt / n;
      for (let i = 0; i < n; i++) {
        const fl = (P.k12 * st.Ac - P.k21 * st.Ap) * h;
        st.Ac -= fl; st.Ap += fl;
      }
    }
    const clf = s.inhibicion ? 1 - s.inhibicion.imax * st.I : 1;
    if (P.mm) {
      const vmax = P.mm.Vmax * (1 + st.Mt) * clf, km = P.mm.Km;
      let C = conc(P, st);
      const n = Math.max(1, Math.ceil(dt * vmax / km / 0.2));
      const h = dt / n;
      for (let i = 0; i < n; i++) C = Math.max(0, C - vmax * C / (km + C) * h);
      st.Ac = C * P.Vc / P.cf;
    } else {
      st.Ac *= Math.exp(-P.k10 * clf * dt);
    }
    const C = conc(P, st);
    st.Ce += (C - st.Ce) * (1 - Math.exp(-P.ke0 * dt));

    const ef = efecto(P, st);
    const f = ef.f;
    if (s.tol) {
      const T = s.tol, a = T.krec + T.kdes * f, eq = (T.krec + T.kdes * f * T.rmin) / a;
      st.R = eq + (st.R - eq) * Math.exp(-a * dt);
    }
    if (s.tol2) {
      const T = s.tol2, a = T.krec + T.kdes * f, eq = (T.krec + T.kdes * f * T.rmin) / a;
      st.R2 = eq + (st.R2 - eq) * Math.exp(-a * dt);
    }
    if (s.reserva) {
      const r = s.reserva, a = r.krep + r.kdep * f, eq = r.krep / a;
      st.S = eq + (st.S - eq) * Math.exp(-a * dt);
    }
    const Epos = s.opDriver === 'f' ? (P.pd.emax || 100) * f * (s.reserva ? st.S : 1) : Math.max(0, ef.E);
    const op = s.oponentes || [];
    for (let i = 0; i < op.length; i++) {
      const tg = op[i].gamma * Epos;
      st.B[i] = tg + (st.B[i] - tg) * Math.exp(-dt / op[i].tau);
    }
    if (s.metabolica) {
      const m = s.metabolica, a = m.kup * f + m.kdown, eq = m.kup * f * m.max / a;
      st.Mt = eq + (st.Mt - eq) * Math.exp(-a * dt);
    }
    if (s.inhibicion) {
      const q = s.inhibicion, fi = C / (C + q.KI), a = q.kinact * fi + q.kdeg, eq = q.kinact * fi / a;
      st.I = eq + (st.I - eq) * Math.exp(-a * dt);
    }
    if (s.habito) st.H *= Math.exp(-dt * LN2 / (s.habito.vida * 24));
  }

  /* Vida media terminal (para saber cuántos días tarda en acumularse una pauta diaria). */
  function vidaMediaTerminal(P) {
    if (P.mm) return 2;
    if (!P.k12) return P.k10 ? LN2 / P.k10 : 2;
    const a = P.k10 + P.k12 + P.k21;
    const beta = 0.5 * (a - Math.sqrt(a * a - 4 * P.k10 * P.k21));
    return LN2 / beta;
  }

  /*
   * «Aporte»: pico de efecto que produce la pauta en una persona sin ninguna adaptación
   * (R = S = 1, sin procesos oponentes). Es el 100 % de referencia de las gráficas.
   * Si la pauta es diaria y la sustancia se acumula, se simulan los días necesarios
   * para alcanzar el estado estacionario (≈5 vidas medias, máx. 14 días).
   */
  function aporteSesion(P, cfg) {
    const st = estadoInicial();
    const fr = FRECUENCIAS[cfg.frecuencia] || FRECUENCIAS.diario;
    const diario = fr.p === 1;
    const nDias = diario ? Math.max(1, Math.min(14, Math.ceil(5 * vidaMediaTerminal(P) / 24))) : 1;
    const evs = [];
    for (let d = 0; d < nDias; d++)
      for (let i = 0; i < cfg.porSesion; i++) evs.push({ t: d * 24 + i * cfg.intervalo + P.lag, dosis: cfg.dosis });
    const fin = (nDias - 1) * 24 + (cfg.porSesion - 1) * cfg.intervalo + P.lag + Math.max(24, P.infusion + 12);
    let t = 0, ei = 0, pico = 0;
    while (t < fin) {
      while (ei < evs.length && evs[ei].t <= t + 1e-9) { dosificar(P, st, evs[ei], t); ei++; }
      let dt = presente(P, st) ? dtDe(P, st) : 0.25;
      if (ei < evs.length && t + dt > evs[ei].t) dt = Math.max(1e-6, evs[ei].t - t);
      paso(P, st, t, dt); t += dt;
      st.R = 1; st.R2 = 1; st.S = 1; st.B[0] = st.B[1] = st.B[2] = 0; st.Mt = 0;
      const e = efecto(P, st).E;
      if (e > pico) pico = e;
    }
    return Math.max(pico, 0.5);
  }

  function simular(s, cfg) {
    const P = preparar(s, cfg);
    const ev = eventos(cfg, P);
    const A = aporteSesion(P, cfg);
    const Hh = cfg.horizonte * 24, N = Hh + 1;
    const campos = ['C', 'Ce', 'E', 'sentido', 'R', 'R2', 'S', 'B', 'crash', 'H', 'Mt', 'I', 'costumbre', 'malestar'];
    const h = {};
    campos.forEach(k => { h[k] = new Float32Array(N); });
    const nc = P.canales.length;
    h.canales = [];
    for (let i = 0; i < nc; i++) h.canales.push(new Float32Array(N));
    const dias = [], snaps = [];
    const st = estadoInicial();
    let t = 0, ei = 0, k = 0, agg = null;

    const nuevo = d => ({ d, dosis: 0, picoNaive: 0, picoE: 0, picoSent: -1e9, minSent: 1e9, picoC: 0, picoCh: new Float64Array(nc), sCost: 0, sMal: 0, sSent: 0, n: 0 });
    const cerrar = a => ({
      d: a.d, dosis: a.dosis, picoNaive: a.picoNaive, picoE: a.picoE, picoSent: a.picoSent, minSent: a.minSent, picoC: a.picoC,
      picoCh: Array.from(a.picoCh), cost: a.sCost / a.n, mal: a.sMal / a.n, sent: a.sSent / a.n
    });
    const seguir = () => {
      const C = conc(P, st), ef = efecto(P, st), sent = ef.E - sumB(st) - bajon(s, st);
      if (ef.E > agg.picoE) agg.picoE = ef.E;
      const en = (P.pd.emax || 100) * ef.f;
      if (en > agg.picoNaive) agg.picoNaive = en;
      if (sent > agg.picoSent) agg.picoSent = sent;
      if (sent < agg.minSent) agg.minSent = sent;
      if (C > agg.picoC) agg.picoC = C;
      for (let i = 0; i < nc; i++) { const v = canal(P, st, P.canales[i]); if (v > agg.picoCh[i]) agg.picoCh[i] = v; }
    };
    const registrar = kk => {
      const C = conc(P, st), ef = efecto(P, st), Bs = sumB(st), cr = bajon(s, st);
      h.C[kk] = C; h.Ce[kk] = st.Ce; h.E[kk] = ef.E; h.sentido[kk] = ef.E - Bs - cr;
      h.R[kk] = st.R; h.R2[kk] = st.R2; h.S[kk] = st.S; h.B[kk] = Bs; h.crash[kk] = cr;
      h.H[kk] = st.H; h.Mt[kk] = st.Mt; h.I[kk] = st.I;
      h.costumbre[kk] = A * (1 - st.R * st.S) + Bs + cr;
      h.malestar[kk] = Bs + cr;
      for (let i = 0; i < nc; i++) h.canales[i][kk] = canal(P, st, P.canales[i]);
    };

    while (true) {
      if (t >= k - 1e-7) {
        if (k % 24 === 0) {
          if (agg) dias.push(cerrar(agg));
          if (k < Hh) { snaps.push(clonar(st)); agg = nuevo(k / 24); }
        }
        registrar(k);
        if (k < Hh) {
          agg.sCost += h.costumbre[k]; agg.sMal += h.malestar[k]; agg.sSent += h.sentido[k]; agg.n++;
          if (h.sentido[k] < agg.minSent) agg.minSent = h.sentido[k];
          if (h.sentido[k] > agg.picoSent) agg.picoSent = h.sentido[k];
        }
        if (k >= Hh) break;
        k++;
      }
      while (ei < ev.length && ev[ei].t <= t + 1e-7) { dosificar(P, st, ev[ei], t); agg.dosis++; ei++; }
      const pres = presente(P, st);
      let dt = pres ? dtDe(P, st) : 0.5;
      const lim = Math.min(k, ei < ev.length ? ev[ei].t : Infinity);
      if (t + dt > lim) dt = lim - t;
      if (dt < 1e-7) { t = lim; continue; }
      paso(P, st, t, dt);
      t += dt;
      if (pres) seguir();
    }
    const ki = Math.floor(cfg.inicio || 0);
    for (const d of dias) {
      d.costIni = h.costumbre[Math.min(Hh, d.d * 24 + ki)];
      d.malIni = h.malestar[Math.min(Hh, d.d * 24 + ki)];
      d.deficit = Math.max(0, -d.minSent);
    }
    return { s, P, cfg, ev, A, h, dias, snaps, N };
  }

  function primerEvento(ev, t) {
    let lo = 0, hi = ev.length;
    while (lo < hi) { const m = (lo + hi) >> 1; if (ev[m].t < t - 1e-7) lo = m + 1; else hi = m; }
    return lo;
  }

  /* Re-simula una ventana [t0, t1] (horas absolutas) con resolución fina a partir del estado guardado. */
  function ventana(res, t0, t1, n) {
    const P = res.P, ev = res.ev, s = res.s;
    t0 = Math.max(0, t0);
    if (t1 <= t0) t1 = t0 + 1;
    const d0 = Math.min(res.snaps.length - 1, Math.floor(t0 / 24));
    const st = clonar(res.snaps[d0]);
    let t = d0 * 24;
    let ei = primerEvento(ev, t);
    const nc = P.canales.length;
    const mk = () => new Float64Array(n);
    const o = { t: mk(), C: mk(), Ce: mk(), E: mk(), sentido: mk(), mal: mk(), R: mk(), R2: mk(), S: mk(), canales: [], dosis: [] };
    for (let i = 0; i < nc; i++) o.canales.push(mk());
    const dtMax = Math.min(P.dtAbs, (t1 - t0) / n);
    let j = 0, ts = t0;
    let guard = 0;
    while (j < n && guard++ < 5e6) {
      if (t >= ts - 1e-7) {
        const ef = efecto(P, st), Bs = sumB(st) + bajon(s, st);
        o.t[j] = ts; o.C[j] = conc(P, st); o.Ce[j] = st.Ce; o.E[j] = ef.E; o.sentido[j] = ef.E - Bs; o.mal[j] = Bs;
        o.R[j] = st.R; o.R2[j] = st.R2; o.S[j] = st.S;
        for (let i = 0; i < nc; i++) o.canales[i][j] = canal(P, st, P.canales[i]);
        j++;
        ts = t0 + (t1 - t0) * j / (n - 1);
        continue;
      }
      while (ei < ev.length && ev[ei].t <= t + 1e-7) {
        dosificar(P, st, ev[ei], t);
        if (ev[ei].t >= t0 - 1e-7 && ev[ei].t <= t1) o.dosis.push({ t: ev[ei].t, dosis: ev[ei].dosis });
        ei++;
      }
      let dt = t < t0 - 1e-7 ? (presente(P, st) ? dtDe(P, st) : 0.5) : dtMax;
      const lim = Math.min(ts, ei < ev.length ? ev[ei].t : Infinity);
      if (t + dt > lim) dt = lim - t;
      if (dt < 1e-7) { t = lim; continue; }
      paso(P, st, t, dt);
      t += dt;
    }
    return o;
  }

  /* Pico de concentración (plasma y sitio efecto) de una única dosis. */
  function picoDosis(P, dosis, Mt, I) {
    const st = estadoInicial();
    st.Mt = Mt || 0; st.I = I || 0;
    dosificar(P, st, { t: 0, dosis }, 0);
    st.H = 0;
    let t = 0, pc = 0, pce = 0, tpce = 0;
    const fin = 24 + P.infusion + P.lag;
    while (t < fin) {
      const dt = dtDe(P, st);
      paso(P, st, t, dt); t += dt;
      const C = conc(P, st);
      if (C > pc) pc = C;
      if (st.Ce > pce) { pce = st.Ce; tpce = t; }
      if (t > tpce + 6 && st.Ce < pce * 0.02 && st.Ag < 1e-9 && !st.inf.length) break;
    }
    return { C: pc, Ce: pce };
  }

  /* Curva dosis-respuesta: persona sin tolerancia frente al estado del día seleccionado. */
  function dosisRespuesta(res, dia, nPts) {
    nPts = nPts || 36;
    const P = res.P, s = res.s, cfg = res.cfg;
    const st0 = res.snaps[Math.max(0, Math.min(dia, res.snaps.length - 1))];
    const lim = s.limites.dosis;
    const lo = lim[0] / 2, hi = lim[1] * 2.5;
    const dosis = [];
    for (let i = 0; i < nPts; i++) dosis.push(lo * Math.pow(hi / lo, i / (nPts - 1)));
    const lineal = !P.mm && !s.inhibicion;
    const unidad = lineal ? picoDosis(P, 1, 0, 0) : null;
    const pico = (d, Mt, I) => lineal ? { C: unidad.C * d, Ce: unidad.Ce * d } : picoDosis(P, d, Mt, I);
    const Bs = sumB(st0) + bajon(s, st0);
    const out = { dosis, naive: [], actual: [], canalesNaive: P.canales.map(() => []), canalesActual: P.canales.map(() => []), estado: st0 };
    const estN = estadoInicial();
    for (const d of dosis) {
      const pn = pico(d, 0, 0), pa = pico(d, st0.Mt, st0.I);
      const sn = estadoInicial(); sn.Ce = pn.Ce; sn.Ac = pn.C * P.Vc / P.cf;
      const sa = clonar(st0); sa.Ce = pa.Ce; sa.Ac = pa.C * P.Vc / P.cf;
      out.naive.push(efecto(P, sn).E);
      out.actual.push(efecto(P, sa).E - Bs);
      P.canales.forEach((c, i) => {
        out.canalesNaive[i].push(canal(P, sn, c));
        out.canalesActual[i].push(canal(P, sa, c));
      });
    }
    void estN;
    // Margen de seguridad respecto al primer canal con umbral de riesgo.
    const ip = P.canales.findIndex(c => c.umbral != null);
    out.indicePeligro = ip;
    if (ip >= 0) {
      const u = P.canales[ip].umbral;
      const cruce = arr => {
        for (let i = 1; i < arr.length; i++) {
          if (arr[i - 1] < u && arr[i] >= u) {
            const f = (u - arr[i - 1]) / (arr[i] - arr[i - 1]);
            return Math.exp(Math.log(dosis[i - 1]) + f * (Math.log(dosis[i]) - Math.log(dosis[i - 1])));
          }
        }
        return arr[0] >= u ? dosis[0] : null;
      };
      out.umbralNaive = cruce(out.canalesNaive[ip]);
      out.umbralActual = cruce(out.canalesActual[ip]);
      out.margenActual = out.umbralActual ? out.umbralActual / cfg.dosis : null;
      out.margenNaive = out.umbralNaive ? out.umbralNaive / cfg.dosis : null;
    }
    return out;
  }

  function csv(res) {
    const h = res.h, P = res.P, s = res.s;
    const cab = ['hora', 'dia', 'C_' + s.unidades.conc, 'Ce', 'efecto_E', 'efecto_percibido', 'R', 'R2', 'S', 'B_oponente', 'bajon', 'costumbre_%', 'malestar_%', 'habito', 'tol_metabolica', 'inhib_CYP']
      .concat(P.canales.map(c => c.id));
    const filas = [cab.join(';')];
    for (let k = 0; k < res.N; k++) {
      const f = [k, Math.floor(k / 24), h.C[k], h.Ce[k], h.E[k], h.sentido[k], h.R[k], h.R2[k], h.S[k], h.B[k], h.crash[k],
        h.costumbre[k] / res.A * 100, h.malestar[k] / res.A * 100, h.H[k], h.Mt[k], h.I[k]]
        .concat(P.canales.map((c, i) => h.canales[i][k]));
      filas.push(f.map(v => typeof v === 'number' ? String(+v.toPrecision(5)).replace('.', ',') : v).join(';'));
    }
    return filas.join('\n');
  }

  NT.motor = { FRECUENCIAS, hill, preparar, eventos, simular, ventana, dosisRespuesta, picoDosis, csv };
})();
