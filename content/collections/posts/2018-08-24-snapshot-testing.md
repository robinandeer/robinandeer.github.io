---
title: Snapshot testing
slug: snapshot-testing
category: tutorial
author: Robin Andeer
date: 2018-08-24
tags: reflection, conference, codefest, tools, bioinformatics
published: false
---

I'm not super experienced with JavaScript testing.

Rogelio Guzman has made a [great intro][snapshot-video] to snapshot testing.

One of the hard things, especially testing UI, is coming up with a set of assertions to test a given function. You kind of just want to make sure that _nothing has unexpectedly changed_.

Snapshot testing takes the pain of manually writing these kinds of assertions. All you need to do is something similar to:

```javascript
it('formats correctly', () => {
  const someDate = new Date('2008-02-17')
  expect(formatDate(someDate)).toMatchSnapshot()
})
```

## What's going on here?

The first time you run this test:

1. The function executes and produces _output_
1. The _output_ is serialized and stored in a _snapshot_ file
    > This file should be committed to source control
1. Test passes

Subsequent test runs follows this pattern:

1. The function executes and produces _output_
1. The _output_ is serialized
1. The existing _snapshot_ is found and the previous value retrieved
1. The serialized _output_ is compared to the snapshot value
1. If they match, test passes. If they mismatch, test fails.

Failed tests can be evaluated by the developer to see if the changes are expected or not. When changes are expected, you only rerun the tests, telling Jest to update the snapshot. If changes are not expected you have to manually try to work out what has happened.

https://whimsical.co/618sHPeAVUrkcdA5QWNqoe

## Use cases for snapshots

There's a few area where snapshots are super valuable.

- UI components: you mainly want to make sure that UI doesn't change unexpectedly and it's really hard to write good, robust assertions.

## Limitations of snapshots

- Non-pure components that cause side effects like updating a database should normally not generate any output - therefore, they can't be snapshot-tested.
- Snapshots doesn't help with functions that need mocking of third-party APIs - you still need to mock HTTP responses etc.

[snapshot-video](https://www.youtube.com/watch?v=HAuXJVI_bUs)
