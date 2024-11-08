const { join } = require('node:path');
const { homedir } = require('node:os');
const {
  getSignerFromKeystore,
  getTestnetRpcProvider,
  functionCall,
} = require('@near-js/client');
const { UnencryptedFileSystemKeyStore } = require('@near-js/keystores-node');

const CONFIG = {
  sender: 'your-account.testnet',
  receiver: 'guestbook.near-examples.testnet',
  method: 'add_message',
  network: 'testnet',
  credentialsPath: join(homedir(), '.near-credentials'),
};

const initNearConnection = () => ({
  rpcProvider: getTestnetRpcProvider(),
  signer: getSignerFromKeystore(
    CONFIG.sender,
    CONFIG.network,
    new UnencryptedFileSystemKeyStore(CONFIG.credentialsPath)
  ),
});

async function addMessage(message) {
  const { rpcProvider, signer } = initNearConnection();

  const result = await functionCall({
    sender: CONFIG.sender,
    receiver: CONFIG.receiver,
    method: CONFIG.method,
    args: { text: message },
    deposit: 1n,
    deps: { rpcProvider, signer },
  });

  console.log('Message added successfully', result);
  console.log('View Transaction -> ' +`https://testnet.nearblocks.io/txns/${result.outcome.transaction.hash}`);
  return result;
}
addMessage('Hey there! Is this thing on?');

// View live result here https://near-examples.github.io/guest-book-examples/
// View transaction here https://testnet.nearblocks.io/<your-account> or <your-transaction-hash>
