import { joiResolver } from "@hookform/resolvers/joi"
import { fetchToken } from "@wagmi/core"
import Field from "components/core/field"
import Joi from "joi"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useTokenCheckHistoryStore } from "store/tokenCheckHistory"
import { useTokenCheckingStore } from "store/tokenChecking"
import { isAddress } from "viem"
import { useNetwork } from "wagmi"
import TokenCheckHistory from "./TokenCheckHistory"

interface FormValues {
  tokenAddress: string
}

const formSchema = Joi.object<FormValues, true>({
  tokenAddress: Joi.string()
    .label("Token address")
    .required()
    .custom((value: string, helpers) => {
      if (isAddress(value)) return value
      return helpers.error("any.invalid")
    })
    .messages({
      "any.invalid": "Token address is not valid",
    }),
})

export default function TokenCheckForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      tokenAddress: "",
    },
    resolver: joiResolver(formSchema),
  })
  const navigate = useNavigate()
  const network = useNetwork()
  const tokenCheckingStore = useTokenCheckingStore()
  const tokenCheckHistoryStore = useTokenCheckHistoryStore()
  const [isChecking, setIsChecking] = useState(false)

  const handleSubmit = form.handleSubmit(
    async ({ tokenAddress }: FormValues) => {
      try {
        setIsChecking(true)
        // eslint-disable-next-line no-unused-vars
        const { totalSupply, ...token } = await fetchToken({
          address: tokenAddress as `0x${string}`,
        })
        tokenCheckingStore.setTokenChecking(token)
        if (network.chain)
          tokenCheckHistoryStore.add({
            address: tokenAddress as `0x${string}`,
            name: token.name,
            chainId: network.chain?.id || -1,
            chainName: network.chain?.name || "",
          })
        navigate("/contract/read")
      } catch (error) {
        toast.error("Can't find token, please check token address or network")
      } finally {
        setIsChecking(false)
      }
    }
  )

  return (
    <div className="flex flex-col items-center">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full flex space-x-2"
        >
          <div className="flex-1">
            <Field
              variant="text"
              name="tokenAddress"
              placeholder="Enter your token address 😉"
            />
          </div>
          <button className="btn btn-primary">
            Check{" "}
            {isChecking && <span className="loading loading-infinity"></span>}
          </button>
          <TokenCheckHistory />
        </form>
      </FormProvider>
      {tokenCheckingStore.name && (
        <div className="text-center">
          You're viewing {tokenCheckingStore.name}'s function
        </div>
      )}
    </div>
  )
}
