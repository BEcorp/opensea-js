import BigNumber from 'bignumber.js';
import * as Web3 from 'web3';
import { ECSignature, Order, Web3Callback, OrderJSON, UnhashedOrder, OpenSeaAsset } from './types';
export declare const NULL_BLOCK_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
export declare const feeRecipient = "0x5b3256965e7c3cf26e11fcaf296dfc8807c01073";
export declare const INVERSE_BASIS_POINT = 10000;
export declare const MAX_UINT_256: BigNumber;
export declare const WYVERN_EXCHANGE_ADDRESS_MAINNET = "0x7be8076f4ea4a4ad08075c2508e481d6c946d12b";
export declare const WYVERN_EXCHANGE_ADDRESS_RINKEBY = "0x5206e78b21ce315ce284fb24cf05e0585a93b1d9";
/**
 * Promisify a callback-syntax web3 function
 * @param inner callback function that accepts a Web3 callback function and passes
 * it to the Web3 function
 */
export declare function promisify<T>(inner: (fn: Web3Callback<T>) => void): Promise<T>;
export declare const confirmTransaction: (web3: Web3, txHash: string) => Promise<{}>;
export declare const orderFromJSONv0: (order: any) => Order;
export declare const assetFromJSON: (asset: any, hostUrl: string) => OpenSeaAsset;
export declare const orderFromJSON: (order: any) => Order;
/**
 * Convert an order to JSON, hashing it as well if necessary
 * @param order order (hashed or unhashed)
 */
export declare const orderToJSON: (order: Order | UnhashedOrder) => OrderJSON;
export declare const findAsset: (web3: Web3, { account, proxy, wyAsset, schema }: {
    account: string;
    proxy: string;
    wyAsset: any;
    schema: any;
}) => Promise<"unknown" | "proxy" | "account" | "other">;
/**
 * Sign messages using web3 personal signatures
 * @param web3 Web3 instance
 * @param message message to sign
 * @param signerAddress web3 address signing the message
 */
export declare function personalSignAsync(web3: Web3, message: string, signerAddress: string): Promise<ECSignature>;
/**
 * Special fixes for making BigNumbers using web3 results
 * @param arg An arg or the result of a web3 call to turn into a BigNumber
 */
export declare function makeBigNumber(arg: number | string): BigNumber;
/**
 * Send a transaction to the blockchain and optionally confirm it
 * @param web3 Web3 instance
 * @param fromAddress address sending transaction
 * @param toAddress destination contract address
 * @param data data to send to contract
 * @param gasPrice gas price to use. If unspecified, uses web3 default (mean gas price)
 * @param value value in ETH to send with data. Defaults to 0
 * @param awaitConfirmation whether we should wait for blockchain to confirm. Defaults to false
 */
export declare function sendRawTransaction(web3: Web3, { fromAddress, toAddress, data, gasPrice, value, awaitConfirmation }: {
    fromAddress: string;
    toAddress: string;
    data: any;
    gasPrice?: number | BigNumber;
    value?: number | BigNumber;
    awaitConfirmation?: boolean;
}): Promise<string>;
/**
 * Estimate Gas usage for a transaction
 * @param web3 Web3 instance
 * @param fromAddress address sending transaction
 * @param toAddress destination contract address
 * @param data data to send to contract
 * @param value value in ETH to send with data
 */
export declare function estimateGas(web3: Web3, { fromAddress, toAddress, data, value }: {
    fromAddress?: string;
    toAddress?: string;
    data?: any;
    value?: number | BigNumber;
}): Promise<number>;
/**
 * Get mean gas price for sending a txn, in wei
 * @param web3 Web3 instance
 */
export declare function getCurrentGasPrice(web3: Web3): Promise<BigNumber>;
/**
 * Estimates the price of an order
 * @param order The order to estimate price on
 * @param secondsToBacktrack The number of seconds to subtract on current time,
 *  to fix race conditions
 * @param shouldRoundUp Whether to round up fractional wei
 */
export declare function estimateCurrentPrice(order: Order, secondsToBacktrack?: number, shouldRoundUp?: boolean): BigNumber;
/**
 * Get the Wyvern representation of an asset
 * @param schema The WyvernSchema needed to access this asset
 * @param tokenId The token's id
 * @param tokenAddress The address of the token's contract
 */
export declare function getWyvernAsset(schema: any, tokenId: string, tokenAddress: string): any;
/**
 * Get the non-prefixed hash for the order
 * (Fixes a Wyvern typescript issue)
 * @param order order to hash
 */
export declare function getOrderHash(order: UnhashedOrder): string;
