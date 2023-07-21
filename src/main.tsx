import { goerli, mainnet, sepolia } from "@wagmi/core/chains"
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum"
import ReactDOM from "react-dom/client"
import "styles/index.css"
import { WagmiConfig, configureChains, createConfig } from "wagmi"
import App from "./App.tsx"

const { chains, publicClient } = configureChains(
  [mainnet, sepolia, goerli],
  [w3mProvider({ projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID })]
)
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    chains,
  }),
  publicClient,
})
export const ethereumClient = new EthereumClient(wagmiConfig, chains)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WagmiConfig config={wagmiConfig}>
    <App />
  </WagmiConfig>
)
