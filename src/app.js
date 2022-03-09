const { createSocket } = require('dgram');
const { SocketAddress } = require('net');
const MQTT_ADDRESS = "192.168.1.250";
const MQTT_PORT = "5600";
const db = require('./queries')
const express = require('express'),
    app = express(),
    cors = require('cors'),
    morgan = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mqtt = require('mqtt'),
    mqttClientTemperature = createSocketMQTT(MQTT_ADDRESS, MQTT_PORT, 'houseduino/Temperature', 'temperature'),
    mqttClientActivity = createSocketMQTT(MQTT_ADDRESS, MQTT_PORT, 'houseduino/Activity', 'activity'),
    mqttClientAltitude = createSocketMQTT(MQTT_ADDRESS, MQTT_PORT, 'houseduino/Altitude', 'altitude'),
    mqttClientHumidity = createSocketMQTT(MQTT_ADDRESS, MQTT_PORT, 'houseduino/Humidity', 'humidity'),
    mqttClientRain = createSocketMQTT(MQTT_ADDRESS, MQTT_PORT, 'houseduino/Rain', 'rain'),
    mqttClientPression = createSocketMQTT(MQTT_ADDRESS, MQTT_PORT, 'houseduino/Pression', 'pression'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var streamInterval;
var msFrequency = 1000;

function createSocketMQTT(address, port, topic, nomeVariabile) {
    var mqttElement = mqtt.connect(['mqtt://', address, ':', port].join(''));

    mqttElement.on('connect', () => {
        mqttElement.subscribe(topic); //subscribe
        //startStreamSimulation();
    })
    mqttElement.on('offline', () => {
        mqttElement.unsubscribe(topic);
        clearInterval(streamInterval);
    })
    mqttElement.on('message', function (topic, message) {

        var valore = ['{"', nomeVariabile, '":"', message, '"}'].join('');
        //console.log("%s -> %s",nomeVariabile, message);
        io.emit([nomeVariabile, 'Data'].join(''), valore);

        writeData(nomeVariabile, message);
    })
    return mqttElement;
}

function writeData(nomeVariabile, valore) {
    switch (nomeVariabile) {
        case 'temperature':
            db.insertTemperature(valore);
            break;
        case 'activity':
            db.insertActivity();
            break;
        case 'altitude':
            db.insertAltitude(valore);
            break;
        case 'pression':
            db.insertPression(valore);
            break;
        case 'rain':
            db.insertRain(valore);
            break;
        case 'humidity':
            db.insertHumidity(valore);
            break;

    }
}



/* 
Function that publishes simulated data to the MQTT broker every ≈20ms
*/

io.on('connection', (client) => {
    console.log("Socket connected.")
})

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.get('/', function (req, res) {
    res.send(
        [{
            title: "Hi, I'm the express server!",
            description: "Start Moquette and the client application to see the action!"
        }]
    )
});

server.listen(5700, function () {
    console.log('App listening on port 5700!');
});
