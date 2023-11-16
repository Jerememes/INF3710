module.exports = {
  extends: ['../app/eslint-config/.eslintrc.cjs'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.js'],
      },
    ],
  },
};
