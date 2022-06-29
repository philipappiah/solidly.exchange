import BigNumber from 'bignumber.js'
import * as contractsTestnet from './contractsTestnet'
import * as contracts from './contracts'
import * as actions from './actions'

let isTestnet = process.env.NEXT_PUBLIC_CHAINID == 83

// URLS
let scan = 'https://scan.meter.io/'
let cont = contracts

if(isTestnet) {
  scan = 'https://scan-warringstakes.meter.io/'
  cont = contractsTestnet
}

export const MTRG_LOGO = 'https://raw.githubusercontent.com/meterio/token-list/master/data/MTRG/logo.png'

export const INFO_URL = 'http://metersolidlyinfo.surge.sh'

export const ETHERSCAN_URL = scan

export const CONTRACTS = cont
export const ACTIONS = actions

export const MAX_UINT256 = new BigNumber(2).pow(256).minus(1).toFixed(0)
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const FALLBACK_RPC = 'https://rpctest.meter.io/'
