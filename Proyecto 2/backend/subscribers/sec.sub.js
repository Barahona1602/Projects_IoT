const mqtt = require('mqtt');
const { SerialPort } = require('serialport');
const topic = "sec";

const port = new SerialPort({
    path: 'COM3',
    baudRate: 9600,
});

const sub = mqtt.connect("mqtt://localhost:9000");

sub.on("connect", () => {
    sub.subscribe(topic);
})

sub.on("message", (topic, message) => {
    console.log(`topic:${topic} message:${message}`);
    port.write(message, (err) => {
        if (err) {
            console.error('Error al enviarel dato:', err)
        } else {
            console.log(`Dato enviado por puerto serial:${message}`)
        }
    });
});