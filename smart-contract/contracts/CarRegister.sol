/**
 *Submitted for verification at Etherscan.io on 2021-08-20
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CarRegister {
    mapping(address => string) public UIDs;
    address[] public accounts;

    function addAccount(string memory UID) public returns (bool){
        for (uint i = 0; i < accounts.length; i++) {
            if (msg.sender == accounts[i]) {
                return false;
            }
        }
        accounts.push(msg.sender);
        UIDs[msg.sender] = UID;
        return true;
    }

    function removeAccount() public returns (bool){
        for (uint i = 0; i < accounts.length; i++) {
            if (msg.sender == accounts[i]) {
                delete accounts[i];
                UIDs[msg.sender] = "";
                return true;
            }
        }
        return false;
    }

    function changeUID(string memory UID) public returns (bool){
        for (uint i = 0; i < accounts.length; i++) {
            if (msg.sender == accounts[i]) {
                UIDs[msg.sender] = UID;
                return true;
            }
        }
        return false;
    }

    function getAccounts() public view returns (address[] memory){
        return accounts;
    }

    function getAccount(string memory UID) public view returns (address){
        for(uint i=0;i<accounts.length;i++){
            if (keccak256(bytes(UIDs[accounts[i]])) == keccak256(bytes(UID))) return accounts[i];
        }
        return address(0);
    }
}