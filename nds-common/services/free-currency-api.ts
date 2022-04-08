import type { AllCurrencies, CurrencyCode, CurrencyReturn, Date, Formats, FromToResp } from "./free-currency-types"
import Axios, { AxiosResponse } from 'axios';

/**
 * Creates a URL to query the Currency API
 * @param date YYYY-MM-DD
 * @param format '.min.js' or '.js'
 * @param from An ISO 4217 currency code
 * @param to An ISO 4217 currency code
 * @returns A formatted url
 */
const createUrl = (date: Date, format: Formats, from?: CurrencyCode, to?: CurrencyCode): string => {
  const args = `${from ?? '/' + from}${to ?? '/' + to}`
  return `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies${args}${format}`
};

/**
 * Lists all currencies available, and their names
 * @param date YYYY-MM-DD. Dates not available before 2020-11-22.
 */
export function getExchangeRate(date: Date): Promise<AxiosResponse<AllCurrencies>>;
/**
 * Get all currencies with a given currency as the base comparison
 * @param date YYYY-MM-DD. Dates not available before 2020-11-22.
 * @param curr An ISO 4217 currency code 
 */
export function getExchangeRate<T extends CurrencyCode>(date: Date, curr: T): Promise<AxiosResponse<CurrencyReturn<T>>>;
/**
 * Get the exchange rate from one currency to another.
 * @param date YYYY-MM-DD. Dates not available before 2020-11-22.
 * @param from An ISO 4217 currency code
 * @param to An ISO 4217 currency code
 */
export function getExchangeRate<T extends CurrencyCode>(date: Date, from: CurrencyCode, to: T): Promise<AxiosResponse<FromToResp<T>>>;
export async function getExchangeRate(date: Date, from?: CurrencyCode, to?: CurrencyCode): Promise<AxiosResponse<{}>> {
  const url = createUrl(date, '.min.js', from, to)

  return Axios.get(url)
    .catch((e) => {
      console.error(e);
      throw e;
    })
}
