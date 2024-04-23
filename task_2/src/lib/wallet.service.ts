import type { IWallet, ratesKeys } from "../types/wallet";

export async function getWallet(rate: ratesKeys) {
  const response = await fetch(`https://open.er-api.com/v6/latest/${rate}`);
  const responseBody: IWallet = await response.json();
  return responseBody;
}
