const express = require('express');
const cors = require('cors');
const BrowserSingleton = require('./config/config');

const app = express();
const port = process.env.PORT || 3000;

(async() => { await BrowserSingleton.getBrowser();})(); 
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use('/api', require('./routers/opac.router'));

app.listen(port, () => { console.log('Corriendo en el puerto:', port) });