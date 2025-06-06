#!/usr/bin/env python3
"""Modo interactivo del simulador de elecciones.

Permite seleccionar una provincia y cargar el porcentaje de votos de cada
partido para calcular los escaños asignados mediante el método D'Hondt.
"""

import json
from core.dhondt import calcular_dhondt

PROVINCIAS_FILE = "data/provincias.json"


def cargar_provincias():
    """Carga la lista de provincias y su cantidad de escaños."""
    with open(PROVINCIAS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def seleccionar_provincia(provincias):
    """Permite al usuario seleccionar una provincia."""
    nombres = list(provincias.keys())
    for idx, nombre in enumerate(nombres, start=1):
        print(f"{idx}. {nombre} ({provincias[nombre]} escaños)")
    while True:
        opcion = input("Seleccione una provincia por número: ")
        if opcion.isdigit() and 1 <= int(opcion) <= len(nombres):
            return nombres[int(opcion) - 1]
        print("Opción inválida. Intente nuevamente.")


def ingresar_votos():
    """Solicita al usuario los porcentajes de votos por partido."""
    votos = {}
    print("Ingrese los partidos y su porcentaje de votos. Escriba 'fin' para terminar.")
    while True:
        partido = input("Partido (o 'fin'): ").strip()
        if partido.lower() == "fin":
            break
        porcentaje = input(f"Porcentaje de votos para {partido}: ").strip()
        try:
            votos[partido] = float(porcentaje)
        except ValueError:
            print("Porcentaje inválido. Intente nuevamente.")
    return votos


def main():
    provincias = cargar_provincias()
    provincia = seleccionar_provincia(provincias)
    votos = ingresar_votos()

    if not votos:
        print("No se ingresaron votos. Finalizando.")
        return

    escaños = provincias[provincia]
    resultados = calcular_dhondt(votos, escaños)

    print("\nResultados para", provincia)
    for partido, escaños in resultados.items():
        print(f"{partido}: {escaños} escaño(s)")


if __name__ == "__main__":
    main()
