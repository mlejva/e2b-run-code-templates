
import { Sandbox, ProcessMessage } from 'e2b'

/**
 * This function takes a Python code string, writes it to a file, and runs it in a sandbox.
 * Once the code execution is done, the sandbox is closed and the output is returned.
 * @param code Python code to run
 * @param onStdout Function to call when stdout is received
 * @param onStderr Function to call when stderr is received
 * @returns The process output object
 */
export async function runPython(code: string, onStdout?: (out: ProcessMessage) => void, onStderr?: (out: ProcessMessage) => void) {
  // We're using a custom sandbox that's defined in the `zapier-ts-sandbox` directory.
  console.log('= Starting sandbox (zapier-python-sandbox)...')
  console.time('sandbox-start')
  const sbx = await Sandbox.create('zapier-python-sandbox')
  console.timeEnd('sandbox-start')
  console.log('= ✅ Sandbox started\n')

  // 1. Save code to a file.
  console.log('= Writing code to file...')
  console.time('write-code')
  sbx.filesystem.write('/home/user/main.py', code)
  console.timeEnd('write-code')
  console.log('= ✅ Code written to file\n')

  // 2. Run the code.
  // Or you can use `const process = await sbx.process.start()` and later call `await process.wait()`
  // if you don't want to block the thread.
  console.log('= Running code...')
  console.time('run-code')
  const output = await sbx.process.startAndWait({
    cmd: 'python3 main.py',
    cwd: '/home/user',
    onStderr, // You can pass a function to stream the stderr output.
    onStdout, // You can pass a function to stream the stdout output.
  })
  console.timeEnd('run-code')
  console.log('= ✅ Code executed\n')

  // 3. Close the sandbox once done.
  console.log('= Closing sandbox...')
  console.time('close-sandbox')
  await sbx.close()
  console.timeEnd('close-sandbox')
  console.log('= ✅ Sandbox closed\n')

  return output
}

