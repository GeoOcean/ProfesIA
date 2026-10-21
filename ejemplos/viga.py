"""Flecha de una viga en voladizo con una carga puntual en el extremo.

    δ(x) = P·x²·(3L − x) / (6·E·I)      (x medido desde el empotramiento)

Ejecutar con el botón ▶ de VS Code o en la terminal:  python viga.py
"""

import matplotlib.pyplot as plt
import numpy as np

# Datos (unidades del SI)
L = 3.0  # longitud [m]
P = 10e3  # carga en el extremo [N]
E = 210e9  # módulo de elasticidad del acero [Pa]
I = 1943e-8  # inercia de un IPE 200 [m⁴]

x = np.linspace(0, L, 100)
flecha = P * x**2 * (3 * L - x) / (6 * E * I)

print(f"Flecha máxima: {flecha.max() * 1000:.1f} mm")

plt.plot(x, -flecha * 1000)
plt.xlabel("x [m]")
plt.ylabel("flecha [mm]")
plt.title("Viga en voladizo: IPE 200, P = 10 kN")
plt.grid(True)
plt.savefig("viga.png", dpi=150)
plt.show()
