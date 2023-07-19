export default function getTransactionUrl(hash: string) {
  return [import.meta.env.VITE_ETHER_SCAN_URL, "tx", hash].join("/")
}
