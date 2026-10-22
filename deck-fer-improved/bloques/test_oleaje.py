"""Pruebas de los bloques de oleaje: casos conocidos y límites asintóticos."""

import numpy as np

from oleaje import G, asomeramiento, celeridad_grupo, longitud_onda, rompe


def test_aguas_profundas():
    # h grande: L tiende a L₀ = g·T²/(2π)
    assert np.isclose(longitud_onda(8, 1000),
                      G * 8**2 / (2 * np.pi), rtol=1e-6)


def test_aguas_someras():
    # h pequeña: L ≈ T·√(g·h)
    assert np.isclose(longitud_onda(8, 0.5),
                      8 * np.sqrt(G * 0.5), rtol=0.01)


def test_caso_dashboard():
    # T = 8 s, h = 20 m: los valores del dashboard de la diapositiva de ondas
    assert round(longitud_onda(8, 20), 2) == 88.79
    assert round(celeridad_grupo(8, 20), 2) == 7.41


def test_asomeramiento_profundas():
    # En aguas profundas no hay asomeramiento
    assert np.isclose(asomeramiento(8, 1000), 1.0, rtol=1e-6)


def test_rotura():
    assert rompe(H=2.0, h=2.0)
    assert not rompe(H=1.0, h=2.0)
