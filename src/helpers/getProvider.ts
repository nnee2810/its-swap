import { ethers } from "ethers"

export default function getProvider() {
  return new ethers.BrowserProvider(window.ethereum)
}
