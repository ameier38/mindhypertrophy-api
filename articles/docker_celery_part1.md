## Celery + Docker Part 1: Setting up

### Celery (not the vegetable)
[Celery](http://docs.celeryproject.org/en/latest/getting-started/introduction.html) is a message queue
and worker process framework written in Python that makes it easy to run multi-process functions
or create asynchronous workflows.

### Docker
[Docker](https://www.docker.com/what-docker) is just awesome. More specifically it is a
super convenient way to build, run, and deploy applications. It manages all the networking and 
and configuration that nobody wants to deal with so you can just focus on building your application.

### Celery + Docker
Put them both together and you have any easy way to build an asynchronous worker daemon. The first 
step is to install Docker if you do not have it already, and also a virtual environment system for Python. 
I prefer to use [Miniconda](https://conda.io/miniconda.html). Next create a virtual environment with Python 3.5 installed. 
Using Miniconda, the command is:
```
conda create --name test-celery python=3.5
activate test-celery
conda install ipython
pip install celery[redis]
pip uninstall amqp
pip install -Iv amqp==2.1.3
``` 
> Note I needed to downgrade `amqp` in order for RabbitMQ to work with latest Celery.

Next create a new directory or repository where we will keep all of our configuration files. 
I called mine `test-celery`. The final version will look something like the following:
```
test-celery
  | - Dockerfile
  | - docker-compose.yml
  | - celeryconfig.py
  | - tasks.py
```

### Docker Config
The first configuration file to create is the Dockerfile. The Dockerfile instructs Docker on how to 
build an image. In this case we want to build an image for our Celery worker server. I modified the 
Celery [Dockerfile](https://github.com/docker-library/celery/blob/96de4372507fc4eb147f43b8c4f207da3d95bcd1/4.0/Dockerfile)
as below.
```Dockerfile
# Pull the Python 3.5 image.
FROM python:3.5-slim

# Create the default user.
RUN groupadd user && useradd --create-home --home-dir /home/user -g user user
WORKDIR /home/user

# Specify the version of celery to install.
ENV CELERY_VERSION 4.0.2

# Install celery with the redis backend library.
RUN pip install celery[redis]=="$CELERY_VERSION"

# Specify the broker url. 'broker' will be the name of our RabbitMQ container.
ENV CELERY_BROKER_URL amqp://broker

# Specify the backend url. 'backend' will the be the name of our Redis container.
ENV CELERY_RESULT_BACKEND_URL redis://backend

# Set the user.
USER user

# Specify the command to execute when we run the container.
# -c specifies the number of child processes with which to start the worker.
CMD ["celery", "worker", "-c 10", "--loglevel=INFO"]
```
> Note that there is a difference between `RUN` and `CMD`. `RUN` will actually execute the command
specified during the build process, while `CMD` does not execute at build time but instead
sets the default command for when the container is run.

The next part of the Docker configuration is creating the docker-compose.yml file. This file
specifies all the different services that our app will require, and tells Docker how to link
them all together. The docker-compose.yml should look like the following:
```yaml
version: '2'

services:
  broker:
    image: 'rabbitmq'
    ports:
      - "5672:5672"
  backend:
    image: 'redis'
    ports:
      - "6379:6379"
  celery:
    build: .
    image: 'test-celery'
    volumes:
      - '.:/home/user'
    depends_on: 
      - "broker"
      - "backend"
```
[YAML](http://www.yaml.org/) is a human readable data serialization standard. It is basically JSON written to look
like Python syntax. Docker uses this file to coordinate the running of the different services
required by your application. Breaking it down, the `version: '2'` indicates that the 
docker-compose.yml file follows the second version of the Docker specification. The `services:` section
indicates all the different containers that your app will require. 

The `broker:` section defines our RabbitMQ server which we use for brokering messages between a client 
and the Celery workers. Inside this section, the `image: 'rabbitmq'` specifies that this service will 
pull the `rabbitmq` image from Docker Hub, and the `ports: "5672:5672"` indicates that we will map the 
port `5672` on the host to the port `5672` on the container (this is the default port for RabbitMQ). 
This is important because we will need to connect to the RabbitMQ broker from our local host.

Similar to the RabbitMQ server, the `backend:` section defines our Redis server that we will use
to store the results of our tasks. We also map the default Redis port as we did with the RabbitMQ container.

 The `celery:` section defines our Celery worker server. The `build: .` indicates that the image for 
 this container will be built using the Dockerfile contained in the same directory as the docker-compose.yml
 file. By also specifying `image: "test-celery"`, this tags the image that is built with the 
 name `test-celery`. The `volumes: - '.:/home/user` tells docker to mount the directory where the
 docker-compose.yml file is located onto the container at the location `/home/user`. 
 > You will notice that the mounted volume is the same location that we specified as our working directory 
 in our Dockerfile. This will ensure that when we execute a task from tasks.py, that the worker will execute 
 the same definition of the task.

### Celery Config
Next create a file called `celeryconfig.py`. This specifies the settings for the Celery worker. 
```python
import os

# Specify to auto load the 'tasks.py' module.
imports = ("tasks",)
broker_url = os.getenv('CELERY_BROKER_URL', 'amqp://')
result_backend = os.getenv('CELERY_RESULT_BACKEND_URL', 'redis://')
``` 
The `imports` tells the worker which tasks module to load. The `broker_url` specifies the url for
our RabbitMQ broker server. The `result_backend` specifies the url for our Redis results server.
> Note that `CELERY_BROKER_URL` and `CELERY_RESULT_BACKEND_URL` are specified in the Dockerfile 
which will point to the named RabbitMQ and Redis containers respectively. This is important and really 
great since Docker will manage the network and host names of the different containers for us. We will not 
define these environment variables on our locahost, and so when running a task locally, it will connect 
to the default RabbitMQ and Redis ports, which we exposed in our docker-compose.yml file.

Last let's create the `tasks.py` and define some tasks to run.
```python
import os
import time
from celery import Celery

app = Celery('tasks')

# set backend again separately because of issue with Windows
result_backend = os.getenv('CELERY_RESULT_BACKEND_URL', 'redis://')
app.conf.update(result_backend=result_backend)

@app.task 
def add(x, y):     
    time.sleep(5)
    return x + y

@app.task
def tsum(numbers):
    return sum(numbers)
```

Now that everything is set up, head over to [Part 2](http://mindhypertrophy.com/articles/7)