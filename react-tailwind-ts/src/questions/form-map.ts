import Joi from "joi";
import { checkout, validation } from "./checkout";

type FormIds = 'checkout'

interface MapConfig {
  questions: Record<string, unknown>
  validation: Joi.ObjectSchema,
  pageIds: Array<string | number>
  defaultValues: Record<string, Record<string, unknown> | undefined>
}

export const formMap: Record<FormIds, MapConfig> = {
  checkout: {
    questions: checkout,
    validation: validation,
    pageIds: ['address', 'ccinfo', 'upsell', 'confirmation'],
    defaultValues: {
      address: {
        sameBilling: true,
      },
    }
  }
}