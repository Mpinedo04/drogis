NT.registrar({
  id: 'cannabis', numero: 7, simbolo: 'Th', nombre: 'Cannabis', color: '#639922',
  subtitulo: 'THC: marihuana, hachís, comestibles, extractos',
  categoria: 'cannabinoide', formula: 'C₂₁H₃₀O₂ (Δ9-THC)', masaMolar: 314.46,
  ficha: { vidaMedia: '≈1–2 días (terminal); días a semanas en uso diario', duracion: '2–4 h fumado; 4–12 h comestible', inicio: 'Minutos (fumado); 30–120 min (comestible)' },
  etiquetas: {
    efecto: 'Colocón / relajación', neto: 'Efecto neto', malestar: 'Malestar sin cannabis',
    aporte: 'Lo que aporta una sesión', costumbre: 'Línea de costumbre', tolerancia: 'Receptores CB1 retirados'
  },
  resumen: {
    basico: 'El THC activa los receptores cannabinoides CB1, que actúan como freno de muchas neuronas: quita el freno a la dopamina, altera la memoria a corto plazo y da hambre. Con el uso diario el cerebro retira receptores CB1 y aparece una abstinencia moderada (irritabilidad, insomnio, falta de apetito).',
    principiante: 'El cerebro tiene su propio sistema cannabinoide: moléculas como la anandamida que las neuronas fabrican al momento para regular cuánto neurotransmisor se libera. El THC imita a esas moléculas y activa los [[receptores|receptor]] CB1, que están en la neurona emisora y funcionan como un freno. Al frenar las neuronas que inhiben a las de [[dopamina]], la dopamina sube (relajación, euforia). Al frenar el [[glutamato]] del hipocampo, la memoria a corto plazo falla. Además da hambre. El THC es muy soluble en grasa: se guarda en los tejidos y sale despacio, por eso en consumidores diarios siempre queda algo en sangre. Con el uso diario el cerebro retira receptores CB1 ([[downregulation]]): la tolerancia es real y la [[abstinencia]], aunque no es peligrosa, existe.',
    pro: 'Δ9-THC: agonista parcial de CB1 (Ki ≈ 10–40 nM) y CB2. Los CB1 son receptores Gi/o presinápticos que reducen la liberación de GABA y glutamato (señalización retrógrada endocannabinoide). En el VTA, la inhibición de aferencias GABAérgicas aumenta la descarga dopaminérgica; en el hipocampo, la inhibición glutamatérgica y la alteración de oscilaciones explican el déficit de memoria de trabajo y episódica. Farmacocinética multicompartimental: distribución rápida (t½α ≈ 30 min), gran volumen periférico (tejido adiposo) y eliminación terminal lenta; metabolismo por CYP2C9 (→ 11-OH-THC, activo y más potente) y CYP3A4 (→ THC-COOH, inactivo). La downregulation de CB1 en usuarios diarios (≈15–20 % en PET; Hirvonen et al., 2012) empieza a revertir a los 2 días y se normaliza en ≈4 semanas (D’Souza et al., 2016).'
  },
  basico: 'Línea morada: lo que aporta una sesión la primera vez (100 %). Línea ámbar: la costumbre; con el uso diario sube y se mantiene, en parte por pérdida de receptores CB1 (gris) y en parte por adaptación (naranja: irritabilidad, insomnio, falta de apetito al dejarlo).',
  mecanismo: {
    simple: 'Activa los receptores CB1, el «freno» del sistema endocannabinoide. Es un agonista parcial.',
    pro: 'Agonista parcial CB1/CB2. El CBD es un modulador alostérico negativo débil de CB1 y tiene otras dianas (5-HT1A, TRPV1, GPR55); su presencia puede atenuar algunos efectos ansiógenos y psicotomiméticos del THC, aunque la evidencia es mixta.'
  },
  sinapsis: {
    tipo: 'retrogrado', nt: { nombre: 'GABA', color: '#1D9E75' }, droga: { nombre: 'THC', color: '#639922' },
    receptor: 'Receptor GABA-A', tituloPre: 'Neurona GABA (freno de la dopamina)', tituloPost: 'Neurona de dopamina (VTA)',
    cronicoReceptores: 0.6, senal: 'Freno GABA sobre la neurona de dopamina',
    textos: {
      sin: 'Una neurona GABA (arriba) frena a una neurona de dopamina (abajo). Cuando hace falta, el propio cerebro fabrica endocannabinoides que activan los CB1 y reducen ese freno durante un momento.',
      con: 'El THC (rombos) activa los receptores CB1 de la neurona GABA durante horas: libera menos GABA, el freno se afloja y la neurona de dopamina se dispara más. El mismo mecanismo en el hipocampo reduce el glutamato y afecta a la memoria.',
      cronico: 'Con el uso diario hay menos receptores CB1: el THC frena menos (tolerancia) y el sistema endocannabinoide propio también funciona peor. Al dejarlo aparecen irritabilidad, insomnio y falta de apetito hasta que los CB1 se recuperan (≈4 semanas).'
    }
  },
  unidades: { dosis: 'mg THC', dosisNombre: 'porro / dosis', dosisPlural: 'Porros / dosis', conc: 'ng/mL', concNombre: 'THC en plasma', sesion: 'día' },
  formaEtiqueta: 'Vía',
  pk: { F: 0.25, ka: 25, lag: 0, Vc: 1.0, Vp: 25, Q: 1.5, CL: 1.0, ke0: 1.2, cf: 1000 },
  formas: [
    { id: 'fumado', nombre: 'Fumado (porro)', nota: 'Dosis = mg de THC en lo que se fuma. Un porro de 0,3 g de hierba al 15 % lleva ≈45 mg; se absorbe un 10–35 %.', duracion: 3 },
    { id: 'vapo', nombre: 'Vaporizado', nota: 'Algo más eficiente que fumar y sin combustión.', pk: { F: 0.3, ka: 25 }, duracion: 3 },
    { id: 'comestible', nombre: 'Comestible', nota: 'Biodisponibilidad baja (4–12 %) pero el hígado produce 11-OH-THC, más potente: efecto tardío (30–120 min), intenso y largo. Causa frecuente de intoxicaciones por redosificar.', pk: { F: 0.06, ka: 0.8, lag: 0.5, ke0: 0.8 }, pd: { potencia: 3 }, duracion: 7 }
  ],
  pd: { ec50: 8, n: 1.5, emax: 100 },
  tol: { kdes: 0.04, krec: 0.0058, rmin: 0.3, nombre: 'Downregulation de CB1' },
  oponentes: [{ gamma: 0.8, tau: 120, nombre: 'Adaptación (días)' }],
  habito: { k: 0.0025, vida: 300 },
  canales: [
    { id: 'taqui', nombre: 'Taquicardia', ec50: 10, n: 1.5, tol: 'R', color: '#BA7517' },
    { id: 'ansiedad', nombre: 'Riesgo de ansiedad / psicosis aguda', ec50: 26, n: 2.5, tol: 'R', umbral: 50, color: '#D85A30' }
  ],
  bandasConc: [
    { desde: 2, hasta: 5, texto: 'Residual en consumidores diarios (2–5 ng/mL)', nivel: 'info' },
    { desde: 5, hasta: 300, texto: 'Tras fumar: pico de 50–200 ng/mL en minutos', nivel: 'aviso' }
  ],
  limites: { dosis: [2, 100, 1], porSesion: [1, 8], intervalo: [0.5, 8, 0.5] },
  presets: [
    { id: 'diario', nombre: 'Diario (3 porros)', desc: '3 porros de 20 mg de THC al día (14:00, 18:00, 22:00) durante un año.', cfg: { forma: 'fumado', dosis: 20, porSesion: 3, intervalo: 4, inicio: 14, frecuencia: 'diario', horizonte: 365 } },
    { id: 'ocasional', nombre: 'Ocasional', desc: 'Un porro el sábado por la noche.', cfg: { forma: 'fumado', dosis: 20, porSesion: 1, intervalo: 1, inicio: 22, frecuencia: 'semanal', horizonte: 120 } },
    { id: 'dejar', nombre: 'Diario y abandono', desc: '3 porros al día durante 6 meses y abandono el día 180.', cfg: { forma: 'fumado', dosis: 20, porSesion: 3, intervalo: 4, inicio: 14, frecuencia: 'diario', horizonte: 240, dejar: 180 } },
    { id: 'comestible', nombre: 'Comestible (20 mg)', desc: 'Un comestible de 20 mg de THC: retraso y duración frente al fumado.', cfg: { forma: 'comestible', dosis: 20, porSesion: 1, intervalo: 1, inicio: 20, frecuencia: 'unica', horizonte: 7 } },
    { id: 'redosis', nombre: 'Comestible y redosis', desc: '20 mg y otros 20 mg a la hora «porque no sube»: el error más común.', cfg: { forma: 'comestible', dosis: 20, porSesion: 2, intervalo: 1, inicio: 20, frecuencia: 'unica', horizonte: 7 } }
  ],
  neuroquimicos: [
    { nombre: 'Endocannabinoides (CB1)', dir: '+', peso: 1, fuente: 'efecto', rol: 'Relajación, colocón', detalle: 'Agonismo parcial de CB1 presinápticos en todo el cerebro.' },
    { nombre: 'Dopamina (accumbens)', dir: '+', peso: 0.6, fuente: 'efecto', rol: 'Euforia, recompensa', detalle: 'Aumento indirecto y modesto por desinhibición del VTA (Bossong et al., 2009).' },
    { nombre: 'GABA', dir: '-', peso: 0.7, fuente: 'efecto', rol: 'Menos freno', detalle: 'Reducción de la liberación de GABA en el VTA, la amígdala y la corteza.' },
    { nombre: 'Glutamato (hipocampo)', dir: '-', peso: 0.75, fuente: 'efecto', rol: 'Memoria a corto plazo ↓', detalle: 'Inhibición presináptica y alteración de oscilaciones gamma/theta.' },
    { nombre: 'Acetilcolina (hipocampo)', dir: '-', peso: 0.5, fuente: 'efecto', rol: 'Atención ↓', detalle: 'Reducción de la liberación de acetilcolina en hipocampo y corteza.' },
    { nombre: 'Señal de hambre (hipotálamo)', dir: '+', peso: 0.7, fuente: 'efecto', rol: '«Bajona», apetito', detalle: 'Activación de neuronas POMC con liberación de β-endorfina en lugar de α-MSH y aumento de grelina.' },
    { nombre: 'Noradrenalina', dir: '+', peso: 0.4, fuente: 'efecto', rol: 'Taquicardia', detalle: 'Activación simpática y taquicardia de hasta +20–50 lpm.' },
    { nombre: 'CRF / ansiedad (rebote)', dir: '+', peso: 0.7, fuente: 'malestar', rol: 'Irritabilidad, insomnio', detalle: 'Componente del síndrome de abstinencia de cannabis (Budney et al., 2004).' }
  ],
  adaptaciones: [
    { nombre: 'Receptores CB1 disponibles', rol: 'downregulation', fuente: 'R', a: 0, b: 100, max: 100, sufijo: '%', detalle: 'PET con [18F]FMPEP-d2: −15–20 % en corteza de consumidores diarios; reversible (Hirvonen et al., 2012).' },
    { nombre: 'Malestar sin cannabis', rol: 'irritabilidad, insomnio, inapetencia', fuente: 'B', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Fuerza del hábito', rol: 'rutina, craving', fuente: 'H', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Motivación por recompensas naturales', rol: 'posible reducción con uso intenso', fuente: 'B', a: 100, b: -40, max: 100, sufijo: '%' }
  ],
  fases: [
    { t0: 0, t1: 0.15, nombre: 'Subida', texto: 'En minutos tras fumar: taquicardia, ojos rojos, primeras sensaciones.' },
    { t0: 0.15, t1: 1, nombre: 'Pico', texto: 'Relajación, euforia, risa, percepción del tiempo alterada, memoria a corto plazo peor.' },
    { t0: 1, t1: 3, nombre: 'Meseta y bajada', texto: 'Aparece el hambre y la somnolencia.' },
    { t0: 3, t1: 6, nombre: 'Resaca leve', texto: 'Cansancio, lentitud. El THC sigue en el cuerpo durante días.' }
  ],
  abstinencia: {
    inicio: '1–2 días', pico: '2–6 días', duracion: '1–2 semanas (sueño alterado hasta 4 semanas o más)', peligrosa: false,
    sintomas: ['Irritabilidad, enfado', 'Ansiedad, nerviosismo', 'Insomnio y sueños muy vívidos', 'Pérdida de apetito y de peso', 'Inquietud', 'Ánimo bajo', 'Molestias físicas: sudor, temblor, dolor abdominal'],
    texto: 'Reconocida en el DSM-5. No es peligrosa médicamente. Aparece en alrededor de la mitad de los consumidores diarios. Como el THC sale despacio de los tejidos, el inicio es algo tardío y gradual.'
  },
  riesgos: {
    agudos: ['Ansiedad, ataques de pánico, paranoia (más con dosis altas y comestibles)', 'Taquicardia e hipotensión al levantarse («blancazo»)', 'Alteración de la memoria, la atención y los reflejos: conducción peligrosa', 'Intoxicación por comestibles en niños'],
    cronicos: ['Trastorno por consumo de cannabis (≈1 de cada 10 consumidores; más en uso diario y adolescentes)', 'Más riesgo de psicosis con uso diario de cannabis de alta potencia (Di Forti et al., 2019)', 'Efectos sobre el cerebro en desarrollo (inicio antes de los 16–18 años)', 'Bronquitis crónica (fumado)', 'Síndrome de hiperémesis cannabinoide: vómitos cíclicos que se alivian con duchas calientes'],
    alarma: ['Dolor en el pecho, desmayo o confusión intensa → 112', 'Un niño ha comido un comestible con THC → urgencias', 'Síntomas psicóticos persistentes (voces, ideas de persecución) → atención médica']
  },
  interacciones: [
    { con: 'Alcohol', gravedad: 'moderada', efecto: 'Mareo, vómitos, «blancazo» y deterioro psicomotor mucho mayor; el alcohol aumenta la absorción de THC.', mecanismo: 'Efectos depresores aditivos y aumento de las concentraciones de THC.' },
    { con: 'Benzodiacepinas, opioides, otros sedantes', gravedad: 'moderada', efecto: 'Más sedación.', mecanismo: 'Depresión aditiva del SNC.' },
    { con: 'Psicodélicos', gravedad: 'moderada', efecto: 'Puede intensificar bruscamente la experiencia y la ansiedad.', mecanismo: 'Interacción poco caracterizada.' },
    { con: 'Warfarina, clobazam (con CBD)', gravedad: 'moderada', efecto: 'El CBD puede aumentar sus niveles.', mecanismo: 'Inhibición de CYP2C9 / CYP2C19 / CYP3A4.' },
    { con: 'Tabaco (en el porro)', gravedad: 'moderada', efecto: 'Dependencia de nicotina añadida y más daño pulmonar.', mecanismo: 'Mezcla habitual en Europa.' }
  ],
  mitos: [
    { mito: 'El cannabis no engancha.', realidad: 'Alrededor de 1 de cada 10 personas que lo prueban desarrollan un trastorno por consumo, y la proporción es mucho mayor en el uso diario. Existe tolerancia y síndrome de abstinencia.' },
    { mito: 'Es natural, así que es inofensivo.', realidad: 'Es natural pero activo: el cannabis actual tiene mucha más potencia que hace 30 años (THC del 4 % a más del 15–25 %) y la potencia se relaciona con el riesgo de psicosis.' },
    { mito: 'No se puede tener una sobredosis.', realidad: 'No es mortal por sí solo, pero las intoxicaciones (sobre todo con comestibles) causan ataques de pánico, vómitos y urgencias.' },
    { mito: 'Ayuda a dormir.', realidad: 'Puede acelerar el inicio del sueño, pero aparece tolerancia y al dejarlo hay insomnio de rebote y sueños muy vívidos.' }
  ],
  historiaPreset: 'dejar',
  historia: [
    { dia: 0, titulo: 'Primer día', texto: 'Cada porro produce su efecto completo. El THC empieza a acumularse en el tejido graso.' },
    { dia: 20, titulo: 'Tres semanas', texto: 'Ya siempre queda THC en sangre entre porros. Los receptores CB1 empiezan a retirarse (gris) y aparece algo de malestar entre sesiones (naranja).' },
    { dia: 120, titulo: 'Cuatro meses', texto: 'Tolerancia establecida: el colocón es menor y parte de lo que se busca es aliviar irritabilidad e insomnio.' },
    { dia: 184, titulo: 'Cuatro días sin fumar', texto: 'Pico de la abstinencia: irritabilidad, insomnio, sueños vívidos, poco apetito. No es peligrosa pero sí molesta.' },
    { dia: 215, titulo: 'Un mes después', texto: 'Los receptores CB1 se han recuperado casi del todo y el malestar ha desaparecido. El hábito persiste.' }
  ],
  farmaco: {
    tabla: [
      ['Biodisponibilidad', 'Fumado 10–35 %; oral 4–12 %'],
      ['Tmax', 'Fumado 3–10 min; oral 1–4 h'],
      ['Cmax (fumado, ≈30 mg)', '≈50–200 ng/mL en minutos (Huestis et al., 1992)'],
      ['Distribución', 'Muy lipófilo; Vd ≈ 3–10 L/kg o más; unión a proteínas ≈ 97 %'],
      ['Vida media', 'Distribución ≈ 30 min; terminal ≈ 1–2 días (ocasionales) y hasta 5–13 días (diarios)'],
      ['Aclaramiento', '≈ 950 mL/min (similar al flujo hepático)'],
      ['Metabolitos', '11-OH-THC (activo, más potente); THC-COOH (inactivo, detectable en orina semanas)'],
      ['Enzimas', 'CYP2C9 (hidroxilación), CYP3A4'],
      ['Detección en orina', '3–5 días (ocasional) a > 30 días (uso diario intenso)']
    ],
    afinidad: [
      { diana: 'CB1', accion: 'Agonista parcial', ki: '≈10–40 nM', nivel: 4 },
      { diana: 'CB2', accion: 'Agonista parcial', ki: '≈20–40 nM', nivel: 4 },
      { diana: 'GPR55', accion: 'Agonista', ki: 'nM–µM', nivel: 2 },
      { diana: 'TRPV1 / TRPA1', accion: 'Modulador', ki: 'µM', nivel: 2 },
      { diana: '5-HT3', accion: 'Antagonista alostérico', ki: 'µM', nivel: 1 }
    ],
    metabolismo: 'Δ9-THC → <b>11-OH-THC</b> (CYP2C9; activo, más potente y con mejor paso al cerebro; abundante tras la vía oral por el primer paso) → <b>THC-COOH</b> (inactivo) → glucurónido de THC-COOH (orina, heces). El THC almacenado en el tejido adiposo se libera lentamente: en consumidores diarios el THC plasmático puede seguir siendo detectable más de una semana después de dejarlo.'
  },
  tratamiento: 'Terapia cognitivo-conductual, entrevista motivacional y manejo de contingencias. No hay fármacos aprobados; se investigan gabapentina, N-acetilcisteína (en adolescentes) y nabiximols.',
  escalas: { dependencia: 3, abstinencia: 1, toxicidad: 1 }, nutt: 20, nuttNombre: 'Cannabis',
  referencias: [
    'Huestis MA. Human cannabinoid pharmacokinetics. Chem Biodivers. 2007;4(8):1770-1804.',
    'Grotenhermen F. Pharmacokinetics and pharmacodynamics of cannabinoids. Clin Pharmacokinet. 2003;42(4):327-360.',
    'Huestis MA, Henningfield JE, Cone EJ. Blood cannabinoids. I. Absorption of THC and formation of 11-OH-THC and THCCOOH during and after smoking marijuana. J Anal Toxicol. 1992;16(5):276-282.',
    'Hirvonen J et al. Reversible and regionally selective downregulation of brain cannabinoid CB1 receptors in chronic daily cannabis smokers. Mol Psychiatry. 2012;17(6):642-649.',
    'D’Souza DC et al. Rapid changes in CB1 receptor availability in cannabis dependent males after abstinence from cannabis. Biol Psychiatry Cogn Neurosci Neuroimaging. 2016;1(1):60-67.',
    'Budney AJ et al. Review of the validity and significance of cannabis withdrawal syndrome. Am J Psychiatry. 2004;161(11):1967-1977.',
    'Di Forti M et al. The contribution of cannabis use to variation in the incidence of psychotic disorder across Europe (EU-GEI). Lancet Psychiatry. 2019;6(5):427-436.',
    'Volkow ND et al. Adverse health effects of marijuana use. N Engl J Med. 2014;370(23):2219-2227.',
    'Bossong MG et al. Δ9-tetrahydrocannabinol induces dopamine release in the human striatum. Neuropsychopharmacology. 2009;34(3):759-766.',
    'Koch M et al. Hypothalamic POMC neurons promote cannabinoid-induced feeding. Nature. 2015;519:45-50.'
  ]
});
