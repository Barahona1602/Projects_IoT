// Declarar variables globales (temperatura, humedad, luz)
var temperatura = 0;
var humedad = 0;
var luz = 0;

function setup() {
  createCanvas(400, 400);
  loadJSON('http://127.0.0.1:5000/all', gotData);
  loadJSON('http://127.0.0.1:5000/last', gotData);
}

function gotData(data) {
  console.log(data);
}

function draw() {
  //background white with a tone of gray
  background(220); 
  // Draw a thermometer in celsius
  fill(255, 0, 0); // Red
  rect(150, 100, 50, 200);
  fill(200); // Blue  
  rect(150, 100, 50, 200 - (temperatura*4));
  // Set title Thermometer
  fill(0);
  textSize(20);
  text("Termómetro", 120, 50);
  // Set celcius Degress
  fill(0);
  textSize(20);
  text(temperatura + "°C", 160, 330); 
  // Now draw at the left, small horizontal lines of the thermometer
  for (var i = 100; i <= 300; i = i + 20) {
    line(150, i, 160, i);
  }
  // Put the amount of celcius degrees
  textSize(8);
  for (var i = 100; i <= 300; i = i + 20) {
    text((300 - i)/4, 120, i);
  }


  
  
  

}
