"""vigas.py · una mini librería de vigas para el curso ProfesIA.

Una «librería» no es más que un archivo .py con funciones que se pueden
importar desde cualquier notebook o script de la misma carpeta:

    from vigas import PERFILES, calcula_viga

Casos que resuelve (resistencia de materiales, teoría de Euler-Bernoulli),
con una carga puntual P a una distancia «a» del extremo izquierdo:

    · "voladizo":  empotrada en x = 0 y libre en x = L
    · "biapoyada": apoyos simples en x = 0 y x = L

Convenio de signos:
    · flecha positiva = hacia abajo
    · momento positivo = la viga se curva como una sonrisa (tracciona abajo)
"""

from datetime import datetime
from pathlib import Path
import json

import numpy as np

# Perfiles IPE (acero): inercia fuerte I [m⁴], módulo resistente W [m³], canto h [mm]
PERFILES = {
    "IPE 160": {"I": 869.3e-8, "W": 108.7e-6, "h": 160},
    "IPE 200": {"I": 1943e-8, "W": 194.3e-6, "h": 200},
    "IPE 240": {"I": 3892e-8, "W": 324.3e-6, "h": 240},
    "IPE 300": {"I": 8356e-8, "W": 557.1e-6, "h": 300},
}

APOYOS = ("voladizo", "biapoyada")


def calcula_viga(x, L, a, P, E, I, apoyo="voladizo"):
    """Flecha [m] y momento flector [N·m] en los puntos x [m].

    L: luz [m] · a: posición de la carga [m] · P: carga [N]
    E: módulo de elasticidad [Pa] · I: inercia [m⁴]
    """
    x = np.asarray(x, dtype=float)
    a = float(np.clip(a, 0.0, L))

    if apoyo == "voladizo":
        izq = x <= a
        flecha = np.where(
            izq,
            P * x**2 * (3 * a - x) / (6 * E * I),
            P * a**2 * (3 * x - a) / (6 * E * I),
        )
        momento = np.where(izq, -P * (a - x), 0.0)

    elif apoyo == "biapoyada":
        b = L - a
        izq = x <= a
        flecha = np.where(
            izq,
            P * b * x * (L**2 - b**2 - x**2) / (6 * L * E * I),
            P * a * (L - x) * (L**2 - a**2 - (L - x) ** 2) / (6 * L * E * I),
        )
        momento = np.where(izq, P * b * x / L, P * a * (L - x) / L)

    else:
        raise ValueError(f"apoyo debe ser uno de {APOYOS}, no {apoyo!r}")

    return flecha, momento


def tension_maxima(momento, W):
    """Tensión normal máxima [Pa] en la fibra extrema: σ = |M|máx / W."""
    return np.abs(momento).max() / W


def exporta_para_diapositivas(
    ruta, L=3.0, E=210e9, perfil="IPE 200", fy=275e6, n_x=61, n_a=31
):
    """Escribe un archivo .js con las curvas de la viga para las diapositivas.

    Calcula, para una carga de 1 kN en n_a posiciones distintas, la flecha [mm]
    y el momento [kN·m] en n_x puntos de la viga, para cada tipo de apoyo.
    Como todo es lineal, la diapositiva solo tiene que multiplicar por P.

    Es un .js (y no un .json) para que el navegador lo pueda leer también al
    abrir index.html con doble clic, sin servidor.
    """
    if perfil not in PERFILES:
        raise ValueError(f"perfil debe ser uno de {list(PERFILES)}, no {perfil!r}")
    seccion = PERFILES[perfil]
    x = np.linspace(0, L, n_x)
    posiciones = np.linspace(0, L, n_a)

    casos = {}
    for apoyo in APOYOS:
        flechas, momentos = [], []
        for a in posiciones:
            w, m = calcula_viga(x, L, a, 1e3, E, seccion["I"], apoyo)
            flechas.append(np.round(w * 1e3, 5).tolist())  # mm por kN
            momentos.append(np.round(m / 1e3, 5).tolist())  # kN·m por kN
        casos[apoyo] = {"flecha_mm": flechas, "momento_kNm": momentos}

    datos = {
        "generado": datetime.now().strftime("%d/%m/%Y %H:%M"),
        "fuente": "ejemplos/viga_interactiva.ipynb",
        "L": L,
        "E": E,
        "fy": fy,
        "perfil": {"nombre": perfil, **seccion},
        "x": np.round(x, 4).tolist(),
        "a": np.round(posiciones, 4).tolist(),
        "casos": casos,
    }

    ruta = Path(ruta)
    ruta.parent.mkdir(parents=True, exist_ok=True)
    cabecera = (
        "// Archivo generado por ejemplos/viga_interactiva.ipynb con vigas.py.\n"
        "// No lo edites a mano: cambia el notebook y vuelve a ejecutarlo.\n"
    )
    ruta.write_text(
        cabecera + "window.VIGA_DATOS = " + json.dumps(datos) + ";\n", encoding="utf-8"
    )
    return ruta


if __name__ == "__main__":
    # Comprobación rápida: la viga de viga.py debe dar 22.1 mm.
    p = PERFILES["IPE 200"]
    w, m = calcula_viga(np.linspace(0, 3, 101), 3.0, 3.0, 10e3, 210e9, p["I"])
    print(f"Flecha máxima: {w.max() * 1000:.1f} mm")
    print(f"Tensión máxima: {tension_maxima(m, p['W']) / 1e6:.0f} MPa")
