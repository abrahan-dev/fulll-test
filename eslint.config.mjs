import eslintPluginPrettier from "eslint-plugin-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            ecmaVersion: 2021,
            parser: typescriptParser,
            sourceType: "module",
            globals: {
                console: "readonly",
                module: "readonly",
                process: "readonly",
                require: "readonly",
            },
        },
        plugins: {
            prettier: eslintPluginPrettier,
            "@typescript-eslint": typescriptEslint,
        },
        rules: {
            "no-console": "warn",
            "eqeqeq": "error",
            "curly": "error",
            "prettier/prettier": "error",
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
];