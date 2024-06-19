import'dotenv/config'
import {
  runJavaScript,
} from './code-interpreter-sdk/js-runner.mts'

// Testing JS code
// Current shortcomings:
// - no support for `import`
// - no support for top level `await`
const jsCode = `
const fs = require('node:fs');
const fetch = require('node-fetch');

const url = 'https://jsonplaceholder.typicode.com/posts/1';

// Fetch data from the API
fetch(url).then(response => response.text()).then(data => {
  console.log(data);
});`

console.log('**Running E2B example**')
console.log('- SDK: Code Interpreter SDK')
console.log('- Coderunner: JavaScript')
console.log('***********************\n')

console.log('**Code**\n', jsCode)
console.log('***********************\n')

const executionOutput = await runJavaScript(jsCode)

console.log('**Execution Output**')
console.log('- Runtime error:')
console.log(executionOutput.error)
console.log('- Stdout:')
console.log(executionOutput.logs.stdout)
console.log('-----')
console.log('- Stderr:')
console.log(executionOutput.logs.stderr)
console.log('-----')
console.log('- Rich results (images, charts, etc) and the last line interpreted like in Jupyter notebook:')
console.log(executionOutput.results)
console.log('************************\n')

console.log('\n************************')
console.log('🏁 Example completed')
console.log('************************\n')
