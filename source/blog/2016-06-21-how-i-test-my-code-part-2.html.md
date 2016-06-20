---
title: "How I test my code: pytest and fixtures (part 2)"
category: tutorials
author: Robin Andeer
date: 2016-06-21
tags: tutorial, python, testing, pytest, fixtures

published: false
---

This is part 2 in my series on "How I test code". [Part 1][part1] discusses testing habits and how to motivate yourself to write them. This post goes into more Python specific tools and conventions around testing.

Python has a number of test runners to extend and simplify writing, specifically, unit tests. My personal preference is [pytest][pytest] which is super robust and feature rich. It let’s you write tests as simple "**asserts**", has a brilliant **plugin ecosystem** that "just works" after `pip install pytest-[somePlugin]`, and let's you leverage powerful **fixtures** to keep things DRY.

A small flavor of what tests look like with _pytest_:

```python
import pytest
from mypackage import best_movie, perform_division

def test_best_movie():
	movie = best_movie(director='P.T. Anderson')
	assert movie == 'There Will Be Blood'

def test_perform_division():
	with pytest.raises(ValueError):
		# call with parameters that should yield error
		perform_division(12, 0)
```

Running your tests is then as easy as:

```bash
$ py.test --verbose
```

## Ogranizing tests

_pytest_ does a great job of detecting tests. All you need to do is name test modules with a prefix: `test_*`. Inside modules, each test function should similarly be named `def test_*:`.

Furthermore, I like to organize test files to reflect my source code. The following source code organization:

```
myPackage
|-- utils.py
|-- tools
     |-- docker.py
```

... would result in the following test structure:

```
tests
|-- test_utils.py
|-- tools
     |-- test_tools_docker.py
```

> You notice that I'm "repeating" the term "tools" for the "docker"-test module. This is because _pytest_ requires globally unique test module names!

## Test fixtures

I think this is _the_ key concept to start mastering tests. Fixtures are pluggable components that can be shared across many tests to setup pre-conditions. They each have their own setup and tear down blocks and you control if they are reset on a function/module/session basis.

Let's add a few items to our setup:

```
tests
|-- fixtures                    # store static files here
|-- test_utils.py
|-- tools
     |-- test_tools_docker.py
|-- conftest.py                 # write fixture functions here
```

Inside `conftest.py` you can add fixture functions that will be exposed to your tests. You mark a function as a fixture with a decorator. If you don't need setup/tear down you can use a simple `@pytest.fixture`. Otherwise it's easiest to use `@pytest.yield_fixture`.

```python
# conftest.py
import pytest
from myPackage import DatabaseAPI

@pytest.yield_fixture(scope='function')
def db_connection():
	_db_connection = DatabaseAPI(uri=':memory:')
	_db_connection.create_tables()
	yield _db_connection
	_db_connection.teardown_tables()
```

```python
# test_utils.py
def test_add_row(db_connection):
	name = 'Paul T. Anderson'
	add_row(name=name, age=34)
	db_connection.save()
	assert db_connection.get_row(name=name).age == 34
```

When _pytest_ runs the above function it will look for a fixture called `db_connection` and run it. Whatever is yielded (or returned) will be passed along to the test function. You can pass as many fixtures as you want to a test. We set the "scope" of the fixture to "function" so as soon as the test is complete, the block after the `yield` statement will run.

> Tip: test fixtures accept parameter-dependencies the same way as test functions. It's perfectly possible to nest test fixtures.

Additional fixtures can be installed through plugins and _pytest_ itself comes with a few built in. For example there's the handy `tmpdir` fixture that provides unique temporary folders where you can test various side effects.

```python
from mypackage import touch

def test_write_file(tmpdir):
	# GIVEN an empty dir
	assert len(tmpdir.listdir()) == 0
	# WHEN touching a new file
	new_path = tmpdir.join('newfile.txt')
	touch(str(new_path))
	# THEN there should be a new file created
	assert len(tmpdir.listdir()) == 1
```

## Conclusion

I've only touched on some of the features that make _pytest_ so powerful. I would highly recommend reading up on the [framework][pytest] and picking out other features that might benefit you.

Part 3 is coming up and will show how you can **automate** your test workflow; both locally and remotely. I will also cover how to measure **test coverage**.


[part1]: http://www.robinandeer.com/blog/2016/06/18/how-i-test-my-code-part-1/
[pytest]: http://pytest.org/latest/
