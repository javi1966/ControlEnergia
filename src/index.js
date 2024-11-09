import  express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


console.log(__dirname + '/www');

const PORT = process.env.PORT || 3030;

// Express app
var app = express();
// Use public directory
app.use(express.static(path.join(__dirname, "www")));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "www","index.html"));
});

//***************************************************************************
app.get('/dameEnergia' , async(req,res) => {

  console.log("Peticion dato Energia");
  
  
  let result = await axios("http://192.168.1.223/dameEnergia");

  const { Voltaje, Corriente, Potencia, Energia, Frecuencia, PF  } = result.data;
  console.log("Tension: " + Voltaje);
  console.log("Corriente: " + Corriente);
  console.log("Potencia: " + Potencia);
  console.log("Frecuencia: " + Frecuencia);
  console.log("Energia: " + Energia);
  console.log("PF: " + PF);

  

  return res.send(result.data);


});

//**************************************************************************
app.get('/resetEnergia' , async(req,res) => {

  console.log("Peticion reset Energia");

  let result = await axios("http://192.168.1.223/resetEnergia");

  const { Reset_Energia,Energia_Acumulada } = result.data;

  console.log("Reset Energia: "+Reset_Energia);
  console.log("Energia Acumulada: "+Energia_Acumulada);

  return res.send(result.data);


});
//**************************************************************************

// Start server
let server = app.listen(PORT, () => {
    console.log('Control Energia,puerto %d', server.address().port);
});