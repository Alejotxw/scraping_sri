const express = require('express')
const app = express()
const port = 3000
const {obtenerDatosRuc} = require('./ScrapingSRI.js');

app.get('/consultar', async (req, res) => {

    //http://localhost:3000/consultar?ruc=1150575338001
    const ruc = req.query.ruc;
    const data = await obtenerDatosRuc(ruc);
    console.log(data);
    res.send(data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
