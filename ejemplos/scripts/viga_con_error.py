"""La misma viga que viga.py, pero con un error escondido.

La flecha sale unas 1000 veces más grande de lo esperado (~22 mm).
Encuéntralo con el depurador: pon un punto de interrupción en la línea
de `flecha = ...`, pulsa F5 y mira los valores en el panel «Variables».
"""

import numpy as np


def flecha_voladizo(x, L, P, E, I):
    """Flecha [m] de una viga en voladizo con carga puntual P en el extremo."""
    return P * x**2 * (3 * L - x) / (6 * E * I)


L = 3.0  # longitud [m]
P = 10e3  # carga en el extremo [N]
E = 210e6  # módulo de elasticidad del acero [Pa]
I = 1943e-8  # inercia de un IPE 200 [m⁴]

x = np.linspace(0, L, 100)
flecha = flecha_voladizo(x, L, P, E, I)

print(f"Flecha máxima: {flecha.max() * 1000:.1f} mm")
