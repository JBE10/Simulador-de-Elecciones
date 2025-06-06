# Simulador de Elecciones 2025

Este programa simula el reparto de escaños en las elecciones legislativas de 2025, utilizando el método D'Hondt para diputados y mayoría simple para senadores.

## Características

- Cálculo de escaños de diputados usando el método D'Hondt
- Cálculo de senadores por mayoría simple
- Validación de datos de entrada
- Exportación de resultados en formato JSON y CSV
- Soporte para umbral mínimo de votos
- Actualizado para las elecciones 2025

## Requisitos

- Python 3.6 o superior

## Estructura del Proyecto

```
simulador_elecciones/
│
├── main.py                    # Script principal
├── core/
│   ├── __init__.py
│   ├── dhondt.py              # Algoritmo de reparto D'Hondt
│   ├── senadores.py           # Lógica de mayoría simple
│   └── validacion.py          # Validaciones generales
├── data/
│   ├── provincias.json        # Provincias con cantidad de bancas predefinidas
│   └── ejemplos.json          # Ejemplos de elecciones simuladas
└── utils/
    └── exportador.py          # Exportación a CSV o JSON
```

## Uso

1. Prepara un archivo JSON con la configuración de la elección siguiendo este formato:

```json
{
    "votos": {
        "Partido A": 1500000,
        "Partido B": 1200000,
        ...
    },
    "escanos": 100,
    "umbral": 3,
    "provincias": {
        "Buenos Aires": 3,
        "Córdoba": 2,
        ...
    }
}
```

2. Ejecuta el programa:

```bash
python main.py configuracion.json
```

3. También puedes ejecutar el modo interactivo, que permite ingresar los
   porcentajes manualmente:

```bash
python interactive.py
```

4. Los resultados se guardarán en:
   - `resultados.json`: Resultados completos en formato JSON
   - `resultados.csv`: Resultados de diputados en formato CSV

## Formato de la Configuración

- `votos`: Diccionario con los votos por partido
- `escanos`: Número total de escaños a repartir
- `umbral`: Porcentaje mínimo de votos para obtener escaños (opcional)
- `provincias`: Diccionario con la cantidad de senadores por provincia

## Ejemplo

Se incluye un archivo de ejemplo en `data/ejemplos.json` que puedes usar como referencia.

## Contribuir

Las contribuciones son bienvenidas. Por favor, asegúrate de:

1. Hacer fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.

## Contacto

Para reportar problemas o sugerir mejoras, por favor abre un issue en el repositorio. 