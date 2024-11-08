const { join } = require('node:path');
const { homedir } = require('node:os');
const { getTestnetRpcProvider, getSignerFromKeystore } = require('@near-js/client');
const { UnencryptedFileSystemKeyStore } = require('@near-js/keystores-node');

const nearConnect = (sender, network) => ({
  rpcProvider: getTestnetRpcProvider(),
  signer: getSignerFromKeystore(
    sender, 
    network,
    new UnencryptedFileSystemKeyStore(join(homedir(), '.near-credentials'))
  )
});

module.exports = { nearConnect };
