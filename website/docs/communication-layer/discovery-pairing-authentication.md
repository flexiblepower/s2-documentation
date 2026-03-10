---
title: S2 Connect Specification
sidebar_position: 2
---

# S2 Connect Specification

# Introduction

S2 Connect is a JSON based protocol specification implementing the EN50491-12-2 "S2" standard for home and building energy management.

This specification addresses everything needed to created a secure and interoperable implementation of the S2 standard. The communication layer concerns the discovery, the pairing, the application layer communication protocol, the authentication, the message data model and the serialization. It was specifically designed to support multiple deployment scenario's and to give a relative consistent user experience throughout these different scenario's.

The protocol is designed to specify communication between two devices, a resource (e.g. a heat pump or EV charger) and a (home) energy management system. It is worth noting that, while this specification focuses on describing the interaction between two components, a (home) energy management is likely to be communicating with multiple resources at the same time.

# List of abbreviations

|Abbreviation | Meaning
|---|---|
| CEM | Customer Energy Manager |
| DNS | Domain Name System |
| DNS-SD | DNS Service Discovery |
| HTTP | HyperText Transfer Protocol |
| LAN | Local Area Network (i.e. a local network, typically constrained to the building) |
| mDNS | Multicast DNS |
| NAT | Network Address Translation |
| REST | Representational state transfer |
| RM | Resource Manager |
| S2 | European standard on Energy Flexibility EN50491-12-2 |
| UUID | Universally Unique IDentifier (see [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562)) |
| WAN | Wide Area Network (i.e. the public internet) |

# Background (informative)

## Requirements

> TODO: This section needs to be rewritten to better explain the design goals

The communication layer meets the following requirements:

The Customer Energy Manager (CEM) and Resource Manager (RM) are logical concepts within the S2 architecture, therefore the S2 standard does not make any assumptions on how and where the CEM and RM are deployed in a real life situation. In practice, the CEM could be deployed on a local gateway in a LAN or as a server somewhere on the internet (WAN), while the RM could be part of the device itself, deployed on an add-on module or on the internet as well. This means that the S2 communication layer **MUST** be able to deal with multiple scenarios that are depicted in the figure below.

In addition to - and partly because of - supporting the various deployment options, the S2 communication layer has the following generic requirements:

- Support for full duplex communication. Both sides **MUST** be able to send and receive data simultaneously.
- Communication **MUST** be IP based.
- Communication **MUST** be encrypted.
- Communication latency between CEM and RM or vice versa **MUST** be ≤ 1 second.
- Communication **MUST** work without additional firewall configuration by the end user.
- Implementation of the communication layer **MUST** be based on a widely accepted technology and must be relatively easy to implement.
- The pairing process **SHOULD** support extensibility for other application layer communication protocols.
- Provide a relatively consistent user experience regardless of the deployment of the S2 node
- Run a local RM on a device with constrained hardware
- A RM could not have a UI

## Technical decisions
Given the requirements, this specification is build on the following high-level technical choices:

Application layer communication protocol: WebSocket Secure with bearer token authentication.

Pairing: Custom HTTP API specified in OpenAPI.

Discovery: DNS-SD (within a LAN) in combination with a central registry (for WAN deployments).

Serialization: json.


**Why not oAuth 2.0?**

The short answer is: oAuth is mainly designed for accessing protected resources in the cloud and since the S2 CEM and RM would also need to be able to pair on a local network (even without requiring internet access) oAuth 2.0 is simply not a good fit. We have identified a way to make it work but since it is such non-typical way, we choose not to use oAuth 2.0. 

For the long answer, please refer to [this page](why-not-oauth.md).

## Security requirements

The described protocol, ensures the following 4 requirements:

1. Mutual authentication
2. Integrity of communication
3. Confidentiality of communication
4. Forward secrecy

There is one guarantee that explicitly is not given by this protocol:

5. Non-repudiation



### 1. Mutual authentication (guaranteed)

The mutual authentication is based on the trust relation between the user and the Client/Server. Since it is assumed that the user already had a trust relation with both of them, this existing trust can be used for mutual authentication between the client and the server. Note that the this communication is not part of the S2 protocol.

The end user requests an url, and token from the server, and gives these to the client. Based on these data, the client can connect to the server, using a TLS connection, check the certificate and authenticate himself with the token. Note that if the server uses a self-signed certificate, the fingerprint will be shared during the pairing phase, so it can be verified by the client.

### 2. Integrity of communication (guaranteed)

Using TLS will ensure the integrity of the data.

### 3. Confidentiality of communication (guaranteed)

Using TLS will ensure the confidentiality of the data.

### 4. Forward secrecy (guaranteed)

Using TLS1.3 will ensure the forward secrecy of the data.

### 5. Non-repudiation (NOT guaranteed)

Non-repudiation is not guaranteed in this protocol. Individual messages are not signed by anyone and as a result both parties could deny sending a specific request. However, while no legal proof is given, since integrity and authenticity is guaranteed by TLS, each party always knows for sure which party made what statement.

### Remaining risk

There are two remaining vulnerable situations for the described protocol. In this section both will be explained.

#### self-signed certificates

In the case that a local RM and a local CEM communicate, it is not in every situation possible to generate a PKI-certificate that can be publicly validated. As a result, S2 accepts, **ONLY** in this situation, self-signed certificates. The risk for spoofing attacks are mitigated by including the certificate fingerprint in the challenge-response process as part of the pairing process, and pinning the self-signed CA certificate at the client side. As a result, the client can check for all connections whether or not it is connected with the correct server.

#### Trust relations between the end-user and the Client/Server

The entire trust model of S2 is based on the fact that there is already a trust relation between the end-user and the client/server. If these clients/servers do not use adequate security mechanisms, it might be possible to attack the S2 system as well.

# Terms and definitions (normative)

This specification uses the concepts that are defined below.

| Term | Definition |
| --- | --- |
| Access token | A token that is used for setting up an S2 connection. It is random binary data and must be generated by a cryptographically secure pseudorandom number generator and have a minimum length of 32 bytes. It is encoded using Base64. Also see [11A. Response status 200](#11a-response-status-200). |
| End user | A person or entity that manages S2 nodes. For the purpose of this specification it is assumed that there is already a trust relationship in place between this person and the S2 nodes. This means that the way the trust relationship has been established is out of scope for this specification. |
| End user environment | A restricted area within an application that contains all the S2 nodes that belong to the end user. Also see [Deployment of S2 nodes](#deployment-of-s2-nodes). |
| Initiator S2 node | The S2 node that takes the initiative to pair with a responder S2 node. This is typically the S2 node from which the user initiates the pairing process. It is the counterpart of the responder S2 node. Also see [Pairing and unpairing from the perspective of the end user](#pairing-and-unpairing-from-the-perspective-of-the-end-user). |
| Pairing attempt | The process of pairing two S2 nodes. The process can be completed successfully or unsuccessfully. |
| Pairing code | The pairing code is the string of characters the end user has to copy from the responder S2 node user interface to the initiator S2 node user interface, in order to pair the two S2 nodes. The pairing code consists of a pairing token and if required a pairing S2 node ID. Also see [The pairing token, the pairing S2 node ID and the pairing code](#the-pairing-token-the-pairing-s2-node-id-and-the-pairing-code). |
| Pairing S2 node ID | A short identifier for an S2 node, which is unique in the context of a single S2 endpoint. Also see [The pairing token, the pairing S2 node ID and the pairing code](#the-pairing-token-the-pairing-s2-node-id-and-the-pairing-code). |
| Pairing token | A secret string of characters, which acts as a proof of the trust relationship between the end user and an S2 node. Also see [The pairing token, the pairing S2 node ID and the pairing code](#the-pairing-token-the-pairing-s2-node-id-and-the-pairing-code). |
| Responder S2 Node |  The S2 node that responds to a request to pair. This is the S2 node that issued the pairing code. It is the counterpart of the initiator S2 node. Also see [Pairing and unpairing from the perspective of the end user](#pairing-and-unpairing-from-the-perspective-of-the-end-user). |
| S2 endpoint | A service which can handle pairing requests or initiates pairing requests itself. An S2 endpoint can represent one S2 node, but could also represent many. |
| S2 communication client | The S2 nodes which behaves as the HTTP client when initiating an S2 connection. |
| S2 communication server | The S2 nodes which behaves as the HTTP server when initiating an S2 connection. |
| S2 pairing client | The S2 endpoint which behaves as the HTTP client when pairing with an S2 node. |
| S2 pairing endpoint registry | The central registry that keeps track of publicly available S2 pairing servers. |
| S2 pairing server | The S2 endpoint which behaves as the HTTP server when pairing with an S2 node. |
| S2 node | Refers to an instance of either a CEM or a RM as defined in EN 50491-12-1 and implementing this specification. S2 communication between two S2 nodes can only be established if one of the S2 nodes is a CEM and the other a RM. These S2 nodes must also have the same end user. |
| S2 node ID | A globally unique identifier for an S2 node in the UUID format. |
| User interface | A user interface through which an end user can interact with an S2 node. Interactions between the end user and the user interface must be secure, but this is out of scope for this specification. Examples of a user interface are a web interface, an app or a physical interface (HMI) on a device. |


# Architecture (informative)
This section explains the overall architecture and deployment options for CEM and RM instances.

## Deployment of S2 nodes

This specification is concerned with connecting an instance of a CEM with an instance of a RM. Either of these instances are referred to as *S2 nodes*, which either have the CEM *role* or the RM *role*. Obviously, it is only possible to pair an S2 node with the CEM role to an S2 node with the RM role.

S2 Nodes can be deployed locally within the LAN, or somewhere on a server in the WAN. Although their deployment doesn't significantly affect the working of these S2 Nodes, there are some key differences between these types of deployment.

* **WAN** S2 nodes are typically part of a large application that run on many servers and/or on some kind of cloud computing platform. A single application usually serves many users. Each user could have one or multiple S2 nodes. This could for example be a cloud-based energy management system that can connect to many devices. It could also be a cloud environment of a device manufacturer that hosts the RM instances in the cloud. An end user could own multiple devices from this manufacturer, thus the application could host multiple RM instances for this particular user. We call a group of S2 nodes that a single user can manage within one application an *end user environment*. It is also possible that an end user environment contains both CEM and RM instances. The user interface is typically a web interface or a smartphone app.
* **LAN** S2 nodes are typically part of an application that runs on an embedded computer device somewhere in the building. Such a device could be a physical energy management system, an energy flexible device such as a home battery, heat pump or EV charger, or a gateway device which connects to an energy flexible device through some kind of protocol. Often an application will only host a single S2 node, but it is also possible that an application hosts multiple S2 nodes. A device could function completely on its own, but it cloud also be connected to an internet based application of the manufacturer. The user interface could be a physical human-machine interface on the device, but also be a smartphone app that connects directly to the device (e.g. via bluetooth), or a smartphone app or web interface that connects to an internet based application of the manufacturer. For energy flexible devices, it is assumed that they could also have no user interface at all, or that they are very constrained when it comes to computing power. It is assumed that a CEM always has a user interface.

![Deployment_options](../../static/img/communication-layer/deployment_options.png)

There are three types of S2 connections between S2 nodes possible:

* **WAN-WAN**: A connection between two S2 nodes deployed in a WAN. Connecting between them is straightforward and can be done based on URLs, based on DNS domain names. It is possible to rely on TLS certificates that can be validated thanks to a public key infrastructure.
* **WAN-LAN**: A connection between a LAN deployed S2 node a WAN deployed S2 node. Since there is almost always a firewall and/or NAT between these two, it is assumed that it is only possible to set up a connection from the LAN to the WAN; not the other way around. Connecting from the LAN S2 node to the WAN S2 node can be done based on a URL, and common TLS certificates can be used thanks to public key infrastructure.
* **LAN-LAN**: A connection between two LAN deployed S2 nodes. It is assumed that in this situation we cannot rely an internet connection, making it impossible to rely on a public key infrastructure for TLS certificates. That is why for this type of connection self-signed TLS certificates are used. Connections are made based on hostnames that are resolved to IP-addresses using Multicast DNS (mDNS), since IP-addresses are not guaranteed to be stable. Discovering another node could be done using DNS Service Discovery (DNS-SD).

## Pairing and unpairing from the perspective of the end user
The end user can take the initiative to *pair* a single CEM instance with a single RM instance. This process has to be started with one of the S2 nodes. Which node this is depends on the deployment and implementation decisions of the S2 node, but ideally it could be either one. The S2 node however needs to have a user interface. We'll call the S2 node that user uses to start the pairing process the *initiator*. We'll call the other S2 node the *responder*.

The first step of pairing is establishing a connection from the initiator S2 node to the responder S2 node. This can be done in several ways:
* Enter the responder S2 node address manually at the initiator S2 node.
* If the responder S2 node is deployed in the WAN, the URL could be retrieved through a registry. The end user would have to select the type of S2 node from a list of known s2 node services in its region.
* If both S2 nodes are deployed in the LAN however, s2 nodes can be automatically be detected. The end user would have to select the S2 node from a list of automatically discovered S2 nodes.

The second step is entering the pairing code of the responder S2 node. This is a means for the end user to confirm that these two S2 nodes are allowed to send control signals through S2 to each other. The pairing code can be obtained from the responder S2 node. The pairing code is a (seemingly) random string of characters. This pairing code is typically displayed somewhere in the user interface of the other S2 node. We recommend to use a dynamic token which expires after 5 minutes. However, if the S2 node has a physical presence in the building and doesn't have user interface, there is also the option to have a static pairing code which can be printed on the device.

Optionally, the initiator S2 node can send a signal to the responder S2 node to indicate that the end user has started the pairing process and has selected the responder S2 node. This could trigger the user interface of the responder S2 node to proactively show the pairing code (e.g. through a pop-up) to improve the user experience.

Once the pairing code is known to the initiator S2 node, the pairing process is started. It is established that both S2 nodes are compatible and it is verified that the entered pairing code is correct. Pairing could either fail or succeed.

If pairing is performed successfully, the CEM and RM instances should establish a connection with each other and communicate through S2. If the connection is interrupted, the instances will automatically try to reestablish the connection.

Once a CEM is paired, the user has to possibility to command either of the S2 nodes to *unpair*. After unpairing the CEM and RM instances can no longer communicate through S2 (unless the end user pairs them again).

![Pairing_process_user](../../static/img/communication-layer/pairing_process_user.png)

<details>
<summary>Image generated using the following PlantUML code:</summary>

```
@startuml
participant "Initiator S2 node" as i
participant "Initiator S2 node UI" as iui
actor "End user" as e
participant "Responder S2 node UI" as rui
participant "Responder S2 node" as r

e->iui: Provide identity of Responder S2 node (e.g. URL)
rui->e: Retrieve pairing code
e->iui: Provide pairing code
i->r: Attempt pairing
r->i: Pairing result (success or failure)
iui->e: Pairing result (success or failure)
@enduml
```
</details>

## The S2 node and the S2 endpoint

Within this protocol we make a clear distinction between two types of identities: the one of the *S2 endpoint* and the one of the *S2 node* itself.

An S2 node is an instance of a CEM or a RM. It is either a specific energy management system or service, or the representative of a physical energy flexible device, such as a heat pump or a home battery. It is typically easily recognized by the end user by its brand, device type, model name or maybe even a user given name.

The S2 endpoint is basically the application that hosts the S2 nodes. In a LAN deployment an S2 endpoint might only host one S2 node, and these identities may seem very similar. But in a WAN deployment, an S2 endpoint could host all kinds of different types of S2 nodes. It could for example be that a certain S2 endpoint hosts RM instances for several brands of devices. Therefore an S2 endpoint needs its own identity, which can be recognized by the end user. 

## Used technology for pairing and communication

An S2 connection basically consists of four steps: discovery, pairing, communication and unpairing. For these steps different types of technology are used.

On of the main technologies the process relies on is HTTP REST. All interactions based on HTTP are formally described in OpenAPI specification files. [OpenAPI](https://swagger.io/specification/) is a formal language for specifying HTTP based API's. It can be used to generate reference documentation for developers, as well as stub code for many programming languages.

### Discovery

The first step is finding the responder S2 node from the initiator S2 node. In principle this is done based on the URL of the responder S2 node. However, to improve user experience, two systems exist to find this URL in a more user friendly manner. For more details see [Discovery](#discovery).

* If the responder S2 node is deployed in the WAN, the end user can find the endpoint through the S2 pairing endpoint registry. This would result in a list of vendors that offer S2 nodes.
* If both S2 nodes are deployed in the LAN however, the responder S2 can be detected automatically through a process based on DNS-SD. This way the user only has to select the desired S2 node to connect to from a list of S2 nodes which were discovered in the LAN. This process can also be used when an S2 node is deployed in the WAN, but the device also has a presence in the LAN.

### Pairing

The pairing process itself is completely based on HTTP REST. One S2 node behaves as the HTTP server, and the other as the HTTP client. This process is described in an OpenAPI file. The process consists of multiple steps. If the pairing process is completed successfully, the S2 nodes will agree on an access token. This token is used to initiate communication or to unpair.

We'll refer to the endpoint that behaves as the HTTP server during the pairing process as the *S2 pairing server*, and the client as the *S2 pairing client*.

Pairing interaction is always TLS based (i.e. HTTPS is used). For WAN deployments, normal certificates (signed by a Certificate Authority) are being used. For LAN deployments self-signed certificates are used. For more information about the use of self-signed certificates, check [Trusting a self-signed root certificate](###Trusting-a-self-signed-root-certificate)

### Communication

Communication is setting up the actual session, where S2 messages are being exchanged.

The process always starts with HTTP based communication, but then is handed over to a protocol which supports a two-way messages based communication channel. Currently the only protocol that is being used is WebSockets, but there are plans to add other options in the future. The HTTP interface is also specified in an OpenAPI file, together with the unpairing process.

We'll refer to the endpoint that behaves as the HTTP server during the communication process as the *S2 communication server*, and the client as the *S2 communication client*.

It should be noted that pairing and communication are two separate HTTP interfaces, that don't have to be used in the same way. It could be that an S2 Node is an S2 pairing client, but then becomes an S2 communication server. This depends on the deployment of the s2 Nodes (see [Pairing details for different deployments](#pairing-details-for-different-deployments)).

Communication interaction is always TLS based (i.e. HTTPS is used). For WAN deployments, normal certificates (signed by a Certificate Authority) are being used. For LAN-LAN deployments self-signed certificates are used. For more information about the use of self-signed certificates, check [Trusting a self-signed root certificate](###Trusting-a-self-signed-root-certificate)

After the HTTP interaction a WebSocket is established (other transport protocols will be added in the future). The S2 communication server is always the WebSocket server. This server must use the same TLS certificate as the HTTP server.

### Unpairing

Either S2 node can take the initiative to unpair from the other S2 node. This is done using the same HTTP OpenAPI specification and the same HTTP server and client as the communication. The details for unpairing differ depending if it is the S2 communication server or if it is the S2 communication client that initiates the unpairing process.

Unpairing interaction is always TLS based (i.e. HTTPS is used). For WAN deployments, normal certificates (signed by a Certificate Authority) are being used. For LAN-LAN deployments self-signed certificates are used. For more information about the use of self-signed certificates, check [Trusting a self-signed root certificate](###Trusting-a-self-signed-root-certificate)


## Pairing details for different deployments

As explained, the pairing process is based on HTTP REST calls. That means that for every pairing attempt, one S2 node behaves as the HTTP server, and one HTTP node behaves as the pairing client. The logical solution would be to make the initiator S2 node the HTTP client and the responder S2 node the HTTP server. After all, it is the HTTP client that takes the initiative to contact the HTTP server. The HTTP server cannot take the initiative to contact the HTTP client.

The objective is to have all S2 nodes be able to be the initiator S2 node, as well as the responder S2 Node. This is necessary to provide a consistent user experience. The end user might not be aware which S2 node is deployed in the LAN or in the WAN, and then it might be confusing that, for example, his energy management system both provides S2 pairing codes and asks for S2 pairing codes.

If every S2 node must be able to be the initiator S2 node in certain situations, and the responder S2 node in other situations, and the easiest solution is to implement the initiator as HTTP client and the responder as HTTP server, you might come to the conclusion that every S2 node needs to be able to behave both as an HTTP server and as an HTTP client.

There are however two situations where this is not possible:

* **WAN initiator S2 node and LAN responder S2 node**: Since the LAN is usually shielded from the WAN through a firewall or NAT, it is assumed that it is not possible to approach a LAN HTTP server from a WAN client. This specifications offers two approaches to this problem:
  * Accept this limitation and not allow the WAN S2 node to be the initiator S2 node. Pairing can only be performed when the LAN S2 node is the initiator S2 node and the WAN S2 node is the responder S2 node. Special care must be taken to explain this to the end user.
  * Many modern devices or EMS systems are connected to a cloud backend managed by the OEM. If this is the case, it is possible to implement the pairing HTTP server in the cloud, even though the S2 node itself is in the WAN. If the pairing is performed successfully in the OEM backend, the result of the pairing must be communicated to the S2 node via the existing connection between device/EMS and the OEM backend.
* **LAN initiator RM and LAN responder RM**: Since one of the requirements is that a LAN RM instance can be implemented on restricted hardware, and a TLS enabled HTTP server is far more memory intensive than an HTTP client, there is an option to implement a LAN RM instance purely as an HTTP client. A long-polling mechanism is available to indicate to the HTTP Server that the S2 node is available for pairing. This mechanism is also used to initiate the pairing process from the HTTP server. In other words: in this specific situation the initiator S2 node behaves as the HTTP server, and the responder S2 node only has to be an HTTP client.

![Pairing_direction](../../static/img/communication-layer/pairing_direction.png)


# Formal specification and versioning (normative)

This document serves as an overall specification of the S2 over IP protocol. However, where possible, the protocol has been specified in a formal specification language in order to minimize possible interpretation and allow tooling to assist the implementation of the specification. Since many details are better described in these formal specification files, they are not described in this document. Where the formal specification files and this document overlap, the formal specification file is leading.

| Part of specification | Description | Specification format |
| --- | --- | --- |
| S2 pairing API | HTTP based interaction to pair two S2 nodes | OpenAPI file |
| S2 connection API | HTTP based interaction set up a communication channel for S2 messages between two S2 nodes | OpenAPI file |
| S2 message structure | The types of S2 messages that can be exchanges between S2 nodes | JSON schema files | 

## Versioning of OpenAPI files
The S2 pairing API and the S2 connection API are formally defined as an OpenAPI file. To accommodate future changes to these APIs, the OpenAPI files are versioned. Versioning is done using a `major.minor` scheme.

The minor version is increased when backwards compatible changes are made. Be aware that we consider adding items to certain lists of enums (e.g. the list of supported hash functions) backwards compatible. Other examples of backwards compatible changes are additional properties of JSON files or added operations.

The major version is increased when non-backwards compatible changes are made.

The major version of the API is embedded in the base URL of the API as `/v[major]` (e.g. `/v1`). HTTP server and HTTP clients can decide to implement several major version of the API in parallel to increase interoperability. In that case server must server all version on the same base URL (e.g. `https://hostname.local/pairing/v1/...` and `https://hostname.local/pairing/v2/...`). The server **must** always (even when it only supports one major version of the API) serve an index (e.g. `https://hostname.local/pairing/`) which returns a JSON array with all supported versions as they are defined as port of the URL (e.g. `["v1", "v2"]`).

> TODO: Versioning of S2 JSON Schema's needs to be explained

## Addressing S2 endpoints (normative)
The URL of the pairing and connection API are used in the discovery process, pairing process and connection process, as wel as the basis for TLS certificates.

For WAN deployed S2 endpoints, the URL **must** be based on a DNS domain name.

For LAN deployed S2 endpoint, the URL **must** be based on an mDNS alias or hostname (e.g. `hostname.local`). It is important that these names are *unique* and *stable*. Unique since there could be multiple instance within the same LAN, and stable because if it changes, the S2 endpoint cannot be found by other S2 endpoints. It should also be noted that the alias used by DNS-SD, and is presented to the end user. It recommended to choose a name that the end user should recognize and an element for the end user to make a distinction between two devices of the same type, such as a serial number.

# Pairing process (normative)

The pairing process is based on the trust relation that the end user has with both the CEM and the RM instances. That trust relation is out of scope for this specification and is up to CEM and RM providers to implement.

For each pairing attempt, one S2 endpoint must be the HTTP server, while the other is the HTTP client. The table below defines which S2 endpoint is het HTTP server or client is which situation.

| Initiator S2 node | Responder S2 node | Responder is exclusively RM? | Initiator HTTP role | Responder HTTP role | WAN S2 pairing server | Remark |
| ----------------- | ----------------- | ---------------------------- | ------------------- | ------------------- | --------------------- | ------ |
| WAN | WAN | Doesn't matter | Client | Server | n/a |  |
| WAN | LAN | Doesn't matter | Client | n/a | Server | The WAN S2 pairing server for LAN deployment is optional |
| LAN | WAN | Doesn't matter | Client | Server | n/a |  |
| LAN | LAN | Yes | Server | Client | n/a | Through long-polling. Decision to implement the server or the client is up to the RM endpoint. |
| LAN | LAN | Yes | Client | Server | n/a | Alternative for long-polling. Decision to implement the server or the client is up to the RM endpoint. |
| LAN | LAN | No | Client | Server | n/a |  |

> A LAN deployed RM implementation can choose if it implements the HTTP server, or that it implements the HTTP client and uses long-polling. This feature exists to accommodate RM implementations with constrained hardware.

A CEM can be paired with multiple RM's a the same time. A RM can only be paired with one CEM at a time. An S2 node is always available for pairing. When a RM that is already is paired with an CEM is paired with another CEM, the initial pairing is automatically unpaired. When a CEM and a RM are paired when they already are paired, they stay paired.

## Discovery

> TODO: This section still notes to be expanded

In order to ease the pairing process, which is specified below, the discovery process provides a way for nodes to find each other without requiring a user to know the pairing endpoint of the other node. In other words, the discovery process is a way to provide an S2 Node with the URL of another node which is needed to start the pairing process. Alternatively, it is always possible to initiate the pairing by manually providing the URL by the end user.

> NOTE: the discovery process specification is work in progress and will be updated soon.

### WAN-WAN
Both the S2 RM and CEM run in the cloud (for example communicating with the device via a manufacturer specific protocol). Discovery of the other node by lookup in a central registry.

> NOTE: how the API of the registry will look like will be published soon

### WAN-LAN

A hybrid scenario where either the RM or CEM is deployed locally and the other in the cloud. Discovery of the cloud node by lookup in a central registry or DNS-SD in case the node is also present on the LAN.

> NOTE: the DNS-SD service specification will be published soon

### LAN-LAN
A LAN scenario where both RM and CEM are running on the same local network. Discovery through DNS-SD.

> NOTE: the DNS-SD service specification will be published soon

### DNS-SD based discovery
DNS-SD is used for automatically discover S2 nodes from an S2 node that is deployed in the LAN. This method can be used in three ways.

* To discover another S2 node that is deployed in the LAN, which is the responder S2 node
* To advertise a [long polling endpoint](#long-polling) so other initiator S2 nodes in the LAN could connect to this S2 node
* To discover an S2 node of which the RM is deployed in the WAN, but that also has a presence in the LAN.

S2 uses the service type `s2emp` (short for S2 Energy Management Protocol) and exclusively uses tcp, since it is an HTTP based protocol. S2 uses the following DNS-SD values:

| DNS-SD property | Value for S2 |
| --- | --- |
| Service type | `_s2emp` |
| Protocol | `_tcp` |
| Port | No fixed port, decision is up to the implementation |
| Subtypes | `_cem` and `_rm` |
| Service name | Identical to the hostname (see [here](#addressing-s2-endpoints-normative) for more details)

An S2 endpoint deployed in the LAN **should** publish it service through DNS-SD once it is ready for pairing, and until it shuts down.

A device has a presence in the LAN (e.g. a heat pump which is connected to the internet via the end user's WiFi), but has its RM deployed in the WAN, can still use DNS-SD to advertise its S2 endpoint to any local S2 nodes (e.g. a physical energy management device containing an CEM). In this case the device doesn't have to offer any actual service in the LAN; it merely uses the TXT record to advertise its WAN S2 endpoint URL. An arbitrary port may be specified.

Two DNS-SD subtypes are used for S2 endpoints. Subtypes can be used to filter services.

 * `_cem` is used when the S2 endpoint contains one or more CEM S2 node
 * `_rm` is used when the S2 endpoint contains one or more RM S2 node
 * `_cem` and `_rm` are both used when the S2 endpoint contains both CEM and RM S2 nodes

S2 uses the following TXT records when registering for services. In the table below, M indicates a mandatory value and O indicates on optional value.

| Record name | M/O | Description
| --- | --- | --- |
| `txtver` | M | Version of this specification of usage of the TXT record. **Must** be the literal value `1` for this version |
| `e_name` | O | The name of this endpoint (identical to the `name` property in the `S2EndpointDescription` object as defined in de OpenAPI specification) |
| `e_logoUrl` | O | The logoUrl of this endpoint (identical to the `logoUrl` property in the `S2EndpointDescription` object as defined in de OpenAPI specification) |
| `deployment` | M | **Must** be the literal value `LAN` or `WAN` (identical to the `logoUrl` property in the `S2EndpointDescription` object as defined in de OpenAPI specification) |
| `pairingUrl` | O | The base URL of the pairing API of this S2 endpoint, excluding the version name but including the last slash (e.g. `https://hostname.local/pairing/`). If no value is provided, a `longpollingUrl` **must** be provided.
| `longpollingUrl` | O | The base URL of the pairing API of this S2 endpoint on which the longpolling feature is implemented. The URL should be provided excluding the version name but including the last slash (e.g. `https://hostname.local/pairing/`). Only needs to be provided when longpolling is supported. Can only be provided if the value for `deployment` is equal to `LAN`.

> Note: It is mandatory to provide a value for at least one of the properties `pairingUrl` and `longpollingUrl`. Providing both is also possible.

The receiver of the service description **must** use the URL provided in the TXT records; not the hostname or IP-address and port associated with the service registry.

> Note: You may have noticed that the full URL of the endpoint is used in the TXT records, even though the endpoint and port are already exposed by DNS-SD itself. This is done to avoid any problems with TLS certificates, which are pinned to a certain domain name. When using a WAN S2 endpoint, the full URL needs to be specified as well, since no local service is actually being offered.

> Scanning for S2 endpoints could for example be done using the following [avahi](https://avahi.org/) command:
> 
> `avahi-browse -r _s2emp._tcp`
> 
> Registering an S2 endpoint could for example be done using the folling avahi command:
>
> `avahi-publish-service -s "EVSE1038"  _s2emp._tcp 443 "txtvers=1" "e_name=brand" "deployment=LAN" "pairingUrl=https://EVSE1038.local:443/pairing/" --sub _rm._sub._s2emp._tcp`

## The pairing token, the pairing S2 node ID and the pairing code

The pairing token is a random string of characters that is generated by the responder S2 node. It is a secret which is transferred by the end user to the initiator S2 node, and then is verified during the pairing process. Since there will be many cases where the end user has to manually type in the pairing token, the pairing token has to be short enough to make it easy for the end user to type in, but long enough to make it secure. The pairing token **must** be generated by a cryptographically secure pseudorandom number generator. The pairing token **must** be random binary data with a length of at least 9 bytes, and is encoded using Base64 before it is presented to the end user (9 bytes is equal to 12 characters when encoded with Base64).

The **pairing token** can be validated with the following regular expression:

```
^(?:[A-Za-z0-9+\/]{4}){2,}(?:[A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}={2})$
```

The pairing token is typically dynamically generated when the user requests the pairing token at the user interface of the responder S2 node. Dynamically generated pairing tokens **must** expire after a duration; five minutes is the recommended duration. However, energy flexible devices that do not have a user interface are allowed to have a static pairing token, that for example can be printed somewhere on the physical device. Static pairing tokens do not expire.

An S2 endpoint can host multiple S2 nodes. When attempting to pair a certain S2 node, the S2 endpoint needs to know exactly which of its S2 nodes this pairing attempt is aimed at. S2 nodes are uniquely identified with their S2 node ID. Since this S2 node ID is a UUID, it is pretty long and cumbersome to type in. That is why an S2 endpoint can assign its nodes a `pairing S2 node ID`. This is an identifier that is intended to be short, and only unique within the context of this particular S2 endpoint. Pairing S2 node IDs could be assigned by the S2 endpoint whenever new S2 nodes are created, but also could be generated dynamically only when someone is attempting to pair to this S2 node. This way, pairing S2 node IDs have a short live, and can be reused by other S2 nodes at other moments. This allows to use shorter pairing S2 node ID's. Pairing S2 node IDs are a string of characters, which may include lower case letters, upper case letters and numbers. Pairing S2 node IDs are ideally as short as possible (at least one character), but should of course be long enough to allow the S2 endpoint to uniquely identify an S2 node. When an S2 endpoint only contains one S2 node, there is no need for a pairing S2 node ID.

The **pairing S2 node ID** can be validated with the following regular expression:

```
^[0-9a-zA-Z]+$
```

Although the pairing token and the pairing S2 node ID are two separate strings, which are treated as completely different in the pairing process, they are presented together to the user as one string: the *pairing code*. The pairing code is simply the pairing S2 node ID, followed by a dash ('-'), followed by the pairing token. When there is no pairing S2 node ID, the pairing code is simply identical to the pairing token.

```
When no pairing S2 node ID is used (i.e. the S2 endpoint only contains one S2 node):
  [pairing code] = [pairing token]
When a pairing S2 node ID is used:
  [pairing code] = [pairing S2 node ID]-[pairing token]
```

Alternatively, the **pairing code** can be validated with the following regular expression:

```
^(?:[0-9a-zA-Z]+-)?(?:[A-Za-z0-9+\/]{4}){2,}(?:[A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}={2})$
```

The pairing code allows us to transfer two pieces of information by only bothering the end user once. Due to its format the initiator S2 node can easily extract the pairing S2 node ID and the pairing token from the pairing code by splitting the string at the dash. 


## TLS Certificates

There are two possible types of certificates for TLS communication. The first option is using a public server certificate, that is created through a Public Key Infrastructure (PKI) and thus signed by a public CA. The other option (only applicable to LAN servers) is to use a self-signed certificate. The latter is needed because a LAN server is not able to obtain a certificate that has been issued by a CA for its local domain.

In the following image, the difference is shown. On the left a public root CA that is publicly known and trusted, on the right, a self-signed root certificate, that is unknown and its trustworthiness has to be achieved in another way.

![image.png](../../static/img/communication-layer/certificate-chains.png)

<details>
<summary>Image generated using the following PlantUML code:</summary>

```
@startuml
struct PublicRootCA
struct PublicIntermediateCA
struct PublicServerCertificate

PublicRootCA --> PublicIntermediateCA
PublicIntermediateCA --> PublicServerCertificate


struct SelfSignedCA
struct LocalServerCertificate

SelfSignedCA --> SelfSignedCA
SelfSignedCA --> LocalServerCertificate
@enduml
```
</details>


### Trusting a self-signed root certificate

The self-signed root certificate is by default not trusted. However during the pairing phase, the server with the self-signed root certificate will share the fingerprint of the certificate during the pairing phase as part of the challenge. This will enable the client to verify the self-signed root certificate, and create trust. From this moment on, the client will store the complete fingerprint of the self-signed root certificate, and use it to verify the server certificate for all future connections.

Note that the `preparePairing` and `cancelPreparePairing` endpoints can be called before the pairing has happened. So in the case the server is running on a LAN (and thus uses self-signed certificates), the client can skip the certificate validation steps on those endpoint. This means that the HTTP client **must** be configured to accept self-signed certificates during the pairing process. Since the pairing process consists of several HTTP requests, the HTTP client **must** check that for every request the same self-signed certificate is used by the HTTP server. If this is not the case, the HTTP client **cannot** proceed with the request.



### Updating the certificates

A server can update its certificate. When a cloud server updates its certificate, it **MUST** be signed by a CA, so a client can check its validity. A server **SHOULD** update its server certificate at least once every 6 months.

If the server is in local-local mode, and uses a self-signed CA certificate, the CA certificate **SHOULD** be created with a validity period which is long enough for the expected lifetime of the server. If the used crypto for the the CA certificate is broken, or the lifetime of the server is longer than the validity of the certificate, the server **MUST** create a new self-signed CA certificate and all clients need to be paired again. Like cloud servers, a local server **SHOULD** update its server certificate at least once every 6 months.



## Challenge response process

This protocol uses a two-way challenge response process to verify that both S2 nodes have the same pairing token. For this process it doesn't matter which S2 node has issued the pairing token and which S2 node has the pairing token that was entered by the end user. The reason a two-way challenge response process is used to verify the pairing token is that it allows to establish trust without having to expose the pairing token. Both a challenge and a response are binary data, which are encoded using Base64.

The challenge that is generated by the HTTP Client is called the `clientHmacChallenge`. The response to this challenge, generated by the HTTP Server, is called the `clientHmacChallengeResponse`. The challenge that is  generated by the HTTP Server is called the `serverHmacChallenge`. The response to this challenge, generated by the HTTP Client, is called the `serverHmacChallengeResponse`.

A challenge is a nonce; a random binary data. It **must** be generated by a cryptographically secure pseudorandom number generator and it **must** have a minimal length of 32 bytes. The response is calculated based on the function described below. Both the generator of the challenge and the receiver of the challenge calculate the response based several input parameters. Since both S2 nodes should have the same input, both S2 nodes should calculate the same response. The S2 Node that received the challenge sends it back to the S2 node that generated the challenge. Now the S2 node that generated the challenge simply has to check if the received response is identical to the expected response that he calculated himself.

The algorithm to calculate the response is based on the HMAC (hash-based message authentication code) function. This function has a *key* and a *message* as arguments. Most programming languages have a function or library available that provides HMAC functions.

The HMAC function itself uses a cryptographic hash function for its calculations. Since cryptographic hash functions might contain vulnerabilities, this protocol uses a simple selection mechanism for the cryptographic hash function. The HTTP client sends with the requestPairing HTTP request a list of supported hash functions. In the response the HTTP server indicates which hash function it has selected from this list. This function **must** be used for all response calculations during het pairing attempt. Currently there is only one hash function available (SHA256), but other options might be added in the future.

It order to avoid man-in-the-middle attacks when using self-signed certificates, the SHA256 fingerprint of the TLS *server certificate* can also be used as input for calculating the response.

> Note that the pairing token is encoded using Base64, so it must also be decoded using Base64 before it can be used in the challenge response function.

The exact function to calculate the response depends on the deployment of the S2 nodes.

```
When both S2 nodes have a LAN deployment:
  R = HMAC(C, T || F)

When at least one S2 node has a WAN deployment:
  R = HMAC(C, T)
```

Where:
| Symbol | meaning |
| ------ | ------- |
| `R` | Response
| `HMAC` | HMAC function with the selected cryptographic hash function |
| `C` | Challenge |
| `T`  | Pairing token |
| `F`  | SHA256 fingerprint of the TLS server certificate of the HTTP server |
| `\|\|` | Concatenation |


## Pre-pairing interaction

> This section is only applicable for LAN-LAN pairing

> TODO: This section needs to be improved

The user visits the S2ClientNodeUI and the S2ServerNode has been discovered (so the S2ServerNode base URL is known) by the the S2ClientNode per [discovery](#discovery) as specified above. The S2ClientNode does a preparePairing HTTP request to let the S2ServerNode know that there is an S2ClientNode that wants to pair. It is up to the S2ServerNode implementation to decide what to do with this signal. It can be used to display a pop-up with the pairing token in its UI to improve the user experience. It must be implemented by the client, but only when there is a clear distinction between the moment preparePairing is called and when requestPairing is called. When preparePairing is called, it is not guaranteed that a call to pairingRequest or cancelPreparePairing will follow so it is recommended to put a time-out on showing the pairing token in the S2ServerNodeUI.

## Long-polling

> This section is only applicable for LAN-LAN pairing

The long-polling feature is intended to support S2 endpoints that only want to implement an HTTP client, and not an HTTP server. Typically this is because the S2 endpoint runs on constrained hardware. An S2 endpoint is only allowed to only implement the client if it exclusively hosts S2 nodes that have the RM role.

Imagine we have S2 endpoints, one only hosting a CEM S2 node, and one only hosting a RM S2 node. The RM runs on constrained hardware, and only implements the HTTP client. We have two situations:

1. **The RM is the initiator S2 node and the CEM is the responder S2 node**: The CEM issues a pairing code, the end users enters the pairing code in the UI of the RM. The RM endpoint (HTTP client) then sends a normal HTTP request to the CEM endpoint (HTTP server) to initiate pairing. The normal pairing process can be used, and long-polling is not required.
2. **The CEM is the initiator S2 node and the RM is the responder S2 node**: The RM issues a pairing code (a dynamic pairing code through its UI, or a static pairing code for example through a sticker on the hardware), the end user enters the pairing code in the UI of the CEM. Now the CEM endpoint (HTTP server) cannot use the normal pairing process, since it has no way to contact the RM endpoint (HTTP client).

For the second situation the long-polling feature can be used. It can be used by the initiator S2 node (the HTTP server) to notify the responder S2 node (the HTTP client) it wants to pair.

> Informative: Long-polling is a technique that allows the server to send signals to the client without a significant delay, and without relying on additional technologies such as Websockets or Server-Sent Events. The common alternative is polling, where the client sends a request on a regular interval; let's say every 30 seconds. Polling creates a delay from the perspective of the server. If the server wants to send something to the client, it has to wait until the client contacts the server; which in the worst case 30 seconds. With long-polling the server doesn't immediately respond the the request (a hanging HTTP request). It responds immediately when the server wants the client to do something, or just before the request would time out. After receiving the response from the server the client immediately opens a new request to allow the server to send signals the client again.

The long-polling feature fulfills the following functionality:
* Make the existence of the client known to server, together with the S2 nodes IDs of the S2 nodes that are represented by the client endpoint
* Send the `S2NodeDescription` and `S2EndpointDescription` of S2 nodes represented by the client when requested by the server
* Send a prepare pairing signal or cancel prepare pairing from the server to the client for a particular S2 node ID
* Send the signal from the server to the client to initiate pairing for a particular S2 node ID
* Send an error message from the client to the server when pairing cannot be performed

A client capable of long-polling **should** initiates long-polling when it encounters a S2 endpoint through DNS-SD that indicates that is available for long-polling requests. When the S2 endpoint represents zero S2 nodes the client **cannot** attempt long-polling. When the S2 endpoint advertisement itself, or only its long-polling indication disappears from DNS-SD the client **should** stop the long-polling process for that server. The client **must** also stop when it is no longer capable of pairing.

The server **must** always respond within 25 seconds after receiving the request. The client **must** use a request time-out of at least 30 seconds.

> TODO: Move the OpenAPI version selection process to its own section so we don't have to explain it every time

The client starts the process by doing a POST request to the `/waitForPairing` path. For full normative details see the OpenAPI specification files. The request body contains a list of objects. The client **must** always provide an object for each S2 node ID it represents. The items in the list have a mandatory property `clientS2NodeId` and optional parameters `clientS2NodeDescription`, `clientS2EndpointDescription`. The client should only provide values for these properties when requested by the server. The object also contains the optional property `errorMessage`, which only should be used when an error has occurred before pairing.

When the server wants the client to immediately do a new request, it responds with status code 204. When it wants the client to do something, it responds with status 200 and a response body containing a list. This list contains an object only for S2 node IDs represented by the client, that the server wants to do something with. This object contains the mandatory properties `clientS2NodeId` and `action`. The `action` property is an enumeration indicating an action the server wants to execute for a specific S2 node. The possible action values are `sendS2NodeDescription`, `preparePairing`, `cancelPreparePairing` and `requestPairing`.

The table below indicates how the client should respond to the requests of the server. Note that the server could send multiple actions (for different S2 node IDs) in the same response. The server **cannot** provide multiple objects for the same S2 node ID in one response.

| Status code | Value `action` | Pairing code entered? | What should the client do | What should the client include in the next request body |
| --- | --- | --- | --- | --- |
| 204 | n/a | n/a | Only send a next request | Only the `clientS2NodeId` |
| 200 | `sendS2NodeDescription` | n/a | Only send the next request | The `clientS2NodeId`, `clientS2NodeDescription` and `clientS2EndpointDescription` |
| 200 | `preparePairing` | n/a | Prepare pairing for the mentioned S2NodeId and send the next request | Only the `clientS2NodeId` | n/a |
| 200 | `cancelPreparePairing` | n/a | Cancel prepare pairing for the mentioned S2NodeId and send the next request | Only the `clientS2NodeId` |
| 200 | `requestPairing` | Yes | Initiate the pairing for the mentioned S2NodeId and send the next request | Only the `clientS2NodeId` |
| 200 | `requestPairing` | No | Initiate the pairing for the mentioned S2NodeId and send the next request | Only the `clientS2NodeId`, and for the associated object provide an `errorMessage` with value `NoValidTokenOnPairingClient` |
| 400 | n/a | n/a | Stop long-polling until next time long-polling is advertised through DNS-SD | n/a |
| 401 | n/a | n/a | Stop long-polling, do not attempt long-polling with this node again | n/a |
| 500 | n/a | n/a | Wait before trying to send the next request | Only the `clientS2NodeId`|

2. **The CEM is the initiator S2 node and the RM is the responder S2 node**: The RM issues a pairing code (a dynamic pairing code through its UI, or a static pairing code for example through a sticker on the hardware), the end user inters the pairing code in the UI of the CEM. Now the CEM endpoint (HTTP server) cannot use the normal pairing process, since it has no way to contact the RM endpoint (HTTP client).

When the server sends the `requestPairing` action, the S2 node on the client must already have issued a pairing token. If the S2 node uses a dynamic pairing code, it could be the case that the pairing code has expired, or that no pairing code has been issued in the first place. In that case the client **must** perform a new request with an `errorMessage` containing the value `NoValidTokenOnPairingClient` in the object associated with the S2 node ID of the S2 node should have attempted to pair.

The activity diagram below summarizes the complete long-polling process from teh perspective of the client.

![image](../../static/img/communication-layer/long-polling_activity_diagram.png)

## Pairing interaction

The pairing process itself consists of several HTTP interactions between client and server. The image below depicts a successful pairing process between two S2 nodes. 

![image](../../static/img/communication-layer/pairing_http_process.png)

<details>
<summary>Image generated using the following PlantUML code:</summary>

```
@startuml
participant "HTTP Client" as Client
participant "HTTP Server" as Server

'select version of pairing API
Client->Server++: 1. GET / (index containing pairing API versions)
Server-->Client: 2. Response status 200
deactivate Server
Client->Client: 3. Decide pairing version

'compatibility check
Client->Server: 4. POST /[version]/requestPairing
activate Server
Server->Server: 5. Calculate clientHmacChallengeResponse
Server-->Client: 6. Response status 200
deactivate Server

Client->Client: 7. HTTP Client checks clientHmacChallengeResponse

Note over Client: HTTP Client now trusts HTTP Server

Client->Client: 8. Calculate serverHmacChallengeResponse

alt Pairing server is Communication Server
    Client->Server: 9A. POST /[version]/requestConnectionDetails
    activate Server
    Server->Server: 10A. HTTP Server checks serverHmacChallengeResponse
    Note over Server: HTTP Server now trusts HTTP Client
    Server-->Client: 11A. Response status 200
    deactivate Server
else Pairing server is Communication Client
    Client->Server: 9B. POST /[version]/postConnectionDetails
    activate Server
    Server->Server: 10B. HTTP Server checks serverHmacChallengeResponse
    Note over Server: HTTP Server now trusts HTTP Client
    Server-->Client: 11B. Response status 204
    deactivate Server
end

Client->Server++: 12. POST /[version]/finalizePairing
Server-->Client: 13. Response status 204
deactivate Server

Note over Client, Server: Pairing finalized

@enduml
```
</details>

### 0. Precondition

Before two S2 node can be paired, the following preconditions must be met.

1. The HTTP server and the HTTP client can only start with a pairing request when they are fully initialized and have all the details of the S2 nodes it represents available. 
2. The HTTP client must have the base URL of the pairing API (e.g. `https://hostname.local/pairing/`)
3. Both S2 nodes must have a pairing token available. Either because they issued this token themselves, or because the end user has provided it through the user interface.

> Note: The initiator S2 node could be the HTTP server or the HTTP client

If the HTTP client does not fulfill these preconditions, it **cannot** send the first HTTP request of the pairing process.

### 1. GET / (index containing pairing API versions)
Since the HTTP client does not know which major versions of the pairing API are implemented by the server, it must first do a GET request to the index (e.g. `https://hostname.local/pairing/`). 

The client **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Pairing is failed, do not proceed with the pairing attempt |
| If self-signed TLS certificate, check if server is local | Pairing is failed, do not proceed with the pairing attempt |
| Store fingerprint of TLS certificate for later check | | 

If no checks fail the client **should** proceed to the next step.

### 2. Response status 200
The server responds with a list of implement major versions of the pairing API. It is formatted as a JSON array contains all the supported version of the pairing API (e.g. `["v1"]`).

If the HTTP client does not support any of the provided versions, it means that the two S2 endpoints are not compatible, and that pairing is not possible.

### 3. Decide pairing version
From the provided list of major versions of the pairing API, the HTTP client must select one that is implement by the HTTP client itself (typically the highest supported version). 

### 4. POST /[version]/requestPairing
In the first POST request the client provides the server with same information about itself. The main purpose of this is to check if these two S2 nodes are compatible.

The client sends the following information (for full details see the OpenAPI specification file):

| Information | Description |
| --- | --- |
| `clientS2NodeDescription` | Information about the S2 node that wants to pair, such as brand, logo and type. Important fields include `id` (the S2 node ID) and `role` of the initiator S2 node |
| `clientS2EndpointDescription` | Information about the client S2 endpoint. An important field is the deployment. |
| `pairingS2NodeID` | The pairing S2 node ID of the node that is being targeted (this field can be omitted if the endpoint only represents one S2 node) |  
| `supportedCommunicationProtocols` | List of supported communications protocols of the client |
| `supportedS2MessageVersions` | List of supported S2 message versions by the client |
| `supportedHmacHashingAlgorithms` | List of supported hashing algorithms for the challenge response function (currently only `SHA256` is supported and **must** be present) |
| `clientHmacChallenge` | The challenge of the client for the challenge response process (see [Challenge response process](#challenge-response-process) |
| `forcePairing` | Indicate if the S2 nodes must pair, even though they (currently) do not support the same S2 message versions (this could in the future be solved with a software update) |

The client **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Pairing is failed, do not proceed with the pairing attempt |
| If self-signed TLS certificate, check if server is local | Pairing is failed, do not proceed with the pairing attempt |
| Check if same fingerprint is used as previous request | Pairing is failed, do not proceed with the pairing attempt | 

If no checks fail the client **should** proceed to the next step.


The server **must** perform the checks in the table below to make sure that it can proceed with this request. If one of these checks fail, the server should respond with an HTTP status 400 and a `PairingResponseErrorMessage`. The contents of the `additionalInfo` field is supposed the be helpful and up to the implementer.

| Check | Type of `PairingResponseErrorMessage` when check fails | Can be ignored when  `forcePairing` is true ?|
| --- | --- | --- |
| Is the request properly formatted and does it follow the schema? | `Parsing error` | No |
| Does it recognize the `pairingS2NodeID`? | `S2Node not found` | No |
| Are the S2 endpoint and S2 node ready for pairing? | `Other` | No |
| If no `pairingS2NodeID` provided, does this endpoint indeed only represent one S2 node? | `No S2Node provided` | No |
| Does the targeted S2 node have a different role than the initiator S2 node (i.e. you cannot pair two RM's or two CEM's)? | `Invalid combination of roles` | No |
| Does the server accept any of the provided hashing algorithms for the challenge response process? | `Incompatible HMAC hashing algorithms` | No |
| Is there overlap between the communication protocols? | `Incompatible communication protocols` | Yes |
| Is there overlap between the S2 message versions? | `Incompatible S2 message versions` | Yes |
| If the targeted S2 node on the HTTP server is the initiator S2 node, did the end user provide a valid pairing token? | `No valid pairingToken on PairingServer` | No |
| If the targeted S2 node on the HTTP server is the responder S2 node, does the S2 node have a pairing token which has not expired? | `No valid pairingToken on PairingServer` | No |

> Note: If the S2 node that is being paired is an RM which is already paired, the pairing process proceeds. When the paring process is finished successfully the existing pairing relation must be unpaired.

> Note: If the targeted S2 node is already paired with the initiator S2 node, the pairing process proceeds. When the paring process is finished successfully the existing pairing relation is maintained.

> Note: This is the only step where it is checked if the pairing code has expired. If the pairing token expires after this step, but during the pairing process, the pairing process will continue. A pairing attempt is limited to 15 seconds.

If no checks fail the server **should** proceed to the next step.

### 5. Calculate clientHmacChallengeResponse
The server selects an hashing algorithm for the challenge response function from the list that was provided by the client. This has to be a hashing algorithm that the server considers secure. The server calculates a response to the provided `clientHmacChallenge`. For details see [Challenge response process](#challenge-response-process).

### 6. Response status 200
In order to formulate a response, the server **must** generate a `pairingAttemptId`. This is an identifier that **must** be generated by a cryptographically secure pseudorandom number generator and encoded using Base64. This identifier is used to keep track of all the HTTP interactions during the pairing attempt, and **must** be provided by the HTTP client as a header with all subsequent interactions. A pairing attempt **must** be completed within 15 seconds, or else the server **must** assume the pairing attempt has failed.

The server responds with the following information (for full details see the OpenAPI specification file):

| Information | Description |
| --- | --- |
| `pairingAttemptId` | The generated identifier for this pairing attempt |
| `serverS2NodeDescription` | Information about the S2 node that is being targeted, such as brand, logo and type. Important fields include `id` (the S2 node ID) and `role` of the responder S2 node |
| `serverS2EndpointDescription` | Information about the server S2 endpoint. An important field is the deployment. |
| `selectedHmacHashingAlgorithm` | The hashing algorithm for the challenge response function as selected in step 2 |
| `clientHmacChallengeResponse` | The response to the challenge provided by the HTTP client as calculated in step 2 |
| `serverHmacChallenge` | The challenge created by the HTTP server for the challenge response process (see [Challenge response process](#challenge-response-process).) |

The client **must** perform the following checks of this data.

| Check | How to proceed if check fails |
| --- | --- |
| Can the contents of the response be parsed? | Do not proceed with the pairing attempt |
| Is the response formatted according to the schema? | call `/finalizePairing` where `success` is `false` if `pairingAttemptId` is available |
| Is the role of the S2 node at the server compatible? | call `/finalizePairing` where `success` is `false` |

If no checks fail the server **should** proceed to the next step.

### 7. HTTP Client checks clientHmacChallengeResponse
The HTTP client checks the `clientHmacChallengeResponse` provided by the HTTP server in step 6. It does that by calculating the response itself, and checking if the results is identical to the `clientHmacChallengeResponse`.

If the result is identical, the client **should** proceed to the next step. If the result is not identical, the client **must** stop the pairing attempt. It **must** attempt to inform the HTTP server of this by doing an HTTP request to `finalizePairing` where the value of `success` must be `false`.

Note that in case of a local server, the TLS certificate fingerprint is part of the challenge. So if the challenge succeeds, the certificate fingerprint is correct, and the certificate can be trusted. The client **must** pin this certificate, and trust this certificate for future use.


### 8. Calculate serverHmacChallengeResponse
The HTTP client calculates a response to the provided `serverHmacChallenge` using the hashing algorithm as indicated in the `selectedHmacHashingAlgorithm`. For details see [Challenge response process](#challenge-response-process).

From hereon the process branches into two scenario's, depending on if the HTTP client will be the communication client or the communication server. See [Mapping the CEM and RM to communication server or client](#mapping-the-cem-and-rm-to-communication-server-or-client) for which s2 node will perform which role for communication.

If the HTTP server will be the communication *server* steps 9A, 10A and 11A **should** follow. If the HTTP server will be the communications *client* steps 9B, 10B en 11B **should** follow.

### 9A. POST /[version]/requestConnectionDetails
> Note: The `pairingAttemptId` must be provided through a header for this HTTP request

The HTTP client makes a request for the connection details. This request also serves as a way to send the HTTP server the `serverHmacChallengeResponse` calculated in step 8.

If the `pairingAttemptId` is not recognized by the server (or has expired), the server **must** respond with status code 401.

If the request was not understood by the server for any other reason, the server **must** respond with status 400.

The client **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Pairing is failed, do not proceed with the pairing attempt |
| If self-signed TLS certificate, check if server is local | Pairing is failed, do not proceed with the pairing attempt |
| Check if TLS certificate is pinned | Pairing is failed, do not proceed with the pairing attempt | 

If no checks fail the client **should** proceed to the next step.


### 10A. HTTP Server checks serverHmacChallengeResponse
The HTTP server checks the `serverHmacChallengeResponse` provided by the HTTP client in step 9A. It does that by calculating the response itself, and checking if the results is identical to the `serverHmacChallengeResponse`.

If the result is identical, the server **should** proceed to the next step. If the result is not identical, the server **must** stop the pairing attempt by responding with HTTP status code 403. The `pairingAttemptId` cannot be used by the HTTP client anymore. If the HTTP client wants to make another attempt, it **must** start again at step 1 or step 4.

### 11A. Response status 200
The server **must** generates an access token for the HTTP client. The access token is random binary data and **must** be generated by a cryptographically secure pseudorandom number generator and **must** have a minimum length of 32 bytes. It is encoded using Base64. The access token **cannot** be used by the initiator S2 node until the pairing process is completed.

The server responds with two pieces of information:

| Information | Description |
| --- | --- |
| `initiateConnectionUrl` | The base URL for the S2 connection process (does not include the version number) |
| `accessToken` | The access token that was generated for this S2 node | 

If the response is understood and properly formatted, the HTTP client **should** proceed to the next step. Otherwise the HTTP client **must** stop the pairing attempt. It **must** attempt to inform the HTTP server of this by doing an HTTP request to `finalizePairing` where the value of `success` must be `false`.

### 9B. POST /[version]/postConnectionDetails
> Note: The `pairingAttemptId` must be provided through a header for this HTTP request

The HTTP sends the connection details to the HTTP server. This request also serves as a way to send the HTTP server the `serverHmacChallengeResponse` calculated in step 8.


| Information | Description |
| --- | --- |
| `serverHmacChallengeResponse` | The response for the challenge response process |
| `initiateConnectionUrl` | The base URI for the S2 connection process (does not include the version number) |
| `accessToken` | The access token that was generated for this S2 node | 

The client **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Pairing is failed, do not proceed with the pairing attempt |
| If self-signed TLS certificate, check if server is local | Pairing is failed, do not proceed with the pairing attempt |
| Check if TLS certificate is pinned | Pairing is failed, do not proceed with the pairing attempt | 

If no checks fail the client **should** proceed to the next step.

The server **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| `pairingAttemptId` is recognized | Respond with status code 401 |
| Request could not be parsed correctly | Respond with status code 400 |

If no checks fail the server **should** proceed to the next step.

### 10B. HTTP Server checks serverHmacChallengeResponse
The HTTP server checks the `serverHmacChallengeResponse` provided by the HTTP client in step 9A. It does that by calculating the response itself, and checking if the results is identical to the `serverHmacChallengeResponse`.

If the result is identical, the server **should** proceed to the next step. If the result is not identical, the client **must** stop the pairing attempt by responding with HTTP status code 403. The `pairingAttemptId` cannot be used by the HTTP client anymore. If the HTTP client wants to make another attempt, it **must** start again at step 1 or step 4.

### 11B. Response status 204
The server confirms it has accepted the response and received the connection details by responding with HTTP status 204.

### 12. POST /[version]/finalizePairing
> Note: The `pairingAttemptId` must be provided through a header for this HTTP request

If all interaction has been successful until this point, the HTTP client **must** do a request to finalize the pairing attempt. The provided value for `success` **must** be `true`.

The client **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Pairing is failed, do not proceed with the pairing attempt |
| If self-signed TLS certificate, check if server is local | Pairing is failed, do not proceed with the pairing attempt |
| Check if TLS certificate is pinned | Pairing is failed, do not proceed with the pairing attempt | 

If no checks fail the client **should** proceed to the next step.

The server **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| The `pairingAttemptId` is correctly recognized | respond with status code 401 |
| The request is not understood for any other reason | respond with status code 400 |

If no checks fail the server **should** proceed to the next step.

Receiving a `/finalizePairing` request marks the completion of the pairing attempt for the HTTP server. If the HTTP server issued an access token during this pairing attempt, it can now be used by an S2 communication client to set up an S2 connection. The `pairingAttemptId` can no longer be used by the HTTP client.

### 13. Response status 204
To confirm the successful completion of the pairing attempt, the HTTP server responds to the client with HTTP status code 204. This response marks the completion of the pairing attempt for the HTTP client. If the HTTP client issued an access token during this pairing attempt, it can now be used by an S2 communication client to set up an S2 connection. The `pairingAttemptId` can no longer be used by the HTTP client.

If the HTTP server was using a self-signed TLS certificate, the HTTP client can now store the self-signed root certificate. The client **must** check that this is the CA certificate that is used for all future interaction with this S2 endpoint. The HTTP server is allowed to use a new self-signed server certificate, as long as it is signed by the self-signed CA certificate that was used during the pairing process.

### Interruption of the process
A pairing attempt has a maximum duration of 15 seconds. That means that once a `pairingAttemptId` has been issued, this `pairingAttemptId` cannot be used after 15 seconds since it was issued. From the perspective of the HTTP server, any pairing attempt that is not completed in 15 seconds (with success or not) is considered a failed attempt. From the perspective of the HTTP client, if the server does not respond within 15 seconds since it received the `pairingAttemptId`, it must consider the pairing attempt as failed. If the HTTP client wants to make another attempt, it should start again at step 1 or step 4.

### Invalid interactions
If the server receives a wrong HTTP request (e.g. `/postConnectionDetails` while it was expecting `/requestConnectionDetails`) or when it receives the requests in the wrong order (e.g. `/finalizePairing` with `success` = `true` before calling `/requestConnectionDetails`) it **must** respond with a status 400 and consider the pairing attempt as failed. The only exception is receiving the same request twice.

# S2 Connection (normative)

After two nodes have been paired, the nodes exchange S2 messages over a secure connection. 

The following mechanism **must** be used to initiate a secure connection between two S2 nodes. Client authentication is based on a one-time use communication token that needs to be renewed every time a new S2 session is created. The S2 communication client will always attempt to set up an S2 connecting with the S2 communication server when there is no connection. For more details see [Reconnection strategy](#reconnection-strategy). 

## Mapping the CEM and RM to communication server or client

The CEM and RM roles defined by the S2 protocol are distinct from the server and client roles of the S2 pairing process. The following rules apply to determine whether the RM or CEM acts as a client or server for the communication initialization.

* If a connection is set up between a WAN S2 node and a LAN S2 node, the WAN S2 node must act as an S2 communication server, and the local node must act as an S2 communication client.
* If a connection is set up between two nodes that are similarly deployed (i.e. both in WAN, or both in LAN), the CEM must act as an S2 communication server, and the RM must act as an S2 communication client.

There are four scenarios for CEM and RM deployment, and applying the rules above yields the following:

| CEM deployment | RM deployment | CEM acts as | RM acts as |
|----------------|---------------|-------------|------------|
| WAN | WAN | S2 communication server | S2 communication client |
| WAN | LAN | S2 communication server | S2 communication client |
| LAN | WAN | S2 communication client | S2 communication server |
| LAN | LAN | S2 communication server | S2 communication client |

> Note: A device developed solely for use as an RM in a LAN setup will never function as an S2 communication server.

## Connection initiation

During the pairing process an `accessToken` is generated by the S2 node which will be the S2 communication server and sent to the S2 node that will be the S2 communication client. This `accessToken` can be used by the S2 communication client to set up a session with the S2 communication server for exchanging S2 messages. Each time a new connection is made the `accessToken` will be renewed. In other words, an `accessToken` can only be used once to set up a connection. The S2 communication server will generate a new `accessToken` and sends it to the S2 communication client. Since this `accessToken` is the only means to connect two S2 nodes once they are paired, the connection initiation process makes sure that both S2 nodes confirm that they have successfully persisted the new `accessToken` before invalidating the old `accessToken`.

![connection initiation](../../static/img/communication-layer/connection-initiation.png)

<details>
<summary>Image generated using the following PlantUML code:</summary>

```
@startuml
participant "HTTP Client" as Client
participant "HTTP Server" as Server

Client->Server++: 1. GET / (index containing pairing API versions)
Server-->Client: 2. Response status 200
deactivate Server
Client->Client: 3. Decide pairing version

Client->Server++: 4. POST /[version]/initiateConnection
Server->Server: 5. Generate new pending accessToken
Server-->Client--: 6. Response status 200
Client->Client: 7. Store pending accessToken
Client->Server++: 8. POST /[version]/confirmAccessToken
Server->Server: 9. Activate new accessToken for this S2 node ID 
Server-->Client--: 10. Response status 200
Client -> Client : 11. Remove old accessToken
@enduml
```

</details>

### 0. Precondition

Before an S2 node can initiate a connection, it needs three things.

1. The HTTP server and the HTTP client can only start with a communication request when they are fully initialized and have all the details of the S2 nodes it represents available. 
2. The HTTP client must have the base URL of the connection API (e.g. `https://hostname.local/connection/`)
3. The two S2 nodes must have been paired successfully and must have an accessToken for this pairing

If the HTTP client does not fulfill these preconditions, it **cannot** send the first HTTP request of the connection process.

### 1. GET / (index containing communication API versions)
Since the HTTP client does not know which major versions of the communication API are implemented by the server, it must first do a GET request to the index (e.g. `https://hostname.local/pairing/`). 

The client **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Do not proceed with connection, try again later |
| If self-signed TLS certificate, check if server is local | Do not proceed with connection, try again later |

If no checks fail the client **should** proceed to the next step.

### 2. Response status 200
The server responds with a list of implement major versions of the pairing API. It is formatted as a JSON array contains all the supported version of the pairing API (e.g. `["v1"]`).

If the HTTP client does not support any of the provided versions, it means that the two S2 endpoints are not compatible, and that connection is not possible.

### 3. Decide communication API version
From the provided list of major versions of the communication API, the HTTP client must select one that is implement by the HTTP client itself (typically the highest supported version). 

### 4. POST /[version]/initiateConnection

Since there are situations in which the client cannot know for sure which `accessToken` the S2 communication server uses for this pairing, the S2 communication client must keep a persisted list of `accessTokens` (which will typically contain only one `accessToken`).

The client **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Initiation is failed, do not proceed with the initiation attempt |
| If self-signed TLS certificate, check if server is local | Initiation is failed, do not proceed with the initiation attempt |
| Check if TLS certificate is pinned | Initiation is failed, do not proceed with the initiation attempt | 

If no checks fail the client **should** proceed to the next step.

The client sends the following information (for full details see the OpenAPI specification file). In addition, the `accessToken` is sent through a header. 

| Information | Description |
| --- | --- |
| `clientS2NodeId` | The S2 node ID of the S2 communications client that wants to connect to the server. |
| `serverS2NodeId` | The S2 node ID of the S2 communications server that the client wants to connect to. |
| `clientS2NodeDescription` | Information about the S2 node, such as brand, logo and type. This only needs to be provided if the S2 communication client wants to update this information, otherwise the S2 communication server will assumer the stored information is still valid. |
| `clientS2EndpointDescription` | Information about the client S2 endpoint. This only needs to be provided if the S2 communication client wants to update this information, otherwise the S2 communication server will assumer the stored information is still valid. |
| `supportedCommunicationProtocols` | List of supported communications protocols of the client |
| `supportedS2MessageVersions` | List of supported S2 message versions by the client |

The server **must** perform the checks in the table below to make sure that it can proceed with this request. If one of these checks fail, the server should respond with an HTTP status 400 and a `CommunicationDetailsErrorMessage` or with HTTP status 401. The contents of the `additionalInfo` field of the `CommunicationDetailsErrorMessage` is supposed the be helpful and up to the implementer.

| Check | Response | What should the client do with this message? |
| --- | --- | --- |
| Is the request properly formatted and does it follow the schema? | `CommunicationDetailsErrorMessage` with errorMessage `Parsing error` | Retry later |
| Was this S2 node ID paired with this S2 node, but was it unpaired? | `CommunicationDetailsErrorMessage` with errorMessage `No longer paired` | Do not retry, inform end user |
| Is this `clientS2NodeId` paired with the `serverS2NodeId`? | Status code 401 | Try with other `accessToken` if possible. Otherwise do not retry, inform end user |
| Is the `serverS2NodeId` known? | Status code 401 | Try with other `accessToken` if possible. Otherwise do not retry, inform end user |
| Is this the correct `accessToken` for this S2 node ID?  | Status code 401 | Try with other `accessToken` if possible. Otherwise do not retry, inform end user |
| Is there overlap between the communication protocols? | `CommunicationDetailsErrorMessage` with errorMessage `Incompatible communication protocols` | Retry later |
| Is there overlap between the S2 message versions? | `CommunicationDetailsErrorMessage` with errorMessage `Incompatible S2 message versions` | Retry later |
| Are the S2 endpoint and S2 node ready for pairing? | `CommunicationDetailsErrorMessage` with errorMessage `Other` | Retry later |

### 5. Generate new pending `accessToken`

For each paired S2 node the server saves an active `accessToken`. In addition to that, the server also has a list for pending `accessToken`s, that were generated but not yet confirmed by the client. This list contains entries, each consisting of an `accessToken`, the S2 node IDs of the client and server S2 nodes and a timestamp.

The server generates a new `accessToken` and saves this together with the S2 node ID and the current time as in entry in the list of pending tokens. The `accessToken` **must** be generated by a cryptographically secure pseudorandom number generator.

### 6. Response status 200

In the request the client supplied a list of supported communication protocols and S2 messages versions. The server must select one of the options that were provided by the client.

The server sends the following information (for full details see the OpenAPI specification file). 

| Information | Description |
| --- | --- |
| `selectedCommunicationProtocol` | The communication protocol that was selected by the server |
| `selectedS2MessageVersion` | The S2 message version that was selected by the server |
| `accessToken` | The newly generated pending `accessToken` |
| `serverS2NodeDescription` | Information about the S2 node at the server, such as brand, logo and type. This only needs to be provided if the S2 communication server wants to update this information, otherwise the S2 communication client will assumer the stored information is still valid. |
| `serverS2EndpointDescription` | Information about the server S2 endpoint. This only needs to be provided if the S2 communication server wants to update this information, otherwise the S2 communication client will assumer the stored information is still valid. |

The client **must** perform the checks in the table below to make sure that it can proceed with this request.

| Check | What should the client do? |
| --- | --- |
| Is the request properly formatted and does it follow the schema? | Do not proceed and try again later with step 1 |
| Was the selected S2 message version offered in the request? | Do not proceed and try again later with step 1 |
| Was the selected communication protocol offered in the request? | Do not proceed and try again later with step 1 |

### 7. Store pending accessToken
It client adds the pending `accessToken` to its list of `accessTokens`, but does not yet remove the old one. If the client is not able to persist the pending `accessToken` (e.g. because the storage device or the DBMS is not available), the client does not proceed with the process. Once the client is able to persist `accessTokens` again, it can retry to set up a connection starting with step 1.

### 8. POST /[version]/confirmAccessToken
The client confirms to the server that it has successfully persisted the pending `accessToken`. The **pending** `accessToken` is provided through the header of the request.

The client **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Do not proceed with connection, try again later |
| If self-signed TLS certificate, check if server is local | Do not proceed with connection, try again later |
| Check if TLS certificate is pinned | Do not proceed with connection, try again later | 

If no checks fail the client **should** proceed.

### 9. Activate new `accessToken` for this S2 node ID 

If the provided `accessToken` is in the list pending `accessToken`s, and the token was generated not more than **15 seconds** ago, the server now makes the pending `accessToken` the active `accessToken` for this pairing of S2 nodes (thereby invalidating the old `accessToken`). Also, the entry is removed from the list of pending `accessToken`s.

If the provided `accessToken` is not in the list of pending `accessTokens`s, the server must not accept the connection and respond with status 401. The client can try again later starting at step 1.

If the server is not able to active the new `accessToken` (e.g. because the storage device or the DBMS is not available), the server must not accept the connection and responds with an error code 500. The client can try again later starting at step 1.

### 10. Response status 200

The S2 communication server sends the details and credentials to open a socket for communicating the S2 messages. The exact contents of this message depend on the selected communication protocol. In any case it will be a JSON object containing the field `communicationProtocol`. The presence on other fields will depend on the value of the `communicationProtocol` field.

If the response is not understood by the S2 communication client, the client **should** retry later.

### 11. Remove old accessToken

Step 10 functions as a confirmation to the S2 communication client that the S2 communication server has activated the new `accessToken` for this pairing. The old `accessToken` cannot be used anymore, so the S2 communication client must remove the old `accessToken` from the list of `accessToken`s.

### Interruption of the process
Once the S2 communication server has generated a new pending `accessToken`, it must be confirmed within 15 seconds by the S2 communication client. If this doesn't happen, a client will have to start the process from step 1 (or step 4) again.

If the S2 communication client doesn't receive a response to confirming the new `accessToken` (step 10), it does not know if the server has activated the new `accessToken`, or if the old `accessToken` is still in place. It now has (at least) two `accessToken`s in its list, and does not know for certain which one is activate at the S2 communication server. If it 

## WebSocket based communication

This section specifies how to use WebSocket Secure as the S2-over-TCP/IP application layer protocol.

The WebSocket client **must** run on the S2 communication client and the WebSocket server on the S2 communication server.

The choice for a WebSocket as application layer communication protocol has the advantage that the session concept is intrinsically introduced with the communication protocol. All S2 communication happens in the context of a (stateful) S2 session which is catered for by the WebSocket session. So, the S2 session matches the WebSocket session.

The client **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Websocket connection failed, do not proceed with the connection attempt |
| If self-signed TLS certificate, check if server is local | Websocket connection failed, do not proceed with the connection attempt |
| Check if TLS certificate is pinned | Websocket connection failed, do not proceed with the connection attempt | 

If no checks fail the client **should** proceed to the next step.


### Authentication
For each S2 WebSocket session the client **must** authenticate itself using the commToken in the authorization header of the websocket connection request, following [RFC 6750 - The OAuth 2.0 Authorization Framework: Bearer Token Usage](https://datatracker.ietf.org/doc/html/rfc6750).

### Encrypted connection (WSS)

Communication over the WebSocket endpoint **must** be encrypted following [RFC 6455 The WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455). S2 **MUST NOT** be sent over unencrypted channels. Therefore a wss connection (the URL starting with wss://) must be used. 

### Compression
 
The WebSocket Protocol ([RFC6455](https://datatracker.ietf.org/doc/html/rfc6455)) has an extension for compression: [**RFC 7692**](https://datatracker.ietf.org/doc/html/rfc7692.html) implementing so called per-message-deflate compression. https://datatracker.ietf.org/doc/html/rfc7692

RFC 7692 is widely supported by WebSocket libraries and and we are exchanging JSON plain text messages, it is expected to save a large amount of data. Therefore, implementations of S2 WebSockets **SHOULD** support RFC 7692 and **SHOULD** enable it whenever possible.

### Keepalive & heartbeat (ping / pong)

WebSockets by default have a **keepalive** and a **heartbeat mechanism**. Keepalive is designed to keep the connection open while heartbeat is designed to check the latency and check the connection is still working. This means that periodically a ping frame is sent to the server (endpoint) and in response a pong frame is sent.

In order to reduce network traffic, S2 WebSocket implementations **SHOULD** not send ping frames more often than every 50 seconds. Ping & pong frames are control frames and **MAY** include payload of maximum 125 bytes.

[https://datatracker.ietf.org/doc/html/rfc6455#section-5.5.2](https://datatracker.ietf.org/doc/html/rfc6455#section-5.5.2%5C%5C)



### Termination

An S2 session can be terminated in different ways:

* In case an S2 node unexpectedly becomes unavailable, the WebSocket connection **CAN** timeout. This will cause an S2 session to be terminated. More details about the timeout can be found [in the heartbeat section](#keepalive--heartbeat-ping--pong)
* an S2 node **CAN** terminate the S2 session by sending the S2 terminate message, including an optional earliest time that the session can be restored. The other S2 node can take this into account in planning and (in the case of a client) deciding when to attempt to reconnect.
* After two S2 nodes have unpaired, the S2 WebSocket connection **MUST** be terminated immediately.

### Reconnection strategy

Once an S2 session is terminated it cannot be resumed and if further communication is required, a new session needs to be started. an S2 client node may try to establish a WebSocket connection.

An exponential back-off strategy **SHOULD** be used, increasing the time between reconnection attempts at every failed attempt. If a reconnection time was included in any termination, S2 client nodes are permitted to make an attempt to reconnect before this time. At the specified time the delay between reconnection attempts **SHOULD** be reset.

## Communication - JSON messages

The S2 standard has been encoded into a JSON schema specification, for details see: [S2 JSON](https://github.com/flexiblepower/s2-ws-json)

### State of communication 

![State of Communication](../../static/img/communication-layer/state-of-communication.png)

<details>
<summary>Image generated using the following PlantUML code:</summary>

```
@startuml

hide empty description
[*] --> WebSocketConnected

WebSocketConnected : ResourceManagerDetails, PowerMeasurement, \n PowerForecast can be exchanged

WebSocketConnected --> ControlTypeActivated: Activate ControlType
ControlTypeActivated --> WebSocketConnected: Deactivate ControlType

ControlTypeActivated: In addition to messages in\nthe "Initialized" state,\nControlType specific message\ncan now be exchanged as well

WebSocketConnected --> WebSocketDisconnected: Termination of Session
ControlTypeActivated --> WebSocketDisconnected: Termination of Session

WebSocketDisconnected --> [*]
@enduml
```
</details>

| State | Messages that can be sent by CEM /received by RM | Messages that can be sent by RM / received by CEM |
| --- | --- | --- |
| WebSocket Connected |  SelectControlType<br/>SessionRequest<br/>ReceptionStatus | ResourceManagerDetails<br/>PowerMeasurement<br/>PowerForecast<br/>SessionRequest<br/>ReceptionStatus |
| ControlType PEBC activated | PEBC.Instruction<br/>SelectControlType<br/>SessionRequest<br/>ReceptionStatus | PEBC.EnergyConstraint<br/>PEBC.PowerConstraint<br/>RevokeObject InstructionStatusUpdate<br/>ResourceManagerDetails<br/>PowerMeasurement<br/>PowerForecast<br/>SessionRequest<br/>ReceptionStatus |
| ControlType PPBC activated | PPBC.EndInterruptionInstruction<br/>PPBC.ScheduleInstruction<br/>PPBC.StartInterruptionInstruction<br/>SelectControlType<br/>SessionRequest<br/>ReceptionStatus | PPBC.PowerProfileDefinition<br/>PPBC.PowerPorfileStatus<br/>RevokeObject<br/>InstructionStatusUpdate<br/>ResourceManagerDetails<br/>PowerMeasurement<br/>PowerForecast<br/>SessionRequest<br/>ReceptionStatus |
| ControlType OMBC activated | OMBC.Instruction<br/>SelectControlType<br/>SessionRequest<br/>ReceptionStatus | OMBC.Status<br/>OMBC.SystemDescription<br/>OMBC.TimerStatus RevokeObject<br/>InstructionStatusUpdate<br/>ResourceManagerDetails<br/>PowerMeasurement<br/>PowerForecast<br/>SessionRequest<br/>ReceptionStatus |
| ControlType FRBC activated | FRBC.Instruction<br/>SelectControlType<br/>SessionRequest<br/>ReceptionStatus | FRBC.ActuatorStatus<br/>FRBC.FillLevelTargetProfile<br/>FRBC.LeakageBehaviour<br/>FRBC.StorageStatus<br/>FRBC.SystemDescription<br/>FRBC.UsageForecast<br/>FRBC.TimerStatus<br/>RevokeObject<br/>InstructionStatusUpdate ResourceManagerDetails<br/>PowerMeasurement<br/>PowerForecast<br/>SessionRequest<br/>ReceptionStatus |
| ControlType DDBC activated | DDBC.Instruction<br/>SelectControlType<br/>SessionRequest<br/>ReceptionStatus | DDBC.ActuatorStatus<br/>DDBC.AverageDemandRateForecast<br/>DDBC.SystemDescription<br/>DDBC.TimerStatus<br/>RevokeObject<br/>InstructionStatusUpdate<br/>ResourceManagerDetails<br/>PowerMeasurement PowerForecast<br/>SessionRequest<br/>ReceptionStatus |

# Unpairing process (normative)

Unpairing can be initiated by either S2 node, and **should** only be done when instructed by the end user. The S2 node that did not take the initiative to unpair **should** try to inform the end user that the S2 node is no longer paired.

## Unpairing by the S2 communication client

If the S2 communication client takes the initiative to unpair, it first **should** close the S2 communication session regarding this pairing (if there is one). Then it **must** call the `/[version]/unpair` HTTP API endpoint of the server using its `accessToken` (after discovering the API version at the server, the same way as steps 1 to 3 as mentioned in [Connection initiation](#connection-initiation)). Upon receiving the unpair call from a client, the S2 server node **must** remove all security information related to this pairing. Then the client **must** remove all security information of the S2 communication server related to this pairing.

## Unpairing by the S2 communication server

If the server takes the initiative to unpair, first it **must** remove all security information related to client node. After that, if there is an active S2 session, it **should** send an S2 [SessionRequest](/model-reference/Common/SessionRequest/) message with type [RECONNECT](/model-reference/Common/SessionRequestType/) to the client. The next `/[version]/initiateConnection` HTTP API request **must** fail with the `No longer paired` response to let the client know that it is not paired anymore.

Client and server **can** keep other (non-security) information for, for example, user experience purposes.

# Security (normative)

> TODO: This section needs to be expanded to explain measures against ddos

Please refer to an extensive description of the security specifications to [Security considerations](./security-considerations.md).

## Certificates

For each S2 connection the server authenticates using a TLS certificate. The cloud implementation certificates **MUST** be PKI certificates which are not self-signed. Only local servers can use a self-signed root certificate, which is used to sign a server certificate.
If the S2 protocol is used in a local-local configuration, the server **CAN** use a self-signed root certificate. In this case, the pairingInfo **MUST** include the first 9 bytes, encodes as 12 base64 encoded characters, of the fingerprint of this self-signed CA certificate and the client **MUST** check this fingerprint.

Note that all communication uses TLS. This is further explained in [Security considerations](./security-considerations.md).

The server certificates **MUST** be exchanged and validated during the initiation of the connection (HTTPS and WSS). This is default usage of most networking libraries.

## Cipher suites

Security levels of cipher suites will change over time. To stay secure, the used cipher suites should be updates regularly and adhere to regular updates. All S2Nodes **MUST** follow **ONLY** the accepted crypto libraries as defined in [Accepted crypto algorithms](./accepted-crypto.md). This list will be kept up-to-date. When changes are made to the list of accepted crypto libraries, all S2Nodes **MUST** follow these changes within half a year.
