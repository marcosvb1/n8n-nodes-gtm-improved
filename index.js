/* Compatibility index for n8n community node loaders */
try {
  const nodeModule = require('./dist/nodes/GTM/GTM.node.js');
  const credModule = require('./dist/credentials/GoogleTagManagerApi.credentials.js');

  const NodeClass = nodeModule.Gtm || nodeModule.default || Object.values(nodeModule).find((e) => typeof e === 'function');
  const CredClass = credModule.GoogleTagManagerApi || credModule.default || Object.values(credModule).find((e) => typeof e === 'function');

  module.exports = {
    nodes: NodeClass ? [NodeClass] : [],
    credentials: CredClass ? [CredClass] : [],
  };
} catch (e) {
  // Leave empty export if dist not built, publish step will build dist
  module.exports = { nodes: [], credentials: [] };
}

