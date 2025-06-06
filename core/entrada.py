"""
Módulo para manejar la entrada de datos del usuario.
"""

import json
import os

def cargar_partidos():
    """
    Carga los partidos precargados desde el archivo JSON.
    
    Returns:
        dict: Diccionario con los partidos por provincia
    """
    try:
        with open('data/partidos.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print("Error: No se encontró el archivo de partidos")
        return {}
    except json.JSONDecodeError:
        print("Error: El archivo de partidos no es un JSON válido")
        return {}

def obtener_provincia():
    """
    Solicita al usuario que ingrese una provincia.
    
    Returns:
        str: Nombre de la provincia ingresada
    """
    print("\nProvincias disponibles:")
    provincias = [
        "Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Tucumán",
        "Entre Ríos", "Salta", "Misiones", "Chaco", "Corrientes",
        "Santiago del Estero", "San Juan", "Jujuy", "Río Negro",
        "Neuquén", "Formosa", "Chubut", "San Luis", "Catamarca",
        "La Rioja", "La Pampa", "Santa Cruz", "Tierra del Fuego"
    ]
    
    for i, provincia in enumerate(provincias, 1):
        print(f"{i}. {provincia}")
    
    while True:
        try:
            opcion = int(input("\nSeleccione el número de la provincia: "))
            if 1 <= opcion <= len(provincias):
                return provincias[opcion - 1]
            print("Opción inválida. Por favor, seleccione un número válido.")
        except ValueError:
            print("Por favor, ingrese un número válido.")

def obtener_porcentajes(provincia):
    """
    Solicita al usuario que ingrese los porcentajes de votos por partido.
    
    Args:
        provincia (str): Nombre de la provincia seleccionada
        
    Returns:
        dict: Diccionario con los porcentajes por partido
    """
    partidos = cargar_partidos()
    if provincia not in partidos:
        print(f"Error: No se encontraron partidos para la provincia {provincia}")
        return {}
        
    votos = {}
    total = 0
    
    print(f"\nPartidos disponibles en {provincia}:")
    for i, partido in enumerate(partidos[provincia], 1):
        print(f"{i}. {partido}")
    
    print("\nIngrese los porcentajes de votos por partido:")
    
    for partido in partidos[provincia]:
        while True:
            try:
                porcentaje = float(input(f"\nPorcentaje de votos para {partido}: "))
                if porcentaje < 0:
                    print("El porcentaje no puede ser negativo.")
                    continue
                if total + porcentaje > 100:
                    print(f"El total no puede superar el 100%. Restante: {100 - total}%")
                    continue
                    
                votos[partido] = porcentaje
                total += porcentaje
                
                print(f"Total acumulado: {total}%")
                
                if total >= 100:
                    print("Se ha alcanzado el 100% de los votos.")
                    return votos
                    
                break
                    
            except ValueError:
                print("Por favor, ingrese un número válido.")
    
    return votos

def convertir_porcentajes_a_votos(porcentajes, total_votantes=1000000):
    """
    Convierte porcentajes a números de votos.
    
    Args:
        porcentajes (dict): Diccionario con porcentajes por partido
        total_votantes (int): Número total de votantes
        
    Returns:
        dict: Diccionario con votos por partido
    """
    return {
        partido: int((porcentaje / 100) * total_votantes)
        for partido, porcentaje in porcentajes.items()
    } 