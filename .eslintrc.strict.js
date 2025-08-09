/**
 * Configuração ESLint rigorosa para detectar todas as violações n8n
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
		sourceType: 'module',
		extraFileExtensions: ['.json'],
	},
	ignorePatterns: ['.eslintrc.js', '.eslintrc.strict.js', '**/*.js', '**/node_modules/**'],
	overrides: [
		{
			files: ['package.json'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/community'],
			rules: {
				// Ativar todas as regras que estavam desabilitadas
				'n8n-nodes-base/community-package-json-name-still-default': 'error',
			},
		},
		{
			files: ['./credentials/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/credentials'],
			rules: {
				// Ativar todas as regras que estavam desabilitadas
				'n8n-nodes-base/cred-class-field-documentation-url-missing': 'error',
				'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'error',
			},
		},
		{
			files: ['./nodes/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/nodes'],
			rules: {
				// Ativar todas as regras que estavam desabilitadas
				'n8n-nodes-base/node-execute-block-missing-continue-on-fail': 'error',
				'n8n-nodes-base/node-resource-description-filename-against-convention': 'error',
				'n8n-nodes-base/node-param-fixed-collection-type-unsorted-items': 'error',
				'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'error',
				'n8n-nodes-base/node-class-description-outputs-wrong': 'error',
			},
		},
	],
};