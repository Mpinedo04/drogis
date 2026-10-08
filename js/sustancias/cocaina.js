NT.registrar({
  id: 'cocaina', numero: 9, simbolo: 'Co', nombre: 'Cocaína', color: '#E07B39',
  subtitulo: 'Clorhidrato (esnifada) y base (crack, fumada)',
  categoria: 'estimulante', formula: 'C₁₇H₂₁NO₄', masaMolar: 303.35,
  ficha: { vidaMedia: '≈1 h', duracion: '30–90 min esnifada; 5–15 min fumada', inicio: '3–5 min esnifada; segundos fumada' },
  etiquetas: {
    efecto: 'Euforia / energía', neto: 'Euforia neta', malestar: 'Bajón y craving sin cocaína',
    aporte: 'Lo que aporta una sesión la primera vez', costumbre: 'Línea de costumbre', tolerancia: 'Tolerancia aguda (receptores D2 ↓)'
  },
  resumen: {
    basico: 'La cocaína bloquea la recaptación de dopamina: la dopamina se acumula y aparece una euforia intensa y corta. Dentro de la misma noche cada raya sube menos (tolerancia aguda) y al acabar llega el bajón. Con el uso repetido el cerebro reduce sus receptores D2 y el día a día sin cocaína se vuelve gris.',
    principiante: 'Normalmente, la neurona que libera [[dopamina]] la recoge enseguida con un [[transportador]] (DAT) para que la señal sea breve. La cocaína tapona ese transportador ([[recaptación]]): la dopamina se queda en la sinapsis y la señal de recompensa se dispara. Lo mismo pasa con la [[noradrenalina]] (pulso, tensión) y la [[serotonina]]. Como el efecto dura poco (sobre todo fumada) y el bajón llega rápido, empuja a repetir: es una de las sustancias con mayor capacidad de generar consumo compulsivo. Con el uso continuado el cerebro reduce los receptores D2 y la [[corteza prefrontal]] pierde capacidad de frenar: las recompensas normales motivan menos y las señales asociadas a la cocaína disparan un [[craving]] muy intenso.',
    pro: 'Inhibidor no selectivo de DAT, SERT y NET (Ki ≈ 0,2–0,7 µM) sin acción liberadora. El bloqueo de DAT aumenta la dopamina extracelular en el núcleo accumbens varias veces sobre el basal; la euforia se correlaciona con la velocidad de ocupación de DAT (Volkow et al., 1997), lo que explica la mayor capacidad adictiva de las vías rápidas (fumada, intravenosa). Bloquea además canales de sodio dependientes de voltaje (anestésico local; prolongación de QRS, arritmias). Muestra histéresis horaria (tolerancia aguda: el efecto cae mientras la concentración sigue alta; Van Dyke et al., 1978). Neuroadaptaciones crónicas: ↓ disponibilidad de D2 en el estriado, hipofunción orbitofrontal y cingulada, acumulación de ΔFosB y plasticidad glutamatérgica que sustenta la «incubación» del craving.'
  },
  basico: 'Línea morada: la euforia de una sesión la primera vez (100 %). Línea ámbar: la costumbre; tras cada sesión hay un bajón (naranja) que dura días, y con el uso repetido la costumbre se queda alta: la vida sin cocaína se siente plana.',
  mecanismo: {
    simple: 'Bloquea el transportador que recoge la dopamina (y la noradrenalina y la serotonina): se acumulan en la sinapsis.',
    pro: 'Inhibición competitiva de la recaptación de monoaminas; bloqueo de canales Na⁺ (clase I). La velocidad con que sube la ocupación de DAT determina la intensidad del «subidón».'
  },
  sinapsis: {
    tipo: 'bloqueo', nt: { nombre: 'Dopamina', color: '#C98A1E' }, droga: { nombre: 'Cocaína', color: '#E07B39' },
    receptor: 'Receptor de dopamina D2', transportadorNombre: 'transportador DAT', cronicoReceptores: 0.62, cronicoDesens: 0.1, tasaDroga: 4,
    senal: 'Dopamina actuando en los receptores',
    textos: {
      sin: 'La dopamina (círculos) se libera, activa brevemente los receptores y el transportador DAT la recoge enseguida.',
      con: 'La cocaína (rombos) tapona los transportadores: la dopamina no puede volver y se acumula, activando los receptores una y otra vez. Euforia, energía, sensación de control.',
      cronico: 'Con el uso repetido hay menos receptores D2. Sin cocaína, la dopamina normal apenas consigue activar la neurona: anhedonia, aburrimiento, craving.'
    }
  },
  unidades: { dosis: 'mg', dosisNombre: 'raya / dosis', dosisPlural: 'Rayas / dosis', conc: 'ng/mL', concNombre: 'Cocaína en plasma', sesion: 'sesión' },
  formaEtiqueta: 'Vía',
  pk: { F: 0.6, ka: 3, lag: 0.03, t12: 1.0, Vd: 2.0, ke0: 4, cf: 1000 },
  formas: [
    { id: 'nasal', nombre: 'Esnifada (clorhidrato)', nota: 'Dosis en mg; una raya suele tener 25–50 mg, con pureza muy variable. Absorción lenta por la vasoconstricción nasal.', duracion: 1 },
    { id: 'crack', nombre: 'Fumada (crack / base)', nota: 'Llega al cerebro en segundos y el efecto dura 5–15 minutos: el patrón más compulsivo.', pk: { F: 0.7, ka: 60, lag: 0, ke0: 20 }, duracion: 0.25 }
  ],
  pd: { ec50: 150, n: 1.5, emax: 100 },
  tol: { kdes: 0.6, krec: 0.115, rmin: 0.3, nombre: 'Tolerancia aguda (dentro de la sesión)' },
  tol2: null,
  oponentes: [
    { gamma: 0.5, tau: 8, nombre: 'Bajón («crash», horas)' },
    { gamma: 2.5, tau: 336, nombre: 'Anhedonia / ↓D2 (semanas)' }
  ],
  habito: { k: 0.012, vida: 365 },
  canales: [
    { id: 'cardio', nombre: 'Carga cardiovascular (vasoconstricción, pulso, tensión)', ec50: 300, n: 1.5, tol: 'none', conc: 'C', umbral: 60, color: '#E24B4A' }
  ],
  bandasConc: [
    { desde: 50, hasta: 300, texto: 'Uso recreativo esnifado', nivel: 'info' },
    { desde: 300, hasta: 1000, texto: 'Atracones / vía fumada', nivel: 'peligro' },
    { desde: 1000, hasta: 1e5, texto: 'Rango de intoxicaciones graves', nivel: 'critico' }
  ],
  limites: { dosis: [10, 150, 5], porSesion: [1, 20], intervalo: [0.15, 2, 0.05] },
  presets: [
    { id: 'finde', nombre: 'Fines de semana (4 rayas)', desc: '4 rayas de 40 mg cada 45 min, viernes y sábado por la noche.', cfg: { forma: 'nasal', dosis: 40, porSesion: 4, intervalo: 0.75, inicio: 0, frecuencia: 'finde', horizonte: 180 } },
    { id: 'atracon', nombre: 'Atracón (12 rayas)', desc: '12 rayas de 40 mg cada 30 min una noche por semana: tolerancia aguda y bajón.', cfg: { forma: 'nasal', dosis: 40, porSesion: 12, intervalo: 0.5, inicio: 0, frecuencia: 'semanal', horizonte: 120 } },
    { id: 'crack', nombre: 'Crack compulsivo', desc: '10 dosis fumadas cada 25 min todas las noches.', cfg: { forma: 'crack', dosis: 30, porSesion: 10, intervalo: 0.4, inicio: 21, frecuencia: 'diario', horizonte: 120 } },
    { id: 'dejar', nombre: 'Uso diario y abandono', desc: '6 rayas diarias durante 4 meses y abandono el día 120.', cfg: { forma: 'nasal', dosis: 40, porSesion: 6, intervalo: 1, inicio: 21, frecuencia: 'diario', horizonte: 200, dejar: 120 } }
  ],
  neuroquimicos: [
    { nombre: 'Dopamina (accumbens)', dir: '+', peso: 1, fuente: 'efecto', rol: 'Euforia, confianza, «más»', detalle: 'Bloqueo de DAT: aumentos de varias veces el basal; refuerzo muy potente.' },
    { nombre: 'Noradrenalina', dir: '+', peso: 0.9, fuente: 'efecto', rol: 'Pulso, tensión, vasoconstricción', detalle: 'Bloqueo de NET: hiperactividad simpática; base del riesgo de infarto e ictus.' },
    { nombre: 'Serotonina', dir: '+', peso: 0.5, fuente: 'efecto', rol: 'Euforia, menos apetito', detalle: 'Bloqueo de SERT.' },
    { nombre: 'Glutamato (accumbens, CPF)', dir: '+', peso: 0.5, fuente: 'efecto', rol: 'Aprendizaje de señales', detalle: 'Plasticidad sináptica (AMPA sin GluA2) que sostiene la incubación del craving (Grimm et al., 2001; Conrad et al., 2008).' },
    { nombre: 'Canales de sodio', dir: '-', peso: 0.4, fuente: 'efecto', rol: 'Anestesia, arritmias', detalle: 'Bloqueo de Nav1.5: ensanchamiento del QRS y arritmias con dosis altas.' },
    { nombre: 'Dopamina basal (anhedonia)', dir: '-', peso: 1, fuente: 'malestar', rol: 'Todo aburre', detalle: '↓ disponibilidad de D2 (Volkow et al., 1993) y ↓ liberación de dopamina en el estriado.' },
    { nombre: 'CRF / estrés', dir: '+', peso: 0.8, fuente: 'malestar', rol: 'Ansiedad, irritabilidad en el bajón', detalle: 'Activación del sistema de estrés de la amígdala extendida.' }
  ],
  adaptaciones: [
    { nombre: 'Receptores D2 disponibles', rol: 'menos placer natural', fuente: 'B', a: 100, b: -60, max: 100, sufijo: '%', detalle: 'PET: ↓ D2 en el estriado de consumidores, persistente durante meses de abstinencia.' },
    { nombre: 'Bajón / anhedonia', rol: 'sin cocaína todo es gris', fuente: 'B', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Fuerza del hábito y del craving', rol: 'señales muy potentes', fuente: 'H', a: 0, b: 100, max: 100, sufijo: '%', detalle: 'El craving ante señales aumenta durante las primeras semanas de abstinencia («incubación»).' },
    { nombre: 'Respuesta aguda de la sesión', rol: 'tolerancia aguda', fuente: 'R', a: 0, b: 100, max: 100, sufijo: '%' }
  ],
  fases: [
    { t0: 0, t1: 0.08, nombre: 'Subida', texto: 'Esnifada: en 3–5 min. Fumada: en segundos, mucho más intensa.' },
    { t0: 0.08, t1: 0.5, nombre: 'Pico', texto: 'Euforia, energía, locuacidad, sensación de control. Pulso y tensión altos.' },
    { t0: 0.5, t1: 1.2, nombre: 'Bajada', texto: 'El efecto cae aunque la cocaína siga en sangre (tolerancia aguda): ganas intensas de otra raya.' },
    { t0: 1.2, t1: 10, nombre: 'Bajón', texto: 'Cansancio, irritabilidad, ansiedad, tristeza, insomnio.' }
  ],
  abstinencia: {
    inicio: 'Horas (bajón)', pico: '1–4 días', duracion: 'Bajón: días; anhedonia: semanas; craving ante señales: meses', peligrosa: false,
    sintomas: ['Cansancio extremo y mucho sueño (o insomnio)', 'Ánimo deprimido, anhedonia', 'Irritabilidad, ansiedad', 'Aumento del apetito', 'Craving muy intenso ante señales', 'Riesgo de ideación suicida en el bajón'],
    texto: 'Sin síntomas físicos graves, pero con un componente depresivo intenso. Gawin y Kleber (1986) describieron tres fases: bajón (horas a días), abstinencia (1–10 semanas) y extinción (craving que puede durar años).'
  },
  riesgos: {
    agudos: ['Infarto de miocardio (riesgo ×24 en la primera hora; Mittleman et al., 1999), incluso en jóvenes', 'Ictus, disección aórtica, arritmias', 'Hipertermia y convulsiones', 'Paranoia y psicosis', 'Adulterantes: levamisol (agranulocitosis, vasculitis); fentanilo en algunos mercados'],
    cronicos: ['Adicción con consumo compulsivo', 'Depresión, ansiedad, paranoia', 'Perforación del tabique nasal', 'Daño pulmonar con crack', 'Enfermedad cardiovascular acelerada'],
    alarma: ['Dolor en el pecho, falta de aire o palpitaciones → 112 (no esperar a que pase)', 'Debilidad de un lado, dificultad para hablar, dolor de cabeza brusco → 112', 'Temperatura muy alta, convulsiones o agitación extrema → 112']
  },
  interacciones: [
    { con: 'Alcohol', gravedad: 'critica', efecto: 'Se forma cocaetileno: más tóxico para el corazón y de mayor duración; aumenta el riesgo de muerte súbita.', mecanismo: 'Transesterificación hepática por hCE-1.' },
    { con: 'Opioides («speedball»)', gravedad: 'critica', efecto: 'La cocaína enmascara la sedación; cuando se pasa su efecto (antes), queda la depresión respiratoria del opioide.', mecanismo: 'Duraciones distintas de efectos opuestos.' },
    { con: 'MDMA, anfetaminas', gravedad: 'alta', efecto: 'Carga cardiovascular e hipertermia muy aumentadas.', mecanismo: 'Efectos simpaticomiméticos aditivos.' },
    { con: 'IMAO, ISRS, tramadol', gravedad: 'alta', efecto: 'Riesgo de crisis hipertensiva y síndrome serotoninérgico.', mecanismo: 'Aumento de monoaminas.' },
    { con: 'Sildenafilo', gravedad: 'alta', efecto: 'Más riesgo de infarto y arritmias.', mecanismo: 'Estrés cardiovascular combinado.' },
    { con: 'Betabloqueantes', gravedad: 'moderada', efecto: 'En la intoxicación podrían empeorar la vasoconstricción coronaria (estimulación α sin oposición; tema discutido).', mecanismo: 'Bloqueo β con estímulo α persistente.' }
  ],
  mitos: [
    { mito: 'Con cocaína aguanto mejor el alcohol.', realidad: 'Se siente menos borracho, pero el alcohol sigue haciendo su efecto y juntos forman cocaetileno, más cardiotóxico.' },
    { mito: 'Si es de buena calidad no hace daño.', realidad: 'El riesgo cardiovascular es de la propia cocaína. La pureza alta aumenta la toxicidad.' },
    { mito: 'Solo engancha el crack.', realidad: 'El crack es más compulsivo por su rapidez, pero la cocaína esnifada también produce adicción y las mismas neuroadaptaciones.' },
    { mito: 'Un consumo ocasional no afecta al corazón.', realidad: 'El riesgo de infarto se dispara en la hora siguiente al consumo, también en consumidores ocasionales y jóvenes.' }
  ],
  historiaPreset: 'atracon',
  historia: [
    { dia: 5, titulo: 'Primera noche', texto: 'Usa el zoom del gráfico del día: cada raya sube menos que la anterior aunque la concentración siga subiendo. Es la tolerancia aguda, que empuja a seguir.' },
    { dia: 6, titulo: 'El día después', texto: 'Bajón (naranja): cansancio, tristeza, irritabilidad. Dura más que la propia euforia.' },
    { dia: 40, titulo: 'Seis semanas', texto: 'Entre sesiones la línea de costumbre ya no vuelve al suelo: ha empezado la anhedonia de fondo (menos receptores D2).' },
    { dia: 110, titulo: 'Casi cuatro meses', texto: 'Placer neto pequeño y malestar constante. El hábito y la respuesta a las señales son muy fuertes.' }
  ],
  farmaco: {
    tabla: [
      ['Biodisponibilidad', 'Esnifada 30–80 % (media ≈60 %); fumada ≈70 %; oral ≈30 %'],
      ['Tmax plasmático', 'Esnifada 30–60 min; fumada 1–5 min'],
      ['Vida media', '≈0,7–1,5 h'],
      ['Volumen de distribución', '≈1,6–2,7 L/kg'],
      ['Metabolitos', 'Benzoilecgonina (≈45 %, inactiva, marcador en orina 2–4 días), ecgonina metil éster (≈40 %), norcocaína (activa, minoritaria), cocaetileno (con alcohol)'],
      ['Enzimas', 'Butirilcolinesterasa plasmática, carboxilesterasas hepáticas hCE-1 y hCE-2, CYP3A4 (norcocaína)'],
      ['Concentraciones', 'Uso recreativo 100–500 ng/mL; muy variable'],
      ['Pureza en calle (Europa)', 'Muy variable; actualmente suele ser alta']
    ],
    afinidad: [
      { diana: 'DAT', accion: 'Inhibidor', ki: '≈0,2–0,6 µM', nivel: 3 },
      { diana: 'SERT', accion: 'Inhibidor', ki: '≈0,3–0,7 µM', nivel: 3 },
      { diana: 'NET', accion: 'Inhibidor', ki: '≈0,3–0,8 µM', nivel: 3 },
      { diana: 'Canales Na⁺ (Nav1.5)', accion: 'Bloqueador', ki: '≈10 µM', nivel: 2 },
      { diana: 'Receptores σ1', accion: 'Agonista', ki: '≈2–7 µM', nivel: 2 }
    ],
    metabolismo: 'Cocaína → <b>benzoilecgonina</b> (hidrólisis por hCE-1 y espontánea) y → <b>ecgonina metil éster</b> (butirilcolinesterasa, hCE-2). CYP3A4 forma norcocaína (hepatotóxica). En presencia de etanol, hCE-1 transesterifica la cocaína a <b>cocaetileno</b> (t½ ≈ 2,5 h), que bloquea DAT con potencia similar y es más cardiotóxico. La butirilcolinesterasa baja (variantes genéticas) aumenta la toxicidad.'
  },
  tratamiento: 'No hay fármacos aprobados. Lo más eficaz es el manejo de contingencias y la terapia cognitivo-conductual. Se han estudiado topiramato, modafinilo, bupropión con naltrexona (en metanfetamina) y vacunas, con resultados modestos.',
  escalas: { dependencia: 5, abstinencia: 2, toxicidad: 4 }, nutt: 27, nuttNombre: 'Cocaína (crack: 54)',
  referencias: [
    'Jeffcoat AR et al. Cocaine disposition in humans after intravenous injection, nasal insufflation (snorting), or smoking. Drug Metab Dispos. 1989;17(2):153-159.',
    'Van Dyke C, Jatlow P, Ungerer J, Barash PG, Byck R. Oral cocaine: plasma concentrations and central effects. Science. 1978;200(4338):211-213.',
    'Volkow ND et al. Relationship between subjective effects of cocaine and dopamine transporter occupancy. Nature. 1997;386:827-830.',
    'Volkow ND et al. Decreased dopamine D2 receptor availability is associated with reduced frontal metabolism in cocaine abusers. Synapse. 1993;14(2):169-177.',
    'Gawin FH, Kleber HD. Abstinence symptomatology and psychiatric diagnosis in cocaine abusers. Arch Gen Psychiatry. 1986;43(2):107-113.',
    'Mittleman MA et al. Triggering of myocardial infarction by cocaine. Circulation. 1999;99(21):2737-2741.',
    'Grimm JW et al. Incubation of cocaine craving after withdrawal. Nature. 2001;412:141-142.',
    'Nestler EJ. Is there a common molecular pathway for addiction? Nat Neurosci. 2005;8(11):1445-1449.',
    'Andrews P. Cocaethylene toxicity. J Addict Dis. 1997;16(3):75-84.'
  ]
});
