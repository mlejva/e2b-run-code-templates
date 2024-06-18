import'dotenv/config'
import fs from 'fs'
import {
  runJavaScript,
} from './code-interpreter-sdk/js-runner.mts'

// Testing JS code
const jsCode = `
console.log('Hello, world!')
`
console.log('**Running E2B example**')
console.log('- SDK: Code Interpreter SDK')
console.log('- Coderunner: JavaScript')
console.log('***********************\n')

console.log('**Code**\n', jsCode)
console.log('***********************\n')

const executionOutput = await runJavaScript(jsCode)

console.log('**Execution Output**')
console.log('- Stdout:')
console.log(executionOutput.logs.stdout)
console.log('-----')
console.log('- Stderr:')
console.log(executionOutput.logs.stderr)
console.log('-----')
console.log('- Rich results (images, charts, etc):')
console.log(executionOutput.results)

const firstResult = executionOutput.results[0]
if (firstResult.png) {
  fs.writeFileSync('chart.png', firstResult.png, 'base64');
  console.log('\n= 📊 Chart detected and saved to chart.png =')
}

console.log('************************\n')

console.log('\n************************')
console.log('🏁 Example completed')
console.log('************************\n')
