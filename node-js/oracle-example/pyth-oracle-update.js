// near.js imports
// https://www.npmjs.com/package/@near-js/client
const axios = require('axios');
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

async function getData(priceId, publishTime) {
  try {
    const response = await axios.get(`https://hermes.pyth.network/api/get_vaa?id=${priceId}&publish_time=${publishTime}`);
    const formattedData = Buffer.from(response.data.vaa, "base64").toString("hex");
    return formattedData;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}
async function updatePriceFeeds() {
  const { rpcProvider, signer } = nearConnect(sender, 'testnet');

  const publishTime = Math.floor(Date.now() / 1000)-1;
  const data = await getData(priceIds[0], publishTime);
  console.log(data)

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
