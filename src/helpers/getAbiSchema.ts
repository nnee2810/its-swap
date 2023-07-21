import { AbiFunction } from "abitype"
import { ethers } from "ethers"
import Joi from "joi"

export default function getAbiSchema(func: AbiFunction) {
  return Joi.object(
    Object.fromEntries(
      func.inputs.map((input) => [
        input.name,
        (() => {
          if (input.type.includes("uint")) {
            const size = +input.type.slice(4) || 256
            return Joi.string()
              .required()
              .custom((value, helper) => {
                if (BigInt(value) < 0n || BigInt(value) > BigInt(2 ** size - 1))
                  return helper.error("any.invalid")
                return BigInt(value)
              })
              .messages({
                "any.invalid": "{{#label}} is out of range",
              })
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
          return Joi.string().required()
        })(),
      ])
    )
  )
}
