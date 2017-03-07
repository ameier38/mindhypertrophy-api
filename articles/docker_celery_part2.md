## Celery + Docker Part 2: Running the application

### docker-compose up
Now that we have our application configured, all we need to do to run it is navigate into the directory
with the docker-compose.yml file, and execute `docker-compose up`. Docker will then set up all
the services that we have specified and take care of setting up a network for us. The output should 
look something like the below:
```
[test-celery] C:\repos\test-celery> docker-compose up
Creating network "testcelery_default" with the default driver
Building celery
...
Successfully built 640d8eb291d8
Creating testcelery_broker_1
Creating testcelery_backend_1
Creating testcelery_celery_1
Attaching to testcelery_broker_1, testcelery_backend_1, testcelery_celery_1
```
Then, after a section of set up logs, you should see something like the below which will confirm
that our application is running:
```
...
broker_1   | =INFO REPORT==== 18-Feb-2017::22:12:55 ===
celery_1   | [2017-02-18 22:12:55,096: INFO/MainProcess] Connected to amqp://guest:**@broker:5672//
broker_1   |
broker_1   | =INFO REPORT==== 18-Feb-2017::22:12:55 ===
celery_1   | [2017-02-18 22:12:56,175: INFO/MainProcess] celery@288561fcd8c5 ready.
```
> Note we will usually use `docker-compose up -d` which will tell Docker to run the app in the background.
We did not in this case just so we could see the logs output in real time.

If you open up another shell and enter
```
[test-celery] C:\repos\test-celery > docker exec testcelery_celery_1 celery inspect stats
```
you should see a JSON output of the worker statistics. You can then confirm there are 10 processes running.
```json
...
"pool": {
    "max-concurrency": 10,
    "max-tasks-per-child": "N/A",
    "processes": [
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17
    ],
...
}
```

### Executing Tasks
Once we see that our app is running we can open up another shell and start executing our tasks. 
As an example, we would like to compute the problem
$$
\sum_{i=0}^{9} i + (i + 1)
$$
using our tasks and measure the time. For our base case we will first execute in serial. Enter an 
IPython shell and execute the following:
```python
In [1]: from tasks import add, tsum
In [2]: from celery import group, chord
In [3]: %%time
   ...: value = sum([add(i, i+1) for i in range(10)])
Wall time: 50 s
In [4]: value
Out[4]: 100
```
Since each `add` takes 5 seconds (because of the delay), then we see running 10 of them in serial 
takes 50 seconds. Next let's run in parallel. Enter the following:
```python
In [5]: %%time
   ...: g = group(add.s(i, i+1) for i in range(10))
   ...: value_async_a = sum(g().get())
Wall time: 5.05 s
In [6]: value_async_a
Out[6]: 100
```
A `group` is a Celery primitive that allows us to run our tasks in parallel. The `.s(i, i+1)` instantiates
the task as a Celery signature object which can then be consumed by other primitives. Next let's use
our total sum task `tsum`.
```python
In [7]: %%time
   ...: g = group(add.s(i, i+1) for i in range(10))
   ...: value_async_b = chord(g, tsum.s())().get()
   ...:
Wall time: 5.25 s
In [8]: value_async_b
Out[8]: 100
```
A `chord` is another Celery primitive that acts like a group, but also takes a callback that is executed
after all the tasks in the group have finished. In this case our callback is our `tsum` function which
sums all the results of the tasks.

### Summary
We can see that using Docker and Celery, we can quickly set up a application and workflow to greatly
speed up long running functions, handle function dependencies, and much more. This was just a simple
example taken from the Celery docs, but it should serve as introduction to the power of Docker and Celery.

All of the code described in this post is available on GitHub [here](https://github.com/ameier38/test-celery).