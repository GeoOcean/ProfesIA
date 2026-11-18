# ProfesIA

Material del taller de IA para el profesorado de la ETSI de Caminos, Canales y
Puertos (Universidad de Cantabria), preparado por: Javier Tausía, Fernando Méndez,
Andrés Rodríguez, Javier González Villa, Cristina Manchado, Beatriz Pérez-Díaz,
Pablo Alonso.

El desarrollo del taller (qué vemos cada día, listas de comprobación y próximos
pasos) está en la presentación [`slides/`](slides/), que se va actualizando.

## Qué hay aquí

| Carpeta | Contenido |
| --- | --- |
| [`slides-fer/`](slides-fer/) | Presentación principal del proyecto ProfesIA (objetivos, bloques, niveles y proyectos). PDF. |
| [`slides/`](slides/) | Presentación del taller práctico «La IA en tu ordenador: de ChatGPT a VS Code». Abre `slides/index.html` en el navegador. |
| [`ejemplos/`](ejemplos/) | Todo lo práctico: notebooks y librerías en la raíz, scripts en `scripts/` y datos en `data/`. |
| [`libros/`](libros/) | Bibliografía de apoyo. |
| [`requirements.txt`](requirements.txt) | Librerías de Python del curso, para `conda` o `pip`. |

## Puesta en marcha

Necesitas [Miniforge](https://github.com/conda-forge/miniforge) y
[Visual Studio Code](https://code.visualstudio.com) con la extensión de Python.

1. Crea el entorno e instala las librerías, desde la carpeta `ProfesIA`:

   ```bash
   conda create -n profesia python=3.12
   conda install -n profesia -c conda-forge --file requirements.txt -y
   ```

   (o bien `conda activate profesia` y `pip install -r requirements.txt`).

2. Abre la carpeta **`ProfesIA` entera** en VS Code (*Archivo → Abrir
   carpeta…*) y selecciona el entorno (`Ctrl+Shift+P` → *Python: Select
   Interpreter* → `profesia`).

3. Para ver la presentación dentro de VS Code, instala la extensión **Live
   Preview** (de Microsoft) y abre `slides/index.html`. Algunas diapositivas
   leen datos que generan los notebooks (`slides/data/`): al volver a ejecutar
   el notebook y recargar la presentación, se actualizan.

## Los ejemplos

```text
ejemplos/
├── vigas.py                 librería: flecha y momento de una viga
├── viga_interactiva.ipynb   mini interfaz con deslizadores + exporta datos a las diapositivas
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
