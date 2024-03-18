# Serie Horarios App

Esta aplicacion muestra  por medio de un carrusel las series de televisión y sus horarios de emisión.

## Requisitos Previos

- Node.js y npm o yarn instalados.
- API Express corriendo en el puerto 3001.

## Instalación

Instrucciones para instalar y ejecutar la aplicación React.

```bash
git clone https://github.com/fabriconiglio/app-horarios-series.git
cd ejercicioCuatro/app-horarios-series
npm install
npm start
```

## Uso
Se deben correr los dos servidores, el de la API y el de la aplicacion React.

```bash
node app.js
npm start
```
El primero se lo debe correr en el proyecto ejercicioTres y el segundo en el proyecto app-horarios-series.

# API Endpoints Consumidos:

- GET /api/series: Devuelve un listado de todas las series de televisión.
- GET /api/intervals/by-series/:tv_series_id Devuelve un listado de todos los horarios de emisión de una serie de televisión.
