import'dotenv/config'
import {
  runPython,
} from './core-sdk/python-runner.mts'

// Testing Python code
const pythonCode = `
# The standard way to import NumPy:
import numpy as np

# Create a 2-D array, set every second element in
# some rows and find max per row:

x = np.arange(15, dtype=np.int64).reshape(3, 5)
x[1:, ::2] = -99
print(x)
`

console.log('**Running E2B example**')
console.log('- SDK: Core SDK')
console.log('- Coderunner: Python')
console.log('************************\n')

console.log('**Code**\n', pythonCode)
console.log('************************\n')


const processOutput = await runPython(pythonCode)
console.log('**Stdout**\n', processOutput.stdout)
console.log('\n**Stderr**\n', processOutput.stderr)

console.log('\n************************')
console.log('🏁 Example completed')
console.log('************************\n')
