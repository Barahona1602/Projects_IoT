const mqtt = require('mqtt');
const topic = "air";

const sub = mqtt.connect("mqtt://localhost:9000");

sub.on("connect", () => {
    sub.subscribe(topic);
})

sub.on("message", (topic, message) => {
    console.log(`topic:${topic} message:${message}`);
})