const express = require('express');
const cors = require('cors');

const mqtt = require('mqtt');

const pub = mqtt.connect('mqtt://localhost:9000');

const app = express();
const port = 3000;

app.use(cors());

app.post('/data', (req, res) => {
    let response = req.body.data;
    response = response.split(": ");
    // Topic deberia ser 'sec' o 'vent' para poder mover el servo
    topic = data[0];
    dataSend =data[1];
    pub.publish(topic, dataSend);
})


app.listen(port, () => {
    console.log(`listenning to port ${port}`);
});