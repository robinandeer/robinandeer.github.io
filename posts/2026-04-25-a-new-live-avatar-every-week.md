---
title: A new live-avatar platform launches every week. So I started building.
category: reflections
author: Robin Andeer
date: 2026-04-25
tags: reflection, ai, avatars, developer-experience
intro: Why I'm spending evenings building the same small app on every live-avatar platform I can find.
image: /images/live-avatars/poster.jpg
imageAlt: Hand-drawn scene — person in a teal hoodie at a desk with a microphone and laptop; the screen shows a live digital avatar, with a mug and plant nearby.
imageWidth: 1200
imageHeight: 668
imageVideo: /images/live-avatars/poster-hero.mp4
---

*I work at Runway on [Runway Characters](https://runwayml.com/product/characters), which is one of the products in this space. These posts are personal — my own opinions, on my own time, not Runway's. I won't be reviewing Runway; that would be weird.*

It feels like every couple of weeks another live-avatar company shows up on my radar. [Anam](https://www.anam.ai), [Tavus](https://www.tavus.io), [LemonSlice](https://www.lemonslice.com), [Hedra](https://www.hedra.com), [Simli](https://www.simli.com), [Beyond Presence](https://www.beyondpresence.ai), [bitHuman](https://www.bithuman.io), [HeyGen Interactive](https://www.heygen.com) — the [LiveKit avatar plugin directory](https://docs.livekit.io/agents/integrations/avatar) alone lists more than a dozen, and that's just the ones that bothered to ship a LiveKit integration. They all promise the same thing: drop in a component, get a talking head that can hold a conversation.

The way we got here is kind of funny. First we *chatted* with our agents. Then we started whispering to them like Sarah Guo explains on a [recent No Priors episode](https://youtu.be/kwSVtQ7dziU?si=3YBAojpMKdJjlUHn&t=195):

> none of the engineers write code by hand and they're all microphoned and they just like whisper to their agents all the time. it's the strangest work setting ever.

The obvious next step: put a face on them.

Voice synthesis already has its default — [ElevenLabs](https://elevenlabs.io) has more or less consolidated the category. The avatar space is still an open race, with dozens of platforms in the running and no obvious winner yet. I find that genuinely exciting.

I wanted to actually build with each one. A landing page will sell you a compelling story; the nitty-gritty only shows up once you're in the weeds with the SDK. So for each platform I build the same small app: a storefront where the avatar acts as a shopping assistant — uses tools to look up orders, search a knowledge base, and drive the UI.

I'm not doing quantitative benchmarks here — latency p95s, interruption-handling metrics, LLM eval scores. That stuff is worth its own writeup, just not what I'm interested in right now. What I do care about is the **visual layer** (the one thing no model swap can change) and the **developer experience** (the thing that determines whether anyone actually ships with this stuff).

I'm rooting for this whole vibrant space — but I'll still be honest in my takes. If anyone wants to do the same to [Runway Characters](https://runwayml.com/product/characters), even better.

**First up:** [Anam](https://www.anam.ai). I'll write up what it was like to wire the SDK into the little storefront, what surprised me, and what I'd change — then move on to the next platform. Watch this space.
