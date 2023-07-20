import { InjectedConnector } from "@wagmi/core/connectors/injected"
import ReactDOM from "react-dom/client"
import "styles/index.css"
import {
  WagmiConfig,
  configureChains,
  createConfig,
  mainnet,
  sepolia,
} from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { publicProvider } from "wagmi/providers/public"
import App from "./App.tsx"

const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [publicProvider()]
)

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({ chains }),
  ],
  publicClient,
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WagmiConfig config={wagmiConfig}>
    <App />
  </WagmiConfig>
)
