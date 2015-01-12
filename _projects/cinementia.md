---
layout: project-base
permalink: /projects/cinementia/
title: cinementia
position: 5
---

## Concept
Cinementia is an attempt to make a simple yet addictive game around how well you remember single screenshots from various movies.

This project is live at: [www.cinementia.com](http://www.cinementia.com)

This is my attempt to produce a brief introduction/ad video:

<iframe width='800' height='450' src='http://www.youtube.com/embed/pKFD81qqInU?rel=0' frameborder='0' allowfullscreen></iframe>

## Story
Two things inspired me to create the project. First of all I was facinated how an entire movie could be summed up in a single frame.

![Game](/assets/img/cinementia/game.png)

Secondly I couldn't stop obsessing over title sequences. What font did they go for? Was is placed off center and why? Was it intricate or straigt forward?

![Title](/assets/img/cinementia/title.png)

The end result is simple enough. However, just below the surface the ambition level rises steeply. Consider first that I had my mind set on hand-picking every single screenshot from the movies. Add to that, the fact that I recreated every single title screen in photoshop to be ablo to export a transparent PNG.

It wasn't that I didn't like the end result, but I definatly felt like I put to much effort in the wrong place rather than "walking the extra mile".

![Win](/assets/img/cinementia/win.png)

Anyone that has tried their luck at creating a quiz game will regonize the difficulty in finding the right balance between too difficult and too easy.

*Cinementia* didn't feature the 4 options from start. The inital idea was to have the user input the movie title without help. I quickly realized it would be way to hard, but only after some initial user testing.

Next up I tried 4 completely random options to go with each frame. That turned out to be to easy since most of the time you could *easily* exclude three of the options if you didn't already know the answer from the start. I eventually settled for 4 random titles but still *within* the same genre as the correct answer.

![User](/assets/img/cinementia/user.png)

## Technology
I'm not proud to say but the jQuery-based frontend unabasheldly stores alot of the business logic in the id-properties of various HTML-tags. I've come a long way since then.

The backend is hosted and powered by Google's [AppEngine](https://developers.google.com/appengine/?csw=1) platform. I never managed, however, to work out the built in datastore, which is why a few odd XML-files serve as an adhoc database.

A version 2.0 has been in works for quite some time. The plan was focused around a central user database and leveling system. I was also learning Backbone.js at the time but quickly ran into the infamous nested views hassle and eventually had put the project on ice (indefinatly).
