import MyNFTItem from '../components/my_nft_item'
import useMyNFTs from '../view_models/my_nfts_view_model'

export default function MyNFTs() {
    const {
        nfts, loadingState,
        listNFT
    } = useMyNFTs()

    function _buildMyNFTList(nftList) {
        return nftList.map((nft, i) => (
            <MyNFTItem
                key={i}
                nft={nft}
                onClick={() => listNFT(nft)}
            />
        ))
    }

    if (loadingState === 'loaded' && !nfts.length) {
        return (<h1 className="py-10 px-20 text-3xl">No NFTs owned</h1>)
    }

    return (
        <div className="flex justify-center">
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {_buildMyNFTList(nfts)}
                </div>
            </div>
        </div>
    )
}