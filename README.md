# Control de Gastos

Aplicación web para registrar ingresos y gastos, visualizar el balance financiero y analizar la distribución por categorías.

## Descripción

Control de Gastos es un dashboard de finanzas personales construido con React y Vite. Permite registrar movimientos, consultar métricas clave y mantener un historial persistente en el navegador.

La interfaz está orientada a claridad de lectura y rapidez de operación, con montos en peso colombiano (COP) y resumen visual por categoría.

## Funcionalidades principales

- Registro de movimientos con tipo, categoría, descripción y monto.
- Cálculo automático de saldo actual, ingresos acumulados y gastos acumulados.
- Resumen por categoría mediante gráfico circular y desglose porcentual.
- Listado de movimientos con fecha y opción de eliminación.
- Persistencia local de datos con Local Storage.

## Stack tecnológico

- React 19
- Vite 7
- Recharts
- ESLint 9

## Requisitos

- Node.js 20 o superior recomendado.
- npm 10 o superior recomendado.


## Estructura del proyecto

```text
.
|-- public/
|-- src/
|   |-- assets/
|   |-- components/
|   |   |-- ExpenseChart.jsx
|   |   |-- ExpenseForm.jsx
|   |   `-- ExpenseList.jsx
|   |-- App.css
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- eslint.config.js
|-- index.html
|-- package.json
`-- vite.config.js
```

## Modelo de datos

Cada movimiento contiene, como mínimo, los siguientes campos:

- `id`: identificador numérico.
- `createdAt`: fecha de creación en formato ISO.
- `description`: descripción del movimiento.
- `amount`: valor numérico del movimiento.
- `type`: `Ingreso` o `Gasto`.
- `category`: categoría asociada.

## Persistencia y cálculo

- Los movimientos se almacenan en `localStorage` bajo la clave `expenses`.
- Los indicadores del panel se calculan en memoria a partir del estado actual.
- El resumen por categoría sanea montos inválidos antes de consolidar información.

## Autor
Camilo Sanchez
