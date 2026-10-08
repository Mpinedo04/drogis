NT.registrar({
  id: 'nicotina', numero: 1, simbolo: 'Nc', nombre: 'Nicotina', color: '#C98A1E',
  subtitulo: 'Tabaco, vapeadores, bolsas y chicles',
  categoria: 'estimulante', formula: 'C₁₀H₁₄N₂', masaMolar: 162.23,
  ficha: { vidaMedia: '≈2 h', duracion: '5–30 min (efecto)', inicio: '7–20 s fumada' },
  etiquetas: {
    efecto: 'Placer / alivio', neto: 'Placer neto', malestar: 'Malestar sin nicotina',
    aporte: 'Lo que aporta la nicotina', costumbre: 'Línea de costumbre', tolerancia: 'Receptores desensibilizados'
  },
  resumen: {
    basico: 'La nicotina libera dopamina en el circuito de recompensa. Con el uso diario el cerebro se adapta: cada cigarrillo aporta cada vez menos placer neto y estar sin nicotina empieza a sentirse mal.',
    principiante: 'La nicotina imita a la [[acetilcolina]], un mensajero natural del cerebro, y activa unos [[receptores|receptor]] llamados nicotínicos. Eso hace que las neuronas del circuito de recompensa suelten [[dopamina]]: el cerebro registra «esto es bueno, repítelo». Como llega al cerebro en segundos y se va en minutos, cada calada es una pequeña recompensa inmediata, el ingrediente perfecto para crear un hábito. Con el uso diario el cerebro se defiende: desensibiliza esos receptores, fabrica más y cambia su equilibrio. Ese nuevo equilibrio, la [[línea de costumbre|alostasis]], es el que hace que sin nicotina te sientas peor que antes de empezar.',
    pro: 'Alcaloide pirrolidínico de <i>Nicotiana tabacum</i>. Agonista de los receptores nicotínicos de acetilcolina (nAChR), con máxima afinidad por el subtipo heteromérico α4β2*. La activación de α4β2* (y α6β2*) en neuronas dopaminérgicas del área tegmental ventral y de α7 en aferencias glutamatérgicas aumenta la descarga en ráfagas y la liberación de dopamina en la capa (shell) del núcleo accumbens. La rápida desensibilización de los α4β2* de las interneuronas GABA prolonga la desinhibición. La exposición crónica a concentraciones desensibilizantes induce upregulation de α4β2* (aumento postraduccional por efecto chaperona), sustrato de la tolerancia y de la abstinencia.'
  },
  basico: 'Línea morada: lo que aporta un día de nicotina la primera vez (100 %). Línea ámbar: la costumbre, que sube con las semanas. Verde: el placer neto, cada vez más pequeño. Naranja: el malestar cuando falta nicotina.',
  mecanismo: {
    simple: 'Activa receptores nicotínicos que liberan dopamina, noradrenalina y otros mensajeros. Es un agonista: «abre la cerradura» como la acetilcolina.',
    pro: 'Agonista completo de nAChR α4β2* (Ki ≈ 1 nM; EC50 de activación ≈ 1 µM y de desensibilización ≈ 10–100 nM, por lo que las concentraciones sostenidas de un fumador, 100–300 nM, desensibilizan más que activan). Los bolos arteriales de cada calada son los que provocan picos de activación antes de la desensibilización.'
  },
  sinapsis: {
    tipo: 'agonista', nt: { nombre: 'Acetilcolina', color: '#378ADD' }, droga: { nombre: 'Nicotina', color: '#C98A1E' },
    receptor: 'Receptor nicotínico α4β2', transportador: false, cronicoReceptores: 1.6, cronicoDesens: 0.45,
    senal: 'Activación de la neurona de dopamina',
    textos: {
      sin: 'La acetilcolina (círculos azules) se libera, activa los receptores nicotínicos un instante y se degrada enseguida. La señal es breve y está regulada.',
      con: 'La nicotina (rombos) activa los mismos receptores, pero no se degrada en la sinapsis: los activa una y otra vez. La neurona de dopamina se dispara y aparece el «chute» de recompensa.',
      cronico: 'Con el uso diario muchos receptores quedan desensibilizados (grises) y el cerebro compensa fabricando más (upregulation). Cuando baja la nicotina, esos receptores extra «piden» estimulación: es el craving de primera hora de la mañana.'
    }
  },
  unidades: { dosis: 'mg', dosisNombre: 'cigarrillo', dosisPlural: 'Cigarrillos', conc: 'ng/mL', concNombre: 'Nicotina en plasma (venosa)', sesion: 'día' },
  formaEtiqueta: 'Forma de consumo',
  pk: { F: 1, ka: 30, lag: 0, t12: 2, Vd: 2.6, ke0: 20, cf: 1000 },
  formas: [
    { id: 'cig', nombre: 'Cigarrillo (fumada)', nota: 'Dosis = nicotina absorbida: 1–1,5 mg por cigarrillo, aunque contenga 8–20 mg.', duracion: 0.6 },
    { id: 'vape', nombre: 'Vapeador (sales de nicotina)', nota: 'Dosis = nicotina absorbida por tanda de caladas. Los pods de sales alcanzan picos parecidos a los del cigarrillo.', pk: { ka: 20, ke0: 15 }, duracion: 0.6 },
    { id: 'chicle', nombre: 'Chicle / bolsa oral', nota: 'Dosis = contenido (2 o 4 mg); se absorbe alrededor del 50 %; Tmax ≈ 30 min.', pk: { F: 0.5, ka: 2.2, lag: 0.05, ke0: 5 }, duracion: 1.5 },
    { id: 'parche', nombre: 'Parche transdérmico', nota: 'Liberación continua durante 24 h: niveles estables y sin picos, por eso apenas refuerza el hábito.', pk: { F: 0.85, infusion: 24, ke0: 5 }, duracion: 24 }
  ],
  pd: { ec50: 6, n: 1.5, emax: 100 },
  tol: { kdes: 0.06, krec: 0.1, rmin: 0.4, nombre: 'Desensibilización aguda de α4β2' },
  oponentes: [
    { gamma: 0.2, tau: 6, nombre: 'Rebote entre cigarrillos (horas)' },
    { gamma: 0.55, tau: 480, nombre: 'Adaptación alostática (semanas)' }
  ],
  habito: { k: 0.0007, vida: 240 },
  canales: [
    { id: 'cardio', nombre: 'Estimulación cardiovascular (pulso, tensión)', ec50: 9, n: 1.2, tol: 'R', color: '#D85A30' }
  ],
  bandasConc: [
    { desde: 5, hasta: 30, texto: 'Pico venoso tras un cigarrillo (5–30 ng/mL)', nivel: 'info' },
    { desde: 10, hasta: 50, texto: 'Fumador diario a lo largo del día', nivel: 'aviso' }
  ],
  limites: { dosis: [0.2, 4, 0.1], porSesion: [1, 40], intervalo: [0.25, 4, 0.25] },
  presets: [
    { id: 'diario', nombre: 'Fumador diario (15/día)', desc: '15 cigarrillos al día, uno cada hora desde las 8:00, durante un año.', cfg: { forma: 'cig', dosis: 1, porSesion: 15, intervalo: 1, inicio: 8, frecuencia: 'diario', horizonte: 365 } },
    { id: 'social', nombre: 'Fumador social', desc: '6 cigarrillos las noches de viernes y sábado.', cfg: { forma: 'cig', dosis: 1, porSesion: 6, intervalo: 1.25, inicio: 21, frecuencia: 'finde', horizonte: 180 } },
    { id: 'vapeo', nombre: 'Vapeo intenso', desc: 'Tandas de caladas cada media hora durante todo el día.', cfg: { forma: 'vape', dosis: 0.5, porSesion: 30, intervalo: 0.5, inicio: 8, frecuencia: 'diario', horizonte: 365 } },
    { id: 'dejar', nombre: 'Lo deja a los 6 meses', desc: 'Fumador diario que deja de fumar de golpe el día 180.', cfg: { forma: 'cig', dosis: 1, porSesion: 15, intervalo: 1, inicio: 8, frecuencia: 'diario', horizonte: 365, dejar: 180 } },
    { id: 'parche', nombre: 'Parche de 21 mg', desc: 'Un parche de 21 mg/24 h cada mañana: nicotina sin picos.', cfg: { forma: 'parche', dosis: 21, porSesion: 1, intervalo: 1, inicio: 8, frecuencia: 'diario', horizonte: 90 } }
  ],
  neuroquimicos: [
    { nombre: 'Dopamina', dir: '+', peso: 1, fuente: 'efecto', rol: 'Recompensa, «repítelo»', detalle: 'Liberación fásica en el núcleo accumbens (shell) por activación de nAChR α4β2*/α6β2* en neuronas del VTA y α7 en aferencias glutamatérgicas.' },
    { nombre: 'Noradrenalina', dir: '+', peso: 0.8, fuente: 'efecto', rol: 'Alerta, pulso', detalle: 'Liberación desde el locus coeruleus y catecolaminas suprarrenales por nAChR α3β4 ganglionares: taquicardia y vasoconstricción.' },
    { nombre: 'Acetilcolina (imitada)', dir: '+', peso: 0.7, fuente: 'efecto', rol: 'Atención, memoria de trabajo', detalle: 'Efecto procognitivo agudo modesto que en fumadores consiste sobre todo en revertir el déficit de la abstinencia.' },
    { nombre: 'Glutamato', dir: '+', peso: 0.6, fuente: 'efecto', rol: 'Aprende las señales (café, sobremesa)', detalle: 'α7 presinápticos favorecen la potenciación a largo plazo en el VTA: base de la fuerza de los estímulos condicionados.' },
    { nombre: 'β-endorfinas', dir: '+', peso: 0.5, fuente: 'efecto', rol: 'Menos tensión', detalle: 'Liberación de opioides endógenos; parte del efecto «relajante» percibido.' },
    { nombre: 'Serotonina', dir: '+', peso: 0.4, fuente: 'efecto', rol: 'Ánimo, menos apetito', detalle: 'Aumento modesto; contribuye a la supresión del apetito y al aumento de peso al dejarlo.' },
    { nombre: 'GABA', dir: '-', peso: 0.5, fuente: 'efecto', rol: 'Menos freno sobre la dopamina', detalle: 'Los α4β2* de las interneuronas GABA del VTA se desensibilizan en minutos, desinhibiendo las neuronas dopaminérgicas.' },
    { nombre: 'CRF / cortisol', dir: '+', peso: 0.6, fuente: 'malestar', rol: 'Estrés en la abstinencia', detalle: 'Activación del sistema del factor liberador de corticotropina en la amígdala extendida durante la abstinencia (Koob).' }
  ],
  adaptaciones: [
    { nombre: 'Receptores α4β2', rol: 'más receptores (upregulation)', fuente: 'B', a: 100, b: 110, max: 220, sufijo: '%', detalle: 'PET con [123I]5-IA-85380: +25–40 % de disponibilidad de β2*-nAChR en fumadores; normaliza a las 6–12 semanas de abstinencia (Cosgrove et al., 2009).' },
    { nombre: 'Malestar sin nicotina', rol: 'irritabilidad, ansiedad', fuente: 'B', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Fuerza del hábito', rol: 'asociaciones aprendidas', fuente: 'H', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Disfrute de lo natural', rol: 'comida, ocio, descanso', fuente: 'B', a: 100, b: -45, max: 100, sufijo: '%' }
  ],
  fases: [
    { t0: 0, t1: 0.006, nombre: 'Llegada', texto: 'La nicotina llega al cerebro 7–20 segundos después de la calada.' },
    { t0: 0.006, t1: 0.15, nombre: 'Pico', texto: 'Liberación de dopamina: alivio, alerta, a veces mareo leve.' },
    { t0: 0.15, t1: 0.8, nombre: 'Desvanecimiento', texto: 'El efecto se apaga en minutos aunque la nicotina siga en sangre: los receptores se desensibilizan.' },
    { t0: 0.8, t1: 2.5, nombre: 'Ganas del siguiente', texto: 'Con dependencia, el rebote aparece a la hora o dos horas.' }
  ],
  abstinencia: {
    inicio: '4–24 h', pico: '1–3 días', duracion: '2–4 semanas (el craving puede durar meses)', peligrosa: false,
    sintomas: ['Irritabilidad, frustración o ira', 'Ansiedad', 'Dificultad para concentrarse', 'Más apetito y aumento de peso', 'Inquietud', 'Ánimo deprimido', 'Insomnio'],
    texto: 'Muy desagradable pero no peligrosa médicamente. El pico es a los 2–3 días; casi todo se resuelve en un mes, aunque las señales asociadas (el café, la sobremesa, el estrés) pueden despertar el deseo durante meses.'
  },
  riesgos: {
    agudos: ['Taquicardia y subida de tensión arterial', 'Náuseas, mareo y sudor frío en personas no habituadas', 'Intoxicación al tragar líquido de vapeo o bolsas (especialmente niños): vómitos, convulsiones'],
    cronicos: ['El humo del tabaco causa cáncer de pulmón, boca, laringe, esófago, vejiga, páncreas y más', 'EPOC y enfisema', 'Infarto, ictus y enfermedad arterial periférica', 'En el embarazo: bajo peso al nacer, parto prematuro, muerte súbita del lactante', 'Dependencia muy intensa: alrededor de dos de cada tres personas que prueban el tabaco acaban fumando a diario (Birge et al., 2018)'],
    alarma: ['Dolor en el pecho, falta de aire súbita o debilidad de un lado del cuerpo → 112', 'Un niño ha tragado líquido de vapeo o bolsas → 112 o Toxicología: 91 562 04 20']
  },
  interacciones: [
    { con: 'Clozapina, olanzapina', gravedad: 'alta', efecto: 'Al dejar de fumar sus niveles pueden subir un 50 % o más y causar toxicidad (sedación, convulsiones).', mecanismo: 'Los hidrocarburos aromáticos policíclicos del humo (no la nicotina) inducen CYP1A2; al dejar de fumar la inducción desaparece en 1–2 semanas.' },
    { con: 'Anticonceptivos hormonales combinados', gravedad: 'alta', efecto: 'Más riesgo de trombosis, infarto e ictus, sobre todo a partir de los 35 años.', mecanismo: 'Efecto protrombótico aditivo del tabaco y los estrógenos.' },
    { con: 'Cafeína', gravedad: 'moderada', efecto: 'Quien fuma elimina la cafeína casi el doble de rápido; al dejarlo, el mismo café produce nerviosismo e insomnio.', mecanismo: 'Inducción de CYP1A2 por el humo.' },
    { con: 'Alcohol', gravedad: 'moderada', efecto: 'Cada uno aumenta las ganas del otro; riesgo multiplicado de cáncer de boca, faringe y esófago.', mecanismo: 'Refuerzo cruzado (nAChR en el circuito de recompensa) y sinergia carcinogénica.' },
    { con: 'Vareniclina / citisina', gravedad: 'baja', efecto: 'Tratamientos para dejar de fumar: reducen el craving y la recompensa del cigarrillo.', mecanismo: 'Agonistas parciales de α4β2: ocupan el receptor, lo estimulan un poco y bloquean el efecto de la nicotina.' }
  ],
  mitos: [
    { mito: 'Fumar me relaja.', realidad: 'La nicotina es un estimulante: sube el pulso y la tensión. La calma que se siente es sobre todo el alivio de la abstinencia acumulada desde el último cigarrillo (Parrott, 1999). Quien no fuma no necesita ese alivio, y quien lo deja suele tener menos estrés a los pocos meses.' },
    { mito: 'La nicotina es lo que causa el cáncer.', realidad: 'Los principales carcinógenos vienen de la combustión (alquitranes, nitrosaminas, benceno, hidrocarburos). La nicotina es lo que engancha y tiene efectos cardiovasculares, pero no es el principal causante del cáncer.' },
    { mito: 'Los cigarrillos «light» son menos dañinos.', realidad: 'Quien fuma ajusta la forma de fumar (caladas más profundas, tapar los agujeros del filtro) para conseguir la misma nicotina. La exposición real casi no cambia.' },
    { mito: 'Con pocos cigarrillos no hay dependencia.', realidad: 'En adolescentes pueden aparecer síntomas de dependencia tras semanas de consumo ocasional. Los fumadores «sociales» también desarrollan craving ligado a situaciones.' }
  ],
  historiaPreset: 'diario',
  historia: [
    { dia: 0, titulo: 'Los primeros cigarrillos', texto: 'La línea de costumbre está en el suelo: todo lo que aporta la nicotina se nota (a veces como mareo o náusea). El cerebro aún no ha aprendido a compensar.' },
    { dia: 10, titulo: 'Diez días', texto: 'Los receptores α4β2 pasan muchas horas al día desensibilizados y el cerebro empieza a fabricar más. Aparece el primer craving matutino: la costumbre ya está por encima del nivel natural.' },
    { dia: 45, titulo: 'Mes y medio', texto: 'La costumbre se ha acercado mucho a la línea morada. El placer neto (verde) es pequeño: la mayor parte de lo que se siente al fumar es alivio del malestar (naranja).' },
    { dia: 175, titulo: 'Fumador consolidado', texto: 'El sistema ha alcanzado un nuevo equilibrio. Cada cigarrillo devuelve al fumador cerca de su nivel natural, sin superarlo mucho. Las asociaciones (hábito) son muy fuertes.' },
    { dia: 182, cfg: { dejar: 180 }, titulo: 'Dos días sin fumar', texto: 'La nicotina ha desaparecido, pero la costumbre sigue alta: todo ese hueco es malestar (irritabilidad, ansiedad, hambre). Es el pico de la abstinencia.' },
    { dia: 230, cfg: { dejar: 180 }, titulo: 'Siete semanas después', texto: 'La línea de costumbre ha vuelto casi al suelo y los receptores se normalizan (6–12 semanas). El hábito aprendido baja mucho más despacio: por eso las recaídas se dan en situaciones concretas.' }
  ],
  farmaco: {
    tabla: [
      ['Vida media de eliminación', '≈2 h (1–4 h)'],
      ['Metabolito principal', 'Cotinina (70–80 %); t½ 16–20 h, marcador de exposición'],
      ['Enzima principal', 'CYP2A6 (polimórfica: los metabolizadores lentos fuman menos)'],
      ['Biodisponibilidad oral', '20–45 % (efecto de primer paso)'],
      ['Llegada al cerebro (fumada)', '7–20 s'],
      ['Tmax venosa', '5–8 min (fumada); ≈30 min (chicle); 2–8 h (parche)'],
      ['Volumen de distribución', '≈2,6 L/kg'],
      ['Unión a proteínas', '< 5 %'],
      ['Aclaramiento', '≈1,2 L/min'],
      ['Absorbida por cigarrillo', '1–1,5 mg (rango 0,3–3)'],
      ['Concentración en fumadores', '10–50 ng/mL a lo largo del día'],
      ['Dosis letal oral (adulto)', 'Revisada a 0,5–1 g (Mayer, 2014), no los clásicos 60 mg']
    ],
    afinidad: [
      { diana: 'nAChR α4β2*', accion: 'Agonista (desensibilizante)', ki: '≈1 nM', nivel: 5 },
      { diana: 'nAChR α6β2*', accion: 'Agonista', ki: 'nM bajo', nivel: 5 },
      { diana: 'nAChR α3β4 (ganglios)', accion: 'Agonista', ki: '≈0,1–1 µM', nivel: 3 },
      { diana: 'nAChR α7', accion: 'Agonista', ki: '≈1–10 µM', nivel: 2 },
      { diana: 'nAChR muscular', accion: 'Agonista débil', ki: '> 10 µM', nivel: 1 }
    ],
    metabolismo: 'Nicotina → <b>cotinina</b> (CYP2A6 y aldehído oxidasa, 70–80 %) → <b>trans-3′-hidroxicotinina</b> (CYP2A6). La razón 3HC/cotinina (NMR) estima la velocidad metabólica y predice qué tratamiento funciona mejor. Vías menores: N-óxido (FMO3) y N-glucuronidación (UGT2B10). Excreción renal dependiente del pH urinario. Los estrógenos aceleran el metabolismo (más rápido en mujeres y en el embarazo).'
  },
  tratamiento: 'Terapia sustitutiva (parche y una forma rápida combinados), vareniclina, citisina y bupropión duplican o triplican las tasas de abstinencia frente a placebo. Combinados con apoyo conductual son lo más eficaz.',
  escalas: { dependencia: 5, abstinencia: 1, toxicidad: 2 }, nutt: 26, nuttNombre: 'Tabaco',
  referencias: [
    'Benowitz NL. Pharmacology of nicotine: addiction, smoking-induced disease, and therapeutics. Annu Rev Pharmacol Toxicol. 2009;49:57-71.',
    'Hukkanen J, Jacob P, Benowitz NL. Metabolism and disposition kinetics of nicotine. Pharmacol Rev. 2005;57(1):79-115.',
    'Cosgrove KP et al. β2-nicotinic acetylcholine receptor availability during acute and prolonged abstinence from tobacco smoking. Arch Gen Psychiatry. 2009;66(6):666-676.',
    'Dani JA, De Biasi M. Cellular mechanisms of nicotine addiction. Pharmacol Biochem Behav. 2001;70(4):439-446.',
    'Parrott AC. Does cigarette smoking cause stress? Am Psychol. 1999;54(10):817-820.',
    'Mayer B. How much nicotine kills a human? Arch Toxicol. 2014;88(1):5-7.',
    'Birge M et al. At least one in three people who try cigarettes become daily smokers. Nicotine Tob Res. 2018;20(12):1427-1433.',
    'Hughes JR. Effects of abstinence from tobacco: valid symptoms and time course. Nicotine Tob Res. 2007;9(3):315-327.',
    'Koob GF, Le Moal M. Drug addiction, dysregulation of reward, and allostasis. Neuropsychopharmacology. 2001;24(2):97-129.'
  ]
});
