---
title: "Introduction"
sidebar_position: 0
pagination_next: null
pagination_prev: null
---
# Introduction
Here you can find a lot of helpful documentation for developers about the S2 Standard and the implementing protocol. What is the S2 standard? And what's the implementing protocol? Let's clear up that first!

## The S2 Standard
S2 is a standard for energy flexibility. Primarily meant for energy flexibility from devices that you will find in the residental setting. Think of Electric Vehicle Chargers, PV panels, Heat Pumps, Boilers, Batteries etc. It is designed to work with any flexible device from any manufacturer, and is applicable for all energy management use cases. It is not meant to replace existing protocols for energy management, but rather provide a universal language for energy flexibility in the build environment.

The standard has been approved by European Standardization bodies through CEN/CENELEC and is officially referred to as `EN 50491-12-2`, but it just called S2. The official standard contains the definition of the datamodels, specifies the roles and the interactions between the rols, i.e. it only a semantic protocol. Following the design principle of separation of concerns, the standard does not specify how the data must be encoded, serialized and transported but leaves that up to the implementing protocol specifications.

## Implementing S2 protocol specifications
As the S2 standard is a semantic protocol, it needs an underlying implementing protocol that allows for data communication. Different devices might prefer a different ways of communication. For example, you can have a version of S2 that uses bluetooth, and another version that uses KNX. These versions differ in the transport protocol they use, but typically also in the way they encode data. Since both protocols are based upon the same S2 specification, one S2 implementing protocol can easily be translated into the other version using a simple software adapter.

An important implementing protocol is `S2-ws-json`. It is an open source specification using common webtechnologies that allow for IP-based communication of the S2 standard. A key feature of the specification is that it allows for device connections and energy managers to run on-premises (LAN) or in the cloud (WAN), in all possible combinations.

## What's next?
For reading a bit more about energy flexibility in general and how S2 relates to it, you can find more information [here](/docs/Background/Intro_energy_flexibility.md).

If you want to know more about the design principles of S2, you can continue reading here at [link](/docs/Concepts/Architecture.md).

Before starting to implement S2, make sure to familiarize yourself with the [concepts](/docs/Concepts/Architecture.md).

More information about the implementing protocol specification is provided [here](/docs/S2%20Json%20over%20Websockets/Introduction.md).

If you want to read about how to model energy flexibility from some typical devices, head over to the [examples](/docs/Examples/Example_EV.md).