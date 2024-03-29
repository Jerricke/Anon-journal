module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'airbnb/hooks',
        'plugin:prettier/recommended',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'react/react-in-jsx-scope ': 0,
        'react/jsx-filename-extension': 0,
        'react/react-in-jsx-scope': 0,
        'no-use-before-define': 0,
        'react/style-prop-object': 0,
        'global-require': 0,
        'import/no-extraneous-dependencies': 0,
        'no-unused-vars': 0,
        'import/prefer-default-export': 0,
        'react-hooks/rules-of-hooks': 0,
        'react/prop-types': 0,
        'react/jsx-no-constructed-context-values': 0,
        'consistent-return': 0,
        'react-hooks/exhaustive-deps': 0,
        'react/no-unstable-nested-components': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/label-has-associated-control': 0,
        'react/no-unescaped-entities': 0,
        'no-shadow': 0,
        'react/jsx-no-bind': 0,
    },
};
