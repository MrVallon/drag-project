module.exports = {
  configs: {
    recommended: {
      extends: ['plugin:prettier/recommended', 'prettier/@typescript-eslint'],
      plugins: ['prettier', '@typescript-eslint'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
      },
    },
  },
};
