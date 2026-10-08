/* Núcleo: registro de sustancias, categorías y utilidades compartidas. */
window.NT = (function () {
  'use strict';
  const sustancias = [];

  const CATEGORIAS = {
    estimulante:   { nombre: 'Estimulante',            color: '#BA7517' },
    psicodelico:   { nombre: 'Psicodélico',            color: '#7F77DD' },
    depresor:      { nombre: 'Depresor del SNC',       color: '#378ADD' },
    cannabinoide:  { nombre: 'Cannabinoide',           color: '#639922' },
    empatogeno:    { nombre: 'Empatógeno',             color: '#D4537E' },
    opioide:       { nombre: 'Opioide',                color: '#E24B4A' },
    vasodilatador: { nombre: 'Vasodilatador inhalado', color: '#1D9E75' }
  };

  function registrar(s) { sustancias.push(s); }
  function buscar(id) { return sustancias.find(s => s.id === id); }

  const util = {
    clamp: (x, a, b) => Math.max(a, Math.min(b, x)),
    esc: t => String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
    num(v, dec) {
      if (v == null || !isFinite(v)) return '—';
      if (dec == null) {
        const a = Math.abs(v);
        dec = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : a >= 0.1 ? 2 : 3;
      }
      return v.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    },
    hora(t) {
      const m = Math.round(((t % 24) + 24) % 24 * 60) % 1440;
      return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
    },
    duracion(h) {
      if (h < 1 / 60) return Math.round(h * 3600) + ' s';
      if (h < 1) return Math.round(h * 60) + ' min';
      if (h < 48) return util.num(h, h < 10 ? 1 : 0) + ' h';
      return util.num(h / 24, 1) + ' días';
    }
  };

  return { sustancias, CATEGORIAS, registrar, buscar, util, glosario: {} };
})();
