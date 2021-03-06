---
title: 'How I test my code: motivation and strategy (part 1)'
category: tutorial
author: Robin Andeer
date: 2016-06-18
tags: tutorial, python, testing, habits
intro: A tutorial to test Python code. In part 1 we discuss testing habits and how to motivate yourself to write them.
---

Reasons to test code are plentiful; performance, quality, usability, security, and stability. However, I’m going to focus on testing to **ensure expected behavior**.

The main idea is that your suite of tests should **inspire confidence** that the code performs as expected. Any additional updates should pass all tests before being considered in the main branch. This way, developer who contribute to the project don't fear breaking something 🐞.

> **One more thing**: when you write tests for your code, you write code which is easy to test. The result is functional, maintainable, and composable!

I decided to write a series of post on "How I test code". The first part will focus on how I motivate myself and general strategies that help when writing tests. In the upcoming parts I will get more detailed about Python testing but many of the concepts are general enough to apply to any language 🌎.

<Image
  src="/images/testing/lack-of-tests.png"
  alt="Intro"
  width={1000}
  height={800}
  layout="responsive"
/>

## Motivation: the habit loop

A habit is formed when you no longer need to motivate yourself to perform a routine. You do it automatically. **Following a cue, acting out your routine, and claiming your reward**.

It's only natural to feel like tests is but an additional step that you would rather skip and just deploy! But without tests you will never feel confident about the execution of your code. Just like working out, writing tests is a perfect activity to design a habit around.

<Image
  src="/images/testing/habit-loop.png"
  alt="Habit loop"
  width={656 }
  height={306}
  layout="responsive"
/>

Example of a habit loop: cue, routine, reward, and craving ☝️.

This is my own habit loop for testing: my **cue** is writing or altering a function. The **routine** is writing tests for it. My **reward** is better/complete [test coverage][coverage]\*. I now **crave** to maintain a green badge of 100% coverage and peace of mind that executing my code does what I expect.

It’s important to make this loop as simple as possible. That’s why you should invest time in learning and setting up test automation which I will describe in part 3 in this series.

> Read more about habits and how to master them in [**The Power of Habit**][habit], by Charles Duhigg.

## Strategy: GIVEN-WHEN-THEN

It can be difficult to get started writing tests. Where do I begin? My **routine** is to follow step-by-step instructions in a very simple model: GIVEN-WHEN-THEN.

1. **GIVEN**: describe the prerequisites for the test you will run and optionally make assertions about your setup
2. **WHEN**: run your function and explain what is supposed to happen
3. **THEN**: assert the outcome of your test; return values or side effects

Here's a quick example:

```python
# GIVEN the database doesn't contain any rows
assert DatabaseRow.query.count() == 0
# WHEN adding a new row to the database
new_name = 'Paul'
add_row(name=new_name, age=12)
# THEN there should be ONE new row added to the database
assert DatabaseRow.query.count() == 1
# ... with the expected name
assert DatabaseRow.query.first().name == new_name
```

By being explicit about what I'm testing, I've found I can get past the initial mental obstacles. It also adds relevancy to writing tests. Without clear comments it can often feel like indecipherable lines that does something you've long forgot.

## To be continued

I hope you enjoyed this first entry. Please look out for part 2 where we will dive into the [pytest][pytest] framework and learn about powerful features like _fixtures_!

---

\* Complete test coverage doesn't mean you've tested your code completely. However, it does offer an good (but far from perfect) indication of a good test suite. It's also easy to understand and offers clear results.

[habit]: http://charlesduhigg.com/the-power-of-habit/
[coverage]: https://en.wikipedia.org/wiki/Code_coverage
[pytest]: http://pytest.org/latest/
