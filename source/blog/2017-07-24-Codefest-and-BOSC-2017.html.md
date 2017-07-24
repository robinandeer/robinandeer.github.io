---
title: "Codefest and BOSC 2017 in Prague 🏰🇨🇿"
category: tutorials
author: Robin Andeer
date: 2017-07-24
tags: tutorial, python, authorization, authentication, flask

description: >
    Summary of my experiences at Codefest and BOSC 2017. I was here for the third year in a row  and it's been my most productive attendance yet!
image: /assets/img/bosc-prague-2017.png
---

This was the third year in a row(!) I attended Codefest and BOSC. I could say it's my favorite conference but I really haven't got too much to compare with 😅 On the other hand, I've been so happy with BOSC that I've stuck with it and deepened relationships with the other frequent attendees.

![BOSC lecture](/assets/img/bosc-prague-2017.jpg)

Prague hosted us this year - a lovely city with nice accommodations, cheap food, and a walkable city center. Now that I think of it, besides the warm weather, basically the opposite of 2016's host: [Orlando](http://www.robinandeer.com/blog/2016/07/12/bosc-2016/)...

## Codefest 2017

Every year, Brad Chapman organizes a much appreciated two-day event where BOSC attendees meet up and work on individual or collaborative projects. It's a great opportunity to get to know international collegues and exchange solutions to whatever problems you are tackling.

The turnout this year was quite epic with about 60 people joining! Unfortunately that only includes a few locals and the gender gap _widened_ from last year. We did, however, have a nice "Birds of a Feather" (self-organizing discussion groups during BOSC) on diversity where we realized some improvements we can work on. To avoid making possible attendees feeling intimidated, we should introduce the event as more of a shared work space - you can totally come and work on your own thing! Another idea is to seed the Google Docs list of "things you can work on" with some non-code related topics like providing documentation to offset the idea that you have to contribute code to any of the established projects.

### MultiQC contributions!

Having said that, I once again joined forces with the [MultiQC](http://multiqc.info/) task force to work on some features that would directly benefit me in my daily job. More specifically I came away with a few pull requests:

- Adding support to Scout for loading and displaying MultiQC reports ([Clinical-Genomics/scout/pull/564](https://github.com/Clinical-Genomics/scout/pull/564))
- Handling RegExp errors more gracefully in the HTML reports ([ewels/MultiQC/pull/504](https://github.com/ewels/MultiQC/pull/504))
- Adding a new option and revamping documentation for cleaning sample names ([ewels/MultiQC/pull/520](https://github.com/ewels/MultiQC/pull/520))

The group collaborated really well and worked productively with a final tally of 18 opened and 14 merged pull requests: amazing!

A big thanks to [Brad Chapman](https://twitter.com/chapmanb) and [Heather Wiencko](https://twitter.com/HLWiencko) who once again put together a great event - BOSC wouldn't be the same without it! Also big thanks to [Matúš Kalaš](https://twitter.com/matuskalas), our awesome "local" (actually Slovak) guide who showed us some very nice food/beer spots and handled communication with the locals.

![Cross Club Cafe](/assets/img/bosc-prague-2017-restaurant.jpg)

## Bioinformatics Open Source Conference (BOSC) 2017

The conference itself opened with a slew of [Common Workflow Language](http://www.commonwl.org/) (CWL) talks. Not so unexpected 😉. The project seems very healthy and gaining more and more support. Besides the spec work, I was impressed by the [SevenBridges][seven] efforts in building supporting tools like an executor (to support the CWL protocol and e.g. SLURM HPCs) and a very cool workflow editor - all of which [launched in beta][launch] during the conference! This is exactly the kinds of efforts I've been waiting for to come out of the CWL project 🎖

With that said, it's getting rather complex to understand how all these layers of tools come together. CWL and [WDL](https://software.broadinstitute.org/wdl/documentation/structure.php) (from Broad) work at the lowest level of defining tools and workflows. The next layer hooks into these definitions, but only optionally. You could still build your pipelines directly in e.g. Nextflow, Toil, Galaxy etc. Depending on your picks you now deploy to a number of processing platforms: AWS, Google Cloud, SLURM, SevenBridges Cancer Genomics Cloud, etc. Usually, the universal runtime is enabled through Docker and/or Singularity.

### BioThings API - one API to rule them all

As a part of my interest in visualization and building web interfaces, I was happy to hear the talk on [Biothings explorer](http://biothings.io/). It touches on the issues around harmonizing various genomics APIs and gene/transcript identifiers - not a trivial task indeed! If it works as advertised I know our team would be very interested. It's certainly rough around the edges but along with accompanying tools like [MyGene.info](http://mygene.info/) it could be a great foundation for building genomics web interfaces.

### Software packaging

I also liked the talks around software packaging. There's a few tools that stand out: containers, Conda, and Guix. For workflows and running software in the cloud - Docker seems to be the way to go for a lot of tools: CWL, Nextflow, etc. Interestingly Conda and Bioconda are gaining a lot of traction in integration with tools like Galaxy. Bioconda also announced that if you publish your tools there, you will get automatic and optimized Docker and [Singularity](http://singularity.lbl.gov/) images created for free!

#### Singularity and uDocker

I've heard some talk about Docker alternatives but BOSC was the first time I got some details on the Singularity container format. The gist I got was that while Docker is for long running services, Singularity is more aimed at time-limited task execution on clusters. As such, while Singularity needs root to install it runs containers as user.

A further option that came up during a Codefest conversation is [udocker](https://github.com/indigo-dc/udocker), a minimal Docker runtime that works completely without elevated privileges! I will definitely check it out for testing internal software deployments.

#### GNU Guix

The last alternative, [Guix](https://www.gnu.org/software/guix/), takes a different approach inspired by functional programming principles. They automatically keep track of ALL your software dependencies which means you can bundle software that will install on any system - whether they have Guix or not! They can also create Docker images - which will give you a distribution "with the overhead of Docker" 😉. Unlike conda, it does not, however, support either Mac or Windows which is kind of a bummer for me as I really like to share tools between my local and production environments.

### Misc. tools

Furthermore, I came away from the conference with a long list of links to investigate. Here's are some interesting things worth checking out:

- [Cavatica](http://www.cavatica.org/): a good looking data analysis and sharing platform for pediatric genomics.
- [EdinburghGenomics/well_duplicates](https://github.com/EdinburghGenomics/well_duplicates): a tool for quickly detecting duplicates in any organism without need for demultiplexing or alignment!
- [Zooma](http://www.ebi.ac.uk/spot/zooma/): an automatic free text parser for extracting curated ontology terms.

Finally I also learned that if I want to publish papers I should start with [Journal of Open Source Software](http://joss.theoj.org/) (JOSS); nicely introduced at BOSC by [Pjotr Prins](https://twitter.com/pjotrprins) and edited by, among others, [Roman "full-stack" Valls](https://twitter.com/braincode).

--------------------------

Thanks everyone who presented, organized, attended, chatted, coded, entertained, drank beer, and lent me money during these days in Prague! Who knows, maybe we meet next year in Portland, Oregon.


[seven]: https://www.sevenbridges.com/
[launch]: http://rabix.io/launch
