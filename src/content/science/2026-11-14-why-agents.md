---
title: Why I simulate people one by one
date: 2026-11-14
description: A short note on agent-based models, and why a city might want to run thousands of imaginary commuters before drawing a line on a map.
tags: [agent-based models, cities]
---

> **Starter post.** Claude wrote this as a sample to show how posts look. Rewrite it, keep it, or delete the file `src/content/science/2026-11-14-why-agents.md`.

Most models in physics start by averaging: you stop caring about individual molecules and talk about pressure and temperature. For many social questions that works surprisingly well. But some questions don't survive the averaging.

Take a **low emission zone**. Draw a line around a city centre, ban the oldest cars inside it, and ask: what happens to pollution? An average-based model will tell you that emissions inside the zone go down. What it won't easily tell you is

- which drivers switch to the bus, which ones take a longer road *around* the zone, and which simply stop making the trip;
- whether the detour traffic pushes pollution into the neighbourhoods just outside the line;
- who ends up paying, in time or money, for the cleaner air in the centre.

Those answers depend on *who* is doing *what*, *where*, and *when*. That's the niche of **agent-based models**: you simulate each person as an agent with a daily plan, preferences and a bit of memory, let them interact through a shared world (roads, buses, other people), and watch what emerges.

## A tiny bit of maths

Each agent $n$ compares options $i$ (car, bus, bike…) through a utility, and picks one with the familiar logit probability

$$
P_n(i) = \frac{e^{\beta V_{ni}}}{\sum_j e^{\beta V_{nj}}},
$$

where $V_{ni}$ bundles travel time, waiting, cost and transfers. Iterate days, let agents learn from what happened yesterday, and the city settles into a (stochastic) equilibrium. Then you change the rules and do it again.

## What's coming here

This section will collect notes on the projects I work on: mobility simulators, epidemics, cooperation between humans and AIs, and digital twins of cities. Some will be explainers like this one; some will be the story behind a paper.
