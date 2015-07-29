---
title: "In response: The myths of bioinformatics software"
category: thoughts
author: Robin Andeer
date: 2015-07-18
tags: thought, software development
---

## Overview and response
[Lior Pachter][lior-twitter] recently discussed a [list of myths in bioinformatics software][myths]. The [response][titus-response], as echoed by my colleagues, has been rather critical with a shared frustration as to the fact that Loir seems content with the bleak reality he more or less accurately depicts.

I was quite pleased to read the piece myself. What my views are and why my perspective might be different is what I hope to convey here.

### 1. Somebody will build on your code
It's not controversial to claim that most code is developed to solve very specific problems or that software design and documentation is often lacking in bioinformatics.

I've built a few open source tools and tried to push for collaboration at work. The friction is constant. However, collaboration naturally enforces good practices. What I read from Lior is that you need to think extra hard when you develop on your own. Don't expect others to necessarily come to your rescue.

### 2. You should have assembled a team to build your software
I don't agree that scientific and commercial software development *should be* different. I believe in a future with more pure computer science overlap in bioinformatics. I think moving beyond the single developer to small teams would be a huge improvement on it's own. I actually don't know why it wouldn't be exiting to contribute to an existing academic project of high quality?

### 3. If you choose the right license more people will use and build on your program
I've always licensed my code under public domain or similar without giving it much thought. What I wish for is for the growing number of commercial actors to give back to the open source community by for example paying employees to work on open source software.

### 4. Making your software free for commercial use shows you are not against companies
I think Lior makes a very interesting point that commercial companies can easily cover the costs of licensing software. Whether such licensing would be a hindrance for the success of a project I leave to other's more qualified to argue.

### 5. You should maintain your software indefinitely
Be honest with yourself and your users. There's nothing wrong about being upfront about your intentions to not support your software - this is just a best practice! It shouldn't be up to users to infer if a project is maintained by counting pull requests and GitHub stars.

### 7. You should make your software "idiot proof"
Don't see where Lior get's this from really. However, I totally agree that you need to be open as a developer to the needs of your users. It's often a really bad idea to enforce certain usage on your users. Be humble and open to other people's perspectives.

It's interesting that we seem to be facing this issue with the advent of Dockerized  containers. It's inevitably abstracting away the actual tool interfaces. You certainly aren't an "idiot" for not seeing the benefits of running a tool in Docker. Many times a simple "pip install" will do just fine! Let's cater to users :thumbsup:

### 8. You used the right programming language for the task
This is a known myth in all of software development. Just start hacking, build something.

---------------------

So what about the overall sentiment that we should all just give up already and accept that software in bioinformatics will remain crappy? To be honest, I'm not terribly positive about the future prospects as of right now. In a lot of sense I agree with the likes of Pjotr Prins that we are in a "crisis". I don't doubt that we have the talent and drive to takes us out of it but I think we need to be open to more aggressively adopting common strategies from commercial software development teams.

I have limited experience working in bioinformatics. However, I've come to realize that it's rather naive to think that test driven development, continuous integration or even Git best practices will underpin bioinformatics software any time soon. I'm very much a culprit of this despite my "nobel" ambitions. What I think we miss though is good role model projects to look up to and be inspired by.

We're also all aware that we are spreading our community efforts very thin. Everyone's developing their own pipeline and file formats. We need to come together around some key projects which can be allowed to grow and set excellent standards for the rest of the field. Then I have no doubts open source will prevail.

---------------------

Continue the [disscussion][hn-source] on Hacker News


[hn-source]: https://news.ycombinator.com/item?id=9910267
[lior-twitter]: https://twitter.com/lpachter
[myths]: https://liorpachter.wordpress.com/2015/07/10/the-myths-of-bioinformatics-software/
[titus-response]: http://ivory.idyll.org/blog/2015-response-to-software-myths.html
