import { fetchToken, switchNetwork } from "@wagmi/core"
import clsx from "clsx"
import Modal from "components/core/Modal"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import {
  TokenCheckHistoryItem,
  useTokenCheckHistoryStore,
} from "store/tokenCheckHistory"
import { useTokenCheckingStore } from "store/tokenChecking"
import { useNetwork } from "wagmi"

export default function TokenCheckHistory() {
  const { setTokenChecking } = useTokenCheckingStore()
  const { history } = useTokenCheckHistoryStore()
  const network = useNetwork()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const handleSelectToken = async ({
    address,
    chainId,
  }: TokenCheckHistoryItem) => {
    try {
      if (network.chain?.id !== chainId)
        await switchNetwork({
          chainId,
        })
      // eslint-disable-next-line no-unused-vars
      const { totalSupply, ...token } = await fetchToken({
        address,
        chainId,
      })
      setTokenChecking(token)
      setVisible(false)
      navigate("/contract/read")
    } catch (error) {
      toast.error("Can't find token")
    }
  }

  return (
    <div>
      <button type="button" className="btn" onClick={() => setVisible(true)}>
        History
      </button>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        name="Token check history"
      >
        {history.map((item) => (
          <div
            className={clsx(
              "mb-1 px-4 py-2 flex justify-between bg-gray-100 rounded-lg transition-all cursor-pointer",
              "hover:bg-gray-200"
            )}
            key={item.address}
            onClick={() => handleSelectToken(item)}
          >
            <div>
              <div className="font-medium">{item.name}</div>
              <div>{item.address}</div>
            </div>
            <div className="font-medium">
              {item.chainId === -1 ? "Unkown chain" : item.chainName}
            </div>
          </div>
        ))}
      </Modal>
    </div>
  )
}
