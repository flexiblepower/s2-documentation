---
title: Implementations
sidebar_position: 2
---

# S2 Connect implementations

S2 Connect allows for full interoperability between Resource Managers and Energy Management Systems in local, cloud and hybrid deployments. It is quite some work to implement the [S2 Connect specification](/s2-connect/1.0.0/discovery-pairing-authentication/). Therefore, S2 Connect is implemented in libraries for several programming languages. The goal is to have libraries with a clean API for the discovery, pairing and S2 session initiation process that shields all the implementation details from the users of the libraries such that they can focus on the real work of creating Resource Managers and Energy Management systems.

## Language overview
- **Rust**: currently the most complete implementation. S2 Connect is implemented in the [S2-Rust library](https://github.com/flexiblepower/s2-rust).
- **Python**: a work in progress. The implementation is currently in a private repository but if you are a Python developer and interested in contributing, please reach out on [discord](https://discord.com/invite/NyFMEPmuDw).
- **C**: a work in progress by [Inversable](https://inversable.com/). Will be published open source soon.
- **Go**: a work in progress.

## Feature overview
The main efforts have been put into the implementation of S2 Connect in Rust and Python. Below is an overview of the current implementation status.

| Feature | **Rust** | **Python**|
|---|---|---|
| WAN discovery | ❌ | ❌ |
| LAN discovery | ✅ | ❌ |
| Pairing Client | ✅ | ✅ |
| Pairing Server | ✅ | 🚧|
| Pairing API | ✅ | ❌ |
| Session initiation | ✅ | 🚧 |
| Unpairing | ✅ | 🚧 |

There is important note about Rust implementation: the specification says that there must be a rate limiting on the pairing process of one pairing per node_id per second. This is not yet implemented in Rust.

## Help wanted
There is still a lot of work to do. So if you like to contribute, have a look at the open issues, pick one, start the implementation and open a pull request. We would also like to get in touch with you on [discord](https://discord.com/invite/NyFMEPmuDw) where we can also discuss technical decision for the implementation of S2 Connect.