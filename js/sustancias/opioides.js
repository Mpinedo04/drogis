NT.registrar({
  id: 'opioides', numero: 10, simbolo: 'Op', nombre: 'Opioides', color: '#E24B4A',
  subtitulo: 'Heroína, morfina, metadona (y fentanilo como adulterante)',
  categoria: 'opioide', formula: 'C₂₁H₂₃NO₅ (heroína)', masaMolar: 369.41,
  ficha: { vidaMedia: 'Heroína minutos → morfina 2–3 h; metadona 15–60 h', duracion: '3–5 h (heroína)', inicio: 'Segundos a minutos' },
  etiquetas: {
    efecto: 'Euforia / alivio', neto: 'Euforia neta', malestar: 'Abstinencia («mono»)',
    aporte: 'Lo que aporta un día de consumo la primera vez', costumbre: 'Línea de costumbre', tolerancia: 'Receptores μ desensibilizados'
  },
  resumen: {
    basico: 'Los opioides activan los receptores μ, los mismos que usan las endorfinas: alivian el dolor y producen una euforia cálida. La tolerancia es de las más intensas que existen y la abstinencia («mono») aparece en horas. El gran peligro: tras unos días sin consumir la tolerancia se pierde y la dosis de siempre puede parar la respiración.',
    principiante: 'El cuerpo fabrica sus propios opioides, las [[endorfinas]], para calmar el dolor y dar bienestar. La heroína, la morfina o la metadona activan los mismos [[receptores|receptor]] μ, pero con mucha más fuerza y duración. Eso apaga las neuronas que frenan a la [[dopamina]] (euforia) y también el centro del tronco cerebral que controla la respiración. Con el uso diario las neuronas se adaptan con rapidez: los receptores se [[desensibilizan|desensibilizacion]] y se internalizan, y las células aceleran su maquinaria para compensar. Sin la sustancia, esa maquinaria acelerada provoca el «mono»: sudor, dolores, diarrea, ansiedad, insomnio. Lo más importante: la [[tolerancia]] a la [[depresión respiratoria]] también se pierde en días. Tras una desintoxicación, una salida de prisión o un ingreso, volver a la dosis de antes es la causa más típica de muerte por sobredosis. La [[naloxona]] la revierte.',
    pro: 'Agonistas del receptor μ (MOR, Gi/o): inhiben la adenilil ciclasa, abren canales GIRK y cierran canales de Ca²⁺ presinápticos. En el VTA, la hiperpolarización de interneuronas GABA desinhibe las neuronas dopaminérgicas; en el complejo preBötzinger y el núcleo parabraquial, la inhibición de neuronas generadoras del ritmo produce depresión respiratoria. La heroína (diacetilmorfina) es un profármaco liposoluble que cruza rápido la barrera hematoencefálica y se desacetila a 6-monoacetilmorfina (6-MAM) y morfina (y M6G, activo). Tolerancia: fosforilación del MOR por GRK y PKC, reclutamiento de β-arrestina, internalización, desacoplamiento de la proteína G y superactivación compensadora de la adenilil ciclasa (base celular de la abstinencia, con hiperactividad del locus coeruleus). Neuroadaptación del sistema dinorfina/KOR y CRF (componente disfórico). La tolerancia a la depresión respiratoria es menos completa y se pierde de forma relativamente rápida con la abstinencia.'
  },
  basico: 'Línea morada: lo que aporta un día de consumo la primera vez (100 %). Línea ámbar: la costumbre, que sube muy rápido y pronto supera lo que aporta la sustancia: consumir ya solo alivia el «mono» (naranja). Mira también el panel de riesgo: tras dejarlo, la tolerancia respiratoria se pierde.',
  mecanismo: {
    simple: 'Activa los receptores μ de las endorfinas (agonista): calma el dolor, da euforia y frena la respiración.',
    pro: 'Agonismo μ (morfina Ki ≈ 1–5 nM; 6-MAM similar; fentanilo ≈ 1 nM con mucha mayor liposolubilidad y potencia ≈ 50–100 veces la de la morfina). Los efectos con poca o nula tolerancia (miosis, estreñimiento) se mantienen en consumidores crónicos.'
  },
  sinapsis: {
    tipo: 'agonista', nt: { nombre: 'Endorfinas', color: '#1D9E75' }, droga: { nombre: 'Opioide', color: '#E24B4A' },
    receptor: 'Receptor opioide μ', transportador: false, cronicoReceptores: 0.6, cronicoDesens: 0.45, tasaDroga: 3.5,
    senal: 'Activación de receptores μ',
    textos: {
      sin: 'Las endorfinas (círculos verdes) se liberan en pequeñas cantidades ante el dolor o el esfuerzo y activan brevemente los receptores μ.',
      con: 'El opioide (rombos) activa muchos más receptores y durante más tiempo. La neurona se inhibe con fuerza: menos dolor, euforia cálida, y también una respiración más lenta.',
      cronico: 'Con el consumo diario los receptores se internalizan (hay menos) y muchos quedan desensibilizados (grises). La célula acelera su maquinaria para compensar: sin opioide, esa maquinaria acelerada produce el síndrome de abstinencia.'
    }
  },
  unidades: { dosis: 'mg', dosisNombre: 'dosis', dosisPlural: 'Dosis', conc: 'ng/mL eq.', concNombre: 'Opioide activo (equivalentes de morfina)', sesion: 'día' },
  formaEtiqueta: 'Sustancia / vía',
  pk: { F: 0.45, ka: 40, lag: 0, t12: 2.5, Vd: 3.5, ke0: 6, cf: 770 },
  formas: [
    { id: 'fumada', nombre: 'Heroína fumada («chino»)', nota: 'Dosis en mg de heroína. La pureza en la calle es muy variable y puede contener fentanilo o nitacenos, cientos de veces más potentes.', duracion: 4 },
    { id: 'nasal', nombre: 'Heroína esnifada', nota: 'Absorción algo más lenta que fumada.', pk: { F: 0.5, ka: 6, ke0: 4 }, duracion: 4 },
    { id: 'iv', nombre: 'Heroína inyectada', nota: 'Efecto en segundos y la vía con más riesgo de sobredosis y de infecciones (VIH, hepatitis C).', pk: { F: 1, ka: 200, ke0: 8 }, duracion: 4 },
    { id: 'metadona', nombre: 'Metadona oral (tratamiento)', nota: 'Agonista de acción larga usado como tratamiento: niveles estables, sin subidones ni «monos». Concentraciones en ng/mL de metadona.', pk: { F: 0.8, ka: 1, lag: 0.3, t12: 24, Vd: 4, ke0: 0.5, cf: 1000 }, pd: { ec50: 120 }, canales: { resp: { ec50: 320 }, gi: { ec50: 80 } }, duracion: 24 }
  ],
  pd: { ec50: 10, n: 1.5, emax: 100 },
  tol: { kdes: 0.05, krec: 0.0072, rmin: 0.35, nombre: 'Desensibilización e internalización de μ (euforia)' },
  tol2: { kdes: 0.04, krec: 0.0096, rmin: 0.25, nombre: 'Tolerancia a la depresión respiratoria' },
  oponentes: [
    { gamma: 0.5, tau: 8, nombre: 'Abstinencia entre dosis (horas)' },
    { gamma: 0.6, tau: 168, nombre: 'Alostasis: AC superactivada, dinorfina, CRF (semanas)' }
  ],
  habito: { k: 0.012, vida: 365 },
  canales: [
    { id: 'resp', nombre: 'Depresión respiratoria', ec50: 40, n: 2.5, tol: 'R2', umbral: 50, color: '#E24B4A' },
    { id: 'gi', nombre: 'Estreñimiento / miosis (sin tolerancia)', ec50: 6, n: 1.5, tol: 'none', color: '#888780' }
  ],
  bandasConc: [],
  limites: { dosis: [2, 150, 1], porSesion: [1, 6], intervalo: [2, 12, 0.5] },
  presets: [
    { id: 'recaida', nombre: 'Abstinencia y recaída', desc: '40 mg fumados 3 veces al día; abandono el día 90 y vuelta a la misma dosis el día 111. Mira el riesgo respiratorio de ese día. (Los primeros días, sin tolerancia, esa dosis ya sería peligrosa.)', cfg: { forma: 'fumada', dosis: 40, porSesion: 3, intervalo: 6, inicio: 9, frecuencia: 'diario', horizonte: 130, dejar: 90, reanudar: 111 } },
    { id: 'dependencia', nombre: 'Dependencia diaria', desc: '40 mg fumados 3 veces al día durante 4 meses.', cfg: { forma: 'fumada', dosis: 40, porSesion: 3, intervalo: 6, inicio: 9, frecuencia: 'diario', horizonte: 120 } },
    { id: 'inicio', nombre: 'Primeros consumos', desc: '10 mg fumados los viernes y sábados.', cfg: { forma: 'fumada', dosis: 10, porSesion: 1, intervalo: 1, inicio: 22, frecuencia: 'finde', horizonte: 90 } },
    { id: 'metadona', nombre: 'Tratamiento con metadona', desc: 'Metadona oral 60 mg una vez al día: concentraciones estables y sin abstinencia entre dosis.', cfg: { forma: 'metadona', dosis: 60, porSesion: 1, intervalo: 1, inicio: 9, frecuencia: 'diario', horizonte: 90 } }
  ],
  neuroquimicos: [
    { nombre: 'Opioides (receptor μ)', dir: '+', peso: 1, fuente: 'efecto', rol: 'Euforia, calma, analgesia', detalle: 'Agonismo μ en el VTA, el núcleo accumbens, la sustancia gris periacueductal y la médula espinal.' },
    { nombre: 'Dopamina (accumbens)', dir: '+', peso: 0.7, fuente: 'efecto', rol: 'Refuerzo', detalle: 'Desinhibición de las neuronas del VTA por inhibición de interneuronas GABA.' },
    { nombre: 'GABA (VTA)', dir: '-', peso: 0.7, fuente: 'efecto', rol: 'Menos freno', detalle: 'Hiperpolarización de interneuronas GABA mediante canales GIRK.' },
    { nombre: 'Noradrenalina (locus coeruleus)', dir: '-', peso: 0.8, fuente: 'efecto', rol: 'Calma, somnolencia', detalle: 'Inhibición aguda del locus coeruleus.' },
    { nombre: 'Histamina', dir: '+', peso: 0.4, fuente: 'efecto', rol: 'Picor, rubor', detalle: 'Liberación desde mastocitos (morfina y heroína).' },
    { nombre: 'Noradrenalina (rebote)', dir: '+', peso: 1, fuente: 'malestar', rol: 'Sudor, taquicardia, ansiedad', detalle: 'Superactivación del AMPc en el locus coeruleus durante la abstinencia; base del uso de clonidina y lofexidina.' },
    { nombre: 'Dinorfina / CRF', dir: '+', peso: 0.8, fuente: 'malestar', rol: 'Disforia', detalle: 'Reclutamiento del sistema κ y del CRF: componente emocional negativo de la abstinencia.' }
  ],
  adaptaciones: [
    { nombre: 'Receptores μ funcionales', rol: 'desensibilización e internalización', fuente: 'R', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Tolerancia respiratoria', rol: '¡se pierde en días!', fuente: 'R2', a: 100, b: -100, max: 100, sufijo: '%', detalle: 'La protección frente a la depresión respiratoria cae rápidamente tras la abstinencia: el riesgo de muerte por sobredosis es 3–8 veces mayor en las dos semanas siguientes a salir de prisión (Merrall et al., 2010).' },
    { nombre: '«Mono» / malestar', rol: 'abstinencia', fuente: 'B', a: 0, b: 100, max: 120, sufijo: '%' },
    { nombre: 'Fuerza del hábito', rol: 'craving muy persistente', fuente: 'H', a: 0, b: 100, max: 100, sufijo: '%' }
  ],
  fases: [
    { t0: 0, t1: 0.05, nombre: 'Subidón', texto: 'Oleada de calor y placer en segundos o minutos (fumada o inyectada).' },
    { t0: 0.05, t1: 1, nombre: 'Efecto principal', texto: 'Calma profunda, ausencia de dolor y de preocupaciones, pupilas puntiformes.' },
    { t0: 1, t1: 4, nombre: 'Somnolencia', texto: 'Cabeceos, respiración más lenta. Momento de mayor riesgo si se combina con otros depresores.' },
    { t0: 4, t1: 12, nombre: 'Bajada / mono', texto: 'En personas con dependencia, a las 6–12 h aparecen bostezos, lagrimeo, sudor e inquietud.' }
  ],
  abstinencia: {
    inicio: '6–12 h (heroína); 24–48 h (metadona)', pico: '1–3 días', duracion: '5–10 días (síntomas prolongados de ánimo y sueño durante meses)', peligrosa: false,
    sintomas: ['Bostezos, lagrimeo, moqueo', 'Sudor, piel de gallina, escalofríos', 'Dolores musculares y óseos', 'Diarrea, náuseas, vómitos, calambres', 'Pupilas dilatadas', 'Ansiedad, irritabilidad, insomnio', 'Craving intenso'],
    texto: 'Muy desagradable pero rara vez mortal en adultos sanos (puede serlo por deshidratación o en personas frágiles). El gran peligro asociado es la pérdida de tolerancia: tras la abstinencia, la dosis habitual puede producir una sobredosis.'
  },
  riesgos: {
    agudos: ['Sobredosis: depresión respiratoria, hipoxia, muerte', 'Mucho más riesgo combinado con alcohol, benzodiacepinas o pregabalina', 'Adulteración con fentanilo o nitacenos (potencias imprevisibles)', 'Aspiración del vómito'],
    cronicos: ['Adicción grave', 'Infecciones por inyección: VIH, hepatitis C, endocarditis, abscesos', 'Estreñimiento crónico, hipogonadismo', 'Hiperalgesia inducida por opioides', 'Riesgo de sobredosis tras periodos de abstinencia'],
    alarma: ['No responde, respira muy lento o hace ruidos de ronquido, labios azules, pupilas puntiformes → 112 y naloxona si la hay', 'Tras dar naloxona, quedarse con la persona: el efecto de la naloxona dura menos que el del opioide']
  },
  interacciones: [
    { con: 'Benzodiacepinas', gravedad: 'critica', efecto: 'Depresión respiratoria sinérgica: implicadas en una gran proporción de muertes por sobredosis.', mecanismo: 'Potenciación GABA-A + agonismo μ sobre los centros respiratorios. Advertencia de recuadro negro de la FDA (2016).' },
    { con: 'Alcohol, GHB, pregabalina, gabapentina', gravedad: 'critica', efecto: 'Depresión respiratoria y muerte.', mecanismo: 'Depresión aditiva del SNC.' },
    { con: 'Cocaína («speedball»)', gravedad: 'critica', efecto: 'Al pasar el efecto de la cocaína queda el del opioide: sobredosis retardada.', mecanismo: 'Duraciones diferentes.' },
    { con: 'Inhibidores de CYP3A4 (ritonavir, claritromicina, ketoconazol)', gravedad: 'alta', efecto: 'Aumentan los niveles de metadona, fentanilo y oxicodona.', mecanismo: 'Inhibición metabólica.' },
    { con: 'Inductores (rifampicina, carbamazepina, efavirenz)', gravedad: 'alta', efecto: 'Bajan los niveles de metadona: síndrome de abstinencia.', mecanismo: 'Inducción de CYP3A4/2B6.' },
    { con: 'Naltrexona, naloxona, buprenorfina (en quien usa agonistas completos)', gravedad: 'alta', efecto: 'Abstinencia precipitada brusca.', mecanismo: 'Desplazan al agonista del receptor μ.' }
  ],
  mitos: [
    { mito: 'Si ya tengo tolerancia, mi dosis de siempre es segura.', realidad: 'La tolerancia a la depresión respiratoria es parcial y se pierde en días. Tras desintoxicación, prisión u hospital, la dosis «de siempre» es la primera causa de muerte por sobredosis. Además, la pureza cambia y puede haber fentanilo.' },
    { mito: 'Fumar heroína no es tan peligroso como inyectarla.', realidad: 'Evita infecciones, pero la dependencia y la sobredosis también ocurren fumando.' },
    { mito: 'La metadona es cambiar una droga por otra.', realidad: 'El tratamiento con agonistas (metadona, buprenorfina) reduce la mortalidad a la mitad o más (Sordo et al., 2017), la delincuencia y las infecciones. Es el tratamiento más eficaz que existe.' },
    { mito: 'La naloxona anima a consumir.', realidad: 'Los programas de naloxona reducen las muertes sin aumentar el consumo.' }
  ],
  historiaPreset: 'recaida',
  historia: [
    { dia: 0, titulo: 'Primeros días', texto: 'Sin tolerancia, la dosis produce mucha euforia, pero el canal de depresión respiratoria (panel de riesgo) ya está alto: una persona sin tolerancia está en riesgo con esa dosis.' },
    { dia: 20, titulo: 'Tres semanas', texto: 'La costumbre ha subido casi hasta lo que aporta el opioide. Entre dosis aparece el mono (naranja). Se consume para no estar mal.' },
    { dia: 85, titulo: 'Tres meses', texto: 'La costumbre supera lo que aporta la sustancia: incluso consumiendo, apenas se llega al nivel natural. La tolerancia respiratoria protege frente a la dosis habitual.' },
    { dia: 92, titulo: 'Dos días sin consumir', texto: 'Pico del mono: sudor, dolores, diarrea, ansiedad. Es muy duro, pero rara vez es mortal.' },
    { dia: 111, titulo: 'Recaída tras tres semanas', texto: 'La tolerancia respiratoria se ha perdido en buena parte. La misma dosis que antes era «normal» lleva la depresión respiratoria por encima del umbral de riesgo. Por eso las sobredosis se concentran tras periodos de abstinencia. Naloxona y nunca consumir solo.' }
  ],
  farmaco: {
    tabla: [
      ['Heroína', 't½ ≈ 3–8 min → 6-MAM (t½ ≈ 6–25 min) → morfina (t½ ≈ 2–3 h)'],
      ['Morfina', 'F oral ≈ 25–30 %; Vd ≈ 3–5 L/kg; glucuronidación UGT2B7 a M3G (inactivo, neuroexcitador) y M6G (activo)'],
      ['Metadona', 'F oral ≈ 70–90 %; t½ 15–60 h (media ≈24 h); CYP3A4, CYP2B6; prolonga el QT'],
      ['Fentanilo', '≈50–100 veces la potencia de la morfina; muy liposoluble; inicio rápido'],
      ['Buprenorfina', 'Agonista parcial μ de alta afinidad: efecto techo sobre la respiración'],
      ['Naloxona', 'Antagonista μ; acción 30–90 min (más corta que muchos opioides)'],
      ['Unidades del modelo', 'Opioide activo en «equivalentes de morfina» (aproximación conceptual)']
    ],
    afinidad: [
      { diana: 'Receptor μ (MOR)', accion: 'Agonista completo', ki: '≈1–5 nM (morfina, 6-MAM)', nivel: 5 },
      { diana: 'Receptor δ (DOR)', accion: 'Agonista débil', ki: '≈100–500 nM', nivel: 3 },
      { diana: 'Receptor κ (KOR)', accion: 'Agonista débil', ki: '≈100–600 nM', nivel: 3 },
      { diana: 'NMDA (metadona d-isómero)', accion: 'Antagonista', ki: 'µM', nivel: 2 }
    ],
    metabolismo: 'Heroína → <b>6-monoacetilmorfina</b> (esterasas plasmáticas y hepáticas, minutos; marcador específico de heroína) → <b>morfina</b> (hCE-1/hCE-2) → morfina-3-glucurónido y <b>morfina-6-glucurónido</b> (UGT2B7; el M6G es activo y se acumula en insuficiencia renal). La metadona se metaboliza por CYP3A4 y CYP2B6 a EDDP inactivo, con gran variabilidad entre personas.'
  },
  tratamiento: 'Tratamiento con agonistas opioides (metadona, buprenorfina): reduce la mortalidad a la mitad o más. Naloxona para revertir sobredosis. Naltrexona de liberación prolongada en casos seleccionados. Programas de reducción de daños: material estéril, salas de consumo supervisado, análisis de sustancias.',
  escalas: { dependencia: 5, abstinencia: 3, toxicidad: 5 }, nutt: 55, nuttNombre: 'Heroína',
  referencias: [
    'Williams JT et al. Regulation of μ-opioid receptors: desensitization, phosphorylation, internalization, and tolerance. Pharmacol Rev. 2013;65(1):223-254.',
    'Rook EJ et al. Pharmacokinetics and pharmacokinetic variability of heroin and its metabolites: review of the literature. Curr Clin Pharmacol. 2006;1(1):109-118.',
    'Dahan A, Aarts L, Smith TW. Incidence, reversal, and prevention of opioid-induced respiratory depression. Anesthesiology. 2010;112(1):226-238.',
    'Merrall ELC et al. Meta-analysis of drug-related deaths soon after release from prison. Addiction. 2010;105(9):1545-1554.',
    'Sordo L et al. Mortality risk during and after opioid substitution treatment: systematic review and meta-analysis. BMJ. 2017;357:j1550.',
    'Koob GF, Volkow ND. Neurobiology of addiction: a neurocircuitry analysis. Lancet Psychiatry. 2016;3(8):760-773.',
    'Kosten TR, George TP. The neurobiology of opioid dependence: implications for treatment. Sci Pract Perspect. 2002;1(1):13-20.',
    'Hill R et al. Ethanol reversal of tolerance to the respiratory depressant effects of morphine. Neuropsychopharmacology. 2016;41(3):762-773.',
    'U.S. FDA. Drug Safety Communication: FDA warns about serious risks and death when combining opioid pain or cough medicines with benzodiazepines. 2016.'
  ]
});
