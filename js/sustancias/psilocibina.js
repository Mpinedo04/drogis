NT.registrar({
  id: 'psilocibina', numero: 2, simbolo: 'Ps', nombre: 'Psilocibina', color: '#7F77DD',
  subtitulo: 'Setas alucinógenas (Psilocybe)',
  categoria: 'psicodelico', formula: 'C₁₂H₁₇N₂O₄P', masaMolar: 284.25,
  ficha: { vidaMedia: '≈2–3 h (psilocina)', duracion: '4–6 h', inicio: '20–40 min' },
  etiquetas: {
    efecto: 'Intensidad del efecto', neto: 'Efecto que notas', malestar: 'Malestar (no hay abstinencia física)',
    aporte: 'Efecto de la dosis la primera vez', costumbre: 'Tolerancia', tolerancia: 'Receptores 5-HT2A no disponibles'
  },
  resumen: {
    basico: 'La psilocibina activa receptores de serotonina 5-HT2A. La tolerancia aparece en uno o dos días y casi anula el efecto si se repite a diario, pero no deja abstinencia física: la línea de costumbre sube rápido y vuelve a bajar en una o dos semanas.',
    principiante: 'La psilocibina es un [[profármaco]]: el cuerpo la convierte en psilocina, una molécula muy parecida a la [[serotonina]]. La psilocina se une sobre todo a los [[receptores|receptor]] 5-HT2A de la corteza cerebral, lo que altera la percepción, las emociones y la forma de pensar durante unas horas. A diferencia de la nicotina o el alcohol, el «efecto» aquí no es placer de recompensa sino intensidad de la experiencia (que puede ser agradable o muy angustiosa). Su particularidad es que la [[tolerancia]] es rapidísima: si se toma al día siguiente, apenas hace efecto. Como no genera un nuevo equilibrio que necesite la sustancia, no hay síndrome de [[abstinencia]].',
    pro: 'Profármaco (4-fosforiloxi-N,N-dimetiltriptamina) desfosforilado por fosfatasas alcalinas intestinales y tisulares a psilocina (4-HO-DMT). La psilocina es agonista parcial de 5-HT2A con afinidad también por 5-HT1A, 5-HT2C y 5-HT2B. La activación de 5-HT2A en neuronas piramidales de capa V de la corteza prefrontal (vía Gq/PLC y β-arrestina) aumenta la liberación de glutamato, desorganiza el filtrado talámico (modelo CSTC) y reduce la integridad de la red por defecto. La intensidad subjetiva se correlaciona con la ocupación de 5-HT2A medida con PET (EC50 plasmática ≈ 2 µg/L; Madsen et al., 2019). La internalización y regulación a la baja de 5-HT2A explica la taquifilaxia y la tolerancia cruzada con LSD y mescalina.'
  },
  basico: 'Línea morada: intensidad de la dosis la primera vez (100 %). Línea ámbar: tolerancia. Sube de golpe tras cada toma (los receptores 5-HT2A se retiran) y baja en 1–2 semanas. No hay zona naranja: no existe abstinencia física.',
  mecanismo: {
    simple: 'La psilocina imita a la serotonina y activa sobre todo el receptor 5-HT2A de la corteza. Es un agonista parcial.',
    pro: 'Agonista parcial 5-HT2A (Ki ≈ 6–100 nM según el ensayo), con señalización sesgada hacia Gq. El antagonista ketanserina bloquea por completo los efectos subjetivos (Vollenweider et al., 1998), lo que confirma el papel central de 5-HT2A.'
  },
  sinapsis: {
    tipo: 'agonista', nt: { nombre: 'Serotonina', color: '#378ADD' }, droga: { nombre: 'Psilocina', color: '#7F77DD' },
    receptor: 'Receptor 5-HT2A', transportadorNombre: 'transportador SERT', cronicoReceptores: 0.45, cronicoDesens: 0.1,
    senal: 'Activación 5-HT2A en la corteza',
    textos: {
      sin: 'La serotonina activa brevemente los receptores 5-HT2A y se recapta. Su señal está muy regulada.',
      con: 'La psilocina (rombos) activa los 5-HT2A durante horas. Las neuronas de la corteza liberan más glutamato y las redes cerebrales se comunican de forma menos jerárquica: cambia la percepción, las emociones y el sentido del yo.',
      cronico: 'Tras tomarla uno o varios días seguidos, la neurona retira muchos receptores 5-HT2A de la superficie (downregulation). Con menos receptores la misma dosis apenas hace efecto: tolerancia. Se recuperan en una o dos semanas.'
    }
  },
  unidades: { dosis: 'mg', dosisNombre: 'toma', dosisPlural: 'Tomas', conc: 'ng/mL', concNombre: 'Psilocina en plasma', sesion: 'sesión' },
  formaEtiqueta: 'Forma',
  pk: { F: 0.53, ka: 1.2, lag: 0.3, t12: 2.2, Vd: 4, ke0: 1.0, cf: 719 },
  formas: [
    { id: 'oral', nombre: 'Oral (psilocibina pura o setas)', nota: 'Dosis en mg de psilocibina. Las setas secas tienen de media ≈1 % (0,2–2 %): 1 g ≈ 10 mg, pero la variación es enorme.', duracion: 5 },
    { id: 'te', nombre: 'Infusión / zumo de limón', nota: 'Algo más rápida y corta al saltarse parte de la digestión (efecto descrito por usuarios; evidencia limitada).', pk: { ka: 2.2, lag: 0.15 }, duracion: 4.5 }
  ],
  pd: { ec50: 6, n: 1.5, emax: 100 },
  tol: { kdes: 0.25, krec: 0.0116, rmin: 0.05, nombre: 'Internalización / downregulation de 5-HT2A' },
  oponentes: [],
  habito: { k: 0.01, vida: 120 },
  canales: [
    { id: 'ocup', nombre: 'Ocupación de 5-HT2A (PET)', tipo: 'ocupacion', ec50: 1.95, occMax: 0.8, color: '#534AB7' },
    { id: 'psico', nombre: 'Riesgo de reacción psicológica difícil', ec50: 16, n: 2.5, tol: 'R', umbral: 50, color: '#D85A30' }
  ],
  bandasConc: [
    { desde: 2, hasta: 8, texto: 'Efectos leves a moderados', nivel: 'info' },
    { desde: 8, hasta: 40, texto: 'Efectos intensos (dosis de ensayos clínicos)', nivel: 'aviso' }
  ],
  limites: { dosis: [0.5, 50, 0.5], porSesion: [1, 3], intervalo: [0.5, 4, 0.5] },
  presets: [
    { id: 'consecutivos', nombre: '5 días seguidos', desc: '20 mg cada día durante 5 días: demuestra la tolerancia rápida y cómo se recupera.', cfg: { forma: 'oral', dosis: 20, porSesion: 1, intervalo: 1, inicio: 12, frecuencia: 'diario', horizonte: 30, dejar: 5 } },
    { id: 'unica', nombre: 'Dosis única (20 mg)', desc: '20 mg de psilocibina (≈2 g de setas secas), una sola vez.', cfg: { forma: 'oral', dosis: 20, porSesion: 1, intervalo: 1, inicio: 12, frecuencia: 'unica', horizonte: 21 } },
    { id: 'semanal', nombre: 'Una vez por semana', desc: '15 mg cada sábado: ¿da tiempo a recuperar la sensibilidad?', cfg: { forma: 'oral', dosis: 15, porSesion: 1, intervalo: 1, inicio: 12, frecuencia: 'semanal', horizonte: 90 } },
    { id: 'micro', nombre: 'Microdosis cada 3 días', desc: '1,5 mg cada 3 días (protocolo tipo Fadiman).', cfg: { forma: 'oral', dosis: 1.5, porSesion: 1, intervalo: 1, inicio: 9, frecuencia: 'c3d', horizonte: 60 } },
    { id: 'clinica', nombre: 'Ensayo clínico (25 mg)', desc: 'Dosis única de 25 mg, la usada en ensayos de depresión resistente (Goodwin et al., 2022).', cfg: { forma: 'oral', dosis: 25, porSesion: 1, intervalo: 1, inicio: 10, frecuencia: 'unica', horizonte: 21 } }
  ],
  neuroquimicos: [
    { nombre: 'Serotonina (5-HT2A)', dir: '+', peso: 1, fuente: 'efecto', rol: 'Percepción, significado', detalle: 'Agonismo parcial de 5-HT2A en neuronas piramidales de capa V; necesario y suficiente para los efectos subjetivos.' },
    { nombre: 'Glutamato cortical', dir: '+', peso: 0.85, fuente: 'efecto', rol: 'Intensidad, pensamiento', detalle: 'Aumento de la liberación de glutamato en la corteza prefrontal (corrientes postsinápticas excitadoras espontáneas, espectroscopia).' },
    { nombre: 'Integración de la red por defecto', dir: '-', peso: 0.8, fuente: 'efecto', rol: 'Disolución del ego', detalle: 'Reducción de la conectividad dentro de la DMN y aumento de la conectividad entre redes (Carhart-Harris et al., 2012).' },
    { nombre: 'Dopamina (estriado)', dir: '+', peso: 0.35, fuente: 'efecto', rol: 'Euforia, a veces', detalle: 'Liberación modesta, ≈20 % de desplazamiento de [11C]raclopride (Vollenweider et al., 1999); indirecta.' },
    { nombre: 'Serotonina (5-HT1A)', dir: '+', peso: 0.4, fuente: 'efecto', rol: 'Ansiolisis, modulación', detalle: 'Agonismo 5-HT1A; puede atenuar parte de la ansiedad.' },
    { nombre: 'Plasticidad (BDNF, espinas)', dir: '+', peso: 0.5, fuente: 'efecto', rol: 'Posibles cambios duraderos', detalle: 'En modelos animales aumenta la densidad de espinas dendríticas durante semanas (Shao et al., 2021). En humanos la evidencia es indirecta.' },
    { nombre: 'Cortisol / prolactina', dir: '+', peso: 0.4, fuente: 'efecto', rol: 'Respuesta de estrés', detalle: 'Aumento agudo dependiente de la dosis.' }
  ],
  adaptaciones: [
    { nombre: 'Receptores 5-HT2A disponibles', rol: 'downregulation', fuente: 'R', a: 0, b: 100, max: 100, sufijo: '%', detalle: 'Internalización mediada por β-arrestina y regulación a la baja. Tolerancia casi completa tras 3–4 días seguidos; se recupera en ≈1–2 semanas.' },
    { nombre: 'Tolerancia cruzada (LSD, mescalina)', rol: 'mismo receptor', fuente: 'R', a: 100, b: -100, max: 100, sufijo: '%', detalle: 'Isbell et al. (1961) demostraron tolerancia cruzada entre LSD y psilocibina.' },
    { nombre: 'Malestar sin la sustancia', rol: 'no hay abstinencia física', fuente: 'B', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Hábito / deseo de repetir', rol: 'bajo potencial adictivo', fuente: 'H', a: 0, b: 100, max: 100, sufijo: '%' }
  ],
  fases: [
    { t0: 0, t1: 0.5, nombre: 'Latencia', texto: 'Digestión y conversión a psilocina. Puede haber náuseas o bostezos.' },
    { t0: 0.5, t1: 1.2, nombre: 'Subida', texto: 'Cambios en colores y sonidos, inquietud, emociones intensas. Momento frecuente de ansiedad.' },
    { t0: 1.2, t1: 3.2, nombre: 'Pico', texto: 'Visuales con ojos cerrados, alteración del tiempo, pensamientos profundos o caóticos, posible disolución del ego.' },
    { t0: 3.2, t1: 5, nombre: 'Meseta y bajada', texto: 'La intensidad baja de forma progresiva; reflexión.' },
    { t0: 5, t1: 7, nombre: 'Regreso', texto: 'Cansancio. En los días siguientes algunas personas notan mejor ánimo («afterglow»).' }
  ],
  abstinencia: {
    inicio: '—', pico: '—', duracion: 'No existe síndrome de abstinencia', peligrosa: false,
    sintomas: ['No hay síntomas físicos al dejarla', 'Posible cansancio el día siguiente', 'Reacciones psicológicas tardías poco frecuentes (ansiedad, desrealización)', 'Raramente, trastorno perceptivo persistente (HPPD)'],
    texto: 'La psilocibina no crea dependencia física: no se mantiene un nuevo equilibrio que necesite la sustancia. Los animales no se autoadministran psilocibina de forma compulsiva.'
  },
  riesgos: {
    agudos: ['Ansiedad intensa, pánico o paranoia («mal viaje»)', 'Conductas peligrosas por confusión (caídas, tráfico, alturas)', 'Náuseas y vómitos', 'Subida moderada de pulso y tensión', 'Confundir especies: algunas setas silvestres (Amanita, Galerina) son mortales'],
    cronicos: ['Puede desencadenar psicosis o manía en personas con predisposición (antecedentes personales o familiares de esquizofrenia o bipolaridad)', 'Trastorno perceptivo persistente por alucinógenos (HPPD), poco frecuente', 'Malestar psicológico prolongado tras experiencias difíciles'],
    alarma: ['Confusión con agitación extrema, fiebre o convulsiones → 112', 'Sospecha de haber comido una seta silvestre equivocada (vómitos y diarrea 6–24 h después) → urgencias de inmediato', 'Pensamientos de hacerse daño → 112 o 024 (línea de atención a la conducta suicida)']
  },
  interacciones: [
    { con: 'Litio', gravedad: 'critica', efecto: 'Convulsiones y reacciones graves descritas al combinar litio con psicodélicos serotoninérgicos.', mecanismo: 'Mecanismo no aclarado; serie de casos y encuestas (Nayak et al., 2021).' },
    { con: 'Tramadol, bupropión', gravedad: 'alta', efecto: 'Bajan el umbral de convulsiones.', mecanismo: 'Proconvulsivantes; el tramadol además es serotoninérgico.' },
    { con: 'IMAO (incluye ayahuasca / harmalas)', gravedad: 'alta', efecto: 'Potencian y alargan el efecto de forma impredecible.', mecanismo: 'La MAO-A participa en la degradación de la psilocina.' },
    { con: 'ISRS y otros antidepresivos', gravedad: 'moderada', efecto: 'Suelen atenuar los efectos; no deben suspenderse por cuenta propia para «notar más».', mecanismo: 'Regulación a la baja de 5-HT2A con el tratamiento crónico.' },
    { con: 'Cannabis', gravedad: 'moderada', efecto: 'Puede intensificar de forma brusca la experiencia y la ansiedad.', mecanismo: 'Interacción farmacodinámica poco caracterizada.' },
    { con: 'Antipsicóticos (quetiapina, risperidona)', gravedad: 'baja', efecto: 'Bloquean o acortan el efecto (se han usado para interrumpir reacciones graves).', mecanismo: 'Antagonismo 5-HT2A.' }
  ],
  mitos: [
    { mito: 'Como son naturales, son seguras.', realidad: 'Su toxicidad física es muy baja, pero el riesgo está en el estado mental, el entorno y las conductas durante el efecto, y en confundir especies: algunas setas silvestres matan.' },
    { mito: 'Si tomas más al día siguiente, compensas la tolerancia.', realidad: 'La tolerancia es casi total tras 2–3 días seguidos: aumentar la dosis da poco efecto adicional y más malestar físico. Hace falta pausa de 1–2 semanas.' },
    { mito: 'Está demostrado que la microdosis mejora el ánimo y la creatividad.', realidad: 'En los ensayos controlados con placebo, los efectos de la microdosis no se distinguen bien del placebo (Szigeti et al., 2021).' },
    { mito: 'Los psicodélicos «queman» el cerebro.', realidad: 'No hay evidencia de neurotoxicidad a dosis habituales. Los riesgos principales son psicológicos y conductuales.' }
  ],
  historiaPreset: 'consecutivos',
  historia: [
    { dia: 0, titulo: 'Primer día', texto: 'Sin tolerancia previa, la dosis de 20 mg produce todo su efecto. Durante la sesión los receptores 5-HT2A ya empiezan a internalizarse.' },
    { dia: 1, titulo: 'Segundo día', texto: 'La misma dosis produce aproximadamente la mitad de efecto: la línea de tolerancia ha subido de golpe en un solo día.' },
    { dia: 4, titulo: 'Quinto día', texto: 'Tolerancia casi completa: la dosis apenas hace efecto. Fíjate en que no hay zona naranja: no existe malestar por la falta de la sustancia.' },
    { dia: 10, titulo: 'Cinco días de pausa', texto: 'Los receptores vuelven a la superficie. La sensibilidad se ha recuperado en buena parte.' },
    { dia: 20, titulo: 'Dos semanas después', texto: 'La tolerancia ha desaparecido. Por eso en los ensayos clínicos se espacian mucho las sesiones.' }
  ],
  farmaco: {
    tabla: [
      ['Profármaco', 'Psilocibina → psilocina (desfosforilación, fosfatasa alcalina)'],
      ['Biodisponibilidad de psilocina', '≈50 % (Hasler et al., 1997)'],
      ['Tmax de psilocina', '≈1,5–2 h (oral)'],
      ['Vida media de psilocina', '≈1,8–3 h'],
      ['Cmax con 25 mg', '≈15–20 ng/mL (Brown et al., 2017)'],
      ['EC50 de ocupación 5-HT2A', '≈1,95 µg/L de psilocina plasmática (Madsen et al., 2019)'],
      ['Duración subjetiva', '4–6 h'],
      ['Factor de conversión', '1 mg de psilocibina ≈ 0,72 mg de psilocina (por masa molar)'],
      ['Eliminación', 'Glucuronidación (UGT1A10 intestinal, UGT1A9 hepática); MAO-A minoritaria'],
      ['Toxicidad', 'Muy baja: DL50 en rata ≈280 mg/kg i.v.; margen de seguridad ≈1000 (Gable, 2004)'],
      ['Potencial de dependencia', 'Muy bajo; sin autoadministración sostenida en animales']
    ],
    afinidad: [
      { diana: '5-HT2A', accion: 'Agonista parcial', ki: '≈6–100 nM', nivel: 4 },
      { diana: '5-HT2C', accion: 'Agonista', ki: '≈100 nM', nivel: 3 },
      { diana: '5-HT1A', accion: 'Agonista', ki: '≈50–600 nM', nivel: 3 },
      { diana: '5-HT2B', accion: 'Agonista', ki: '≈5–50 nM', nivel: 4 },
      { diana: 'Receptores de dopamina', accion: 'Sin afinidad relevante', ki: '> 10 µM', nivel: 1 }
    ],
    metabolismo: 'Psilocibina → <b>psilocina</b> (fosfatasa alcalina en intestino, riñón y sangre). Psilocina → <b>psilocina-O-glucurónido</b> (UGT1A10, UGT1A9; principal producto urinario) y, en menor medida, → 4-hidroxiindol-3-acetaldehído → ácido 4-hidroxiindolacético (MAO-A). La psilocina se oxida con facilidad (coloración azul de las setas al cortarlas).'
  },
  tratamiento: 'No hay dependencia que tratar. En investigación, la psilocibina en dosis única con apoyo psicológico se estudia para depresión resistente (Goodwin et al., 2022), ansiedad en cáncer (Griffiths et al., 2016) y adicción al tabaco o al alcohol.',
  escalas: { dependencia: 1, abstinencia: 0, toxicidad: 1 }, nutt: 6, nuttNombre: 'Setas alucinógenas',
  referencias: [
    'Brown RT et al. Pharmacokinetics of escalating doses of oral psilocybin in healthy adults. Clin Pharmacokinet. 2017;56(12):1543-1554.',
    'Hasler F et al. Determination of psilocin and 4-hydroxyindole-3-acetic acid in plasma by HPLC-ECD and pharmacokinetic profiles of oral and intravenous psilocybin in man. Pharm Acta Helv. 1997;72(3):175-184.',
    'Madsen MK et al. Psychedelic effects of psilocybin correlate with serotonin 2A receptor occupancy and plasma psilocin levels. Neuropsychopharmacology. 2019;44(7):1328-1334.',
    'Vollenweider FX et al. Psilocybin induces schizophrenia-like psychosis in humans via a serotonin-2 agonist action. Neuroreport. 1998;9(17):3897-3902.',
    'Isbell H et al. Cross tolerance between LSD and psilocybin. Psychopharmacologia. 1961;2:147-159.',
    'Carhart-Harris RL et al. Neural correlates of the psychedelic state as determined by fMRI studies with psilocybin. PNAS. 2012;109(6):2138-2143.',
    'Nichols DE. Psychedelics. Pharmacol Rev. 2016;68(2):264-355.',
    'Goodwin GM et al. Single-dose psilocybin for a treatment-resistant episode of major depression. N Engl J Med. 2022;387(18):1637-1648.',
    'Szigeti B et al. Self-blinding citizen science to explore psychedelic microdosing. eLife. 2021;10:e62878.',
    'Nayak SM et al. Classic psychedelic coadministration with lithium, but not lamotrigine, is associated with seizures. Psychiatry Res. 2021;304:114148.',
    'Johnson MW, Richards WA, Griffiths RR. Human hallucinogen research: guidelines for safety. J Psychopharmacol. 2008;22(6):603-620.'
  ]
});
