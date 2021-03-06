import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

import {
    marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export function useCreateNFT() {
    const [fileUrl, _setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    const router = useRouter()

    async function onChangeImagePath(e) {
        const file = e.target.files[0]
        try {
            const added = await client.add(file, {
                progress: (prog) => console.log(`received: ${prog}`)
            })
            const url = `https://ipfs.infura.io/ipfs/${added.path}`

            _setFileUrl(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    async function _uploadToIPFS() {
        const { name, description, price } = formInput
        if (!name || !description || !price || !fileUrl) {
            return
        }

        const data = JSON.stringify({
            name, description,
            image: fileUrl
        })

        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`

            return url
        }
        catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    async function listNFTForSale() {
        const url = await _uploadToIPFS()
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const price = ethers.utils.parseUnits(formInput.price, 'ether')

        let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)

        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()

        let transaction = await contract.createToken(url, price, {
            value: listingPrice
        })
        await transaction.wait()

        router.push('/')
    }


    return {
        fileUrl, formInput, updateFormInput,
        onChangeImagePath, listNFTForSale
    }
}