/* eslint-disable @next/next/no-img-element */

const MyNFTItem = ({ nft, onClick }) => {
    return (
        <div className="border shadow rounded-xl overflow-hidden">
            <img src={nft.image} className="rounded" alt={`Image for nft ${nft.name}`} />
            <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={onClick}>List</button>
            </div>
        </div>
    )
}

MyNFTItem.displayName = 'MyNFTItem';

export default MyNFTItem;