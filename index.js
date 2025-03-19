// This file ensures n8n can find and load your nodes and credentials
const { Gtm } = require('./dist/nodes/Gtm/Gtm.node.js');

module.exports = {
	nodeTypes: {
		Gtm: Gtm,
	},
	credentialTypes: {
		GoogleTagManagerApi: require('./dist/credentials/GoogleTagManagerApi.credentials.js').GoogleTagManagerApi,
	},
};
