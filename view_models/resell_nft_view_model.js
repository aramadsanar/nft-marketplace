import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
    marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'


function useResellNFT() {
    const [formInput, updateFormInput] = useState({ price: '', image: '' })
    const router = useRouter()
    const { id, tokenURI } = router.query
    const { image, price } = formInput

    useEffect(() => {
        fetchNFT()
    }, [id])

    async function fetchNFT() {
        if (!tokenURI) return
        const meta = await axios.get(tokenURI)
        updateFormInput(state => ({ ...state, image: meta.data.image }))
    }

    async function listNFTForSale() {
        if (!price) return

        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const priceFormatted = ethers.utils.parseUnits(formInput.price, 'ether')
        let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        let listingPrice = await contract.getListingPrice()

        listingPrice = listingPrice.toString()

        let transaction = await contract.resellToken(id, priceFormatted, { value: listingPrice })
        await transaction.wait()

        router.push('/')
    }

    return {
        image, formInput,
        updateFormInput, listNFTForSale
    }
}

export default useResellNFT