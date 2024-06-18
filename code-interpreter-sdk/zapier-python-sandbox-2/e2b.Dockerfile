# To create a custom sandbox for the Code Interpreter SDK,
# follow this guide: https://e2b.dev/docs/code-interpreter/template
#
# We're using the base image for Code Interpreter sandbox
FROM e2bdev/code-interpreter:latest

# Install dependencies and customize sandbox
RUN pip install numpy