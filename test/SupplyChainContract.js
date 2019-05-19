const MyExampleBuyingContract = artifacts.require("MyExampleBuyingContract"); 
const truffleAssert = require('truffle-assertions');

contract("MyExampleBuyingContract", accounts => {
    let sc; 

    beforeEach("Setup Contract for each test", async () => {
        sc = await MyExampleBuyingContract.deployed()
    })

    it("should receive a bid by a user", async () => {
        await sc.placeBid(web3.utils.toWei('10', 'ether'), {from: accounts[1]});
        assert.equal(await sc.getBid.call(), web3.utils.toWei('10', 'ether'), "Stored bid is not equal to given bid.");
        assert.equal(await sc.getSeller.call(), accounts[1], "Stored bidder address is not equal to real bidder.");
    });

    it("should receive a lower bid by another user", async () => {
        await sc.placeBid(web3.utils.toWei('8', 'ether'), {from: accounts[2]});
        assert.equal(await sc.getBid.call(), web3.utils.toWei('8', 'ether'), "Stored bid is not equal to given bid."); 
        assert.equal(await sc.getSeller.call(), accounts[2], "Stored bidder address is not equal to real bidder.");
    });

    it("should only be accepted by the owner", async () => {
        await truffleAssert.reverts(sc.accept({from: accounts[2]}));
    });

    it("should not be accepted by the owner without sending sufficient amounts of ether", async () => {
        await truffleAssert.reverts(sc.accept({from: accounts[0]})); 
    });     

    it("should be accepted by the owner with sending sufficient ethers", async () => {
        await sc.accept({from: accounts[0], value: web3.utils.toWei('8', 'ether')});
        assert.equal(await sc.getAccepted.call(), true, "Contract is not locked.");  
    });

    it("should accept the product epc number from the seller", async () => {
        let product = "epc:id:DasIstEinTest"; 
        await sc.commissionedProduct(product, {from: accounts[2]}); 
        assert.equal(await sc.getCommissionedProduct.call(), product, "Product delivery was not set correctly");  
    });

    it("should transfer the bid value to the seller and the rest back to the owner.", async () => {
        await sc.finalize();
    });


}); 


