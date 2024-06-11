import'dotenv/config'
import {
  runJavaScript,
} from './core-sdk/js-runner.mts'

// Testing JS code
const jsCode = `
import fs from 'node:fs'
import fetch from 'node-fetch'

const url = 'https://jsonplaceholder.typicode.com/posts/1';
const filePath = './apiData.txt';
try {
  // Fetch data from the API
  const response = await fetch(url);
  const data = await response.text();

  // Save the data to a file
  fs.writeFileSync(filePath, data, 'utf8');
  console.log(\`Data saved to \${filePath}\`);

  // Read the data back from the file
  const fileData = fs.readFileSync(filePath, 'utf8');
  console.log(\`Data read from \${filePath}:\`, fileData);
} catch (error) {
  console.error('Error:', error);
}`

console.log('**Running E2B example**')
console.log('- SDK: Core SDK')
console.log('- Coderunner: JavaScript')
console.log('************************\n')

console.log('**Code**\n', jsCode)
console.log('************************\n')


const processOutput = await runJavaScript(jsCode)
console.log('**Stdout**\n', processOutput.stdout)
console.log('\n**Stderr**\n', processOutput.stderr)

console.log('\n************************')
console.log('🏁 Example completed')
console.log('************************\n')
