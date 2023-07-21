import { isAddress } from "viem"

export interface TokenCheck {
  address: `0x${string}`
  name: string
  chainId: number
  chainName: string
}

export function getTokenCheckHistory(): TokenCheck[] {
  const localStorageData = localStorage.getItem("tokenCheckHistory")
  if (localStorageData) {
    const data = JSON.parse(localStorageData)

    if (
      Array.isArray(data) &&
      data.filter(
        (item) =>
          typeof item === "object" &&
          "name" in item &&
          "address" in item &&
          "chainId" in item &&
          "chainName" in item &&
          typeof item.name === "string" &&
          typeof item.address === "string" &&
          isAddress(item.address) &&
          typeof item.chainId === "number" &&
          typeof item.chainName === "string"
      ).length === data.length
    )
      return data
    else {
      localStorage.removeItem("tokenCheckHistory")
      return []
    }
  }
  return []
}

export function addTokenCheckHistory(token: TokenCheck) {
  const tokenCheckHistory = getTokenCheckHistory()
  const historyIdx = tokenCheckHistory.findIndex(
    (item) => item.address === token.address
  )
  if (historyIdx > -1) tokenCheckHistory.splice(historyIdx, 1)
  if (tokenCheckHistory.unshift(token) > 10) tokenCheckHistory.pop()
  localStorage.setItem("tokenCheckHistory", JSON.stringify(tokenCheckHistory))
}
