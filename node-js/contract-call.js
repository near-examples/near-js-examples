const { nearConnect } = require('./utils/connect');
const { functionCall } = require('@near-js/client');

const sender = 'your-account.testnet';
const receiver = 'guestbook.near-examples.testnet';

async function addMessage(message) {
  const { rpcProvider, signer } = nearConnect(sender, 'testnet');

  return await functionCall({
    sender,
    receiver,
    method: 'add_message',
    args: { text: message },
    deposit: 1n,
    deps: { rpcProvider, signer },
  });
}

addMessage('Hey there! Is this thing on, again?');
