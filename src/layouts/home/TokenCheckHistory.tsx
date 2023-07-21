import { fetchToken, switchNetwork } from "@wagmi/core"
import clsx from "clsx"
import Modal from "components/core/Modal"
import { TokenCheck, getTokenCheckHistory } from "helpers/tokenAddressHistory"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useTokenStore } from "store/token"
import { useNetwork } from "wagmi"

export default function TokenCheckHistory() {
  const { setToken } = useTokenStore()
  const { chain } = useNetwork()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const handleSelectToken = async ({ address, chainId }: TokenCheck) => {
    try {
      if (chain?.id !== chainId)
        await switchNetwork({
          chainId,
        })
      const token = await fetchToken({
        address,
        chainId,
      })
      setToken(token)
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
        {getTokenCheckHistory().map((item) => (
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
