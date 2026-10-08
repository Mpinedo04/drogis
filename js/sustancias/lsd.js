NT.registrar({
  id: 'lsd', numero: 6, simbolo: 'Ls', nombre: 'LSD', color: '#A35FD0',
  subtitulo: 'Dietilamida del ácido lisérgico (tripis, secantes)',
  categoria: 'psicodelico', formula: 'C₂₀H₂₅N₃O', masaMolar: 323.43,
  ficha: { vidaMedia: '≈3–4 h (plasma)', duracion: '8–12 h', inicio: '30–60 min' },
  etiquetas: {
    efecto: 'Intensidad del efecto', neto: 'Efecto que notas', malestar: 'Malestar (no hay abstinencia física)',
    aporte: 'Efecto de la dosis la primera vez', costumbre: 'Tolerancia', tolerancia: 'Receptores 5-HT2A no disponibles'
  },
  resumen: {
    basico: 'El LSD activa el receptor de serotonina 5-HT2A y se queda «atrapado» en él durante horas: por eso dura tanto con dosis de millonésimas de gramo. La tolerancia es casi completa a los 3–4 días seguidos y desaparece en 1–2 semanas, sin abstinencia física.',
    principiante: 'El LSD es una de las sustancias más potentes que se conocen: 100 microgramos (una décima de miligramo) producen 8–12 horas de efecto. Como la psilocibina, imita a la [[serotonina]] y activa sobre todo el [[receptor]] 5-HT2A, pero además el receptor «cierra una tapa» sobre la molécula y la retiene: por eso el efecto dura mucho más de lo que el LSD tarda en desaparecer de la sangre. También actúa sobre receptores de [[dopamina]]. La [[tolerancia]] es tan rápida que tomarlo al día siguiente apenas hace efecto, y además hay [[tolerancia cruzada]] con setas y mescalina. No produce [[abstinencia]] ni [[dependencia]] física.',
    pro: 'Ergolina semisintética; agonista parcial de alta afinidad en 5-HT2A, 5-HT2C, 5-HT1A, 5-HT2B, 5-HT6/7 y en receptores D1/D2. La estructura cristalina de LSD unido a 5-HT2B/5-HT2A (Wacker et al., 2017; Kim et al., 2020) muestra una «tapa» del bucle extracelular 2 que ralentiza la disociación (residencia de horas) y favorece la señalización por β-arrestina, lo que explica la larga duración y la histéresis antihoraria entre concentración plasmática y efecto. En humanos, la ketanserina bloquea los efectos subjetivos (Preller et al., 2017). Tolerancia: regulación a la baja de 5-HT2A, casi completa a los 3–4 días de dosis diarias y revertida en ≈4–7 días (Isbell, 1956).'
  },
  basico: 'Línea morada: el efecto de la dosis la primera vez (100 %). Línea ámbar: tolerancia. Al día siguiente de una toma la sensibilidad ha bajado a la mitad; en 1–2 semanas vuelve. No hay zona naranja: no existe abstinencia física.',
  mecanismo: {
    simple: 'Activa el receptor de serotonina 5-HT2A (agonista) y se queda unido mucho tiempo; también toca receptores de dopamina.',
    pro: 'Agonista parcial 5-HT2A (Ki ≈ 1–3 nM) con cinética de disociación muy lenta. Activa también D2 (Ki decenas de nM), que se ha relacionado con una fase tardía más «paranoide» en roedores (Marona-Lewicka et al., 2005).'
  },
  sinapsis: {
    tipo: 'agonista', nt: { nombre: 'Serotonina', color: '#378ADD' }, droga: { nombre: 'LSD', color: '#A35FD0' },
    receptor: 'Receptor 5-HT2A', transportadorNombre: 'transportador SERT', cronicoReceptores: 0.4, cronicoDesens: 0.1,
    senal: 'Activación 5-HT2A en la corteza', tasaDroga: 1.6,
    textos: {
      sin: 'La serotonina activa los receptores 5-HT2A un instante y se recapta.',
      con: 'Basta con muy pocas moléculas de LSD (rombos): cada una se queda unida al receptor mucho tiempo, como si el receptor le cerrara una tapa encima. La activación es larga y sostenida.',
      cronico: 'Tras un par de días seguidos, la neurona ha retirado muchos receptores 5-HT2A: la misma dosis apenas hace efecto. Tolerancia también para la psilocibina y la mescalina.'
    }
  },
  unidades: { dosis: 'µg', dosisNombre: 'dosis', dosisPlural: 'Tomas', conc: 'ng/mL', concNombre: 'LSD en plasma', sesion: 'sesión' },
  formaEtiqueta: 'Forma',
  pk: { F: 0.7, ka: 1.5, lag: 0.25, t12: 3.6, Vd: 0.4, ke0: 0.35, cf: 1 },
  formas: [
    { id: 'oral', nombre: 'Oral (secante, gota)', nota: 'Dosis en microgramos. El contenido real de los secantes varía mucho; algunos contienen NBOMe en lugar de LSD (más tóxicos).', duracion: 10 }
  ],
  pd: { ec50: 0.55, n: 1.8, emax: 100 },
  tol: { kdes: 0.14, krec: 0.0144, rmin: 0.05, nombre: 'Downregulation de 5-HT2A' },
  oponentes: [],
  habito: { k: 0.008, vida: 120 },
  canales: [
    { id: 'psico', nombre: 'Riesgo de reacción psicológica difícil', ec50: 1.6, n: 2.5, tol: 'R', umbral: 50, color: '#D85A30' },
    { id: 'cardio', nombre: 'Activación simpática (pulso, tensión, temperatura)', ec50: 1.2, n: 1.5, tol: 'none', color: '#BA7517' }
  ],
  bandasConc: [
    { desde: 0.3, hasta: 1, texto: 'Dosis bajas a moderadas (25–75 µg)', nivel: 'info' },
    { desde: 1, hasta: 6, texto: 'Dosis completas (100–200 µg)', nivel: 'aviso' }
  ],
  limites: { dosis: [5, 300, 5], porSesion: [1, 2], intervalo: [1, 6, 0.5] },
  presets: [
    { id: 'consecutivos', nombre: '4 días seguidos', desc: '100 µg cuatro días seguidos: tolerancia casi completa (como en los estudios de Isbell).', cfg: { forma: 'oral', dosis: 100, porSesion: 1, intervalo: 1, inicio: 12, frecuencia: 'diario', horizonte: 25, dejar: 4 } },
    { id: 'unica', nombre: 'Dosis única (100 µg)', desc: 'Una sola dosis de 100 µg.', cfg: { forma: 'oral', dosis: 100, porSesion: 1, intervalo: 1, inicio: 12, frecuencia: 'unica', horizonte: 21 } },
    { id: 'quincenal', nombre: 'Cada 2 semanas', desc: '100 µg cada 14 días.', cfg: { forma: 'oral', dosis: 100, porSesion: 1, intervalo: 1, inicio: 12, frecuencia: 'quincenal', horizonte: 120 } },
    { id: 'micro', nombre: 'Microdosis cada 3 días', desc: '10 µg cada 3 días.', cfg: { forma: 'oral', dosis: 10, porSesion: 1, intervalo: 1, inicio: 9, frecuencia: 'c3d', horizonte: 60 } },
    { id: 'redosis', nombre: 'Redosis al día siguiente', desc: '150 µg dos días seguidos: la segunda toma, pensada para «repetir», apenas hace efecto.', cfg: { forma: 'oral', dosis: 150, porSesion: 1, intervalo: 1, inicio: 12, frecuencia: 'diario', horizonte: 14, dejar: 2 } }
  ],
  neuroquimicos: [
    { nombre: 'Serotonina (5-HT2A)', dir: '+', peso: 1, fuente: 'efecto', rol: 'Percepción, significado', detalle: 'Agonismo parcial con residencia prolongada en el receptor; responsable de los efectos subjetivos (bloqueados por ketanserina).' },
    { nombre: 'Glutamato cortical', dir: '+', peso: 0.85, fuente: 'efecto', rol: 'Intensidad, pensamiento', detalle: 'Aumento de la transmisión glutamatérgica en la corteza prefrontal.' },
    { nombre: 'Filtro talámico', dir: '-', peso: 0.8, fuente: 'efecto', rol: 'Sobrecarga sensorial', detalle: 'Reducción del filtrado de información sensorial en el circuito cortico-estriado-tálamo-cortical (Preller et al., 2018).' },
    { nombre: 'Dopamina (D2, D1)', dir: '+', peso: 0.5, fuente: 'efecto', rol: 'Euforia, a veces suspicacia', detalle: 'Agonismo directo en D2; posible base de una fase tardía de suspicacia.' },
    { nombre: 'Noradrenalina', dir: '+', peso: 0.5, fuente: 'efecto', rol: 'Pulso, pupilas dilatadas', detalle: 'Activación simpática moderada: midriasis, taquicardia, aumento de temperatura.' },
    { nombre: 'Integración de la red por defecto', dir: '-', peso: 0.75, fuente: 'efecto', rol: 'Disolución del ego', detalle: 'Aumento de la conectividad global y disminución de la integridad de la DMN (Carhart-Harris et al., 2016).' },
    { nombre: 'Oxitocina / cortisol / prolactina', dir: '+', peso: 0.4, fuente: 'efecto', rol: 'Respuesta endocrina', detalle: 'Aumentos agudos descritos por Schmid et al. (2015).' }
  ],
  adaptaciones: [
    { nombre: 'Receptores 5-HT2A disponibles', rol: 'downregulation', fuente: 'R', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Tolerancia cruzada (psilocibina, mescalina)', rol: 'mismo receptor', fuente: 'R', a: 100, b: -100, max: 100, sufijo: '%' },
    { nombre: 'Malestar sin la sustancia', rol: 'no hay abstinencia física', fuente: 'B', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Hábito', rol: 'bajo potencial adictivo', fuente: 'H', a: 0, b: 100, max: 100, sufijo: '%' }
  ],
  fases: [
    { t0: 0, t1: 0.75, nombre: 'Latencia', texto: 'Absorción. Puede notarse inquietud o tensión corporal.' },
    { t0: 0.75, t1: 2, nombre: 'Subida', texto: 'Cambios visuales y emocionales crecientes.' },
    { t0: 2, t1: 6, nombre: 'Pico', texto: 'Máxima intensidad, que se mantiene largo tiempo por la residencia del LSD en el receptor.' },
    { t0: 6, t1: 10, nombre: 'Meseta y bajada', texto: 'Disminución lenta; pensamiento todavía alterado.' },
    { t0: 10, t1: 14, nombre: 'Regreso', texto: 'Cansancio, dificultad para dormir.' }
  ],
  abstinencia: {
    inicio: '—', pico: '—', duracion: 'No existe síndrome de abstinencia', peligrosa: false,
    sintomas: ['No hay síntomas físicos al dejarlo', 'Cansancio el día siguiente', 'Rara vez, trastorno perceptivo persistente (HPPD)'],
    texto: 'Sin dependencia física ni autoadministración compulsiva en animales. La tolerancia rápida limita de forma natural el consumo repetido.'
  },
  riesgos: {
    agudos: ['Reacciones de pánico o paranoia, larga duración (8–12 h)', 'Conductas peligrosas por confusión', 'Taquicardia, hipertensión moderada, temperatura elevada', 'Secantes adulterados con NBOMe: vasoconstricción, convulsiones, muertes'],
    cronicos: ['Desencadenar psicosis o manía en personas predispuestas', 'HPPD (alteraciones visuales persistentes), poco frecuente'],
    alarma: ['Secante amargo o que adormece la lengua (sospecha de NBOMe), con agitación, fiebre o convulsiones → 112', 'Agitación extrema, autolesiones o pensamientos suicidas → 112 / 024']
  },
  interacciones: [
    { con: 'Litio', gravedad: 'critica', efecto: 'Convulsiones y reacciones graves.', mecanismo: 'Descrito en series de casos (Nayak et al., 2021).' },
    { con: 'Tramadol', gravedad: 'alta', efecto: 'Más riesgo de convulsiones y de síndrome serotoninérgico.', mecanismo: 'Proconvulsivante y serotoninérgico.' },
    { con: 'IMAO', gravedad: 'alta', efecto: 'Efectos impredecibles.', mecanismo: 'Interacción serotoninérgica.' },
    { con: 'ISRS', gravedad: 'moderada', efecto: 'Suelen atenuar el efecto.', mecanismo: 'Regulación a la baja de 5-HT2A con el tratamiento crónico.' },
    { con: 'Cannabis', gravedad: 'moderada', efecto: 'Puede intensificar el viaje y la ansiedad de forma brusca.', mecanismo: 'Poco caracterizado.' },
    { con: 'Estimulantes (anfetaminas, cocaína)', gravedad: 'moderada', efecto: 'Más ansiedad y carga cardiovascular.', mecanismo: 'Activación simpática aditiva.' }
  ],
  mitos: [
    { mito: 'El LSD se queda en la médula espinal y produce flashbacks años después.', realidad: 'Se elimina del cuerpo en uno o dos días. Lo que existe, poco frecuente, es el HPPD: alteraciones visuales persistentes, que no se deben a restos de LSD.' },
    { mito: 'Tomar más al día siguiente compensa la tolerancia.', realidad: 'La tolerancia es tan intensa que doblar la dosis apenas recupera el efecto (prueba el escenario «Redosis al día siguiente»).' },
    { mito: 'Una dosis de LSD puede matar.', realidad: 'Su toxicidad fisiológica es muy baja: la dosis activa es diminuta frente a la tóxica. Las muertes asociadas suelen ser por accidentes, conductas peligrosas o por NBOMe vendido como LSD.' }
  ],
  historiaPreset: 'consecutivos',
  historia: [
    { dia: 0, titulo: 'Primer día', texto: 'Efecto completo durante 8–12 horas. La curva de efecto va claramente por detrás de la de concentración (histéresis): el LSD se queda unido al receptor.' },
    { dia: 1, titulo: 'Segundo día', texto: 'La misma dosis produce mucho menos efecto: los receptores 5-HT2A se están retirando.' },
    { dia: 3, titulo: 'Cuarto día', texto: 'Tolerancia casi completa. Sin zona naranja: ninguna abstinencia.' },
    { dia: 10, titulo: 'Una semana después', texto: 'La sensibilidad se ha recuperado en buena parte.' },
    { dia: 20, titulo: 'Tres semanas después', texto: 'Tolerancia desaparecida.' }
  ],
  farmaco: {
    tabla: [
      ['Biodisponibilidad oral', '≈70 % (estimada)'],
      ['Tmax', '≈1,5 h'],
      ['Cmax con 100 µg', '≈1,3 ng/mL (Holze et al., 2019)'],
      ['Vida media', '≈3–4 h'],
      ['Duración del efecto', '8–12 h (más larga que la presencia en plasma)'],
      ['Metabolito principal', '2-oxo-3-hidroxi-LSD (inactivo)'],
      ['Enzimas', 'CYP2D6, CYP2E1, CYP3A4, CYP1A2, CYP2C9/19 (contribuciones parciales)'],
      ['Excreción sin cambios', '< 1 %'],
      ['Dosis umbral', '≈10–20 µg'],
      ['Margen de seguridad', 'Muy amplio (Gable, 2004)']
    ],
    afinidad: [
      { diana: '5-HT2A', accion: 'Agonista parcial', ki: '≈1–3 nM', nivel: 5 },
      { diana: '5-HT1A', accion: 'Agonista', ki: '≈1 nM', nivel: 5 },
      { diana: '5-HT2B', accion: 'Agonista', ki: '≈1–5 nM', nivel: 5 },
      { diana: '5-HT2C', accion: 'Agonista', ki: '≈1–20 nM', nivel: 4 },
      { diana: '5-HT6 / 5-HT7', accion: 'Agonista', ki: '≈2–10 nM', nivel: 4 },
      { diana: 'D2', accion: 'Agonista parcial', ki: '≈20–100 nM', nivel: 3 },
      { diana: 'D1', accion: 'Agonista', ki: '≈100–200 nM', nivel: 3 },
      { diana: 'Adrenérgicos α1/α2', accion: 'Ligando', ki: '≈10–100 nM', nivel: 3 }
    ],
    metabolismo: 'LSD → <b>2-oxo-3-hidroxi-LSD</b> (principal, inactivo), nor-LSD (N-desmetilación), lumi-LSD y glucurónidos de 13- y 14-hidroxi-LSD. La contribución de CYP2D6 hace que los metabolizadores lentos tengan concentraciones más altas y efectos más largos (Vizeli et al., 2021).'
  },
  tratamiento: 'No hay dependencia que tratar. Se investiga en ansiedad y depresión (Holze et al., 2023).',
  escalas: { dependencia: 1, abstinencia: 0, toxicidad: 1 }, nutt: 7, nuttNombre: 'LSD',
  referencias: [
    'Holze F et al. Pharmacokinetics and subjective effects of a novel oral LSD formulation in healthy subjects. Br J Clin Pharmacol. 2019;85(7):1474-1483.',
    'Dolder PC et al. Pharmacokinetics and pharmacodynamics of lysergic acid diethylamide in healthy subjects. Clin Pharmacokinet. 2017;56(10):1219-1230.',
    'Wacker D et al. Crystal structure of an LSD-bound human serotonin receptor. Cell. 2017;168(3):377-389.',
    'Preller KH et al. The fabric of meaning and subjective effects in LSD-induced states depend on serotonin 2A receptor activation. Curr Biol. 2017;27(3):451-457.',
    'Isbell H et al. Studies on lysergic acid diethylamide (LSD-25): effects in former morphine addicts and development of tolerance during chronic intoxication. AMA Arch Neurol Psychiatry. 1956;76(5):468-478.',
    'Passie T et al. The pharmacology of lysergic acid diethylamide: a review. CNS Neurosci Ther. 2008;14(4):295-314.',
    'Carhart-Harris RL et al. Neural correlates of the LSD experience revealed by multimodal neuroimaging. PNAS. 2016;113(17):4853-4858.',
    'Marona-Lewicka D, Thisted RA, Nichols DE. Distinct temporal phases in the behavioral pharmacology of LSD. Psychopharmacology. 2005;180(3):427-435.',
    'Vizeli P et al. Genetic influence of CYP2D6 on pharmacokinetics and acute subjective effects of LSD in a pooled analysis. Sci Rep. 2021;11:10851.',
    'Nichols DE. Dark classics in chemical neuroscience: lysergic acid diethylamide (LSD). ACS Chem Neurosci. 2018;9(10):2331-2343.'
  ]
});
