// .eslintrc.js example
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },

    ignorePatterns: ['.eslintrc.js', 'temp.js', '**/vendor/*.js'],
    rules: {
        'no-undef': 'off',
    },
};
