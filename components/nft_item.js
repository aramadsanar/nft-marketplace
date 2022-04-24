const NFTItem = (nft, onClick) => {
    console.log(onClick)
    return (<div className="border shadow rounded-xl overflow-hidden">
        <img src={nft.image} />
        <div className="p-4">
            <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
            <div style={{ height: '70px', overflow: 'hidden' }}>
                <p className="text-gray-400">{nft.description}</p>
            </div>
        </div>
        <div className="p-4 bg-black">
            <p className="text-2xl font-bold text-white">{nft.price} ETH</p>
            <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={onClick}>Buy</button>
        </div>
    </div>)
}

NFTItem.displayName = 'NFTItem';

export default NFTItem;