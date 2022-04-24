import useCreatorDashboard from '../view_models/dashboard_view_model'
import DashboardNFTItem from '../components/dashboard_nft_item'

export default function CreatorDashboard() {
    const { nfts, loadingState } = useCreatorDashboard()

    function _buildListedNFTList(nftList) {
        return nftList.map((nft, i) => <DashboardNFTItem key={i} nft={nft} />)
    }

    if (loadingState === 'loaded' && !nfts.length) {
        return (<h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>)
    }

    return (
        <div>
            <div className="p-4">
                <h2 className="text-2xl py-2">Items Listed</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {_buildListedNFTList(nfts)}
                </div>
            </div>
        </div>
    )
}