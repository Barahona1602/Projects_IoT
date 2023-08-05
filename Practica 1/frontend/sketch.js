function setup() {
  createCanvas(400, 400);
  loadJSON('http://127.0.0.1:5000/all', gotData);
  loadJSON('http://127.0.0.1:5000/last', gotData);
}

function gotData(data) {
  console.log(data);
}

function draw() {
  background(100);
}
