---
title: Code Article
category: tutorial
date: 2015-01-01
tags: example
author: Robin Andeer
---

[Supervisord][supervisord] is a simple monitoring tool. It consists of a server and an accompanying command line interface to manage and check the status of long running processes.

## Motivations for adding complexity
Adding yet another component should always be weighted against the consequences of adding more complexity. A successful deployment of supervisord will do much of the babysitting involved in server maintenance. But we all know that it's never that easy and a simple Bash script in a crontab will likely take you 90% of the way.

Having said that, here are a few really nice benefits you get from using supervisord:

- A unified interface for starting, stopping, and reloading your processes
- Automatic restarts if your processes go down
- Ability to define startup scripts using intuitive yet powerful ``ini`` files

## Installation
Supervisord is really simple to install:

```sh
$ sudo apt-get install supervisor
# or
$ pip install supervisor
```

> Note that I will assume you will be running supervisord as non-root throughout this tutorial.

## Setup of config file
The first thing we need to do is write a config file where we specify all of our processes to run as well as setup some supervisord settings. This is a minimal example:

```ini
# ~/setup/supervisord.conf
[supervisord]
pidfile = /home/www/logs/supervisord.pid
logfile = /home/www/logs/supervisord.log

[program:flask_server]
command = python app.py
directory = /home/www/flask_server
autostart = true
```

- ``directory`` setting will make sure supervisord cd's to that path before executing the ``command``.
- ``autostart`` will start that process automatically as soon as supervisord is initialized.

### Boilerplate settings
Now there are a few additional settings that I had to include in the config file for the suite to work full out. Right now I'm not entirely sure what everything does - but it does make the whole thing tick.

```ini
[inet_http_server]
port = 127.0.0.1:9001

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

# ...

[supervisorctl]
# use an http:// url to specify an inet socket
serverurli = http://127.0.0.1:9001
```

### Fleshing out the program settings
Let's complete our supervisor config by adding some additional settings to the server to track logs as well as including the MongoDB server which the Flask server communicates with.

> Note here that ``mongod`` handles logging on it's own. This is all defined in the ``mongo.conf`` settings file.

```ini
# ...

[program:mongod]
command = mongod --config /home/www/setup/mongo.conf
autostart = true
autorestart = true

[program:flask_server]
command = python app.py
directory = /home/www/flask_server
autostart = true
autorestart = true
stdout_logfile=/home/www/logs/flask_server.out.log
stderr_logfile=/home/www/logs/flask_server.err.log

# ...
```

By specifying ``autorestart = true`` we can make sure that if the server goes down for any unexpected reason it will be automatically restarted without any manual intervention! This can also be used in other clever ways like killing the server to issue a git pull before supervisord automatically restarts the Flask server again.

> One thing I learned was that supervisord wants you to run *long running processes*. In case of ``mongod``, this means that you shouldn't let is fork the process to run in the background; let supervisord worry about that!

## Usage
Now we only need to start the supervisord server to get everything up and running.

```sh
$ supervisord --config /home/www/setup/supervisord.conf
```

Next up we can manage processes using ``supervisorctl``. We can for example easily check the status of all processes (programs) in the config file.

```sh
$ supervisord --config /home/www/setup/supervisord.conf status
mongod              RUNNING   pid 39188, uptime 23:27:51
flask_server        RUNNING   pid 39237, uptime 23:27:28
```

One thing I really like is how ``supervisorctl`` can be used as a unified interface for starting, restarting, and stopping services which is really easy to define and share with your team.

```sh
$ supervisorctl --config /home/www/setup/supervisord.conf restart flask_server
flask_server: stopped
flask_server: started
```

That's it for my brief introduction to supervisord. I hope it's enough to get you up and running so that you can spend less time worrying and babysitting your servers.

I will continue to improve the supervisord config file as I go a long. Keep an eye out to find out more.

And for reference; the complete config file of course:

```ini
# ~/setup/supervisord.conf
[inet_http_server]
port = 127.0.0.1:9001

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[supervisord]
pidfile = /home/www/logs/supervisord.pid
logfile = /home/www/logs/supervisord.log

[program:mongod]
command = mongod --config /home/www/setup/mongo.conf
autostart = true
autorestart = true

[program:flask_server]
command = python app.py
directory = /home/www/flask_server
autostart = true
autorestart = true
stdout_logfile=/home/www/logs/flask_server.out.log
stderr_logfile=/home/www/logs/flask_server.err.log

[supervisorctl]
# use an http:// url to specify an inet socket
serverurli = http://127.0.0.1:9001
```


[supervisord]: http://supervisord.org/
[uwsgi]: https://uwsgi-docs.readthedocs.org/en/latest/
