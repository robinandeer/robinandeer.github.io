---
title: 5 Functional Programming Tips in Python
category: tutorial
author: Robin Andeer
date: 2014-09-28
tags: tip, programming, python
---

Learning about functional programming (FP) is well worth your time. The insights you acquire will put you straight on [the path to becoming a Python Guru](http://stackoverflow.com/questions/2573135/python-progression-path-from-apprentice-to-guru/2576240).

To get the most out of this article you should grasp the basics of **pure functions**, **side effects**, and **higher order functions**.

## 1. Use immutable data structures

<Image
  src="/images/functional-programming-immutability.png"
  alt="Stick figure meditating on immutability"
  width={700 }
  height={491}
  layout="responsive"
/>

The most straightforward way of avoiding side effects is to use immutable data structures. Use them as often as possible. There aren't many immutable builtins but the standard library expands the roster a little. One surprisingly useful replacement for the builtin `dict` is the `namedtuple`.

```python
>>> from collections import namedtuple

# create an immutable dict-like class
>>> faux_dict = namedtuple('faux_dict', ['name', 'age'])
>>> person = faux_dict(name='Paul Thomas Anderson', age=44)

```

You access values through dot-notation which is even cleaner than dictionary keys, right?

```python
>>> person.age
44
```

And due to immutability, updating a value requires that you copy the entire object.

```python
>>> person._replace(age=45)
faux_dict(name='Paul Thomas Anderson', age=45)

# the original object stays unchanged
>>> print(person)
faux_dict(name='Paul Thomas Anderson', age=44)
```

Optional attributes aren't supported out-of-the-box but by [subclassing](http://stackoverflow.com/a/16721002) you can make it work.

## 2. Trade methods for functions

When you have to deal with mutable objects like the `list`, it's important to treat them just like _immutable_ objects.

For this reason, it's not OK to sort a list in-place in FP.

```python
>>> directors = ['Paul Thomas Anderson', 'Terrance Malik', 'Quentin Tarantino']
>>> directors.sort()
>>> directors   # mutated(!)
['Paul Thomas Anderson', 'Quentin Tarantino', 'Terrance Malik']
```

It's better to use the `sorted` function which returns a copy of the list and avoids mutation.

```python
>>> sorted(directors, key=len)
['Terrance Malik', 'Quentin Tarantino', 'Paul Thomas Anderson']
```

Strings are already immutable in Python but functions are still more flexible to use than methods in FP. Each string method is available as a complementary function under the `str`/`unicode` class.

```python
>>> string = 'Magnolia, Boogie Nights, There Will Be Blood'
>>> string.split(',')
['Magnolia', ' Boogie Nights', ' There Will Be Blood']
>>> str.split(string, ',')
['Magnolia', ' Boogie Nights', ' There Will Be Blood']
```

## 3. Learn about map, filter, and reduce

These three functions are all staple FP functions found in Python. They work on any iterable and always accept a function as the first parameter.

```python
>>> titles = ['Magnolia', ' Boogie Nights', ' There Will Be Blood']
>>> list(map(str.strip, titles))
['Magnolia', 'Boogie Nights', 'There Will Be Blood']
```

`map` and `filter` are [curious cases](http://www.artima.com/weblogs/viewpost.jsp?thread=98196) in Python-land. It's worth noting that the internal implementation is equal to a list comprehension. Effectively the above expression is the same as the possibly more Pythonic:

```python
>>> [str.strip(title) for title in titles]
['Magnolia', 'Boogie Nights', 'There Will Be Blood']
```

In Python 3 "map" has become lazy by default (like `functools.imap`) and therefore the same as the complementary generator expression.

```python
>>> (str.strip(title) for title in titles)
<generator object <genexpr> at 0x7f81f24e2f00>
```

`filter` is in the same sense nothing more than a list comprehension + a conditional statement.

```python
>>> titles = ['Magnolia', ' Boogie Nights', ' There Will Be Blood']

>>> def is_one_word(string):
...   return len(string.split()) == 1

>>> list(filter(is_one_word, titles))
['Magnolia']

>>> [title for title in titles if is_one_word(title)]
['Magnolia']
```

## 4. Curry your functions

Partial evaluation of functions is normally accomplished using `functools.partial`.

> ... currying is just syntactic sugar for partial evaluation. A curried function partially evaluates if it does not receive enough arguments to compute a result. Ref: [http://toolz.readthedocs.org/en/latest/curry.html](http://toolz.readthedocs.org/en/latest/curry.html)

The [toolz](toolz.readthedocs.org/en/latest/) library contains a very handy decorators to automatically curry regular functions.

```python
>>> from toolz import curry
>>> @curry
... def multiply(first_factor, second_factor):
...   return first_factor * second_factor

>>> double = multiply(2)
>>> double(21)
42
```

We'll soon see how we can use this trick to write very clean pipelines.

## 5. Write pipelines with _toolz_

We have now seen many of the utilities we need to really start taking advantage of FP. Let's implement a simple reader for a Tab-delimited stream (or file object). It will be lazy (memory efficient), linear (parallelizable), and easy to comprehend.

> As indicated before **toolz**, a third-party library, provides a lot of the missing pieces that will make coding FP in Python a much more pleasurable experience.

The input is really any iterable, whether a file object, list, or generator that spits out lines of text.

```python
>>> stream = [
  '#time\tevent\n',
  '003 min\tNarrator speaks\n',
  '023 min\t"What Do Kids Know?" airs on TV\n',
  '107 min\tJimmy confesses to cheating\n',
  '159 min\tFrogs begin to fall from the sky\n',
]
```

We need to setup a few layer of filters that each will take care of one dedicated task.

```python
>>> from toolz import curry
>>> @curry
... def is_comment_line(line, prefix='#'):
...   """Check if a string starts with a specified prefix."""
...   return str.startswith(line, prefix)
```

Finally we have everything we need to combine the pieces to a fully working pipeline built from the components we've covered before.

```python
>>> from toolz import pipe, partial
>>> from toolz.curried import complement, map, filter
>>> sequence = pipe(
...   stream,
...   filter(complement(is_comment_line)),   # filter out comments
...   map(str.rstrip),                       # strip invisible chars
...   map(partial(split(sep='\t'))),         # split lines
... )

>>> list(sequence)
[['003 min', 'Narrator speaks'],
 ['023 min', '"What Do Kids Know?" airs on TV'],
 ['107 min', 'Jimmy confesses to cheating'],
 ['159 min', 'Frogs begin to fall from the sky']]
```

Lazy, linear, and without side effects. Beautiful.

Thanks for your interest. Reach out [@robinandeer](https://twitter.com/robinandeer).

<a href="https://news.ycombinator.com/submit" className="hn-button" data-title="5 Functional Programming Tips in Python" data-url="http://www.robinandeer.com/blog/2014/09/28/5-functional-programming-tips-in-python/" data-count="horizontal">Vote on Hacker News</a>
