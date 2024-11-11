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
  // You can find the ids of prices at https://pyth.network/developers/price-feed-ids
  // NOTE: Remove the '0x' prefix before using them
  'e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43', // BTC/USD price id
  'ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace', // ETH/USD price id
];

async function updatePriceFeeds() {
  const hermes = new HermesClient('https://hermes.pyth.network', {});
  const { rpcProvider, signer } = nearConnect(sender, 'testnet');

  // Latest price updates
  const priceUpdates = (await hermes.getLatestPriceUpdates(priceIds));
  const data = priceUpdates.binary.data.toString();

  const result = await functionCall({
    sender,
    receiver,
    method: 'update_price_feeds',
    args: { data },
    deposit: 100000000000000000000000,
    deps: { rpcProvider, signer },
  });

  console.log(result);
  console.log(`Transaction -> https://testnet.nearblocks.io/txns/${result.outcome.transaction.hash}`);
  return result;
}

updatePriceFeeds();
