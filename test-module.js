try {
  const mod = require('./index.js');
  console.log('✅ Module loaded successfully');
  console.log('Available exports:', Object.keys(mod));
  
  const gtm = mod.nodeTypes.gtm;
  console.log('✅ GTM node type loaded');
  console.log('GTM class name:', gtm.name);
  console.log('GTM description exists:', !!gtm.prototype.description);
  
  const credentials = mod.credentialTypes.GoogleTagManagerApi;
  console.log('✅ Credentials loaded');
  console.log('Credentials class name:', credentials.name);
  
  console.log('\n🎉 All tests passed!');
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
}