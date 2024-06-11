# This is our base sandbox. It has Python, Nodejs, and npm installed.
FROM e2bdev/base:latest

ENV DEBIAN_FRONTEND=noninteractive

# Install any Python dependencies you might need with pip
RUN pip install numpy

