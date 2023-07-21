import { AbiFunction } from "abitype"
import Collapse from "components/core/Collapse"
import { useEffect, useMemo, useRef, useState } from "react"
import { erc20ABI } from "wagmi"
import WriteContractForm from "../components/WriteContractForm"

export default function WriteContract() {
  const [expanded, setExpanded] = useState(false)
  const writeFunctions = useMemo(
    () =>
      erc20ABI.filter(
        (abi) =>
          abi.type === "function" &&
          !["view", "pure"].includes(abi.stateMutability || "")
      ),
    []
  )
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current
        .querySelectorAll(".collapse > input[type='checkbox']")
        .forEach((e) => ((e as HTMLInputElement).checked = expanded))
    }
  }, [expanded])

  return (
    <div className="space-y-2" ref={ref}>
      <div className="flex justify-end">
        <button className="btn btn-sm" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Collapse" : "Expand"} All
        </button>
      </div>
      {writeFunctions.map((func, idx) => (
        <Collapse title={`${idx + 1}. ${func.name}`} key={idx}>
          <WriteContractForm func={func as AbiFunction} />
        </Collapse>
      ))}
    </div>
  )
}
