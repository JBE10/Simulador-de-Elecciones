#!/usr/bin/env python3
"""
Simulador de Elecciones
-----------------------
Este programa simula el reparto de escaños en elecciones legislativas
utilizando el método D'Hondt para diputados y mayoría simple para senadores.
"""

from core.dhondt import calcular_dhondt
from core.senadores import calcular_senadores
from core.validacion import validar_datos_eleccion
from utils.exportador import exportar_resultados
import json
import sys

def cargar_configuracion(archivo):
    """Carga la configuración desde un archivo JSON."""
    try:
        with open(archivo, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: No se encontró el archivo {archivo}")
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"Error: El archivo {archivo} no es un JSON válido")
        sys.exit(1)

def main():
    """Función principal del programa."""
    if len(sys.argv) != 2:
        print("Uso: python main.py <archivo_configuracion.json>")
        sys.exit(1)

    # Cargar configuración
    config = cargar_configuracion(sys.argv[1])
    
    # Validar datos
    if not validar_datos_eleccion(config):
        print("Error: Los datos de la elección no son válidos")
        sys.exit(1)

    # Calcular resultados
    resultados_diputados = calcular_dhondt(
        config['votos'],
        config['escanos'],
        config.get('umbral', 3)
    )
    
    resultados_senadores = calcular_senadores(
        config['votos'],
        config['provincias']
    )

    # Exportar resultados
    exportar_resultados({
        'diputados': resultados_diputados,
        'senadores': resultados_senadores
    }, 'resultados.json')

if __name__ == "__main__":
    main() 