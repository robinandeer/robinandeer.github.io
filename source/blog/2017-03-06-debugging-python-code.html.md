---
title: Debugging Python Code
category: tutorials
author: Robin Andeer
date: 2017-03-06
tags: tutorial, python, debugging

description: >
    The more code you write, the more time you also spend tracking down errors.
    That's why it's worthwhile to learn some debugging-skills!
image: /assets/img/debug.png

published: false
---

The more code you write, the more time you also spend tracking down errors. That's why it's worthwhile to learn some debugging-skills!

![Debugging Python](/assets/img/debug.png)

## Pre-empting errors

Do as much as possible upfront to facilitate discovery of bugs. First of all, if you are still printing info to the console, you should look into some [logging practices][logging].

You can also employ your editor to highlight possible mistakes. These often sneak into Python code unnoticed because of Python's interpreted nature (no compilation) and only optional [typing support][typing]. A first stop when I write code is to employ a few [static code][pylint] [analysis tools][flake8]. They can help you spot for example broken imports and variables referenced before assignment. It should be fairly simple to integrate them in your editor to run every time you save a file!

## Breakpoints

Logging + linting provide a nice start but sometimes you need more dedicated tools to do resolve bugs. When I run into an unforeseen issue, my first stop is to interactively investigate the code by setting a **breakpoint**. Now Python's interpreted nature becomes an asset! You can use the built-in `pdb` module but just like [`ipython`][ipython] replaces the standard `python` shell, you really should be using `ipdb`! Start by installing it:

```bash
$ pip install ipdb
```

Now you can add this line anywhere in your code where you want to pause execution and do some interactive exploration:

```python
>>> import ipdb; ipdb.set_trace()
```

Don't worry about the awkward syntax. The important thing to understand is that when the interpreter reaches this line of code, you will be dropped into an `ipython` session where you can play around with variables and functions just as you'd expect.

```bash
❯ chanjo db setup
> /Users/demo/projects/chanjo/chanjo/store/cli.py(29)setup()
     27     log.info('setting up new database')
     28     import ipdb; ipdb.set_trace()
---> 29     context.obj['db'].set_up()
     30
     31

ipdb> context.obj
{'db': <chanjo.store.api.ChanjoDB object at 0x103e05f10>,
 'database': None}
ipdb>
```

You navigate around using a few special commands. These are the ones I use 99% of the time:

- `n(ext)`: execute the current line of code
- `s(tep)`: step into a function
- `u(p)`: step _out_ of the function into the parent scope
- `c(ontinue)`: execute code until the next exception/breakpoint/end
- `exit`: directly exit out of the shell

You can find a full list of commands by typing `help`.

## Port mortem-mode / Debugging in iPython

Early on in development I spend a lot of time in iPython importing my functions and testing them out. You can use some very handy magic function to facilitate debugging. First is **`%debug`**. When you run into an exception you can simply type in this command to activate the debugger (ipdb) and inspect the stack frame just after it exited. You can automate this to always be the case by instead enabling **`%pdb`** mode. Then every time some exception gets thrown you will be dropped into an interactive debugger.

## Summary

Among my developer colleagues and friends, **linters** aren't particularly popular but I still believe they've helped me discover a lot of bugs and reminded me of best practices. When an issue slips through, I pull out my **ipdb** power tool to attack the problem in an interactive shell.


-----------------------

## Credits

hydra by [Huu Nguyen](https://thenounproject.com/huu/) from the [Noun Project](https://thenounproject.com/)

Bug by [ProSymbols](https://thenounproject.com/ProSymbols/) from the [Noun Project](https://thenounproject.com/)

crossed swords by [Misha Petrishchev](https://thenounproject.com/mishapetrishchev/) from the [Noun Project](https://thenounproject.com/)


[logging]: http://mussol.org/2016/12/15/understanding-logging-in-python/
[typing]: https://docs.python.org/3/library/typing.html
[pylint]: https://www.pylint.org/
[flake8]: http://flake8.pycqa.org/en/latest/
[ipython]: https://ipython.org/
