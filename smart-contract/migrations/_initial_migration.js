const BurekTokenSC = artifacts.require("BurekTokenSC");

module.exports = function (deployer) {
  deployer.deploy(BurekTokenSC);
};
