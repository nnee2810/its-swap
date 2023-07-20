import erc20ABI from "abi/erc20ABI.json"
import { AbiFunction } from "abitype"
import Collapse from "components/core/Collapse"
import { useEffect, useMemo, useRef, useState } from "react"
import ReadContractForm from "../components/ReadContractForm"

export default function ReadContract() {
  const [expanded, setExpanded] = useState(false)
  const readFunctions = useMemo(
    () =>
      erc20ABI.filter(
        (func) => func.type === "function" && func.stateMutability === "view"
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
      {readFunctions.map((func, idx) => (
        <Collapse title={`${idx + 1}. ${func.name}`} key={idx}>
          <ReadContractForm func={func as AbiFunction} />
        </Collapse>
      ))}
    </div>
  )
}
