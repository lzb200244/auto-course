module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "vue-eslint-parser", /* 解析 .vue 文件 */

    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "parser": '@typescript-eslint/parser', // 新增

    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "vue/multi-word-component-names": "off",
    }
}
