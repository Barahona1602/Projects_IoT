const mqtt = require('mqtt');
const topic = "ARQUI2_G8_LED";
const mysql = require("mysql");


const sub = mqtt.connect("mqtt://localhost:9000");


const db = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345",
    database: "pro2_arqui"


})

db.connect((err) => {
    if (err) {
        console.log("error en la conexion a la base de datos", err);
    } else {
        console.log("conexion a la base de datos exitosa");
    }
});



sub.on("connect", () => {
    sub.subscribe(topic);
})

sub.on("message", (topic, message) => {
    console.log(`topic:${topic} message:${message}`);

    db.query("INSERT INTO estado (value) VALUES (?)", [message], (err, result) => {
        if (err) {
            console.log("Error en la inserción de datos", err);
        } else {
            console.log("Inserción de datos exitosa");
        }
    });
    
})