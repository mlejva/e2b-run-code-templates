# zapier-ts-sandbox

The `e2b.toml` contains all the configuration for the sandbox.
The `e2b.Dockerfile` contains the Dockerfile that defines the environment of the sandbox. This is how you customize your own sandbox. When you call `e2b template build`, it uses this Dockerfile to convert this Dockerfile to a filesystem for a micro VM.

We used E2B CLI to build a custom sandbox by using a sandbox template. We used the following command (requires running Docker):
```bash
e2b template build -n zapier-ts-sandbox
```

By default, only the person that created the sandbox template can create the sandbox.
