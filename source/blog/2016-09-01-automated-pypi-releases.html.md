---
title: Automatic PyPI releases using Travis CI
category: tutorials
author: Robin Andeer
date: 2016-09-01
tags: tutorial, continuous deployment, continuous integration, travis, python, pypi
---

Programming has always been about automating stuff that is either too boring or takes too long for regular humans to accomplish. Automating the automatable is something that drives me as a developer. It just feels right.

So I was happy to discover that [Travis][travis], the amazing continuous integration service, has a bunch of handy deployment options for popular platforms; including releasing Python packages on [PyPI][pypi]! 🎉

Releasing a new version of a package isn't exiting - when your tests pass on "master", it's simply the next logical step. Let's automate it! These are the steps you will need to take:

## 1. Activate Travis for your repository

Go to [Travis][travis] and click the "+" icon.

## 2. Add a Travis YAML file (`.travis.yml`)

Make sure your repository has a working Travis YAML file - your package will only release if all tests pass! This is my template for a generic Python package:

```yaml
---
language: python

python:
  - '2.7'
  - '3.4'

install:
  - pip install -q -r requirements-dev.txt .

script:
  - coverage run --source "$(basename "$PWD")" setup.py test

notifications:
  email: false
```

## 3. Install and run the Travis CLI

Travis has a CLI which you can install as a Ruby gem:

```bash
$ gem install travis
```

You can tell it to walk you through setting up deployment for PyPI. In your project repository, run the command:

```bash
$ travis setup pypi
Username: robinandeer
Password: **************
release only tagged commits? |yes|
deploy as wheel file too? |yes|
Release only from Clinical-Genomics/cglims? |yes|
Encrypt Password? |yes|
```

I answered "yes" to all questions. This means that when I tag a release in git and push it to GitHub, Travis will run my test suite and if successful release the new version on PyPI - sweet!

The command adds a `deploy` block to your `.travis.yml` file (and unfortunately reformats it in the process... 😛). Did you notice that it asked for your PyPI password and wanted to know if you'd like to encrypt it? This is of course essential for public repositories! You will end up with something like this:

```yaml
# .travis.yml
...

deploy:
  provider: pypi
  user: robinandeer
  password:
    secure: [REDACTED]
  on:
    tags: true
    distributions: sdist bdist_wheel
    repo: Clinical-Genomics/trailblazer
```

That's it really! All the rest is taken care of automatically.

What I like about this is not just that there's one less thing to worry about but that I'm forced to consider some sane best practices:

1. writing tests and using a continuous integration service like Travis
2. tagging my releases in git and following conventions like "v1.1.0-beta2"

---------------------

If you're a Python developer maintaining just a single package on PyPI I can definitively recommend this approach! Or else, why not check out the list of all the other [integrations][travis-integrations] that Travis offers 🙂.


[travis]: https://travis-ci.org/
[pypi]: https://pypi.python.org/
[travis-integrations]: https://docs.travis-ci.com/user/deployment
