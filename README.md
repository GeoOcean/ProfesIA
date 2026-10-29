# ProfesIA

Material del taller de IA para el profesorado de la ETSI de Caminos, Canales y
Puertos (Universidad de Cantabria), preparado por GeoOcean.

## Qué hay aquí

| Carpeta | Contenido |
| --- | --- |
| [`slides-fer/`](slides-fer/) | Presentación principal del proyecto ProfesIA (objetivos, bloques, niveles y proyectos). PDF. |
| [`slides/`](slides/) | Presentación del taller práctico «La IA en tu ordenador: de ChatGPT a VS Code». Abre `slides/index.html` en el navegador. |
| [`ejemplos/`](ejemplos/) | Todo lo práctico: abre esta carpeta en VS Code. Notebooks en la raíz, scripts en `scripts/` y datos en `data/`. |
| [`libros/`](libros/) | Bibliografía de apoyo. |
| [`requirements.txt`](requirements.txt) | Librerías de Python del curso, para `conda` o `pip`. |

## Primer día: de dónde partimos

Lo que hicimos juntos, paso a paso:

1. **Crear una cuenta de [GitHub](https://github.com)** con el correo de unican
   (el repositorio mundial de código abierto).
2. **Descargar [Miniforge](https://github.com/conda-forge/miniforge)**
   (software para gestionar entornos de programación de forma limpia, muy usado
   para Python).
3. **Crear un entorno aislado con Python**, usando Miniforge:

   ```bash
   conda create -n profesia python=3.12
   ```

4. **Descargar [Visual Studio Code](https://code.visualstudio.com)** (VS Code:
   el editor de textos del siglo XXI, que integra todo lo necesario para
   programar, Copilot incluido).
5. **Abrir una carpeta del ordenador con VS Code** (*Archivo → Abrir
   carpeta…*), la forma óptima de trabajar.
6. **Instalar la extensión de Python** para VS Code (para leer bien los
   archivos).
7. **Seleccionar el entorno de Python** para trabajar en esa carpeta
   (`Ctrl+Shift+P` → *Python: Select Interpreter* → `profesia`), para poder
   ejecutar los archivos.

Si te falta alguno, repásalo en las diapositivas 8 y 9 de [`slides/`](slides/).

## Cómo seguimos

La presentación [`slides/`](slides/) arranca justo donde lo dejamos (la
diapositiva 2 resume el primer día) y sigue así:

1. **Quién es quién**: las cuatro empresas que mueven la IA (OpenAI,
   Anthropic, Google DeepMind, Microsoft) y quién las dirige.
2. **El mapa**: empresa → modelo → chat → extensión de VS Code.
3. **La herramienta**: qué es VS Code, sus extensiones y los archivos de
   texto frente a los binarios.
4. **Manos a la obra**: añadir librerías al entorno, ejecutar `viga.py` y
   `viga.ipynb`, y depurar `viga_con_error.py`.
5. **Todo junto**: pedirle cosas a la IA dentro de VS Code.
6. **Para casa**: lista de comprobación y enlaces.

Para los ejemplos, añade al entorno las librerías de
[`requirements.txt`](requirements.txt). Desde la carpeta `ProfesIA`, con una de
estas dos opciones:

```bash
conda install -n profesia -c conda-forge --file requirements.txt -y
```

```bash
conda activate profesia
pip install -r requirements.txt
```

### Los ejemplos

```
ejemplos/
├── viga.ipynb               la viga como notebook, celda a celda
├── ANN(2,3,1).ipynb         red neuronal 2-3-1 interactiva
├── TrainingANN.ipynb        entrenamiento de una red neuronal, paso a paso
├── CadenaMarkov.ipynb       simulación de una cadena de Markov
├── funcion3D.ipynb          función de dos variables en 3D e integral
├── ODE.ipynb                ecuación diferencial resuelta con SymPy
├── lluvias.ipynb            análisis de una serie de precipitaciones
├── scripts/
│   ├── viga.py              flecha de una viga en voladizo (IPE 200, 3 m, 10 kN):
│   │                        debe dar «Flecha máxima: 22.1 mm»
│   └── viga_con_error.py    la misma viga con un error escondido, para el depurador
└── data/
    └── 1083e_R.xls          serie de precipitaciones que lee lluvias.ipynb
```
