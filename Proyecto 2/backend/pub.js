const mqtt = require('mqtt');
const { ReadlineParser, SerialPort } = require("serialport");

const port = new SerialPort({
    path: 'COM2',
    baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

const pub = mqtt.connect("mqtt://locahost:9000");

pub.on("connect", () => {
    parser.on("data", (data) => {
        data = data.toString();
        data = data.split(" ");
        topic = data[0];
        dataSend = data[1];
        pub.publish(topic, dataSend);
    });
});

port.on("open", () => {
    console.log("conexion serial abierta...");
});

port.on("error", (err) => {
    console.log("error en la conexion serial...", err);
});