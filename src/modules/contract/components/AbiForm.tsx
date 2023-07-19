import { joiResolver } from "@hookform/resolvers/joi"
import { AbiFunction } from "abitype"
import clsx from "clsx"
import Field from "components/core/field"
import getAbiSchema from "helpers/getAbiSchema"
import getContract from "helpers/getContract"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { BsArrowReturnRight } from "react-icons/bs"
import getTransactionUrl from "utils/getTransactionUrl"

interface AbiFormProps {
  abi: AbiFunction
}

export default function AbiForm({ abi }: AbiFormProps) {
  const form = useForm({
    defaultValues: Object.fromEntries(
      abi.inputs.map((input) => [input.name, ""])
    ),
    resolver: joiResolver(getAbiSchema(abi)),
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [transactionUrl, setTransactionUrl] = useState("")

  const handleSubmit = form.handleSubmit(async (data: Record<string, any>) => {
    setIsLoading(true)
    setResult("")
    setError("")
    setTransactionUrl("")
    try {
      const contract = await getContract()
      if (["view", "pure"].includes(abi.stateMutability)) {
        const result = await contract[abi.name](...Object.values(data))
        setResult(String(result))
      } else {
        const result = await contract[abi.name].send(...Object.values(data))
        setTransactionUrl(getTransactionUrl(result.hash))
        setResult("Success")
      }
    } catch (error: any) {
      setError(error?.info?.error?.message || "")
    } finally {
      setIsLoading(false)
    }
  })
  const handleReset = () => {
    form.reset()
    setResult("")
    setError("")
    setTransactionUrl("")
  }

  useEffect(() => {
    if (!abi.inputs.length)
      getContract().then((contract) =>
        contract[abi.name]().then((result) => setResult(String(result)))
      )
  }, [])

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        {abi.inputs.map((input, idx) => (
          <Field
            variant="text"
            name={input.name!}
            label={`${input.name} (${input.type})`}
            key={idx}
          />
        ))}
        {abi.outputs.map((output, idx) => (
          <div className="flex items-center space-x-1" key={idx}>
            <BsArrowReturnRight fontSize="12" />
            {result && <div>{result}</div>}
            <div>
              <span>{output.name}</span>{" "}
              <i className="text-xs text-gray-500">{output.type}</i>
            </div>
          </div>
        ))}
        {}
        {!!abi.inputs.length && (
          <div className="mt-2 flex items-center space-x-1">
            <button className={clsx("btn btn-success btn-sm")}>
              Submit{" "}
              {isLoading && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </button>
            <button className="btn btn-sm" type="button" onClick={handleReset}>
              Reset
            </button>
            {transactionUrl && (
              <a
                href={transactionUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button type="button" className="btn btn-primary btn-sm">
                  View transaction
                </button>
              </a>
            )}
            {error && <div className="text-xs text-red-500">{error}</div>}
          </div>
        )}
      </form>
    </FormProvider>
  )
}
