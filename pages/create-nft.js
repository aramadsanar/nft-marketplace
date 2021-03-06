/* eslint-disable @next/next/no-img-element */
import { useCreateNFT } from '../view_models/create_nft_view_model'

export default function CreateItem() {
    const {
        fileUrl, formInput, updateFormInput,
        onChangeImagePath, listNFTForSale
    } = useCreateNFT()

    return (
        <div className="flex justify-center">
            <div className="w-1/2 flex flex-col pb-12">
                <input
                    placeholder="Asset Name"
                    className="mt-8 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                />
                <textarea
                    placeholder="Asset Description"
                    className="mt-2 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                />
                <input
                    placeholder="Asset Price in Eth"
                    className="mt-2 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                />
                <input
                    type="file"
                    name="Asset"
                    className="my-4"
                    onChange={onChangeImagePath}
                />
                {
                    fileUrl && (
                        <img className="rounded mt-4" width="350" src={fileUrl} alt={`Image for nft ${formInput.name}`} />
                    )
                }
                <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                    Create NFT
                </button>
            </div>
        </div>
    )
}