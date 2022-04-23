/* pages/index.js */
import useIndex from '../view_models/index_view_model'
import { loaded } from '../locale-keys/loaded_states'
import NFTItem
  from '../components/nft_item'
export default function Home() {
  const {
    nfts, loadingState,
    loadNFTs, buyNFT
  } = useIndex()

  _emptyState => (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)

  _buildNFTList = (nfts) => nfts.map(
    (nft, i) => (
      <NFTItem
        key={i}
        nft={nft}
        onClick={() => buyNFT(nft)}
      />
    )
  )

  if (loadingState === loaded && !nfts.length) {
    return _emptyState
  }

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {_buildNFTList(nfts)}
        </div>
      </div>
    </div>
  )
}