---
title: Por qué simulo a las personas una a una
date: 2026-11-14
description: Modelos basados en agentes, y por qué una ciudad puede probar una política con viajeros simulados.
draft: true
tags: [modelos basados en agentes, ciudades]
---

> **Entrada de ejemplo.** Reescribe o borra este archivo: `src/content/science/es/2026-11-14-why-agents.md`.

Muchos modelos de física usan promedios. En algunas preguntas sociales, los promedios esconden la respuesta.

Ejemplo: una **zona de bajas emisiones**. La ciudad prohíbe los coches antiguos en el centro. Un modelo promedio dice que las emisiones del centro bajan. No dice:

- qué conductores cambian al autobús, cuáles rodean la zona y cuáles dejan de viajar;
- si el tráfico desviado lleva la contaminación a las calles cercanas;
- quién paga el aire más limpio, en tiempo o en dinero.

Un **modelo basado en agentes** simula a cada persona como un agente con un plan diario. Los agentes interactúan en carreteras y autobuses. Después miramos el resultado.

## Una ecuación pequeña

El agente $n$ elige la opción $i$ (coche, autobús, bici) con la probabilidad logit

$$
P_n(i) = \frac{e^{\beta V_{ni}}}{\sum_j e^{\beta V_{nj}}},
$$

donde $V_{ni}$ incluye tiempo de viaje, espera, coste y transbordos.
