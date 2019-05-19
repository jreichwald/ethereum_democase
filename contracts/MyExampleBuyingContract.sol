pragma solidity ^0.5;

contract MyExampleBuyingContract {

    string productrequest_epc; 
        
    string productdelivery_epc; 
    
    address payable owner;

    address payable seller; 

    uint public bid;

    bool private _accepted_by_owner; 

    constructor(string memory pepc) public {
        owner  = msg.sender; 
        productrequest_epc = pepc; 
        _accepted_by_owner = false;
    }

    function placeBid(uint b) public {
        if (! _accepted_by_owner) {
            if (seller == address(0)) {
                seller = msg.sender; 
                bid = b;
            } else {
                if (b < bid) {
                    seller = msg.sender; 
                    bid = b;
                }
            }
        }
    }

    function accept() public payable {
        if (msg.sender == owner) {
            if (msg.value < bid) {
                revert("Not enough ethers");
            } else {
                _accepted_by_owner = true; 
            }
        } else {
            revert("Only contract owner can call this function.") ;  
        }
    }

    function commissionedProduct(string memory epc) public {
        if (msg.sender == seller) {
            productdelivery_epc = epc;
        } else {
            revert("Only seller can set the commissionedProduct");
        }
    }

    function finalize() public {
        if (msg.sender == owner) {
            seller.transfer(bid);

	    // Uncomment next line to selfdestruct contract and send 
            // remaining Ethers back to the owner.
            // Warning: if contract selfdestructs, it's no longer callable
            // (even not possible to get balances etc.)
            // selfdestruct(owner);
        }
    }

    function getCommissionedProduct() public returns (string memory) {
        return productdelivery_epc;
    }

    function getAccepted() public returns (bool) {
        return _accepted_by_owner;
    }

    function getBid() public returns (uint) {
        return bid;
    }

    function getSeller() public returns (address) {
        return seller;
    }
}

