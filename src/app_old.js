const express = require('express'),
    app = express(),
    cors = require('cors'),
    morgan = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mqtt = require('mqtt'),
    mqttClientTemperature = mqtt.connect('mqtt://192.168.1.250:5600'),
    mqttClientActivity = mqtt.connect('mqtt://192.168.1.250:5600'),
    mqttClientAltitude = mqtt.connect('mqtt://192.168.1.250:5600'),
    mqttClientHumidity = mqtt.connect('mqtt://192.168.1.250:5600'),
    mqttClientRain = mqtt.connect('mqtt://192.168.1.250:5600'),
    mqttClientPression = mqtt.connect('mqtt://192.168.1.250:5600'),
    mqttTopicTemperature = 'houseduino/Temperature',
    mqttTopicActivity = 'houseduino/Activity',
    mqttTopicAltitude = 'houseduino/Altitude',
    mqttTopicHumidity = 'houseduino/Humidity',
    mqttTopicRain = 'houseduino/Rain',
    mqttTopicPression = 'houseduino/Pression',
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var streamInterval;
var msFrequency = 1000;

/* 
Subscribe (listen) to MQTT topic and start publishing
simulated data after successful MQTT connection 
*/
mqttClientTemperature.on('connect', () => {
    mqttClientTemperature.subscribe(mqttTopicTemperature); //subscribe
    //startStreamSimulation();
})
mqttClientActivity.on('connect', () => {
    mqttClientActivity.subscribe(mqttTopicActivity); //subscribe
    //startStreamSimulation();
})
mqttClientAltitude.on('connect', () => {
    mqttClientAltitude.subscribe(mqttTopicAltitude); //subscribe
    //startStreamSimulation();
})
mqttClientHumidity.on('connect', () => {
    mqttClientHumidity.subscribe(mqttTopicHumidity); //subscribe
    //startStreamSimulation();
})
mqttClientRain.on('connect', () => {
    mqttClientRain.subscribe(mqttTopicRain); //subscribe
    //startStreamSimulation();
})
mqttClientPression.on('connect', () => {
    mqttClientPression.subscribe(mqttTopicPression); //subscribe
    //startStreamSimulation();
})

mqttClientTemperature.on('offline', () => {
    mqttClient.unsubscribe(mqttTopicTemperature);
    clearInterval(streamInterval);
})
mqttClientActivity.on('offline', () => {
    mqttClientActivity.unsubscribe(mqttTopicActivity);
    clearInterval(streamInterval);
})
mqttClientAltitude.on('offline', () => {
    mqttClientAltitude.unsubscribe(mqttTopicAltitude);
    clearInterval(streamInterval);
})
mqttClientHumidity.on('offline', () => {
    mqttClientHumidity.unsubscribe(mqttTopicHumidity);
    clearInterval(streamInterval);
})
mqttClientPression.on('offline', () => {
    mqttClientPressionunsubscribe(mqttTopicPression);
    clearInterval(streamInterval);
})
mqttClientRain.on('offline', () => {
    mqttClientRain.unsubscribe(mqttTopicRain);
    clearInterval(streamInterval);
})

/* 
Message event fires, when new messages
arrive on the subscribed topic
*/
mqttClientTemperature.on('message', function (topic, message) {
    var temperature = 0;

    var valore = ['{"temperature":"', message, '"}'].join('');
    io.emit('temperatureData', valore);
})

mqttClientActivity.on('message', function (topic, message) {
    var activity = 0;

    var valore = ['{"activity":"', message, '"}'].join('');
    io.emit('activityData', valore);
})

mqttClientHumidity.on('message', function (topic, message) {
    var humidity = 0;

    var valore = ['{"humidity":"', message, '"}'].join('');
    io.emit('humidityData', valore);
})

mqttClientPression.on('message', function (topic, message) {
    var pression = 0;

    var valore = ['{"pression":"', message, '"}'].join('');
   io.emit('pressionData', valore);
})

mqttClientRain.on('message', function (topic, message) {
    var rain = 0;

    var valore = ['{"rain":"', message, '"}'].join('');
    io.emit('rainData', valore);
})

mqttClientAltitude.on('message', function (topic, message) {
    var altitude = 0;

    var valore = ['{"altitude":"', message, '"}'].join('');
    io.emit('altitudeData', valore);
})
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
