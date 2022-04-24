const DashboardNFTItem = (nft) => {
    return (
        <div key={i} className="border shadow rounded-xl overflow-hidden">
            <img src={nft.image} className="rounded" />
            <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
            </div>
        </div>
    )
}

DashboardNFTItem.displayName = 'DashboardNFTItem';

export default DashboardNFTItem;