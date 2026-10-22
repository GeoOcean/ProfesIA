"""Bloques de oleaje: teoría lineal de ondas.

Cada función es un «bloque»: entradas con unidades → operación → salida.
Las pruebas están en test_oleaje.py (ejecutar con: python -m pytest).

Referencia: Dean y Dalrymple, «Water Wave Mechanics for Engineers and
Scientists», capítulos 3 y 4.
"""

import numpy as np

G = 9.81  # aceleración de la gravedad [m/s²]


def longitud_onda(T, h):
    """Longitud de onda L [m] para un periodo T [s]
    y una profundidad h [m].

    Resuelve  ω² = g·k·tanh(k·h)  por Newton."""
    omega = 2 * np.pi / T
    k = omega**2 / G  # arranque: aguas profundas
    for _ in range(50):
        f = G * k * np.tanh(k * h) - omega**2
        df = G * np.tanh(k * h) + G * k * h / np.cosh(k * h) ** 2
        k -= f / df
    return 2 * np.pi / k


def celeridad_grupo(T, h):
    """Celeridad de grupo Cg [m/s]: velocidad a la que viaja la energía."""
    L = longitud_onda(T, h)
    k = 2 * np.pi / L
    n = 0.5 * (1 + 2 * k * h / np.sinh(2 * k * h))
    return n * L / T


def asomeramiento(T, h):
    """Coeficiente de asomeramiento Ks [-] (incidencia normal, sin refracción).

    Conserva el flujo de energía:  Ks = √(Cg₀ / Cg), con Cg₀ = c₀/2.
    """
    cg0 = G * T / (4 * np.pi)
    return np.sqrt(cg0 / celeridad_grupo(T, h))


def rompe(H, h, gamma=0.78):
    """¿Rompe la ola? Criterio de McCowan: H ≥ γ·h, con γ ≈ 0.78."""
    return H >= gamma * h
