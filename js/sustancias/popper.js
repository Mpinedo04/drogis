NT.registrar({
  id: 'popper', numero: 5, simbolo: 'Pp', nombre: 'Popper', color: '#1D9E75',
  subtitulo: 'Nitritos de alquilo inhalados (amilo, isobutilo, isopropilo, pentilo)',
  categoria: 'vasodilatador', formula: 'R–O–N=O (p. ej. C₅H₁₁NO₂)', masaMolar: 117.15,
  ficha: { vidaMedia: 'Minutos', duracion: '2–5 min', inicio: '10–30 s' },
  etiquetas: {
    efecto: 'Subidón (vasodilatación)', neto: 'Efecto neto', malestar: 'Malestar sin popper',
    aporte: 'Efecto de una inhalación la primera vez', costumbre: 'Tolerancia vascular', tolerancia: 'Vasos menos sensibles al NO'
  },
  resumen: {
    basico: 'El popper libera óxido nítrico, que relaja los vasos sanguíneos: la tensión cae de golpe, el corazón se acelera y llega un subidón de calor de 2–5 minutos. La tolerancia vascular aparece en días de uso seguido y desaparece en pocos días sin usarlo. Casi no deja abstinencia.',
    principiante: 'A diferencia de las demás sustancias de esta web, el popper no actúa principalmente sobre neurotransmisores. Los nitritos de alquilo liberan óxido nítrico (NO) en las paredes de los vasos sanguíneos. El NO relaja el músculo liso: los vasos se ensanchan, la tensión arterial baja bruscamente y el corazón se acelera para compensar. El «subidón» (calor, mareo, euforia breve, relajación de los esfínteres) dura pocos minutos. Con el uso repetido los vasos responden menos (tolerancia a los nitratos, la misma que conocen los cardiólogos con la nitroglicerina). No hay apenas [[dependencia]] física, pero sí riesgos serios: combinarlo con Viagra puede ser mortal, tragarlo también, y algunos tipos dañan la retina.',
    pro: 'Ésteres de alquilo del ácido nitroso (amilo, isobutilo, isopropilo, pentilo, 2-propilo). Se hidrolizan rápidamente a alcohol y nitrito; actúan como donadores de NO que activa la guanilato ciclasa soluble, aumenta el GMPc y activa la PKG, con desfosforilación de la cadena ligera de miosina y relajación del músculo liso vascular (venodilatación > arteriodilatación), del esfínter anal y del músculo liso vaginal. La hipotensión desencadena una taquicardia refleja por el barorreflejo. La tolerancia a nitratos implica estrés oxidativo, inactivación de la ALDH2 mitocondrial (bioactivación), desacoplamiento de la eNOS y contrarregulación neurohormonal (Münzel et al., 2005). El nitrito oxida la hemoglobina a metahemoglobina (Fe³⁺).'
  },
  basico: 'Línea morada: el efecto de una inhalación la primera vez (100 %). Línea ámbar: tolerancia vascular; sube con el uso seguido y baja en pocos días. Casi no hay naranja: el popper apenas produce abstinencia.',
  mecanismo: {
    simple: 'Libera óxido nítrico, que relaja el músculo de los vasos sanguíneos: se ensanchan y baja la tensión.',
    pro: 'Donador de NO → sGC → GMPc → PKG → relajación del músculo liso. No hay un receptor de membrana; el «efecto» subjetivo es sobre todo consecuencia hemodinámica (hipotensión, hiperemia cerebral relativa, taquicardia) más una posible acción sobre el SNC poco caracterizada.'
  },
  sinapsis: {
    tipo: 'vaso', nt: { nombre: 'Óxido nítrico', color: '#1D9E75' }, droga: { nombre: 'Nitrito (→ NO)', color: '#1D9E75' },
    receptor: 'Guanilato ciclasa soluble', senal: 'Dilatación del vaso',
    textos: {
      sin: 'Vaso sanguíneo en reposo: el músculo liso de la pared mantiene un calibre normal y una tensión arterial estable.',
      con: 'El nitrito libera óxido nítrico (rombos verdes) que relaja el músculo de la pared: el vaso se ensancha, la tensión cae y el corazón se acelera para compensar. Es el «subidón» de calor de unos minutos.',
      cronico: 'Con el uso repetido el músculo de los vasos responde menos al óxido nítrico (tolerancia a nitratos): la misma inhalación dilata menos. Se recupera en pocos días sin usarlo.'
    }
  },
  unidades: { dosis: 'inh.', dosisNombre: 'inhalación', dosisPlural: 'Inhalaciones', conc: 'u.a.', concNombre: 'Exposición a nitrito (unidades arbitrarias)', sesion: 'sesión' },
  formaEtiqueta: 'Tipo de nitrito',
  pk: { F: 1, ka: 120, lag: 0, t12: 0.05, Vd: 1, ke0: 50, cf: 70 },
  formas: [
    { id: 'pentilo', nombre: 'Nitrito de pentilo / amilo', nota: 'Dosis = número de inhalaciones profundas por cada fosa nasal. El modelo usa unidades arbitrarias: no hay estudios farmacocinéticos fiables del uso recreativo.', duracion: 0.08 },
    { id: 'isopropilo', nombre: 'Nitrito de isopropilo', nota: 'Común en Europa desde la prohibición del isobutilo (2007). Asociado a la mayoría de casos de maculopatía por poppers.', pk: { t12: 0.04 }, duracion: 0.07 }
  ],
  pd: { ec50: 0.6, n: 1.5, emax: 100 },
  tol: { kdes: 2.2, krec: 0.029, rmin: 0.3, nombre: 'Tolerancia a nitratos (estrés oxidativo, ALDH2)' },
  oponentes: [{ gamma: 0.04, tau: 6, nombre: 'Rebote leve (cefalea)' }],
  habito: { k: 0.002, vida: 120 },
  canales: [
    { id: 'hipotension', nombre: 'Caída de tensión arterial', ec50: 0.75, n: 1.5, tol: 'R', color: '#378ADD' },
    { id: 'metahb', nombre: 'Oxidación de la hemoglobina (orientativo)', ec50: 4, n: 2, tol: 'none', conc: 'C', umbral: 50, color: '#E24B4A' }
  ],
  bandasConc: [],
  limites: { dosis: [1, 4, 1], porSesion: [1, 20], intervalo: [0.05, 1, 0.05] },
  presets: [
    { id: 'diario', nombre: 'Uso diario', desc: '6 inhalaciones cada 15 min por la noche, todos los días durante 2 meses.', cfg: { forma: 'pentilo', dosis: 1, porSesion: 6, intervalo: 0.25, inicio: 23, frecuencia: 'diario', horizonte: 60 } },
    { id: 'finde', nombre: 'Fines de semana', desc: '6 inhalaciones viernes y sábado.', cfg: { forma: 'pentilo', dosis: 1, porSesion: 6, intervalo: 0.25, inicio: 23, frecuencia: 'finde', horizonte: 90 } },
    { id: 'puntual', nombre: 'Uso puntual', desc: 'Una sesión al mes.', cfg: { forma: 'pentilo', dosis: 1, porSesion: 6, intervalo: 0.25, inicio: 23, frecuencia: 'mensual', horizonte: 90 } },
    { id: 'pausa', nombre: 'Diario y pausa', desc: 'Uso diario 3 semanas y pausa: la tolerancia desaparece en días.', cfg: { forma: 'pentilo', dosis: 1, porSesion: 6, intervalo: 0.25, inicio: 23, frecuencia: 'diario', horizonte: 40, dejar: 21 } }
  ],
  neuroquimicos: [
    { nombre: 'Óxido nítrico → GMPc', dir: '+', peso: 1, fuente: 'efecto', rol: 'Vasodilatación, calor', detalle: 'Activación de la guanilato ciclasa soluble en el músculo liso vascular.' },
    { nombre: 'Noradrenalina (barorreflejo)', dir: '+', peso: 0.8, fuente: 'efecto', rol: 'Taquicardia refleja', detalle: 'Respuesta simpática a la caída de la tensión.' },
    { nombre: 'Relajación de músculo liso', dir: '+', peso: 0.8, fuente: 'efecto', rol: 'Esfínteres, «subidón»', detalle: 'Relajación del esfínter anal y del músculo liso genital, motivo de su uso sexual.' },
    { nombre: 'Flujo cerebral / presión intracraneal', dir: '+', peso: 0.6, fuente: 'efecto', rol: 'Mareo, cefalea', detalle: 'Vasodilatación meníngea: cefalea pulsátil; posible aumento transitorio de la presión intraocular e intracraneal.' },
    { nombre: 'Efecto sobre el SNC', dir: '+', peso: 0.35, fuente: 'efecto', rol: 'Euforia breve', detalle: 'Mal caracterizado; no hay evidencia sólida de una liberación de dopamina relevante.' }
  ],
  adaptaciones: [
    { nombre: 'Respuesta vascular al NO', rol: 'tolerancia a nitratos', fuente: 'R', a: 0, b: 100, max: 100, sufijo: '%', detalle: 'Similar a la tolerancia a la nitroglicerina, que aparece en 24–48 h de exposición continua y se revierte con intervalos libres de nitrato.' },
    { nombre: 'Malestar sin popper', rol: 'mínimo', fuente: 'B', a: 0, b: 100, max: 100, sufijo: '%' },
    { nombre: 'Hábito', rol: 'asociado al sexo o la fiesta', fuente: 'H', a: 0, b: 100, max: 100, sufijo: '%' }
  ],
  fases: [
    { t0: 0, t1: 0.008, nombre: 'Inhalación', texto: 'Absorción pulmonar inmediata.' },
    { t0: 0.008, t1: 0.04, nombre: 'Subidón', texto: 'Calor en cara y cuello, mareo, taquicardia, euforia breve, relajación muscular.' },
    { t0: 0.04, t1: 0.1, nombre: 'Bajada', texto: 'El efecto desaparece en 2–5 minutos.' },
    { t0: 0.1, t1: 1, nombre: 'Después', texto: 'Posible dolor de cabeza y enrojecimiento.' }
  ],
  abstinencia: {
    inicio: '—', pico: '—', duracion: 'Sin síndrome de abstinencia relevante', peligrosa: false,
    sintomas: ['No hay síndrome de abstinencia físico descrito', 'Puede existir uso compulsivo asociado al contexto sexual'],
    texto: 'La tolerancia vascular desaparece en pocos días sin consumo. El riesgo principal no es la dependencia sino los efectos agudos y las combinaciones.'
  },
  riesgos: {
    agudos: ['Desmayo por bajada brusca de tensión (y caídas)', 'Dolor de cabeza intenso', 'Metahemoglobinemia: labios y uñas azulados, ahogo (sobre todo si se traga: puede ser mortal)', 'Quemaduras químicas en nariz y piel', 'Muy inflamable'],
    cronicos: ['Maculopatía por poppers: pérdida de visión central (asociada sobre todo al nitrito de isopropilo)', 'Dermatitis alrededor de nariz y boca', 'Riesgo en glaucoma, anemia o enfermedad cardiaca'],
    alarma: ['Labios o uñas azulados, ahogo o confusión → 112 (el antídoto es el azul de metileno)', 'Lo ha tragado → 112 inmediatamente', 'Pérdida de visión o manchas en el centro del campo visual → oftalmología']
  },
  interacciones: [
    { con: 'Sildenafilo, tadalafilo, vardenafilo (Viagra, Cialis...)', gravedad: 'critica', efecto: 'Hipotensión grave, desmayo, infarto o ictus. Puede ser mortal.', mecanismo: 'Los inhibidores de la PDE5 impiden degradar el GMPc que produce el NO: el efecto vasodilatador se multiplica. El tadalafilo dura hasta 36 h.' },
    { con: 'Nitroglicerina y otros nitratos', gravedad: 'critica', efecto: 'Hipotensión aditiva grave.', mecanismo: 'Mismo mecanismo (donadores de NO).' },
    { con: 'Antihipertensivos', gravedad: 'alta', efecto: 'Caída de tensión más intensa y desmayos.', mecanismo: 'Efecto hipotensor aditivo.' },
    { con: 'Alcohol', gravedad: 'moderada', efecto: 'Más hipotensión y mareo.', mecanismo: 'Vasodilatación aditiva.' },
    { con: 'Estimulantes (cocaína, MDMA, anfetaminas)', gravedad: 'alta', efecto: 'Estrés cardiovascular: oscilaciones bruscas de tensión y pulso.', mecanismo: 'Efectos hemodinámicos opuestos y sumados.' }
  ],
  mitos: [
    { mito: 'Como dura tan poco, es inofensivo.', realidad: 'Combinado con Viagra o similares puede provocar un colapso cardiovascular. Tragado, puede producir metahemoglobinemia mortal.' },
    { mito: 'Es un «ambientador», no una droga.', realidad: 'Se vende con esa etiqueta para esquivar la regulación, pero es una sustancia farmacológicamente activa con riesgos reales.' },
    { mito: 'Si no hace efecto, hay que inhalar más.', realidad: 'La falta de efecto con uso seguido es tolerancia vascular: inhalar más no la vence y aumenta el riesgo de metahemoglobinemia y quemaduras.' }
  ],
  historiaPreset: 'pausa',
  historia: [
    { dia: 0, titulo: 'Primera sesión', texto: 'Cada inhalación produce un pico breve. Fíjate en el gráfico del día (usa el zoom): son agujas de pocos minutos.' },
    { dia: 3, titulo: 'Tercer día seguido', texto: 'Los vasos ya responden menos al óxido nítrico: la línea de tolerancia ha subido. La misma inhalación «sube» menos.' },
    { dia: 18, titulo: 'Casi tres semanas', texto: 'Tolerancia vascular estable. No hay apenas malestar entre sesiones: casi toda la línea de costumbre es pérdida de sensibilidad, no abstinencia.' },
    { dia: 26, titulo: 'Cinco días de pausa', texto: 'La sensibilidad se recupera rápido: la tolerancia a los nitratos se revierte en días.' }
  ],
  farmaco: {
    tabla: [
      ['Inicio', '10–30 s (inhalado)'],
      ['Duración', '2–5 min'],
      ['Hidrólisis', 'Rápida a alcohol (amílico, isobutílico, isopropílico) + nitrito'],
      ['Nitrito plasmático', 't½ ≈ 30–45 min; oxidación a nitrato'],
      ['Metahemoglobina', 'Normal < 2 %; síntomas > 15–20 %; grave > 50 %'],
      ['Antídoto', 'Azul de metileno i.v. (1–2 mg/kg)'],
      ['Datos PK en humanos', 'Escasos para el uso recreativo: el modelo es conceptual']
    ],
    afinidad: [
      { diana: 'Guanilato ciclasa soluble (vía NO)', accion: 'Activador indirecto', ki: 'No aplica', nivel: 4 },
      { diana: 'Hemoglobina', accion: 'Oxidación a metahemoglobina', ki: 'No aplica', nivel: 3 }
    ],
    metabolismo: 'R–ONO + H₂O → <b>R–OH</b> (alcohol) + <b>NO₂⁻</b>. El nitrito se reduce a NO (en tejidos hipóxicos y por la desoxihemoglobina) o se oxida a nitrato (NO₃⁻), que se elimina por la orina. El nitrito oxida el Fe²⁺ de la hemoglobina a Fe³⁺ (metahemoglobina), revertido por la NADH-citocromo b5 reductasa.'
  },
  tratamiento: 'No suele haber dependencia que tratar. En intoxicación: oxígeno y azul de metileno si la metahemoglobina es alta (contraindicado en déficit de G6PD).',
  escalas: { dependencia: 1, abstinencia: 0, toxicidad: 3 }, nutt: null,
  referencias: [
    'Romanelli F et al. Poppers: epidemiology and clinical management of inhaled nitrite abuse. Pharmacotherapy. 2004;24(1):69-78.',
    'Münzel T, Daiber A, Mülsch A. Explaining the phenomenon of nitrate tolerance. Circ Res. 2005;97(7):618-628.',
    'Davies AJ et al. Poppers maculopathy: an emerging ophthalmic reaction to recreational substance abuse. Eye. 2012;26:1479-1486.',
    'Hunter L, Gordge L, Dargan PI, Wood DM. Methaemoglobinaemia associated with the use of cocaine and volatile nitrites as recreational drugs: a review. Br J Clin Pharmacol. 2011;72(1):18-26.',
    'Cheitlin MD et al. ACC/AHA expert consensus document: use of sildenafil (Viagra) in patients with cardiovascular disease. Circulation. 1999;99(1):168-177.',
    'Gable RS. Comparison of acute lethal toxicity of commonly abused psychoactive substances. Addiction. 2004;99(6):686-696.'
  ]
});
