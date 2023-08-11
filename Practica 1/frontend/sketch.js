// Declarar variables globales (temperatura, humedad, luz)
var temperatura = 50, humedad = 50, luz = 60, co2 = 220;
let temp = 0, hum = 0 , light = 30, co = 180, lastTime1 = 0, lastTime2 = 0, lastTime3=0;
let bubbles = []
let live;

let angle = 0; // Ángulo para controlar las ondas
let waveAmplitude = 10; // Amplitud de las ondas
let waveFrequency = 0.02;

function setup() {
  // Create full screen canvas
  createCanvas(1680, 1050);
  drawButton();
  drawDashboard();
  live = new liveButton();
}

function gotData(data) {
  if (data.Temperature) {
    temperatura = Math.round(data.Temperature)
  }
  if (data.Lumen) {
    luz = Math.round(data.Lumen)
  }
  if (data.Humidity) {
    humedad = Math.round(data.Humidity)
  }
  if (data.CO2) {
    co2 = Math.round(data.CO2)
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
  if ((millis() - lastTime1) > 2000) {       
    loadJSON('http://127.0.0.1:5000/last', gotData);
    lastTime1 = millis();
  }
  if ((millis() - lastTime2) > 20) {
    updateValues();
    lastTime2 = millis();
    console.log(millis());
  }
  if ((millis() - lastTime3) > 680) {
    live.changeState();
    lastTime3 = millis();
  }
  drawDashboard();
  drawLiveLogo();
  live.display();
}

function drawDashboard(){
// --------------- Thermometer ----------------
  // grosor de la linea
  strokeWeight(4);
  strokeWeight(4);
  //background white with a tone of gray
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
  rect(500, 200, 110, 400 - co);
  // Set title Co2
  fill(0);
  textSize(50);
  text("CO2", 500, 100);
  // Set ppm's
  fill(0);
  textSize(40);
  text(co + "ppm", 500, 670);
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
  rect(750, 200, 110, 400 - hum * 4);
  
  // Dibujar burbujas
  for (let bubble of bubbles) {
    bubble.move();
    bubble.display();
  }

  // Agregar nuevas burbujas con cierta probabilidad
  let probabilidadGeneracion = map(hum, 0, 100, 0, 0.2); // Ajusta 0.1 según tus necesidades
  if (random(1) < probabilidadGeneracion) {
    bubbles.push(new Bubble());
  }

  // Limpiar burbujas fuera de la parte azul del medidor
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].y < (200+(400 - hum * 4)-20)) {
      bubbles.splice(i, 1);
    }
  }

  // Set title Humidity
  fill(0);
  textSize(50);
  text("Humedad", 700, 100);
  // Set %
  fill(0);
  textSize(40);
  text(hum + "%", 750, 670);
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
  strokeWeight(1);
  fill(255, 255, 0);
  circle(1150, 400, light * 4);  
  // Dibujar ondas de luz con líneas
  noFill();
  for (let i = 0; i < 360; i += 10) {
    let x1 = cos(radians(i)) * (light*2.2 + waveAmplitude * sin(angle + i * waveFrequency));
    let y1 = sin(radians(i)) * (light*2.1 + waveAmplitude * sin(angle + i * waveFrequency));
    let x2 = cos(radians(i + 10)) * (light*2.4 + waveAmplitude * sin(angle + (i + 10) * waveFrequency));
    let y2 = sin(radians(i + 10)) * (light*2.5 + waveAmplitude * sin(angle + (i + 10) * waveFrequency));
    line(1150 + x1, 400 + y1, 1150 + x2, 400 + y2);
  }
  // Actualizar el ángulo para la animación de ondas
  angle += 0.1;

  // Set title Light
  fill(0);
  textSize(50);
  text("Luz", 1100, 100);
  // Set lumen
  fill(0);
  textSize(40);
  text(light + " lm", 1100, 670);
  strokeWeight(1);

  // draw small lines to show how much light is in the room 
  for (var i = 0; i < 11; i++) {
    line(1150 + i * 20, 400, 1150 + i * 20, 410);
  }
  // draw small text with amounts of text at the bottom of the circle each 10lm 0-100
  textSize(12);
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
  button.position(600, 950);
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

function drawLiveLogo(){
  // Colocar logo de Live encima del botón de historial, como si estuvieramos transmitiendo en vivo, con un circulo a la izquierda
  // y el texto a la derecha
  textSize(50);
  text("En Vivo", 720, 860);
  noFill();
}





class Bubble {
  constructor() {
    this.x = random(760, 840);
    this.y = 600;
    this.diameter = random(10, 30);
    this.speed = map(hum, 0, 100, 1, 4);
  }

  move() {
    this.y -= this.speed;
  }

  display() {
    fill(255, 150);
    ellipse(this.x, this.y, this.diameter);
  }
}

class liveButton{
  constructor(){
    this.x = 650;
    this.y = 845;
    this.radius = 70;
    this.online = false;
    this.noLive();
  }
  noLive(){
    //black
    fill(0, 0, 0);
    circle(this.x, this.y, this.radius);
  }
  live(){
    fill(255, 0, 0);
    circle(this.x, this.y, this.radius);
  }
  changeState(){
    if (this.online){
      this.online = false;
    } else {
      this.online = true;
    }
  }
  display(){
    if (this.online){
      this.live();
    } else {
      this.noLive();
    }
  }
}