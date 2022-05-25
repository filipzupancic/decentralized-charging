const axios = require('axios');
const fs = require('fs');
let rpi_gpio = require('./rpi_gpio');
const Gpio = require('onoff').Gpio;
const SerialPort = require("serialport");
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.221.30:8001'));
const ethers = require('ethers');

let stop_address = "";
let mnemonic = fs.readFileSync("../smart-contract/.secret").toString().trim();
let wallet = ethers.Wallet.fromMnemonic(mnemonic);
//Import account
web3.eth.accounts.wallet.add(wallet.privateKey);
let address = web3.eth.accounts.wallet[0].address;

const Pump = require('../smart-contract/build/contracts/Pump.json');
const PumpAbi = Pump.abi;
const pumpContract = new web3.eth.Contract(PumpAbi, '0x64263a4190468757869BdD862200aFe2Dbf823b2');

//const PowerStation = require();

let Readline = SerialPort.parsers.Readline;
let readlineParser = new Readline();

let portName = "/dev/ttyS0";
let currentUID;
//let stations = ['192.168.221.85', '192.168.221.81', '192.168.221.86', '192.168.221.74'];


web3.eth.net.isListening()
    .then(async () => {

        let sp = new SerialPort(portName, {
            baudRate: 9600,
            databits: 8,
            parity: 'none',
            stopBits: 1,
            flowControl: false
        });

        SerialPort.parsers = {
            Readline: require("@serialport/parser-readline"),
        }

        sp.pipe(readlineParser);

        console.log("Waiting for Godot:");

        readlineParser.on("data", async (data) => {
            let vehicleRfid = data.toString("hex");
            console.log("I have read something.");

            vehicleRfid = vehicleRfid.trim();

            let carAddress = await pumpContract.methods.getCarAddress(vehicleRfid).call();

            if (carAddress != "0x0000000000000000000000000000000000000000") {
                rpi_gpio.station_unavailable();
                console.log("The car is here!");

                let currentUID = await pumpContract.methods.currentUID().call();
                if (vehicleRfid != currentUID) {
                    //console.log("We're in boys.");
                    try {
                        await pumpContract.methods.setCurrentUID(vehicleRfid).send({ from: address, gas: 50000 });
                        currentUID = vehicleRfid;
                    } catch {
                        //console.log("Shjet");
                    }
                }
                else {
                    //console.log("UID is already set.");
                    console.log("This is the current ID: " + currentUID);
                }

                car_address = 'http://192.168.220.148' + ':9000/stop?address='+carAddress;
                if (stop_address != car_address) {
                    try {
                        axios
                        .get(car_address).then((response) => {
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.log("Error during /stop");
                            console.log(error);
                        })
                        .then(() => {
                            //console.log('Always executed');
                        })

                        console.log("The stop command was sent.");
                    }
                    catch(e) {
                        //console.log("Unsuccessful stop.")
                        //console.log(e);
                    }
                    stop_address = car_address;
                }
                else {
                    console.log("The stop command has already been sent to this address");
                }

                
            } 
            else {
                console.log("The car is not in the registry!");
            }

        });
    });


/*
function getDistances(url) {
    station_address = 'http://' + url + ':9000/getDistance';

    axios
            .get(station_address).then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(" Error");
                //console.log(error);
            })
            .then(() => {
                //console.log('Always executed');
            })
}

setInterval(() => {
    Promise.all([getDistances(stations[0]), getDistances(stations[1]), getDistances(stations[2]), getDistances(stations[3])])
    .then((results) => {});
}, 5000);
*/
/*setInterval(() => {
    for (i in stations) {
        //console.log(stations[i] + ':9000/getDistance');
        station_address = 'http://' + stations[i] + ':9000/getDistance';
        axios
            .get(station_address).then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(" Error");
                //console.log(error);
            })
            .then(() => {
                //console.log('Always executed');
            })
    }
}, 10000)*/





