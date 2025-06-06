"""
Implementación del método D'Hondt para el reparto de escaños.
"""

def calcular_dhondt(votos, escanos, umbral=3):
    """
    Calcula el reparto de escaños usando el método D'Hondt.
    
    Args:
        votos (dict): Diccionario con los votos por partido
        escanos (int): Número total de escaños a repartir
        umbral (float): Porcentaje mínimo de votos para obtener escaños
        
    Returns:
        dict: Diccionario con los escaños asignados por partido
    """
    # Filtrar partidos que no superan el umbral
    votos_totales = sum(votos.values())
    votos_filtrados = {
        partido: votos_partido
        for partido, votos_partido in votos.items()
        if (votos_partido / votos_totales) * 100 >= umbral
    }
    
    # Inicializar contador de escaños
    escanos_asignados = {partido: 0 for partido in votos_filtrados}
    
    # Calcular cocientes y asignar escaños
    for _ in range(escanos):
        cocientes = {
            partido: votos_partido / (escanos_asignados[partido] + 1)
            for partido, votos_partido in votos_filtrados.items()
        }
        
        # Encontrar el partido con mayor cociente
        partido_ganador = max(cocientes.items(), key=lambda x: x[1])[0]
        escanos_asignados[partido_ganador] += 1
    
    return escanos_asignados 