# ProfesIA · diapositivas del taller

Presentación en HTML del taller «La IA en tu ordenador: de ChatGPT a VS Code»
para el profesorado de la ETSI de Caminos, Canales y Puertos (Universidad de
Cantabria). El motor de diapositivas sigue al de las diapositivas de HyGloW, con los
colores de la Escuela (verde y granate oscuros).

## Ver y presentar

No hace falta compilar nada: abre `slides/index.html` en el navegador, o dentro
de VS Code con la extensión **Live Preview** (clic derecho → *Show Preview*).

- Flechas / espacio / botones de abajo para avanzar, `f` pantalla completa,
  botón de arriba a la derecha para modo claro / oscuro / automático.
- `index.html#8` abre directamente la diapositiva 8; los temas del resumen
  (diapositiva 2) enlazan al anexo.
- Diapositiva 8, «La viga, en directo»: arrastra la carga sobre la viga o usa
  los deslizadores. Lee `data/viga_datos.js`, que escribe
  `ejemplos/viga_interactiva.ipynb`.
- Clic en una foto para ampliarla; clic en el aviso del notebook (diapositiva 16)
  para ver el `.ipynb` por dentro.
- Los bloques de comandos tienen botón «Copiar»; la lista de comprobación se
  recuerda en el navegador de cada asistente.

## Diapositivas

| #     | Contenido                                                                                                         |
| ----- | ----------------------------------------------------------------------------------------------------------------- |
| 1     | Portada (tercer día)                                                                                              |
| 2     | Resumen: día 1 (7 pasos) y día 2 (enlaces al anexo)                                                               |
| 3     | Ruegos y preguntas (a ver si el profesorado tiene dudas)                                                          |
| 4     | ¿Por qué VS Code y no la web? Chat en la web frente a IA en VS Code                                               |
| 5     | Esta presentación es un archivo de texto: Live Preview y editarla con IA                                          |
| 6     | Un cálculo, cuatro archivos: librería → notebook → datos → presentación                                           |
| 7     | `vigas.py` y `viga_interactiva.ipynb`                                                                             |
| 8     | La viga, en directo (interactiva)                                                                                 |
| 9     | Retos para pedirle a la IA                                                                                        |
| 10    | Lista de comprobación y enlaces                                                                                   |
| 11    | Anexo: repaso del día 2                                                                                           |
| 12–21 | Día 2: quién es quién, mapa, VS Code, extensiones, archivos, Miniforge, entorno, ejecutar, depurar, IA en VS Code |

## La viga en directo

```
ejemplos/vigas.py  ──►  ejemplos/viga_interactiva.ipynb  ──►  slides/data/viga_datos.js  ──►  slides/viga.js
  (fórmulas)              (exporta_para_diapositivas)          (curvas para P = 1 kN)          (multiplica por P y dibuja)
```

El notebook guarda la flecha y el momento para una carga de 1 kN en 31
posiciones; la diapositiva solo multiplica por P (el problema es lineal), así
que toda la física está en Python. El archivo de datos es `.js` y no `.json`
para que funcione también abriendo `index.html` con doble clic, sin servidor.
Si falta, la diapositiva pide ejecutar el notebook.

## Mantenimiento a mano

| Qué                                                                         | Dónde                                                              |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Versiones de los modelos (GPT-6, Claude 5.5, Gemini 3.5), a octubre de 2026 | diapositivas 12 y 13 de `index.html`                               |
| Copilot Student para docentes (200 créditos de IA al mes, octubre de 2026)  | diapositivas 10, 13 y 21                                           |
| Números del ejemplo (22.1 mm; 22 m con el error)                            | diapositivas 2, 4, 7, 10, 14, 19, 20; salen de `ejemplos/`         |
| Perfil de la viga en directo (IPE 200)                                      | `PERFIL` en `ejemplos/viga_interactiva.ipynb`; vuelve a ejecutarlo |
| Números de diapositiva de los enlaces del resumen                           | diapositiva 2 (`href="#12"`…)                                      |

## Créditos de imágenes

- Fotos (Wikimedia Commons): Sam Altman, Oficina del Primer Ministro de Japón,
  CC BY 4.0; Dario Amodei, TechCrunch, CC BY 2.0; Demis Hassabis, John Sears,
  CC BY-SA 4.0; Satya Nadella, Brian Smale y Microsoft, CC BY-SA 4.0.
- Logos de marcas: [Simple Icons](https://simpleicons.org) (CC0), incrustados en
  `style.css`; logo de VS Code de Wikimedia Commons (dominio público); logo de
  Microsoft dibujado en CSS. Las marcas pertenecen a sus propietarios.
- Logo UC de unican.es; logo de la Escuela de Caminos de la propia Escuela; logo GeoOcean del grupo.
- El granate del tema (`--red`, #74223e) es el del logo de la Escuela.

## Archivos

```
slides/
├── index.html   contenido de las diapositivas
├── style.css    tema (verde/granate, claro y oscuro) + logos incrustados
├── deck.js      navegación, tema, ampliar fotos, ventana de código, copiar, checklist
├── viga.js      diapositiva interactiva de la viga
├── data/        viga_datos.js, generado por ejemplos/viga_interactiva.ipynb
└── assets/      fotos (people/) y logos (logos/)
```
