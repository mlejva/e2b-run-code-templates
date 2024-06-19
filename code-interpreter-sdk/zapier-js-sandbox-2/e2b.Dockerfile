#                                         #
# Please read README.md in this folder. #
#                                         #
###########################################
FROM python:3.10

ENV JAVA_HOME=/opt/java/openjdk
COPY --from=eclipse-temurin:11-jdk $JAVA_HOME $JAVA_HOME
ENV PATH="${JAVA_HOME}/bin:${PATH}"

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y --no-install-recommends \
  build-essential curl git util-linux jq nodejs npm

ENV PIP_DEFAULT_TIMEOUT=100 \
  PIP_DISABLE_PIP_VERSION_CHECK=1 \
  PIP_NO_CACHE_DIR=1 \
  JUPYTER_CONFIG_PATH="/root/.jupyter" \
  IPYTHON_CONFIG_PATH="/root/.ipython"


COPY ./requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt && ipython kernel install --name "python3" --user
COPY ./jupyter_server_config.py $JUPYTER_CONFIG_PATH/

RUN mkdir -p $IPYTHON_CONFIG_PATH/profile_default
COPY ipython_kernel_config.py $IPYTHON_CONFIG_PATH/profile_default/

COPY ./start-up.sh $JUPYTER_CONFIG_PATH/
RUN chmod +x $JUPYTER_CONFIG_PATH/start-up.sh

# Java Kernel
RUN wget https://github.com/SpencerPark/IJava/releases/download/v1.3.0/ijava-1.3.0.zip && \
    unzip ijava-1.3.0.zip && \
    python install.py --sys-prefix

# Javascript Kernel
RUN npm install -g --unsafe-perm ijavascript
RUN ijsinstall --install=global

# R Kernel
RUN apt-get update && apt-get install -y r-base
RUN R -e "install.packages('IRkernel')"
RUN R -e "IRkernel::installspec(user = FALSE, name = 'r', displayname = 'R')"

# Bash Kernel
RUN pip install bash_kernel
RUN python -m bash_kernel.install

##################################################################################################

# TODO: Install any dependencies and customize sandbox
RUN npm install -g node-fetch