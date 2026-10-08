NT.registrar({
  id: 'mdma', numero: 8, simbolo: 'Md', nombre: 'MDMA', color: '#D4537E',
  subtitulo: '3,4-metilendioximetanfetamina (éxtasis, cristal, «M»)',
  categoria: 'empatogeno', formula: 'C₁₁H₁₅NO₂', masaMolar: 193.25,
  ficha: { vidaMedia: '≈7–9 h (no lineal)', duracion: '3–6 h', inicio: '30–60 min' },
  etiquetas: {
    efecto: 'Euforia / empatía', neto: 'Efecto neto', malestar: 'Bajón (serotonina agotada)',
    aporte: 'Lo que aporta una sesión la primera vez', costumbre: 'Línea de costumbre', tolerancia: 'Reservas y transportadores reducidos'
  },
  resumen: {
    basico: 'La MDMA vacía de golpe los almacenes de serotonina de las neuronas. La euforia dura unas horas, pero las reservas tardan días en recuperarse: por eso llega el bajón de mitad de semana. Si se repite cada fin de semana, las reservas no se llenan y el efecto es cada vez menor.',
    principiante: 'La MDMA entra en las neuronas de [[serotonina]] a través de su propio [[transportador]] y hace que funcione al revés: en vez de recoger serotonina, la expulsa en masa ([[liberador]]). También libera [[noradrenalina]] y algo de [[dopamina]], y aumenta la oxitocina. El resultado son horas de euforia, energía y sensación de cercanía con los demás. Pero esa serotonina no se repone en horas: las neuronas tardan días en volver a fabricarla, porque la MDMA también daña temporalmente la enzima que la produce. De ahí el bajón de los días siguientes y la pérdida de «magia» si se toma con frecuencia. Los mayores peligros agudos son el golpe de calor, la [[hiponatremia]] y el [[síndrome serotoninérgico|sindrome serotoninergico]].',
    pro: 'Sustrato de SERT > NET > DAT. Entra por el transportador, interacciona con VMAT2 y TAAR1, y provoca eflujo no vesicular de 5-HT (y NA y DA) por inversión del transportador. Agonista débil de 5-HT2A/2B y α2. Aumenta oxitocina, vasopresina (ADH), cortisol y prolactina. Inhibe de forma irreversible (por mecanismo) CYP2D6, su principal enzima, lo que produce una farmacocinética no lineal: dosis mayores o repetidas producen concentraciones desproporcionadamente altas. La depleción aguda de 5-HT y la inactivación oxidativa de la triptófano hidroxilasa explican el bajón subagudo; el uso intenso y repetido se asocia a reducción de la unión a SERT en PET, parcialmente reversible con la abstinencia.'
  },
  basico: 'Línea morada: lo que aporta una sesión la primera vez (100 %). Línea ámbar: la costumbre, que aquí es sobre todo «depósito vacío»: tras cada toma las reservas de serotonina tardan días en recuperarse (naranja: bajón).',
  mecanismo: {
    simple: 'Invierte el transportador de serotonina: en lugar de recoger serotonina, la saca a chorro (liberador).',
    pro: 'Liberador de monoaminas: EC50 de liberación ≈ 70 nM para 5-HT, ≈ 140 nM para NA, ≈ 370 nM para DA (en sinaptosomas de rata; valores orientativos). La liberación de 5-HT es necesaria para la mayor parte del efecto subjetivo: la pretratar con citalopram (bloqueo de SERT) lo atenúa de forma marcada (Liechti et al., 2000).'
  },
  sinapsis: {
    tipo: 'liberador', nt: { nombre: 'Serotonina', color: '#378ADD' }, droga: { nombre: 'MDMA', color: '#D4537E' },
    receptor: 'Receptores de serotonina', transportadorNombre: 'transportador SERT', cronicoReceptores: 0.85, cronicoReservas: 0.35, cronicoTransportadores: 0.67,
    senal: 'Serotonina en la sinapsis',
    textos: {
      sin: 'La serotonina se libera desde vesículas y el transportador SERT la recoge de vuelta para reciclarla.',
      con: 'La MDMA (rombos) entra por el SERT y lo invierte: el transportador expulsa serotonina a chorro (flechas) y las vesículas se vacían. La sinapsis se inunda: euforia, empatía, energía.',
      cronico: 'Con tomas frecuentes las vesículas están medio vacías (la neurona no repone tan rápido) y hay menos transportadores. La misma pastilla libera menos serotonina: menos efecto, más bajón.'
    }
  },
  unidades: { dosis: 'mg', dosisNombre: 'toma', dosisPlural: 'Tomas', conc: 'ng/mL', concNombre: 'MDMA en plasma', sesion: 'sesión' },
  formaEtiqueta: 'Forma',
  pk: { F: 1, ka: 1.5, lag: 0.25, t12: 6, Vd: 6.5, ke0: 1.0, cf: 1000 },
  formas: [
    { id: 'oral', nombre: 'Oral (pastilla, cristal)', nota: 'Dosis en mg de MDMA (como clorhidrato). Las pastillas europeas recientes contienen a menudo 150–250 mg: el doble de una dosis de investigación (≈100–125 mg).', duracion: 5 }
  ],
  pd: { ec50: 120, n: 2, emax: 100 },
  tol: { kdes: 0.004, krec: 0.00024, rmin: 0.4, nombre: 'Neuroadaptación lenta (SERT, 5-HT)' },
  reserva: { kdep: 0.15, krep: 0.0144, crash: 0.3, nombre: 'Reservas de serotonina' },
  oponentes: [{ gamma: 0.08, tau: 72, nombre: 'Adaptación (días)' }],
  inhibicion: { kinact: 1.0, KI: 150, kdeg: 0.0144, imax: 0.5, nombre: 'Inhibición de CYP2D6' },
  habito: { k: 0.01, vida: 240 },
  canales: [
    { id: 'termico', nombre: 'Carga cardiovascular y térmica', ec50: 220, n: 2, tol: 'none', conc: 'C', umbral: 50, color: '#E24B4A' },
    { id: 'ocup', nombre: 'Ocupación de SERT (orientativo)', tipo: 'ocupacion', ec50: 40, occMax: 0.9, color: '#534AB7' }
  ],
  bandasConc: [
    { desde: 100, hasta: 300, texto: 'Dosis de investigación (75–125 mg): 130–250 ng/mL', nivel: 'info' },
    { desde: 300, hasta: 600, texto: 'Dosis altas / redosis', nivel: 'peligro' },
    { desde: 600, hasta: 5000, texto: 'Rango descrito en intoxicaciones graves', nivel: 'critico' }
  ],
  limites: { dosis: [25, 300, 5], porSesion: [1, 4], intervalo: [0.5, 4, 0.5] },
  presets: [
    { id: 'semanal', nombre: 'Cada fin de semana', desc: '120 mg cada sábado durante 6 meses: ¿se recuperan las reservas?', cfg: { forma: 'oral', dosis: 120, porSesion: 1, intervalo: 1, inicio: 0, frecuencia: 'semanal', horizonte: 180 } },
    { id: 'mensual', nombre: 'Una vez al mes', desc: '120 mg una vez cada 4 semanas.', cfg: { forma: 'oral', dosis: 120, porSesion: 1, intervalo: 1, inicio: 0, frecuencia: 'mensual', horizonte: 120 } },
    { id: 'redosis', nombre: 'Fiesta con redosis', desc: '2 tomas de 100 mg separadas 2 h: la farmacocinética no lineal dispara la concentración.', cfg: { forma: 'oral', dosis: 100, porSesion: 2, intervalo: 2, inicio: 0, frecuencia: 'mensual', horizonte: 60 } },
    { id: 'finde3', nombre: '3 días seguidos', desc: '100 mg viernes, sábado y domingo cada semana.', cfg: { forma: 'oral', dosis: 100, porSesion: 1, intervalo: 1, inicio: 0, frecuencia: 'tresSem', horizonte: 90 } },
    { id: 'alta', nombre: 'Pastilla actual de 220 mg', desc: 'Una pastilla de alta dosis (frecuente en análisis europeos).', cfg: { forma: 'oral', dosis: 220, porSesion: 1, intervalo: 1, inicio: 0, frecuencia: 'unica', horizonte: 14 } }
  ],
  neuroquimicos: [
    { nombre: 'Serotonina (liberación masiva)', dir: '+', peso: 1, fuente: 'efecto', rol: 'Euforia, empatía', detalle: 'Eflujo por inversión de SERT; aumentos extracelulares de 5-HT de varias veces el basal.' },
    { nombre: 'Noradrenalina', dir: '+', peso: 0.8, fuente: 'efecto', rol: 'Energía, pulso, calor', detalle: 'Liberación por NET: taquicardia, hipertensión, termogénesis. Parte de la euforia depende de NA (bloqueada en parte por reboxetina).' },
    { nombre: 'Dopamina', dir: '+', peso: 0.5, fuente: 'efecto', rol: 'Euforia, motivación', detalle: 'Liberación por DAT y, de forma indirecta, vía 5-HT2A.' },
    { nombre: 'Oxitocina', dir: '+', peso: 0.8, fuente: 'efecto', rol: 'Cercanía, confianza', detalle: 'Aumento plasmático vía 5-HT1A en el hipotálamo; relacionado con los efectos prosociales.' },
    { nombre: 'Vasopresina (ADH)', dir: '+', peso: 0.6, fuente: 'efecto', rol: 'Retiene agua → hiponatremia', detalle: 'Antidiuresis: si se bebe mucha agua, el sodio cae peligrosamente.' },
    { nombre: 'Cortisol / prolactina', dir: '+', peso: 0.5, fuente: 'efecto', rol: 'Estrés fisiológico', detalle: 'Aumentos dependientes de la dosis.' },
    { nombre: 'Serotonina disponible (bajón)', dir: '-', peso: 1, fuente: 'malestar', rol: 'Ánimo bajo días después', detalle: 'Depleción de 5-HT e inactivación de la triptófano hidroxilasa; el «martes negro» aparece 2–5 días después.' }
  ],
  adaptaciones: [
    { nombre: 'Reservas de serotonina', rol: 'tardan días en llenarse', fuente: 'S', a: 0, b: 100, max: 100, sufijo: '%', detalle: 'En el modelo la recuperación tiene una vida media de ≈2 días.' },
    { nombre: 'Sensibilidad a largo plazo', rol: '«pérdida de la magia»', fuente: 'R', a: 0, b: 100, max: 100, sufijo: '%', detalle: 'Reducción de la unión a SERT en consumidores intensos (Kish et al., 2010), parcialmente reversible.' },
    { nombre: 'Bajón / ánimo bajo', rol: 'malestar posterior', fuente: 'B', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Inhibición de CYP2D6', rol: 'la siguiente dosis «pega» más fuerte', fuente: 'I', a: 0, b: 100, max: 100, sufijo: '%', detalle: 'La actividad de CYP2D6 tarda ≈10 días en recuperarse tras una dosis (Yang et al., 2006).' }
  ],
  fases: [
    { t0: 0, t1: 0.6, nombre: 'Latencia', texto: 'Absorción. Algo de nerviosismo, náusea leve.' },
    { t0: 0.6, t1: 1.3, nombre: 'Subida', texto: 'Oleada de euforia, calor, mandíbula tensa, pupilas dilatadas.' },
    { t0: 1.3, t1: 3.5, nombre: 'Meseta', texto: 'Empatía, energía, ganas de hablar y de contacto. Temperatura y pulso altos: riesgo de golpe de calor si se baila sin descanso.' },
    { t0: 3.5, t1: 6, nombre: 'Bajada', texto: 'El efecto se apaga aunque la concentración siga alta: las reservas de serotonina se han vaciado (redosificar da poco y añade toxicidad).' },
    { t0: 6, t1: 96, nombre: 'Bajón', texto: 'Cansancio, mandíbula dolorida, ánimo bajo e irritabilidad 2–5 días después.' }
  ],
  abstinencia: {
    inicio: '1–3 días después de la toma', pico: '2–5 días («martes negro»)', duracion: 'Hasta una semana', peligrosa: false,
    sintomas: ['Ánimo bajo, tristeza', 'Irritabilidad, ansiedad', 'Cansancio, mal sueño', 'Dificultad de concentración', 'Falta de apetito'],
    texto: 'No hay dependencia física clásica, pero sí un bajón subagudo por depleción de serotonina. El consumo frecuente se asocia a problemas de memoria y ánimo.'
  },
  riesgos: {
    agudos: ['Golpe de calor (hipertermia > 40 °C) con fallo multiorgánico', 'Hiponatremia por beber demasiada agua (convulsiones, edema cerebral)', 'Síndrome serotoninérgico', 'Taquicardia, hipertensión, arritmias', 'Bruxismo, deshidratación', 'Pastillas de alta dosis o adulteradas (PMA/PMMA: efecto lento que lleva a redosificar, muy tóxicas)'],
    cronicos: ['Problemas de memoria verbal y de trabajo en consumidores intensos', 'Ánimo bajo y ansiedad', 'Posible neurotoxicidad serotoninérgica con dosis altas y frecuentes', 'Valvulopatía cardiaca (agonismo 5-HT2B) con uso muy frecuente'],
    alarma: ['Temperatura muy alta, piel seca y caliente, confusión, rigidez o espasmos → 112', 'Dolor de cabeza intenso, vómitos y confusión tras beber mucha agua → 112 (posible hiponatremia)', 'Convulsiones o pérdida de conciencia → 112']
  },
  interacciones: [
    { con: 'IMAO (fenelzina, moclobemida, ayahuasca)', gravedad: 'critica', efecto: 'Síndrome serotoninérgico y crisis hipertensiva potencialmente mortales.', mecanismo: 'La serotonina liberada no puede degradarse.' },
    { con: 'ISRS, IRSN, tramadol, dextrometorfano, litio', gravedad: 'alta', efecto: 'Riesgo de síndrome serotoninérgico; los ISRS además bloquean buena parte del efecto (lo que lleva a tomar más).', mecanismo: 'Los ISRS bloquean SERT, la puerta de entrada de la MDMA; serotoninérgicos aditivos.' },
    { con: 'Inhibidores de CYP2D6 (paroxetina, fluoxetina, bupropión, ritonavir)', gravedad: 'alta', efecto: 'Concentraciones de MDMA más altas y prolongadas.', mecanismo: 'Inhibición de la principal vía metabólica.' },
    { con: 'Alcohol', gravedad: 'moderada', efecto: 'Más deshidratación y carga cardiovascular; enmascara el cansancio.', mecanismo: 'Efectos aditivos.' },
    { con: 'Cocaína, anfetaminas', gravedad: 'alta', efecto: 'Riesgo cardiovascular e hipertermia muy aumentados.', mecanismo: 'Efectos simpaticomiméticos y serotoninérgicos aditivos.' },
    { con: 'Sildenafilo y similares', gravedad: 'moderada', efecto: 'Más carga cardiovascular e hipotensión.', mecanismo: 'Efectos hemodinámicos combinados.' }
  ],
  mitos: [
    { mito: 'Si no sube, se toma otra.', realidad: 'Tomar más a las 2–3 h da poco efecto extra (las reservas de serotonina ya se están vaciando) y sube mucho la concentración por la cinética no lineal: más toxicidad sin más euforia. Además, si la pastilla tiene PMA, el efecto tardío lleva a sobredosis.' },
    { mito: 'Hay que beber mucha agua.', realidad: 'La MDMA hace retener agua. Beber en exceso causa hiponatremia, potencialmente mortal. Las guías de reducción de riesgos recomiendan sorbos y unos 250–500 mL por hora si se baila, menos si no.' },
    { mito: 'El bajón es la resaca de la fiesta.', realidad: 'Es en buena parte químico: las neuronas han vaciado su serotonina y tardan días en reponerla.' },
    { mito: 'Las pastillas de ahora son más flojas.', realidad: 'Es al revés: en Europa la dosis media por pastilla ha aumentado mucho; es frecuente encontrar más de 150–200 mg.' }
  ],
  historiaPreset: 'semanal',
  historia: [
    { dia: 5, titulo: 'Primera toma', texto: 'Con las reservas llenas, la pastilla produce su efecto completo. Durante la sesión las reservas se vacían a gran velocidad.' },
    { dia: 8, titulo: 'Tres días después', texto: 'El bajón (naranja): reservas por la mitad, ánimo bajo. Todavía queda MDMA inhibiendo su propia enzima (CYP2D6).' },
    { dia: 12, titulo: 'La segunda toma', texto: 'Las reservas no se han llenado del todo en una semana: la segunda pastilla da menos efecto y el bajón posterior es mayor.' },
    { dia: 89, titulo: 'Tres meses de fines de semana', texto: 'Las reservas nunca se recuperan del todo y la sensibilidad a largo plazo ha bajado: la «magia» se pierde. Es la experiencia típica de quien consume cada fin de semana.' }
  ],
  farmaco: {
    tabla: [
      ['Tmax', '≈2 h (1,5–3 h)'],
      ['Cmax', '≈130 ng/mL (75 mg) y ≈240 ng/mL (125 mg) (de la Torre et al., 2000)'],
      ['Vida media', '≈7–9 h; aumenta con la dosis'],
      ['Farmacocinética', 'No lineal: autoinhibición de CYP2D6 por mecanismo'],
      ['Volumen de distribución aparente', '≈5–7 L/kg'],
      ['Enzimas', 'CYP2D6 (O-desmetilenación, principal), CYP1A2, CYP2B6, CYP3A4 (N-desmetilación)'],
      ['Metabolitos', 'HHMA, HMMA (y sus conjugados); MDA (activo, minoritario)'],
      ['Excreción renal sin cambios', '≈20 %'],
      ['Recuperación de CYP2D6', '≈10 días'],
      ['Dosis de investigación', '75–125 mg (≈1,5 mg/kg)']
    ],
    afinidad: [
      { diana: 'SERT', accion: 'Sustrato / liberador', ki: '≈0,2–2 µM', nivel: 3 },
      { diana: 'NET', accion: 'Sustrato / liberador', ki: '≈0,5–2 µM', nivel: 3 },
      { diana: 'DAT', accion: 'Sustrato / liberador', ki: '≈1–8 µM', nivel: 2 },
      { diana: 'VMAT2', accion: 'Sustrato', ki: 'µM', nivel: 2 },
      { diana: 'TAAR1', accion: 'Agonista', ki: 'µM', nivel: 2 },
      { diana: '5-HT2A / 5-HT2B', accion: 'Agonista débil', ki: '≈1–5 µM', nivel: 2 },
      { diana: 'α2-adrenérgico', accion: 'Agonista', ki: '≈3 µM', nivel: 2 }
    ],
    metabolismo: 'MDMA → <b>HHMA</b> (3,4-dihidroximetanfetamina; O-desmetilenación por CYP2D6) → <b>HMMA</b> (COMT) → conjugados sulfato/glucurónido. Vía menor: N-desmetilación a <b>MDA</b> (CYP1A2, CYP2B6; activo y más neurotóxico en animales). La formación de un complejo metabolito-intermediario inactiva CYP2D6 de forma irreversible: la siguiente dosis en los próximos días alcanza concentraciones mayores.'
  },
  tratamiento: 'No hay tratamiento específico para el consumo. En investigación, la psicoterapia asistida con MDMA para el trastorno de estrés postraumático (Mitchell et al., 2021); la FDA no la aprobó en 2024. Australia permite su prescripción por psiquiatras autorizados desde 2023.',
  escalas: { dependencia: 2, abstinencia: 1, toxicidad: 3 }, nutt: 9, nuttNombre: 'Éxtasis',
  referencias: [
    'de la Torre R et al. Non-linear pharmacokinetics of MDMA (“ecstasy”) in humans. Br J Clin Pharmacol. 2000;49(2):104-109.',
    'de la Torre R et al. Human pharmacology of MDMA: pharmacokinetics, metabolism, and disposition. Ther Drug Monit. 2004;26(2):137-144.',
    'Green AR et al. The pharmacology and clinical pharmacology of MDMA. Pharmacol Rev. 2003;55(3):463-508.',
    'Liechti ME, Baumann C, Gamma A, Vollenweider FX. Acute psychological effects of MDMA are attenuated by the serotonin uptake inhibitor citalopram. Neuropsychopharmacology. 2000;22(5):513-521.',
    'Yang J et al. Implications of mechanism-based inhibition of CYP2D6 for the pharmacokinetics and toxicity of MDMA. J Psychopharmacol. 2006;20(6):842-849.',
    'Kish SJ et al. Decreased cerebral cortical serotonin transporter binding in ecstasy users. Brain. 2010;133(6):1779-1797.',
    'Parrott AC. Human psychobiology of MDMA or “ecstasy”: an overview of 25 years of empirical research. Hum Psychopharmacol. 2013;28(4):289-307.',
    'Mitchell JM et al. MDMA-assisted therapy for severe PTSD: a randomized, double-blind, placebo-controlled phase 3 study. Nat Med. 2021;27(6):1025-1033.',
    'Vizeli P, Liechti ME. Safety pharmacology of acute MDMA administration in healthy subjects. J Psychopharmacol. 2017;31(5):576-588.'
  ]
});
