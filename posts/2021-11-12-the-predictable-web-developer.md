---
title: The Predictable Web Developer
category: reflections
author: Robin Andeer
date: 2021-11-12
tags: reflection, programming, web development
intro: How I came to understand what makes great web developers stand out.
image: /images/the-predictable-web-developer.png
imageWidth: 1200
imageHeight: 628
imageAlt: Two symbols and the text "Be predictable"
---

**TL;DR**: Great web developers stand out by building predictable interfaces. Their apps behave the way all users expect. To accomplish this, they know and adopt the [World Wide Web Consortium](https://www.w3.org) (W3C) standards - the SDK of the web.

## Domain knowledge as competitive advantage

For several years I worked closely with [Deniz Eroglu](https://www.linkedin.com/in/denizeroglu), a long-time Apple-platform developer. He believes the key to succeeding as an iOS developer is a deep understanding of the extensive iOS SDK. Without that domain knowledge, it doesn’t matter how great of a developer you are - you’re not going to make the most of the platform.

It has bugged me for a long time that I couldn’t think of the equivalent domain knowledge that is critical for web developers. When I recently got involved in recruiting for the web team at [Hedvig](https://www.hedvig.com), I felt an even stronger need to finally get to the bottom of it. We want to hire the best web developers and, therefore, we need a way to evaluate candidates, and to evaluate candidates we need to figure out what makes great web developers stand out.

## Consistency enables innovation

The iOS SDK does two things for Apple. 1. Ensuring consistency and overall quality across apps and 2. allowing for platform innovation on top of a set of shared base components. You've probably seen the Apple-produced videos where a blind user effortlessly navigates 3rd-party apps using built-in accessibility features like *VoiceOver*. Apple is clearly incentivised to teaching developers about their way of building apps and mobile developers like *Deniz* gain a lot for free by leveraging the SDK.

The experience on the web is far more hit-or-miss. Compared to apps, it’s fair to say that users have developed a greater tolerance for "jank" on websites. Imagine, for example, the last time you checked into a flight online. We’re all used to dealing with confusing user flows and non-standard form inputs. To some extent we’ve simply come to expect it.

![Lufthansa Flight Check-in Experience](/images/the-predictable-web-developer-flight.png "Lufthansa Flight Check-in Experience")

## ...but nothing is quite like the web platform

Apple is famously conservative when it comes to evolving its platform. In contrast, part of what's unique about the web is that it moves faster than any other platform. Without a standard UI Kit, building predictable interfaces becomes that much harder. However, no matter what library comes along, a modal should behave the same across all websites. A radio button should be intuitive to use no matter how its visually presented. An autocomplete component should be useable no matter what input method a user prefers.

You probably heard of the importance of writing semantic HTML like using `<button>` for "clickable" elements. However, did you know that you can mark up a set of arbitrary HTML tags to behave like a [radio button group](https://www.w3.org/TR/2017/WD-wai-aria-practices-1.1-20170628/examples/radio/radio-1/radio-1.html)?

Due to the shear speed that the web is moving and its distributed nature, it’s hard to imagine one common UI Kit. Instead we rely on conventions laid out in the web standards by W3C. It comes down to using markup that browsers can recognize along with responding to a list of inputs (like pressing ESC to close a modal). This is what ultimately will enable browser innovations that allow users of any input method or other special requirements to navigate the web. *This* is the web-specific domain knowledge I was looking for! The extensive resource that enable web developers to make the most of their platform.

## Conclusion

Great web developers are more than great developers who build web pages. They have a deep understanding of conventions, APIs, and standards to talk to browsers efficiently. They embrace the web with all its quirks and use standards that enable predictable interactions and results in happy users.
