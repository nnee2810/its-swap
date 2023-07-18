import contractAbi from "abi/contract.json"
import { AbiFunction } from "abitype"
import Collapse from "components/core/Collapse"
import { useMemo } from "react"
import AbiForm from "../components/AbiForm"

export default function WriteContract() {
  const writeFunctions = useMemo(
    () =>
      contractAbi.filter(
        (abi) =>
          abi.type === "function" &&
          !["view", "pure"].includes(abi.stateMutability || "")
      ),
    []
  )

  return (
    <div className="space-y-2">
      {writeFunctions.map((abi, idx) => (
        <Collapse title={`${idx + 1}. ${abi.name}`} key={idx}>
          <AbiForm abi={abi as AbiFunction} />
        </Collapse>
      ))}
    </div>
  )
}
