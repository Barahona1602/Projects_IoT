const express = require('express');
const cors = require('cors');

const mqtt = require('mqtt');

const pub = mqtt.connect('mqtt://localhost:9000');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.text());

app.post('/data', (req, res) => {
    console.log(req.body);
    let response = req.body;
    response = response.split(": ");
    // Topic deberia ser 'sec' o 'vent' para poder mover el servo
    topic = response[0];
    dataSend =response[1];
    pub.publish(topic, dataSend);
    res.send('ok');
})






app.listen(port, () => {
    console.log(`listenning to port ${port}`);
});