// SPDX-License-Identifier: MIT

import '../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol';

pragma solidity ^0.8.0;


contract BurekTokenSC is ERC20 {
    constructor() ERC20("BUREK", "BUREK"){
        _mint(msg.sender, 2000000e18);
    }
}
