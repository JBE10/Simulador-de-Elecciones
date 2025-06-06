"""
Módulo para exportar los resultados de las elecciones.
"""

import json
import csv
from datetime import datetime

def exportar_resultados(resultados, archivo_salida):
    """
    Exporta los resultados de las elecciones a un archivo JSON o CSV.
    
    Args:
        resultados (dict): Diccionario con los resultados de las elecciones
        archivo_salida (str): Nombre del archivo de salida
    """
    # Agregar timestamp
    resultados['timestamp'] = datetime.now().isoformat()
    
    # Exportar a JSON
    with open(archivo_salida, 'w', encoding='utf-8') as f:
        json.dump(resultados, f, indent=4, ensure_ascii=False)
    
    # Exportar también a CSV si hay resultados de diputados
    if 'diputados' in resultados:
        archivo_csv = archivo_salida.replace('.json', '.csv')
        with open(archivo_csv, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(['Partido', 'Escaños'])
            for partido, escaños in resultados['diputados'].items():
                writer.writerow([partido, escaños]) 