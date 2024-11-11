const { getTestnetRpcProvider, view } = require('@near-js/client');

const BTC_PRICE_ID = 'f9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b';
const ETH_PRICE_ID = 'ca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6';

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

getPrice(BTC_PRICE_ID, 'BTC');
getPrice(ETH_PRICE_ID, 'ETH');
