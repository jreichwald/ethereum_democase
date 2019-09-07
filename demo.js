var mqtt = require('mqtt'); 
var client  = mqtt.connect('mqtt://localhost'); 

var Web3 = require('web3');
var web3js = new Web3(Web3.givenProvider || "ws://localhost:7545");

var addr = "0xfEFc516851680DD286416609a59f584050d8F23b"; 
var toAddress = "0x56be85C7b2263D00cDCe2f3c07f09b6ddc65a091";
var amountToSend = 100000000000000000; 

client.on('connect', function () {
  client.subscribe('test', function (err) {
    if (!err) {
    }
  });
  
})

function processTest(message) {
    console.log("Transferring Money..."); 
    var send = web3js.eth.sendTransaction({from:addr,to:toAddress, value:amountToSend});
}

client.on('message', function (topic, message) {
  switch (topic) {
      case "test": 
        processTest(message); 
      break; 
      
  }
})









