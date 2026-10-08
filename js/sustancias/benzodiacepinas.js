NT.registrar({
  id: 'benzodiacepinas', numero: 11, simbolo: 'Bz', nombre: 'Benzodiacepinas', color: '#5B7FD6',
  subtitulo: 'Alprazolam, diazepam, lorazepam (y benzos «de diseño»)',
  categoria: 'depresor', formula: 'C₁₇H₁₃ClN₄ (alprazolam)', masaMolar: 308.76,
  ficha: { vidaMedia: '6–27 h (alprazolam) · 20–100 h (diazepam)', duracion: '4–8 h (alprazolam)', inicio: '20–60 min' },
  etiquetas: {
    efecto: 'Alivio / calma', neto: 'Calma neta', malestar: 'Ansiedad e insomnio de rebote',
    aporte: 'Lo que aporta un día de tratamiento la primera vez', costumbre: 'Línea de costumbre', tolerancia: 'GABA-A adaptados'
  },
  resumen: {
    basico: 'Las benzodiacepinas amplifican el GABA, el freno del cerebro: calman la ansiedad, dan sueño y relajan los músculos. Con el uso diario aparece tolerancia (antes al sueño que a la ansiedad) y dependencia en pocas semanas. Dejarlas de golpe puede causar convulsiones: siempre hay que reducirlas poco a poco.',
    principiante: 'Las benzodiacepinas no abren por sí solas los canales del [[GABA]]: se unen a un sitio especial del receptor GABA-A y hacen que, cuando llega el GABA, el canal se abra más a menudo ([[modulador alostérico|modulador alosterico]]). El resultado es más freno: menos ansiedad, sueño, relajación muscular, menos convulsiones y peor memoria. Son medicamentos muy útiles a corto plazo, pero el cerebro se adapta en semanas: cambia la composición de sus receptores GABA-A y refuerza el [[glutamato]]. Así aparecen la [[tolerancia]] y la [[dependencia]]. Si se dejan de golpe, el cerebro queda con poco freno y mucho acelerador: ansiedad intensa, insomnio, temblor y, en casos graves, convulsiones. Por eso se retiran siempre de forma gradual. Combinadas con alcohol u opioides pueden parar la respiración.',
    pro: 'Moduladores alostéricos positivos de los receptores GABA-A que contienen subunidades α1, α2, α3 o α5 junto a γ2 (sitio de unión en la interfaz α/γ2). Aumentan la frecuencia de apertura del canal de Cl⁻ en presencia de GABA (desplazan la curva concentración-respuesta del GABA a la izquierda), con efecto techo. α1: sedación, amnesia anterógrada, efecto anticonvulsivo y refuerzo (desinhibición de las neuronas dopaminérgicas del VTA; Tan et al., 2010); α2/α3: ansiolisis y miorrelajación; α5: memoria. Tolerancia: desacoplamiento alostérico, internalización y cambios en la expresión de subunidades (↓α1, ↑α4), con potenciación compensadora de AMPA. La tolerancia a la sedación y al efecto anticonvulsivo aparece antes que a la ansiolisis; apenas hay tolerancia a la amnesia.'
  },
  basico: 'Línea morada: la calma que aporta un día de tratamiento la primera vez (100 %). Línea ámbar: la costumbre. En pocas semanas sube y, al dejarlas, deja ansiedad e insomnio de rebote (naranja). Prueba a dejarlo «gradual»: la diferencia es enorme.',
  mecanismo: {
    simple: 'Amplifica el efecto del GABA (el freno del cerebro). Modulador alostérico positivo.',
    pro: 'Modulación alostérica positiva de GABA-A α(1,2,3,5)βγ2. Sin GABA no abren el canal: por eso solas tienen un techo de depresión respiratoria relativamente alto, que desaparece al combinarlas con alcohol, opioides u otros depresores.'
  },
  sinapsis: {
    tipo: 'pam', nt: { nombre: 'GABA', color: '#1D9E75' }, droga: { nombre: 'Benzodiacepina', color: '#5B7FD6' },
    receptor: 'Receptor GABA-A (α/γ2)', transportadorNombre: 'transportador GAT', cronicoReceptores: 0.8, cronicoDesens: 0.12,
    senal: 'Inhibición (entrada de cloruro)',
    textos: {
      sin: 'El GABA (círculos verdes) abre el receptor GABA-A y entra cloruro (puntos): freno normal.',
      con: 'La benzodiacepina (rombos) se coloca en un sitio lateral del receptor. Cuando llega el GABA, el canal se abre con más frecuencia y entra mucho más cloruro: ansiedad abajo, sueño, relajación.',
      cronico: 'Tras semanas de uso hay menos receptores sensibles a la benzodiacepina (grises) y el glutamato está reforzado. Sin la pastilla, el freno se queda corto: ansiedad de rebote, insomnio, temblor e incluso convulsiones si se deja de golpe.'
    }
  },
  unidades: { dosis: 'mg', dosisNombre: 'comprimido', dosisPlural: 'Tomas', conc: 'ng/mL', concNombre: 'Fármaco en plasma', sesion: 'día' },
  formaEtiqueta: 'Fármaco',
  pk: { F: 0.9, ka: 2, lag: 0.1, t12: 11, Vd: 0.8, ke0: 1.5, cf: 1000 },
  formas: [
    { id: 'alprazolam', nombre: 'Alprazolam (Trankimazin®)', nota: 'Vida media intermedia (≈11 h); inicio rápido. Alta capacidad de dependencia y ansiedad entre dosis. 0,5 mg ≈ 10 mg de diazepam.', duracion: 6 },
    { id: 'diazepam', nombre: 'Diazepam (Valium®)', nota: 'Vida media larga (20–100 h) más su metabolito activo desmetildiazepam (36–200 h): se acumula y se retira de forma más suave. Se usa para las pautas de retirada.', pk: { F: 1, ka: 2.5, lag: 0.05, t12: 48, Vd: 1.1, ke0: 2 }, pd: { ec50: 220 }, canales: { sedacion: { ec50: 480 }, resp: { ec50: 1800 } }, duracion: 8 },
    { id: 'lorazepam', nombre: 'Lorazepam (Orfidal®)', nota: 'Vida media ≈12 h; se elimina por glucuronidación (sin CYP), útil en enfermedad hepática. 1 mg ≈ 10 mg de diazepam.', pk: { F: 0.9, ka: 1.5, lag: 0.1, t12: 12, Vd: 1.3, ke0: 1 }, pd: { ec50: 9 }, canales: { sedacion: { ec50: 20 }, resp: { ec50: 75 } }, duracion: 7 }
  ],
  pd: { ec50: 12, n: 1.5, emax: 100 },
  tol: { kdes: 0.012, krec: 0.0041, rmin: 0.45, nombre: 'Tolerancia a la ansiolisis (lenta)' },
  tol2: { kdes: 0.05, krec: 0.0096, rmin: 0.2, nombre: 'Tolerancia a la sedación (rápida)' },
  oponentes: [
    { gamma: 0.15, tau: 12, nombre: 'Ansiedad entre dosis (horas)' },
    { gamma: 0.6, tau: 240, nombre: 'Alostasis: ↓GABA-A, ↑glutamato (semanas)' }
  ],
  habito: { k: 0.004, vida: 365 },
  canales: [
    { id: 'sedacion', nombre: 'Sedación / somnolencia', ec50: 26, n: 2, tol: 'R2', color: '#BA7517' },
    { id: 'resp', nombre: 'Depresión respiratoria (sola: con techo)', ec50: 100, n: 1.5, emax: 45, tol: 'none', umbral: 50, color: '#E24B4A' }
  ],
  bandasConc: [
    { desde: 10, hasta: 40, texto: 'Rango terapéutico orientativo del alprazolam', nivel: 'info' }
  ],
  limites: { dosis: [0.25, 20, 0.25], porSesion: [1, 4], intervalo: [4, 12, 1] },
  presets: [
    { id: 'golpe', nombre: '8 semanas y abandono brusco', desc: 'Alprazolam 1 mg tres veces al día durante 8 semanas y abandono de golpe el día 56.', cfg: { forma: 'alprazolam', dosis: 1, porSesion: 3, intervalo: 6, inicio: 8, frecuencia: 'diario', horizonte: 110, dejar: 56 } },
    { id: 'gradual', nombre: '8 semanas y retirada gradual', desc: 'Igual, pero reduciendo la dosis durante 6 semanas.', cfg: { forma: 'alprazolam', dosis: 1, porSesion: 3, intervalo: 6, inicio: 8, frecuencia: 'diario', horizonte: 130, dejar: 56, gradual: 6 } },
    { id: 'puntual', nombre: 'Uso puntual', desc: 'Una dosis de 0,5 mg de alprazolam.', cfg: { forma: 'alprazolam', dosis: 0.5, porSesion: 1, intervalo: 1, inicio: 20, frecuencia: 'unica', horizonte: 7 } },
    { id: 'diazepam', nombre: 'Diazepam diario', desc: 'Diazepam 5 mg dos veces al día durante 3 meses: observa la acumulación.', cfg: { forma: 'diazepam', dosis: 5, porSesion: 2, intervalo: 12, inicio: 8, frecuencia: 'diario', horizonte: 120 } },
    { id: 'cronico', nombre: 'Lorazepam un año', desc: 'Lorazepam 1 mg por la noche durante un año para dormir.', cfg: { forma: 'lorazepam', dosis: 1, porSesion: 1, intervalo: 1, inicio: 23, frecuencia: 'diario', horizonte: 365 } }
  ],
  neuroquimicos: [
    { nombre: 'GABA (GABA-A α2/α3)', dir: '+', peso: 1, fuente: 'efecto', rol: 'Menos ansiedad, relajación', detalle: 'Potenciación de la inhibición en la amígdala y la corteza.' },
    { nombre: 'GABA (GABA-A α1)', dir: '+', peso: 0.8, fuente: 'efecto', rol: 'Sueño, amnesia', detalle: 'Sedación y amnesia anterógrada; tolerancia rápida a la sedación.' },
    { nombre: 'Dopamina (VTA)', dir: '+', peso: 0.5, fuente: 'efecto', rol: 'Refuerzo, «engancha»', detalle: 'Desinhibición de las neuronas dopaminérgicas mediada por α1 en interneuronas (Tan et al., 2010).' },
    { nombre: 'Glutamato', dir: '-', peso: 0.5, fuente: 'efecto', rol: 'Menos excitación', detalle: 'Reducción indirecta de la excitabilidad.' },
    { nombre: 'Noradrenalina / serotonina', dir: '-', peso: 0.4, fuente: 'efecto', rol: 'Calma', detalle: 'Reducción del recambio en el locus coeruleus y el rafe.' },
    { nombre: 'Glutamato (rebote)', dir: '+', peso: 1, fuente: 'malestar', rol: 'Ansiedad, temblor, convulsiones', detalle: 'Potenciación compensadora de AMPA y cambios en GABA-A: hiperexcitabilidad en la retirada.' },
    { nombre: 'Eje del estrés (CRF)', dir: '+', peso: 0.6, fuente: 'malestar', rol: 'Ansiedad de rebote', detalle: 'Activación del eje del estrés durante la retirada.' }
  ],
  adaptaciones: [
    { nombre: 'Respuesta ansiolítica', rol: 'tolerancia lenta', fuente: 'R', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Respuesta sedante', rol: 'tolerancia rápida', fuente: 'R2', a: 0, b: 100, max: 100, sufijo: '%', detalle: 'Por eso como hipnóticos pierden eficacia en semanas.' },
    { nombre: 'Ansiedad e insomnio de rebote', rol: 'abstinencia', fuente: 'B', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Hábito / dependencia psicológica', rol: '«no puedo dormir sin ella»', fuente: 'H', a: 0, b: 100, max: 100, sufijo: '%' }
  ],
  fases: [
    { t0: 0, t1: 0.5, nombre: 'Absorción', texto: 'En 20–60 minutos empieza el efecto.' },
    { t0: 0.5, t1: 2, nombre: 'Pico', texto: 'Calma, relajación muscular, somnolencia. Peor memoria para lo que pasa en ese tiempo.' },
    { t0: 2, t1: 6, nombre: 'Meseta', texto: 'Efecto ansiolítico mantenido (alprazolam).' },
    { t0: 6, t1: 14, nombre: 'Declive', texto: 'Con alprazolam, en personas dependientes puede aparecer ansiedad entre dosis.' }
  ],
  abstinencia: {
    inicio: '1–2 días (acción corta); 2–7 días (acción larga)', pico: 'Primeras 1–2 semanas', duracion: 'Semanas; síntomas prolongados en algunas personas durante meses', peligrosa: true,
    sintomas: ['Ansiedad y ataques de pánico de rebote', 'Insomnio', 'Temblor, sudor, palpitaciones', 'Hipersensibilidad a luz y sonido, despersonalización', 'Convulsiones (sobre todo tras dosis altas y abandono brusco)', 'Delirium y psicosis en casos graves'],
    texto: 'La retirada brusca tras un uso diario prolongado puede causar convulsiones y ser peligrosa. Se recomienda una reducción gradual (a menudo pasando a diazepam y bajando un 5–10 % cada 1–4 semanas), siempre con supervisión médica (manual Ashton).'
  },
  riesgos: {
    agudos: ['Somnolencia, torpeza, amnesia', 'Accidentes de tráfico y caídas (sobre todo en mayores)', 'Desinhibición paradójica o agresividad', 'Depresión respiratoria al combinarlas con alcohol, opioides u otros depresores', 'Pastillas falsificadas con benzos de diseño (bromazolam, flualprazolam) o fentanilo'],
    cronicos: ['Tolerancia y dependencia en pocas semanas', 'Deterioro cognitivo y de la memoria', 'Caídas y fracturas de cadera en personas mayores', 'Empeoramiento de la ansiedad a largo plazo', 'En el embarazo: síndrome de abstinencia neonatal'],
    alarma: ['Respiración lenta, imposible de despertar, labios azulados (especialmente con alcohol u opioides) → 112', 'Convulsiones o confusión tras dejarlas de golpe → 112']
  },
  interacciones: [
    { con: 'Opioides', gravedad: 'critica', efecto: 'Depresión respiratoria y muerte (advertencia de recuadro negro de la FDA, 2016).', mecanismo: 'Sinergia GABA-A + μ sobre los centros respiratorios.' },
    { con: 'Alcohol, GHB, pregabalina, gabapentina', gravedad: 'critica', efecto: 'Sedación profunda, depresión respiratoria, coma.', mecanismo: 'Depresión aditiva o sinérgica del SNC.' },
    { con: 'Inhibidores de CYP3A4 (ketoconazol, claritromicina, ritonavir, zumo de pomelo)', gravedad: 'alta', efecto: 'Aumentan mucho los niveles de alprazolam, midazolam y diazepam.', mecanismo: 'Inhibición del metabolismo (no afecta al lorazepam).' },
    { con: 'Inductores (rifampicina, carbamazepina, hipérico)', gravedad: 'moderada', efecto: 'Reducen los niveles: menos efecto o abstinencia.', mecanismo: 'Inducción de CYP3A4.' },
    { con: 'Antihistamínicos sedantes, antipsicóticos sedantes', gravedad: 'moderada', efecto: 'Más sedación y caídas.', mecanismo: 'Depresión aditiva del SNC.' },
    { con: 'Flumazenil', gravedad: 'alta', efecto: 'Revierte la benzodiacepina, pero en personas dependientes puede provocar convulsiones.', mecanismo: 'Antagonista del sitio benzodiacepínico.' }
  ],
  mitos: [
    { mito: 'Como las receta el médico, no enganchan.', realidad: 'Producen tolerancia y dependencia en 2–4 semanas de uso diario. Las guías recomiendan usarlas pocas semanas.' },
    { mito: 'Si me encuentro bien, las puedo dejar de golpe.', realidad: 'Tras uso diario prolongado, el abandono brusco puede producir ansiedad intensa, insomnio y convulsiones. La retirada debe ser gradual y supervisada.' },
    { mito: 'Ayudan a dormir siempre.', realidad: 'La tolerancia al efecto hipnótico aparece en semanas; a largo plazo empeoran la calidad del sueño y al dejarlas hay insomnio de rebote.' },
    { mito: 'Una pastilla de «Xanax» comprada fuera de la farmacia es alprazolam.', realidad: 'Muchas son falsificaciones con benzodiacepinas de diseño de potencia desconocida o incluso fentanilo.' }
  ],
  historiaPreset: 'golpe',
  historia: [
    { dia: 0, titulo: 'Primeros días', texto: 'El efecto es completo: calma y bastante sueño. La sedación es lo primero a lo que el cerebro se acostumbra.' },
    { dia: 14, titulo: 'Dos semanas', texto: 'La somnolencia casi ha desaparecido (tolerancia rápida) y la calma neta empieza a bajar. Entre tomas aparece algo de ansiedad.' },
    { dia: 50, titulo: 'Siete semanas', texto: 'La costumbre ha subido mucho. La pastilla sirve sobre todo para no tener ansiedad de rebote.' },
    { dia: 58, titulo: 'Dos días tras el abandono brusco', texto: 'Pico del rebote: ansiedad, insomnio, temblor. En usos más largos y dosis más altas, riesgo de convulsiones.' },
    { dia: 58, cfg: { gradual: 6 }, titulo: 'La alternativa: retirada gradual', texto: 'Reduciendo poco a poco (en la práctica, con diazepam y bajo supervisión) la costumbre baja a la vez que la dosis y el malestar es mucho menor.' }
  ],
  farmaco: {
    tabla: [
      ['Alprazolam', 'F ≈ 90 %; Tmax 1–2 h; t½ 6–27 h (media ≈11 h); Vd ≈ 0,8 L/kg; CYP3A4 → α-hidroxialprazolam'],
      ['Diazepam', 'F ≈ 100 %; Tmax ≈ 1 h; t½ 20–100 h; metabolito activo desmetildiazepam (t½ 36–200 h); CYP2C19, CYP3A4'],
      ['Lorazepam', 'F ≈ 90 %; Tmax ≈ 2 h; t½ 10–20 h; glucuronidación (UGT2B15) sin CYP'],
      ['Unión a proteínas', '80–99 %'],
      ['Equivalencias (Ashton)', 'Diazepam 10 mg ≈ alprazolam 0,5 mg ≈ lorazepam 1 mg ≈ clonazepam 0,5 mg'],
      ['Dependencia', 'Puede aparecer tras 2–4 semanas de uso diario'],
      ['Antídoto', 'Flumazenil (riesgo de convulsiones en dependientes)']
    ],
    afinidad: [
      { diana: 'GABA-A α1βγ2', accion: 'Modulador alostérico positivo', ki: '≈1–10 nM', nivel: 5 },
      { diana: 'GABA-A α2βγ2', accion: 'Modulador alostérico positivo', ki: '≈1–10 nM', nivel: 5 },
      { diana: 'GABA-A α3βγ2', accion: 'Modulador alostérico positivo', ki: '≈1–10 nM', nivel: 5 },
      { diana: 'GABA-A α5βγ2', accion: 'Modulador alostérico positivo', ki: '≈1–20 nM', nivel: 4 },
      { diana: 'GABA-A α4/α6 (insensibles)', accion: 'Sin unión', ki: '—', nivel: 0 },
      { diana: 'TSPO (antiguo «receptor periférico»)', accion: 'Ligando (diazepam)', ki: '≈10–100 nM', nivel: 3 }
    ],
    metabolismo: 'Alprazolam → α-hidroxialprazolam y 4-hidroxialprazolam (CYP3A4; poco activos). Diazepam → <b>desmetildiazepam</b> (CYP2C19/3A4, activo, t½ muy larga) → oxazepam (activo) → glucurónido; también temazepam (CYP3A4). Lorazepam → lorazepam-glucurónido inactivo (UGT), sin pasar por CYP: menos interacciones y más seguro en hepatopatía.'
  },
  tratamiento: 'Retirada gradual supervisada (a menudo cambiando a diazepam por su vida media larga y bajando un 5–10 % cada 1–4 semanas), con terapia cognitivo-conductual para la ansiedad o el insomnio de base.',
  escalas: { dependencia: 4, abstinencia: 4, toxicidad: 3 }, nutt: 15, nuttNombre: 'Benzodiacepinas',
  referencias: [
    'Ashton H. The diagnosis and management of benzodiazepine dependence. Curr Opin Psychiatry. 2005;18(3):249-255.',
    'Ashton CH. Benzodiazepines: how they work and how to withdraw (The Ashton Manual). 2002.',
    'Griffin CE et al. Benzodiazepine pharmacology and central nervous system-mediated effects. Ochsner J. 2013;13(2):214-223.',
    'Tan KR et al. Neural bases for addictive properties of benzodiazepines. Nature. 2010;463:769-774.',
    'Soyka M. Treatment of benzodiazepine dependence. N Engl J Med. 2017;376(12):1147-1157.',
    'Greenblatt DJ, Wright CE. Clinical pharmacokinetics of alprazolam. Clin Pharmacokinet. 1993;24(6):453-471.',
    'Lader M. Benzodiazepines revisited—will we ever learn? Addiction. 2011;106(12):2086-2109.',
    'Vinkers CH, Olivier B. Mechanisms underlying tolerance after long-term benzodiazepine use. Adv Pharmacol Sci. 2012;2012:416864.'
  ]
});
