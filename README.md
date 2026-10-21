# ProfesIA

Material del taller de IA para el profesorado de la ETSI de Caminos, Canales y
Puertos (Universidad de Cantabria), preparado por GeoOcean.

- [`deck/`](deck/): la presentación. Abre `deck/index.html` en el navegador.
- [`ejemplos/`](ejemplos/): los archivos del taller práctico.
  - `viga.py`: flecha de una viga en voladizo (IPE 200, 3 m, 10 kN). Debe dar
    «Flecha máxima: 22.1 mm».
  - `viga.ipynb`: el mismo cálculo como notebook, celda a celda.
  - `viga_con_error.py`: la misma viga con un error escondido, para practicar
    con el depurador.

## Preparar el ordenador

1. Instala [VS Code](https://code.visualstudio.com) y las extensiones
   **Python** y **Jupyter**.
2. Instala [Miniforge](https://github.com/conda-forge/miniforge).
3. Crea el entorno del curso:

   ```bash
   conda create -n curso python=3.12 numpy pandas matplotlib ipykernel -y
   ```

4. En VS Code: *Archivo → Abrir carpeta…* → `ejemplos`, y elige el intérprete
   `curso` (`Ctrl+Shift+P` → *Python: Select Interpreter*).
