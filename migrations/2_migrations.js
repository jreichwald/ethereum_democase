const MyExampleBuyingContract = artifacts.require("MyExampleBuyingContract");

module.exports = function(deployer) {
  deployer.deploy(MyExampleBuyingContract, 'epc:id:s');
};
