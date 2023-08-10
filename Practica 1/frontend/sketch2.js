let img1, img2, img3, img4;
function setup() {
    // Create full screen canvas
    createCanvas(1680, 1050);
    background(220);
    drawButton(); 
    drawImages();   
}

function preload() {
    // load 4 png images
    img1 = loadImage('CO2.png');
    img2 = loadImage('Humidity.png');
    img3 = loadImage('Lumen.png');
    img4 = loadImage('Temperature.png');
}

function draw() {
// Execute all code below each 5 seconds with millis()
    let currentMillis = millis();
    drawImages();
    if(currentMillis > 15000){
    // show 4 graphs of png images
    loadJSON('http://localhost:5000/graph', console.log(gotData));
    drawImages();
    currentMillis = 0;
    preload();
    }
}

function drawButton() {
    // create button
    var button = createButton('MOSTRAR DASHBOARD');
    button.style('font-size', '30px');
    button.style('background-color', 'white');
    button.style('border-radius', '10px');
    button.style('border-color', 'black');
    button.style('border-width', '2px');
    button.style('padding', '10px');
    button.style('margin', '10px');
    button.position(550, 950);
    button.mousePressed(gotoDashboard);
}

function gotoDashboard() {
    window.location.href = "index.html";
}

function drawImages(){
    // Colocar las 4 imagenes centradas en la pantalla 2x2
    image(img1, 100, 20, 625, 450);
    image(img2, 100, 480, 625, 450);
    image(img3, 750, 20, 625, 450);
    image(img4, 750, 480, 625, 450);
}

function gotData(data) {
    console.log(data);
}
