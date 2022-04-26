import React from "react"

type CheckoutPageIds = 'address' | 'ccinfo' | 'upsell';

export interface Question {
  name: string;
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
    }
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