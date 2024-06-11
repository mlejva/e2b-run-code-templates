# This is our base sandbox. It has Python, Nodejs, and npm installed.
FROM e2bdev/base:latest

ENV DEBIAN_FRONTEND=noninteractive

# /home/user is the home directory for the default user called `user`
WORKDIR /home/user

RUN npm init -es6 -y

# Install any additional NPM dependencies you might need
RUN npm i node-fetch
