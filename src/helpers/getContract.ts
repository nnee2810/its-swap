import contractAbi from "abi/contract.json"
import { ethers } from "ethers"
import getProvider from "./getProvider"

export default async function getContract() {
  const provider = getProvider()
  const signer = await provider.getSigner()
  return new ethers.Contract(
    import.meta.env.VITE_CONTRACT_ADDRESS,
    contractAbi,
    signer
  )
}
