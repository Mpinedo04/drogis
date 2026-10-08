NT.registrar({
  id: 'alcohol', numero: 3, simbolo: 'Et', nombre: 'Alcohol', color: '#378ADD',
  subtitulo: 'Etanol: cerveza, vino, destilados',
  categoria: 'depresor', formula: 'C₂H₅OH', masaMolar: 46.07,
  ficha: { vidaMedia: 'Orden cero: ≈0,15 g/L/h', duracion: 'Depende de la cantidad', inicio: '10–30 min' },
  etiquetas: {
    efecto: 'Placer / desinhibición', neto: 'Placer neto', malestar: 'Malestar sin alcohol',
    aporte: 'Lo que aporta una sesión', costumbre: 'Línea de costumbre', tolerancia: 'Receptores adaptados'
  },
  resumen: {
    basico: 'El alcohol potencia el freno del cerebro (GABA), bloquea el acelerador (glutamato) y libera dopamina y endorfinas. Con el consumo frecuente el cerebro sube el acelerador para compensar: hace falta más alcohol, y sin él aparecen ansiedad, temblor y, en casos graves, convulsiones.',
    principiante: 'El alcohol actúa sobre muchos sistemas a la vez. Refuerza el efecto del [[GABA]], el freno del cerebro, y bloquea parte del [[glutamato]], el acelerador: por eso relaja, desinhibe y, en cantidad, duerme y borra recuerdos. Además libera [[dopamina]] y [[endorfinas]], que dan la sensación de euforia. Con el consumo frecuente el cerebro se adapta: retira receptores de GABA, añade receptores de glutamato y activa sus sistemas de estrés. Así, la persona necesita beber para estar «normal», y al dejarlo de golpe el cerebro queda con el acelerador pisado: [[abstinencia]] que puede ser peligrosa.',
    pro: 'Etanol: molécula pequeña y anfipática sin receptor único. Modulador alostérico positivo de GABA-A (especialmente subtipos extrasinápticos δ con α4/α6 a concentraciones bajas), antagonista no competitivo de NMDA (subunidades GluN2B), potenciador de glicina, 5-HT3 y nAChR, e inhibidor de canales de calcio tipo L. Libera dopamina en el núcleo accumbens de forma indirecta (desinhibición GABAérgica en el VTA y liberación de β-endorfina y encefalinas). La adaptación crónica incluye cambios en la composición de GABA-A (↓α1, ↑α4), upregulation de NMDA-GluN2B y canales de calcio, reclutamiento de CRF y dinorfina en la amígdala extendida, e inducción de CYP2E1 (tolerancia metabólica). La abstinencia es un estado hiperglutamatérgico con riesgo de convulsiones y delirium tremens, y empeora con cada episodio (kindling).'
  },
  basico: 'Línea morada: lo que aporta una sesión de bebida la primera vez (100 %). Línea ámbar: la costumbre. Con el consumo frecuente sube y se queda arriba incluso los días sin beber (zona naranja: ansiedad, insomnio, temblor). Las caídas por debajo de cero tras beber mucho son la resaca.',
  mecanismo: {
    simple: 'Potencia el GABA (freno), bloquea el glutamato (acelerador) y libera dopamina y endorfinas.',
    pro: 'Acciones a concentraciones de 5–100 mM (0,2–4,6 g/L): GABA-A δ extrasinápticos sensibles a 3–30 mM; NMDA inhibido con IC50 ≈ 30–100 mM; acción sobre canales GIRK, BK y 5-HT3. El efecto bifásico (estimulante en la subida, sedante en la bajada) refleja la dinámica de la dopamina y la tolerancia aguda (efecto Mellanby).'
  },
  sinapsis: {
    tipo: 'pam', nt: { nombre: 'GABA', color: '#1D9E75' }, droga: { nombre: 'Etanol', color: '#378ADD' },
    receptor: 'Receptor GABA-A', transportadorNombre: 'transportador GAT', cronicoReceptores: 0.8, cronicoDesens: 0.1,
    senal: 'Inhibición (entrada de cloruro)',
    textos: {
      sin: 'El GABA (círculos verdes) abre los receptores GABA-A y entra cloruro en la neurona receptora (puntos): la neurona se frena un poco.',
      con: 'El etanol (rombos) se pega a otra parte del receptor y hace que cada apertura deje pasar más cloruro: la neurona se frena mucho más. Por eso relaja, desinhibe y, en exceso, adormece y deprime la respiración.',
      cronico: 'Con el consumo frecuente, la neurona retira receptores GABA-A (hay menos) y cambia su composición, a la vez que refuerza el glutamato. Sin alcohol, el freno es demasiado débil: ansiedad, temblor, insomnio y, en casos graves, convulsiones.'
    }
  },
  unidades: { dosis: 'UBE', dosisNombre: 'consumición', dosisPlural: 'Consumiciones', conc: 'g/L', concNombre: 'Alcoholemia (sangre)', sesion: 'sesión' },
  formaEtiqueta: 'Estómago',
  pk: { F: 0.85, ka: 4, lag: 0.05, VdSexo: { h: 0.68, m: 0.55 }, ke0: 3, cf: 10, mm: { Vmax: 0.17, Km: 0.08 } },
  formas: [
    { id: 'vacio', nombre: 'Con el estómago vacío', nota: '1 UBE = 10 g de alcohol puro. En ayunas la alcoholemia sube más rápido y más alto.', duracion: 2.5 },
    { id: 'comida', nombre: 'Comiendo', nota: 'La comida retrasa el vaciado gástrico: el pico es más bajo y tardío (≈20–30 % menos).', pk: { F: 0.7, ka: 1.2, lag: 0.15 }, duracion: 3 }
  ],
  pd: { ec50: 0.35, n: 2, emax: 100, aversion: { ec50: 2.2, n: 4, emax: 140 } },
  tol: { kdes: 0.05, krec: 0.05, rmin: 0.5, nombre: 'Tolerancia aguda (Mellanby) y crónica de GABA-A' },
  tol2: { kdes: 0.12, krec: 0.03, rmin: 0.45, nombre: 'Tolerancia al deterioro psicomotor' },
  oponentes: [
    { gamma: 0.35, tau: 10, nombre: 'Rebote / resaca (horas)' },
    { gamma: 1.3, tau: 504, nombre: 'Alostasis: ↑glutamato, ↑CRF (semanas)' }
  ],
  metabolica: { kup: 0.012, kdown: 0.004, max: 0.9, nombre: 'Inducción de CYP2E1' },
  habito: { k: 0.004, vida: 365 },
  canales: [
    { id: 'deterioro', nombre: 'Deterioro psicomotor (conducción, reflejos)', ec50: 0.8, n: 2.5, tol: 'R2', conc: 'C', color: '#BA7517' },
    { id: 'snc', nombre: 'Depresión del SNC / riesgo vital', ec50: 3.5, n: 5, tol: 'none', conc: 'C', umbral: 50, color: '#E24B4A' }
  ],
  bandasConc: [
    { desde: 0.3, hasta: 0.5, texto: 'Límite de conducción: 0,5 g/L (0,3 noveles y profesionales)', nivel: 'info' },
    { desde: 0.5, hasta: 1.5, texto: 'Embriaguez: torpeza, desinhibición, tiempo de reacción alterado', nivel: 'aviso' },
    { desde: 1.5, hasta: 3, texto: 'Intoxicación grave: vómitos, confusión, lagunas', nivel: 'peligro' },
    { desde: 3, hasta: 9, texto: 'Coma y riesgo de muerte (≈4–5 g/L)', nivel: 'critico' }
  ],
  limites: { dosis: [0.5, 3, 0.5], porSesion: [1, 20], intervalo: [0.25, 3, 0.25] },
  presets: [
    { id: 'diario', nombre: 'Diario intenso (8 UBE)', desc: '8 consumiciones cada tarde-noche (una cada 45 min desde las 18:00), durante un año.', cfg: { forma: 'comida', dosis: 1, porSesion: 8, intervalo: 0.75, inicio: 18, frecuencia: 'diario', horizonte: 365 } },
    { id: 'moderado', nombre: 'Bajo (2 UBE, 3 días/sem)', desc: 'Dos consumiciones con la cena tres días por semana.', cfg: { forma: 'comida', dosis: 1, porSesion: 2, intervalo: 1, inicio: 21, frecuencia: 'tresSem', horizonte: 180 } },
    { id: 'atracon', nombre: 'Atracón de fin de semana', desc: '8 consumiciones en unas 4 horas las noches de viernes y sábado.', cfg: { forma: 'vacio', dosis: 1, porSesion: 8, intervalo: 0.5, inicio: 23, frecuencia: 'finde', horizonte: 180 } },
    { id: 'dependencia', nombre: 'Dependencia y abandono brusco', desc: '18 UBE al día (una cada 45 min desde las 11:00) durante 8 meses y abandono de golpe el día 240 (abstinencia peligrosa).', cfg: { forma: 'vacio', dosis: 1, porSesion: 18, intervalo: 0.75, inicio: 11, frecuencia: 'diario', horizonte: 300, dejar: 240 } },
    { id: 'gradual', nombre: 'Dependencia y reducción gradual', desc: 'Igual, pero reduciendo poco a poco durante 3 semanas (en la práctica, con supervisión médica).', cfg: { forma: 'vacio', dosis: 1, porSesion: 18, intervalo: 0.75, inicio: 11, frecuencia: 'diario', horizonte: 300, dejar: 240, gradual: 3 } }
  ],
  neuroquimicos: [
    { nombre: 'GABA (GABA-A)', dir: '+', peso: 0.9, fuente: 'efecto', rol: 'Relajación, desinhibición', detalle: 'Modulación alostérica positiva, sobre todo de receptores extrasinápticos δ (inhibición tónica).' },
    { nombre: 'Dopamina (accumbens)', dir: '+', peso: 1, fuente: 'efecto', rol: 'Euforia, «otra ronda»', detalle: 'Aumento indirecto por desinhibición del VTA; mayor en la fase de subida de la alcoholemia.' },
    { nombre: 'β-endorfina / encefalinas', dir: '+', peso: 0.8, fuente: 'efecto', rol: 'Bienestar', detalle: 'Liberación de opioides endógenos; base del uso de naltrexona y nalmefeno en el tratamiento.' },
    { nombre: 'Glutamato (NMDA)', dir: '-', peso: 0.7, fuente: 'efecto', rol: 'Torpeza, lagunas', detalle: 'Antagonismo NMDA en el hipocampo: bloquea la potenciación a largo plazo y la formación de memoria («lagunas»).' },
    { nombre: 'Serotonina (5-HT3)', dir: '+', peso: 0.4, fuente: 'efecto', rol: 'Náuseas', detalle: 'Potenciación de 5-HT3: náuseas y vómitos a dosis altas.' },
    { nombre: 'Adenosina', dir: '+', peso: 0.4, fuente: 'efecto', rol: 'Somnolencia', detalle: 'Inhibición del transportador ENT1: más adenosina extracelular y sueño.' },
    { nombre: 'Vasopresina (ADH)', dir: '-', peso: 0.5, fuente: 'efecto', rol: 'Orinar más', detalle: 'Inhibición de la hormona antidiurética: diuresis y deshidratación.' },
    { nombre: 'CRF / noradrenalina', dir: '+', peso: 0.9, fuente: 'malestar', rol: 'Ansiedad, temblor sin alcohol', detalle: 'Reclutamiento de CRF en la amígdala extendida y del locus coeruleus durante la abstinencia.' },
    { nombre: 'Glutamato (rebote)', dir: '+', peso: 0.9, fuente: 'malestar', rol: 'Hiperexcitabilidad, convulsiones', detalle: 'Upregulation de NMDA-GluN2B y de canales de calcio: tras la retirada el sistema queda hiperexcitado.' }
  ],
  adaptaciones: [
    { nombre: 'Receptores GABA-A funcionales', rol: 'menos freno', fuente: 'R', a: 0, b: 100, max: 100, sufijo: '%', detalle: 'Internalización de α1 y aumento de α4/δ con alteración de la sensibilidad a benzodiacepinas y neuroesteroides.' },
    { nombre: 'Malestar sin alcohol', rol: 'ansiedad, insomnio, temblor', fuente: 'B', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Velocidad de eliminación', rol: 'tolerancia metabólica (CYP2E1)', fuente: 'Mt', a: 100, b: 100, max: 200, sufijo: '%', detalle: 'Los bebedores crónicos eliminan hasta 0,25–0,35 g/L/h frente a 0,15 de media.' },
    { nombre: 'Fuerza del hábito', rol: 'asociaciones y craving', fuente: 'H', a: 0, b: 100, max: 100, sufijo: '%' }
  ],
  fases: [
    { t0: 0, t1: 0.4, nombre: 'Absorción', texto: 'La alcoholemia sube. Fase más «estimulante»: euforia, locuacidad.' },
    { t0: 0.4, t1: 1.2, nombre: 'Pico', texto: 'Máxima alcoholemia de cada consumición: 30–90 minutos después.' },
    { t0: 1.2, t1: 4, nombre: 'Eliminación', texto: 'El hígado elimina a ritmo casi constante (unos 0,15 g/L por hora). Domina la sedación.' },
    { t0: 4, t1: 14, nombre: 'Resaca', texto: 'Cuando la alcoholemia llega a cero: dolor de cabeza, malestar, ansiedad (rebote), mal sueño.' }
  ],
  abstinencia: {
    inicio: '6–24 h', pico: '24–72 h', duracion: '5–7 días (síntomas leves: semanas)', peligrosa: true,
    sintomas: ['Temblor, sudor, taquicardia', 'Ansiedad, irritabilidad, insomnio', 'Náuseas y vómitos', 'Alucinaciones (12–48 h)', 'Convulsiones (6–48 h)', 'Delirium tremens (48–96 h): confusión, fiebre, mortalidad sin tratamiento de hasta un 5–15 %'],
    texto: 'La abstinencia de alcohol puede ser mortal. Tras un consumo diario intenso nunca debe dejarse de golpe sin supervisión médica: se trata con benzodiacepinas en pauta descendente y tiamina. Cada abstinencia hace la siguiente más grave (kindling).'
  },
  riesgos: {
    agudos: ['Intoxicación: vómitos, aspiración, hipotermia, hipoglucemia, coma', 'Accidentes de tráfico, caídas, ahogamientos', 'Violencia y conductas sexuales de riesgo', 'Lagunas de memoria', 'Arritmias tras atracones («corazón de fiesta»)'],
    cronicos: ['Cáncer (carcinógeno del grupo 1): boca, faringe, laringe, esófago, hígado, colon y mama', 'Hígado graso, hepatitis alcohólica y cirrosis', 'Pancreatitis', 'Hipertensión, miocardiopatía, fibrilación auricular', 'Daño cerebral: Wernicke-Korsakoff (déficit de tiamina), atrofia', 'Depresión, ansiedad, trastorno por consumo de alcohol', 'Síndrome alcohólico fetal: no hay cantidad segura en el embarazo'],
    alarma: ['No responde, respira lento o irregular, piel fría o azulada, vómitos estando inconsciente → 112 y posición lateral de seguridad', 'Temblor intenso, alucinaciones, confusión o convulsiones al dejar de beber → urgencias']
  },
  interacciones: [
    { con: 'Benzodiacepinas, GHB, opioides, pregabalina', gravedad: 'critica', efecto: 'Depresión respiratoria y muerte incluso con dosis que por separado serían toleradas.', mecanismo: 'Sinergia sobre GABA-A y el centro respiratorio del tronco cerebral.' },
    { con: 'Cocaína', gravedad: 'alta', efecto: 'Se forma cocaetileno, más cardiotóxico y de mayor duración. Más riesgo de infarto y muerte súbita.', mecanismo: 'Transesterificación hepática por la carboxilesterasa hCE-1.' },
    { con: 'Paracetamol (consumo crónico)', gravedad: 'alta', efecto: 'Más riesgo de daño hepático grave.', mecanismo: 'CYP2E1 inducido produce más NAPQI tóxico y el glutatión está reducido.' },
    { con: 'Bebidas energéticas', gravedad: 'moderada', efecto: 'Enmascaran la sensación de borrachera: se bebe más y se subestima el deterioro.', mecanismo: 'La cafeína contrarresta la somnolencia pero no el deterioro psicomotor.' },
    { con: 'Antidiabéticos (insulina, sulfonilureas)', gravedad: 'alta', efecto: 'Hipoglucemias graves, sobre todo en ayunas.', mecanismo: 'El etanol inhibe la gluconeogénesis hepática.' },
    { con: 'Metronidazol, disulfiram', gravedad: 'moderada', efecto: 'Reacción tipo disulfiram: rubor, náuseas, taquicardia (clara con disulfiram; discutida con metronidazol).', mecanismo: 'Inhibición de la aldehído deshidrogenasa: se acumula acetaldehído.' },
    { con: 'Antihistamínicos sedantes, antidepresivos sedantes', gravedad: 'moderada', efecto: 'Más somnolencia y deterioro psicomotor.', mecanismo: 'Depresión aditiva del SNC.' }
  ],
  mitos: [
    { mito: 'Un café o una ducha fría bajan la alcoholemia.', realidad: 'Solo el tiempo la baja: el hígado elimina a ritmo casi fijo (≈0,15 g/L por hora). El café puede hacerte sentir más despierto, pero no menos borracho.' },
    { mito: 'El alcohol da calor.', realidad: 'Dilata los vasos de la piel: notas calor, pero el cuerpo pierde temperatura más rápido. Aumenta el riesgo de hipotermia.' },
    { mito: 'Una copa ayuda a dormir.', realidad: 'Acelera el inicio del sueño pero lo fragmenta en la segunda mitad de la noche y reduce el sueño REM; con el uso diario aparece tolerancia y rebote de insomnio.' },
    { mito: 'Una copa de vino al día es saludable.', realidad: 'Los estudios que mostraban beneficio tenían sesgos (comparaban con exbebedores enfermos). Los análisis más recientes no encuentran un nivel de consumo sin riesgo (Zhao et al., 2023; OMS, 2023).' },
    { mito: 'Aguantar mucho el alcohol es buena señal.', realidad: 'La tolerancia alta es un signo de adaptación cerebral y un factor de riesgo de trastorno por consumo (Schuckit, 1994).' }
  ],
  historiaPreset: 'dependencia',
  historia: [
    { dia: 0, titulo: 'Primeras semanas', texto: 'Cada día de bebida aporta su efecto completo. Por la mañana aparece algo de resaca (pequeña caída), pero el resto del tiempo se vuelve al nivel natural.' },
    { dia: 30, titulo: 'Un mes', texto: 'La tolerancia aguda y la crónica se suman: la misma cantidad sienta menos. El hígado elimina el alcohol más rápido (tolerancia metabólica) y el cerebro empieza a subir su «acelerador».' },
    { dia: 150, titulo: 'Cinco meses', texto: 'La costumbre está muy alta. Los ratos sin alcohol (por ejemplo, al despertar) ya son malestar: ansiedad, temblor, náuseas. Beber por la mañana para «estar normal» es un signo de dependencia.' },
    { dia: 242, titulo: 'Dos días tras dejarlo de golpe', texto: 'Pico de la abstinencia. El freno (GABA) está debilitado y el acelerador (glutamato) reforzado: riesgo de convulsiones y delirium tremens. En la vida real esto requiere atención médica.' },
    { dia: 242, cfg: { gradual: 3 }, titulo: 'La alternativa: reducir poco a poco', texto: 'Con una reducción gradual (en la práctica se hace con benzodiacepinas pautadas por un médico) la costumbre baja a la vez que el consumo y el pico de malestar es mucho menor.' },
    { dia: 299, titulo: 'Dos meses después', texto: 'La costumbre ha bajado casi del todo, pero el hábito y el craving persisten y el riesgo de recaída es alto. La siguiente abstinencia sería más intensa (kindling).' }
  ],
  farmaco: {
    tabla: [
      ['Absorción', 'Estómago (20 %) e intestino delgado (80 %); la comida la retrasa'],
      ['Tmax', '30–90 min (en ayunas, más rápido)'],
      ['Distribución', 'Agua corporal total: r de Widmark ≈0,68 L/kg (hombres), ≈0,55 L/kg (mujeres)'],
      ['Eliminación', 'Orden cero: 0,10–0,25 g/L/h (media ≈0,15); hasta 0,35 en bebedores crónicos'],
      ['Enzimas', 'ADH (Km ≈ 0,05–0,1 g/L), CYP2E1 (MEOS, inducible), catalasa'],
      ['Metabolito tóxico', 'Acetaldehído (carcinógeno) → acetato (ALDH2)'],
      ['Efecto de primer paso', 'Gástrico, mayor con comida y en hombres'],
      ['Excreción inalterada', '2–10 % (aliento, orina, sudor)'],
      ['Alcoholemia letal', '≈4–5 g/L en no habituados (menor con otros depresores)'],
      ['1 UBE (España)', '10 g de alcohol: sube ≈0,2 g/L en un hombre de 70 kg']
    ],
    afinidad: [
      { diana: 'GABA-A δ extrasináptico', accion: 'Modulador positivo', ki: '3–30 mM', nivel: 3 },
      { diana: 'GABA-A sináptico (α1β2γ2)', accion: 'Modulador positivo', ki: '50–100 mM', nivel: 2 },
      { diana: 'NMDA (GluN2B)', accion: 'Antagonista no competitivo', ki: 'IC50 ≈ 30–100 mM', nivel: 2 },
      { diana: 'Glicina', accion: 'Potenciador', ki: '10–100 mM', nivel: 2 },
      { diana: '5-HT3', accion: 'Potenciador', ki: '25–100 mM', nivel: 2 },
      { diana: 'Canales GIRK, BK', accion: 'Activador', ki: '20–100 mM', nivel: 2 }
    ],
    metabolismo: 'Etanol → <b>acetaldehído</b> (ADH citosólica, ≈90 %; CYP2E1 microsomal, inducible; catalasa) → <b>acetato</b> (ALDH2 mitocondrial) → acetil-CoA → CO₂ + H₂O. La variante ALDH2*2 (frecuente en Asia oriental) acumula acetaldehído: rubor, náuseas y más riesgo de cáncer de esófago. El exceso de NADH explica la hipoglucemia, la acidosis láctica y el hígado graso.'
  },
  tratamiento: 'Desintoxicación supervisada (benzodiacepinas en pauta descendente, tiamina antes de dar glucosa). Prevención de recaídas: naltrexona, nalmefeno, acamprosato, disulfiram, y terapia psicológica o grupos de ayuda mutua.',
  escalas: { dependencia: 4, abstinencia: 5, toxicidad: 4 }, nutt: 72, nuttNombre: 'Alcohol',
  referencias: [
    'Jones AW. Evidence-based survey of the elimination rates of ethanol from blood with applications in forensic casework. Forensic Sci Int. 2010;200(1-3):1-20.',
    'Widmark EMP. Die theoretischen Grundlagen und die praktische Verwendbarkeit der gerichtlich-medizinischen Alkoholbestimmung. 1932.',
    'Koob GF, Volkow ND. Neurobiology of addiction: a neurocircuitry analysis. Lancet Psychiatry. 2016;3(8):760-773.',
    'Abrahao KP, Salinas AG, Lovinger DM. Alcohol and the brain: neuronal molecular targets, synapses, and circuits. Neuron. 2017;96(6):1223-1238.',
    'Mayo-Smith MF. Pharmacological management of alcohol withdrawal. JAMA. 1997;278(2):144-151.',
    'Schuckit MA. Low level of response to alcohol as a predictor of future alcoholism. Am J Psychiatry. 1994;151(2):184-189.',
    'GBD 2016 Alcohol Collaborators. Alcohol use and burden for 195 countries and territories. Lancet. 2018;392:1015-1035.',
    'Zhao J et al. Association between daily alcohol intake and risk of all-cause mortality. JAMA Netw Open. 2023;6(3):e236185.',
    'Becker HC. Kindling in alcohol withdrawal. Alcohol Health Res World. 1998;22(1):25-33.',
    'Nutt DJ, King LA, Phillips LD. Drug harms in the UK: a multicriteria decision analysis. Lancet. 2010;376:1558-1565.'
  ]
});
