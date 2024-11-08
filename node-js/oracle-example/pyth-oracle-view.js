const { getTestnetRpcProvider, view } = require('@near-js/client');

const BTC_PRICE_ID = 'e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43';

async function getPrice(price_identifier) {
  // initialize testnet RPC provider
  const rpcProvider = getTestnetRpcProvider();

  const result = await view({
    account: 'pyth-oracle.testnet',
    method: 'get_price',
    args: { price_identifier },
    deps: { rpcProvider },
  });

  console.log(result);
}

getPrice(BTC_PRICE_ID);
