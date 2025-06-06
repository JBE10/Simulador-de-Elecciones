"""
Implementación del cálculo de senadores por mayoría simple.
"""

def calcular_senadores(votos_por_provincia, provincias):
    """
    Calcula los senadores electos por mayoría simple en cada provincia.
    
    Args:
        votos_por_provincia (dict): Diccionario con los votos por partido en cada provincia
        provincias (dict): Diccionario con la cantidad de senadores por provincia
        
    Returns:
        dict: Diccionario con los senadores asignados por partido en cada provincia
    """
    resultados = {}
    
    for provincia, senadores in provincias.items():
        if provincia not in votos_por_provincia:
            continue
            
        votos = votos_por_provincia[provincia]
        # Ordenar partidos por votos (de mayor a menor)
        partidos_ordenados = sorted(
            votos.items(),
            key=lambda x: x[1],
            reverse=True
        )
        
        # Asignar senadores a los partidos más votados
        senadores_asignados = {}
        for partido, _ in partidos_ordenados[:senadores]:
            senadores_asignados[partido] = 1
            
        resultados[provincia] = senadores_asignados
    
    return resultados 