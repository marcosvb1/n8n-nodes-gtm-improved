// This file ensures n8n can find and load your nodes and credentials
const { Gtm } = require('./dist/nodes/GTM/GTM.node.js');

module.exports = {
	nodeTypes: {
		gtm: Gtm,
	},
	credentialTypes: {
		GoogleTagManagerApi: require('./dist/credentials/GoogleTagManagerApi.credentials.js').GoogleTagManagerApi,
	},
};
