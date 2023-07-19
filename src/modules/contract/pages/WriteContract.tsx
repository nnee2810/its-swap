import contractAbi from "abi/contract.json"
import { AbiFunction } from "abitype"
import Collapse from "components/core/Collapse"
import { useEffect, useMemo, useRef, useState } from "react"
import AbiForm from "../components/AbiForm"

export default function WriteContract() {
  const [expanded, setExpanded] = useState(false)
  const writeFunctions = useMemo(
    () =>
      contractAbi.filter(
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
      {writeFunctions.map((abi, idx) => (
        <Collapse title={`${idx + 1}. ${abi.name}`} key={idx}>
          <AbiForm abi={abi as AbiFunction} />
        </Collapse>
      ))}
    </div>
  )
}
