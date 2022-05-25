const Pump = artifacts.require("Pump");

module.exports = function (deployer) {
  deployer.deploy(Pump, "0xCcE9AdcF262f2145d76f862e3747D13e118B2ecA", "0x7c426d009EF96299c144854673e6A235bd9384b2", "0xaF3bf8523ABe19745D31D03D6DB481031815aD87", 60);
};

