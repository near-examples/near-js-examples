// Hermes API client SDK by Pyth
// https://www.npmjs.com/package/@pythnetwork/hermes-client
const { HermesClient } = require('@pythnetwork/hermes-client');

// near.js imports
// https://www.npmjs.com/package/@near-js/client
const { nearConnect } = require('../utils/connect');
const { functionCall } = require('@near-js/client');

const sender = 'your-account.testnet';
const receiver = 'pyth-oracle.testnet';

const priceIds = [
  // You can find the ids of prices at https://www.pyth.network/developers/price-feed-ids#near-testnet
  // NOTE: Ensure you are using NEAR specific price ids & remove the '0x' prefix before using them
  'f9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b', // BTC/USD price id
  'ca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6', // ETH/USD price id
];

async function updatePriceFeeds() {
  const hermes = new HermesClient('https://hermes-beta.pyth.network', {});
  const { rpcProvider, signer } = nearConnect(sender, 'testnet');

  try {
    // Get price updates
    const priceUpdates = await hermes.getLatestPriceUpdates(priceIds);
    const data = priceUpdates.binary.data.toString();
    
    // Make the function call
    const result = await functionCall({
      sender,
      receiver,
      method: 'update_price_feeds',
      args: { data },
      deposit: 100000000000000000000000,
      deps: { rpcProvider, signer },
    });

    console.log(result);
    console.log(
      `Transaction -> https://testnet.nearblocks.io/txns/${result.outcome.transaction.hash}`
    );
    return result;
    
  } catch (error) {
    console.error('Error updating price feeds:', error);
    throw error; // Re-throw the error for proper error handling
  }
}

updatePriceFeeds();
