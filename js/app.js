/* Interfaz: rutas, modos, panel de control, gráficos y secciones. */
(function () {
  'use strict';
  const U = NT.util, M = NT.motor, G = NT.Grafico;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const SUS = NT.sustancias.slice().sort((a, b) => a.numero - b.numero);
  const MODOS = ['basico', 'principiante', 'profesional'];
  const VELOCIDADES = [['0.5', 'Muy lenta · 1 día cada 2 s'], ['1', 'Lenta · 1 día/s'], ['2', '2 días/s'], ['5', '5 días/s'],
    ['10', '10 días/s'], ['20', '20 días/s'], ['50', 'Rápida · 50 días/s'], ['auto', 'Automática (todo en ≈11 s)']];

  const COL = {
    teal: '#1D9E75', tealA: 'rgba(29,158,117,0.30)', coral: '#D85A30', coralA: 'rgba(216,90,48,0.32)',
    gris: 'rgba(127,119,221,0.16)', grisTxt: '#7F77DD', amber: '#BA7517', purple: '#7F77DD', red: '#E24B4A',
    redA: 'rgba(226,75,74,0.20)', blue: '#378ADD', natural: '#888780', green: '#639922', pink: '#D4537E'
  };
  const NIVEL_BANDA = {
    info: 'rgba(55,138,221,0.10)', aviso: 'rgba(186,117,23,0.12)', peligro: 'rgba(216,90,48,0.14)', critico: 'rgba(226,75,74,0.20)'
  };

  const E = {
    sust: null, modo: 'basico', cfg: null, res: null, dia: 0, presetId: null, diaAuto: false,
    graf: {}, sin: null, hist: 0, vent: 'dia', play: null, velocidad: leerVelocidad(), log: false, resol: 'horas', vista: 'sustancia',
    comp: null, compOcultas: new Set()
  };

  function leerVelocidad() {
    let v = '5';
    try { v = localStorage.getItem('nt-velocidad') || '5'; } catch (e) { /* nada */ }
    return VELOCIDADES.some(x => x[0] === v) ? v : '5';
  }

  // ------------------------------------------------------------------ utilidades
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  function gl(txt) {
    return String(txt == null ? '' : txt).replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, a, b) => {
      const k = norm(b || a);
      return NT.glosario[k] ? `<span class="g" tabindex="0" data-g="${k}">${a}</span>` : a;
    });
  }
  const pct = v => (v == null || !isFinite(v)) ? '—' : Math.round(v) + ' %';
  const clamp = U.clamp;
  function puntos(n, max, color) {
    max = max || 5;
    let h = `<span class="puntos" style="--c:${color || 'var(--texto)'}">`;
    for (let i = 1; i <= max; i++) h += i <= n ? '●' : '<span class="off">●</span>';
    return h + '</span>';
  }
  function leyenda(items) {
    return `<div class="leyenda">${items.map(it => {
      const cls = it.tipo === 'linea' ? 'linea' : it.tipo === 'guion' ? 'guion' : '';
      const st = it.tipo === 'guion' ? `border-color:${it.c}` : `background:${it.c}`;
      return `<span class="ley"><i class="${cls}" style="${st}"></i>${it.t}</span>`;
    }).join('')}</div>`;
  }
  function sec(id, titulo, ayuda, cuerpo, extraCab) {
    return `<section class="sec" id="${id}"><div class="sec-cab"><div><h2>${titulo}</h2>${ayuda ? `<p class="ayuda">${ayuda}</p>` : ''}</div>${extraCab || ''}</div>${cuerpo}</section>`;
  }
  const forma = () => E.sust.formas.find(f => f.id === E.cfg.forma) || E.sust.formas[0];
  const fmtDosis = v => U.num(v, v < 1 ? 2 : v < 10 && v % 1 ? 1 : 0) + ' ' + E.sust.unidades.dosis;
  const fmtDia = v => {
    const h = E.cfg ? E.cfg.horizonte : 90;
    if (h > 150) return v === 0 ? 'inicio' : Math.round(v / 30) + (Math.round(v / 30) === 1 ? ' mes' : ' meses');
    return 'día ' + Math.round(v);
  };
  const ticksDias = n => {
    if (n <= 150) return null;
    const paso = n > 300 ? 60 : 30, out = [];
    for (let d = 0; d <= n; d += paso) out.push(d);
    return out;
  };
  const nombreDia = d => {
    const sem = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'][((d % 7) + 7) % 7];
    return `Día ${d} (${sem})`;
  };

  // ------------------------------------------------------------------ configuración
  function cfgDesdePreset(s, pid, extra) {
    const p = s.presets.find(x => x.id === pid) || s.presets[0];
    const prev = E.cfg || {};
    return Object.assign({
      forma: s.formas[0].id, dosis: 1, porSesion: 1, intervalo: 1, inicio: 9, frecuencia: 'diario',
      horizonte: 90, dejar: null, reanudar: null, gradual: 0, peso: prev.peso || 70, sexo: prev.sexo || 'h'
    }, JSON.parse(JSON.stringify(p.cfg)), extra || {});
  }
  function aplicarPreset(pid, extra) {
    const s = E.sust;
    E.presetId = pid;
    E.cfg = cfgDesdePreset(s, pid, extra);
    E.diaAuto = true;
  }

  // ------------------------------------------------------------------ tema
  const TEMAS = ['auto', 'light', 'dark'];
  function aplicarTema(t) {
    if (t === 'auto') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = t;
    const b = $('#btn-tema');
    b.textContent = t === 'auto' ? '◐' : t === 'light' ? '☀' : '☾';
    b.title = 'Tema: ' + (t === 'auto' ? 'automático' : t === 'light' ? 'claro' : 'oscuro');
    try { localStorage.setItem('nt-tema', t); } catch (e) { /* sin almacenamiento */ }
    redibujarTodo();
  }
  function redibujarTodo() {
    Object.values(E.graf).forEach(g => g && g.dibujar());
    if (E.sin) E.sin.leerColores();
  }

  // ------------------------------------------------------------------ glosario emergente
  function initGlosario() {
    const pop = $('#pop');
    let fijo = null;
    const mostrar = el => {
      const g = NT.glosario[el.dataset.g];
      if (!g) return;
      pop.innerHTML = `<b>${g.t}</b>${g.d}`;
      pop.style.display = 'block';
      const r = el.getBoundingClientRect();
      const w = pop.offsetWidth, h = pop.offsetHeight;
      let x = r.left + r.width / 2 - w / 2;
      x = clamp(x, 8, window.innerWidth - w - 8);
      let y = r.bottom + 8;
      if (y + h > window.innerHeight - 8) y = r.top - h - 8;
      pop.style.left = x + 'px'; pop.style.top = Math.max(8, y) + 'px';
    };
    const ocultar = () => { pop.style.display = 'none'; };
    document.addEventListener('mouseover', e => { const el = e.target.closest('.g'); if (el) mostrar(el); });
    document.addEventListener('mouseout', e => { if (e.target.closest('.g') && !fijo) ocultar(); });
    document.addEventListener('focusin', e => { const el = e.target.closest('.g'); if (el) mostrar(el); });
    document.addEventListener('focusout', e => { if (e.target.closest('.g')) ocultar(); });
    document.addEventListener('click', e => {
      const el = e.target.closest('.g');
      if (el) { fijo = el; mostrar(el); e.stopPropagation(); }
      else if (fijo) { fijo = null; ocultar(); }
    });
    window.addEventListener('scroll', () => { if (!fijo) ocultar(); }, { passive: true });
  }

  // ------------------------------------------------------------------ rutas
  function leerHash() {
    const [id, modo] = location.hash.replace(/^#\/?/, '').split('/');
    return { id: id || '', modo: modo || '' };
  }
  function irA(id, modo) {
    const h = '#' + id + '/' + modo;
    if (location.hash !== h) location.hash = h; else aplicarRuta();
  }
  function aplicarRuta() {
    let { id, modo } = leerHash();
    if (!MODOS.includes(modo)) {
      try { modo = localStorage.getItem('nt-modo') || 'basico'; } catch (e) { modo = 'basico'; }
      if (!MODOS.includes(modo)) modo = 'basico';
    }
    try { localStorage.setItem('nt-modo', modo); } catch (e) { /* nada */ }
    const cambioModo = modo !== E.modo;
    E.modo = modo;
    $$('.modos button').forEach(b => b.setAttribute('aria-selected', String(b.dataset.modo === modo)));
    if (id === 'comparar') {
      E.vista = 'comparar'; E.sust = null; E.res = null;
      marcarTile('comparar');
      document.title = 'Comparar · Neurotolerancia';
      renderComparar();
      return;
    }
    const s = NT.buscar(id) || SUS[0];
    const nueva = !E.sust || E.sust.id !== s.id || E.vista !== 'sustancia';
    E.vista = 'sustancia';
    if (nueva) {
      E.sust = s; E.cfg = null;
      aplicarPreset(s.presets[0].id);
      E.hist = 0; E.vent = 'dia';
    }
    marcarTile(s.id);
    if (nueva || cambioModo || !$('#contenido')) render();
    document.title = s.nombre + ' · Neurotolerancia';
  }
  function marcarTile(id) { $$('.tile').forEach(t => t.classList.toggle('on', t.dataset.id === id)); }

  function renderTabla() {
    $('#tabla').innerHTML = SUS.map(s => {
      const cat = NT.CATEGORIAS[s.categoria];
      return `<button class="tile" data-id="${s.id}" style="--c:${s.color}" title="${U.esc(s.subtitulo)}">
        <span class="n">${s.numero}</span><span class="sim">${s.simbolo}</span>
        <span><span class="nm">${s.nombre}</span><br><span class="ct">${cat.nombre}</span></span></button>`;
    }).join('') + `<button class="tile comparar" data-id="comparar" title="Comparar todas las sustancias">
        <span class="n">∑</span><span class="sim">⇄</span><span><span class="nm">Comparar</span><br><span class="ct">las 11 sustancias</span></span></button>`;
    $$('.tile').forEach(t => t.addEventListener('click', () => irA(t.dataset.id, E.modo)));
  }

  // ------------------------------------------------------------------ render de la vista de sustancia
  function destruir() {
    Object.values(E.graf).forEach(g => g && g.destruir());
    E.graf = {};
    if (E.sin) { E.sin.destruir(); E.sin = null; }
    pararPlay();
  }

  function heroHTML() {
    const s = E.sust, cat = NT.CATEGORIAS[s.categoria], m = E.modo;
    const resumen = m === 'basico' ? s.resumen.basico : m === 'principiante' ? s.resumen.principiante : s.resumen.pro;
    const esc = s.escalas;
    return `<section class="hero" style="--c:${s.color}">
      <div class="hero-tile"><span class="n">${s.numero}</span><span class="sim">${s.simbolo}</span><span class="nm">${s.nombre}</span></div>
      <div>
        <div class="hero-meta"><span class="badge" style="--c:${cat.color}">${cat.nombre}</span>${m === 'profesional' ? `<span class="formula">${s.formula} · ${U.num(s.masaMolar, 2)} g/mol</span>` : ''}</div>
        <h1>${s.nombre}</h1>
        <p class="sub">${s.subtitulo}</p>
        <p class="resumen">${gl(resumen)}</p>
        <div class="chips">
          <div class="chip-dato"><b>Vida media</b>${s.ficha.vidaMedia}</div>
          <div class="chip-dato"><b>Duración</b>${s.ficha.duracion}</div>
          <div class="chip-dato"><b>Inicio</b>${s.ficha.inicio}</div>
          <div class="chip-dato"><b>Potencial de dependencia</b>${puntos(esc.dependencia, 5, s.color)}</div>
          <div class="chip-dato"><b>Gravedad de la abstinencia</b>${puntos(esc.abstinencia, 5, s.color)}${s.abstinencia.peligrosa ? ' <span style="color:var(--peligro);font-weight:600">· puede ser peligrosa</span>' : ''}</div>
          <div class="chip-dato"><b>Toxicidad aguda</b>${puntos(esc.toxicidad, 5, s.color)}</div>
        </div>
      </div>
    </section>`;
  }

  function render() {
    destruir();
    E.res = null; E._diaPK = null;
    const v = $('#vista');
    const m = E.modo;
    let c = '';
    if (m === 'principiante') c += secQueEs() + secSinapsis();
    c += secMetricas() + '<div id="alertas"></div>' + secLargo();
    if (m === 'profesional') c += secVariables();
    if (m === 'principiante') c += secHistoria();
    if (m === 'profesional') c += secPK() + secEfectos() + secDR() + secHisteresis();
    else c += secDia();
    if (m === 'principiante') c += secViaje();
    c += secNeuro();
    if (m === 'principiante') c += secAbstinencia() + secRiesgos() + secInteracciones(true) + secMitos();
    if (m === 'profesional') c += secTablas() + secAfinidad() + secInteracciones(false) + secAbstinencia() + secRiesgos() + secModelo() + secReferencias();
    if (m === 'basico') c += `<section class="sec"><p class="ayuda" style="margin:0">¿Quieres más? El modo <a href="#${E.sust.id}/principiante">Principiante</a> explica la sinapsis con una animación, cuenta la historia de la tolerancia paso a paso y desmonta mitos. El modo <a href="#${E.sust.id}/profesional">Profesional</a> muestra la farmacocinética, las curvas dosis-respuesta, los receptores, las interacciones y las ecuaciones del modelo.</p></section>`;
    v.innerHTML = heroHTML() + `<div class="layout"><aside class="panel" id="panel" aria-label="Controles"></aside><div class="contenido" id="contenido">${c}</div></div>`;
    renderPanel();
    montar();
    resimular();
  }

  // ------------------------------------------------------------------ panel de control
  function slider(k, label, val, min, max, step, fmt, extra) {
    return `<div class="ctl"><div class="ctl-cab"><label for="c-${k}">${label}</label><output id="o-${k}">${fmt(val)}</output></div>
      <input type="range" id="c-${k}" data-k="${k}" min="${min}" max="${max}" step="${step}" value="${val}" ${extra || ''}></div>`;
  }
  const FMT = {
    dosis: v => fmtDosis(v),
    porSesion: v => String(v),
    intervalo: v => U.duracion(v),
    inicio: v => U.hora(v),
    peso: v => v + ' kg',
    dejar: v => nombreDia(v),
    reanudar: v => nombreDia(v),
    dia: v => nombreDia(v)
  };

  function renderPanel() {
    const s = E.sust, c = E.cfg, m = E.modo, u = s.unidades, L = s.limites;
    const pro = m === 'profesional', pri = m !== 'basico';
    const f = forma();
    const p = s.presets.find(x => x.id === E.presetId);
    let h = `<div class="pgrupo"><div class="ptit">Escenario</div>
      <div class="presets">${s.presets.map(x => `<button class="chip${x.id === E.presetId ? ' on' : ''}" data-preset="${x.id}">${U.esc(x.nombre)}</button>`).join('')}</div>
      <p class="pdesc">${p ? U.esc(p.desc) : 'Escenario personalizado: has cambiado algún parámetro.'}</p></div>`;

    h += `<div class="pgrupo"><div class="ptit">Consumo</div>`;
    if (s.formas.length > 1) {
      h += `<div class="ctl"><div class="ctl-cab"><label for="c-forma">${s.formaEtiqueta}</label></div>
        <select id="c-forma">${s.formas.map(x => `<option value="${x.id}"${x.id === c.forma ? ' selected' : ''}>${U.esc(x.nombre)}</option>`).join('')}</select>
        ${pri ? `<p class="nota">${U.esc(f.nota)}</p>` : ''}</div>`;
    } else if (pri) h += `<p class="nota" style="margin:-2px 0 10px">${U.esc(f.nota)}</p>`;
    h += slider('dosis', `Dosis por ${u.dosisNombre}`, c.dosis, L.dosis[0], L.dosis[1], L.dosis[2], FMT.dosis);
    h += slider('porSesion', `${u.dosisPlural} por ${u.sesion}`, c.porSesion, L.porSesion[0], L.porSesion[1], 1, FMT.porSesion);
    if (pro) {
      h += slider('intervalo', 'Intervalo entre dosis', c.intervalo, L.intervalo[0], L.intervalo[1], L.intervalo[2], FMT.intervalo);
      h += slider('inicio', 'Hora de la primera dosis', c.inicio, 0, 23.75, 0.25, FMT.inicio);
    }
    h += `<div class="ctl"><div class="ctl-cab"><label for="c-frecuencia">Frecuencia</label></div>
      <select id="c-frecuencia">${Object.entries(M.FRECUENCIAS).map(([k, v]) => `<option value="${k}"${k === c.frecuencia ? ' selected' : ''}>${v.nombre}</option>`).join('')}</select></div>`;
    if (pro) {
      h += `<div class="ctl"><div class="ctl-cab"><label for="c-horizonte">Periodo simulado</label></div>
        <select id="c-horizonte">${[7, 14, 21, 30, 45, 60, 90, 120, 180, 270, 365, 540].map(d => `<option value="${d}"${d === c.horizonte ? ' selected' : ''}>${d} días</option>`).join('')}</select></div>`;
      h += slider('peso', 'Peso corporal', c.peso, 40, 130, 1, FMT.peso);
      if ((s.pk.VdSexo)) {
        h += `<div class="ctl"><div class="ctl-cab"><span class="lab">Sexo (agua corporal de Widmark)</span></div>
          <div class="segmento" id="c-sexo"><button data-v="h" class="${c.sexo === 'h' ? 'on' : ''}">Hombre (r 0,68)</button><button data-v="m" class="${c.sexo === 'm' ? 'on' : ''}">Mujer (r 0,55)</button></div></div>`;
      }
    }
    h += `</div>`;

    // Abandono
    const H = c.horizonte;
    h += `<div class="pgrupo"><div class="ptit">Dejarlo</div>
      <label class="fila-check"><input type="checkbox" id="c-dejarOn"${c.dejar != null ? ' checked' : ''}> Dejar de consumir</label>`;
    if (c.dejar != null) {
      h += slider('dejar', 'A partir del', c.dejar, 1, H - 1, 1, FMT.dejar);
      if (pri) {
        h += `<div class="ctl"><div class="ctl-cab"><label for="c-gradual">Cómo</label></div>
          <select id="c-gradual">${[[0, 'De golpe'], [1, 'Reduciendo en 1 semana'], [2, 'Reduciendo en 2 semanas'], [3, 'Reduciendo en 3 semanas'], [4, 'Reduciendo en 4 semanas'], [6, 'Reduciendo en 6 semanas'], [8, 'Reduciendo en 8 semanas']].map(([v, t]) => `<option value="${v}"${v === (c.gradual || 0) ? ' selected' : ''}>${t}</option>`).join('')}</select></div>`;
      }
      if (pro) {
        h += `<label class="fila-check"><input type="checkbox" id="c-reanudarOn"${c.reanudar != null ? ' checked' : ''}> Volver a consumir (recaída)</label>`;
        if (c.reanudar != null) h += slider('reanudar', 'Recaída el', c.reanudar, Math.min(H - 1, c.dejar + Math.round((c.gradual || 0) * 7) + 1), H - 1, 1, FMT.reanudar);
      }
    }
    h += `</div>`;

    // Tiempo
    h += `<div class="pgrupo"><div class="ptit">Tiempo</div>
      ${slider('dia', 'Día seleccionado', E.dia, 0, H - 1, 1, FMT.dia)}
      <div class="ctl"><div class="ctl-cab"><label for="c-velocidad">Velocidad de reproducción</label></div>
        <select id="c-velocidad">${VELOCIDADES.map(([v, t]) => `<option value="${v}"${String(v) === String(E.velocidad) ? ' selected' : ''}>${t}</option>`).join('')}</select></div>
      <div class="btns"><button class="btn prim" id="b-play">${E.play ? '❚❚ Pausa' : '▶ Reproducir'}</button><button class="btn" id="b-reset">↺ Día 0</button>
      ${pro ? '<button class="btn" id="b-csv">⤓ CSV</button>' : ''}</div>
      <p class="nota">Consejo: haz clic en cualquier punto del gráfico de largo plazo para saltar a ese día.</p></div>`;
    $('#panel').innerHTML = h;
    enlazarPanel();
  }

  function enlazarPanel() {
    const c = E.cfg;
    $$('#panel [data-preset]').forEach(b => b.addEventListener('click', () => {
      aplicarPreset(b.dataset.preset); renderPanel(); resimular();
    }));
    const personalizado = () => {
      if (E.presetId) {
        E.presetId = null;
        $$('#panel [data-preset]').forEach(b => b.classList.remove('on'));
        $('#panel .pdesc').textContent = 'Escenario personalizado: has cambiado algún parámetro.';
      }
    };
    $$('#panel input[type=range]').forEach(inp => inp.addEventListener('input', () => {
      const k = inp.dataset.k, v = +inp.value;
      $('#o-' + k).textContent = FMT[k](v);
      if (k === 'dia') { E.dia = v; actualizarDia(); return; }
      c[k] = v;
      if (k === 'dejar' && c.reanudar != null && c.reanudar <= v + Math.round((c.gradual || 0) * 7)) {
        c.reanudar = Math.min(c.horizonte - 1, v + Math.round((c.gradual || 0) * 7) + 1);
      }
      personalizado();
      resimular();
    }));
    const sel = (id, fn) => { const el = $(id); if (el) el.addEventListener('change', () => { fn(el.value); personalizado(); resimular(); }); };
    sel('#c-forma', v => { c.forma = v; renderPanel(); });
    sel('#c-frecuencia', v => { c.frecuencia = v; });
    sel('#c-horizonte', v => {
      c.horizonte = +v;
      if (c.dejar != null && c.dejar >= c.horizonte - 1) c.dejar = Math.max(1, c.horizonte - 2);
      if (c.reanudar != null && c.reanudar >= c.horizonte) c.reanudar = null;
      E.dia = Math.min(E.dia, c.horizonte - 1);
      renderPanel();
    });
    sel('#c-gradual', v => { c.gradual = +v; if (c.reanudar != null) c.reanudar = Math.max(c.reanudar, c.dejar + c.gradual * 7 + 1); renderPanel(); });
    const sexo = $('#c-sexo');
    if (sexo) $$('button', sexo).forEach(b => b.addEventListener('click', () => { c.sexo = b.dataset.v; personalizado(); renderPanel(); resimular(); }));
    const dOn = $('#c-dejarOn');
    dOn.addEventListener('change', () => {
      c.dejar = dOn.checked ? Math.max(1, Math.min(c.horizonte - 2, Math.round(c.horizonte * 0.6))) : null;
      if (!dOn.checked) { c.reanudar = null; c.gradual = 0; }
      personalizado(); renderPanel(); resimular();
    });
    const rOn = $('#c-reanudarOn');
    if (rOn) rOn.addEventListener('change', () => {
      c.reanudar = rOn.checked ? Math.min(c.horizonte - 1, c.dejar + Math.round((c.gradual || 0) * 7) + 21) : null;
      personalizado(); renderPanel(); resimular();
    });
    $('#b-play').addEventListener('click', () => (E.play ? pararPlay() : iniciarPlay()));
    $('#c-velocidad').addEventListener('change', e => {
      E.velocidad = e.target.value;
      try { localStorage.setItem('nt-velocidad', E.velocidad); } catch (err) { /* sin almacenamiento */ }
      if (E.play) { pararPlay(); iniciarPlay(); }
    });
    $('#b-reset').addEventListener('click', () => { pararPlay(); fijarDia(0); });
    const csv = $('#b-csv');
    if (csv) csv.addEventListener('click', descargarCSV);
  }

  function fijarDia(d) {
    E.dia = clamp(Math.round(d), 0, E.cfg.horizonte - 1);
    const sl = $('#c-dia');
    if (sl) { sl.value = E.dia; $('#o-dia').textContent = FMT.dia(E.dia); }
    actualizarDia();
  }
  // Días por segundo; «auto» recorre todo el periodo en unos 11 segundos.
  function iniciarPlay() {
    if (E.dia >= E.cfg.horizonte - 1) fijarDia(0);
    const b = $('#b-play'); if (b) b.textContent = '❚❚ Pausa';
    const dps = E.velocidad === 'auto' ? Math.max(1, Math.round(E.cfg.horizonte / 160)) * 1000 / 70 : +E.velocidad;
    const ms = dps <= 20 ? 1000 / dps : 50;
    const paso = dps <= 20 ? 1 : dps * ms / 1000;
    let pos = E.dia;
    E.play = setInterval(() => {
      if (E.dia >= E.cfg.horizonte - 1) { pararPlay(); return; }
      pos = Math.max(pos, E.dia) + paso;
      fijarDia(Math.floor(pos));
    }, ms);
  }
  function pararPlay() {
    if (E.play) clearInterval(E.play);
    E.play = null;
    const b = $('#b-play'); if (b) b.textContent = '▶ Reproducir';
  }
  function descargarCSV() {
    if (!E.res) return;
    const blob = new Blob(['﻿' + M.csv(E.res)], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `neurotolerancia_${E.sust.id}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  // ------------------------------------------------------------------ simulación y actualización
  let pendSim = false, pendDia = false;
  function resimular() {
    if (pendSim) return;
    pendSim = true;
    requestAnimationFrame(() => {
      pendSim = false;
      if (E.vista !== 'sustancia' || !E.sust) return;
      E.res = M.simular(E.sust, E.cfg);
      if (E.diaAuto) {
        E.diaAuto = false;
        const ev = E.res.ev;
        const d = ev.length ? ev[0].dia : 0;
        E.dia = d;
        const sl = $('#c-dia'); if (sl) { sl.value = d; $('#o-dia').textContent = FMT.dia(d); }
      }
      E.dia = Math.min(E.dia, E.cfg.horizonte - 1);
      dibujarLargo();
      tablaModelo();
      if (E.graf.vars) dibujarVariables();
      if (E.graf.viaje) dibujarViaje();
      actualizarDiaAhora();
    });
  }
  function actualizarDia() {
    if (pendDia) return;
    pendDia = true;
    requestAnimationFrame(() => { pendDia = false; if (E.vista === 'sustancia' && E.sust) actualizarDiaAhora(); });
  }
  function actualizarDiaAhora() {
    if (!E.res) return;
    if (E.graf.largo) { E.graf.largo.cfg.cursor = cursorLargo(); E.graf.largo.cfg.anotaciones = anotacionesLargo(); E.graf.largo.dibujar(); }
    if (E.graf.vars) { E.graf.vars.cfg.cursor = E.dia + 0.5; E.graf.vars.dibujar(); }
    actualizarMetricas();
    actualizarNeuro();
    if (E.graf.dia) dibujarDia();
    if (E.graf.conc) dibujarPKyEfectos();
    if (E.graf.dr) dibujarDR();
    actualizarAlertas();
  }

  // Índice horario de referencia del día: hora de la primera dosis (o de inicio de sesión).
  function kDia(d) { return Math.min(E.res.N - 1, d * 24 + Math.floor(E.cfg.inicio || 0)); }
  function datosDia(d) {
    const r = E.res, A = r.A, k = kDia(d), D = r.dias[d];
    const R = r.h.R[k], S = r.h.S[k];
    return {
      k, A, D,
      cost: D.costIni / A * 100,
      mal: D.malIni / A * 100,
      neto: 100 - D.costIni / A * 100,
      deficit: D.deficit / A * 100,
      R, R2: r.h.R2[k], S, H: r.h.H[k], Mt: r.h.Mt[k], I: r.h.I[k], B: r.h.malestar[k] / A
    };
  }

  // ------------------------------------------------------------------ secciones comunes
  function secMetricas() {
    const s = E.sust, et = s.etiquetas, ad = s.adaptaciones[0];
    const pro = E.modo === 'profesional';
    const cards = [
      `<div class="metrica" id="m-neto"><div class="l">${et.neto}</div><div class="v">—</div><div class="s">respecto a la primera vez</div></div>`,
      `<div class="metrica" id="m-mal"><div class="l">${et.malestar}</div><div class="v">—</div><div class="s">si no consumes ese día</div></div>`,
      `<div class="metrica" id="m-ad"><div class="l">${ad.nombre}</div><div class="v">—</div><div class="s">${ad.rol}</div></div>`,
      `<div class="metrica" id="m-hab"><div class="l">Fuerza del hábito</div><div class="v">—</div><div class="s">asociaciones aprendidas</div></div>`
    ];
    if (pro) {
      cards.push(
        `<div class="metrica" id="m-cmax"><div class="l">Cmax del día</div><div class="v">—</div><div class="s">${s.unidades.concNombre}</div></div>`,
        `<div class="metrica" id="m-tmax"><div class="l">Hora del pico</div><div class="v">—</div><div class="s">Tmax de concentración</div></div>`,
        `<div class="metrica" id="m-auc"><div class="l">AUC del día</div><div class="v">—</div><div class="s">${s.unidades.conc}·h</div></div>`,
        `<div class="metrica" id="m-def"><div class="l">Malestar real máximo</div><div class="v">—</div><div class="s">peor momento del día (E − B)</div></div>`
      );
      if (s.canales.some(c => c.umbral != null)) cards.push(`<div class="metrica" id="m-margen"><div class="l">Margen de seguridad</div><div class="v">—</div><div class="s">dosis de riesgo ÷ dosis actual</div></div>`);
    }
    return sec('s-metricas', 'Así está el cerebro el día seleccionado', '', `<div class="metricas">${cards.join('')}</div>`, `<div class="controles-graf"><span class="badge" id="badge-dia" style="--c:${s.color}">Día 0</span></div>`);
  }

  function actualizarMetricas() {
    const s = E.sust, d = datosDia(E.dia);
    const set = (id, v, cls) => {
      const el = $('#' + id); if (!el) return;
      $('.v', el).textContent = v;
      el.classList.remove('ok', 'aviso', 'peligro');
      if (cls) el.classList.add(cls);
    };
    const usado = d.D.dosis > 0;
    $('#badge-dia').textContent = nombreDia(E.dia) + (usado ? ' · consumo' : ' · sin consumo');
    set('m-neto', pct(d.neto), d.neto > 66 ? 'ok' : d.neto > 33 ? 'aviso' : 'peligro');
    set('m-mal', pct(d.mal), d.mal < 5 ? 'ok' : d.mal < 30 ? 'aviso' : 'peligro');
    const ad = valorAdaptacion(s.adaptaciones[0], d);
    set('m-ad', ad.texto, null);
    set('m-hab', pct(d.H * 100), d.H < 0.3 ? 'ok' : d.H < 0.65 ? 'aviso' : 'peligro');
    if (E.modo === 'profesional' && E._diaPK) {
      const v = E._diaPK;
      set('m-cmax', U.num(v.cmax) + ' ' + s.unidades.conc);
      set('m-tmax', v.cmax > 0 ? U.hora(v.tmax) : '—');
      set('m-auc', U.num(v.auc));
      set('m-def', pct(d.deficit), d.deficit < 5 ? 'ok' : d.deficit < 30 ? 'aviso' : 'peligro');
    }
  }

  function valorAdaptacion(a, d) {
    let v = 0;
    switch (a.fuente) {
      case 'R': v = d.R; break;
      case 'R2': v = d.R2; break;
      case 'S': v = d.S; break;
      case 'B': v = clamp(d.B, 0, 2); break;
      case 'H': v = d.H; break;
      case 'Mt': v = d.Mt; break;
      case 'I': v = d.I; break;
    }
    const mostrado = a.a + a.b * v;
    return { texto: Math.round(mostrado) + (a.sufijo === '%' ? ' %' : a.sufijo || ''), barra: clamp(mostrado / a.max, 0, 1) };
  }

  function actualizarAlertas() {
    const cont = $('#alertas'); if (!cont) return;
    const s = E.sust, d = datosDia(E.dia), r = E.res, D = d.D;
    const out = [];
    const sinConsumo = D.dosis === 0;
    const trasDejar = E.cfg.dejar != null && E.dia >= E.cfg.dejar;
    if (s.abstinencia.peligrosa && sinConsumo && trasDejar && d.mal > 20) {
      out.push(`<div class="alerta"><span class="ico">⚠</span><div><b>Abstinencia potencialmente peligrosa.</b> Con este nivel de adaptación, dejar ${s.nombre.toLowerCase()} de golpe puede causar convulsiones u otras complicaciones graves. En la vida real requiere supervisión médica y una retirada gradual.</div></div>`);
    }
    r.P.canales.forEach((c, i) => {
      if (c.umbral == null) return;
      const v = D.picoCh[i];
      if (v >= c.umbral) {
        const extra = s.id === 'opioides' && E.cfg.dejar != null && E.dia >= E.cfg.dejar ? ' Tras días sin consumir se ha perdido la tolerancia respiratoria: la dosis habitual ya no es segura.' : '';
        out.push(`<div class="alerta"><span class="ico">⚠</span><div><b>Riesgo agudo elevado este día:</b> «${c.nombre}» llega al ${Math.round(v)} % (umbral del modelo: ${c.umbral} %).${extra}</div></div>`);
      }
    });
    if (!out.length && E.modo !== 'basico' && sinConsumo && d.mal > 15 && !s.abstinencia.peligrosa) {
      out.push(`<div class="alerta aviso"><span class="ico">ℹ</span><div>Día sin consumo con la costumbre todavía alta: lo que se nota es <b>malestar de abstinencia</b> (${pct(d.mal)} del efecto de la primera vez).</div></div>`);
    }
    cont.innerHTML = out.join('');
    cont.style.display = out.length ? 'flex' : 'none';
    cont.style.flexDirection = 'column'; cont.style.gap = '8px';
  }

  // ------------------------------------------------------------------ gráfico de largo plazo
  function secLargo() {
    const s = E.sust, et = s.etiquetas, pro = E.modo === 'profesional';
    const ley = leyenda([
      { c: COL.purple, t: et.aporte + ' (100 %)', tipo: 'linea' },
      { c: COL.amber, t: et.costumbre, tipo: 'linea' },
      { c: COL.tealA, t: et.neto },
      { c: COL.gris, t: et.tolerancia },
      { c: COL.coralA, t: et.malestar },
      { c: COL.natural, t: 'Nivel natural', tipo: 'guion' }
    ].concat(pro ? [{ c: COL.teal, t: 'Efecto neto real (hora a hora)', tipo: 'linea' }] : []));
    const ayuda = E.modo === 'basico' ? s.basico : 'Todo está en % del efecto que la misma pauta produce la primera vez. La costumbre se mide justo antes de la primera dosis de cada día y se descompone en dos partes: la pérdida de sensibilidad de los receptores (franja morada clara) y la contra-adaptación del cerebro, que es lo que se siente como malestar si no hay sustancia (naranja).';
    const extra = pro ? `<div class="segmento" id="seg-resol"><button data-v="horas" class="${E.resol === 'horas' ? 'on' : ''}">Hora a hora</button><button data-v="dias" class="${E.resol === 'dias' ? 'on' : ''}">Por días</button></div>` : '';
    return sec('s-largo', 'La línea de costumbre a lo largo del tiempo', gl(ayuda), ley + `<div id="g-largo"></div>`, extra);
  }

  function cursorLargo() { return E.modo === 'profesional' && E.resol === 'horas' ? E.dia + (E.cfg.inicio || 0) / 24 : E.dia; }
  function anotacionesLargo() {
    if (!E.res) return [];
    const d = datosDia(E.dia), et = E.sust.etiquetas;
    const x = cursorLargo();
    const out = [];
    if (d.neto > 0.5) out.push({ x, y0: d.cost, y1: 100, color: COL.teal, texto: `${et.neto.toLowerCase()} ${Math.round(d.neto)} %` });
    else out.push({ x, y0: 100, y1: d.cost, color: COL.red, texto: `por debajo de lo normal aun consumiendo (${Math.round(d.neto)} %)` });
    if (d.mal > 3) out.push({ x: x, y0: 0, y1: d.mal, color: COL.coral, texto: `malestar ${Math.round(d.mal)} %` });
    return out;
  }

  function dibujarLargo() {
    const g = E.graf.largo; if (!g || !E.res) return;
    const r = E.res, A = r.A, D = r.dias, n = D.length, cfg = E.cfg, et = E.sust.etiquetas;
    const horas = E.modo === 'profesional' && E.resol === 'horas';
    let xs, cost, mal;
    if (horas) {
      const N = r.N;
      xs = new Float64Array(N); cost = new Float64Array(N); mal = new Float64Array(N);
      for (let k = 0; k < N; k++) { xs[k] = k / 24; cost[k] = r.h.costumbre[k] / A * 100; mal[k] = r.h.malestar[k] / A * 100; }
    } else {
      xs = new Float64Array(n); cost = new Float64Array(n); mal = new Float64Array(n);
      for (let d = 0; d < n; d++) { xs[d] = d; cost[d] = D[d].costIni / A * 100; mal[d] = D[d].malIni / A * 100; }
    }
    let ymax = 120;
    for (let i = 0; i < cost.length; i++) if (cost[i] + 10 > ymax) ymax = cost[i] + 10;
    ymax = Math.min(400, Math.ceil(ymax / 20) * 20);
    const usos = D.filter(x => x.dosis > 0);
    const aporteDia = usos.map(x => x.picoNaive / A * 100);
    const variable = aporteDia.some(v => Math.abs(v - 100) > 4);
    const series = [
      { tipo: 'division', x: xs, y: 100, base: cost, arriba: COL.tealA, abajo: COL.redA },
      { tipo: 'area', x: xs, y0: mal, y1: cost, color: COL.gris },
      { tipo: 'area', x: xs, y0: 0, y1: mal, color: COL.coralA },
      { tipo: 'linea', x: xs, y: 100, color: COL.purple, ancho: 2, etiqueta: et.aporte, fmt: pct },
      { tipo: 'linea', x: xs, y: cost, color: COL.amber, ancho: 2.6, etiqueta: et.costumbre, fmt: pct },
      { tipo: 'linea', x: xs, y: mal, color: COL.coral, ancho: 1, alfa: 0.0001, etiqueta: et.malestar, fmt: pct }
    ];
    if (horas) {
      const sent = new Float64Array(r.N);
      for (let k = 0; k < r.N; k++) sent[k] = r.h.sentido[k] / A * 100;
      series.push({ tipo: 'linea', x: xs, y: sent, color: COL.teal, ancho: 0.8, alfa: 0.55, etiqueta: 'Efecto neto (hora a hora)', fmt: pct });
    }
    if (variable) series.push({ tipo: 'puntos', x: usos.map(x => x.d + (horas ? (cfg.inicio || 0) / 24 : 0)), y: aporteDia, color: COL.purple, r: 2.4, etiqueta: 'Aporte real de ese día', fmt: pct });
    else series.push({ tipo: 'marcas', x: usos.map(x => x.d + (horas ? (cfg.inicio || 0) / 24 : 0)), color: COL.purple, alto: 5 });
    const bandasX = [];
    if (cfg.dejar != null) {
      const red = Math.round((cfg.gradual || 0) * 7);
      if (red) bandasX.push({ x0: cfg.dejar, x1: cfg.dejar + red, color: 'rgba(186,117,23,0.08)', texto: 'Reducción gradual' });
      bandasX.push({ x0: cfg.dejar + red, x1: cfg.reanudar != null ? cfg.reanudar : n, color: 'rgba(136,135,128,0.08)', texto: 'Sin consumo' });
    }
    g.set({
      x: { min: 0, max: Math.max(1, horas ? n : n - 1), fmt: fmtDia, ticks: ticksDias(n), fmtTip: v => nombreDia(Math.floor(v)) + (horas ? ' · ' + U.hora(v * 24) : '') },
      y: { min: 0, max: ymax, fmt: v => v + ' %', titulo: '% del efecto de la primera vez' },
      series, bandasX,
      lineasY: [{ y: 0.001, color: COL.natural, texto: 'nivel natural', izq: true, ancho: 1.4 }],
      cursor: cursorLargo(), anotaciones: anotacionesLargo(),
      alClic: x => { pararPlay(); fijarDia(Math.floor(x)); }
    });
  }

  // ------------------------------------------------------------------ gráfico del día (básico y principiante)
  function ventanaDia(modo) {
    const r = E.res, cfg = E.cfg, d = E.dia, f = forma();
    const evs = r.ev.filter(e => e.dia === d);
    const tPrimera = evs.length ? evs[0].t : d * 24 + (cfg.inicio || 0);
    const tUltima = evs.length ? evs[evs.length - 1].t : tPrimera;
    const dur = f.duracion || 4;
    if ((modo || E.vent) === 'zoom') {
      const fin = tUltima + Math.max(dur * 1.6, 0.15);
      const ini = tPrimera - Math.max(0.06 * (fin - tPrimera), dur * 0.08, 0.02);
      return { t0: Math.max(0, ini), t1: Math.min(fin, ini + 48) };
    }
    return { t0: Math.max(0, tPrimera - 2), t1: Math.max(0, tPrimera - 2) + 24 };
  }
  function secDia() {
    const s = E.sust, et = s.etiquetas;
    const ley = leyenda([
      { c: COL.purple, t: et.efecto + ' (con la tolerancia de ese día)', tipo: 'linea' },
      { c: COL.amber, t: 'Contra-adaptación (malestar de fondo)', tipo: 'linea' },
      { c: COL.tealA, t: 'Lo que se nota' },
      { c: COL.coralA, t: 'Malestar' }
    ]);
    const extra = `<div class="segmento" id="seg-vent"><button data-v="dia" class="${E.vent === 'dia' ? 'on' : ''}">24 horas</button><button data-v="zoom" class="${E.vent === 'zoom' ? 'on' : ''}">Zoom en la sesión</button></div>`;
    return sec('s-dia', 'Un día por dentro', gl('Cada pico es una dosis. Por encima de la línea ámbar se nota el efecto; por debajo, malestar. La pérdida de sensibilidad de los receptores ya está incluida en la altura de los picos.'), ley + `<div id="g-dia"></div>`, extra);
  }
  function dibujarDia() {
    const g = E.graf.dia; if (!g || !E.res) return;
    const r = E.res, A = r.A, et = E.sust.etiquetas;
    const w = ventanaDia();
    const v = M.ventana(r, w.t0, w.t1, 720);
    const n = v.t.length;
    const Ep = new Float64Array(n), Mp = new Float64Array(n);
    let ymax = 110;
    for (let i = 0; i < n; i++) { Ep[i] = v.E[i] / A * 100; Mp[i] = v.mal[i] / A * 100; ymax = Math.max(ymax, Ep[i] * 1.08, Mp[i] * 1.1); }
    const span = w.t1 - w.t0;
    g.set({
      x: { min: w.t0, max: w.t1, fmt: t => span < 0.5 ? U.hora(t) : U.hora(t).replace(':00', 'h'), fmtTip: t => U.hora(t) + ' · ' + nombreDia(Math.floor(t / 24)) },
      y: { min: 0, max: Math.ceil(ymax / 10) * 10, fmt: v => v + ' %', titulo: '% de la primera vez' },
      series: [
        { tipo: 'division', x: v.t, y: Ep, base: Mp, arriba: COL.tealA, abajo: COL.coralA },
        { tipo: 'linea', x: v.t, y: Ep, color: COL.purple, ancho: 2, etiqueta: et.efecto, fmt: pct },
        { tipo: 'linea', x: v.t, y: Mp, color: COL.amber, ancho: 2.2, etiqueta: 'Contra-adaptación', fmt: pct },
        { tipo: 'marcas', x: v.dosis.map(x => x.t), color: COL.purple, alto: 7, anchoMarca: 1.5 }
      ],
      lineasY: [{ y: 0.001, color: COL.natural, texto: 'nivel natural', izq: true }]
    });
  }

  // ------------------------------------------------------------------ neuroquímica
  function secNeuro() {
    const s = E.sust, pro = E.modo === 'profesional';
    const fila = (n, i, grupo) => `<div class="barra-fila"><div class="barra-cab"><span>${n.dir ? `<span class="flecha" style="color:${n.dir === '+' ? COL.teal : COL.blue}">${n.dir === '+' ? '↑' : '↓'}</span>` : ''}${n.nombre} <span class="d">· ${n.rol}</span></span><b id="${grupo}-v${i}">—</b></div><div class="barra"><div id="${grupo}-b${i}" style="width:0;background:${grupo === 'nq' ? (n.fuente === 'malestar' ? COL.coral : s.color) : COL.purple}"></div></div>${pro && n.detalle ? `<div class="barra-det">${n.detalle}</div>` : ''}</div>`;
    const efecto = s.neuroquimicos.filter(n => n.fuente !== 'malestar');
    const mal = s.neuroquimicos.filter(n => n.fuente === 'malestar');
    const idx = n => s.neuroquimicos.indexOf(n);
    return sec('s-neuro', 'Neuroquímica del día seleccionado', gl(E.modo === 'basico' ? 'Barras de la izquierda: cuánto se notan los mensajeros químicos con cada dosis (100 % = la primera vez). Derecha: cómo ha cambiado el cerebro.' : 'Izquierda: cambio neto que se nota en cada sistema con una dosis ese día (100 % = primera vez; ↑ aumenta, ↓ disminuye). Abajo, los sistemas que se activan en la abstinencia. Derecha: adaptaciones del cerebro.'),
      `<div class="dos-col"><div><h3>Lo que notas con cada dosis</h3>${efecto.map(n => fila(n, idx(n), 'nq')).join('')}${mal.length ? `<h3 style="margin-top:14px">Lo que se activa sin la sustancia</h3>${mal.map(n => fila(n, idx(n), 'nq')).join('')}` : ''}</div>
       <div><h3>Cómo se adapta el cerebro</h3>${s.adaptaciones.map((a, i) => fila({ nombre: a.nombre, rol: a.rol, detalle: a.detalle }, i, 'ad')).join('')}</div></div>`);
  }
  function actualizarNeuro() {
    const s = E.sust; if (!$('#s-neuro')) return;
    const d = datosDia(E.dia);
    const neto = clamp(d.neto / 100, 0, 1), mal = clamp(d.mal / 100, 0, 1);
    s.neuroquimicos.forEach((n, i) => {
      const v = n.peso * (n.fuente === 'malestar' ? mal : neto);
      const b = $('#nq-b' + i), t = $('#nq-v' + i);
      if (b) b.style.width = (v * 100) + '%';
      if (t) t.textContent = pct(v * 100);
    });
    s.adaptaciones.forEach((a, i) => {
      const r = valorAdaptacion(a, d);
      const b = $('#ad-b' + i), t = $('#ad-v' + i);
      if (b) b.style.width = (r.barra * 100) + '%';
      if (t) t.textContent = r.texto;
    });
  }

  // ------------------------------------------------------------------ principiante
  function secQueEs() {
    const s = E.sust;
    return sec('s-quees', '¿Cómo actúa?', '', `<p>${gl(s.mecanismo.simple)}</p><p class="explica" style="margin:0">${gl(s.basico)}</p>`);
  }
  function secSinapsis() {
    const s = E.sust, sp = s.sinapsis;
    const vaso = sp.tipo === 'vaso';
    return sec('s-sinapsis', vaso ? 'Qué pasa en los vasos sanguíneos' : 'Qué pasa en la sinapsis', gl(vaso ? 'Animación simplificada del mecanismo.' : 'Animación simplificada de una [[sinapsis]]. Cambia el estado para ver la diferencia.'),
      `<div class="sinapsis-caja"><canvas id="cv-sinapsis" role="img" aria-label="Animación del mecanismo de ${s.nombre}"></canvas></div>
       <div class="sinapsis-pie">
         <div class="segmento" id="seg-sin"><button data-v="sin" class="on">Sin sustancia</button><button data-v="con">Con ${s.nombre.toLowerCase()}</button><button data-v="cronico">Uso crónico</button></div>
         <div class="medidor"><div class="barra-cab"><span>${sp.senal}</span><b id="sin-v">0 %</b></div><div class="barra"><div id="sin-b" style="width:0;background:${s.color}"></div></div></div>
       </div>
       ${leyenda(vaso ? [{ c: sp.droga.color, t: sp.droga.nombre }] : [{ c: sp.nt.color, t: sp.nt.nombre + ' (círculos)' }, { c: sp.droga.color, t: sp.droga.nombre + ' (rombos)' }])}
       <p class="sinapsis-texto" id="sin-txt">${gl(sp.textos.sin)}</p>`);
  }
  function secHistoria() {
    const s = E.sust;
    return sec('s-historia', 'La historia de la tolerancia, paso a paso', 'Cada paso mueve el simulador a un momento clave. Observa los gráficos mientras lees.',
      `<div class="historia"><div class="hist-cab"><span class="hist-n" id="hist-n"></span>
        <div class="btns"><button class="btn" id="hist-prev">← Anterior</button><button class="btn prim" id="hist-next">Siguiente →</button></div></div>
        <h3 id="hist-t"></h3><p id="hist-x" style="margin:0"></p>
        <div class="hist-puntos">${s.historia.map((h, i) => `<button data-i="${i}" aria-label="Paso ${i + 1}"></button>`).join('')}</div></div>`);
  }
  function pintarHistoria(aplicar) {
    const s = E.sust, i = E.hist, h = s.historia[i];
    $('#hist-n').textContent = `Paso ${i + 1} de ${s.historia.length}`;
    $('#hist-t').textContent = h.titulo;
    $('#hist-x').innerHTML = gl(h.texto);
    $$('.hist-puntos button').forEach((b, j) => b.classList.toggle('on', j === i));
    $('#hist-prev').disabled = i === 0;
    $('#hist-next').textContent = i === s.historia.length - 1 ? 'Volver al inicio ↺' : 'Siguiente →';
    if (!aplicar) return;
    const nuevo = cfgDesdePreset(s, s.historiaPreset, h.cfg);
    const cambia = JSON.stringify(nuevo) !== JSON.stringify(E.cfg);
    E.presetId = h.cfg ? null : s.historiaPreset;
    E.cfg = nuevo;
    E.dia = Math.min(h.dia, nuevo.horizonte - 1);
    pararPlay();
    renderPanel();
    if (cambia) resimular(); else actualizarDia();
  }
  function secViaje() {
    const s = E.sust;
    return sec('s-viaje', 'El viaje de una dosis', 'La primera sesión del escenario, sin tolerancia, dividida en fases.',
      `<div id="g-viaje"></div><div class="fases">${s.fases.map((f, i) => `<div class="fase" style="--c:${faseColor(i)}"><span class="t">${U.duracion(f.t0)} – ${U.duracion(f.t1)}</span><b>${f.nombre}</b>${f.texto}</div>`).join('')}</div>`);
  }
  function faseColor(i) { return ['#7F77DD', '#1D9E75', '#BA7517', '#D85A30', '#378ADD', '#D4537E'][i % 6]; }
  function dibujarViaje() {
    const g = E.graf.viaje; if (!g || !E.res) return;
    const r = E.res, s = E.sust;
    if (!r.ev.length) { g.set(null); return; }
    const t0 = r.ev[0].t - r.P.lag;
    const finFases = Math.max.apply(null, s.fases.map(f => f.t1));
    const ini = Math.max(0, t0 - finFases * 0.05), fin = t0 + finFases * 1.05;
    const v = M.ventana(r, ini, fin, 600);
    const A = r.A, n = v.t.length, Ep = new Float64Array(n);
    let ymax = 105;
    for (let i = 0; i < n; i++) { Ep[i] = v.E[i] / A * 100; ymax = Math.max(ymax, Ep[i] * 1.1); }
    g.set({
      x: { min: ini, max: fin, fmt: t => '+' + U.duracion(Math.max(0, t - t0)), fmtTip: t => 'Tras la dosis: ' + U.duracion(Math.max(0, t - t0)) },
      y: { min: 0, max: Math.ceil(ymax / 10) * 10, fmt: v => v + ' %' },
      bandasX: s.fases.map((f, i) => ({ x0: t0 + f.t0, x1: t0 + f.t1, color: faseColor(i) + '1F', texto: f.nombre })),
      series: [
        { tipo: 'area', x: v.t, y0: 0, y1: Ep, color: 'rgba(127,119,221,0.18)' },
        { tipo: 'linea', x: v.t, y: Ep, color: COL.purple, ancho: 2.2, etiqueta: s.etiquetas.efecto, fmt: pct },
        { tipo: 'marcas', x: v.dosis.map(x => x.t), color: COL.purple, alto: 7, anchoMarca: 1.5 }
      ]
    });
  }

  function secMitos() {
    const s = E.sust;
    return sec('s-mitos', 'Mitos y realidades', 'Toca cada tarjeta para descubrir la realidad.',
      `<div class="mitos">${s.mitos.map((m, i) => `<button class="mito" data-i="${i}"><span class="et">Mito</span><span class="cuerpo">${U.esc(m.mito)}</span><span class="pista">Toca para ver la realidad</span></button>`).join('')}</div>`);
  }
  function secRiesgos() {
    const r = E.sust.riesgos;
    const li = a => `<ul class="lista">${a.map(x => `<li>${gl(x)}</li>`).join('')}</ul>`;
    return sec('s-riesgos', 'Riesgos', '', `<div class="riesgos"><div><h3>A corto plazo</h3>${li(r.agudos)}</div><div><h3>A largo plazo</h3>${li(r.cronicos)}</div>
      <div class="caja-alarma"><h3>Señales de alarma</h3>${li(r.alarma)}</div></div>`);
  }
  function secAbstinencia() {
    const a = E.sust.abstinencia, pro = E.modo === 'profesional';
    return sec('s-abst', 'Abstinencia: qué pasa al dejarlo', '',
      `${a.peligrosa ? `<div class="alerta" style="margin-bottom:10px"><span class="ico">⚠</span><div><b>Puede ser peligrosa.</b> No dejarla de golpe tras un uso diario prolongado sin supervisión médica.</div></div>` : ''}
      <div class="linea-tiempo"><div><b>Empieza</b>${a.inicio}</div><div><b>Pico</b>${a.pico}</div><div><b>Duración</b>${a.duracion}</div></div>
      <div class="sintomas">${a.sintomas.map(x => `<span>${U.esc(x)}</span>`).join('')}</div>
      <p style="margin:0">${gl(a.texto)}</p>
      ${pro && E.sust.tratamiento ? `<p style="margin:10px 0 0"><b>Tratamiento.</b> ${gl(E.sust.tratamiento)}</p>` : ''}`);
  }
  function secInteracciones(simple) {
    const s = E.sust;
    const lista = simple ? s.interacciones.filter(i => i.gravedad === 'critica' || i.gravedad === 'alta').slice(0, 6) : s.interacciones;
    const nombres = { critica: 'Crítica', alta: 'Alta', moderada: 'Moderada', baja: 'Baja' };
    return sec('s-inter', simple ? 'Combinaciones peligrosas' : 'Interacciones', simple ? '' : 'Gravedad orientativa basada en la literatura y en las guías de reducción de riesgos.',
      `<div class="inter">${lista.map(i => `<div class="inter-item"><span class="grav ${i.gravedad}">${nombres[i.gravedad]}</span><div><b>${U.esc(i.con)}</b> — ${gl(i.efecto)}${simple ? '' : `<div class="mec">Mecanismo: ${gl(i.mecanismo)}</div>`}</div></div>`).join('')}</div>`);
  }

  // ------------------------------------------------------------------ profesional
  function secVariables() {
    const s = E.sust, it = [{ c: COL.purple, t: 'R · ' + s.tol.nombre, tipo: 'linea' }];
    if (s.tol2) it.push({ c: COL.blue, t: 'R₂ · ' + s.tol2.nombre, tipo: 'linea' });
    if (s.reserva) it.push({ c: COL.pink, t: 'S · ' + s.reserva.nombre, tipo: 'linea' });
    if ((s.oponentes || []).length) it.push({ c: COL.coral, t: 'ΣB · procesos oponentes (% del aporte)', tipo: 'linea' });
    it.push({ c: COL.natural, t: 'H · hábito', tipo: 'linea' });
    if (s.metabolica) it.push({ c: COL.green, t: 'Tolerancia metabólica (' + s.metabolica.nombre + ')', tipo: 'linea' });
    if (s.inhibicion) it.push({ c: COL.amber, t: s.inhibicion.nombre, tipo: 'linea' });
    return sec('s-vars', 'Variables de estado del modelo', 'Cada adaptación evoluciona con su propia constante de tiempo. R y S multiplican el efecto; los procesos oponentes B se restan; H es un índice acumulativo de aprendizaje.', leyenda(it) + `<div id="g-vars"></div>`);
  }
  function dibujarVariables() {
    const g = E.graf.vars; if (!g || !E.res) return;
    const r = E.res, s = E.sust, N = r.N, A = r.A;
    const xs = new Float64Array(N);
    for (let k = 0; k < N; k++) xs[k] = k / 24;
    const arr = f => { const a = new Float64Array(N); for (let k = 0; k < N; k++) a[k] = f(k); return a; };
    const series = [{ tipo: 'linea', x: xs, y: arr(k => r.h.R[k] * 100), color: COL.purple, ancho: 1.8, etiqueta: 'R', fmt: pct }];
    if (s.tol2) series.push({ tipo: 'linea', x: xs, y: arr(k => r.h.R2[k] * 100), color: COL.blue, ancho: 1.6, etiqueta: 'R₂', fmt: pct });
    if (s.reserva) series.push({ tipo: 'linea', x: xs, y: arr(k => r.h.S[k] * 100), color: COL.pink, ancho: 1.6, etiqueta: 'S', fmt: pct });
    if ((s.oponentes || []).length) series.push({ tipo: 'linea', x: xs, y: arr(k => r.h.B[k] / A * 100), color: COL.coral, ancho: 1.6, etiqueta: 'ΣB', fmt: pct });
    series.push({ tipo: 'linea', x: xs, y: arr(k => r.h.H[k] * 100), color: COL.natural, ancho: 1.4, etiqueta: 'H', fmt: pct });
    if (s.metabolica) series.push({ tipo: 'linea', x: xs, y: arr(k => r.h.Mt[k] / s.metabolica.max * 100), color: COL.green, ancho: 1.4, etiqueta: 'Metabólica', fmt: pct });
    if (s.inhibicion) series.push({ tipo: 'linea', x: xs, y: arr(k => r.h.I[k] * 100), color: COL.amber, ancho: 1.4, etiqueta: 'Inhibición CYP2D6', fmt: pct });
    let ymax = 105;
    series.forEach(se => { for (let k = 0; k < N; k += 6) if (se.y[k] > ymax) ymax = se.y[k]; });
    g.set({
      x: { min: 0, max: r.dias.length, fmt: fmtDia, ticks: ticksDias(r.dias.length), fmtTip: v => nombreDia(Math.floor(v)) + ' · ' + U.hora(v * 24) },
      y: { min: 0, max: Math.ceil(ymax / 10) * 10, fmt: v => v + ' %' },
      series, cursor: E.dia + 0.5,
      alClic: x => { pararPlay(); fijarDia(Math.floor(x)); }
    });
  }

  function secPK() {
    const s = E.sust, u = s.unidades;
    const extra = `<div class="controles-graf"><div class="segmento" id="seg-vent"><button data-v="dia" class="${E.vent === 'dia' ? 'on' : ''}">24 h</button><button data-v="zoom" class="${E.vent === 'zoom' ? 'on' : ''}">Sesión</button></div>
      <div class="segmento" id="seg-log"><button data-v="lin" class="${!E.log ? 'on' : ''}">Lineal</button><button data-v="log" class="${E.log ? 'on' : ''}">Log</button></div></div>`;
    return sec('s-pk', 'Farmacocinética del día seleccionado', gl(`${u.concNombre}. C: plasma; Ce: [[compartimento efecto|ke0]] (cerebro). Las bandas sombreadas son rangos de referencia de la literatura.`),
      leyenda([{ c: COL.blue, t: 'C plasma', tipo: 'linea' }, { c: COL.purple, t: 'Ce sitio efecto', tipo: 'linea' }]) + `<div id="g-conc"></div>`, extra);
  }
  function secEfectos() {
    const s = E.sust;
    const it = [{ c: COL.purple, t: 'E: efecto (con R y S)', tipo: 'linea' }, { c: COL.teal, t: 'Efecto percibido E − B', tipo: 'linea' }, { c: COL.amber, t: 'B: procesos oponentes', tipo: 'linea' }]
      .concat(s.canales.map(c => ({ c: c.color, t: c.nombre + (c.umbral != null ? ` (umbral ${c.umbral} %)` : ''), tipo: 'linea' })));
    return sec('s-efectos', 'Efectos y canales de riesgo', gl('Escala absoluta: % del [[Emax|emax]] del sistema. Los canales de riesgo usan su propia curva concentración-efecto y su propia tolerancia (o ninguna).'), leyenda(it) + `<div id="g-efectos"></div>`);
  }
  function dibujarPKyEfectos() {
    if (!E.res) return;
    const r = E.res, s = E.sust, u = s.unidades;
    const w = ventanaDia();
    const v = M.ventana(r, w.t0, w.t1, 720);
    const n = v.t.length;
    let cmax = 0, tmax = w.t0, auc = 0, ymaxC = 0;
    for (let i = 0; i < n; i++) {
      if (v.C[i] > cmax) { cmax = v.C[i]; tmax = v.t[i]; }
      if (i) auc += (v.C[i] + v.C[i - 1]) / 2 * (v.t[i] - v.t[i - 1]);
      ymaxC = Math.max(ymaxC, v.C[i], v.Ce[i]);
    }
    // AUC de 24 h exactas, independiente del zoom
    const w24 = ventanaDia('dia');
    if (E.vent !== 'dia') {
      const v24 = M.ventana(r, w24.t0, w24.t1, 480);
      auc = 0; cmax = 0;
      for (let i = 0; i < v24.t.length; i++) {
        if (v24.C[i] > cmax) { cmax = v24.C[i]; tmax = v24.t[i]; }
        if (i) auc += (v24.C[i] + v24.C[i - 1]) / 2 * (v24.t[i] - v24.t[i - 1]);
      }
    }
    E._diaPK = { cmax, tmax, auc };
    const span = w.t1 - w.t0;
    const xcfg = { min: w.t0, max: w.t1, fmt: t => span < 0.5 ? U.hora(t) : U.hora(t).replace(':00', 'h'), fmtTip: t => U.hora(t) + ' · ' + nombreDia(Math.floor(t / 24)) };
    if (E.graf.conc) {
      ymaxC = Math.max(ymaxC * 1.15, 1e-6);
      const ymin = E.log ? Math.max(ymaxC / 1e4, 1e-4) : 0;
      if (E.log) ymaxC *= 1.5;
      const fmtC = x => U.num(x) + ' ' + u.conc;
      E.graf.conc.set({
        x: xcfg,
        y: { min: ymin, max: ymaxC, log: E.log, titulo: u.conc },
        bandasY: (s.bandasConc || []).filter(b => b.desde < ymaxC && b.hasta > ymin).map(b => ({ y0: b.desde, y1: b.hasta, color: NIVEL_BANDA[b.nivel] || NIVEL_BANDA.info, texto: b.texto })),
        series: [
          { tipo: 'linea', x: v.t, y: v.C, color: COL.blue, ancho: 2, etiqueta: 'C plasma', fmt: fmtC },
          { tipo: 'linea', x: v.t, y: v.Ce, color: COL.purple, ancho: 2, guion: [5, 3], etiqueta: 'Ce sitio efecto', fmt: fmtC },
          { tipo: 'marcas', x: v.dosis.map(x => x.t), color: COL.blue, alto: 7, anchoMarca: 1.5 }
        ]
      });
    }
    if (E.graf.ef) {
      const Bv = v.mal;
      let ymin = 0;
      for (let i = 0; i < n; i++) ymin = Math.min(ymin, v.sentido[i]);
      const series = [
        { tipo: 'linea', x: v.t, y: v.E, color: COL.purple, ancho: 2, etiqueta: 'E', fmt: pct },
        { tipo: 'linea', x: v.t, y: v.sentido, color: COL.teal, ancho: 2, etiqueta: 'E − B', fmt: pct },
        { tipo: 'linea', x: v.t, y: Bv, color: COL.amber, ancho: 1.6, etiqueta: 'B', fmt: pct }
      ];
      const lineas = [{ y: 0.001, color: COL.natural, texto: 'nivel natural', izq: true }];
      r.P.canales.forEach((c, i) => {
        series.push({ tipo: 'linea', x: v.t, y: v.canales[i], color: c.color, ancho: 1.6, guion: c.umbral != null ? [] : [2, 2], etiqueta: c.nombre, fmt: pct });
        if (c.umbral != null) lineas.push({ y: c.umbral, color: c.color, texto: 'umbral de riesgo: ' + c.nombre.toLowerCase() });
      });
      E.graf.ef.set({
        x: xcfg, y: { min: Math.floor(ymin / 10) * 10, max: 105, fmt: x => x + ' %', titulo: '% de Emax' },
        series, lineasY: lineas
      });
    }
    if (E.graf.hist) dibujarHisteresis();
    actualizarMetricas();
  }

  function secDR() {
    return sec('s-dr', 'Curva dosis-respuesta: sin tolerancia frente al día seleccionado', gl('Pico de efecto de <b>una sola dosis</b> según la cantidad. La [[tolerancia]] desplaza la curva hacia la derecha (y hacia abajo si hay procesos oponentes). En rojo, el canal de riesgo: si su tolerancia es menor o se pierde antes, el margen de seguridad se estrecha.'),
      leyenda([{ c: COL.purple, t: 'Efecto principal · día seleccionado', tipo: 'linea' }, { c: COL.purple, t: 'Efecto principal · sin tolerancia', tipo: 'guion' }, { c: COL.red, t: 'Canal de riesgo · día seleccionado', tipo: 'linea' }, { c: COL.red, t: 'Canal de riesgo · sin tolerancia', tipo: 'guion' }]) +
      `<div id="g-dr"></div><p class="margen" id="dr-txt"></p>`);
  }
  function dibujarDR() {
    const g = E.graf.dr; if (!g || !E.res) return;
    const r = E.res, s = E.sust, cfg = E.cfg;
    const dr = M.dosisRespuesta(r, E.dia, 40);
    const series = [
      { tipo: 'linea', x: dr.dosis, y: dr.naive, color: COL.purple, ancho: 1.6, guion: [5, 4], etiqueta: 'Sin tolerancia', fmt: pct },
      { tipo: 'linea', x: dr.dosis, y: dr.actual, color: COL.purple, ancho: 2.4, etiqueta: 'Día seleccionado', fmt: pct }
    ];
    const lineasY = [{ y: 0.001, color: COL.natural, texto: 'nivel natural', izq: true }];
    const ip = dr.indicePeligro;
    let txt = '';
    if (ip >= 0) {
      const c = r.P.canales[ip];
      series.push({ tipo: 'linea', x: dr.dosis, y: dr.canalesNaive[ip], color: COL.red, ancho: 1.4, guion: [5, 4], etiqueta: c.nombre + ' (sin tol.)', fmt: pct });
      series.push({ tipo: 'linea', x: dr.dosis, y: dr.canalesActual[ip], color: COL.red, ancho: 2.2, etiqueta: c.nombre, fmt: pct });
      lineasY.push({ y: c.umbral, color: COL.red, texto: 'umbral de riesgo' });
      const fd = v => v == null ? 'no se alcanza en el rango simulado' : fmtDosis(v);
      txt = `Canal de riesgo: <b>${c.nombre}</b>. Dosis única que alcanza el umbral: sin tolerancia <b>${fd(dr.umbralNaive)}</b>; en el día seleccionado <b>${fd(dr.umbralActual)}</b>. `;
      if (dr.margenActual != null) txt += `Margen frente a la dosis actual (${fmtDosis(cfg.dosis)}): <b style="color:${dr.margenActual < 1 ? 'var(--peligro)' : dr.margenActual < 2 ? 'var(--aviso)' : 'var(--ok)'}">×${U.num(dr.margenActual, 2)}</b>${dr.margenActual < 1 ? ' — <b>la dosis actual supera el umbral</b>.' : '.'}`;
      else txt += 'La dosis actual queda muy lejos del umbral en el estado de ese día.';
      if (s.id === 'benzodiacepinas') txt += ' Solas, las benzodiacepinas tienen efecto techo sobre la respiración; combinadas con alcohol u opioides, no.';
      const el = $('#m-margen');
      if (el) {
        $('.v', el).textContent = dr.margenActual != null ? '×' + U.num(dr.margenActual, 2) : '> ×' + U.num(s.limites.dosis[1] * 2.5 / cfg.dosis, 0);
        el.classList.remove('ok', 'aviso', 'peligro');
        el.classList.add(dr.margenActual == null || dr.margenActual >= 2 ? 'ok' : dr.margenActual >= 1 ? 'aviso' : 'peligro');
      }
    } else txt = 'Esta sustancia no tiene definido un canal de riesgo agudo con umbral en el modelo.';
    $('#dr-txt').innerHTML = txt;
    let ymin = 0;
    dr.actual.forEach(v => { if (v < ymin) ymin = v; });
    g.set({
      x: { min: dr.dosis[0], max: dr.dosis[dr.dosis.length - 1], log: true, fmt: v => U.num(v, v < 1 ? 2 : 0), fmtTip: v => 'Dosis: ' + fmtDosis(v), titulo: 'Dosis única (' + s.unidades.dosis + ', escala logarítmica)' },
      y: { min: Math.floor(ymin / 10) * 10, max: 105, fmt: v => v + ' %', titulo: '% de Emax' },
      series, lineasY,
      lineasX: [{ x: cfg.dosis, color: COL.natural, texto: 'dosis actual' }]
    });
  }

  function secHisteresis() {
    return sec('s-hist', 'Histéresis concentración-efecto', gl('Efecto frente a concentración plasmática durante la sesión del día seleccionado. Un bucle antihorario indica retraso de distribución al cerebro ([[ke0]]); uno horario, [[tolerancia]] aguda dentro de la sesión. Ver [[histéresis|histeresis]].'),
      leyenda([{ c: COL.purple, t: 'E frente a C (plasma)', tipo: 'linea' }, { c: COL.teal, t: 'E frente a Ce (sitio efecto)', tipo: 'guion' }]) + `<div id="g-hist"></div>`);
  }
  function dibujarHisteresis() {
    const g = E.graf.hist; if (!g || !E.res) return;
    const r = E.res, s = E.sust;
    const w = ventanaDia('zoom');
    const v = M.ventana(r, w.t0, w.t1, 500);
    let xmax = 0;
    for (let i = 0; i < v.t.length; i++) xmax = Math.max(xmax, v.C[i], v.Ce[i]);
    if (!(xmax > 0)) { g.set({ x: { min: 0, max: 1 }, y: { min: 0, max: 100 }, series: [] }); return; }
    g.set({
      x: { min: 0, max: xmax * 1.05, titulo: s.unidades.concNombre + ' (' + s.unidades.conc + ')' },
      y: { min: Math.min(0, Math.min.apply(null, Array.from(v.E))), max: 105, fmt: x => x + ' %', titulo: '% de Emax' },
      series: [
        { tipo: 'trayectoria', x: v.Ce, y: v.E, color: COL.teal, ancho: 1.4, guion: [4, 3] },
        { tipo: 'trayectoria', x: v.C, y: v.E, color: COL.purple, ancho: 2, flechas: 6 }
      ],
      tip: false
    });
  }

  function secTablas() {
    const s = E.sust, r = E.res;
    const filas = s.farmaco.tabla.map(([k, v]) => `<tr><td>${k}</td><td>${gl(v)}</td></tr>`).join('');
    return sec('s-tablas', 'Farmacología', 'Valores de la literatura (rangos habituales en adultos sanos).',
      `<div class="desplaza"><table class="tabla-datos"><tbody>${filas}</tbody></table></div>
       <h3 style="margin-top:16px">Metabolismo</h3><p class="metab">${s.farmaco.metabolismo}</p>
       <h3 style="margin-top:16px">Parámetros usados por el modelo</h3><div class="desplaza" id="tabla-modelo"></div>`);
  }
  function tablaModelo() {
    const el = $('#tabla-modelo'); if (!el || !E.res) return;
    const P = E.res.P, s = E.sust, pk = P.pk, pd = P.pd, u = s.unidades;
    const h = (t) => U.duracion(t);
    const rows = [];
    rows.push(['Forma / vía', P.forma.nombre]);
    rows.push(['Biodisponibilidad F', U.num(pk.F * 100, 0) + ' %']);
    if (P.infusion) rows.push(['Liberación', `Orden cero durante ${h(P.infusion)}`]);
    else rows.push(['Absorción ka', `${U.num(pk.ka)} h⁻¹ (t½ abs ${h(Math.LN2 / pk.ka)})${pk.lag ? ', latencia ' + h(pk.lag) : ''}`]);
    if (pk.mm) rows.push(['Eliminación', `Michaelis-Menten: Vmax ${U.num(pk.mm.Vmax)} ${u.conc}/h, Km ${U.num(pk.mm.Km)} ${u.conc}`]);
    else if (pk.Vp != null) rows.push(['Bicompartimental', `Vc ${pk.Vc} L/kg · Vp ${pk.Vp} L/kg · Q ${pk.Q} L/h/kg · CL ${pk.CL} L/h/kg`]);
    else rows.push(['Vida media de eliminación', h(pk.t12)]);
    rows.push(['Volumen de distribución', (P.VdKg != null ? U.num(P.VdKg, 2) + ' L/kg' : '') + ` (${U.num(P.Vc, 0)} L para ${E.cfg.peso} kg)`]);
    rows.push(['Compartimento efecto ke0', `${U.num(pk.ke0)} h⁻¹ (t½ de equilibrio ${h(Math.LN2 / pk.ke0)})`]);
    rows.push(['EC50 · n (efecto principal)', `${U.num(pd.ec50)} ${u.conc} · n = ${pd.n}${pd.potencia && pd.potencia !== 1 ? ` · potencia relativa ×${pd.potencia} (metabolito activo)` : ''}`]);
    if (pd.aversion) rows.push(['Componente aversivo', `EC50 ${pd.aversion.ec50} ${u.conc}, n ${pd.aversion.n}, Emax ${pd.aversion.emax}`]);
    const tol = (T, nom) => rows.push([nom + ' · ' + T.nombre, `kdes ${T.kdes} h⁻¹·f · recuperación t½ ${h(Math.LN2 / T.krec)} · Rmin ${Math.round(T.rmin * 100)} %`]);
    if (s.tol) tol(s.tol, 'R');
    if (s.tol2) tol(s.tol2, 'R₂');
    if (s.reserva) rows.push(['S · ' + s.reserva.nombre, `kdep ${s.reserva.kdep} h⁻¹·f · reposición t½ ${h(Math.LN2 / s.reserva.krep)} · bajón ${s.reserva.crash}·(1 − S)`]);
    (s.oponentes || []).forEach((o, i) => rows.push([`B${i + 1} · ${o.nombre}`, `γ = ${o.gamma} · τ = ${h(o.tau)}`]));
    if (s.metabolica) rows.push(['Tolerancia metabólica', `hasta +${Math.round(s.metabolica.max * 100)} % de Vmax · subida ${s.metabolica.kup} h⁻¹·f · bajada t½ ${h(Math.LN2 / s.metabolica.kdown)}`]);
    if (s.inhibicion) rows.push(['Autoinhibición metabólica', `kinact ${s.inhibicion.kinact} h⁻¹ · KI ${s.inhibicion.KI} ${u.conc} · recuperación t½ ${h(Math.LN2 / s.inhibicion.kdeg)} · máx. −${Math.round(s.inhibicion.imax * 100)} % de CL`]);
    rows.push(['Hábito H', `+${s.habito.k}·(1 − H) por dosis · olvido t½ ${s.habito.vida} días`]);
    rows.push(['Aporte de referencia (100 %)', `${U.num(E.res.A, 1)} % de Emax`]);
    el.innerHTML = `<table class="tabla-datos"><tbody>${rows.map(([k, v]) => `<tr><td>${k}</td><td class="num">${v}</td></tr>`).join('')}</tbody></table>`;
  }
  function secAfinidad() {
    const s = E.sust;
    return sec('s-afin', 'Perfil de dianas', 'Afinidad orientativa (orden de magnitud; los valores de Ki varían según el ensayo y la especie).',
      `<div class="afinidad">${s.farmaco.afinidad.map(a => `<div class="barra-fila"><div class="barra-cab"><span>${a.diana} <span class="d">· ${a.accion}</span></span><b>${a.ki}</b></div><div class="barra"><div style="width:${a.nivel * 20}%;background:${s.color}"></div></div></div>`).join('')}</div>`);
  }
  function secModelo() {
    const eq = [
      'Farmacocinética',
      '  dA_g/dt = −ka·A_g                         (depósito; o infusión de orden cero)',
      '  dA_c/dt = F·ka·A_g − k10·A_c − k12·A_c + k21·A_p',
      '  dA_p/dt = k12·A_c − k21·A_p                (solo si es bicompartimental)',
      '  etanol:  dC/dt = entrada − Vmax·(1 + Mt)·C/(Km + C)',
      '  dCe/dt  = ke0·(C − Ce)                     (compartimento efecto)',
      '',
      'Farmacodinamia',
      '  f = (pot·Ce)ⁿ / (EC50ⁿ + (pot·Ce)ⁿ)         (Hill, sin tolerancia)',
      '  E = Emax·f·R·S − aversión(Ce)',
      '  dR/dt = −kdes·f·(R − Rmin) + krec·(1 − R)   (desensibilización / downregulation)',
      '  dS/dt = −kdep·f·S + krep·(1 − S)            (reservas de neurotransmisor)',
      '  dB_i/dt = (γ_i·E − B_i)/τ_i                  (procesos oponentes, alostasis)',
      '  Efecto percibido = E − ΣB − bajón,   bajón = c·(1 − S)·100',
      '',
      'Lo que muestran las gráficas',
      '  Aporte A = pico de E de la pauta sin ninguna adaptación (= 100 %)',
      '  Costumbre = A·(1 − R·S) + ΣB + bajón',
      '  Efecto neto = A − Costumbre;   Malestar = ΣB + bajón (cuando no hay sustancia)'
    ].join('\n');
    return sec('s-modelo', 'Modelo y limitaciones', '',
      `<div class="formula-bloque">${U.esc(eq)}</div>
      <ul class="lista" style="margin-top:12px">
        <li>Integración numérica con paso adaptativo (≈4 s – 3 min durante las sesiones, 30 min sin sustancia) y solución exacta de las ecuaciones lineales en cada paso.</li>
        <li>La farmacocinética usa parámetros medios de adultos sanos tomados de la bibliografía citada; la variabilidad entre personas (genética de CYP, edad, enfermedad, tolerancia previa) es grande.</li>
        <li>Las constantes farmacodinámicas (EC50 subjetivas, kdes, krec, γ, τ) son calibraciones para reproducir los cursos temporales descritos en la literatura (por ejemplo, tolerancia a psicodélicos en 3–4 días, normalización de α4β2 en 6–12 semanas, abstinencia de cafeína en 20–51 h), no ajustes a datos individuales.</li>
        <li>Los canales de riesgo y sus umbrales son ilustrativos: sirven para entender márgenes relativos (por ejemplo, la pérdida de tolerancia respiratoria a opioides), no para calcular dosis seguras.</li>
        <li>No se modelan el contexto, las expectativas, la combinación de sustancias, la sensibilización ni el aprendizaje asociativo más allá de un índice simple de hábito.</li>
      </ul>`);
  }
  function secReferencias() {
    const s = E.sust;
    const comunes = [
      'Solomon RL, Corbit JD. An opponent-process theory of motivation. Psychol Rev. 1974;81(2):119-145.',
      'Koob GF, Le Moal M. Drug addiction, dysregulation of reward, and allostasis. Neuropsychopharmacology. 2001;24(2):97-129.',
      'Sheiner LB et al. Simultaneous modeling of pharmacokinetics and pharmacodynamics: application to d-tubocurarine. Clin Pharmacol Ther. 1979;25(3):358-371.',
      'Gabrielsson J, Weiner D. Pharmacokinetic and Pharmacodynamic Data Analysis: Concepts and Applications. 5.ª ed. 2016.'
    ];
    return sec('s-refs', 'Referencias', '', `<ol class="refs">${s.referencias.concat(comunes.filter(c => !s.referencias.some(r => r.slice(0, 20) === c.slice(0, 20)))).map(x => `<li>${U.esc(x)}</li>`).join('')}</ol>`);
  }

  // ------------------------------------------------------------------ montaje de gráficos y eventos
  function montar() {
    const mk = (id, alto, key) => { const el = $('#' + id); if (el) E.graf[key] = new G(el, { alto }); };
    mk('g-largo', E.modo === 'profesional' ? 320 : 300, 'largo');
    mk('g-vars', 240, 'vars');
    mk('g-dia', 260, 'dia');
    mk('g-viaje', 220, 'viaje');
    mk('g-conc', 260, 'conc');
    mk('g-efectos', 260, 'ef');
    mk('g-dr', 280, 'dr');
    mk('g-hist', 280, 'hist');
    const segs = (id, fn) => { const el = $('#' + id); if (!el) return; $$('button', el).forEach(b => b.addEventListener('click', () => { $$('button', el).forEach(x => x.classList.toggle('on', x === b)); fn(b.dataset.v); })); };
    segs('seg-vent', v => { E.vent = v; actualizarDiaAhora(); });
    segs('seg-log', v => { E.log = v === 'log'; dibujarPKyEfectos(); });
    segs('seg-resol', v => { E.resol = v; dibujarLargo(); });
    // Sinapsis
    const cv = $('#cv-sinapsis');
    if (cv) {
      E.sin = new NT.Sinapsis(cv, E.sust, val => {
        const b = $('#sin-b'), t = $('#sin-v');
        if (b) b.style.width = clamp(val / 1.4, 0, 1) * 100 + '%';
        if (t) t.textContent = Math.round(clamp(val / 1.4, 0, 1) * 100) + ' %';
      });
      segs('seg-sin', v => { E.sin.setEstado(v); $('#sin-txt').innerHTML = gl(E.sust.sinapsis.textos[v]); });
    }
    // Historia
    if ($('#s-historia')) {
      pintarHistoria(false);
      $('#hist-prev').addEventListener('click', () => { if (E.hist > 0) { E.hist--; pintarHistoria(true); } });
      $('#hist-next').addEventListener('click', () => { E.hist = (E.hist + 1) % E.sust.historia.length; pintarHistoria(true); });
      $$('.hist-puntos button').forEach(b => b.addEventListener('click', () => { E.hist = +b.dataset.i; pintarHistoria(true); }));
    }
    // Mitos
    $$('.mito').forEach(b => b.addEventListener('click', () => {
      const m = E.sust.mitos[+b.dataset.i];
      const girado = b.classList.toggle('girado');
      $('.et', b).textContent = girado ? 'Realidad' : 'Mito';
      $('.cuerpo', b).textContent = girado ? m.realidad : m.mito;
      $('.pista', b).textContent = girado ? 'Toca para volver al mito' : 'Toca para ver la realidad';
    }));
  }

  // ------------------------------------------------------------------ comparar
  function renderComparar() {
    destruir();
    const conNutt = SUS.filter(s => s.nutt != null).sort((a, b) => b.nutt - a.nutt);
    const sinNutt = SUS.filter(s => s.nutt == null);
    const m = E.modo;
    const nuttHTML = conNutt.map(s => `<div class="nutt-fila"><span>${s.nuttNombre || s.nombre}</span><div class="barra"><div style="width:${s.nutt / 72 * 100}%;background:${s.color}"></div></div><b>${s.nutt}</b></div>`).join('') +
      sinNutt.map(s => `<div class="nutt-fila"><span>${s.nombre}</span><span class="d" style="font-size:12px;color:var(--texto-3)">no evaluada en el estudio</span><b>—</b></div>`).join('');
    const filas = SUS.map(s => `<tr data-id="${s.id}"><td><b style="color:${s.color}">${s.simbolo}</b> ${s.nombre}</td><td>${NT.CATEGORIAS[s.categoria].nombre}</td><td>${s.ficha.vidaMedia}</td><td>${s.ficha.duracion}</td>
      <td class="c-tol">…</td><td class="c-rec">…</td><td>${puntos(s.escalas.dependencia, 5, s.color)}</td><td>${puntos(s.escalas.abstinencia, 5, s.color)}${s.abstinencia.peligrosa ? ' ⚠' : ''}</td><td>${puntos(s.escalas.toxicidad, 5, s.color)}</td></tr>`).join('');
    $('#vista').innerHTML = `<section class="hero" style="--c:var(--texto-2)"><div class="hero-tile"><span class="n">∑</span><span class="sim">⇄</span><span class="nm">Comparar</span></div>
      <div><h1>Las 11 sustancias, cara a cara</h1><p class="sub">Velocidad de la tolerancia, abstinencia y daño</p>
      <p class="resumen">${gl(m === 'basico' ? 'Cada sustancia se simula con un consumo diario durante 90 días y después se deja. Así se ve qué sustancias «se comen» antes su propio efecto y cuáles dejan más malestar al dejarlas.' : 'Simulación de un uso diario de 90 días (escenario diario de cada sustancia) y abandono el día 90. Arriba, el efecto neto antes de cada sesión; abajo, el malestar ([[proceso oponente]] + bajón) tras dejarlo. Los psicodélicos se simulan a diario solo para ilustrar su [[tolerancia]] extrema.')}</p></div></section>
      <div class="contenido">
        ${sec('c-sim', 'Efecto neto con uso diario', 'Haz clic en una sustancia de la leyenda para ocultarla o mostrarla.', `<div class="leyenda" id="c-ley"></div><div id="g-comp1"></div><p class="progreso" id="c-prog">Simulando…</p>`)}
        ${sec('c-sim2', 'Malestar tras dejarlo (día 90)', 'Malestar sin la sustancia, en % del efecto de la primera vez. Las sustancias sin abstinencia física quedan en cero aunque tengan tolerancia.', `<div id="g-comp2"></div>`)}
        ${sec('c-tabla', 'Ficha comparativa', 'Tolerancia: días de uso diario hasta que el efecto neto cae por debajo del 50 %. Recuperación: días tras dejarlo hasta que la costumbre baja del 10 %. Puntos: escalas orientativas de 1 a 5.',
          `<div class="desplaza"><table class="tabla-datos"><thead><tr><th>Sustancia</th><th>Tipo</th><th>Vida media</th><th>Duración</th><th>Tolerancia (efecto &lt; 50 %)</th><th>Recuperación</th><th>Dependencia</th><th>Abstinencia</th><th>Toxicidad aguda</th></tr></thead><tbody>${filas}</tbody></table></div>`)}
        ${sec('c-nutt', 'Daño total según expertos (Nutt et al., 2010)', 'Análisis de decisión multicriterio del Independent Scientific Committee on Drugs (Reino Unido): 16 criterios de daño a la persona y a terceros, escala 0–100. Cafeína y popper no se evaluaron.', nuttHTML)}
      </div>`;
    montarComparar();
  }
  function montarComparar() {
    E.graf.c1 = new G($('#g-comp1'), { alto: 320 });
    E.graf.c2 = new G($('#g-comp2'), { alto: 260 });
    if (E.comp) { pintarComparar(); return; }
    const res = {};
    let i = 0;
    const siguiente = () => {
      if (E.vista !== 'comparar') return;
      if (i >= SUS.length) { E.comp = res; pintarComparar(); return; }
      const s = SUS[i++];
      const p = s.presets.find(x => x.cfg.frecuencia === 'diario' && x.cfg.dejar == null) || s.presets.find(x => x.cfg.frecuencia === 'diario') || s.presets[0];
      const cfg = Object.assign({ forma: s.formas[0].id, dosis: 1, porSesion: 1, intervalo: 1, inicio: 9, gradual: 0, reanudar: null, peso: 70, sexo: 'h' }, p.cfg, { frecuencia: 'diario', horizonte: 130, dejar: 90, reanudar: null, gradual: 0 });
      const r = M.simular(s, cfg);
      const D = r.dias, A = r.A;
      const neto = D.map(d => 100 - d.costIni / A * 100);
      const mal = D.map(d => d.malIni / A * 100);
      let tol = null;
      for (let d = 0; d < 90; d++) if (neto[d] < 50) { tol = d; break; }
      let rec = null;
      for (let d = 90; d < D.length; d++) if (D[d].costIni / A * 100 < 10) { rec = d - 90; break; }
      res[s.id] = { neto, mal, tol, rec, preset: p.nombre };
      const pr = $('#c-prog'); if (pr) pr.textContent = `Simulando ${i}/${SUS.length}: ${s.nombre}…`;
      setTimeout(siguiente, 0);
    };
    setTimeout(siguiente, 30);
  }
  function pintarComparar() {
    const res = E.comp;
    const pr = $('#c-prog'); if (pr) pr.textContent = 'Escenario diario usado para cada sustancia: ' + SUS.map(s => `${s.nombre} (${res[s.id].preset})`).join(' · ');
    $('#c-ley').innerHTML = SUS.map(s => `<span class="ley btn-ley${E.compOcultas.has(s.id) ? ' apagada' : ''}" data-id="${s.id}"><i class="linea" style="background:${s.color}"></i>${s.nombre}</span>`).join('');
    $$('#c-ley .btn-ley').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.id;
      if (E.compOcultas.has(id)) E.compOcultas.delete(id); else E.compOcultas.add(id);
      pintarComparar();
    }));
    const vis = SUS.filter(s => !E.compOcultas.has(s.id));
    const xs1 = Array.from({ length: 90 }, (_, d) => d);
    let ymin = 0;
    vis.forEach(s => res[s.id].neto.slice(0, 90).forEach(v => { if (v < ymin) ymin = v; }));
    E.graf.c1.set({
      x: { min: 0, max: 89, fmt: v => 'd' + v, fmtTip: v => 'Día ' + Math.round(v) },
      y: { min: Math.floor(ymin / 20) * 20, max: 105, fmt: v => v + ' %', titulo: 'Efecto neto antes de la sesión' },
      series: vis.map(s => ({ tipo: 'linea', x: xs1, y: res[s.id].neto.slice(0, 90), color: s.color, ancho: 2, etiqueta: s.nombre, fmt: pct })),
      lineasY: [{ y: 50, color: COL.natural, texto: '50 %' }]
    });
    const xs2 = Array.from({ length: 40 }, (_, d) => 90 + d);
    let ymax = 20;
    vis.forEach(s => res[s.id].mal.slice(90).forEach(v => { if (v > ymax) ymax = v; }));
    E.graf.c2.set({
      x: { min: 90, max: 129, fmt: v => '+' + (v - 90) + ' d', fmtTip: v => (Math.round(v) - 90) + ' días sin consumo' },
      y: { min: 0, max: Math.ceil(ymax / 10) * 10 + 5, fmt: v => v + ' %', titulo: 'Malestar sin la sustancia' },
      series: vis.map(s => ({ tipo: 'linea', x: xs2, y: res[s.id].mal.slice(90, 130), color: s.color, ancho: 2, etiqueta: s.nombre, fmt: pct }))
    });
    SUS.forEach(s => {
      const tr = $(`tr[data-id="${s.id}"]`); if (!tr) return;
      const r = res[s.id];
      $('.c-tol', tr).textContent = r.tol == null ? 'no baja del 50 % en 90 días' : r.tol === 0 ? 'desde el primer día' : `${r.tol} día${r.tol === 1 ? '' : 's'}`;
      $('.c-rec', tr).textContent = r.rec == null ? '> 40 días' : r.rec === 0 ? 'inmediata' : `${r.rec} día${r.rec === 1 ? '' : 's'}`;
    });
  }

  // ------------------------------------------------------------------ arranque
  function iniciar() {
    renderTabla();
    initGlosario();
    $$('.modos button').forEach(b => b.addEventListener('click', () => {
      const id = E.vista === 'comparar' ? 'comparar' : (E.sust ? E.sust.id : SUS[0].id);
      irA(id, b.dataset.modo);
    }));
    let tema = 'auto';
    try { tema = localStorage.getItem('nt-tema') || 'auto'; } catch (e) { /* nada */ }
    if (!TEMAS.includes(tema)) tema = 'auto';
    aplicarTema(tema);
    $('#btn-tema').addEventListener('click', () => {
      let t = 'auto';
      try { t = localStorage.getItem('nt-tema') || 'auto'; } catch (e) { /* nada */ }
      aplicarTema(TEMAS[(TEMAS.indexOf(t) + 1) % TEMAS.length]);
    });
    try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', redibujarTodo); } catch (e) { /* nada */ }
    window.addEventListener('hashchange', aplicarRuta);
    aplicarRuta();
  }
  iniciar();
})();
