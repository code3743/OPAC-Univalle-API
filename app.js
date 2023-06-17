require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');
const DbLocal = require('./data/db.local');

const app = express();
const db = new DbLocal();
const port = process.env.PORT || 3000;
const logsPath = path.join(__dirname, 'logs', 'logs.log');

db.init();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api', require('./routers/opac.router'));
app.get('/logs', (req, res) =>res.sendFile(logsPath));

app.listen(port, () => { console.log('Corriendo en el puerto:', port)});