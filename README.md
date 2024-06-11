# How to run TS, JS, and Python code with E2B

This repo showcases how to build a simple code runner using E2B.
It showcases both how to run code in a base sandbox with our [core SDK](https://e2b.dev/docs/sandbox/overview) and also how to run code with our [code interpreter SDK](https://e2b.dev/docs/code-interpreter/installation).

The biggest difference is that the code interpreter SDK is using a sandbox that has a Jupyter server running inside it and all the code is execute in it.

This allows for an easy way to keep the context from previous code execution.
Whereas the core SDK is using our `base` sandbox that has no Jupyter server running inside it and no context from previous code execution is kept by default.

## Getting started
1. Set E2B API key in `.env`. Get your API key [here](https://e2b.dev/docs/getting-started/api-key)
    ```
    E2B_API_KEY=<your-e2b-api-key>
    ```
2. Install dependencies
    ```
    npm install
    ```
3. Run the code with one of the following examples
- ✅ [TypeScript code runner with core SDK](./core-sdk/core-sdk-ts-runner.mts)
  - `npm run core-sdk-ts-runner`
- ✅ [JavaScript code runner with core SDK](./core-sdk/core-sdk-js-runner.mts)
  - `npm run core-sdk-js-runner`
- [TODO] Python code runner with core SDK

- [TODO] TypeScript code runner with code interpreter SDK
- [TODO] JavaScript code runner with code interpreter SDK
- [TODO] Python code runner with code interpreter SDK