module.exports = {
	'env': {
		'node': true,
		'es2021': true,
		'browser': true,
		'jest': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 13,
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'require-jsdoc' : [
			'error',
			{
				'require': {
					'FunctionDeclaration': true,
					'MethodDefinition': true,
					'ClassDeclaration': false,
					'ArrowFunctionExpression': true,
					'FunctionExpression': true
				}
			}
		],
		'eol-last': 'error',
		'no-var' : 'error'
	}
};
