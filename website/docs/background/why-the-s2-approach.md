---
title: "S2 Design Principles"
---

# Why the S2 approach?
There any many methods and models you could use for utilizing energy flexibility. Why do it the S2 way instead of some other way?

Energy flexibility isn't some physical phenomenon that needed to be modeled. If that were the case, all protocols for energy flexibility probably would have looked very similar. Instead, coming up with a solution for energy flexibility requires a lot of creativity. If you start with different requirements, or even prioritize them in a different way, you will end up with wildly different models, mechanisms and protocols for energy flexibility.

Unfortunately that means that there are several, conceptually incompatible solutions out there. Comparing S2 to all of them is a challenge. We'll start by explaining what the starting point of designing S2 was.

S2 makes one very clear separation of responsibilities: The RM is concerned with _how_ a flexible device can behave, and the CEM is concerned with _why_ it should behave a certain way. Almost any energy flexibility solution that makes this separation as well can be made compatible with S2. However, if you have a solution that doesn't do this (e.g. a solution that sends energy tariffs directly to the device), probably isn't compatible with the S2 architecture.

## S2 design principles
These are the design principles that have led to the S2 protocol as it is today.

### Energy flexibility from the built environment can only be successful if there is interoperability
In the built environment there is a huge potential for energy flexibility. But unlocking that energy flexibility is a huge challenge, since there are so many types devices out there (EV charging, heat pumps, batteries...), so many different brands of devices, and almost as many different protocols and specifications to communicate with the device. And on top of all of that, what you want to do with that flexibility highly depends on local incentives and regulations, which would require different EMS implementations. The biggest challenge is allowing all these different devices to communicate with all these different EMS's.

S2 aims to solve this interoperability issue. It's not a solution for only EV charging, or only heat pumps, or only for time of use tariffs; it's a solution for any form of flexibility. That's why S2 doesn't aim to model any small mechanism any device has to deviate from its normal behavior; instead it tries to capture the majority of the energy flexibility without being overly complex to implement. It's aimed to allow any energy flexibility use case to be implemented with any device; not necessary to squeeze every last drop of energy flexibility out of every device.

However...

### Energy flexibility is scarce and valuable
The energy transition will introduce a huge need for energy flexibility. A need that is currently not fulfilled. If we go through the trouble of unlocking energy flexibility, we need to make it count. For the power grid, and for the consumer. That is why S2 doesn't oversimplify things and uses models that are maybe easy to implement, but also lose most of its power. S2 is the result of many years of experimenting, and a lot of care has been spent on making S2 not too complex, but not too simple as well.

### We won't settle on one energy flexibility utilization mechanism
There any many things you could do with energy flexibility, with a huge variety in complexity. Increase self-consumption, participate in a Virtual Power Plant, participate in a Peer-2-peer energy market... S2 was designed with the assumption that the mechanisms we use for unlocking energy flexibility will keep on changing while we go through the energy transition. New use case will pop-up, new business models we be created, new contracts will be offered to consumers. In addition, new technologies will be developed. Technologies as blockchain and AI might have a huge impact on the use cases we will have for energy flexibility in the future.

The only way we can make all these innovation reality, without requiring the consumer to buy new hardware every time something changes, is if we have a solid basis on which we could implement every step in the evolution of energy flexibility. S2 was designed to be that solid basis, by not making any assumptions on the mechanism that will be used or the use cases it will be used for.

### A protocol can only be successful if it is easy to understand
S2 was carefully designed to be not too complex to understand and implement, but at the same time to be powerful enough to communicate as much as possible energy flexibility to the EMS. S2 is the result of years of experimentation and making adjustments, until a level of complexity was reached that felt juuust right.

### A protocol can only be successful if it doesn't tell you how to do your job
S2 is merely a language to communicate energy flexibility. It tells you how a CEM and a RM should talk to each other and what their responsibilities are, but it doesn't say anything on how they should be implemented, what they should do or who they are allowed to talk to. It also doesn't tell you where technology should be deployed (e.g. locally or in the cloud). It gives every party involved the total freedom to use any technology, architecture, other protocols or business model they feel is right for them. That's the only way we can make sure innovation can still happen in the future. S2 is a minimal set of rules for communicating with each other; what you'll do with it is completely up to you.

### The device is always in charge
The device manufacturer is always in charge of a safe operation and user comfort. Manufacturers probably won't like it if customer complain to them their device doesn't function as intended, while the cause of the problem is an EMS that sent wrong instructions. That's why in S2, an EMS is never directly controlled by the device. You can think of it as suggestions, that the device under normal conditions should accept, but never is obliged to.

The combination of device and RM can determine the amount of control from the EMS in two ways:

* The RM informs the CEM what kind of instructions it is allowed to send the RM (what that looks like depends on the Control Type). And the device can change this at any moment in case something changes. A correct CEM implementation will never send instructions the device doesn't want to receive.
* Even then, a RM can always reject instructions from the CEM for whatever reason.

### Focus on one thing and do it well
When creating a communication protocol for smart devices there is always the temptation of including just a little more functionality that would be very useful, such as information about EV charging sessions, meter readings, billing, power quality, debugging... But that's not what S2 does. S2 to aims to do one thing and do that really well: communicating energy flexibility information and its activation. When it comes to interoperability, less is more. By specifying less, S2 needs fewer assumptions or what systems look like or aim to do and the broader it can be applied. And becomes easier to implement.

You are free to use or specify any other form of communication parallel to S2. Do whatever makes sense in your context.


## Frequently asked questions
These are some frequently asked questions regarding the design decisions of S2. Do you have a question as well? Feel free to [open an issue](https://github.com/flexiblepower/s2-ws-json/issues/new).

### Can I use S2 to aggregate multiple devices into one virtual device?
Short answer: You shouldn't (but we're also not stopping you if you really want to)

The idea of cascading CEMs in quite appealing. A CEM uses S2 to talk to another CEM, that represents itself towards the first CEM as if it was a RM. The second CEM controls multiple devices, or maybe even more CEMs. These designs are very common in computing science. For example, a directory contains files, but could also contain another directory, which could contain files and directories and so on.

Unfortunately, this doesn't work for S2. One of the main principles on S2 is to remain agnostic for the energy flexibility utilization mechanism. When you want to represent multiple devices in one S2 session, that means you must aggregate them. Aggregation, by definition, means you have to throw away some information. You can do that if you know what your objective is and what is relevant for your objective, and what is not. But within S2 we don't know what the objective is, because we want to remain agnostic towards the energy flexibility utilization system. In other words, we can't throw away information because we don't know what we can throw away. It is impossible to aggregate energy flexibility in such a way that limits your options further down the line.

In the S2 architecture the CEM implementation does know what the objective is. If you want or need to aggregate flexibility, you can do that within the CEM or any of the systems behind the CEM.

If you really want to however, you can probably aggregate some the energy flexibility of a group of devices and communicate the aggregated flexibility with PEBC or PPBC. This would require some creativity, and would come at the cost having less control over the energy flexibility, which would decrease its value for many use cases.