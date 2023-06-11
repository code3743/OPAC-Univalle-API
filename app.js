const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const logsPath = path.join(__dirname, 'logs', 'logs.log');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use('/api', require('./routers/opac.router'));
app.get('/logs', (req, res) =>res.sendFile(logsPath));
app.listen(port, () => { console.log('Corriendo en el puerto:', port)});