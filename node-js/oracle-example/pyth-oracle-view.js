// near-js import
// https://www.npmjs.com/package/@near-js/client
const { getTestnetRpcProvider, view } = require('@near-js/client');

const PRICE_IDS = [
  // Price ids can be found at https://www.pyth.network/developers/price-feed-ids#near-testnet
  // NOTE: Ensure you are using NEAR specific price ids & remove the '0x' prefix before using them
  'f9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b', // BTC/USD price id
  'ca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6', // ETH/USD price id
];

async function getPrice(price_ID, symbol) {
  try {
    const rpcProvider = getTestnetRpcProvider();
    const result = await view({
      account: 'pyth-oracle.testnet',
      method: 'get_price',
      args: { price_identifier: price_ID },
      deps: { rpcProvider },
    });
    console.log(symbol, result);
  } catch (error) {
    console.error(`Error fetching ${symbol} price:`, error.message);
  }
}

getPrice(PRICE_IDS[0], 'BTC/USD:');
