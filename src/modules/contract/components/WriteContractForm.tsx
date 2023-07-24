import { joiResolver } from "@hookform/resolvers/joi"
import erc20ABI from "abi/erc20ABI.json"
import { AbiFunction } from "abitype"
import clsx from "clsx"
import Field from "components/core/field"
import getAbiSchema from "helpers/getAbiSchema"
import { FormProvider, useForm } from "react-hook-form"
import { BsArrowReturnRight } from "react-icons/bs"
import { useTokenCheckingStore } from "store/tokenChecking"
import getTransactionUrl from "utils/getTransactionUrl"
import { useContractWrite, useWaitForTransaction } from "wagmi"

interface WriteContractFormProps {
  func: AbiFunction
}

export default function WriteContractForm({ func }: WriteContractFormProps) {
  const token = useTokenCheckingStore()
  const form = useForm({
    defaultValues: Object.fromEntries(
      func.inputs.map((input) => [input.name, ""])
    ),
    resolver: joiResolver(getAbiSchema(func)),
  })
  const {
    write,
    data: writeData,
    isLoading: writeLoading,
    error,
  } = useContractWrite({
    address: token.address,
    abi: erc20ABI,
    functionName: func.name,
  })
  const { data: transactionData, isLoading: transactionLoading } =
    useWaitForTransaction({
      hash: writeData?.hash,
    })

  const handleSubmit = form.handleSubmit((values: Record<string, any>) => {
    write({
      args: Object.values(values),
    })
  })
  const handleReset = () => {
    form.reset()
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        {func.inputs.map((input, idx) => (
          <Field
            variant="text"
            name={input.name!}
            label={`${input.name} (${input.type})`}
            type={input.type.includes("uint") ? "number" : "text"}
            key={idx}
          />
        ))}
        {func?.outputs?.map((output, idx) => (
          <div className="flex items-center space-x-1" key={idx}>
            <BsArrowReturnRight fontSize="12" />
            {transactionData && <div>{transactionData.status}</div>}
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
              {(writeLoading || transactionLoading) && (
                <span className="loading loading-infinity loading-sm"></span>
              )}
            </button>
            <button className="btn btn-sm" type="button" onClick={handleReset}>
              Reset
            </button>

            {writeData && (
              <a
                href={getTransactionUrl(writeData.hash)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button type="button" className="btn btn-primary btn-sm">
                  View transaction
                </button>
              </a>
            )}

            {error && <div className="text-xs text-red-500">{error.name}</div>}
          </div>
        )}
      </form>
    </FormProvider>
  )
}
