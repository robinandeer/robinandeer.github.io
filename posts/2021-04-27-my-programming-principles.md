---
title: My Brief History of Programming Principles
category: thoughts
author: Robin Andeer
date: 2021-04-29
tags: thoughts, programming, dry, aha programming, zen of python
intro: A discussion on the programming principles that have influenced me most of the years.
image: /images/programming-principles-banner.jpg
---

It's not hard to debunk cliched phrases like _Don't repeat yourself_. It's clear they don't apply across all possible scenarios, however, they've still guided and shaped me as a developer.

I want to discuss a few programming principles that have influenced me, in chronological order:

- [DRY - Don't repeat yourself](#dry---dont-repeat-yourself)
- [PEP20 - The Zen of Python](#pep20---the-zen-of-python)
- [Unix philosophy](#unix-philosophy)
- [Optimizing for testability](#optimizing-for-testability)
- [AHA programming - Avoid Hasty Abstractions](#aha-programming---avoid-hasty-abstractions)
- [Optimizing for deleteability](#optimizing-for-deleteability)

<Image
  src="/images/programming-principles-banner.jpg"
  alt="Space background with direction sign"
  width={1600 }
  height={882}
  layout="responsive"
/>

## DRY - Don't repeat yourself

My earliest memory of programming principles comes from university. I remember being introduced to functions and how they enable code-reuse without copy-paste. DRY became my mantra as I hunted down code duplication candidates to be extracted as utility functions.

Needless to say, I spent the next few years obsessively optimizing my codebases much too early. However, over time I became better at recognizing the areas where rigorous application of DRY has diminishing returns (CSS, UI styling) vs. where it's absolutely critical (data access layer).

## PEP20 - The Zen of Python

> There should be one-- and preferably only one --obvious way to do it.

I learned to code in Python. [Unlike Ruby and Perl](https://en.wikipedia.org/wiki/There%27s_more_than_one_way_to_do_it), Python isn't shy about spelling out best practices. I've since moved on to other languages but I still carry the mottos from _The Zen of Python_ with me. Like "Explicit is better than implicit". I highly recommend giving them a read to inspire you how to improve your code.

Needless to say, I spent the following years painstakingly converting for-loops into more readable [List Comprehensions](https://realpython.com/list-comprehension-python/#how-to-create-lists-in-python) 😉.

## Unix philosophy

> “Write programs [or functions] that do one thing and do it well.” And “Expect the output of every program [or function] to be the input of another, as yet unknown, program.”

For those of us working in academia in the early 2010s, cloud computing was out of reach. We ran all of our analyses on our own infrastructure. This meant gluing a lot of scripts together with Bash. Spending my days inside Unix terminals certainly rubbed off on me. I came to discover and appreciate interoperable and single-purpose tools like `ls`, `cat`, `grep` with friends. A good rule of thumb I brought with me from this time was:

> If I have to use “and” when describing what a function/module/program does it’s time to break it up.

As I build React-based interfaces I still aim to **design the ideal component API** before hooking it up to any specific business logic that is inferred from my API or global state. This keeps them for getting tightly coupled to what the current business logic demands.

## Optimizing for _testability_

I vividly remember my discovery of _unit testing_. Still at my academic job, I obsessed about reaching 100% test coverage which I could brag about in my open source project READMEs.

Reaching that goal meant I needed to account for _testability_ already in the initial software architecture. No more spaghetti code! No more raw MySQL queries! I was pushed to get familiar with advanced patterns like [dependency injection](https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/). This usually brought nice side effects that made my solutions more robust and generalizable.

I used _testability_ to:

- ...decide between possible implementations, always choosing the one that made my code more _testable_.
- ...assess overall codebase health, basing it on how hard it was to implement new tests.

> Poor testability is a code smell, however, I've never come across a testable yet _crappy_ codebase.

The focus on testability also pushed me to think about **separation of concern** before anything else. Needless to say, I spent the next few years prematurely optimizing my codebases, separating code into neat layers and implementing plugin systems that never grew beyond a default add-on.

## AHA programming - Avoid Hasty Abstractions

> Duplication is far cheaper than the wrong abstraction ([Sandi Metz](https://www.youtube.com/watch?v=8bZh5LMaSmE))

After leaving academia, I started working for [an agency](https://futurice.com/). We often focused on quick turnaround to get our products in the hands of users early. This meant that testing became only one of many concerns. Instead I developed a new appreciation for _maintainable_ code that could be successfully handed over to new maintainers.

I also made the switch to JavaScript development which introduced me to [Kent C. Dodds](https://kentcdodds.com/). He has since had a big influence on my way of coding. I use his [AHA programming](https://kentcdodds.com/blog/aha-programming) principles to avoid my main nemesis: _premature optimization_.

AHA programming comes with several important realizations:

1. Whenever we extract code into a function, we also create a new **layer of abstraction**. Doing it too early contributes to [avoidable technical debt](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction).
1. A shared function also couples two (potentially) separate modules by both depending on the new abstraction. This complicates future refactors.
1. Finally, abstractions tend to live a life of their own. Even when they are no longer used, they tend to stick around. So many time, I've worried that removing deprecated functions will cause more harm than keeping them around _just in case_.

## Optimizing for _deleteability_

I've come a long way from when I itched to re-write old codebases, convinced that this time I would get it right. One important realization I carry with me is that I need to _write code to understand how it should be structured_.

Given this belief, I also accept that code I write today eventually will be rewritten, removed, or refactored. The best way to serve future maintainers (including myself) is to **make my code easy to delete**. Be humble. Whoever maintains the code a year year from now will know best what to do with it.

An important part of writing _deleteable_ code is to lean into [co-location](https://kentcdodds.com/blog/colocation). Related pieces of code should be placed as close to each other as possible. This goes for styles, documentation, and unit and integration tests.

## Conclusion

That's pretty much where I am right now. I keep collecting new principles I pick up along the way to fill in pieces of the software development puzzle. What are some programming principles that have inspired and influenced you most? Let me know [@robinandeer](https://twitter.com/robinandeer)!

---

## Further reading

- [Is the DRY Principle Bad Advice? by Rotem Tamir](https://rotemtam.medium.com/the-dry-principle-is-bad-advice-78c51afd5cf0)

  > Removing duplication feels good, but is often wrong.
  > The DRY principle is not about code duplication.
  > The meta-principle of good design is ETC [Easier to Change].

- [The Wrong Abstraction by Sandi Metz](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)

  > If you find yourself passing parameters and adding conditional paths through shared code, the abstraction is incorrect. It may have been right to begin with, but that day has passed.

- [Goodbye, Clean Code by Dan Abramov](https://overreacted.io/goodbye-clean-code/)

  > Let clean code guide you. Then let it go.

- [Organizing your code by Brian Holt](https://btholt.github.io/project-fox-game-site/organization)

  > When you write code to be easily extractable [...] Your code has to be modular [...] If everything is tangled together like spare extension cords, good luck trying to remove anything [...]
