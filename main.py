#!/usr/bin/env python3
"""
Simulador de Elecciones 2025
---------------------------
Este programa simula el reparto de escaños en elecciones legislativas
utilizando el método D'Hondt para diputados y mayoría simple para senadores.
"""

from core.dhondt import calcular_dhondt
from core.senadores import calcular_senadores
from core.validacion import validar_datos_eleccion
from core.entrada import obtener_provincia, obtener_porcentajes, convertir_porcentajes_a_votos
from utils.exportador import exportar_resultados
import json
import sys

def cargar_configuracion_provincia(provincia):
    """Carga la configuración base para una provincia específica."""
    return {
        "provincias": {
            "Buenos Aires": 3,
            "Córdoba": 2,
            "Santa Fe": 2,
            "Mendoza": 2,
            "Tucumán": 2,
            "Entre Ríos": 2,
            "Salta": 2,
            "Misiones": 2,
            "Chaco": 2,
            "Corrientes": 2,
            "Santiago del Estero": 2,
            "San Juan": 2,
            "Jujuy": 2,
            "Río Negro": 2,
            "Neuquén": 2,
            "Formosa": 2,
            "Chubut": 2,
            "San Luis": 2,
            "Catamarca": 2,
            "La Rioja": 2,
            "La Pampa": 2,
            "Santa Cruz": 2,
            "Tierra del Fuego": 2
        }
    }

def main():
    """Función principal del programa."""
    print("=== Simulador de Elecciones 2025 ===")
    
    # Obtener provincia
    provincia = obtener_provincia()
    print(f"\nProvincia seleccionada: {provincia}")
    
    # Obtener porcentajes de votos
    porcentajes = obtener_porcentajes()
    if not porcentajes:
        print("No se ingresaron datos de votos. Saliendo...")
        sys.exit(1)
    
    # Convertir porcentajes a votos
    votos = convertir_porcentajes_a_votos(porcentajes)
    
    # Cargar configuración base
    config = cargar_configuracion_provincia(provincia)
    config['votos'] = {provincia: votos}
    config['escanos'] = 100  # Número de diputados a nivel nacional
    config['umbral'] = 3     # Umbral mínimo de votos
    
    # Validar datos
    if not validar_datos_eleccion(config):
        print("Error: Los datos de la elección no son válidos")
        sys.exit(1)
    
    # Calcular resultados
    resultados_diputados = calcular_dhondt(
        votos,
        config['escanos'],
        config['umbral']
    )
    
    resultados_senadores = calcular_senadores(
        {provincia: votos},
        {provincia: config['provincias'][provincia]}
    )
    
    # Mostrar resultados
    print("\n=== Resultados ===")
    print(f"\nProvincia: {provincia}")
    
    print("\nDiputados:")
    for partido, escaños in resultados_diputados.items():
        print(f"{partido}: {escaños} escaños")
    
    print("\nSenadores:")
    for partido in resultados_senadores[provincia].keys():
        print(f"{partido}: 1 senador")
    
    # Exportar resultados
    exportar_resultados({
        'diputados': resultados_diputados,
        'senadores': resultados_senadores
    }, 'resultados.json')
    
    print("\nLos resultados han sido guardados en 'resultados.json'")

if __name__ == "__main__":
    main() 