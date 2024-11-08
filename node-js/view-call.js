const { getTestnetRpcProvider, view } = require('@near-js/client');

async function getState() {
  // initialize testnet RPC provider
  const rpcProvider = getTestnetRpcProvider();

  // call view method without parameters
  const result = await view({
    account: 'guestbook.near-examples.testnet',
    method: 'get_messages',
    deps: { rpcProvider },
  });

  console.log(result);
}

getState();
