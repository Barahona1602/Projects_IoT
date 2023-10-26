const title = document.getElementById('title');
const words = ['Proyecto 2 - Grupo 8', 'ACE2 - 2S 2023'];
let wordIndex = 0;

function changeTitle() {
    title.textContent = words[wordIndex];
    wordIndex = (wordIndex + 1) % words.length;
}

setInterval(changeTitle, 2000); // Cambiar el título cada 2 segundos


const topic = "ARQUI2_G8_NOTIFICACION";
const clientId = "web-client"; // Identificador de cliente para MQTT
const sub = new Paho.MQTT.Client("localhost", 9000, clientId);

sub.onConnectionLost = onConnectionLost;
sub.onMessageArrived = onMessageArrived;

function onConnect() {
    console.log("Conectado a MQTT");
    sub.subscribe(topic);
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("Conexión perdida: " + responseObject.errorMessage);
        // Reconectar si la conexión se pierde
        setTimeout(function() {
            sub.connect({ onSuccess: onConnect });
        }, 1000); // Reconectar después de 1 segundo
    }
}

function onMessageArrived(message) {
    // Realizar acciones en respuesta a mensajes MQTT
    console.log("Mensaje recibido en el tema " + message.destinationName + ": " + message.payloadString);

    // Mostrar una notificación en una ventana emergente
    window.alert(message.payloadString);
}

// Conectar al MQTT en el inicio
sub.connect({ onSuccess: onConnect });

setInterval(function() {
    sub.subscribe(topic);
}, 1000); // Reconectar después de 1 segundo
