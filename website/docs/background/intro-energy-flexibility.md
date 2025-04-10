---
title: "Introduction to Energy Flexibility"
sidebar_position: 0
---

# Energy Flexibility

<!-- ## What is S2?
S2 is the short name for the EN 50491-12-2 standard for in building energy management. It is a protocol for the energy management of energy intensive devices found in the build environment, such as photovoltaic (PV) systems, electric vehicle (EV) chargers, batteries, (hybrid) heat pumps and white goods. It is specifically designed to utilize energy flexibility. It is built in such a way that it can work with any flexible device from any manufacturer, and that it would work for any energy management use case. It is not meant to replace existing protocols for energy management, but rather to provide a universal language for energy flexibility in the build environment. -->

## What is energy flexibility?
Most energy intensive devices have some kind of comfort target. For example, an EV charger needs to make sure the car is sufficiently charged at a certain time, and a heat pump needs to make sure the room has the right temperature and that the shower has hot water. However, when these devices consume or produce energy typically has some flexibility. For example, as long as the car is sufficiently charged at the desired time, an EV charger might delay charging a while or might charge with less power. A heat pump might generate a bit more heat at some point, so it doesn't have to do it later. This flexibility in when a devices consumes or produces energy, without sacrificing the comfort targets, is what we refer to as energy flexibility.

## Why do we need energy flexibility?
We want to integrate more renewable energy sources in our power grid, such as wind and solar. The power grid transports this energy, but it cannot store it. That means that at any moment the amount of energy that is produced must be in balance with the amount of energy being consumed. That is possible when electricity is produced by controllable power plants, but not when energy is produced by wind turbines and PV systems that only produce energy when there is wind or when the sun is shining. The more wind and PV we add to the energy mix, the harder it becomes to balance production and consumption, effectively limiting the amount of renewable energy we can add to the power grid.

In addition, we start to replace fossil fuels with electricity for applications such as heating buildings (e.g. with heat pumps) and mobility (electric vehicles). We also start producing energy locally (e.g. with PV and Combined Heat and Power). At many places, the power grid was not designed for these applications, which leads to congestion on the power grid. 

By utilizing energy flexibility, we can not only influence when electricity is produced, but also when it is consumed. By utilizing the energy flexibility of many devices, we can help balance the power grid, which allows us to integrate more renewable energy into our power grid. It also allows us to alleviate congested areas of the power grid, reducing the costs of grid maintenance and providing more room for new applications for electricity. Many flexible devices together can have a huge impact on the power grid, without having a significant impact on user comfort. Energy flexibility provides an attractive alternative to costly energy storage solutions.

## Why do we need a common protocol for energy flexibility?
Most modern devices are capable of connecting with with other systems, such as connecting with a smartphone app through the internet. But there are so many different types of devices, different brands and different models, which almost all have their own interfaces (API's). If you want to build an energy management system, you will need to spend development effort for each and every type of device you want to support. It is practically impossible to develop an energy management system that can interact with all common products on the market.

On the other hand, there are many types of optimizations an energy management system can do using energy flexibility. Which ones are desired very much depend on your local situation (e.g. technical installation, laws, incentives, contracts) or your goals (e.g. being self sufficient, reducing your energy bill). Just to name a few:
* Ensuring the power stays below the capacity of the main fuse
* Directly using electricity when your own PV panels produce it
* Using energy when it is the cheapest, for example with hourly tariffs
* Using energy when the most renewable electricity is generated
* Reacting on congestion signals from the power grid
* Sharing energy as much as possible within a community
* Utilizing energy flexibility to trade on energy markets or to provide balancing services

With a common protocol for energy flexibility, any device can work with any energy management system. With a common protocol for energy flexibility, you are free to choose which devices you buy *and* the energy management system that optimizes energy flexibility the way you want.

For more information on why S2 was designed the way it was designed, take a look at [Why the S2 approach?](/docs/background/why-the-s2-approach.md).

## How does S2 relate to other protocols for energy management?
How S2 relates exactly to another protocol of course depends on the other protocol. But most protocols out there tend to pick a type of device (e.g. EV charger, white goods) or pick an optimization (e.g. tariffs, grid signals). S2 is unique in that it is agnostic to both aspects.

## What is s2-ws-json?
S2 was designed as a semantic protocol, which can have multiple, mutually compatible, implementing protocols. Different devices might prefer a different form of communication. For example, you can have a version of S2 which uses bluetooth, and another version which uses KNX. These versions differ in the transport protocol they use, but typically also in the way they encode data. Since both protocols are based upon the same S2 specification, one S2 implementing protocol can easily be translated into the other version using a simple software adapter.

S2-ws-json is a protocol specification which implements the S2 protocol using the common web technologies WebSockets and JSON. S2-ws-json can be used for:
* in-building communication between device and energy management system using a wired (Ethernet) or wireless (Wi-Fi) network
* communication between a device in the building and an energy management system in the cloud
* communication between a device endpoint in the cloud with an energy management system in the cloud
* communication between a device endpoint in the cloud and an energy management system in the building
* communication between different modules inside an energy management system
