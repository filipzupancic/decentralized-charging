const Gpio = require('onoff').Gpio;
const SerialPort = require("serialport");
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.221.30:8001'));
const ethers = require('ethers');
const fs = require('fs');

let mnemonic = fs.readFileSync("../smart-contract/.secret").toString().trim();
let wallet = ethers.Wallet.fromMnemonic(mnemonic);
//Import account
web3.eth.accounts.wallet.add(wallet.privateKey);
let address = web3.eth.accounts.wallet[0].address;

const Pump = require('../smart-contract/build/contracts/Pump.json');
const PumpAbi = Pump.abi;
const pumpContract = new web3.eth.Contract(PumpAbi, '0x54d7fa385CaadFD8fd95bfa2C8971490fc7B6bC4');

//const PowerStation = require();

let Readline = SerialPort.parsers.Readline;
let readlineParser = new Readline();

let portName = "/dev/ttyS0";


let button = new Gpio(27, 'in', 'both');
let led_red = new Gpio(6, 'out');
let led_green = new Gpio(5, 'out');
let led_blue1 = new Gpio(26, 'out');
let led_blue2 = new Gpio(16, 'out');
let led_blue3 = new Gpio(20, 'out');
let led_blue4 = new Gpio(21, 'out');

function station_available() {
    led_red.writeSync(0);
    led_green.writeSync(1);
}

function station_unavailable() {
    led_red.writeSync(1);
    led_green.writeSync(0);
}

function station_dead() {
    led_red.writeSync(0);
    led_green.writeSync(0);
}

function zero_price() {
    led_blue1.writeSync(0);
    led_blue2.writeSync(0);
    led_blue3.writeSync(0);
    led_blue4.writeSync(0);
}

function low_price() {
    led_blue1.writeSync(1);
    led_blue2.writeSync(0);
    led_blue3.writeSync(0);
    led_blue4.writeSync(0);
}

function medium_low_price() {
    led_blue1.writeSync(1);
    led_blue2.writeSync(1);
    led_blue3.writeSync(0);
    led_blue4.writeSync(0);
}

function medium_high_price() {
    led_blue1.writeSync(1);
    led_blue2.writeSync(1);
    led_blue3.writeSync(1);
    led_blue4.writeSync(0);
}

function high_price() {
    led_blue1.writeSync(1);
    led_blue2.writeSync(1);
    led_blue3.writeSync(1);
    led_blue4.writeSync(1);
}

function button_tracker() {
    button.watch((err, value) => {
        if (err) {
            console.error("There was an error", err);
            return;
        }
        if (value == 1) {
            station_available();
        }
        else {
            station_unavailable();
        }
    });
}


async function read_uid() {
    
}

module.exports = {
    zero_price,
    low_price,
    medium_low_price,
    medium_high_price,
    high_price,
    station_available,
    station_unavailable,
    button_tracker,
    read_uid
}
