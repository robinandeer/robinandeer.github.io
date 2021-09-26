---
title: "React, more capable than ever, still a UI library"
category: reflections
author: Robin Andeer
date: 2021-09-25
tags: reflection, programming, react, state, ui state
intro: React can handle more of your app state than ever before, but should you let it?
image: /images/react-state-rendering.png
imageWidth: 1200
imageHeight: 628
imageAlt: Two explorers discovering a new idea about React
---

The React core team has always described their project as "_a library for building user interfaces_". Over the years, an increasing amount of projects seem to give up third-party solutions (think _Redux_ or _MobX_) in favour of built-in features such as `Context` and `Hooks`.

In my own projects, both personal and professional, I've also allowed React to manage an increasing amount of complexity without external dependencies. More and more, I've come to think of React as an all purpose web app framework. However, a recent [episode](https://frontendfirst.fm/episodes/shared-reactive-data-without-context-or-effects) on the _Frontend First_ podcast made me question this notion. More specifically what state React is intended to manage.

The episode centers around the following statement:

> All state in React should be tied to rendering.

...or in other words: **any state that is equally valid after quitting an app should be managed outside React.**

## Example 1: data from an API

A concrete example of state not tied to rendering is any data fetched from an API. When I visit _The Wall Street Journal_ it downloads a bunch of news items. After I close the website, the cached news items remain equally valid (for some amount of time). If I re-open the website, I expect to see the same news items as before I closed it down. Therefore it's not tied to rendering but rather controlled by some algorithm/CMS behind the API.

I've already moved my API state management outside React. Tools like [SWR](https://swr.vercel.app) and [React-Query](https://react-query.tanstack.com) really shine in this space! By storing fetched responses in a cache **outside React**, they bring more than a few [benefits](https://swr.vercel.app) compared to fetching data using any custom combination of `useEffect` and `useState` hooks. I can also update the same cache from anywhere in my code without sacrificing reactive updates in my components.

## Example 2: Authentication state

Another example of non-UI state is authentication state. After I kill _Twitter_, I remain equally authenticated. The auth state is not directly linked to rendering. According to the above rule, it should therefore not be stored in React. Not even in `Context`!

This makes sense when you accept React as a _UI library_. However, what state is left to manage that should be delegated to React?

## Example 3: UI state

Imagine going to _TikTok_ and watching a video, pausing it after 10 seconds, then viewing the comments. There's a bunch of UI state involved here; the active video, playback position (10 seconds into the video), playback state (paused), and comment modal state (open). As soon as I quit the app, they are immediately made irrelevant. If I re-launch _TikTok_, I don't necessarily expect it to remember any of it. It's only relevant in the context of rendering UI. Nothing else. This is the kind of state that React (presumably) is made to control!

## Storing (reactive) state outside React

Even though e.g. auth state isn't directly tied to rendering UI, it obviously still influences it. Therefore, we need tools that let us do two things:

1. Store and update state outside React.
1. Connect the state to a component and trigger re-renders on updates.

The guys from _Frontend First_ discusses a state management tool called [Zustand](https://github.com/pmndrs/zustand). It allows you to access and update state both in- and _outside_ React. It also addresses [annoying pitfalls](https://github.com/pmndrs/zustand) you might end up in when putting all your state in React. I don’t have personal experience with it but I would love to try it out in an upcoming project.

## Conclusion

Hopefully this gives you some inspiration on how to think about state in React. I’m always looking for new ways to logically separate concern in my apps. I have a good feeling that this approach will lead to more maintainable code!

Have you already incorporated some of these ideas in your own projects? Please let me know how it worked out!
