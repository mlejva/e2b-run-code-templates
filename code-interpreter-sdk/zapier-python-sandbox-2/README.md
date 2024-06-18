# zapier-python-sandbox-2

The `e2b.toml` contains all the configuration for the sandbox.
The `e2b.Dockerfile` contains the Dockerfile that defines the environment of the sandbox. This is how you customize your own sandbox. When you call `e2b template build`, it uses this Dockerfile to convert this Dockerfile to a filesystem for a micro VM.

We used E2B CLI to build a custom sandbox by using a sandbox template. The Code Interpreter SDK is a little bit special and needs to start the [specific script](https://e2b.dev/docs/code-interpreter/template) to run a Jupyter server inside the sandbox - that's accomplished by passing the `-c` flag to the `e2b template build` command and having the [start-up.sh](./start-up.sh) file in the root of the sandbox.

We used the following command (requires running Docker):
```bash
e2b template build --name zapier-python-sandbox-2 -c "/home/user/.jupyter/start-up.sh"
```
> NOTE: You'll need to name your custom sandbox differently as this name will be already taken.

By default, only the person that created the sandbox template can create the sandbox.
