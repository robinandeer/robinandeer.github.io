---
title: Separation of concerns
category: reflections
author: Robin Andeer
date: 2021-10-18
tags: reflection, programming
intro: What is it? How can we use it?
image: /images/react-state-rendering.png
imageWidth: 1200
imageHeight: 628
imageAlt: Two explorers discovering a new idea about React

draft: true
---

- A program that embodies SoC well is called a modular program
- Modularity is achieved by encapsulating information inside a section of code that has a well-defined interface.
- Encapsulation is a means of information hiding.
- Layered designs are another embodiment of separation of concerns (e.g., presentation layer, business logic layer, data access layer, persistence layer).

## Benefits

"Separation of concerns results in more degrees of freedom for some aspect of the program's design, deployment, or usage. Common among these is increased freedom for simplification and maintenance of code. When concerns are well-separated, there are more opportunities for module upgrade, reuse, and independent development."

An important part of SoC is creating interfaces between different sections of code. This enables developers to modify and/or improve the implementation of one section without knowing details of other sections or having to make corresponding changes in other sections.

## Drawbacks

Separating concerns means creating abstractions. Abstractions mean code to integrate sections together. Execution takes a small hit. But more importantly to consider are the difficulties in designing intuitive and scalable APIs.
