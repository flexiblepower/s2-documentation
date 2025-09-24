---
title: Accepted crypto algorithms
sidebar_position: 4
---

## Introduction

In the [discovery and pairing specification](./discovery-pairing-authentication.md) a description is given of the required communication layer. This layer includes a description of encryption requirements. Because the security levels given by different crypto algorithms change continuously, this page contains the accepted crypto algorithms for the S2 protocol. Keep in mind that this will change over time.

At the moment, we refer to the Mozilla guidelines in: [Server Side TLS](https://wiki.mozilla.org/Security/Server_Side_TLS). In the future these Mozilla guidelines will change, and S2 might have it's own list of accepted algorithms.

## Accepted algorithms will change

As mentioned in the introduction, due developments in crypto technologies, security levels of known crypto algorithms will change over time. Algorithms that were considered safe 10 years ago, are unsafe at the moment. And algorithms that are considered safe today, might be vulnerable to new attacks in 5 years, or even tomorrow. And as we prepare for the imminent transition to post-quantum cryptography, our perception of the security of algorithms will most likely change.

Therefore, this list will continuously change, and kept up to date. However, to engineer future proof systems, S2-nodes **SHOULD** be able to update their used crypto libraries, and hardware **SHOULD** be over-dimensioned. So, if the used crypto becomes obsolete newer, and possibly heavier, algorithms can be installed on the S2-node. When changes are made to the list of accepted crypto libraries, all S2Nodes **MUST** follow these changes within half a year.

## Accepted algorithms

At the moment, we consider the guidelines give by Mozilla in [Server Side TLS](https://wiki.mozilla.org/Security/Server_Side_TLS) on the level **Modern** as secure for usage in S2. 