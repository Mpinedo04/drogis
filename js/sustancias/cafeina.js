NT.registrar({
  id: 'cafeina', numero: 4, simbolo: 'Cf', nombre: 'Cafeína', color: '#8A5A2B',
  subtitulo: 'Café, té, refrescos de cola, bebidas energéticas',
  categoria: 'estimulante', formula: 'C₈H₁₀N₄O₂', masaMolar: 194.19,
  ficha: { vidaMedia: '3–6 h (media ≈5 h)', duracion: '3–5 h', inicio: '15–45 min' },
  etiquetas: {
    efecto: 'Alerta / energía', neto: 'Alerta neta', malestar: 'Cansancio y dolor de cabeza sin cafeína',
    aporte: 'Lo que aporta tu café', costumbre: 'Línea de costumbre', tolerancia: 'Receptores desensibilizados'
  },
  resumen: {
    basico: 'La cafeína bloquea la adenosina, la señal química de cansancio. Si se toma a diario el cerebro fabrica más receptores de adenosina: el café del consumidor habitual sirve, sobre todo, para quitar el cansancio y el dolor de cabeza que provoca su propia falta.',
    principiante: 'Mientras estamos despiertos se acumula en el cerebro la [[adenosina]], una molécula que indica «estás cansado». La cafeína se parece a la adenosina y ocupa sus [[receptores|receptor]] sin activarlos: es un [[antagonista]]. El cansancio sigue ahí, pero el cerebro no lo «oye». Con el consumo diario el cerebro compensa fabricando más receptores de adenosina ([[upregulation]]). Por eso, si un día no tomas café, la señal de cansancio llega amplificada: somnolencia, irritabilidad y dolor de cabeza. Este es probablemente el ejemplo más claro de tu idea: la línea de costumbre sube hasta casi tocar lo que aporta la cafeína.',
    pro: 'Metilxantina; antagonista competitivo no selectivo de los receptores de adenosina A1 y A2A a concentraciones de consumo habitual (1–10 µM). El bloqueo de A2A en el estriado, que forma heterómeros con D2, desinhibe la vía indirecta y potencia la señalización dopaminérgica; el bloqueo de A1 aumenta la liberación de acetilcolina, noradrenalina y glutamato. La inhibición de fosfodiesterasas y la movilización de calcio por receptores de rianodina solo aparecen a concentraciones tóxicas. La tolerancia a los efectos presores y subjetivos se instaura en días por upregulation de A1 y cambios de acoplamiento. La hipótesis de la reversión de la abstinencia (James y Rogers, 2005) sostiene que en consumidores habituales gran parte del beneficio agudo es la eliminación de una abstinencia nocturna.'
  },
  basico: 'Línea morada: la alerta que da tu ración diaria de café la primera vez (100 %). Línea ámbar: la costumbre, que en pocos días sube casi hasta la morada. El naranja es el cansancio y el dolor de cabeza cuando falta la cafeína.',
  mecanismo: {
    simple: 'Bloquea los receptores de adenosina (antagonista): el cerebro deja de recibir la señal de cansancio.',
    pro: 'Antagonismo A1 (Ki ≈ 12–40 µM) y A2A (Ki ≈ 2–20 µM). 100 mg en un adulto producen ≈2 mg/L (≈10 µM) en plasma, suficiente para ocupar una fracción relevante de A1 y A2A. Las PDE solo se inhiben con concentraciones del orden de mM.'
  },
  sinapsis: {
    tipo: 'antagonista', nt: { nombre: 'Adenosina', color: '#5F5E5A' }, droga: { nombre: 'Cafeína', color: '#8A5A2B' },
    receptor: 'Receptor de adenosina A1', transportador: false, cronicoReceptores: 1.6, cronicoDesens: 0, cronicoConDroga: false,
    senal: 'Señal de cansancio (adenosina)', tasaDroga: 4.5,
    textos: {
      sin: 'La adenosina (círculos grises) se acumula y activa sus receptores: la neurona baja su actividad y aparece la sensación de sueño.',
      con: 'La cafeína (rombos) ocupa los receptores sin activarlos. La adenosina no encuentra hueco: la señal de cansancio cae y te sientes despierto.',
      cronico: 'Con el café diario hay muchos más receptores de adenosina. Si un día no tomas café, todos esos receptores reciben adenosina a la vez: cansancio intenso y dolor de cabeza (la adenosina también dilata los vasos cerebrales).'
    }
  },
  unidades: { dosis: 'mg', dosisNombre: 'café', dosisPlural: 'Cafés', conc: 'mg/L', concNombre: 'Cafeína en plasma', sesion: 'día' },
  formaEtiqueta: 'Situación',
  pk: { F: 1, ka: 3, lag: 0.05, t12: 5, Vd: 0.7, ke0: 2, cf: 1 },
  formas: [
    { id: 'normal', nombre: 'Adulto sano', nota: 'Espresso ≈60–100 mg; café de filtro 95–200 mg; té 30–50 mg; lata de cola ≈35 mg; energética de 250 mL ≈80 mg.', duracion: 4 },
    { id: 'fumador', nombre: 'Persona fumadora', nota: 'El humo induce CYP1A2: la cafeína se elimina casi el doble de rápido (t½ ≈3 h).', pk: { t12: 3 }, duracion: 3 },
    { id: 'anticonceptivo', nombre: 'Anticonceptivos orales', nota: 'Los estrógenos inhiben CYP1A2: la vida media casi se duplica (≈9 h).', pk: { t12: 9 }, duracion: 6 },
    { id: 'embarazo', nombre: 'Tercer trimestre de embarazo', nota: 'La vida media puede llegar a ≈15 h. Recomendación EFSA: no más de 200 mg/día.', pk: { t12: 15 }, duracion: 8 }
  ],
  pd: { ec50: 2.5, n: 1.2, emax: 100 },
  tol: { kdes: 0.02, krec: 0.05, rmin: 0.75, nombre: 'Desensibilización de receptores' },
  oponentes: [
    { gamma: 0.15, tau: 8, nombre: 'Bajón vespertino (horas)' },
    { gamma: 0.65, tau: 40, nombre: 'Upregulation de A1 (días)' }
  ],
  habito: { k: 0.0025, vida: 120 },
  canales: [
    { id: 'nervios', nombre: 'Nerviosismo, ansiedad, taquicardia', ec50: 9, n: 2.2, tol: 'R', conc: 'C', color: '#D85A30' },
    { id: 'toxico', nombre: 'Toxicidad (arritmias, convulsiones)', ec50: 60, n: 4, tol: 'none', conc: 'C', umbral: 50, color: '#E24B4A' }
  ],
  bandasConc: [
    { desde: 1, hasta: 10, texto: 'Rango habitual (1–10 mg/L)', nivel: 'info' },
    { desde: 15, hasta: 80, texto: 'Efectos tóxicos (> 15 mg/L)', nivel: 'peligro' },
    { desde: 80, hasta: 1000, texto: 'Potencialmente letal (> 80 mg/L)', nivel: 'critico' }
  ],
  limites: { dosis: [20, 400, 5], porSesion: [1, 10], intervalo: [0.5, 6, 0.5] },
  presets: [
    { id: 'habitual', nombre: '3 cafés al día', desc: '3 cafés de ≈95 mg (8:00, 11:30 y 15:00) durante 4 meses.', cfg: { forma: 'normal', dosis: 95, porSesion: 3, intervalo: 3.5, inicio: 8, frecuencia: 'diario', horizonte: 120 } },
    { id: 'uno', nombre: '1 café al día', desc: 'Un café de ≈95 mg al desayuno.', cfg: { forma: 'normal', dosis: 95, porSesion: 1, intervalo: 1, inicio: 8, frecuencia: 'diario', horizonte: 90 } },
    { id: 'alto', nombre: 'Consumo alto (6 cafés)', desc: '6 cafés de ≈95 mg (≈570 mg/día, por encima de lo recomendado).', cfg: { forma: 'normal', dosis: 95, porSesion: 6, intervalo: 2, inicio: 7, frecuencia: 'diario', horizonte: 90 } },
    { id: 'dejar', nombre: '3 cafés y dejarlo', desc: '3 cafés al día durante dos meses y abandono el día 60.', cfg: { forma: 'normal', dosis: 95, porSesion: 3, intervalo: 3.5, inicio: 8, frecuencia: 'diario', horizonte: 90, dejar: 60 } },
    { id: 'laborables', nombre: 'Solo días laborables', desc: '3 cafés de lunes a viernes: el dolor de cabeza del sábado.', cfg: { forma: 'normal', dosis: 95, porSesion: 3, intervalo: 3.5, inicio: 8, frecuencia: 'laborables', horizonte: 60 } }
  ],
  neuroquimicos: [
    { nombre: 'Adenosina (bloqueada)', dir: '-', peso: 1, fuente: 'efecto', rol: 'Menos sueño', detalle: 'Antagonismo competitivo A1/A2A: desaparece la «presión de sueño».' },
    { nombre: 'Dopamina (estriado)', dir: '+', peso: 0.6, fuente: 'efecto', rol: 'Motivación', detalle: 'Bloqueo de A2A en heterómeros A2A-D2: potencia la señal D2 sin liberar mucha dopamina (Volkow et al., 2015: aumento de la disponibilidad de D2/D3).' },
    { nombre: 'Noradrenalina', dir: '+', peso: 0.7, fuente: 'efecto', rol: 'Alerta', detalle: 'Desinhibición del locus coeruleus por bloqueo de A1.' },
    { nombre: 'Acetilcolina cortical', dir: '+', peso: 0.6, fuente: 'efecto', rol: 'Atención', detalle: 'Bloqueo de A1 presinápticos en la corteza y el hipocampo.' },
    { nombre: 'Glutamato', dir: '+', peso: 0.5, fuente: 'efecto', rol: 'Activación', detalle: 'Aumento de la liberación por bloqueo de A1 presinápticos.' },
    { nombre: 'Adrenalina / cortisol', dir: '+', peso: 0.5, fuente: 'efecto', rol: 'Pulso, tensión', detalle: 'Liberación suprarrenal; la tolerancia a la subida de tensión aparece en 1–4 días.' },
    { nombre: 'Adenosina (rebote)', dir: '+', peso: 1, fuente: 'malestar', rol: 'Somnolencia, cefalea', detalle: 'Con más receptores A1/A2A, la adenosina endógena produce más somnolencia y vasodilatación cerebral (dolor de cabeza).' }
  ],
  adaptaciones: [
    { nombre: 'Receptores de adenosina', rol: 'más receptores (upregulation)', fuente: 'B', a: 100, b: 90, max: 200, sufijo: '%', detalle: 'Aumento de receptores A1 en el cerebro con la administración crónica (modelos animales y humanos).' },
    { nombre: 'Cansancio sin cafeína', rol: 'somnolencia, cefalea', fuente: 'B', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Fuerza del hábito', rol: 'rutina del café', fuente: 'H', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Sensibilidad a la cafeína', rol: 'receptores no desensibilizados', fuente: 'R', a: 0, b: 100, max: 100, sufijo: '%' }
  ],
  fases: [
    { t0: 0, t1: 0.3, nombre: 'Absorción', texto: 'Casi el 100 % se absorbe en el intestino.' },
    { t0: 0.3, t1: 1, nombre: 'Subida', texto: 'Aumenta la alerta; en habituales desaparece el cansancio de la abstinencia matinal.' },
    { t0: 1, t1: 3, nombre: 'Meseta', texto: 'Máxima concentración (Tmax 30–60 min) y efecto sostenido.' },
    { t0: 3, t1: 8, nombre: 'Eliminación lenta', texto: 'Con t½ de unas 5 h, a las 10 h todavía queda una cuarta parte: afecta al sueño aunque no lo notes.' }
  ],
  abstinencia: {
    inicio: '12–24 h', pico: '20–51 h', duracion: '2–9 días', peligrosa: false,
    sintomas: ['Dolor de cabeza (el más frecuente)', 'Cansancio y somnolencia', 'Bajo ánimo, irritabilidad', 'Dificultad de concentración', 'Síntomas pseudogripales, náuseas'],
    texto: 'Aparece incluso con consumos de unos 100 mg/día (un café). Está reconocida en el DSM-5. Se evita reduciendo el consumo de forma gradual a lo largo de 1–2 semanas.'
  },
  riesgos: {
    agudos: ['Nerviosismo, ansiedad, temblor', 'Taquicardia, palpitaciones', 'Insomnio (aunque se tome 6 horas antes de dormir)', 'Reflujo y molestias gástricas', 'Intoxicación con > 1 g: vómitos, arritmias, convulsiones; dosis letales ≈5–10 g'],
    cronicos: ['Peor calidad de sueño', 'Ansiedad en personas predispuestas', 'En el embarazo, consumos > 200 mg/día se asocian a menor peso al nacer'],
    alarma: ['Palpitaciones fuertes, dolor en el pecho, confusión o convulsiones tras tomar cafeína en polvo o pastillas → 112', 'La cafeína en polvo pura es peligrosa: una cucharadita puede contener varios gramos']
  },
  interacciones: [
    { con: 'Fluvoxamina', gravedad: 'alta', efecto: 'Multiplica por ≈5 la vida media de la cafeína: intoxicación con consumos normales.', mecanismo: 'Inhibición potente de CYP1A2.' },
    { con: 'Ciprofloxacino, enoxacino', gravedad: 'moderada', efecto: 'Aumentan los niveles de cafeína.', mecanismo: 'Inhibición de CYP1A2.' },
    { con: 'Dejar de fumar', gravedad: 'moderada', efecto: 'El mismo consumo de café produce más nerviosismo e insomnio al dejar el tabaco.', mecanismo: 'Desaparece la inducción de CYP1A2 por el humo.' },
    { con: 'Litio', gravedad: 'moderada', efecto: 'Reducir bruscamente el café puede subir los niveles de litio.', mecanismo: 'La cafeína aumenta el aclaramiento renal de litio.' },
    { con: 'Alcohol', gravedad: 'moderada', efecto: 'Enmascara la somnolencia del alcohol pero no el deterioro: más riesgo de conducir o beber de más.', mecanismo: 'Antagonismo de la adenosina que el alcohol aumenta.' },
    { con: 'Otros estimulantes (efedrina, anfetaminas)', gravedad: 'alta', efecto: 'Suman efectos cardiovasculares.', mecanismo: 'Efecto simpaticomimético aditivo.' }
  ],
  mitos: [
    { mito: 'La cafeína da energía.', realidad: 'No aporta energía: bloquea la señal de cansancio. En consumidores habituales, gran parte de lo que sienten con el primer café es el alivio de su propia abstinencia nocturna (James y Rogers, 2005).' },
    { mito: 'El café deshidrata.', realidad: 'En consumidores habituales y con cantidades moderadas, el café hidrata de forma comparable al agua (Killer et al., 2014). La tolerancia al efecto diurético aparece rápido.' },
    { mito: 'El descafeinado no tiene cafeína.', realidad: 'Tiene poca, pero no cero: unos 2–15 mg por taza.' },
    { mito: 'Si tomo café por la tarde y duermo, no me afecta.', realidad: 'Aunque te duermas, reduce el sueño profundo. 400 mg tomados 6 horas antes de acostarse redujeron el sueño en más de una hora (Drake et al., 2013).' }
  ],
  historiaPreset: 'dejar',
  historia: [
    { dia: 0, titulo: 'El primer día', texto: 'Sin adaptación, los 3 cafés bloquean la adenosina y producen un aumento real de la alerta. La costumbre está a cero.' },
    { dia: 4, titulo: 'Cuatro días', texto: 'La tolerancia de la cafeína es rápida: en pocos días el cerebro ya ha añadido receptores de adenosina. La alerta neta ha bajado mucho.' },
    { dia: 30, titulo: 'Un mes', texto: 'Equilibrio: el café de la mañana, sobre todo, devuelve a la persona a su nivel normal. Fíjate en el naranja entre la noche y el primer café: es la abstinencia nocturna.' },
    { dia: 61, titulo: 'Primer día sin café', texto: 'Los receptores extra siguen ahí y reciben toda la adenosina: dolor de cabeza, sueño y mal humor. Es el pico de la abstinencia (20–51 h).' },
    { dia: 68, titulo: 'Una semana después', texto: 'Los receptores vuelven a su número normal y desaparece el malestar. Un café ahora volvería a dar un efecto claro.' }
  ],
  farmaco: {
    tabla: [
      ['Biodisponibilidad', '≈99–100 %'],
      ['Tmax', '30–60 min (15–120 según la bebida)'],
      ['Vida media', '3–6 h (adultos); ≈3 h en fumadores; ≈9 h con anticonceptivos; hasta 15 h al final del embarazo; > 50 h en recién nacidos'],
      ['Volumen de distribución', '0,6–0,7 L/kg (agua corporal)'],
      ['Unión a proteínas', '10–35 %'],
      ['Metabolismo', 'CYP1A2 (≈95 %): paraxantina 84 %, teobromina 12 %, teofilina 4 %'],
      ['Genética', 'CYP1A2*1F (metabolizador rápido) y variantes de ADORA2A influyen en la sensibilidad y la ansiedad'],
      ['Concentración tras 100 mg', '≈1,5–2 mg/L'],
      ['Límite seguro (EFSA)', '400 mg/día en adultos; 200 mg por toma; 200 mg/día en el embarazo'],
      ['Toxicidad', 'Síntomas > 15 mg/L; letal > 80 mg/L (≈5–10 g ingeridos)']
    ],
    afinidad: [
      { diana: 'Adenosina A2A', accion: 'Antagonista', ki: '≈2–20 µM', nivel: 2 },
      { diana: 'Adenosina A1', accion: 'Antagonista', ki: '≈12–40 µM', nivel: 2 },
      { diana: 'Adenosina A2B / A3', accion: 'Antagonista débil', ki: '> 30 µM', nivel: 1 },
      { diana: 'Fosfodiesterasas', accion: 'Inhibidor', ki: '≈0,5–1 mM (solo tóxico)', nivel: 1 },
      { diana: 'Receptor de rianodina', accion: 'Activador', ki: 'mM (solo tóxico)', nivel: 1 }
    ],
    metabolismo: 'Cafeína → <b>paraxantina</b> (N3-desmetilación, CYP1A2, 84 %; también activa y estimulante), <b>teobromina</b> (12 %) y <b>teofilina</b> (4 %, broncodilatadora). Posteriormente metabolizadas por CYP1A2, CYP2E1, xantina oxidasa y NAT2. Menos del 3 % se excreta sin cambios en la orina.'
  },
  tratamiento: 'No suele requerir tratamiento. Para dejarla, reducir la dosis un 10–25 % cada pocos días evita la abstinencia.',
  escalas: { dependencia: 2, abstinencia: 1, toxicidad: 2 }, nutt: null,
  referencias: [
    'Fredholm BB et al. Actions of caffeine in the brain with special reference to factors that contribute to its widespread use. Pharmacol Rev. 1999;51(1):83-133.',
    'Juliano LM, Griffiths RR. A critical review of caffeine withdrawal: empirical validation of symptoms and signs, incidence, severity, and associated features. Psychopharmacology. 2004;176(1):1-29.',
    'James JE, Rogers PJ. Effects of caffeine on performance and mood: withdrawal reversal is the most plausible explanation. Psychopharmacology. 2005;182(1):1-8.',
    'Rogers PJ et al. Association of the anxiogenic and alerting effects of caffeine with ADORA2A and ADORA1 polymorphisms and habitual level of caffeine consumption. Neuropsychopharmacology. 2010;35(9):1973-1983.',
    'Robertson D et al. Tolerance to the humoral and hemodynamic effects of caffeine in man. J Clin Invest. 1981;67(4):1111-1117.',
    'EFSA Panel on Dietetic Products. Scientific opinion on the safety of caffeine. EFSA J. 2015;13(5):4102.',
    'Nehlig A. Interindividual differences in caffeine metabolism and factors driving caffeine consumption. Pharmacol Rev. 2018;70(2):384-411.',
    'Killer SC, Blannin AK, Jeukendrup AE. No evidence of dehydration with moderate daily coffee intake. PLoS One. 2014;9(1):e84154.',
    'Drake C et al. Caffeine effects on sleep taken 0, 3, or 6 hours before going to bed. J Clin Sleep Med. 2013;9(11):1195-1200.',
    'Volkow ND et al. Caffeine increases striatal dopamine D2/D3 receptor availability in the human brain. Transl Psychiatry. 2015;5:e549.'
  ]
});
