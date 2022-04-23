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
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState(notLoaded)
    useEffect(() => {
        loadNFTs()
    }, [])


    async function loadNFTs() {
        const provider = new ethers.providers.JsonRpcProvider()
        const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
        const data = await contract.fetchMarketItems()

        const items = await Promise.all(
            marketItems.map(_parseMarketItem)
        )

        setNfts(items)
        setLoadingState(loaded)
    }

    async function _parseMarketItem(marketItem) {
        const tokenURI = await contract.tokenURI(marketItem.tokenID)
        const meta = await axios.get(tokenUri)

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

        const price = _parsePrice(nft)
        const trx = await contract.createMarketSale(nft.tokenId, {
            value: price
        })

        await trx.wait()

        loadNFTs()
    }

    function _parsePrice(item) {
        return item.utils.formatUnits(marketItem.price.toString(), 'ether')
    }

    return {
        nfts, loadingState,
        loadNFTs, buyNFT,
    }
}

export default useIndex