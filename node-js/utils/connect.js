// node.js imports
const { join } = require('node:path');
const { homedir } = require('node:os');

// near.js imports
const { getTestnetRpcProvider, getSignerFromKeystore } = require('@near-js/client');
const { UnencryptedFileSystemKeyStore } = require('@near-js/keystores-node');

// initialize RPC provider and signer
const nearConnect = (sender, network) => ({
  rpcProvider: getTestnetRpcProvider(),
  signer: getSignerFromKeystore(
    sender, 
    network,
    new UnencryptedFileSystemKeyStore(join(homedir(), '.near-credentials'))
  )
});

module.exports = { nearConnect };
