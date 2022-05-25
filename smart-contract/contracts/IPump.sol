//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Libraries.sol";

interface IPump{
    function getPrice() external view returns (uint);

    function placeOrder() external returns (uint);

    function beginCharging() external;

    function isOccupied() external view returns (bool);

    function getOrder() external view returns (Accounting.Order memory);
}
