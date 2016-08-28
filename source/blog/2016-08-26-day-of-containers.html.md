---
title: "Day of Containers: 🐮🐮, swarm, and orchestration"
category: reflections
author: Robin Andeer
date: 2016-08-26
tags: reflection, docker, containers, orchestration
---

![Day of Containers intro](/assets/img/day-of-containers-intro.jpg)

> If you are naming your servers, you are doing it wrong. Don't treat your servers as pets! Treat them more like cattle. I'm sorry to say but if one cow gets sick - you kill it for the good of the flock.

This is how we will build systems in the future. You will have a swarm (🐝🐝🐝) of servers that act as a pool of resources to be allocated. How software is installed and where services are run in the cluster won't be your concern. One node can be shut down and replaced with another. One service can easily be scaled up and down to match demand.

Last week, [**Day of Containers**][doc] brought prominent speakers from companies like Cloudbees (Jenkins) and Google to Stockholm to talk about the latest in the World of Docker and containers in general. The main topic was how to orchestrate systems with multiple servers and services using various orchestration tools.

## State of the Docker platform

It's fair to say that containers are here to stay. And containers = Docker. [Andrey Devyatkin][ad-twitter] gave us an up-to-date 101 on the topic. To him, Docker as a core platform is getting close to feature complete. For anyone who isn't already writing Go apps - the universal runtime is in sight 🎉. However, supporting tools are still changing rapidly. This includes the recently reworked [Docker Swarm][swarm] (for orchestration) and the looming deprecation of [Docker Compose][compose] (for development environments) which isn't working with [Docker Swarm][swarm] at the moment.

## Container Orchestration

So the biggest news of the latest Docker release (1.12) is the integration of [Swarm][swarm] with the Docker engine itself. [Docker Swarm][swarm] let's you manage running a bunch of containers (or services) in a cluster of production servers. For people familiar with how Swarm used to work - getting started is apparently _way_ easier now. For the uninitiated, like myself however, it seems just as confusing as setting up Docker on a Mac used to be before [Docker for Mac][dfm] came along.

![Docker Swarm logo](/assets/img/day-of-containers-swarm.png)

Anyways, [Gergo Horanyi][ghoranyi] showed off a _live_ demo of a (needlessly) complicated [voting app][voting-app] to determine if people prefer cats or dogs. It was certainly fun and impressive to see the result running in AWS and get the traffic visualized by just adding a couple of extra container services. Really, the promise of Docker in a nutshell; besides making software super easy to install, they also come pre-configured by experts to work out of the box!

Orchestration tools like [Docker Swarm][swarm], [Kubernetes][kubernetes], and [Mesos/Marathon][marathon] also bundle support for otherwise tricky things like auto scaling, automatic load balancing (sharing traffic across nodes) and service discovery (abstracting away the need to map specific host IPs + ports).

## Speaker highlight: [Kelsey Hightower][kelsey]

The closing talk by Kelsey, an [excellent presenter][kelsey-tetris], was pretty awesome. He discussed the idea that containers are providing us with a **universal runtime**. The host OS will no longer matter very much as to how software is installed or run. Docker provides a way to "install apps without documentation" and removes the horror of compiling software from source in favor of simply executing:

```bash
$ docker pull <name of image>
```

He also talked about the hidden layers (dynamic libraries) of dependencies your software probably relies on. Point is; there's no way you can keep track of these things! You can test it out yourself by running:

```bash
# on Linux
$ ldd <absolute path to binary>
# on Mac
$ otool -L <absolute path to binary>
```

Docker containers is on the other hand completely self-contained and this takes a lot of the complexity out of shipping code. Let the developer build the container ones, check that it works, and then ship it to the host to run!

## Conclusions

The more experience I get building software and designing systems - the more convinced I am to focus on avoiding complexity. It might present itself in the **installation** (as is the case for many bioinformatics tools 😜) or in the **deployment** of a huge and tightly coupled systems with very specific requirements.

Docker makes installing, and just as important _uninstalling_, software very simple. It also makes setting up tools like databases and proxy servers much easier as they come pre-configured to run out of the box. It compels you to build systems of isolated and reusable building blocks that can work in many different situations.

![Day of Containers turd](/assets/img/day-of-containers-fun.jpg)

However, in "solving" the issues above we've shifted complication to orchestrating a system of microservices. I'm honestly not sold yet which solution will result in the least complicated system _overall_. So far I'm leaning towards a middle ground, where microservices are replaced with more competent yet still isolated "apps" - but that's for a different post 😉

------------------

What place do you think containers will have in the future? Please share your thoughts! I'm [@robinander][twitter] on Twitter.

------------------

_I feel compelled to point out that it's 2016 and we don't need to treat cattle... well like "cattle". I hope that we can come up with a more humane analogy for the future of containerized server architecture..._ 😕

<iframe width="560" height="315" src="https://www.youtube.com/embed/4w5zyZ6VRqo?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>


[swarm]: https://docs.docker.com/swarm/overview/
[compose]: https://docs.docker.com/compose/overview/
[doc]: http://www.code-conf.com/doc-sthlm-2016/
[rkt]: https://github.com/coreos/rkt
[ad-twitter]: https://twitter.com/andrey9kin
[dfm]: https://docs.docker.com/docker-for-mac/
[ghoranyi]: https://twitter.com/ghoranyi
[voting-app]: https://github.com/ghoranyi/example-voting-app
[twitter]: https://twitter.com/robinandeer
[kelsey-tetris]: https://www.youtube.com/watch?v=Po_MEdnUVDE
[kelsey]: https://twitter.com/kelseyhightower
[kubernetes]: http://kubernetes.io/
[marathon]: https://mesosphere.github.io/marathon/
