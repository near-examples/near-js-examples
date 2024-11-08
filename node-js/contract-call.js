const { nearConnect } = require('./utils/connect');
const { functionCall } = require('@near-js/client');

// enter your account and the contract you want to call
const sender = 'your-account.testnet';
const receiver = 'guestbook.near-examples.testnet';

async function addMessage(message) {
  // initialize testnet RPC provider and signer
  // see connect.js in utils folder for more details
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
// call the function with a message
addMessage('Hey there! Is this thing on, again?');
