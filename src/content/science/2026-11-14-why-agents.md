---
title: Why I simulate people one by one
date: 2026-11-14
description: Agent-based models, and why a city can test a policy on simulated commuters first.
draft: true
tags: [agent-based models, cities]
---

> **Sample post.** Rewrite or delete this file: `src/content/science/2026-11-14-why-agents.md`. The Spanish version is in `src/content/science/es/` with the same file name.

Many physics models use averages. For some social questions, averages hide the answer.

Example: a **low emission zone**. A city bans old cars in the centre. An average model says that emissions in the centre decrease. It does not say:

- which drivers change to the bus, which drive around the zone, and which stop the trip;
- if the detour traffic moves pollution to the streets near the zone;
- who pays for the cleaner air, in time or money.

An **agent-based model** simulates each person as an agent with a daily plan. The agents interact on roads and buses. Then we look at the result.

## A small equation

Agent $n$ selects option $i$ (car, bus, bike) with the logit probability

$$
P_n(i) = \frac{e^{\beta V_{ni}}}{\sum_j e^{\beta V_{nj}}},
$$

where $V_{ni}$ includes travel time, waiting, cost and transfers.
