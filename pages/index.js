import useIndex from '../view_models/index_view_model'
import { loaded } from '../locale-keys/loaded_states'
import NFTItem
  from '../components/nft_item'
export default function Home() {
  const {
    nfts, loadingState,
    loadNFTs, buyNFT
  } = useIndex()

  function _emptyState() {
    return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
  }

  function _buildNFTList(nfts) {
    return nfts.map(
      (nft, i) => (
        <NFTItem
          key={i}
          nft={nft}
          onClick={() => buyNFT(nft)}
        />
      )
    )
  }

  // if (loadingState === loaded && !nfts.length) {
  //   return _emptyState()
  // }

  // return (
  //   <div className="flex justify-center">
  //     <div className="px-4" style={{ maxWidth: '1600px' }}>
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
  //         {_buildNFTList(nfts)}
  //       </div>
  //     </div>
  //   </div>
  // )

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">{nft.price} ETH</p>
                  <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNFT(nft)}>Buy</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}