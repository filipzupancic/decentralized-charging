const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.221.30:8001'));
const ethers = require('ethers');

//Create wallet from mnemonic
const fs = require('fs');
let mnemonic = fs.readFileSync("../.secret").toString().trim();
let wallet = ethers.Wallet.fromMnemonic(mnemonic);
//Import account
web3.eth.accounts.wallet.add(wallet.privateKey);

const addressToken="0x4E30b7D8fAcc57340508bA4bf7c27084Bbaf147d";

web3.eth.net.isListening()
    .then(async () => {
        console.log('Connected to Rinkeby');
        let address=web3.eth.accounts.wallet[0].address
        console.log("Imported account with address: "+ address);

        let contractToken= await new web3.eth.Contract(require('../build/contracts/ToniTokenSC.json').abi,addressToken);
        console.log("Contract token: "+ contractToken._address);
        console.log("Token name: "+ await contractToken.methods.name().call());
        console.log("Token balance at address: " + address +" is: "+await contractToken.methods.balanceOf(address).call());

        console.log("...mining...");
        await contractToken.methods.transfer("0x7a9dc62F68A730055D53616AB820b234AA3DeCF0", web3.utils.toWei("200")).send({from:address,gas:3000000});
        console.log("Token balance at address: " + address +" is: "+await contractToken.methods.balanceOf(address).call());
        console.log("Token balance at address: 0x7a9dc62F68A730055D53616AB820b234AA3DeCF0 is: "+await contractToken.methods.balanceOf("0x7a9dc62F68A730055D53616AB820b234AA3DeCF0").call());
    })