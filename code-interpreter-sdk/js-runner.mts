import { CodeInterpreter, ProcessMessage, Result } from '@e2b/code-interpreter'

/**
 * Run JavasCript code in the Code Interpreter sandbox
 * @param code The code to run
 * @param callbacks Callbacks for the Code Interpreter sandbox (stdout, stderr, results)
 * @returns The execution output
 */
export async function runJavaScript(code: string, callbacks?: {
  onStdout?: (msg: ProcessMessage) => any
  onStderr?: (msg: ProcessMessage) => any
  onResult?: (data: Result) => any
}) {
  // 1. Instantiate the custom Code Interpreter sandbox
  // Read about how to create a custom Code Interpreter sandbox here: https://e2b.dev/docs/code-interpreter/template
  console.log('= Starting Code Interpreter sandbox (zapier-js-sandbox-2)...')
  console.time('code-interpreter-sandbox-start')
  const codeInterpreterSandbox = await CodeInterpreter.create('zapier-js-sandbox-2')
  console.timeEnd('code-interpreter-sandbox-start')
  console.log('= ✅ Code Interpreter sandbox started\n')

  // 2. Run the code in the code interpreter
  // The experimental version of the Code Interpreter SDK
  // supports running other languages than Python (we support JavaScript, R, Java, and Bash at the moment)
  // - Read more here: https://github.com/e2b-dev/code-interpreter/pull/20
  console.log('= Running code in the Code Interpreter...')
  console.time('code-interpreter-run-code')

  const jsID = await codeInterpreterSandbox.notebook.createKernel({ kernelName: 'javascript' })
  const execution = await codeInterpreterSandbox.notebook.execCell(code, {
    onStdout: callbacks?.onStdout,
    onStderr: callbacks?.onStderr,
    onResult: callbacks?.onResult,
    kernelID: jsID
  })
  console.timeEnd('code-interpreter-run-code')
  console.log('= ✅ Code executed in the Code Interpreter\n')

  // The `execution` variable contains:
  // - stdout, stderr
  // - runtime errors
  // - the non stdout results (eg. string output, images, pdf, etc)
  // Read more about it here: https://e2b.dev/docs/code-interpreter/execution

  // 3. Close the Code Interpreter sandbox once done
  console.log('= Closing Code Interpreter sandbox...')
  console.time('code-interpreter-close-sandbox')
  await codeInterpreterSandbox.close()
  console.timeEnd('code-interpreter-close-sandbox')
  console.log('= ✅ Code Interpreter sandbox closed\n')

  return execution
}
