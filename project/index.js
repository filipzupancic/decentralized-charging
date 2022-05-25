const express = require('express');
const app = express();

app.get('/getStatus', (req, res) => {
    res.send('This is status');
    console.log("This is status.");
});

app.listen(9000, () => {
    console.log('Test server listening on port 9000!');
});


/*const express = require('express');
const app = express();
const Gpio = require('onoff').Gpio;
const SerialPort = require("serialport");

let Readline = SerialPort.parsers.Readline;
let readlineParser = new Readline();

let rpi_gpio = require('./rpi_gpio');

app.get('/', (req, res) => {
    res.send('This is a simple iot-blockchain server! \r\n' +
        'Endpoints: \r\n' +
        'getDistance');
});

app.get('/getDistance', (req, res) => {
    //console.log(sender_ip[sender_ip.length-1]);
    //names = ['E1', 'E2', 'E3', 'E4'];
    let sender_ip_arr = req.ip.split(':');
    let sender_ip = sender_ip_arr[sender_ip_arr.length-1];
    let stations = ['192.168.221.85', '192.168.221.81', '192.168.221.86', '192.168.221.74'];
    if (stations.includes(sender_ip)) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(
            { 'name': 'E4', 'distance': Math.floor((Math.random() * 100) +1)},
        ));
    }
    else {
        res.send("Wrong IP address");
    }
});

app.get('/getStationInfo', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
        { 'name': 'E4', available: true, price: Math.floor((Math.random() * 100) +1)}
    ));
});

app.get('/turn-off', (req, res) => {
    rpi_gpio.zero_price();
});

app.get('/turn-on', (req, res) => {
    rpi_gpio.high_price();
});

app.get('/button-tracker', (res, req) => {
    rpi_gpio.button_tracker();
});


app.get('/read-uid', (res, req) => {
    rpi_gpio.read_uid();
});

app.listen(9000, () => {
    console.log('App iot-blockchain listening on port 9000!');

    rpi_gpio.read_uid();

});*/