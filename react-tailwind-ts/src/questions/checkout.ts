import Joi from "joi";
import React from "react"

type CheckoutPageIds = 'address' | 'ccinfo' | 'upsell';

export type CheckoutFieldNames =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'shippingAddress'
  | 'shippingAddress2'
  | 'country'
  | 'state'
  | 'zipcode'
  | 'sameBilling'
  | 'ccNumber'
  | 'ccExp'
  | 'cvv'
  | 'includeCookie'
  | 'billingAddress'
  | 'billingAddress2'
  | 'billingCountry'
  | 'billingState'
  | 'billingZipcode'
export interface Question {
  name: CheckoutFieldNames;
  type: React.HTMLInputTypeAttribute | 'singleCheckbox' | 'select';
  displayLabel?: string;
  options?: { label: string, value: string }[];
  value?: string;
  span2Cols?: boolean
}


export const checkout: Record<CheckoutPageIds, Question[]> = {
  address: [
    {
      name: 'firstName',
      type: 'text',
      displayLabel: 'First Name',
    },
    {
      name: 'lastName',
      type: 'text',
      displayLabel: 'Last Name'
    },
    {
      name: 'email',
      type: 'text',
      displayLabel: 'Email',
      span2Cols: true
    },
    {
      name: 'shippingAddress',
      type: 'text',
      displayLabel: 'Shipping Address',
      span2Cols: true,
    },
    {
      name: 'shippingAddress2',
      type: 'text',
      displayLabel: 'Address 2',
      span2Cols: true,
    },
    {
      name: 'country',
      type: 'select',
      displayLabel: 'Country',
      options: [
        {
          label: 'United States',
          value: 'United States'
        }
      ]
    },
    {
      name: 'state',
      type: 'select',
      displayLabel: 'State',
      options: [
        {
          label: 'North Carolina',
          value: 'NC'
        }
      ]
    },
    {
      name: 'zipcode',
      type: 'number',
      displayLabel: 'Zip'
    },
    {
      name: 'sameBilling',
      type: 'singleCheckbox',
      displayLabel: 'Same Billing',
      value: 'true'
    },
    {
      name: 'billingAddress',
      type: 'text',
      displayLabel: 'Billing Address',
      span2Cols: true,
    },
    {
      name: 'billingAddress2',
      type: 'text',
      displayLabel: 'Address 2',
      span2Cols: true,
    },
    {
      name: 'billingCountry',
      type: 'select',
      displayLabel: 'Country',
      options: [
        {
          label: 'United States',
          value: 'United States'
        }
      ]
    },
    {
      name: 'billingState',
      type: 'select',
      displayLabel: 'State',
      options: [
        {
          label: 'North Carolina',
          value: 'NC'
        }
      ]
    },
    {
      name: 'billingZipcode',
      type: 'number',
      displayLabel: 'Zip'
    },
  ],
  ccinfo: [
    {
      name: 'ccNumber',
      type: 'text',
      displayLabel: 'Card Number',
      span2Cols: true,
    },
    {
      name: 'ccExp',
      type: 'number',
      displayLabel: 'Exp'
    },
    {
      name: 'cvv',
      type: 'number',
      displayLabel: 'CVV'
    }
  ],
  upsell: [
    {
      name: 'includeCookie',
      value: 'true',
      displayLabel: 'Include Cookie',
      type: 'singleCheckbox'
    }
  ]
}

type PageSchema = Record<CheckoutPageIds, Joi.SchemaLike | Joi.SchemaLike[]>
type QuestionSchema = Record<CheckoutFieldNames, Joi.SchemaLike | Joi.SchemaLike[]>

export const validationSchema = Joi.object<PageSchema>({
  address: Joi.object<QuestionSchema>({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ tlds: false }).required(),
    shippingAddress: Joi.string().required(),
    shippingAddress2: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    zipcode: Joi.string().required(),
    sameBilling: Joi.string().equal('true').required(),
    billingAddress: Joi.string().when('sameBilling', {
      is: Joi.string().equal('true'),
      then: Joi.string().required(),
      otherwise: Joi.optional()
    }),
    billingAddress2: Joi.string().when('sameBilling', {
      is: Joi.string().equal('true'),
      then: Joi.string().required(),
      otherwise: Joi.optional()
    }),
    billingCountry: Joi.string().when('sameBilling', {
      is: Joi.string().equal('true'),
      then: Joi.string().required(),
      otherwise: Joi.optional()
    }),
    billingState: Joi.string().when('sameBilling', {
      is: Joi.string().equal('true'),
      then: Joi.string().required(),
      otherwise: Joi.optional()
    }),
    billingZipcode: Joi.string().when('sameBilling', {
      is: Joi.string().equal('true'),
      then: Joi.string().required(),
      otherwise: Joi.optional()
    }),
  }).when('$pageId', {
    is: Joi.string().equal('address'),
    otherwise: Joi.object().optional()
  }),
  ccinfo: Joi.object<QuestionSchema>({
    ccNumber: Joi.string().length(16).required(),
    ccExp: Joi.string().length(4).required(),
    cvv: Joi.string().length(5).required()
  }).when('$pageId', {
    is: Joi.string().equal('ccinfo'),
    otherwise: Joi.object().optional()
  }),
  upsell: Joi.object<QuestionSchema>({
    includeCookie: Joi.string().optional()
  }).when('$pageId', {
    is: Joi.string().equal('upsell'),
    otherwise: Joi.object().optional()
  })
})