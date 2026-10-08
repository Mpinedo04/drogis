# Neurotolerancia

Visualizador interactivo de cómo el cerebro se acostumbra a 11 sustancias: nicotina, psilocibina, alcohol, cafeína, popper, LSD, cannabis, MDMA, cocaína, opioides y benzodiacepinas.

## Cómo abrirlo

Haz doble clic en `index.html`. Funciona sin servidor y sin instalar nada. Solo las fuentes tipográficas se descargan de Google Fonts; sin conexión se usa la fuente del sistema.

## Modos

- **Básico**: la idea central. Una línea con lo que aporta la sustancia (100 %), otra con la «línea de costumbre» que va subiendo, el placer neto que queda entre las dos y el malestar cuando falta la sustancia. Incluye la vista de un día por dentro y las barras de neuroquímica.
- **Principiante**: añade una animación de la sinapsis (sin sustancia, con sustancia y con uso crónico), una historia guiada paso a paso, las fases de una dosis, los riesgos y señales de alarma, las combinaciones peligrosas, la abstinencia y mitos con su realidad. Los términos subrayados abren un glosario.
- **Profesional**: farmacocinética (plasma y sitio efecto, escala logarítmica), canales de efecto y de riesgo con umbrales, curva dosis-respuesta con y sin tolerancia (margen de seguridad), histéresis concentración-efecto, variables de estado del modelo, tablas farmacológicas, perfil de dianas, metabolismo, interacciones, ecuaciones, limitaciones y referencias. Permite cambiar la vía, el peso, el sexo (alcohol), los horarios y una recaída, y exportar la simulación a CSV.
- **Comparar**: simula las 11 sustancias con uso diario y abandono, y las compara con los datos de daño de Nutt et al. (2010).

## Estructura

```
index.html
css/estilos.css
js/nucleo.js         registro de sustancias y utilidades
js/glosario.js       definiciones del glosario
js/sustancias/*.js   datos de cada sustancia (PK, PD, textos, riesgos, referencias)
js/motor.js          motor de simulación farmacocinética/farmacodinámica
js/graficos.js       gráficos en canvas con tooltip
js/sinapsis.js       animación de la sinapsis
js/app.js            interfaz, modos y vistas
```

Para añadir una sustancia, crea un archivo en `js/sustancias/` con el mismo esquema que los existentes y añade su `<script>` en `index.html`.

## Aviso

Es una herramienta educativa y de reducción de riesgos, no consejo médico ni una guía de dosis. Los parámetros farmacocinéticos vienen de la literatura citada. Los farmacodinámicos (tolerancia y procesos oponentes) están calibrados para reproducir los cursos temporales descritos en la literatura; no están ajustados a datos individuales.
