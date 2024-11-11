const axios = require('axios');
// near-js imports
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

async function getData(priceId, publishTime) {
  try {
    // NOTE: For NEAR `testnet` use hermes-beta.pyth.network
    const response = await axios.get(`https://hermes-beta.pyth.network/api/get_vaa?id=${priceId}&publish_time=${publishTime}`);
    // NEAR requires data in hex format
    const base64toHex = Buffer.from(response.data.vaa, "base64").toString("hex");
    return base64toHex;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}
async function updatePriceFeeds() {
  const { rpcProvider, signer } = nearConnect(sender, 'testnet');

  const publishTime = Math.floor(Date.now() / 1000)-1;
  const data = await getData(priceIds[0], publishTime);

  const result = await functionCall({
    sender,
    receiver,
    method: 'update_price_feeds',
    args: { data },
    deposit: 100000000000000000000000,
    deps: { rpcProvider, signer },
  });

  console.log(
    `Transaction -> https://testnet.nearblocks.io/txns/${result.outcome.transaction.hash}`
  );
  return result;
}

updatePriceFeeds();
