/* Gráficos en canvas: líneas, áreas, áreas divididas por una base, bandas, cursor y tooltip. */
(function () {
  'use strict';
  const u = NT.util;

  function cssVar(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }

  function ticksBonitos(min, max, n) {
    n = n || 5;
    const span = max - min;
    if (!(span > 0)) return [min];
    const paso0 = span / n;
    const mag = Math.pow(10, Math.floor(Math.log10(paso0)));
    const r = paso0 / mag;
    const paso = (r < 1.5 ? 1 : r < 3 ? 2 : r < 7 ? 5 : 10) * mag;
    const out = [];
    for (let v = Math.ceil(min / paso) * paso; v <= max + paso * 1e-6; v += paso) out.push(+v.toFixed(10));
    return out;
  }
  function ticksLog(min, max) {
    const out = [];
    for (let e = Math.floor(Math.log10(min)); e <= Math.ceil(Math.log10(max)); e++) {
      [1, 2, 5].forEach(m => { const v = m * Math.pow(10, e); if (v >= min * 0.999 && v <= max * 1.001) out.push(v); });
    }
    return out;
  }
  function decimales(ticks) {
    if (ticks.length < 2) return 0;
    const paso = Math.abs(ticks[1] - ticks[0]);
    return paso >= 1 ? 0 : Math.min(4, Math.ceil(-Math.log10(paso) - 1e-9));
  }
  function valor(arr, i) { return typeof arr === 'number' ? arr : arr[i]; }
  function buscarIndice(xs, x) {
    let lo = 0, hi = xs.length - 1;
    if (hi < 0) return -1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (xs[m] < x) lo = m; else hi = m; }
    return Math.abs(xs[lo] - x) <= Math.abs(xs[hi] - x) ? lo : hi;
  }

  class Grafico {
    constructor(el, opt) {
      opt = opt || {};
      this.el = el; this.alto = opt.alto || 260; this.cfg = null; this.hx = null;
      el.classList.add('graf');
      el.style.height = this.alto + 'px';
      this.cv = document.createElement('canvas');
      this.ctx = this.cv.getContext('2d');
      el.appendChild(this.cv);
      this.tip = document.createElement('div');
      this.tip.className = 'graf-tip';
      el.appendChild(this.tip);
      this.ro = new ResizeObserver(() => this.dibujar());
      this.ro.observe(el);
      const mover = e => {
        const r = this.cv.getBoundingClientRect();
        const p = e.touches ? e.touches[0] : e;
        this.hx = p.clientX - r.left; this.hy = p.clientY - r.top;
        this.dibujar();
      };
      this.cv.addEventListener('mousemove', mover);
      this.cv.addEventListener('touchstart', mover, { passive: true });
      this.cv.addEventListener('touchmove', mover, { passive: true });
      this.cv.addEventListener('mouseleave', () => { this.hx = null; this.dibujar(); });
      this.cv.addEventListener('click', e => {
        if (this.cfg && this.cfg.alClic && this.invX) {
          const r = this.cv.getBoundingClientRect();
          this.cfg.alClic(this.invX(e.clientX - r.left));
        }
      });
    }
    set(cfg) { this.cfg = cfg; this.dibujar(); }
    setAlto(h) { this.alto = h; this.el.style.height = h + 'px'; this.dibujar(); }
    destruir() { this.ro.disconnect(); }

    dibujar() {
      const c = this.cfg;
      if (!c) return;
      const w = this.el.clientWidth, h = this.alto;
      if (w < 20) return;
      const dpr = window.devicePixelRatio || 1;
      if (this.cv.width !== Math.round(w * dpr) || this.cv.height !== Math.round(h * dpr)) {
        this.cv.width = Math.round(w * dpr); this.cv.height = Math.round(h * dpr);
        this.cv.style.width = w + 'px'; this.cv.style.height = h + 'px';
      }
      const ctx = this.ctx;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const col = { txt: cssVar('--texto-2'), txt3: cssVar('--texto-3'), borde: cssVar('--borde'), fuerte: cssVar('--borde-fuerte'), texto: cssVar('--texto') };
      const fuente = cssVar('--fuente') || 'sans-serif';
      const X = c.x, Y = c.y;
      const m = { l: c.margenIzq || 48, r: c.margenDer || 14, t: 12, b: X.titulo ? 40 : 26 };
      const ylog = !!Y.log;
      const ymin = ylog ? Math.max(Y.min, 1e-6) : Y.min, ymax = Y.max;
      const xmin = X.min, xmax = X.max;
      const xlog = !!X.log;
      const tx = v => xlog ? Math.log10(Math.max(v, xmin)) : v;
      const ty = v => ylog ? Math.log10(Math.max(v, ymin)) : v;
      const W = w - m.l - m.r, H = h - m.t - m.b;
      const px = v => m.l + (tx(v) - tx(xmin)) / (tx(xmax) - tx(xmin)) * W;
      const py = v => m.t + (1 - (ty(v) - ty(ymin)) / (ty(ymax) - ty(ymin))) * H;
      this.invX = x => {
        const f = (x - m.l) / W;
        return xlog ? Math.pow(10, tx(xmin) + f * (tx(xmax) - tx(xmin))) : xmin + f * (xmax - xmin);
      };
      this.px = px; this.py = py;

      ctx.font = '11px ' + fuente;
      ctx.lineJoin = 'round';

      // Bandas verticales (fases, días sin consumo...)
      (c.bandasX || []).forEach(b => {
        const x0 = Math.max(m.l, px(b.x0)), x1 = Math.min(w - m.r, px(b.x1));
        if (x1 <= x0) return;
        ctx.fillStyle = b.color; ctx.fillRect(x0, m.t, x1 - x0, H);
        if (b.texto && x1 - x0 > 34) {
          ctx.fillStyle = b.colorTexto || col.txt; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
          ctx.fillText(recortar(ctx, b.texto, x1 - x0 - 6), x0 + 4, m.t + 3);
        }
      });
      // Bandas horizontales (rangos de concentración)
      (c.bandasY || []).forEach(b => {
        const y0 = py(Math.min(b.y1, ymax)), y1 = py(Math.max(b.y0, ymin));
        if (y1 <= y0 + 0.5) return;
        ctx.fillStyle = b.color; ctx.fillRect(m.l, y0, W, y1 - y0);
        if (b.texto) {
          ctx.fillStyle = b.colorTexto || col.txt; ctx.textAlign = 'right'; ctx.textBaseline = 'top';
          ctx.fillText(b.texto, w - m.r - 4, y0 + 3);
        }
      });

      // Rejilla y ejes
      ctx.strokeStyle = col.borde; ctx.lineWidth = 1; ctx.fillStyle = col.txt;
      const yt = Y.ticks || (ylog ? ticksLog(ymin, ymax) : ticksBonitos(ymin, ymax, Y.n || 5));
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      const decY = decimales(yt);
      yt.forEach(v => {
        const y = Math.round(py(v)) + 0.5;
        ctx.beginPath(); ctx.moveTo(m.l, y); ctx.lineTo(w - m.r, y); ctx.stroke();
        ctx.fillText(Y.fmt ? Y.fmt(v) : (ylog ? u.num(v) : u.num(v, decY)), m.l - 6, y);
      });
      const xt = X.ticks || (xlog ? ticksLog(xmin, xmax) : ticksBonitos(xmin, xmax, Math.max(3, Math.floor(W / 80))));
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      const decX = decimales(xt);
      let ultimoX = -1e9;
      xt.forEach(v => {
        const x = px(v);
        if (x < m.l - 1 || x > w - m.r + 1) return;
        const t = X.fmt ? X.fmt(v) : (xlog ? u.num(v) : u.num(v, decX));
        const ancho = ctx.measureText(t).width;
        if (x - ancho / 2 < ultimoX + 6) return;
        ultimoX = x + ancho / 2;
        ctx.fillText(t, x, h - m.b + 7);
        ctx.strokeStyle = col.borde;
        ctx.beginPath(); ctx.moveTo(Math.round(x) + 0.5, h - m.b); ctx.lineTo(Math.round(x) + 0.5, h - m.b + 4); ctx.stroke();
      });
      if (X.titulo) { ctx.fillStyle = col.txt3; ctx.fillText(X.titulo, m.l + W / 2, h - 16); }
      if (Y.titulo) {
        ctx.save(); ctx.translate(11, m.t + H / 2); ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = col.txt3; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(Y.titulo, 0, 0); ctx.restore();
      }
      ctx.strokeStyle = col.fuerte;
      ctx.beginPath(); ctx.moveTo(m.l, h - m.b + 0.5); ctx.lineTo(w - m.r, h - m.b + 0.5); ctx.stroke();

      // Series
      ctx.save();
      ctx.beginPath(); ctx.rect(m.l, m.t - 1, W, H + 2); ctx.clip();
      (c.series || []).forEach(s => this.serie(ctx, s, px, py, m, w, h));
      ctx.restore();

      // Líneas de referencia
      (c.lineasY || []).forEach(l => {
        if (l.y < ymin || l.y > ymax) return;
        const y = Math.round(py(l.y)) + 0.5;
        ctx.strokeStyle = l.color || col.fuerte; ctx.lineWidth = l.ancho || 1.2; ctx.setLineDash(l.guion || [5, 4]);
        ctx.beginPath(); ctx.moveTo(m.l, y); ctx.lineTo(w - m.r, y); ctx.stroke(); ctx.setLineDash([]);
        if (l.texto) {
          ctx.fillStyle = l.color || col.txt; ctx.textAlign = l.izq ? 'left' : 'right'; ctx.textBaseline = 'bottom';
          ctx.fillText(l.texto, l.izq ? m.l + 4 : w - m.r - 4, y - 3);
        }
      });
      (c.lineasX || []).forEach(l => {
        if (l.x < xmin || l.x > xmax) return;
        const x = Math.round(px(l.x)) + 0.5;
        ctx.strokeStyle = l.color || col.fuerte; ctx.lineWidth = l.ancho || 1; ctx.setLineDash(l.guion || [4, 4]);
        ctx.beginPath(); ctx.moveTo(x, m.t); ctx.lineTo(x, h - m.b); ctx.stroke(); ctx.setLineDash([]);
        if (l.texto) {
          ctx.fillStyle = l.color || col.txt; ctx.textAlign = x > w - 120 ? 'right' : 'left'; ctx.textBaseline = 'top';
          ctx.fillText(l.texto, x > w - 120 ? x - 4 : x + 4, m.t + (l.dy || 2));
        }
      });

      // Cursor del día seleccionado
      if (c.cursor != null && c.cursor >= xmin && c.cursor <= xmax) {
        const x = Math.round(px(c.cursor)) + 0.5;
        ctx.strokeStyle = col.texto; ctx.globalAlpha = 0.55; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, m.t); ctx.lineTo(x, h - m.b); ctx.stroke(); ctx.globalAlpha = 1;
      }
      // Anotaciones (corchetes con texto)
      (c.anotaciones || []).forEach(a => this.anotar(ctx, a, px, py, m, w, fuente));

      // Hover
      if (this.hx != null && this.hx >= m.l && this.hx <= w - m.r && c.tip !== false) {
        const xv = this.invX(this.hx);
        const html = typeof c.tip === 'function' ? c.tip(xv) : this.tipAuto(xv);
        if (html) {
          const x = Math.round(this.hx) + 0.5;
          ctx.strokeStyle = col.fuerte; ctx.setLineDash([3, 3]);
          ctx.beginPath(); ctx.moveTo(x, m.t); ctx.lineTo(x, h - m.b); ctx.stroke(); ctx.setLineDash([]);
          this.tip.innerHTML = html;
          this.tip.style.display = 'block';
          const tw = this.tip.offsetWidth;
          let left = this.hx + 14;
          if (left + tw > w - 4) left = this.hx - tw - 14;
          this.tip.style.left = Math.max(4, left) + 'px';
          this.tip.style.top = Math.max(4, Math.min(h - this.tip.offsetHeight - 4, (this.hy || 20) - 20)) + 'px';
        } else this.tip.style.display = 'none';
      } else this.tip.style.display = 'none';
    }

    serie(ctx, s, px, py, m, w, h) {
      const xs = s.x;
      const n = xs ? xs.length : 0;
      if (s.tipo === 'linea') {
        ctx.strokeStyle = s.color; ctx.lineWidth = s.ancho || 1.6; ctx.setLineDash(s.guion || []);
        ctx.globalAlpha = s.alfa || 1;
        ctx.beginPath();
        let abierto = false;
        for (let i = 0; i < n; i++) {
          const v = valor(s.y, i);
          if (v == null || !isFinite(v)) { abierto = false; continue; }
          const X = px(xs[i]), Yv = py(v);
          if (!abierto) { ctx.moveTo(X, Yv); abierto = true; } else ctx.lineTo(X, Yv);
        }
        ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      } else if (s.tipo === 'area') {
        ctx.fillStyle = s.color;
        ctx.beginPath();
        for (let i = 0; i < n; i++) ctx.lineTo(px(xs[i]), py(valor(s.y1, i)));
        for (let i = n - 1; i >= 0; i--) ctx.lineTo(px(xs[i]), py(valor(s.y0, i)));
        ctx.closePath(); ctx.fill();
      } else if (s.tipo === 'division') {
        const camino = () => {
          ctx.beginPath();
          for (let i = 0; i < n; i++) ctx.lineTo(px(xs[i]), py(valor(s.y, i)));
          for (let i = n - 1; i >= 0; i--) ctx.lineTo(px(xs[i]), py(valor(s.base, i)));
          ctx.closePath();
        };
        const recorte = (arriba) => {
          ctx.beginPath();
          ctx.moveTo(px(xs[0]), arriba ? m.t - 2 : h);
          for (let i = 0; i < n; i++) ctx.lineTo(px(xs[i]), py(valor(s.base, i)));
          ctx.lineTo(px(xs[n - 1]), arriba ? m.t - 2 : h);
          ctx.closePath();
        };
        if (s.arriba) { ctx.save(); recorte(true); ctx.clip(); camino(); ctx.fillStyle = s.arriba; ctx.fill(); ctx.restore(); }
        if (s.abajo) { ctx.save(); recorte(false); ctx.clip(); camino(); ctx.fillStyle = s.abajo; ctx.fill(); ctx.restore(); }
      } else if (s.tipo === 'puntos') {
        ctx.fillStyle = s.color;
        for (let i = 0; i < n; i++) {
          const v = valor(s.y, i);
          if (v == null || !isFinite(v)) continue;
          ctx.beginPath(); ctx.arc(px(xs[i]), py(v), s.r || 2.5, 0, 6.3); ctx.fill();
        }
      } else if (s.tipo === 'marcas') {
        ctx.fillStyle = s.color;
        const alto = s.alto || 6;
        for (let i = 0; i < n; i++) ctx.fillRect(px(xs[i]) - (s.anchoMarca || 1), h - m.b - alto, (s.anchoMarca || 1) * 2, alto);
      } else if (s.tipo === 'trayectoria') {
        // Curva paramétrica (bucle de histéresis) con flechas de dirección.
        ctx.strokeStyle = s.color; ctx.lineWidth = s.ancho || 1.8; ctx.setLineDash(s.guion || []);
        ctx.beginPath();
        for (let i = 0; i < n; i++) { const X = px(xs[i]), Yv = py(s.y[i]); i ? ctx.lineTo(X, Yv) : ctx.moveTo(X, Yv); }
        ctx.stroke(); ctx.setLineDash([]);
        if (s.flechas) {
          ctx.fillStyle = s.color;
          const pasos = s.flechas;
          for (let k = 1; k <= pasos; k++) {
            const i = Math.floor(k * (n - 2) / (pasos + 1)) + 1;
            const x0 = px(xs[i - 1]), y0 = py(s.y[i - 1]), x1 = px(xs[i + 1]), y1 = py(s.y[i + 1]);
            const a = Math.atan2(y1 - y0, x1 - x0), X = px(xs[i]), Yv = py(s.y[i]);
            if (!isFinite(a) || Math.hypot(x1 - x0, y1 - y0) < 0.5) continue;
            ctx.beginPath();
            ctx.moveTo(X + 6 * Math.cos(a), Yv + 6 * Math.sin(a));
            ctx.lineTo(X + 5 * Math.cos(a + 2.5), Yv + 5 * Math.sin(a + 2.5));
            ctx.lineTo(X + 5 * Math.cos(a - 2.5), Yv + 5 * Math.sin(a - 2.5));
            ctx.closePath(); ctx.fill();
          }
        }
      }
    }

    anotar(ctx, a, px, py, m, w, fuente) {
      const x = px(a.x);
      if (!(x >= m.l && x <= w - m.r)) return;
      const y0 = py(a.y0), y1 = py(a.y1);
      const derecha = x < w - 170;
      const ax = x + (derecha ? 9 : -9);
      ctx.strokeStyle = a.color; ctx.fillStyle = a.color; ctx.lineWidth = 1.6;
      if (Math.abs(y1 - y0) > 10) {
        ctx.beginPath();
        ctx.moveTo(ax - (derecha ? 4 : -4), y0); ctx.lineTo(ax, y0); ctx.lineTo(ax, y1); ctx.lineTo(ax - (derecha ? 4 : -4), y1);
        ctx.stroke();
      }
      ctx.font = '500 12px ' + fuente;
      ctx.textAlign = derecha ? 'left' : 'right'; ctx.textBaseline = 'middle';
      const ym = Math.abs(y1 - y0) > 10 ? (y0 + y1) / 2 : Math.min(y0, y1) - 10;
      ctx.fillText(a.texto, ax + (derecha ? 6 : -6), ym);
      ctx.font = '11px ' + fuente;
    }

    tipAuto(xv) {
      const c = this.cfg;
      const filas = [];
      (c.series || []).forEach(s => {
        if (!s.etiqueta || !s.x || !s.x.length) return;
        const i = buscarIndice(s.x, xv);
        const v = valor(s.y != null ? s.y : s.y1, i);
        if (v == null || !isFinite(v)) return;
        filas.push(`<div class="tip-fila"><span class="tip-punto" style="background:${s.color}"></span>${u.esc(s.etiqueta)}<b>${s.fmt ? s.fmt(v) : u.num(v)}</b></div>`);
      });
      if (!filas.length) return '';
      const cab = c.x.fmtTip ? c.x.fmtTip(xv) : (c.x.fmt ? c.x.fmt(xv) : u.num(xv));
      return `<div class="tip-cab">${cab}</div>` + filas.join('');
    }
  }

  function recortar(ctx, t, ancho) {
    if (ctx.measureText(t).width <= ancho) return t;
    while (t.length > 1 && ctx.measureText(t + '…').width > ancho) t = t.slice(0, -1);
    return t + '…';
  }

  NT.Grafico = Grafico;
  NT.graficos = { cssVar, ticksBonitos, buscarIndice };
})();
