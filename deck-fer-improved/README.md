# Deck de Fernando, versión mejorada

Misma idea que `deck-fer/` (IA como asistente, bloques de cálculo, persona en el
bucle), con más contenido práctico y comprobable. 20 diapositivas. Abre
`deck-fer-improved/index.html` en el navegador; usa el tema y el motor de
`deck/`.

## Qué cambia respecto a `deck-fer/`

| # | Diapositiva | Cambio |
| --- | --- | --- |
| 4 | ¿Qué es la IA? | Cronología 1956 → 2012 → 2017 → 2022 → 2026 |
| 5 | Mapa de algoritmos | Un ejemplo real de ingeniería civil por fila, con referencias |
| 6 | Matemáticas | Entrenar = minimizar el error (descenso por gradiente) |
| 7 | Cómo funciona un LLM | Los 4 pasos reales (tokens, embeddings, atención, siguiente token) y la fórmula de la temperatura; la analogía PCA + KNN de Fernando queda dentro de cada paso |
| 8 | **Nueva**: por qué se equivoca | Cinco fallos, su causa y qué hacer |
| 9 | Comerciales | Tabla empresa → modelo → chat → VS Code del taller ProfesIA; Copilot Student para docentes |
| 10 | **Nueva**: IAs locales | Regla de memoria, tabla de tamaños y el comando de Ollama |
| 13 | **Nueva**: anatomía de un prompt | El prompt real del bloque de oleaje |
| 14 | **Nueva**: un bloque de verdad | Código y pruebas de `bloques/` |
| 15 | **Nueva**: verificar y validar | El dashboard de ondas de Fernando comprobado con el bloque |
| 16 | Tres niveles | Nivel 2 calculado de verdad (propagación y rotura) |
| 18 | **Nueva**: reglas de juego | Reglamento europeo de IA, datos y evaluación |
| 19 | Plan de formación | Enlace al taller práctico de `deck/` |

## Bloques

`bloques/oleaje.py` (longitud de onda, celeridad de grupo, asomeramiento y
rotura) y `bloques/test_oleaje.py` (5 pruebas). Para ejecutarlas, en el entorno
`curso` del taller con `pytest` instalado:

```bash
cd deck-fer-improved/bloques
python -m pytest
```

Con T = 8 s y h = 20 m el bloque da L = 88,79 m, k = 0,0708 m⁻¹, c = 11,10 m/s,
Cg = 7,41 m/s y kh = 1,42: los mismos valores que el dashboard de Fernando. Una
ola de H₀ = 3 m y T = 8 s en profundidades indefinidas rompe (H ≥ 0,78·h) a
h ≈ 4,1 m con H ≈ 3,2 m, con incidencia normal y sin refracción.

## Fuentes de los datos nuevos

- Encuesta: Fundación CYD, «Uso y percepción de la IA en el entorno
  universitario II», 800 estudiantes, mayo de 2026 (de las diapositivas de
  Fernando).
- Camus, Méndez, Medina y Cofiño (2011), «Analysis of clustering and selection
  algorithms for the study of multivariate wave climate», Coastal Engineering.
- Kratzert et al. (2018), «Rainfall–runoff modelling using Long Short-Term
  Memory (LSTM) networks», Hydrology and Earth System Sciences.
- Vaswani et al. (2017), «Attention is all you need».
- Mata v. Avianca (2023): sanción a abogados por citar sentencias inventadas por
  ChatGPT.
- Reglamento (UE) 2024/1689 de IA y Reglamento (UE) 2026/1744 («Digital
  Omnibus», en vigor desde el 27 de julio de 2026): art. 4 (medidas de
  alfabetización en IA del personal), art. 5 (prohibido el reconocimiento de
  emociones en centros educativos) y anexo III (usos educativos de alto riesgo,
  aplicables desde el 2 de diciembre de 2027).
- Ollama, `qwen3:8b`: descarga de 5,2 GB (ollama.com/library/qwen3).
- Modelos y Copilot Student: comprobados para el taller de `deck/`, octubre de
  2026.

## Archivos

```
deck-fer-improved/
├── index.html     diapositivas
├── improved.css   componentes propios (copia ampliada de deck-fer/fer.css)
├── assets/        imágenes de las presentaciones de Fernando
└── bloques/       oleaje.py y test_oleaje.py
```
