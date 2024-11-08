const { getTestnetRpcProvider, view } = require('@near-js/client');

async function getMessages() {
  // initialize testnet RPC provider
  // signer is not necessary as view calls are free
  const rpcProvider = getTestnetRpcProvider();

  const result = await view({
    account: 'guestbook.near-examples.testnet',
    method: 'get_messages', // name of view function in contract
    deps: { rpcProvider },
  });
  console.log(result);
  return result;
}

getMessages();
