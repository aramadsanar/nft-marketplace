import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { useRouter } from 'next/router'

import {
    marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import { loaded, notLoaded } from '../locale-keys/loaded_states'
import { parsePrice } from '../utils/utils'

function useMyNFTs() {
    const [nfts, _setNfts] = useState([])
    const [loadingState, _setLoadingState] = useState(notLoaded)
    const router = useRouter()
    useEffect(() => {
        _loadNFTs()
    }, [])

    async function _loadNFTs() {
        const web3Modal = new Web3Modal({
            network: 'mainnet',
            cacheProvider: true
        })

        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const marketplaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        const data = await marketplaceContract.fetchMyNFTs()

        const items = await Promise.all(
            data.map((marketItem, i) => _parseMarketItem(marketplaceContract, marketItem))
        )

        _setNfts(items)
        _setLoadingState(loaded)
    }

    async function _parseMarketItem(contract, marketItem) {
        const tokenURI = await contract.tokenURI(marketItem.tokenId)
        const meta = await axios.get(tokenURI)

        let price = parsePrice(marketItem)
        const buildMarketItemParams = {
            marketItem, meta, price, tokenURI
        }

        return _buildMarketItemDescription(buildMarketItemParams)
    }

    function _buildMarketItemDescription({ marketItem, meta, price, tokenURI }) {
        return {
            price,
            tokenId: marketItem.tokenId.toNumber(),
            seller: marketItem.seller,
            owner: marketItem.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            tokenURI
        }
    }

    function listNFT(nft) {
        router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
    }

    return {
        nfts, loadingState,
        listNFT
    }
}

export default useMyNFTs