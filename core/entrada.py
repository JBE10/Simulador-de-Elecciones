"""
Módulo para manejar la entrada de datos del usuario.
"""

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

def obtener_porcentajes():
    """
    Solicita al usuario que ingrese los porcentajes de votos por partido.
    
    Returns:
        dict: Diccionario con los porcentajes por partido
    """
    votos = {}
    total = 0
    
    print("\nIngrese los porcentajes de votos por partido (ingrese 0 para terminar):")
    
    while True:
        partido = input("\nNombre del partido (o 0 para terminar): ")
        if partido == "0":
            break
            
        try:
            porcentaje = float(input(f"Porcentaje de votos para {partido}: "))
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