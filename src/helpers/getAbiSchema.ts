import { AbiFunction } from "abitype"
import { ethers } from "ethers"
import Joi from "joi"

export default function getAbiSchema(abi: AbiFunction) {
  return Joi.object(
    Object.fromEntries(
      abi.inputs.map((input) => [
        input.name,
        (() => {
          if (input.type.includes("uint")) {
            const size = +input.type.slice(4) || 256
            return Joi.number()
              .required()
              .min(0)
              .max(2 ** size - 1)
              .unsafe()
          } else if (input.type === "address")
            return Joi.string()
              .required()
              .custom((value, helpers) => {
                if (ethers.isAddress(value)) return value
                return helpers.error("any.invalid")
              })
              .messages({
                "any.invalid": "{{#label}} is not a valid address",
              })
        })(),
      ])
    )
  )
}
