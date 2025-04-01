# Introduction
S2 was designed as a semantic protocol, which can have multiple, mutually compatible, implementing protocols. Different devices might prefer a different form of communication. For example, you can have a version of S2 which uses bluetooth, and another version which uses KNX. These versions differ in the transport protocol they use, but typically also in the way they encode data. Since both protocols are based upon the same S2 specification, one S2 implementing protocol can easily be translated into the other version using a simple software adapter.

S2-ws-json is a protocol specification which implements the S2 protocol using the common web technologies WebSockets and JSON. S2-ws-json can be used for:
* in-building communication between device and energy management system using a wired (Ethernet) or wireless (Wi-Fi) network
* communication between a device in the building and an energy management system in the cloud
* communication between a device endpoint in the cloud with an energy management system in the cloud
* communication between a device endpoint in the cloud and an energy management system in the building
* communication between different modules inside an energy management system