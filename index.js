import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
  onValue,
  query,
  orderByChild,
  orderByValue,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

//******************************************************************************************** */

const cardCorriente = document.getElementById("idCardCorriente");
const btnResetEnergia = document.getElementById("idResetEnergia");
const ctx = document.getElementById("energiaChart");
//***************************************************************************************
var gaugePotencia = new RadialGauge({
  renderTo: "gauge-potencia",
  width: 300,
  height: 300,
  units: "W",
  title: "Potencia",
  minValue: 0,
  maxValue: 10000,
  majorTicks: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
  minorTicks: 2,
  strokeTicks: true,
  highlights: [
    {
      from: 0,
      to: 1000,
      color: "rgba(0,255, 0, .3)",
    },
    {
      from: 1000,
      to: 5000,
      color: "rgba(255, 255, 0, .3)",
    },
    {
      from: 5000,
      to: 10000,
      color: "rgba(255, 0, 0, .3)",
    },
  ],
  ticksAngle: 225,
  startAngle: 67.5,
  colorMajorTicks: "#ddd",
  colorMinorTicks: "#ddd",
  colorTitle: "#eee",
  colorUnits: "#ccc",
  colorNumbers: "#eee",
  colorPlate: "#222",
  borderShadowWidth: 0,
  borders: true,
  needleType: "arrow",
  needleWidth: 2,
  needleCircleSize: 7,
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear",
  colorBorderOuter: "#333",
  colorBorderOuterEnd: "#111",
  colorBorderMiddle: "#222",
  colorBorderMiddleEnd: "#111",
  colorBorderInner: "#111",
  colorBorderInnerEnd: "#333",
  colorNeedleShadowDown: "#333",
  colorNeedleCircleOuter: "#333",
  colorNeedleCircleOuterEnd: "#111",
  colorNeedleCircleInner: "#111",
  colorNeedleCircleInnerEnd: "#222",
  valueBoxBorderRadius: 0,
  colorValueBoxRect: "#222",
  colorValueBoxRectEnd: "#333",
}).draw();
//**************************************************
var gaugeCorriente = new RadialGauge({
  renderTo: "gauge-corriente",
  width: 300,
  height: 300,
  units: "A",
  title: "Corriente",
  minValue: 0,
  maxValue: 30,
  majorTicks: [0, 3, 6, 9, 12, 15, 18, 21, 24, 30],
  minorTicks: 2,
  strokeTicks: true,
  highlights: [
    {
      from: 0,
      to: 6,
      color: "rgba(0,255,0, 0.3)",
    },
    {
      from: 6,
      to: 12,
      color: "rgba(255, 255, 0, .3)",
    },
    {
      from: 12,
      to: 30,
      color: "rgba(255, 0, 0, .3)",
    },
  ],
  ticksAngle: 225,
  startAngle: 67.5,
  colorMajorTicks: "#ddd",
  colorMinorTicks: "#ddd",
  colorTitle: "#eee",
  colorUnits: "#ccc",
  colorNumbers: "#eee",
  colorPlate: "#222",
  borderShadowWidth: 0,
  borders: true,
  needleType: "arrow",
  needleWidth: 2,
  needleCircleSize: 7,
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear",
  colorBorderOuter: "#333",
  colorBorderOuterEnd: "#111",
  colorBorderMiddle: "#222",
  colorBorderMiddleEnd: "#111",
  colorBorderInner: "#111",
  colorBorderInnerEnd: "#333",
  colorNeedleShadowDown: "#333",
  colorNeedleCircleOuter: "#333",
  colorNeedleCircleOuterEnd: "#111",
  colorNeedleCircleInner: "#111",
  colorNeedleCircleInnerEnd: "#222",
  valueBoxBorderRadius: 0,
  colorValueBoxRect: "#222",
  colorValueBoxRectEnd: "#333",
}).draw();
//*********************************************** */
var gaugeTension = new RadialGauge({
  renderTo: "gauge-tension",
  width: 300,
  height: 300,
  units: "V",
  title: "Tension",
  minValue: 0,
  maxValue: 250,
  majorTicks: [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
  minorTicks: 2,
  strokeTicks: true,
  highlights: [
    {
      from: 0,
      to: 200,
      color: "rgba(0,0,255, .3)",
    },
    {
      from: 200,
      to: 250,
      color: "rgba(0, 255, 0, .3)",
    },
  ],
  ticksAngle: 225,
  startAngle: 67.5,
  colorMajorTicks: "#ddd",
  colorMinorTicks: "#ddd",
  colorTitle: "#eee",
  colorUnits: "#ccc",
  colorNumbers: "#eee",
  colorPlate: "#222",
  borderShadowWidth: 0,
  borders: true,
  needleType: "arrow",
  needleWidth: 2,
  needleCircleSize: 7,
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear",
  colorBorderOuter: "#333",
  colorBorderOuterEnd: "#111",
  colorBorderMiddle: "#222",
  colorBorderMiddleEnd: "#111",
  colorBorderInner: "#111",
  colorBorderInnerEnd: "#333",
  colorNeedleShadowDown: "#333",
  colorNeedleCircleOuter: "#333",
  colorNeedleCircleOuterEnd: "#111",
  colorNeedleCircleInner: "#111",
  colorNeedleCircleInnerEnd: "#222",
  valueBoxBorderRadius: 0,
  colorValueBoxRect: "#222",
  colorValueBoxRectEnd: "#333",
}).draw();

//***************************************************************************************
var gaugeEnergia = new RadialGauge({
  renderTo: "gauge-energia",
  width: 300,
  height: 300,
  units: "Kwh",
  title: "Energia",
  minValue: 0,
  maxValue: 100,
  majorTicks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  minorTicks: 2,
  strokeTicks: true,
  highlights: [
    {
      from: 0,
      to: 20,
      color: "rgba(0,255,0, .3)",
    },
    {
      from: 20,
      to: 50,
      color: "rgba(255, 255, 0, .3)",
    },

    {
      from: 50,
      to: 100,
      color: "rgba(255, 0, 0, .3)",
    },
  ],
  ticksAngle: 225,
  startAngle: 67.5,
  colorMajorTicks: "#ddd",
  colorMinorTicks: "#ddd",
  colorTitle: "#eee",
  colorUnits: "#ccc",
  colorNumbers: "#eee",
  colorPlate: "#222",
  borderShadowWidth: 0,
  borders: true,
  needleType: "arrow",
  needleWidth: 2,
  needleCircleSize: 7,
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear",
  colorBorderOuter: "#333",
  colorBorderOuterEnd: "#111",
  colorBorderMiddle: "#222",
  colorBorderMiddleEnd: "#111",
  colorBorderInner: "#111",
  colorBorderInnerEnd: "#333",
  colorNeedleShadowDown: "#333",
  colorNeedleCircleOuter: "#333",
  colorNeedleCircleOuterEnd: "#111",
  colorNeedleCircleInner: "#111",
  colorNeedleCircleInnerEnd: "#222",
  valueBoxBorderRadius: 0,
  colorValueBoxRect: "#222",
  colorValueBoxRectEnd: "#333",
}).draw();

//***************************************************************************************

const lanzaToast = (texto) => {
  let x = document.getElementById("toast");

  x.innerHTML = "<h4>" + texto + "</h4>";

  x.className = "show";
  setTimeout(() => {
    x.className = x.className.replace("show", "");
  }, 2000);
};

//***********************************************************************************
const Toast = (texto) => {
  let x = document.getElementById("toast");
};

//********************************************************************************** */

window.addEventListener("DOMContentLoaded", () => {
  console.log("Inicio App");

  let id;

  lanzaToast("Iniciando ...");

  muestraGrafica();

  controlEnergia();
});

setInterval(() => {
  controlEnergia();
}, 7000);

//*******************************************************************************

const controlEnergia = async () => {
  try {
    const res = await fetch("/dameEnergia");

    const dato = await res.json();
    console.log("dato: " + dato);
    const { Voltaje, Corriente, Potencia, Energia, Frecuencia, PF } = dato;

    console.log("Tension: " + Voltaje);
    console.log("Corriente: " + Corriente);
    console.log("Potencia: " + Potencia);
    console.log("Frecuencia: " + Frecuencia);
    console.log("Energia: " + Energia);
    console.log("PF: " + PF);

    gaugePotencia.value = Potencia;
    gaugeCorriente.value = Corriente;
    gaugeTension.value = Voltaje;
    gaugeEnergia.value = Energia;

    if (Corriente < 5) cardCorriente.style.borderBottomColor = "#59f21c";
    else if (Corriente > 7) cardCorriente.style.borderBottomColor = "red";
    else cardCorriente.style.borderBottomColor = "yellow";

    //hTemperatura.innerHTML = temperatura.toFixed(1);
  } catch (error) {
    console.log("Error midiendo Energia: " + error);
    /*gaugePotencia.value=0;
			gaugeCorriente.value=0;
			gaugeTension.value=0;
			gaugeEnergia.value=0;*/
  }
};

//*************************************************************************************** */

btnResetEnergia.addEventListener("click", async () => {
  console.log("Reset Energia");

  try {
    const res = await fetch("/resetEnergia");

    const dato = await res.json();

    console.log("dato: " + JSON.stringify(dato));

    if (!JSON.stringify(dato).includes("NOK")) lanzaToast("Reset Energia");
    else lanzaToast("Fallo Reset Energia");
  } catch (error) {
    console.log("Error Reset Energia: " + error);
  }
});

//*************************************************************************************** */

const muestraGrafica = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyB7mrG9K4qzMH4zOH8HpjZbGB1LjCRYSeg",
    authDomain: "control-energia-d2296.firebaseapp.com",
    databaseURL:
      "https://control-energia-d2296-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "control-energia-d2296",
    storageBucket: "control-energia-d2296.appspot.com",
    messagingSenderId: "132754283129",
    appId: "1:132754283129:web:fbf15f1523e456013b92a8",
  };

  let arrDatos = [];
  let arr = [];
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);

  const db = getDatabase();
  const dbRef = ref(db, "Energia/");

  onValue(dbRef, (snapshot) => {
    Object.entries(snapshot.val()).forEach((elem) => {
      arrDatos.push(elem[1]);
    });

    arr = procesaUltimoMes(arrDatos, currentMonth, currentYear);

    let consumos = arr.map((a) => +a.ConsumoEnergia);
    let fechas = arr.map((a) => a.fecha);
    let totalConsumido =consumos.reduce((accumulator, currentValue) => {
                                                           return accumulator + currentValue
                                                                                                                    },0);
   
                                                                                                                    
    if (totalConsumido <=500)                                                         
       document.querySelector('.energia_aux').classList.add('energia_low')
    else if(totalConsumido >=500 && totalConsumido <=700)
      document.querySelector('.energia_aux').classList.add('energia_medio')
    else
      document.querySelector('.energia_aux').classList.add('energia_alto')
    
       



    document.querySelector('.energia_aux p').innerHTML=`<em>Total: </em> ${totalConsumido.toFixed(1)} <em>Kwh</em>`
    
    const grafConsumo = new Chart(ctx, {
      type: "bar",

      data: {
        labels: fechas,
        datasets: [
          {
            label: "Consumo Energia",
            data: consumos,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    let colorChangeValue = 50; //set this to whatever is the deciding color change value
    let dataset = grafConsumo.data.datasets[0];
    /*for (let i = 0; i < dataset.data.length; i++) {
      if (dataset.data[i] > colorChangeValue) {
        dataset.backgroundColor[i] =' rgba(154, 162, 235, 0.8)'
          
      }
    }*/
    grafConsumo.update();

  });

};

//****************************************************************************** */

const procesaUltimoMes = (arr, currentMonth, currentYear) => {
  let events = arr.filter((e) => {
    let [day, month, year] = e.fecha.split("/"); // Or, var month = e.date.split('-')[1];
    return currentMonth === +month && currentYear == year;
  });

  console.log(events);
  return events;
};
