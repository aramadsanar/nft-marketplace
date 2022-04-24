import useResellNFT from '../view_models/resell_nft_view_model'

export default function ResellNFT() {
    const {
        image,
        updateFormInput, listNFTForSale
    } = useResellNFT()

    return (
        <div className="flex justify-center">
            <div className="w-1/2 flex flex-col pb-12">
                <input
                    placeholder="Asset Price in Eth"
                    className="mt-2 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                />
                {
                    image && (
                        <img className="rounded mt-4" width="350" src={image} />
                    )
                }
                <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                    List NFT
                </button>
            </div>
        </div>
    )
}