const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/api', require('./routers/opac.router'));

app.listen(port, () => { console.log('Corriendo en el puerto:', port) });