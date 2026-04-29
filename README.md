
# StockFlow 📦

StockFlow es una solución de backend robusta para la gestión de inventarios multisucursal. El sistema permite el control de existencias en tiempo real, registro de movimientos (entradas, salidas y transferencias) y análisis de datos mediante un Dashboard y reportes dinámicos.
Este proyecto destaca por su arquitectura asíncrona, utilizando un Worker para el procesamiento de movimientos, simulando integraciones con sistemas externos de alta latencia.


## 🐦 Características Principales

 - Gestión Multisucursal: Control total de stock por ubicación geográfica.
 
 - Procesamiento Asíncrono: Registro inmediato de movimientos con procesamiento en segundo plano.
 - Sistema de Reintentos: Manejo automático de errores y consistencia de datos si una operación falla.
 - Seguridad: Autenticación de rutas mediante JWT (JSON Web Tokens).
 - Reportes Avanzados: Uso del Aggregation Framework de MongoDB para obtener estadísticas por fechas y tipos.
 - Base de Datos NoSQL: Modelado flexible y escalable con MongoDB Atlas.



##  ⚙️ Instalación y Configuración

1. Clonar el repositorio:

```bash
  git clone https://github.com/seb475/Examen.git
```
2. Instalar dependencias:

```bash
  npm install
```
3. Variables de Entorno:

```Fragmento de código
PORT=8080
DATABASE_URL=tu_url_de_mongodb
TOKEN_SECRET=Clave_secreta
```
4. Iniciar el proyecto:

```bash
# Modo producción
   npm start

# Modo desarrollo (con Nodemon)
   npm run dev
```




    
## 🔄 El Worker (Procesamiento en segundo plano)

El sistema utiliza un Worker independiente que se inicia junto con el servidor. Este proceso busca movimientos con estado `pending` cada 5 segundos y ejecuta la lógica de actualización de stock.

- Consistencia Eventual: La API responde `202 Accepted` de inmediato.

- Estados: Los movimientos transitan de `pending` → `processed` (o `failed` tras 2 intentos fallidos).

- Manejo de Errores: Si el procesamiento falla (ej. stock insuficiente), el error se guarda en el campo `error` y se activa el sistema de reintentos.


## 🧮 Endpoints Principales

🔐 Autenticación
- `http://localhost:8080/get-token` - Genera un token de prueba (Solo Desarollo).

📦 Productos

- `GET /productos` - Listado de todos los productos
- `POST /productos` - Crear un nuevo producto (SKU único).

🏢 Sucursales
- `GET /sucursales` - Listado de todas las sucursales.
- `POST /sucursales` - Registrar una nueva sucursal.

🔄 Movimientos (Procesamiento Asíncrono)
- `POST /movimiento` - Registra una intención de movimiento (Estado inicial: pending).
- `GET /movimiento` - Historial completo de movimientos con populate de producto y sucursales.

📈 Reportes y Dashboard
- `GET /dashboard` - Estado actual del inventario (Stock por producto y sucursal).
- `GET /movimientos-totales` - Reporte estadístico agrupado por tipo y sucursal.

🗄️ Stock (Consultas operativas)
- `GET /stock` - Consulta cruda de la tabla de existencias.





### 🧮  Endpoints Protegidos 

| Módulo | Endpoint | Método | Protección | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `/get-token` | GET | 🔓 Abierto | Genera token de prueba. |
| **Productos** | `/productos` | GET/POST | 🔐 JWT | Gestión del catálogo. |
| **Movimientos**| `/movimiento`| POST | 🔐 JWT | Registro de flujo de stock. |
| **Dashboard** | `/dashboard` | GET | 🔐 JWT | Vista de inventario real. |
| **Reportes** | `/movimientos-totales` | GET | 🔐 JWT | Análisis histórico. |
## 🧪 Tests
Para ejecutar la suite de tests automatizados:
```bash
  npm run test
```


## 📝 Notas de Proceso
Puedes consultar el archivo PROCESS.md para conocer más sobre las decisiones técnicas, diagramas de arquitectura y retos superados durante el desarrollo.

## ⏳ Elavoracion en 1 semana 
Si el tiempo dado para la prueva fueara de 1 semana en vez de 48hrs lograria terminar el front y back juntos desplegarlos y intregrar el back en el front como hacer 
un front mas complejo y mejor visible, aprender ye entender como usar RabbitMQ e la implementacion de Docker 


## 👨🏽‍💻 Author

- [@sebastian_Pedraza](https://github.com/seb475)




