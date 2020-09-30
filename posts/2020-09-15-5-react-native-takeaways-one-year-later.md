---
title: 5 React Native takeaways - one year later
category: reflections
author: Robin Andeer
date: 2020-09-29
tags: reflection, javascript, react native, native, app
intro: Learnings and tips to work productively with React Native.
image: /images/react-native-like-dislike.png
---

> This article was originally posted on the [Futurice Blog](https://futurice.com/blog/5-react-native-takeaways-one-year-later).

One year ago, I left my comfortable web development groove to build a new cross-platform mobile app for a large Nordic bank. Since then, I've faced many new professional challenges working side-by-side with [Deniz Eroglu](https://github.com/denizeroglu), an experienced iOS-developer.

Since this is my first professional mobile app and React Native project, I wanted to share my learnings so far. I hope it will be a valuable read for any existing or prospective React Native developers. Read on for the takeaways.

<figure><img src="/images/react-native-like-dislike.png" alt="React Native logo with like and dislike icons"></figure>

## 1. Look for insider information

Before starting new projects at Futurice, we are encouraged to set up one or more **Expert Exchange** sessions. We primarily reach out internally for colleagues with relevant professional experiences (in this case developing mobile apps) and ask them to share tips and possible challenges.

Before deciding how to build the app in 2019 we had a great chat with a developer from our Helsinki office; [Axel Havukangas](https://github.com/aeirola). He gave us invaluable input on the **future plans 🔮** on some of the key community libraries like *React Navigation* and *React Native Firebase*. This led us to use beta-versions of both libraries right from the start. The new APIs weren't 100% stable but it meant we could go all-in on *React Hooks* as well as avoid bigger migrations between the existing versions and those that have since been officially released.

> React Native rewards early adopters. Your project will benefit if you buy into the evolving nature of the framework.

Axel also insisted we use **TypeScript**. Specifically to benefit from the advanced static analysis which helps us write as bug-free code as possible. For a mobile project this is even more important than for web apps. Even small bug fixes need to go through time-consuming app store reviews. Silly mistakes that are shipped to production can, therefore, become unnecessarily costly.

**Take away**: the more insights you can collect about the current and future state of React Native and the community, the better. Seek out people with experience and ask them for advice before starting new projects. Embrace change, React Native is a continuously evolving library - you will do best to evolve with it.

## 2. Get comfortable with dependencies

Your app will often interact with native components (image picker, in-app browser, storage, etc.) All these use cases require a JavaScript-to-native API as well as code to account for platform differences. The benefits of relying on community libraries for these abstractions rather than implementing them yourself quickly become apparent.

This means you will be installing *a lot* of 3rd party dependencies - a **natural consequence** of writing cross-platform and non-native code. Luckily bundle size is less of a concern for mobile apps compared to web apps. However, every added dependency still comes at a cost to added **uncertainty**.

- Can I trust that someone else's code works as advertised?
- Will the dependencies be maintained for as long as my app is in production?
- Can I trust that they are kept up-to-date after I leave the project?
- Will it be easy to migrate to newer versions of dependencies?

**Take away**: be comfortable with a growing list of dependencies, make [React Native Community](https://github.com/react-native-community) your first stop for high quality packages, and no matter what; update your dependencies early and often to avoid painful migrations.

## 3. Overcome native-phobia

Coming into the project, I only had brief experience building mobile apps with [Cordova](https://cordova.apache.org/). Therefore I was intrigued to see that React Native took a very different approach to how it handles inherently platform-specific concepts like build configurations, code signing, and app icons. Instead of baking it into the framework, React Native always defers to how it's normally **handled by the platforms**. You even check-in the whole Xcode-project to version control! This also means you need to be comfortable digging around in Xcode and getting around Android Studio to be an efficient React Native developer - even if you still only code in JavaScript/TypeScript.

> Fight the fear of booting up Android Studio! Get comfortable before you run into the trickier problems.

I had the pleasure of working on this project alongside an experienced iOS developer that took care of 90% of the initial setup of the iOS/Android projects. It has made me an order of magnitude more confident that we are doing things *the canonical way*.

Having said that, don't give up, fellow web developer! I know from first-hand experience how overwhelmed native developers are when getting into web development. It's fundamentally the same learning process when you first try to navigate and understand the bits and pieces of an Xcode-project. You just need to give it time and gain experience.

**Take away**: ideally, at least one person in the team should have native app development experience. React Native does let you "write native apps in JavaScript" - but if you're developing for mobile, there's no getting around having to interact with the platforms themselves from time to time.

## 4. React Native version upgrades won't kill you

Speaking of frustrations, upgrades between React Native versions is a known pain-point. There are [ongoing](https://github.com/react-native-community/rn-diff-purge) [efforts](https://react-native-community.github.io/upgrade-helper/) to streamline the process but it still remains manual and tedious. A few times I've been scared to break things since I don't fully understand what's going on "under the hood". However, our overall experience has been **pretty smooth**. We knew migrating between versions could cause headaches and therefore we've always stayed up-to-date with the latest releases. Doing many small migrations has helped minimize the risk of messing something up in a big way.

Over time we have also developed a better understanding of the setup, including which of the changes in the migration-diffs that are required and which we can safely ignore.

**Take away**: upgrading React Native can be a daunting task but don't fear it too much. What's important is to **prioritize updates** so you can stay a head of the curve and adopt new versions as they roll in.

## 5. My two biggest frustrations

The most frustrating things about developing with React Native is **debugging** and **testing**.

I do most of my debugging using [*React Native Debugger*](https://github.com/jhen0409/react-native-debugger) which doesn't require any setup and has served me well. However, from time to time you need to boot up Xcode or Android Studio to dig deeper into a particularly tricky issue. I would much prefer having a unified debugging experience. Instead, React Native developers are forced to master three separate debug environments to cover all their needs.

Even more frustrating, however, has been to setup a working test infrastructure. The first challenge is to figure out how to correctly configure TypeScript and Jest. Then add in React Native to the mix and you're in for a real treat! And don't forget that you also need to mock every library that interacts with native code. Luckily, some of them ship their own mocks 🙇‍♂️ while others leave you to google for hours to resolve the cryptic error messages 🤔.

With everything up and running, I find myself asking "after I mock 50% of the code that runs in my app - what am I *really* testing?" Even when all tests pass, I simply don't feel confident that things are indeed working. At this point I would normally re-focus my efforts to end-2-end tests but that's a whole other beast when it comes to mobile apps. It's especially difficult since our test APIs are only available behind a VPN 🤦‍♂️ which means we can't automate such tests using 3rd-party services.

**Take away**: prepare yourself for a debugging experience that's a little schizophrenic (React Native Debugger, Xcode, Android Studio). Bring a great deal of patience when setting up your tests for the first time. Take your time to understand it and avoid shortcuts. Invest in end-2-end tests if you have the opportunity.

## Bottom line

Working with React Native has been a mixed bag. I love it ❤️ and I hate it 😖. So should you pick it for your next project?

**Write once, deploy anywhere**. React Native does enable you to deploy to both Android and iOS from a single codebase. However, it's not React Native's biggest strength. You still want to tailor the app experience to feel *native* to users of each platform. Over time, this adds complexity that is hard to estimate. No matter what, don't use React Native as an excuse to avoid customizations!

**Learn once, write anywhere**. The official framework tagline does a good job of explaining its main benefits. It lets you leverage the component-based UI model and [fast refresh](https://reactnative.dev/docs/fast-refresh) capability proven to appeal to an increasingly large number of developers across *various* platforms. If the project was to develop only an iOS app, I would personally choose React Native over UIKit (and it's imperative MVC model) any day of the week.

Ultimately you should **let your team decide** which way to go. Play to their strengths and devotions as developers.

---

PS. You might've noticed that I haven't mentioned anything about deployment or distribution. Currently, our eggs are in the [AppCenter](https://appcenter.ms/)-basket when it comes to automating builds and distributing test versions. However, we still need more time to discover the pros and cons of the platform. DS.
