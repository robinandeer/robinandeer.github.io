---
title: On using Atom
category: reflections
author: Robin Andeer
date: 2016-09-09
tags: thought, atom, editor, sublime text, compare
intro: A summary of the good, bad, and ugly experiences from using the Atom editor.
---

I'm composing this post in a slightly unfamiliar environment; [Atom][atom] - the [Electron][electron]-based text editor from GitHub. Previously, I've been a happy [Sublime Text][subl] user and haven't seriously considered switching. However, I love exploring new tools and Atom keeps popping up on Hacker News while receiving praise from my colleagues.

Now I've been using it as my main editor for the past week and thought I'd share some of my experiences.

<figure><img src="/images/atom-sublime.png" alt="Sublime vs. Atom"></figure>

## The good

Atom is a great editor. I like Atom. Since I first tried it out, it's matured really well. Visually it looks great! Especially after applying the Sublime-port of the material theme/syntax (`atom-material-ui`, `atom-material-syntax`) This is an important point, at least to me.

But this doesn't make Atom stand out.

The Atom plugin ecosystem is what does it for me. I was having a field day last Monday, browsing the registry and blogs for interesting add-ons. Some of the ones I'd like to highlight:

- `project-manager`: of course, essential tool for dealing with multiple projects (see below for more comments)
- `save-session`: to mimic Sublime's way of saving the state of projects no matter if you've hit `cmd+s` or not!
- `linter`: extensible framework for linting anything from English (`linter-alex`) to Dockerfiles (`linter-docker`). For Python, I picked the "one-ring-to-rule-them-all"-solution: `linter-pylama`.
- `file-icons`: puts little icons in your sidebar based on file type

And best of all: having a built in package manager is such a relief! 😅

The comparison to Sublime is hard to get away from. It's no secret that Atom borrows liberally from "the editor you'll fall in love with". And for me this just makes things easy: coming from ST feels very natural! Keyboard shortcuts are the same and many of ST staples like multiple cursors work the same, perhaps lacking a little finesse 😉

Another lauded Sublime feature is the JSON-based configuration. This is a point that I think Atom has rightly copied _and improved_. By adding a GUI form on top of the configuration they make it more beginner friendly but also much easier to discover all the possible options you are presented with.

## The bad

Start up times. As far as I understand, this is a [known pain point][slow] for Atom. Perhaps Electron-apps in general. In either case, it gives me a feeling of sluggishness that reminds me of why I'm _not_ using an IDE. However, since I leave my editor open for most most of the day it shouldn't matter too much.

Unless...

## The ugly

There's an excellent project manager in Atom (`project-manager`) that has been ported to Sublime. It's become deeply ingrained in my workflow. I'm used to switching projects at lightning speeds! What surprised me is how slow this seemingly simple task is in Atom. Most of the time I have to wait **5-7 seconds** for a few files to load. This is a more difficult issue to work around.

## Conclusion

Atom is great. Sublime is great. Neither one of them is going to hold you back. A developer's editor is a deeply personal choice. As for me, **I will continue using and endorsing Sublime**.

Yes, it's not open source, nor free. However, I'm not dogmatic about the former and I happily paid for my Sublime license. Supporting developers comes naturally for me.

Yes, the Atom ecosystem has impressed me a lot. If I would consider switching from Sublime, it would be because it stopped receiving updates or if the 3rd party ecosystem falls too far behind.

[atom]: https://atom.io/
[electron]: http://electron.atom.io/
[subl]: https://www.sublimetext.com/
[slow]: https://discuss.atom.io/t/why-is-atom-so-slow/11376
