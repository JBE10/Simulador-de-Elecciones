"""
Módulo de validación para los datos de las elecciones.
"""

def validar_datos_eleccion(config):
    """
    Valida que los datos de la elección sean correctos.
    
    Args:
        config (dict): Diccionario con la configuración de la elección
        
    Returns:
        bool: True si los datos son válidos, False en caso contrario
    """
    # Verificar campos obligatorios
    campos_requeridos = ['votos', 'escanos', 'provincias']
    if not all(campo in config for campo in campos_requeridos):
        return False
    
    # Validar votos
    if not isinstance(config['votos'], dict):
        return False
    
    # Validar escaños
    if not isinstance(config['escanos'], int) or config['escanos'] <= 0:
        return False
    
    # Validar provincias
    if not isinstance(config['provincias'], dict):
        return False
    
    for provincia, senadores in config['provincias'].items():
        if not isinstance(senadores, int) or senadores <= 0:
            return False
    
    # Validar umbral si está presente
    if 'umbral' in config:
        if not isinstance(config['umbral'], (int, float)):
            return False
        if config['umbral'] < 0 or config['umbral'] > 100:
            return False
    
    return True 