---
title: "How I test my code: coverage and automation (part 3)"
category: tutorials
author: Robin Andeer
date: 2016-06-23
tags: tutorial, python, testing, pytest, coverage, automation, travis

published: false
---

This is the third installment in my "How I test code"-series. In this post, I get into the benefits of measuring test coverage and show how you can run automated tests; locally and remotely.

## Test coverage

I'm a fan of tracking test coverage. It tells you how many lines of code are executed when you run your test suite. To be clear: 100% test coverage doesn't mean you have written a perfect test suite. However, it does indicate the level of ambition and that makes it a good starting point!

I'm using Python as an example along with the _pytest_ test runner. Here you will use `pytest-cov` to measure coverage:

```bash
$ pip install pytest-cov
$ py.test --cov-report html --cov [myPackage] --verbose
$ open htmlcov/index.html
```

This will open a coverage report in your browser.

![Test coverage report](/assets/img/test-coverage.png)

You can dig into individual modules to see exactly which lines you're missing. Reaching 100% can seem close to impossible. Sometimes it doesn't even make sense to test a certain block of code which is why you can exclude parts by adding a comment in your source:

```python
def run_external(program_call):
	try:
        subprocess.check_call(program_call)
    except CalledProcessError as error:  # pragma: no cover
    	# some unexpected error; we just want to exit cleanly
        abort()
```

The coverage report will report the block after `pragma: no cover` as excluded but it won't count against your overall coverage percentage.

## Automation

Making the computer do work for you is always nice. Do it whenever possible! You reduce mental load and avoid human error.

> In automation we trust, or something like that 😉

### Automating local testing

You can setup _pytest_ to run your suite every time you make changes to your code. This is especially nice when combined with tracking test coverage. As soon as you add a test, the test suite will be rerun and the coverage score updated! This creates a feedback loop to push you to write more tests!

With _pytest_, all you need is another plugin:

```bash
$ pip install pytest-xdist
$ py.test --cov-report html --cov [myPackage] --verbose --looponfail
```

_pytest_ will now watch your project files for changes. If some tests fail, only they will be rerun until they are successfully fixed.

### Automating remote testing

There's another layer to test automation. **Continuous integration** (CI) is already an industry standard and running your tests automatically on a remote server makes a lot of sense:

- results are picked up automatically by sites like GitHub
- you need to think about how to install on cloud infrastructure
- the code must run somewhere other than your development machine

The CI service of choice for open source projects is [Travis][travis]. It's free and basically only requires a `.travis.yml` file in your repo and the flip of a switch to get started. Travis already has general guidelines on [setting up a Python project][travis-python]. Here I will stick to sharing some tips and tricks I've come across.

These are some common feature of my `.travis.yml` files:

```yaml
[...]

notifications:
  email: never

[...]

script:
  - coverage run --source [myPackage] setup.py test

after_success:
  coveralls
```

GitHub badges are more than a gimmick. A green Travis badge inspires confidence in your project - your "master" branch is working! Likewise you can back up that claim by showcasing you test coverage. [Coveralls.io][coveralls] provides this exact service and integrates nicely with GitHub/Travis.

Unfortunately I've had some issues getting `pytest-cov` to work with Coveralls. The fix I've found is to use test integration in `setup.py`. Add this block of code to use _pytest_ when running `python setup.py test`:

```python
# setup.py
from setuptools.command.test import test as TestCommand

class PyTest(TestCommand):

	"""Setup the py.test test runner."""

	def finalize_options(self):
		"""Set options for the command line."""
		TestCommand.finalize_options(self)
		self.test_args = []
		self.test_suite = True

	def run_tests(self):
		"""Execute the test runner command."""
		# Import here, because outside the required eggs aren't loaded yet
		import pytest
		sys.exit(pytest.main(self.test_args))

```

## BONUS: Linting
Synchronizing and harmonizing code style across a project is a big benefit when on-boarding new contributors. Letting it be up to an objective script to tell you and your collaborators when something breaks a style guide is much easier to take than from your peers :wink:

Along with detecting syntax deviation, tools like `pylint` can help you detect errors in your code before it's pushed to a public repository. I recommend integrating it directly with your editor so you get feedback as early as possible. In Sublime Text you only need one package to get everything setup: [Anaconda][anaconda].


----

## Conclusion

That concludes "How I test my code" - I hope you enjoyed the series 🙂. I might return to it in the future to cover additional topics like mocking and functional/integration tests. If you have another topic in mind or feedback on the posts so far, feel free to reach out on [@robinandeer][twitter] on Twitter.


[coveralls]: https://coveralls.io/
[anaconda]: http://damnwidget.github.io/anaconda/
[travis]: https://travis-ci.org/
[travis-python]: https://docs.travis-ci.com/user/languages/python
[twitter]: https://twitter.com/robinandeer
