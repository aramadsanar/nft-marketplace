import { ethers } from "ethers";

export function parsePrice(item) {
    return ethers.utils.formatUnits(item.price.toString(), 'ether')
}