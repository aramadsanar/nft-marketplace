/* pages/index.js */
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { loaded, notLoaded } from '../locale-keys/loaded_states'

import {
    marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

function useIndex() {
    const [nfts, _setNfts] = useState([])
    const [loadingState, _setLoadingState] = useState(notLoaded)
    useEffect(() => {
        loadNFTs()
    }, [])


    async function loadNFTs() {
        const provider = new ethers.providers.JsonRpcProvider()
        const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
        const data = await contract.fetchMarketItems()

        const items = await Promise.all(
            data.map((marketItem, i) => _parseMarketItem(contract, marketItem))
        )

        _setNfts(items)
        _setLoadingState(loaded)
    }

    async function _parseMarketItem(contract, marketItem) {
        const tokenURI = await contract.tokenURI(marketItem.tokenId)
        const meta = await axios.get(tokenURI)

        let price = _parsePrice(marketItem)

        return _buildMarketItemDescription(marketItem, meta, price)
    }

    function _buildMarketItemDescription(marketItem, meta, price) {
        return {
            price,
            tokenID: marketItem.tokenId.toNumber(),
            seller: marketItem.seller,
            owner: marketItem.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
        }
    }

    async function buyNFT(nft) {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        console.log(nft)
        console.log(nft.price.toString())
        const price = ethers.utils.parseEther('1')
        const trx = await contract.createMarketSale(nft.tokenId, {
            value: price
        })

        await trx.wait()

        loadNFTs()
    }

    function _parsePrice(item) {
        return ethers.utils.formatUnits(item.price.toString(), 'ether')
    }

    return {
        nfts, loadingState,
        loadNFTs, buyNFT,
    }
}

export default useIndex