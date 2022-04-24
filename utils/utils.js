import { ethers } from "hardhat";

export function parsePrice(item) {
    return ethers.utils.formatUnits(item.price.toString(), 'ether')
}