const { obtenerDashboard, obtenerReporteFechas } = require('../controllers/reporte.controllers');
const express = require('express');

const reporteRouter = express.Router();

reporteRouter.route('/dashboard')
    .get(obtenerDashboard);

reporteRouter.route('/movimientos-totales')
    .get(obtenerReporteFechas);

module.exports = reporteRouter;