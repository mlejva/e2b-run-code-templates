import'dotenv/config'
import fs from 'fs'
import {
  runPython,
} from './code-interpreter-sdk/python-runner.mts'

// Testing Python code that creates a chart
const pythonCode = `
import numpy as np
import matplotlib.pyplot as plt

# Generate some data
data = np.random.randn(1000)

# Create a histogram of the data
plt.hist(data, bins=30, density=True, alpha=0.6, color='g')

# Add a title and labels
plt.title('Random Data Distribution')
plt.xlabel('Values')
plt.ylabel('Density')

# Show the plot
plt.show()`

console.log('**Running E2B example**')
console.log('- SDK: Code Interpreter SDK')
console.log('- Coderunner: Python')
console.log('***********************\n')

console.log('**Code**\n', pythonCode)
console.log('***********************\n')

const executionOutput = await runPython(pythonCode)

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
