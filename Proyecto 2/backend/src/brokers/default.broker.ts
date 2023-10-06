const mosca = require("mosca");
const port = process.env.PORT || 9000;

class DefaultBroker {
    broker: any;
    constructor(port: number) {
        this.broker = new mosca.Server({
            port
        })
    }

    onReady = () => {
        this.broker.on("ready", () => {
            console.log(`server listenning on port ${this.broker.port}`);
        })
    }

    onClientConnected = () => {
        this.broker.on("clientConnected", (client: any) => {
            console.log(`MQTT client connected: ${client.id}`);
        })
    }

    onClientDisconnected = () => {
        this.broker.on("clientDisconnected", function onClientDisconnected(client: any) {
            console.log(`MQTT client disconnected: ${client.id}`);
        })
    }
}