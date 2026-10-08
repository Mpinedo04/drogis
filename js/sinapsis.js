/*
 * Animación de la sinapsis (modo principiante).
 * Tipos de mecanismo: agonista, antagonista, bloqueo (de recaptación), liberador,
 * pam (modulador alostérico positivo de GABA-A), retrogrado (CB1 presináptico) y vaso (vasodilatación).
 */
(function () {
  'use strict';
  const W = 640, H = 330;
  const Y_PRE = 112, Y_POST = 206;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

  class Sinapsis {
    constructor(canvas, s, alCambiarSenal) {
      this.cv = canvas; this.ctx = canvas.getContext('2d');
      this.s = s; this.c = s.sinapsis; this.estado = 'sin';
      this.alCambiarSenal = alCambiarSenal;
      this.corriendo = false; this.ultimo = 0; this.senal = 0;
      this.reiniciar();
      this.io = new IntersectionObserver(es => es.forEach(e => (e.isIntersecting ? this.iniciar() : this.parar())));
      this.io.observe(canvas);
      this.ro = new ResizeObserver(() => this.ajustar());
      this.ro.observe(canvas.parentElement);
      this.ajustar();
    }
    destruir() { this.parar(); this.io.disconnect(); this.ro.disconnect(); }
    ajustar() {
      const w = this.cv.parentElement.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      this.escala = w / W;
      this.cv.width = Math.round(w * dpr); this.cv.height = Math.round(H * this.escala * dpr);
      this.cv.style.width = w + 'px'; this.cv.style.height = (H * this.escala) + 'px';
      this.dpr = dpr;
      this.leerColores();
    }
    leerColores() {
      this.col = {
        pre: css('--sin-pre'), post: css('--sin-post'), mem: css('--sin-membrana'), txt: css('--texto-2'), txt3: css('--texto-3'),
        nt: this.c.nt.color, droga: this.c.droga.color, gris: css('--texto-3'), ion: css('--sin-ion'), fondo: css('--superficie'),
        rojo: '#E24B4A', sangre: '#C0392B'
      };
    }
    setEstado(e) { this.estado = e; this.reiniciar(); }
    iniciar() {
      if (this.corriendo) return;
      this.corriendo = true; this.ultimo = performance.now();
      const bucle = ahora => {
        if (!this.corriendo) return;
        const dt = Math.min(0.05, (ahora - this.ultimo) / 1000);
        this.ultimo = ahora;
        this.actualizar(dt); this.dibujar();
        this.raf = requestAnimationFrame(bucle);
      };
      this.raf = requestAnimationFrame(bucle);
    }
    parar() { this.corriendo = false; if (this.raf) cancelAnimationFrame(this.raf); }

    reiniciar() {
      const c = this.c, cron = this.estado === 'cronico';
      this.part = []; this.iones = []; this.t = 0; this.tLib = 0; this.senal = 0;
      if (c.tipo === 'vaso') {
        this.radio = 46; this.globulos = [];
        for (let i = 0; i < 26; i++) this.globulos.push({ x: rnd(0, W), dy: rnd(-0.8, 0.8), r: rnd(6, 9) });
        return;
      }
      let nr = 8;
      if (cron && c.tipo !== 'retrogrado') nr = Math.max(3, Math.round(8 * (c.cronicoReceptores || 1)));
      this.rec = [];
      for (let i = 0; i < nr; i++) {
        this.rec.push({ x: 86 + i * (468 / Math.max(1, nr - 1)), occ: null, t: 0, desens: cron && Math.random() < (c.cronicoDesens || 0), mod: 0, flash: 0 });
      }
      this.trans = [];
      if (['bloqueo', 'liberador', 'agonista', 'pam', 'antagonista'].includes(c.tipo) && c.transportador !== false) {
        const base = ['bloqueo', 'liberador'].includes(c.tipo) ? 5 : 3;
        const nt = cron && c.cronicoTransportadores ? Math.max(1, Math.round(base * c.cronicoTransportadores)) : base;
        for (let i = 0; i < nt; i++) this.trans.push({ x: 110 + i * (420 / Math.max(1, nt - 1)), bloq: 0, rev: 0 });
      }
      this.recPre = [];
      if (c.tipo === 'retrogrado') {
        const n = cron ? Math.max(2, Math.round(5 * (c.cronicoReceptores || 1))) : 5;
        for (let i = 0; i < n; i++) this.recPre.push({ x: 140 + i * (360 / Math.max(1, n - 1)), occ: 0 });
      }
      const llenado = cron ? (c.cronicoReservas || 1) : 1;
      this.ves = [];
      for (let i = 0; i < 6; i++) this.ves.push({ x: 120 + i * 80 + rnd(-10, 10), y: rnd(42, 82), lleno: llenado, fus: 0 });
    }

    // ---------------------------------------------------------------- simulación
    actualizar(dt) {
      this.t += dt;
      const c = this.c;
      if (c.tipo === 'vaso') return this.actualizarVaso(dt);
      const con = this.estado === 'con' || (this.estado === 'cronico' && c.cronicoConDroga !== false);
      // Liberación de neurotransmisor por potenciales de acción
      let intervalo = 0.7;
      if (c.tipo === 'retrogrado' && con) {
        const ocup = this.recPre.filter(r => r.occ > 0).length / 5;
        intervalo = 0.7 * (1 + 3 * ocup * ocup);
      }
      if (c.tipo === 'antagonista') {
        // La adenosina se acumula de forma difusa (no por vesículas).
        if (Math.random() < dt * 9) this.part.push(this.particula('nt', rnd(60, 580), rnd(Y_PRE + 8, Y_POST - 30)));
      } else {
        this.tLib += dt;
        if (this.tLib > intervalo) {
          this.tLib = 0;
          const v = this.ves[Math.floor(Math.random() * this.ves.length)];
          v.fus = 0.35;
          const n = Math.round(12 * v.lleno * (c.tipo === 'liberador' && con ? 1.6 : 1));
          for (let i = 0; i < n; i++) {
            const p = this.particula('nt', v.x + rnd(-14, 14), Y_PRE + 3);
            p.vy = rnd(70, 140); this.part.push(p);
          }
        }
      }
      // Entrada de la sustancia
      if (con && Math.random() < dt * (c.tasaDroga || 3.2)) {
        const lado = Math.random() < 0.5;
        const p = this.particula('droga', lado ? 34 : 606, rnd(Y_PRE + 10, Y_POST - 10));
        p.vx = lado ? rnd(60, 130) : rnd(-130, -60);
        this.part.push(p);
      }
      // Transportadores invertidos (liberadores): sacan neurotransmisor
      this.trans.forEach(tr => {
        if (tr.bloq > 0) tr.bloq -= dt;
        if (tr.rev > 0) {
          tr.rev -= dt;
          const llen = this.estado === 'cronico' ? (c.cronicoReservas || 1) : 1;
          if (Math.random() < dt * 14 * llen) { const p = this.particula('nt', tr.x + rnd(-5, 5), Y_PRE + 4); p.vy = rnd(30, 70); this.part.push(p); }
        }
      });
      this.recPre.forEach(r => { if (r.occ > 0) r.occ -= dt; });
      this.ves.forEach(v => { if (v.fus > 0) v.fus -= dt; });

      // Movimiento y uniones
      const libres = this.trans.length ? this.trans.filter(t => t.bloq <= 0 && t.rev <= 0).length / this.trans.length : 0;
      const vivos = [];
      for (const p of this.part) {
        p.vida -= dt;
        if (p.vida <= 0) continue;
        if (p.tipo === 'nt' && libres > 0 && Math.random() < dt * 0.55 * libres) { p.recaptado = 0.25; }
        if (p.recaptado != null) {
          // Animación breve de vuelta hacia la neurona emisora
          p.recaptado -= dt; p.y -= 260 * dt;
          if (p.recaptado > 0 && p.y > Y_PRE) vivos.push(p);
          continue;
        }
        const amort = Math.pow(0.4, dt);
        p.vx = p.vx * amort + rnd(-1, 1) * 900 * dt; p.vy = p.vy * amort + rnd(-1, 1) * 900 * dt;
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.x < 34) { p.x = 34; p.vx = Math.abs(p.vx); }
        if (p.x > 606) { p.x = 606; p.vx = -Math.abs(p.vx); }
        if (p.y < Y_PRE + 4) { p.y = Y_PRE + 4; p.vy = Math.abs(p.vy); if (this.tocarPre(p)) continue; }
        if (p.y > Y_POST - 4) { p.y = Y_POST - 4; p.vy = -Math.abs(p.vy); if (this.tocarPost(p)) continue; }
        vivos.push(p);
      }
      this.part = vivos;

      // Receptores
      let activos = 0, total = 0, ionesExtra = 0;
      for (const r of this.rec) {
        if (r.mod > 0) r.mod -= dt;
        if (r.flash > 0) r.flash -= dt;
        if (r.occ) {
          r.t -= dt;
          if (r.t <= 0) {
            if (r.occ === 'droga') { const p = this.particula('droga', r.x, Y_POST - 6); p.vy = -rnd(20, 50); this.part.push(p); }
            else if (Math.random() < (this.trans.length ? 0.5 : 0.25)) { const p = this.particula('nt', r.x, Y_POST - 6); p.vy = -rnd(30, 70); this.part.push(p); }
            r.occ = null;
          }
        }
        total++;
        const activa = r.occ && !r.desens && !(c.tipo === 'antagonista' && r.occ === 'droga');
        if (activa) {
          activos++;
          const mult = c.tipo === 'pam' && r.mod > 0 ? 2.6 : 1;
          if (mult > 1) ionesExtra++;
          if (Math.random() < dt * 10 * mult) this.iones.push({ x: r.x + rnd(-4, 4), y: Y_POST + 6, vy: rnd(30, 60), vida: 1.1 });
        }
      }
      if (c.tipo === 'retrogrado') {
        // Medimos la liberación de GABA (freno) que llega a la neurona receptora.
        total = Math.max(1, total);
      }
      const objetivo = (activos + ionesExtra * 2.5) / 8 * 2.2;
      this.senal += (Math.min(1.4, objetivo) - this.senal) * Math.min(1, dt * 2.5);
      this.iones = this.iones.filter(io => { io.vida -= dt; io.y += io.vy * dt; return io.vida > 0 && io.y < H - 8; });
      if (this.alCambiarSenal) this.alCambiarSenal(this.senal);
    }

    particula(tipo, x, y) {
    // Sin transportadores (acetilcolina, endorfinas) el mensajero se degrada rápido en la hendidura.
    const vidaNT = this.trans.length ? [6, 9] : this.c.tipo === 'antagonista' ? [3, 5] : [1.4, 2.4];
    return { tipo, x, y, vx: rnd(-20, 20), vy: rnd(-20, 20), vida: tipo === 'nt' ? rnd(vidaNT[0], vidaNT[1]) : rnd(5, 8) };
  }

    tocarPre(p) {
      const c = this.c;
      if (c.tipo === 'retrogrado' && p.tipo === 'droga') {
        for (const r of this.recPre) if (Math.abs(r.x - p.x) < 12 && r.occ <= 0) { r.occ = rnd(2.5, 4); return true; }
      }
      for (const tr of this.trans) {
        if (Math.abs(tr.x - p.x) > 22) continue;
        if (p.tipo === 'droga') {
          if (c.tipo === 'bloqueo' && tr.bloq <= 0) { tr.bloq = rnd(3.5, 5.5); return true; }
          if (c.tipo === 'liberador') { tr.rev = rnd(1.5, 2.5); return true; }
        }
      }
      return false;
    }
    tocarPost(p) {
      const c = this.c;
      for (const r of this.rec) {
        if (Math.abs(r.x - p.x) > 14) continue;
        if (p.tipo === 'droga') {
          if (c.tipo === 'pam') { if (r.mod <= 0) { r.mod = rnd(2, 3.5); return true; } continue; }
          if (c.tipo === 'agonista' || c.tipo === 'antagonista') {
            if (!r.occ) { r.occ = 'droga'; r.t = c.tipo === 'antagonista' ? rnd(2.5, 4.5) : rnd(1.2, 2.4); r.flash = 0.3; return true; }
          }
        } else if (!r.occ) {
          if (c.tipo === 'retrogrado' || c.tipo === 'bloqueo' || c.tipo === 'liberador' || c.tipo === 'pam' || c.tipo === 'agonista' || c.tipo === 'antagonista') {
            r.occ = 'nt'; r.t = rnd(0.5, 0.9); r.flash = 0.3; return true;
          }
        }
      }
      return false;
    }

    actualizarVaso(dt) {
      const con = this.estado !== 'sin';
      const objetivo = this.estado === 'con' ? 78 : this.estado === 'cronico' ? 58 : 46;
      this.radio += (objetivo - this.radio) * Math.min(1, dt * 1.6);
      const v = 60 * Math.pow(this.radio / 46, 2);
      this.globulos.forEach(g => { g.x += v * dt; if (g.x > W + 20) { g.x = -20; g.dy = rnd(-0.8, 0.8); } });
      if (con && Math.random() < dt * 16) this.part.push({ tipo: 'droga', x: rnd(40, 600), y: 165 + rnd(-1, 1) * this.radio * 0.7, vy: rnd(-1, 1) * 40, vida: rnd(0.8, 1.4) });
      this.part = this.part.filter(p => { p.vida -= dt; p.y += p.vy * dt; return p.vida > 0; });
      this.senal = (this.radio - 46) / 32;
      if (this.alCambiarSenal) this.alCambiarSenal(this.senal);
    }

    // ---------------------------------------------------------------- dibujo
    dibujar() {
      const ctx = this.ctx, k = this.escala * this.dpr;
      ctx.setTransform(k, 0, 0, k, 0, 0);
      ctx.clearRect(0, 0, W, H);
      if (this.c.tipo === 'vaso') return this.dibujarVaso(ctx);
      const col = this.col, c = this.c;
      ctx.font = '14px ' + (css('--fuente') || 'sans-serif');
      // Neurona emisora
      ctx.fillStyle = col.pre;
      ctx.beginPath();
      ctx.moveTo(20, 0); ctx.lineTo(620, 0); ctx.lineTo(620, Y_PRE - 24);
      ctx.quadraticCurveTo(620, Y_PRE, 590, Y_PRE); ctx.lineTo(50, Y_PRE);
      ctx.quadraticCurveTo(20, Y_PRE, 20, Y_PRE - 24); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = col.mem; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(620, 0); ctx.lineTo(620, Y_PRE - 24); ctx.quadraticCurveTo(620, Y_PRE, 590, Y_PRE); ctx.lineTo(50, Y_PRE); ctx.quadraticCurveTo(20, Y_PRE, 20, Y_PRE - 24); ctx.lineTo(20, 0); ctx.stroke();
      // Neurona receptora
      ctx.fillStyle = col.post;
      ctx.beginPath(); ctx.moveTo(20, H); ctx.lineTo(20, Y_POST + 24); ctx.quadraticCurveTo(20, Y_POST, 50, Y_POST); ctx.lineTo(590, Y_POST); ctx.quadraticCurveTo(620, Y_POST, 620, Y_POST + 24); ctx.lineTo(620, H); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(20, H); ctx.lineTo(20, Y_POST + 24); ctx.quadraticCurveTo(20, Y_POST, 50, Y_POST); ctx.lineTo(590, Y_POST); ctx.quadraticCurveTo(620, Y_POST, 620, Y_POST + 24); ctx.lineTo(620, H); ctx.stroke();

      ctx.fillStyle = col.txt3; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillText(c.tituloPre || 'Neurona emisora', 32, 10);
      ctx.fillText(c.tituloPost || 'Neurona receptora', 32, H - 22);
      ctx.textAlign = 'right'; ctx.fillText('hendidura sináptica', 612, Y_PRE + 6);

      // Vesículas
      this.ves.forEach(v => {
        const yy = v.y + (v.fus > 0 ? (0.35 - v.fus) * 70 : 0);
        ctx.strokeStyle = col.mem; ctx.lineWidth = 1.5; ctx.globalAlpha = v.fus > 0 ? 0.5 : 1;
        ctx.beginPath(); ctx.arc(v.x, yy, 15, 0, 6.3); ctx.stroke();
        ctx.fillStyle = col.nt;
        const n = Math.round(7 * v.lleno);
        for (let i = 0; i < n; i++) { const a = i * 0.9 + v.x * 0.01; ctx.beginPath(); ctx.arc(v.x + Math.cos(a) * 7 * (i % 2 ? 1 : 0.45), yy + Math.sin(a) * 7 * (i % 2 ? 1 : 0.45), 2.6, 0, 6.3); ctx.fill(); }
        ctx.globalAlpha = 1;
      });
      if (c.tipo === 'antagonista') { ctx.fillStyle = col.txt3; ctx.textAlign = 'center'; ctx.fillText('(la adenosina se acumula con la actividad y el tiempo despierto)', 320, 92); }

      // Transportadores
      this.trans.forEach(tr => {
        ctx.fillStyle = tr.bloq > 0 ? col.droga : tr.rev > 0 ? col.nt : col.mem;
        redondeado(ctx, tr.x - 10, Y_PRE - 12, 7, 24, 3); ctx.fill();
        redondeado(ctx, tr.x + 3, Y_PRE - 12, 7, 24, 3); ctx.fill();
        if (tr.bloq > 0) { this.forma(ctx, 'droga', tr.x, Y_PRE + 6, 1); }
        if (tr.rev > 0) { ctx.strokeStyle = col.nt; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(tr.x, Y_PRE - 18); ctx.lineTo(tr.x, Y_PRE + 14); ctx.lineTo(tr.x - 4, Y_PRE + 9); ctx.moveTo(tr.x, Y_PRE + 14); ctx.lineTo(tr.x + 4, Y_PRE + 9); ctx.stroke(); }
      });
      if (this.trans.length) { ctx.fillStyle = col.txt3; ctx.textAlign = 'left'; ctx.fillText(c.transportadorNombre || 'transportador', this.trans[0].x - 30, Y_PRE - 26); }

      // Receptores presinápticos (CB1)
      this.recPre.forEach(r => {
        ctx.strokeStyle = r.occ > 0 ? col.droga : col.mem; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(r.x - 8, Y_PRE + 9); ctx.lineTo(r.x - 8, Y_PRE + 1); ctx.lineTo(r.x + 8, Y_PRE + 1); ctx.lineTo(r.x + 8, Y_PRE + 9); ctx.stroke();
        if (r.occ > 0) this.forma(ctx, 'droga', r.x, Y_PRE + 6, 1);
      });
      if (this.recPre.length) { ctx.fillStyle = col.txt3; ctx.textAlign = 'left'; ctx.fillText('receptor CB1', this.recPre[0].x - 30, Y_PRE + 14); }

      // Partículas
      this.part.forEach(p => this.forma(ctx, p.tipo, p.x, p.y, Math.min(1, p.vida)));

      // Receptores postsinápticos
      this.rec.forEach(r => {
        const activa = r.occ && !r.desens && !(c.tipo === 'antagonista' && r.occ === 'droga');
        ctx.fillStyle = r.desens ? col.gris : activa ? (r.occ === 'droga' ? col.droga : col.nt) : (r.occ === 'droga' ? col.gris : col.mem);
        ctx.globalAlpha = r.desens ? 0.45 : 1;
        redondeado(ctx, r.x - 13, Y_POST - 16, 7, 28, 3); ctx.fill();
        redondeado(ctx, r.x + 6, Y_POST - 16, 7, 28, 3); ctx.fill();
        ctx.globalAlpha = 1;
        if (r.desens) { ctx.strokeStyle = col.gris; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(r.x - 8, Y_POST - 10); ctx.lineTo(r.x + 8, Y_POST + 6); ctx.stroke(); }
        if (r.occ) this.forma(ctx, r.occ, r.x, Y_POST - 3, 1);
        if (r.mod > 0) { this.forma(ctx, 'droga', r.x + 15, Y_POST + 2, 1, 0.75); }
        if (activa && r.flash > 0) { ctx.globalAlpha = r.flash; ctx.strokeStyle = col.nt; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(r.x, Y_POST, 18, 0, 6.3); ctx.stroke(); ctx.globalAlpha = 1; }
      });
      ctx.fillStyle = col.txt3; ctx.textAlign = 'left';
      ctx.fillText(c.receptor, this.rec[0].x - 24, Y_POST + 14);

      // Iones / señal dentro de la neurona receptora
      ctx.fillStyle = col.ion;
      this.iones.forEach(io => { ctx.globalAlpha = Math.min(1, io.vida); ctx.beginPath(); ctx.arc(io.x, io.y, 2.2, 0, 6.3); ctx.fill(); });
      ctx.globalAlpha = 1;
    }

    forma(ctx, tipo, x, y, a, esc) {
      esc = esc || 1;
      ctx.globalAlpha = Math.max(0, Math.min(1, a));
      if (tipo === 'nt') {
        ctx.fillStyle = this.col.nt; ctx.beginPath(); ctx.arc(x, y, 4.2 * esc, 0, 6.3); ctx.fill();
      } else {
        ctx.fillStyle = this.col.droga;
        const r = 6.2 * esc;
        ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x + r, y); ctx.lineTo(x, y + r); ctx.lineTo(x - r, y); ctx.closePath(); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    dibujarVaso(ctx) {
      const col = this.col, cy = 165, r = this.radio;
      ctx.font = '14px ' + (css('--fuente') || 'sans-serif');
      ctx.fillStyle = col.post; ctx.fillRect(0, cy - r - 30, W, 30); ctx.fillRect(0, cy + r, W, 30);
      // Células de músculo liso
      for (let x = 10; x < W; x += 46) {
        [cy - r - 15, cy + r + 15].forEach(yy => {
          ctx.fillStyle = col.pre; ctx.strokeStyle = col.mem; ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.ellipse(x + 20, yy, 20, 7 * (1.2 - (r - 46) / 80), 0, 0, 6.3); ctx.fill(); ctx.stroke();
        });
      }
      ctx.strokeStyle = col.mem; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(0, cy - r); ctx.lineTo(W, cy - r); ctx.moveTo(0, cy + r); ctx.lineTo(W, cy + r); ctx.stroke();
      // Glóbulos rojos
      this.globulos.forEach(g => {
        ctx.fillStyle = col.sangre; ctx.globalAlpha = 0.85;
        ctx.beginPath(); ctx.ellipse(g.x, cy + g.dy * (r - 12), g.r, g.r * 0.6, 0, 0, 6.3); ctx.fill();
      });
      ctx.globalAlpha = 1;
      this.part.forEach(p => this.forma(ctx, 'droga', p.x, p.y, Math.min(1, p.vida), 0.8));
      ctx.fillStyle = col.txt3; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillText('Pared del vaso (músculo liso)', 12, cy - r - 46 > 4 ? cy - r - 46 : 4);
      ctx.fillText('Sangre', 12, cy - 8);
      const ta = Math.round(120 - (r - 46) * 1.1), fc = Math.round(70 + (r - 46) * 1.6);
      ctx.textAlign = 'right';
      ctx.fillStyle = col.txt;
      ctx.fillText('Tensión arterial ≈ ' + ta + ' mmHg   ·   Pulso ≈ ' + fc + ' lpm (orientativo)', 628, H - 18);
    }
  }

  function redondeado(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  }

  NT.Sinapsis = Sinapsis;
})();
