# ProfesIA · diapositivas del taller

Presentación en HTML del taller «La IA en tu ordenador: de ChatGPT a VS Code»
para el profesorado de la ETSI de Caminos, Canales y Puertos (Universidad de
Cantabria). El motor de diapositivas sigue al de las diapositivas de HyGloW, con los
colores de la Escuela (verde y granate oscuros).

## Ver y presentar

No hace falta compilar nada: abre `slides/index.html` en el navegador.

- Flechas / espacio / botones de abajo para avanzar, `f` pantalla completa,
  botón de arriba a la derecha para modo claro / oscuro / automático.
- Clic en una foto para ampliarla; clic en el aviso del notebook (diapositiva 7)
  para ver el `.ipynb` por dentro.
- Los bloques de comandos tienen botón «Copiar»; la lista de comprobación de la
  última diapositiva se recuerda en el navegador de cada asistente.
- `index.html#8` abre directamente la diapositiva 8.

## Diapositivas

| # | Contenido |
| --- | --- |
| 1 | Portada |
| 2 | Primer día: los 7 pasos que ya hicimos y cómo seguimos |
| 3 | ¿Quién es quién? Altman, Amodei, Hassabis, Nadella + cronología 2017–2026 |
| 4 | Mapa: empresa → modelo → chat → extensión de VS Code |
| 5 | Qué es VS Code (esquema de la ventana) |
| 6 | Extensiones: VS Code → extensión → cuenta → modelo |
| 7 | Archivos de texto y binarios |
| 8 | Instalar Miniforge (Windows y macOS) |
| 9 | Entorno `profesia`: añadir librerías y seleccionarlo en VS Code |
| 10 | Ejecutar `viga.py` y `viga.ipynb` |
| 11 | Depurar `viga_con_error.py` |
| 12 | Pedirle cosas a la IA dentro de VS Code |
| 13 | Lista de comprobación y enlaces |

## Mantenimiento a mano

| Qué | Dónde |
| --- | --- |
| Versiones de los modelos (GPT-6, Claude 5.5, Gemini 3.5), a octubre de 2026 | diapositivas 3 y 4 de `index.html` |
| Copilot Student para docentes (200 créditos de IA al mes, octubre de 2026) | diapositivas 4, 12 y 13 |
| Números del ejemplo (22.1 mm; 22 m con el error) | diapositivas 5, 10, 11, 13; salen de `ejemplos/` |

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
└── assets/      fotos (people/) y logos (logos/)
```
