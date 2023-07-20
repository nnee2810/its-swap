import { joiResolver } from "@hookform/resolvers/joi"
import { readContract } from "@wagmi/core"
import erc20ABI from "abi/erc20ABI.json"
import { AbiFunction } from "abitype"
import clsx from "clsx"
import Field from "components/core/field"
import getAbiSchema from "helpers/getAbiSchema"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { BsArrowReturnRight } from "react-icons/bs"
import { useTokenStore } from "store/token"

interface ReadContractFormProps {
  func: AbiFunction
}

export default function ReadContractForm({ func }: ReadContractFormProps) {
  const { address } = useTokenStore()
  const form = useForm({
    defaultValues: Object.fromEntries(
      func.inputs.map((input) => [input.name, ""])
    ),
    resolver: joiResolver(getAbiSchema(func)),
  })

  const [data, setData] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = form.handleSubmit(
    async (values: Record<string, any>) => {
      try {
        const data = await readContract({
          address: address!,
          abi: erc20ABI,
          functionName: func.name,
          args: Object.values(values),
        })
        setData(data)
      } catch (error) {}
    }
  )
  const handleReset = () => {
    form.reset()
    setData("")
    setError("")
    setIsLoading(false)
  }

  useEffect(() => {}, [args])

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        {func.inputs.map((input, idx) => (
          <Field
            variant="text"
            name={input.name!}
            label={`${input.name} (${input.type})`}
            key={idx}
          />
        ))}
        {func?.outputs?.map((output, idx) => (
          <div className="flex items-center space-x-1" key={idx}>
            <BsArrowReturnRight fontSize="12" />
            {String(data) !== "undefined" && <div>{String(data)}</div>}
            <div>
              <span>{output.name}</span>{" "}
              <i className="text-xs text-gray-500">{output.type}</i>
            </div>
          </div>
        ))}
        {}
        {!!func.inputs.length && (
          <div className="mt-2 flex items-center space-x-1">
            <button className={clsx("btn btn-success btn-sm")}>
              Submit{" "}
              {isLoading && (
                <span className="loading loading-infinity loading-sm"></span>
              )}
            </button>
            <button className="btn btn-sm" type="button" onClick={handleReset}>
              Reset
            </button>
            {/* {transactionUrl && (
              <a
                href={transactionUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button type="button" className="btn btn-primary btn-sm">
                  View transaction
                </button>
              </a>
            )}*/}
            {error && <div className="text-xs text-red-500">{error}</div>}
          </div>
        )}
      </form>
    </FormProvider>
  )
}
