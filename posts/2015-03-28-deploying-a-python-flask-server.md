---
title: Deploying a Python Flask server
category: tutorial
author: Robin Andeer
date: 2015-03-28
tags: tutorial, python
---

Recent changes [at work][work] has made it clear that our small team of 3 core developers really need to take charge of how we setup things and deployed across our IT infrastructure. I already know I will learn a lot and an important part in that process is to spread gained knowledge beyond simply myself.

In this light, I'm planning to do a series of articles on deployment of a semi-complex [Flask server][scout] with an accompanying MongoDB database. The contents of this series of posts will evolve over time but for now I'm at least planning to cover:

- Supervisord: babysitting your processes
- Gunicorn/uWSGI: another layer to add speed to your server
- Gulp.js: building and compiling front-end assets
- Vagrant + Ansible: bootstrapping a development environment
- GitHub webhooks: complete deployment automation

I will start with a nifty little utility I just picked up: [supervisord][supervisord].

[scout]: https://github.com/Clinical-Genomics/scout
[supervisord]: http://supervisord.org/
[work]: http://www.scilifelab.se/facilities/clinical-genomics/
