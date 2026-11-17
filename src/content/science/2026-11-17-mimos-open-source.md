---
title: MiMoS is now open source!
date: 2026-11-17
description: An agent-based simulator of urban mobility, from my PhD thesis, is now public on GitHub.
tags: [agent-based models, cities, software]
draft: false
---
I have released **MiMoS** (Microscopic Mobility Simulator), an agent-based simulator of urban mobility, as open-source software. The code is on GitHub: **[github.com/jeslop013/MiMoS](https://github.com/jeslop013/MiMoS)**.

![Cars, bikes and buses (left) and NOx emissions per road (right) during the morning peak of the example town](https://raw.githubusercontent.com/jeslop013/MiMoS/v0.1.0/docs/gallery/demo_side_by_side.gif)

## What it does

MiMoS follows every person of a synthetic city through their day. Each agent plans its trips, chooses between walking, cycling, driving and public transport, and then travels through a simulation of the streets, buses and trains. After each simulated day, agents remember how their trips went and adjust their choices. The process repeats until the travel patterns settle.

From one run, you get:

- who travels where, when, and by which mode;
- how long each trip takes, from door to door;
- where and when queues form on the roads;
- how full the buses are;
- what the car traffic emits, road by road and hour by hour.

The core is written in C++ for speed, and you control it from Python or the command line. The outputs are an interactive HTML report, figures and videos.

## Try it in a few minutes

You don't need any data. MiMoS can generate a made-up town (an old centre, suburbs, a ring road, a river with bridges and bus lines) and simulate it:

```
git clone https://github.com/jeslop013/MiMoS.git && cd MiMoS
uv sync
uv run mimos demo --video
```

You can also [browse the interactive report of the demo town](https://jeslop013.github.io/MiMoS/gallery/report.html) without installing anything.

## Background

I introduced the model in my PhD thesis at IFISC (CSIC-UIB), *[An Agent-Based Journey in Social Systems Research: Motivations &amp; Applications](https://ifisc.uib-csic.es/en/publications/an-agent-based-journey-in-social-systems-research/)*. José J. Ramasco and I designed the model together, and I developed the software. MiMoS was originally developed within the NEXT4MOB project of the CSIC platform PTI Mobility 2030.

This is version 0.1.0: it works, but development continues. Next on the list are richer travel behaviour, public transport from GTFS timetables, low-emission zones, and importers for OpenStreetMap and GTFS. The [roadmap](https://github.com/jeslop013/MiMoS/blob/main/docs/roadmap.md) lists all of it.

The code is under the GPL-3.0 license. Questions, issues and ideas are welcome on [GitHub](https://github.com/jeslop013/MiMoS/issues).
