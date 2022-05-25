const axios = require('axios');
const fs = require('fs');
let rpi_gpio = require('./rpi_gpio');
const Gpio = require('onoff').Gpio;
const SerialPort = require("serialport");
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.221.30:8001'));
const ethers = require('ethers');

let mnemonic = fs.readFileSync("../smart-contract/.secret").toString().trim();
let wallet = ethers.Wallet.fromMnemonic(mnemonic);
//Import account
web3.eth.accounts.wallet.add(wallet.privateKey);
let address = web3.eth.accounts.wallet[0].address;

const Pump = require('../smart-contract/build/contracts/Pump.json');
const PumpAbi = Pump.abi;
const pumpContract = new web3.eth.Contract(PumpAbi, '0x54d7fa385CaadFD8fd95bfa2C8971490fc7B6bC4');

web3.eth.net.isListening()
    .then(async () => {

        setInterval(async () => {
            let price = await pumpContract.methods.getPrice().call();
            console.log("Price: " + price);

            let isOccupied = await pumpContract.methods.isOccupied().call();
            console.log("Is occupied? " + isOccupied);

            switch (price-1) {
                case 0:
                    rpi_gpio.low_price();
                    break;
                case 1:
                    rpi_gpio.low_price();
                    break;
                case 2: 
                    rpi_gpio.medium_low_price();
                    break;
                case 3:
                    rpi_gpio.medium_high_price();
                    break;
                case 4:
                    rpi_gpio.high_price();
                    break;
                default:
                    rpi_gpio.high_price();
                    break;
            }

            if (isOccupied) {
                rpi_gpio.station_unavailable();
            } else {
                rpi_gpio.station_available();
            }

        }, 5000);
        
    });