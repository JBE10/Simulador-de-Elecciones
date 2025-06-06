# Simulador de Elecciones 2025

Una aplicación web para simular las elecciones legislativas argentinas de 2025, utilizando el método D'Hondt para la distribución de bancas.

## Características

- Simulación de elecciones legislativas por provincia
- Cálculo de bancas de diputados y senadores
- Visualización de resultados mediante gráficos
- Interfaz de usuario intuitiva y moderna
- Exportación de resultados en formato JSON y CSV

## Tecnologías Utilizadas

- Frontend:
  - React
  - Material UI
  - Recharts (para gráficos)
  - Vite (como bundler)

- Backend:
  - Python
  - FastAPI
  - Pandas
  - NumPy

## Instalación

### Backend

1. Crear un entorno virtual:
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

2. Instalar dependencias:
```bash
pip install -r requirements.txt
```

3. Iniciar el servidor:
```bash
uvicorn main:app --reload
```

### Frontend

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Uso

1. Accede a la aplicación en `http://localhost:5173`
2. Selecciona una provincia
3. Ingresa los porcentajes de votos para cada partido
4. Visualiza los resultados en la sección correspondiente

## Estructura del Proyecto

```
simulador_elecciones/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── data/
│       ├── provincias.csv
│       └── partidos.csv
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── styles/
    │   └── App.jsx
    ├── index.html
    └── package.json
```

## Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 