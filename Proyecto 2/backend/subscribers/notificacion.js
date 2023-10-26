const mqtt = require('mqtt');
const topic = "notificacion";


const sub = mqtt.connect("mqtt://localhost:9000");

sub.on("connect", () => {
    sub.subscribe(topic);
})

sub.on("message", (topic, message) => {
    window.alert(message);   
})

const title = document.getElementById('title');
const words = ['Proyecto 2 - Grupo 8', 'ACE2 - 2S 2023'];
let wordIndex = 0;

function changeTitle() {
    title.textContent = words[wordIndex];
    wordIndex = (wordIndex + 1) % words.length;
}

setInterval(changeTitle, 2000); // Cambiar el título cada 2 segundos
