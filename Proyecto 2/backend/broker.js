const mosca = require("mosca");
const port = 9000;

const broker = new mosca.Server({
    port: port,
});

broker.on("ready", () => {
    console.log(`server mosca connected to port:${port}`)
})

broker.on("clientConnected", (client) => {
    console.log(`MQTT client connected:${client.id}`)
})

broker.on("clientDisconnected", function onClientDisconnected(client) {
    console.log(`MQTT client disconnected:${client.id}`)
})