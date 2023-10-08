---
title: Maintainability
category: reflections
author: Robin Andeer
date: 2023-05-30
tags: reflection
intro: TBD
image: /images/progressive-enhancement.png
imageWidth: 1200
imageHeight: 628

draft: true
---

Every line of code you write is a liability. It needs to be maintained. As it breaks. As it becomes a security risk. As it causes a performance bottleneck. As it confuses other developers. As it confuses the future you.

The best way to avoid these problems is to not write code in the first place. The second best way is to write as little code as possible. The third best way is to write code that is easy to understand and maintain.

Testability. If you can write tests for your code, it's probably easy to understand and maintain. If you can't, it's probably not.

Understandability.

It all serves the same purpose: to make it easier to maintain the code.

What makes code maintainable? You can think of the most common activities you on a daily basis:

- Building new features.

- Deletability. The best code is the code you don't have to write. The second best code is the code you can delete.

- Easy to understand (readability). Pretty straightforward. If you can't understand the code, you can't maintain it.

- Easy to change (flexibility). Software is never done. It's always changing. New features are added. Requirements change. You need to be able to change the code without breaking it.

- Easy to test (testability). If you can write tests for your code, it's probably easy to understand and maintain. If you can't, it's probably not.

------------

A unique aspect of software development is that it's never done. Unless you code for a space shuttle, your software will change continuously. This is usually achieved by building modular systems. A modular system allows you to change one part of the system without affecting the rest of the system. This is a good thing.

However, it's easy to imagine a susyem with too much modularity. At some point, the system becomes so modular that it's hard to understand how the different parts fit together. We need a balance between modularity and understandability (simplicity?).

I've toyed with the idea that a focus on testability would help us find this balance. If you can write tests for your code, it's probably both easy to understand and extend. If you can't, it's probably not.

However, tests are addded in service of a greater goal. They are not the goal in itself. The goal is to build a system that is easy to understand and extend. Tests are just a tool to help us get there. Writing tests doesn't lead to more understandable and extendable code. A focus on testability can therefore be misleading.


