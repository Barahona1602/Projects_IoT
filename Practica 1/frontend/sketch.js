// Declarar variables globales (temperatura, humedad, luz)
var temperatura = 0;
var humedad = 0;
var luz = 0;
var co2 = 0;
let col = 0, temp = 0, hum = 0 , light = 0, co = 0;

function setup() {
  // Create full screen canvas
  createCanvas(1680, 1050);
  drawButton();
  loadJSON('http://127.0.0.1:5000/last', gotData);
  drawDashboard();
}

function gotData(data) {
  if (data.Temperature) {
    temperatura = data.Temperature
  }
  if (data.Lumen) {
    luz = data.Lumen
  }
  if (data.Humidity) {
    humedad = data.Humidity
  }
  if (data.CO2) {
    co2 = data.CO2
  }
  console.log(temperatura);
  console.log(luz);
  console.log(humedad);
  console.log(co2);
  console.log(data.Fecha);
  console.log(data.Hora);
  console.log(data.Minutos);
  console.log(data.Segundos);
}

function draw() {
// Execute all code below each 5 seconds with millis()
  let currentMillis = millis();
  let currentMillis2 = millis();
  if(currentMillis > 5000){
    temperatura = 20;
    console.log(temperatura);
    loadJSON('http://127.0.0.1:5000/last', gotData);
    currentMillis = 0;
  }
  if (currentMillis2 > 2000){
    updateValues();
    currentMillis2 = 0;
    console.log(temp);
  }
  drawDashboard();
}

function drawDashboard(){
// --------------- Thermometer ----------------
  // grosor de la linea
  strokeWeight(4);
  //background white with a tone of gray
  background(220); 
  // Draw a thermometer in celsius
  // Varia depende on the temperature
  // Progresivamente variar
  if (temp < 10 ){
    //light blue
    col = color(0, 255, 255);
  } else if (temp < 15) {
    col = color(0, 0, 255); // Blue
  } else if (temp < 20) {
    col = color(255, 255, 200);    
  } else if (temp < 25) {
    col = color(255, 255, 0);
  }else if (temp < 30) { 
    col = color(255, 165, 0);
  } else if (temp < 35) {
    col = color(255, 127, 0);
  } else {
    col = color(255, 0, 0);
  }
  fill(col);  
  rect(250, 200, 110, 400);

  fill(200); // Gray
  rect(250, 200, 110, 400 - temp * 4);

  // Set title Thermometer
  fill(0);
  textSize(50);
  text("Termómetro", 150, 100);
  // Set celcius Degress
  fill(0);
  textSize(40);
  text(temp + "ºC", 260, 670);
  // draw small horizontal lines at the left of the thermometer each 10ºC 0-100
  for (var i = 0; i < 11; i++) {
    line(250, 600 - i * 40, 260, 600 - i * 40);
  }
  // draw thinner small horizontal lines at the left of the thermometer each 5ºC 0-100
  for (var i = 0; i < 21; i++) {
    line(250, 600 - i * 20, 255, 600 - i * 20);
  }
  
  // draw small text with amounts of text at the left of the thermometer each 10ºC 0-100
  textSize(15);
  for (var i = 0; i < 11; i++) {
    text(i * 10, 200, 605 - i * 40);
  }


// --------------- CO2 ----------------

// Draw a Co2 meter in ppm with grey meter with range 100-400 ppm's
  // dark gray meter
  fill(100);
  rect(500, 200, 110, 400);
  // light gray meter
  fill(200);
  rect(500, 200, 110, 400 - co2);
  // Set title Co2
  fill(0);
  textSize(50);
  text("CO2", 500, 100);
  // Set ppm's
  fill(0);
  textSize(40);
  text(co2 + "ppm", 500, 670);
  // draw small horizontal lines at the left of the meter each 100ppm 0-400
  for (var i = 0; i < 5; i++) {
    line(500, 600 - i * 100, 510, 600 - i * 100);
  }
  // draw thinner small horizontal lines at the left of the meter each 25ppm 0-400
  for (var i = 0; i < 17; i++) {
    line(500, 600 - i * 25, 505, 600 - i * 25);
  }
  // draw small text with amounts of text at the left of the meter each 100ppm 0-400
  textSize(15);
  for (var i = 0; i < 5; i++) {
    text(i * 100, 450, 605 - i * 100);
  }

  // --------------- Humidity, drop form ----------------

  // Draw a humidity meter in % with light blue meter with range 0-100% and drop form
  
  // light blue meter
  fill(0, 0, 255);
  rect(750, 200, 110, 400);
  // dark blue meter
  fill(200);
  rect(750, 200, 110, 400 - humedad * 4);
  // Set title Humidity
  fill(0);
  textSize(50);
  text("Humedad", 700, 100);
  // Set %
  fill(0);
  textSize(40);
  text(humedad + "%", 750, 670);
  // draw small horizontal lines at the left of the meter each 10% 0-100
  for (var i = 0; i < 11; i++) {
    line(750, 600 - i * 40, 760, 600 - i * 40);
  }
  // draw thinner small horizontal lines at the left of the meter each 5% 0-100
  for (var i = 0; i < 21; i++) {
    line(750, 600 - i * 20, 755, 600 - i * 20);
  }
  // draw small text with amounts of text at the left of the meter each 10% 0-100
  textSize(15);
  for (var i = 0; i < 11; i++) {
    text(i * 10, 700, 605 - i * 40);
  }


// --------------- Light ----------------
// circle form with range 0-100 lumen
  // grey circle
  fill(200);
  circle(1150, 400, 400);
  // light yellow circle
  fill(255, 255, 0);
  circle(1150, 400, luz * 4);
  // Set title Light
  fill(0);
  textSize(50);
  text("Luz", 1100, 100);
  // Set lumen
  fill(0);
  textSize(40);
  text(luz + " lm", 1100, 670);
  // draw small lines to show how much light is in the room 
  for (var i = 0; i < 11; i++) {
    line(1150 + i * 20, 400, 1150 + i * 20, 410);
  }
  // draw small text with amounts of text at the bottom of the circle each 10lm 0-100
  textSize(10);
  for (var i = 0; i < 10; i++) {
    text(i * 10, 1145 + i * 20, 425);
  }  
}

// button to other page
function drawButton() {
  // create button
  var button = createButton('MOSTRAR HISTORIAL');
  button.style('font-size', '30px');
  button.style('background-color', 'white');
  button.style('border-radius', '10px');
  button.style('border-color', 'black');
  button.style('border-width', '2px');
  button.style('padding', '10px');
  button.style('margin', '10px');
  button.position(600, 850);
  button.mousePressed(goToGraphs);
}

function goToGraphs() {
  window.location.href = "index2.html";
}

function updateValues(){
  if (temperatura != temp) {
    if (temp < temperatura){
      temp++;
    } else {
      temp--;
    }
  }
  
  if(humedad != hum){
    if (hum < humedad){
      hum++;
    } else {
      hum--;
    }
  }
  if(luz != light){
    if (light < luz){
      light++;
    } else {
      light--;
    }
  }
  if(co2 != co){
    if (co < co2){
      co++;
    } else {
      co--;
    }
  }
  return
}


