require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');
const DBLocal = require('./data/db.local');
const listadoDBUnivalle = require('./services/listado.db.univalle.service');

const app = express();
const db = new DBLocal();
const port = process.env.PORT || 3000;
const logsPath = path.join(__dirname, 'logs', 'logs.log');

db.init();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api', require('./routers/opac.router'));
app.get('/logs', (_, res) =>res.sendFile(logsPath));

app.listen(port, () => { console.log('Corriendo en el puerto:', port)});