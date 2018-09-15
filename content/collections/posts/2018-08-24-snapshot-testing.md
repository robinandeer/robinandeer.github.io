---
title: Snapshot testing in JavaScript
slug: snapshot-testing-in-javascript
category: tutorial
author: Robin Andeer
date: 2018-08-24
tags: tools, tutorials, javascript, testing, jest
published: false
---

[Jest][jest] is an opinionated (as opposed to completely customizable) and powerful framework of tools for testing JavaScript. The developers behind Jest highlight three main feature on the official website:

1. It's ready-to-use out of the box with "zero configuration"
1. Provide really nice feedback when things break
1. Introduces a new way of testing code called "snapshot testing"

Point 1 and 2 are quite intuitive, however, snapshots require a little more explanation. [Rogelio Guzman][rogeliog] has a [great intro talk][snapshot-video] to snapshot testing that I definitely recommend! I will continue discussing the concepts here and where I see the biggest benefit of using snapshots.

-------------------

When I write tests (especially UI tests), one of the hardest things is coming up with a set of assertions to validate a given function. In addition, my main concern is to prevent stuff from unexpectedly breaking as I introduce changes to the code base.

Snapshot testing to the rescue! With Jest set up, all you need to do is:

```javascript
import { formatDate } from './utils'

test('formats correctly', () => {
  const someDate = new Date('2008-02-17')
  expect(formatDate(someDate)).toMatchSnapshot()
})
```

## What's going on here?

The first time you run the test suite:

1. The function runs and produces _output_
1. The _output_ is serialized and stored in a _snapshot_ file
    > This file should be committed to source control!
1. Test passes

Subsequent test runs follow this pattern:

1. The function runs and produces _output_
1. The _output_ is serialized
1. The existing _snapshot_ is retrieved and compared with the new _snapshot_
1. If they match, test passes ✅. If they mismatch, test fails ❌.

I've tried to summarize the process in the figure below:

<figure><img src="/static/snapshot-testing@2x.png" width="965" height="414" alt="Snapshot testing diagram"></figure>

Failed tests can be evaluated by the developer to see if the changes are expected or not. When changes are expected, you re-run the tests, telling Jest to update the snapshot. If changes are not expected, you have to manually work out what went wrong.

## Use cases for snapshots

- In general, snapshots work great for [pure functions][pure-func]. In addition, they're specifically useful for functions that produce complex output where it's not clear which parts should be asserted.

	Examples include functions that return large JSON objects and e.g. stateless React UI components.

- With snapshots, you can also test many edge cases relatively cheaply and without repeating assertions.

- ☝️ If you already use [Storybook][storybook] to setup UI component examples - you can get snapshot testing essentially for free with the [Storyshots addon][storyshots].

## Limitations of snapshots

- Functions that cause side effects (not _pure_) like updating a database normally don't generate output - therefore, there's nothing to "snapshot".

- Not so much a limitation but it's good to remember that even with snapshots, you will still to mock e.g. third-party APIs and/or HTTP requests.

----------------

I hope this article sheds some light on the sometimes confusing and magical properties of **snapshot testing**! If you learned something new, please consider sharing this article with your friends and colleagues 💬

[snapshot-video]: https://www.youtube.com/watch?v=HAuXJVI_bUs
[jest]: https://jestjs.io/
[storyshots]: https://github.com/storybooks/storybook/tree/master/addons/storyshots/storyshots-core
[pure-func]: http://www.nicoespeon.com/en/2015/01/pure-functions-javascript/
[rogeliog]: https://twitter.com/rogeliog
[storybook]: https://storybook.js.org/
