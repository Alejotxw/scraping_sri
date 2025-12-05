const express = require('express')
const cors = require('cors')  // ← NUEVO
const app = express()
<<<<<<< Updated upstream
const port = 3001
const { obtenerDatosRuc } = require('./ScrapingSRI.js')

app.use(cors())  // ← NUEVO: Habilitar CORS

app.get('/consultar', async (req, res) => {
    const ruc = req.query.ruc
    const data = await obtenerDatosRuc(ruc)
    console.log(data)
    res.send(data)
=======
const port = 3031
const { obtenerDatosci } = require('./scrapingRP.js');
//Habilita cors a todos los origenes
const cors = require('cors');
app.use(cors());
app.get('/consultar', async (req, res) => {
  const ci = req.query.ci;
  const data = await obtenerDatosci(ci);
  console.log(data);
  res.send(data);
>>>>>>> Stashed changes
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})