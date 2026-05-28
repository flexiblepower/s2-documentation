---
title: S2 Connect Specification
sidebar_position: 2
---

# S2 Connect - Specification

# Introduction

S2 Connect is a JSON-based protocol specification implementing the EN50491-12-2 "S2" standard for home and building energy management.

This specification addresses everything needed to create a secure and interoperable implementation of the S2 standard. The communication layer concerns the discovery, the pairing, the application layer communication protocol, the authentication, the message data model and the serialization. It was specifically designed to support multiple deployment scenarios and to give a relatively consistent user experience throughout these different scenarios.

The protocol is designed to specify communication between two devices, a resource (e.g. a heat pump or EV charger) and a (home) energy management system. It is worth noting that, while this specification focuses on describing the interaction between two components, a (home) energy management is likely to be communicating with multiple resources at the same time.

# Version

This version of this specification is based on the following versions of the underlying formal specification files (see [Formal specification and versioning (normative)](#formal-specification-and-versioning-normative) for more details).

| Project | Files | Version | Reference |
| --- | --- | --- | --- |
| S2 Connect | OpenAPI files | `v1.0-beta-2` | [Github](https://github.com/flexiblepower/s2-connect) |
| S2 JSON | JSON schemas | `v0.02-beta` | [Github](https://github.com/flexiblepower/s2-ws-json) |

> Note: S2 Connect is not directly linked to the version of S2 JSON. The exact version of S2 JSON that is being used by the CEM and RM is negotiated during session initiation.

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

## Context
S2 Connect aims to provide a standard method for discovering, pairing and letting a Customer Energy Manager (CEM) and a Resource Manager (RM) communicate with each other over IP networks. S2 Connect builds upon two other projects:

* The **S2 Standard** (formally known as EN50491-12-2) describes the data models and interactions for S2 based communication
* The **S2 JSON** project formalizes the data models of the S2 standard into JSON Schemas for a messages-based interaction between CEM and RM

Both the S2 Standard and S2 JSON can be used independently from S2 Connect.

## Requirements
S2 Connect aims to provide a standard method for discovering, pairing and letting a Customer Energy Manager (CEM) and a Resource Manager (RM) communicate with each other. The CEM and RM are logical concepts within the S2 architecture, therefore, the S2 standard does not make any assumptions on how and where the CEM and RM are deployed in a real-life situation. In practice, the CEM could be deployed on a local gateway in a LAN or as a server somewhere on the internet (WAN), while the RM could be part of the device itself, deployed on an add-on module or on the internet as well. S2 Connect provides a single solution which can be used between devices connected through a LAN, on the internet, or a combination of those.

S2 Connect implements the following high-level requirements:

- Communication must be secure and remain secure, and must be resilient against attackers from the internet or from within the LAN
- Communication between LAN and WAN must work without additional firewall or NAT configuration by the end user
- S2 Connect must be based on widely accepted technology
- Pairing two devices should be simple enough to execute by most end users
- There must be a relatively consistent end user experience regardless of the deployment of the node
- A local RM can run on a computer with constrained hardware
- It must be possible to implement a RM without relying on a user interface for pairing

The S2 Connect protocol ensures the following four security requirements:

1. Mutual authentication
2. Integrity of communication
3. Confidentiality of communication
4. Forward secrecy

Non-repudiation is explicitly not guaranteed by this protocol.

The entire trust model of S2 Connect is based on the fact that there is already a trust relation between the end user and the CEM and RM. If the CEM and RM do not use adequate security mechanisms, it might be possible to attack the system.

>> "Why doesn't S2 Connect use oAuth?" is a common question. oAuth is mainly designed for accessing protected resources in the cloud and since the S2 CEM and RM would also need to be able to pair on a local network (even without requiring internet access) oAuth 2.0 is simply not a good fit. We have identified a way to make it work but since it is such non-typical way, we choose not to use oAuth 2.0. For more details see [here](why-not-oauth.md).

# Terms and definitions (normative)

This specification uses the concepts that are defined below.

| Term | Definition |
| --- | --- |
| Access token | A token that is used for setting up an S2 session. It is random binary data and must be generated by a cryptographically secure pseudorandom number generator and have a minimum length of 32 bytes. It is encoded using Base64. Also see [11A. Response status 200](#11a-response-status-200). |
| Communication client | The nodes that behaves as the HTTP client when initiating an S2 session. |
| Communication server | The nodes that behaves as the HTTP server when initiating an S2 session. |
| End user | A person or entity that manages nodes. For the purpose of this specification it is assumed that there is already a trust relationship in place between this person and the nodes. This means that the way the trust relationship has been established is out of scope for this specification. |
| End user environment | A restricted area within an application that contains all the nodes that belong to the end user. Also see [Deployment of nodes](#deployment-of-nodes). |
| Endpoint | A service which can handle pairing requests or initiates pairing requests itself. An endpoint can represent one node, but could also represent many. |
| Initiator node | The node that takes the initiative to pair with a responder node. This is typically the node from which the user initiates the pairing process. It is the counterpart of the responder node. Also see [Pairing and unpairing from the perspective of the end user](#pairing-and-unpairing-from-the-perspective-of-the-end-user). |
| Node | Refers to an instance of either a CEM or a RM as defined in EN 50491-12-1 and implementing this specification. S2 communication between two nodes can only be established if one of the nodes is a CEM and the other a RM. These nodes must also have the same end user. |
| Node ID | A globally unique identifier for a node in the UUID format. |
| Node ID alias | A short identifier for a node, which is unique in the context of a single endpoint. Also see [The pairing token, the node ID alias and the pairing code](#the-pairing-token-the-node-id-alias-and-the-pairing-code). |
| Pairing attempt | The process of pairing two nodes. The process can be completed successfully or unsuccessfully. |
| Pairing client | The endpoint that behaves as the HTTP client when pairing with a node. |
| Pairing code | The pairing code is the string of characters the end user has to copy from the responder node user interface to the initiator node user interface, in order to pair the two nodes. The pairing code consists of a pairing token and if required a node ID alias. Also see [The pairing token, the node ID alias and the pairing code](#the-pairing-token-the-node-id-alias-and-the-pairing-code). |
| Pairing endpoint registry | The central registry that keeps track of publicly available pairing servers. |
| Pairing server | The endpoint that behaves as the HTTP server when pairing with a node. |
| Pairing token | A secret string of characters, which acts as a proof of the trust relationship between the end user and a node. Also see [The pairing token, the node ID alias and the pairing code](#the-pairing-token-the-node-id-alias-and-the-pairing-code). |
| Responder node |  The node that responds to a request to pair. This is the node that issued the pairing code. It is the counterpart of the initiator node. Also see [Pairing and unpairing from the perspective of the end user](#pairing-and-unpairing-from-the-perspective-of-the-end-user). |
| Session | A stateful exchange of S2 messages between two S2 nodes |
| User interface | A user interface through which an end user can interact with a node. Interactions between the end user and the user interface must be secure, but this is out of scope for this specification. Examples of a user interface are a web interface, an app or a physical interface (HMI) on a device. |


# Architecture (informative)
This section explains the overall architecture and deployment options for CEM and RM instances.

## Deployment of nodes

This specification is concerned with connecting an instance of a CEM with an instance of a RM. Either of these instances are referred to as *nodes*, which either have the CEM *role* or the RM *role*. Obviously, it is only possible to pair a node with the CEM role to a node with the RM role.

Nodes can be deployed locally within the LAN, or somewhere on a server in the WAN. Although their deployment doesn't significantly affect the working of these nodes, there are some key differences between these types of deployment.

* **WAN** nodes are typically part of a large application that run on many servers and/or on some kind of cloud computing platform. A single application usually serves many users. Each user could have one or multiple nodes. This could for example be a cloud-based energy management system that can connect to many devices. It could also be a cloud environment of a device manufacturer that hosts the RM instances in the cloud. An end user could own multiple devices from this manufacturer, thus the application could host multiple RM instances for this particular user. We call a group of nodes that a single user can manage within one application an *end user environment*. It is also possible that an end user environment contains both CEM and RM instances. The user interface is typically a web interface or a smartphone app.
* **LAN** nodes are typically part of an application that runs on an embedded computer device somewhere in the building. Such a device could be a physical energy management system, an energy flexible device such as a home battery, heat pump or EV charger, or a gateway device which connects to an energy flexible device through some kind of protocol. Often an application will only host a single node, but it is also possible that an application hosts multiple nodes. A device could function completely on its own, but it could also be connected to an internet based application of the manufacturer. The user interface could be a physical human-machine interface on the device, but also be a smartphone app that connects directly to the device (e.g. via Bluetooth), or a smartphone app or web interface that connects to an internet based application of the manufacturer. For energy flexible devices, it is assumed that they could also have no user interface at all, or that they are very constrained when it comes to computing power. It is assumed that a CEM always has a user interface.

![Deployment_options](@site/static/img/communication-layer/deployment_options.png)

There are three types of S2 connections between nodes possible:

* **WAN-WAN**: A connection between two nodes deployed in a WAN. Connecting between them is straightforward and can be done based on URLs, based on DNS domain names. It is possible to rely on TLS certificates that can be validated thanks to a public key infrastructure.
* **WAN-LAN**: A connection between a LAN deployed node a WAN deployed node. Since there is almost always a firewall and/or NAT between these two, it is assumed that it is only possible to set up a connection from the LAN to the WAN; not the other way around. Connecting from the LAN node to the WAN node can be done based on a URL, and common TLS certificates can be used thanks to public key infrastructure.
* **LAN-LAN**: A connection between two LAN deployed nodes. It is assumed that in this situation we cannot rely an internet connection, making it impossible to rely on a public key infrastructure for TLS certificates. That is why for this type of connection self-signed TLS certificates are used. Connections are made based on hostnames that are resolved to IP-addresses using Multicast DNS (mDNS), since IP-addresses are not guaranteed to be stable. Discovering another node could be done using DNS Service Discovery (DNS-SD).

## Pairing and unpairing from the perspective of the end user
The end user can take the initiative to *pair* a single CEM instance with a single RM instance. This process has to be started with one of the nodes. Which node this is depends on the deployment and implementation decisions of the node, but ideally it could be either one. The node however needs to have a user interface. We'll call the node that user uses to start the pairing process the *initiator*. We'll call the other node the *responder*.

The first step of pairing is establishing a connection from the initiator node to the responder node. This can be done in several ways:
* Enter the responder node address manually at the initiator node.
* If the responder node is deployed in the WAN, the URL could be retrieved through a registry. The end user would have to select the type of node from a list of known node services in its region.
* If both nodes are deployed in the LAN however, nodes can be automatically be detected. The end user would have to select the node from a list of automatically discovered nodes.

The second step is entering the pairing code of the responder node. This is a means for the end user to confirm that these two nodes are allowed to send control signals through S2 to each other. The pairing code can be obtained from the responder node. The pairing code is a (seemingly) random string of characters. This pairing code is typically displayed somewhere in the user interface of the other node. We recommend to use a dynamic token which expires after 5 minutes. However, if the node has a physical presence in the building and doesn't have user interface, there is also the option to have a static pairing code which can be printed on the device.

Optionally, the initiator node can send a signal to the responder node to indicate that the end user has started the pairing process and has selected the responder node. This could trigger the user interface of the responder node to proactively show the pairing code (e.g. through a pop-up) to improve the user experience.

Once the pairing code is known to the initiator node, the pairing process is started. It is established that both nodes are compatible and it is verified that the entered pairing code is correct. Pairing could either fail or succeed.

If pairing is performed successfully, the CEM and RM instances should establish a session with each other and communicate through the exchange of S2 messages. If the connection is interrupted, the instances will automatically try to reestablish the connection.

Once a CEM is paired, the user has to possibility to command either of the nodes to *unpair*. After unpairing the CEM and RM instances can no longer communicate through S2 (unless the end user pairs them again).

![Pairing_process_user](@site/static/img/communication-layer/pairing_process_user.png)

<details>
<summary>Image generated using the following PlantUML code:</summary>

```
@startuml
participant "Initiator node" as i
participant "Initiator node UI" as iui
actor "End user" as e
participant "Responder node UI" as rui
participant "Responder node" as r

e->iui: Provide identity of Responder node (e.g. URL)
rui->e: Retrieve pairing code
e->iui: Provide pairing code
i->r: Attempt pairing
r->i: Pairing result (success or failure)
iui->e: Pairing result (success or failure)
@enduml
```
</details>

## The node and the endpoint

Within this protocol we make a clear distinction between two types of identities: the one of the *endpoint* and the one of the *node* itself.

a node is an instance of a CEM or a RM. It is either a specific energy management system or service, or the representative of a physical energy flexible device, such as a heat pump or a home battery. It is typically easily recognized by the end user by its brand, device type, model name or maybe even a user given name.

The endpoint is basically the application that hosts the nodes. In a LAN deployment an endpoint might only host one node, and these identities may seem very similar. But in a WAN deployment, an endpoint could host all kinds of different types of nodes. It could for example be that a certain endpoint hosts RM instances for several brands of devices. Therefore an endpoint needs its own identity, which can be recognized by the end user. 

## Used technology for pairing and communication

An S2 connection basically consists of four steps: discovery, pairing, communication and unpairing. For these steps different types of technology are used.

One of the main technologies the process relies on is HTTP REST. All interactions based on HTTP are formally described in OpenAPI specification files. [OpenAPI](https://swagger.io/specification/) is a formal language for specifying HTTP based API's. It can be used to generate reference documentation for developers, as well as stub code for many programming languages.

### Discovery

The first step is finding the responder node from the initiator node. In principle this is done based on the URL of the responder node. However, to improve user experience, two systems exist to find this URL in a more user friendly manner. For more details see [Discovery](#discovery).

* If the responder node is deployed in the WAN, the end user can find the endpoint through the pairing endpoint registry. This would result in a list of vendors that offer nodes.
* If both nodes are deployed in the LAN however, the responder node can be detected automatically through a process based on DNS-SD. This way the user only has to select the desired node to connect to from a list of nodes which were discovered in the LAN. This process can also be used when a node is deployed in the WAN, but the device also has a presence in the LAN.

### Pairing

The pairing process itself is completely based on HTTP REST. One node behaves as the HTTP server, and the other as the HTTP client. This process is described in an OpenAPI file. The process consists of multiple steps. If the pairing process is completed successfully, the nodes will agree on an access token. This token is used to initiate communication or to unpair.

We'll refer to the endpoint that behaves as the HTTP server during the pairing process as the *pairing server*, and the client as the *pairing client*.

Pairing interaction is always TLS based (i.e. HTTPS is used). For WAN deployments, normal certificates (signed by a Certificate Authority) are being used. For LAN deployments self-signed certificates are used. For more information about the use of self-signed certificates, check [Trusting a self-signed root certificate](###Trusting-a-self-signed-root-certificate)

### Communication

Communication is setting up the actual session, where S2 messages are being exchanged.

The process always starts with HTTP based communication, but then is handed over to a protocol which supports a two-way messages based communication channel. Currently the only protocol that is being used is WebSockets, but there are plans to add other options in the future. The HTTP interface is also specified in an OpenAPI file, together with the unpairing process.

We'll refer to the endpoint that behaves as the HTTP server during the communication process as the *communication server*, and the client as the *communication client*.

It should be noted that pairing and communication are two separate HTTP interfaces, that don't have to be used in the same way. It could be that a node is an pairing client, but then becomes a communication server. This depends on the deployment of the nodes (see [Pairing details for different deployments](#pairing-details-for-different-deployments)).

Communication interaction is always TLS based (i.e. HTTPS is used). For WAN deployments, normal certificates (signed by a Certificate Authority) are being used. For LAN-LAN deployments self-signed certificates are used. For more information about the use of self-signed certificates, check [Trusting a self-signed root certificate](###Trusting-a-self-signed-root-certificate)

After the HTTP interaction a WebSocket is established (other transport protocols will be added in the future). The communication server is always the WebSocket server. This server must use the same TLS certificate as the HTTP server.

### Unpairing

Either node can take the initiative to unpair from the other node. This is done using the same HTTP OpenAPI specification and the same HTTP server and client as the communication. The details for unpairing differ depending if it is the communication server or if it is the communication client that initiates the unpairing process.

Unpairing interaction is always TLS based (i.e. HTTPS is used). For WAN deployments, normal certificates (signed by a Certificate Authority) are being used. For LAN-LAN deployments self-signed certificates are used. For more information about the use of self-signed certificates, check [Trusting a self-signed root certificate](###Trusting-a-self-signed-root-certificate)


## Pairing details for different deployments

As explained, the pairing process is based on HTTP REST calls. That means that for every pairing attempt, one node behaves as the HTTP server, and one HTTP node behaves as the pairing client. The logical solution would be to make the initiator node the HTTP client and the responder node the HTTP server. After all, it is the HTTP client that takes the initiative to contact the HTTP server. The HTTP server cannot take the initiative to contact the HTTP client.

The objective is to have all nodes be able to be the initiator node, as well as the responder node. This is necessary to provide a consistent user experience. The end user might not be aware which node is deployed in the LAN or in the WAN, and then it might be confusing that, for example, his energy management system both provides pairing codes and asks for pairing codes.

If every node must be able to be the initiator node in certain situations, and the responder node in other situations, and the easiest solution is to implement the initiator as HTTP client and the responder as HTTP server, you might come to the conclusion that every node needs to be able to behave both as an HTTP server and as an HTTP client.

There are however two situations where this is not possible:

* **WAN initiator node and LAN responder node**: Since the LAN is usually shielded from the WAN through a firewall or NAT, it is assumed that approaching a LAN HTTP server from a WAN client is not possible. This specifications offers two approaches to this problem:
  * Accept this limitation and not allow the WAN node to be the initiator node. Pairing can only be performed when the LAN node is the initiator node and the WAN node is the responder node. Special care must be taken to explain this to the end user.
  * Many modern devices or EMS systems are connected to a cloud backend managed by the OEM. If this is the case, it is possible to implement a pairing HTTP server in the cloud, even though the node itself is in the LAN. If the pairing is performed successfully in the OEM backend, the result of the pairing must be communicated to the node via the existing connection between device/EMS and the OEM backend. This solution is only intended for WAN clients and must not be used by LAN clients. There must always be a method for purely LAN based pairing.
* **LAN initiator RM and LAN responder RM**: Since one of the requirements is that a LAN RM instance can be implemented on restricted hardware, and a TLS enabled HTTP server is far more memory intensive than an HTTP client, there is an option to implement a LAN RM instance purely as an HTTP client. A long-polling mechanism is available to indicate to the HTTP server that the node is available for pairing. This mechanism is also used to initiate the pairing process from the HTTP server. In other words: in this specific situation the initiator node behaves as the HTTP server, and the responder node only has to be an HTTP client.

![Pairing_direction](@site/static/img/communication-layer/pairing_direction.png)


# Formal specification and versioning (normative)

This document serves as an overall specification of the S2 Connect protocol. However, where possible, the protocol has been specified in a formal specification language in order to minimize possibilities for different interpretations and allow tooling to assist the implementation of the specification. Since many details are better described in these formal specification files, they are not described in this document. **Where the formal specification files and this document overlap, the formal specification file takes precedence.**

| Part of specification | Description | Specification format | Location |
| --- | --- | --- | --- |
| S2 Connect pairing API | HTTP based interaction to pair two nodes | OpenAPI file | [Github](https://github.com/flexiblepower/s2-connect/blob/main/s2-connect-pairing.yml) |
| S2 Connect connection API | HTTP based interaction set up a communication channel for S2 messages between two nodes | OpenAPI file | [Github](https://github.com/flexiblepower/s2-connect/blob/main/s2-connect-connection-init.yml) |
| S2 Connect WAN pairing endpoint registry API | HTTP based interface to query the registry  | OpenAPI file | [Github](https://github.com/flexiblepower/s2-connect/blob/main/s2-connect-wan-endpoint-registry.yml) |
| S2 JSON message structure | The types of S2 messages that can be exchanges between nodes | JSON schema files | [Github](https://github.com/flexiblepower/s2-ws-json/tree/main/s2-json-schema) |

## Versioning of OpenAPI files
The pairing API, the session initiation API and the WAN pairing endpoint registry API are formally defined in OpenAPI files. To accommodate future changes to these APIs, the OpenAPI files are versioned. Versioning is done using a `major.minor` scheme. All S2 Connect OpenAPI files share the same version number.

The minor version is increased when backwards compatible changes are made. Be aware that we consider adding items to certain lists of enums (e.g. the list of supported hash functions) backwards compatible. Other examples of backwards compatible changes are additional properties of JSON files or added operations.

The major version is increased when non-backwards compatible changes are made.

The major version of the API is embedded in the base URL of the API as `/v[major]` (e.g. `/v1`). HTTP server and HTTP clients can decide to implement several major version of the API in parallel to increase interoperability. In that case server must server all version on the same base URL (e.g. `https://hostname.local/pairing/v1/...` and `https://hostname.local/pairing/v2/...`). The server **must** always (even when it only supports one major version of the API) serve an index (e.g. `https://hostname.local/pairing/`) which returns a JSON array with all supported versions as they are defined as port of the URL (e.g. `["v1", "v2"]`).

## Versioning of JSON Schema files
JSON Schema uses its own versioning scheme, which is based on an `major.minor.patch` scheme. When negotiating the S2 JSON version number, the exact version string **must** be used (e.g. `v1.0.0`).

## Addressing endpoints
The URL of the pairing and session initiation API are used in the discovery process, pairing process and session initiation process, as wel as the basis for TLS certificates.

For **WAN** deployed endpoints, the URL **must** be based on a DNS domain name.

For **LAN** deployed endpoints, the URL **must** be based on an mDNS alias or hostname (e.g. `hostname.local`). It is important that these names are *unique* and *stable*. Unique since there could be multiple instance within the same LAN, and stable because if it changes, the endpoint cannot be found by other endpoints. It should also be noted that the alias used by DNS-SD, and is presented to the end user. It recommended to choose a name that the end user should recognize and an element for the end user to make a distinction between two devices of the same type, such as a serial number.

## Selecting the version of REST APIs
As explained in the section [Versioning of OpenAPI files](#version) the pairing server, the session initiation server and the WAN pairing endpoint registry can implement multiple versions of the API specification in parallel. As a result, the client **must** always first determine which version of the API it will use, before it can start interacting with the API.

The image below depicts the interactions between client and server for the process to determine the API version that will be used.

![image](@site/static/img/communication-layer/api_version_selection.png)

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

@enduml
```
</details>

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
The server responds with a list of implemented major versions of the pairing API. It is formatted as a JSON array containing all the supported version of the pairing API (e.g. `["v1"]`).

If the HTTP client does not support any of the provided versions, it means that the two endpoints are not compatible, and that further interaction is not possible.

### 3. Decide pairing version
From the provided list of major versions of the pairing API, the HTTP client **must** select one that is implemented by the HTTP client itself (typically the highest supported version). The client **should** select the most recent version.

## HTTPS usage
All HTTP-based interaction in S2 Connect is strictly based on HTTPS (i.e., HTTP over TLS). HTTP (without TLS) **may not** be used for S2 Connect, and it is **recommended** to not run an HTTP (without TLS) server.

HTTP clients and servers **must** support HTTP version 1.1. It is **recommended** to support more recent version of HTTP as well.

# Pairing process (normative)

The pairing process is based on the trust relation that the end user has with both the CEM and the RM instances. That trust relation is out of scope for this specification and is up to CEM and RM providers to implement.

For each pairing attempt, one endpoint must be the HTTP server, while the other is the HTTP client. The table below defines which endpoint is het HTTP server or client is which situation.

| Initiator node | Responder node | Responder is exclusively RM? | Initiator HTTP role | Responder HTTP role | WAN pairing server | Remark |
| ----------------- | ----------------- | ---------------------------- | ------------------- | ------------------- | --------------------- | ------ |
| WAN | WAN | Doesn't matter | Client | Server | n/a |  |
| WAN | LAN | Doesn't matter | Client | n/a | Server | The WAN pairing server for LAN deployment is optional |
| LAN | WAN | Doesn't matter | Client | Server | n/a |  |
| LAN | LAN | Yes | Server | Client | n/a | Through long-polling. Decision to implement the server or the client is up to the RM endpoint. |
| LAN | LAN | Yes | Client | Server | n/a | Alternative for long-polling. Decision to implement the server or the client is up to the RM endpoint. |
| LAN | LAN | No | Client | Server | n/a |  |

> A LAN deployed RM implementation can choose if it implements the HTTP server, or that it implements the HTTP client and uses long-polling. This feature exists to accommodate RM implementations with constrained hardware.

A CEM can be paired with multiple RM's a the same time. A RM can only be paired with one CEM at a time. A node is always available for pairing. When a RM that is already paired with an CEM is paired with another CEM, the initial pairing is automatically unpaired. This automatic unpairing only happens after the new pairing is successfully completed. When a CEM and a RM are being paired when they already are paired with each other, it should be considered as an unpairing and new pairing (which means that a new `accessToken` is being used, and the current communication session should be terminated).

## Discovery

In order to ease the pairing process, which is specified below, the discovery process provides a way for nodes to find each other without requiring a user to know the pairing endpoint URL of the other node. In other words, the discovery process is a way to provide a node with the URL of another node which is needed to start the pairing process. Alternatively, it **must** always be possible to initiate the pairing by manually providing the URL by the end user.

There are two mechanisms for discovery: For discovering WAN endpoints there is a central online registry. For discovering endpoints within the same LAN, DNS-SD is used. DNS-SD can also be used to discovery WAN endpoints of devices that have a presence in the LAN (typically an energy smart appliance of which the RM is deployed in the cloud).

### WAN pairing endpoint registry

> Note: At this point the registry is specified, but not yet publicly available

The purpose of the registry is to facilitate a more user friendly way to determine the URL of the WAN pairing endpoint. Providers of an S2 Connect WAN pairing endpoint can register their endpoint at the registry. The user interface of a CEM or RM could show a list of relevant endpoints to the user (e.g., in a list or drop down menu) with details that would be easily recognizable to the end user (e.g., name and icon). By querying the registry, the user interface can always show an up-to-date list of endpoints. The registry contains filtering functionality to filter endpoints that are relevant in the context.

The registry uses the same version negotiation mechanism as the other S2 Connect OpenAPI files. Refer to [Selecting the version of REST APIs](#selecting-the-version-of-rest-apis) for information on how clients can select the API version to use.

The registry contains the following information for each endpoint. For full normative details see the OpenAPI specification files.

| Property | Description |
| --- | --- |
| `id` | Unique UUID identifier for the record |
| `name` | User facing name of the endpoint |
| `description` | User facing description of the endpoint|
| `icon32` | 32 by 32 pixel- icon of the endpoint |
| `icon128` | 128 by 128 pixels icon of the endpoint |
| `icon512` | 512 by 512 pixels icon of the endpoint |
| `pairingApiUrl` | The URL of the pairing API of the endpoint |
| `regions` | Array of regions in which this endpoint operates, as defined by the ISO 3166-1 alpha-2 country code |
| `status` | Status of the endpoint, can either be `testing` or `public` |
| `cem` | Boolean indicating if the endpoint represents CEM nodes |
| `rm` | Boolean indicating if the endpoint represents RM nodes |

In order to filter out the relevant endpoint records the API supports the following filters:

* Region in which the endpoint claims to be active
* Status, which can be `testing` or `public` (when no value provided, the default value will be `public`)
* Whether the endpoint contains CEM nodes
* Whether the endpoint contains RM nodes

In addition, the number of responses can be limited. An offset can also be provided in order to split the results over multiple requests.

### DNS-SD based discovery
DNS-SD is used to automatically discover nodes from a node that is deployed in the LAN. This method can be used in three ways.

* To discover another node that is deployed in the LAN, which is the responder node
* To advertise a [long polling URL](#long-polling) so other initiator nodes in the LAN could connect to this node
* To discover a node of which the RM is deployed in the WAN, but that also has a presence in the LAN.

S2 Connect uses the service type `s2connect` and exclusively uses tcp, since it is an HTTP based protocol. S2 Connect uses the following DNS-SD values:

| DNS-SD property | Value for S2 |
| --- | --- |
| Service type | `_s2connect` |
| Protocol | `_tcp` |
| Port | No fixed port, decision is up to the implementation |
| Subtypes | `_cem` and `_rm` |
| Service name | Identical to the hostname (see [here](#addressing-endpoints-normative) for more details)

An endpoint deployed in the LAN **should** publish it service through DNS-SD once it is ready for pairing, and until it shuts down.

A device has a presence in the LAN (e.g. a heat pump which is connected to the internet via the end user's WiFi), but has its RM deployed in the WAN, can still use DNS-SD to advertise its endpoint to any local nodes (e.g. a physical energy management device containing an CEM). In this case the device doesn't have to offer any actual service in the LAN; it merely uses the TXT record to advertise its WAN endpoint URL. An arbitrary port may be specified.

Two DNS-SD subtypes are used for endpoints. Subtypes can be used to filter services.

 * `_cem` is used when the endpoint contains one or more CEM node
 * `_rm` is used when the endpoint contains one or more RM node
 * `_cem` and `_rm` are both used when the endpoint contains both CEM and RM nodes

S2 uses the following TXT records when registering for services. In the table below, M indicates a mandatory value and O indicates on optional value.

| Record name | M/O | Description
| --- | --- | --- |
| `txtver` | M | Version of this specification of usage of the TXT record. **Must** be the literal value `1` for this version |
| `e_name` | O | The name of this endpoint (identical to the `name` property in the `EndpointDescription` object as defined in de OpenAPI specification) |
| `e_logoUrl` | O | The logoUrl of this endpoint (identical to the `logoUrl` property in the `EndpointDescription` object as defined in de OpenAPI specification) |
| `deployment` | M | **Must** be the literal value `LAN` or `WAN` (identical to the `logoUrl` property in the `EndpointDescription` object as defined in de OpenAPI specification) |
| `pairingUrl` | O | The base URL of the pairing API of this endpoint, excluding the version name but including the last slash (e.g. `https://hostname.local/pairing/`). If no value is provided, a `longpollingUrl` **must** be provided.
| `longpollingUrl` | O | The base URL of the pairing API of this endpoint on which the longpolling feature is implemented. The URL should be provided excluding the version name but including the last slash (e.g. `https://hostname.local/pairing/`). Only needs to be provided when longpolling is supported. Can only be provided if the value for `deployment` is equal to `LAN`.

> Note: It is mandatory to provide a value for at least one of the properties `pairingUrl` and `longpollingUrl`. Providing both is also possible.

The receiver of the service description **must** use the URL provided in the TXT records; not the hostname or IP-address and port associated with the service registry.

> Note: You may have noticed that the full URL of the endpoint is used in the TXT records, even though the endpoint and port are already exposed by DNS-SD itself. This is done to avoid any problems with TLS certificates, which are pinned to a certain domain name. When using a WAN endpoint, the full URL needs to be specified as well, since no local service is actually being offered.

> Scanning for endpoints could for example be done using the following [avahi](https://avahi.org/) command:
> 
> `avahi-browse -r _s2connect._tcp`
> 
> Registering an endpoint could for example be done using the following avahi command:
>
> `avahi-publish-service -s "EVSE1038"  _s2connect._tcp 443 "txtvers=1" "e_name=brand" "deployment=LAN" "pairingUrl=https://EVSE1038.local:443/pairing/" --sub _rm._sub._s2connect._tcp`

## The pairing token, the node ID alias and the pairing code

The pairing token is a random string of characters that is generated by the responder node. It is a secret which is transferred by the end user to the initiator node, and then is verified during the pairing process. Since there will be many cases where the end user has to manually type in the pairing token, the pairing token has to be short enough to make it easy for the end user to type in, but long enough to make it secure. 

The pairing token may consist out of lower case letters, upper case letters and numbers. The pairing token **must** be generated by a cryptographically secure pseudorandom number generator. The pairing token is typically dynamically generated when the user requests the pairing token at the user interface of the responder node. Dynamically generated pairing tokens **must** expire after a duration; five minutes is the recommended duration. However, energy flexible devices that do not have a user interface are allowed to have a static pairing token, that for example can be printed somewhere on the physical device. Static pairing tokens do not expire. Dynamic pairing tokens **must** contain at least 4 characters. Static paring tokens **must** contain at least 6 characters. Pairing tokens may be as long as the developer deems necessary.

| Type of pairing token | Minimal length | Validity | Regular expression |
| --- | --- | --- | --- |
| Dynamic pairing token | 4 characters | Limited duration, 5 minutes is recommended | `^[0-9a-zA-Z]{4,}$` |
| Static pairing token | 6 characters | Indefinitely | `^[0-9a-zA-Z]{6,}$` |

An endpoint can host multiple nodes. When attempting to pair a certain node, the endpoint needs to know exactly which of its nodes this pairing attempt is aimed at. Nodes are uniquely identified with their node ID. Since this node ID is a UUID, it is pretty long and cumbersome to type in. That is why an endpoint can assign its nodes a *node ID alias*. This is an identifier that is intended to be short, and only unique within the context of this particular endpoint. Node ID aliases could be assigned by the endpoint whenever new nodes are created, but also could be generated dynamically only when someone is attempting to pair to this node. This way, node ID aliases have a short live, and can be reused by other nodes at other moments. This allows to use shorter node ID aliases. Node ID aliases are a string of characters, which may include lower case letters, upper case letters and numbers. Node ID aliases are ideally as short as possible (at least one character), but should of course be long enough to allow the endpoint to uniquely identify a node. When an endpoint only contains one node, there is no need for a node ID alias.

The **node ID alias** can be validated with the following regular expression:

```
^[0-9a-zA-Z]+$
```

Although the pairing token and the node ID alias are two separate strings, which are treated completely differently in the pairing process, they are presented together to the user as one string: the *pairing code*. The pairing code is simply the node ID alias, followed by a dash ('-'), followed by the pairing token. When there is no node ID alias, the pairing code is simply identical to the pairing token.

> Note: The node ID alias is not secret and is exchanged during a pairing attempt. The pairing token is secret. It is never exchanged; it is  only used as input for the challenge response function.

```
When no node ID alias is used (i.e. the endpoint only contains one node):
  [pairing code] = [pairing token]
When a node ID alias ID is used:
  [pairing code] = [node ID alias]-[pairing token]
```

Alternatively, the **pairing code** can be validated with the following regular expression:

```
^([0-9a-zA-Z]+-)?[0-9a-zA-Z]{4,}$
```

The pairing code allows us to transfer two pieces of information by only bothering the end user once. Due to its format the initiator node can easily extract the node ID alias and the pairing token from the pairing code by splitting the string at the dash. 


## Challenge response process

This protocol uses a two-way challenge response process to verify that both nodes have the same pairing token. For this process it doesn't matter which node has issued the pairing token and which node has the pairing token that was entered by the end user. The reason a two-way challenge response process is used to verify the pairing token is that it allows to establish trust without having to expose the pairing token. Both a challenge and a response are binary data, which are encoded using Base64.

The challenge that is generated by the HTTP Client is called the `clientHmacChallenge`. The response to this challenge, generated by the HTTP server, is called the `clientHmacChallengeResponse`. The challenge that is  generated by the HTTP server is called the `serverHmacChallenge`. The response to this challenge, generated by the HTTP Client, is called the `serverHmacChallengeResponse`.

A challenge is a nonce; a random binary data. It **must** be generated by a cryptographically secure pseudorandom number generator and it **must** have a minimal length of 32 bytes. The response is calculated based on the function described below. Both the generator of the challenge and the receiver of the challenge calculate the response based several input parameters. Since both nodes should have the same input, both nodes should calculate the same response. The node that received the challenge sends it back to the node that generated the challenge. Now the node that generated the challenge simply has to check if the received response is identical to the expected response that he calculated himself.

The algorithm to calculate the response is based on the HMAC (hash-based message authentication code) function. This function has a *key* and a *message* as arguments. Most programming languages have a function or library available that provides HMAC functions.

The HMAC function itself uses a cryptographic hash function for its calculations. Since cryptographic hash functions might contain vulnerabilities, this protocol uses a simple selection mechanism for the cryptographic hash function. The HTTP client sends with the requestPairing HTTP request a list of supported hash functions. In the response the HTTP server indicates which hash function it has selected from this list. This function **must** be used for all response calculations during het pairing attempt. Currently there is only one hash function available (SHA256), but other options might be added in the future.

It order to avoid man-in-the-middle attacks, information about the connection in also used as input for calculating the response. When both nodes are deployed in the LAN, the SHA256 fingerprint of the server certificate is used. In other scenarios, the domain name of the server is included in the calculation of the response.

Note that the challenge and response are binary data. Both are encoded using Base64 and must also be decoded before they can be used. SHA256 certificate fingerprints are encoded into a hexadecimal string, and must be decoded as hexadecimal string before it can be used as input (note that fingerprint strings usually contain colons to separate bytes). The pairing token and domain name are strings, which need to be converted into binary data using the ASCII table.

The exact function to calculate the response depends on the deployment of the nodes.

```
When the pairing server is deployed in the LAN:
  R = HMAC(C, T || F)

When the pairing server is deployed in the WAN:
  R = HMAC(C, T || D)
```

Where:
| Symbol | Type | Meaning |
| ------ | ------- | ---- |
| `R` | Binary data | Response |
| `HMAC` | Function | HMAC function for the selected cryptographic hash function. The first argument is the secret key, the second argument is the message. |
| `C` | Binary data | Challenge |
| `T` | Binary data | Pairing token |
| `F` | Binary data | SHA256 fingerprint of the TLS server certificate (i.e. leaf certificate) |
| `D` | Binary data | The domain name of the HTTP server, including subdomains, without protocol or trailing slashes (e.g. `pairing.s2.example.com`) |
| `\|\|` | Function | Concatenation function |

## Getting endpoint information

> This section is only applicable for LAN-LAN pairing

Once a LAN endpoint has discovered a LAN pairing endpoint (through DNS-SD or by the end user manually entering the URL), it still knows very little about the endpoint. There are two REST operations that allow an HTTPS client to query information of a server endpoint: performing a GET on `/endpoint` and performing a GET on `/nodes`.

These operations **must** be implemented by LAN deployed endpoints, but **must not** be implemented by WAN deployed endpoints. These operations can be used in the situation where the initiator node is the HTTPS client and the responder node is het HTTPS server (for the situation where it is the other way around see [Long-polling](#long-polling)).

Before the HTTPS client can start interaction with the server, it must first select a version of the API to use. See [Selecting the version of REST APIs](#selecting-the-version-of-rest-apis). For full normative details see the OpenAPI specification files.

* The client can perform an HTTPS GET request on the path `/endpoint` to receive the remote endpoint details.
* The client can perform an HTTPS GET request on the path `/nodes` to receive a list of node details for all the nodes represented by the endpoint.

Note that there is no authentication for these operations. It is assumed that these operations are only exposed within the LAN.

## Pre-pairing interaction

> This section is only applicable for LAN-LAN pairing

Once the end user has selected a responder node it wants the initiator node to pair with, the end user probably still has to retrieve the pairing code from the responder node. In order to improve the user experience, the initiator node can send a *prepare pairing* signal to the responder node. The responder node **may** use this signal to proactively show the pairing code in its user interface, for example in the form of a pop-up or notification. This saves the end user the trouble of searching where to find the pairing token in the user interface. It is also possible for the initiator node to send a *cancel prepare pairing* signal to the responder node, in case the end user has no longer selected the responder node it wants to pair with. Sending these signals **must** be implemented by the client, but only when there is a clear distinction between the moment the prepare pairing signal is sent and when the actual pairing starts. The receiver of these signals **may** process these signals by showing the pairing token in its user interface. When the prepare pairing signal is sent, it is not guaranteed that a cancel prepare pairing or a pairing attempt will follow.

These operations **must** be implemented by LAN deployed endpoints, but **must not** be implemented by WAN deployed endpoints. These operations can be used in the situation where the initiator node is the HTTPS client and the responder node is het HTTPS server (for the situation where it is the other way around see [Long-polling](#long-polling)).

Note that there is no authentication for these operations. It is assumed that these operations are only exposed within the LAN.

Before sending signals the HTTPS client **must** have selected the version of the pairing API that will be used (see [Selecting the version of REST APIs](#selecting-the-version-of-rest-apis)).

## Sending the prepare pairing signal

The client can send the prepare pairing signal to the server by sending an HTTPS POST request to the path `/preparePairing`. The client must perform the following checks before sending information:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Sending signal failed, do not proceed with sending signal |

The client **must** send the following information in the request. For full normative details see the OpenAPI specification files.

| Property | Description |
| --- | --- |
| `clientNodeDescription` | Details of the node at the client that the end user intents to pair with the node at the server |
| `clientEndpointDescription` | Details of the client endpoint |
| `serverNodeId` | The node ID of the node at the server that the end user intents to pair with the node at the client (see [Getting endpoint information](#getting-endpoint-information) for details on how to retrieve the server node ID) |

The server **must** perform the checks in the table below. For the checks with HTTP status 400, a `PairingResponseErrorMessage` must be send. In that case, the contents of the `additionalInfo` field is supposed the be helpful and up to the implementer.

| Check | Status code | Type of `PairingResponseErrorMessage` when check fails |
| --- | --- | --- |
| Is the request properly formatted and does it follow the schema? | 400 | `ParsingError` |
| Does it recognize the `serverNodeId`? | 400 | `NodeNotFound` |
| Are the endpoint and node ready for pairing? | 400 | `Other` |
| Does the targeted node have a different role than the initiator node (i.e. you cannot pair two RM's or two CEM's)? | 400 | `InvalidCombinationOfRoles` |

If no checks fail the server **should** respond with HTTP status code 204.

## Cancelling the prepare pairing signal

If the client sent a prepare pairing signal the the server, and the end user has indicated in some way that it is no longer indented to pair with the node, it **should** send a cancel prepare pairing signal. It can do that by sending an HTTPS POST request to the path `/cancelPreparePairing`. The client must perform the following checks before sending information:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Sending signal failed, do not proceed with sending signal |

The client **must** send the following information in the request. For full normative details see the OpenAPI specification files.

| Property | Description |
| --- | --- |
| `clientNodeId` | The node ID of the node at the client that the end user intents to pair with the node at the server |
| `serverNodeId` | The node ID of the node at the server that the end user intents to pair with the node at the client |

The server **should** respond with HTTP status code 204 (even when it does not recognize the `clientNodeId` or `serverNodeId`).

## Long-polling

> This section is only applicable for LAN-LAN pairing

The long-polling feature is intended to support endpoints that only want to implement an HTTP client, and not an HTTP server. Typically this is because the endpoint runs on constrained hardware. An endpoint is only allowed to only implement the client if it exclusively hosts nodes that have the RM role.

Imagine we have endpoints, one only hosting a CEM node, and one only hosting a RM node. The RM runs on constrained hardware, and only implements the HTTP client. We have two situations:

1. **The RM is the initiator node and the CEM is the responder node**: The CEM issues a pairing code, the end users enters the pairing code in the UI of the RM. The RM endpoint (HTTP client) then sends a normal HTTP request to the CEM endpoint (HTTP server) to initiate pairing. The normal pairing process can be used, and long-polling is not required.
2. **The CEM is the initiator node and the RM is the responder node**: The RM issues a pairing code (a dynamic pairing code through its UI, or a static pairing code for example through a sticker on the hardware), the end user enters the pairing code in the UI of the CEM. Now the CEM endpoint (HTTP server) cannot use the normal pairing process, since it has no way to contact the RM endpoint (HTTP client).

For the second situation the long-polling feature can be used. It can be used by the initiator node (the HTTP server) to notify the responder node (the HTTP client) it wants to pair.

> Informative: Long-polling is a technique that allows the server to send signals to the client without a significant delay, and without relying on additional technologies such as Websockets or Server-Sent Events. The common alternative is polling, where the client sends a request on a regular interval; let's say every 30 seconds. Polling creates a delay from the perspective of the server. If the server wants to send something to the client, it has to wait until the client contacts the server; which in the worst case 30 seconds. With long-polling the server doesn't immediately respond the the request (a hanging HTTP request). It responds immediately when the server wants the client to do something, or just before the request would time out. After receiving the response from the server the client immediately opens a new request to allow the server to send signals the client again.

The long-polling feature fulfills the following functionality:
* Make the existence of the client known to server, together with the nodes IDs of the nodes that are represented by the client endpoint
* Send the `NodeDescription` and `EndpointDescription` of nodes represented by the client when requested by the server
* Send a prepare pairing signal or cancel prepare pairing from the server to the client for a particular node ID
* Send the signal from the server to the client to initiate pairing for a particular node ID
* Send an error message from the client to the server when pairing cannot be performed

A client capable of long-polling **should** initiates long-polling when it encounters a endpoint through DNS-SD that indicates that is available for long-polling requests. When the endpoint represents zero nodes the client **cannot** attempt long-polling. When the endpoint advertisement itself, or only its long-polling indication disappears from DNS-SD the client **should** stop the long-polling process for that server. The client **must** also stop when it is no longer capable of pairing.

The server **must** always respond within 25 seconds after receiving the request. The client **must** use a request time-out of at least 30 seconds.

> TODO: Move the OpenAPI version selection process to its own section so we don't have to explain it every time

The client starts the process by doing a POST request to the `/waitForPairing` path. For full normative details see the OpenAPI specification files. The request body contains a list of objects. The client **must** always provide an object for each node ID it represents. The items in the list have a mandatory property `clientNodeId` and optional parameters `clientNodeDescription`, `clientEndpointDescription`. The client should only provide values for these properties when requested by the server. The object also contains the optional property `errorMessage`, which only should be used when an error has occurred before pairing.

When the server wants the client to immediately do a new request, it responds with status code 204. When it wants the client to do something, it responds with status 200 and a response body containing a list. This list contains an object only for node IDs represented by the client, that the server wants to do something with. This object contains the mandatory properties `clientNodeId` and `action`. The `action` property is an enumeration indicating an action the server wants to execute for a specific node. The possible action values are `sendNodeDescription`, `preparePairing`, `cancelPreparePairing` and `requestPairing`.

The table below indicates how the client should respond to the requests of the server. Note that the server could send multiple actions (for different node IDs) in the same response. The server **cannot** provide multiple objects for the same node ID in one response.

| Status code | Value `action` | Pairing code entered? | What should the client do | What should the client include in the next request body |
| --- | --- | --- | --- | --- |
| 204 | n/a | n/a | Only send a next request | Only the `clientNodeId` |
| 200 | `sendNodeDescription` | n/a | Only send the next request | The `clientNodeId`, `clientNodeDescription` and `clientEndpointDescription` |
| 200 | `preparePairing` | n/a | Prepare pairing for the mentioned node ID and send the next request | Only the `clientNodeId` | n/a |
| 200 | `cancelPreparePairing` | n/a | Cancel prepare pairing for the mentioned node ID and send the next request | Only the `clientNodeId` |
| 200 | `requestPairing` | Yes | Initiate the pairing for the mentioned node ID and send the next request | Only the `clientNodeId` |
| 200 | `requestPairing` | No | Initiate the pairing for the mentioned node ID and send the next request | Only the `clientNodeId`, and for the associated object provide an `errorMessage` with value `NoValidTokenOnPairingClient` |
| 400 | n/a | n/a | Stop long-polling until next time long-polling is advertised through DNS-SD | n/a |
| 401 | n/a | n/a | Stop long-polling, do not attempt long-polling with this node again | n/a |
| 500 | n/a | n/a | Wait before trying to send the next request | Only the `clientNodeId`|

2. **The CEM is the initiator node and the RM is the responder node**: The RM issues a pairing code (a dynamic pairing code through its UI, or a static pairing code for example through a sticker on the hardware), the end user enters the pairing code in the UI of the CEM. Now the CEM endpoint (HTTP server) cannot use the normal pairing process, since it has no way to contact the RM endpoint (HTTP client).

When the server sends the `requestPairing` action, the node on the client must already have issued a pairing token. If the node uses a dynamic pairing code, it could be the case that the pairing code has expired, or that no pairing code has been issued in the first place. In that case the client **must** perform a new request with an `errorMessage` containing the value `NoValidTokenOnPairingClient` in the object associated with the node ID of the node should have attempted to pair.

The activity diagram below summarizes the complete long-polling process from the perspective of the client.

![image](@site/static/img/communication-layer/long-polling_activity_diagram.png)

## Pairing interaction

The pairing process itself consists of several HTTP interactions between client and server. The image below depicts a successful pairing process between two nodes. 

![image](@site/static/img/communication-layer/pairing_http_process.png)

<details>
<summary>Image generated using the following PlantUML code:</summary>

```
@startuml
participant "HTTP Client" as Client
participant "HTTP Server" as Server

'compatibility check
Client->Server: 1. POST /[version]/requestPairing
activate Server
Server->Server: 2. Calculate clientHmacChallengeResponse
Server-->Client: 3. Response status 200
deactivate Server

Client->Client: 4. HTTP Client checks clientHmacChallengeResponse

Note over Client: HTTP Client now trusts HTTP Server

Client->Client: 5. Calculate serverHmacChallengeResponse

alt Pairing server is Communication Server
    Client->Server: 6A. POST /[version]/requestConnectionDetails
    activate Server
    Server->Server: 7A. HTTP Server checks serverHmacChallengeResponse
    Note over Server: HTTP Server now trusts HTTP Client
    Server-->Client: 8A. Response status 200
    deactivate Server
else Pairing server is Communication Client
    Client->Server: 6B. POST /[version]/postConnectionDetails
    activate Server
    Server->Server: 7B. HTTP Server checks serverHmacChallengeResponse
    Note over Server: HTTP Server now trusts HTTP Client
    Server-->Client: 8B. Response status 204
    deactivate Server
end

Client->Server++: 9. POST /[version]/finalizePairing
Server-->Client: 10. Response status 204
deactivate Server

Note over Client, Server: Pairing finalized

@enduml
```
</details>

### 0. Precondition

Before two node can be paired, the following preconditions must be met.

1. The HTTP server and the HTTP client can only start with a pairing request when they are fully initialized and have all the details of the nodes it represents available. 
2. The HTTP client must have the base URL of the pairing API (e.g. `https://hostname.local/pairing/`)
3. The HTTP client must have selected the version on the pairing API that will be used (see [Selecting the version of the pairing or session initiation API](#selecting-the-version-of-rest-apis))
4. Both nodes must have a pairing token available. Either because they issued this token themselves, or because the end user has provided it through the user interface.

> Note: The initiator node could be the HTTP server or the HTTP client

If the HTTP client does not fulfill these preconditions, it **cannot** send the first HTTP request of the pairing process. 

### 1. POST /[version]/requestPairing
In the first POST request the client provides the server with same information about itself. The main purpose of this is to check if these two nodes are compatible.

The client sends the following information (for full details see the OpenAPI specification file):

| Information | Description |
| --- | --- |
| `clientNodeDescription` | Information about the node that wants to pair, such as brand, logo and type. Important fields include `id` (the node ID) and `role` of the initiator node |
| `clientEndpointDescription` | Information about the client endpoint. An important field is the deployment. |
| `nodeId` | The nodeID of the node that is being targeted (this filed can be omitted if the client only knows the `nodeIdAlias` or when the endpoint only represents one node). |
| `nodeIdAlias` | The nodeIdAlias of the node that is being targeted (this field can be omitted if the client only knows the `nodeId` or when the endpoint only represents one node) |  
| `supportedCommunicationProtocols` | List of supported communications protocols of the client |
| `supportedS2MessageVersions` | List of supported S2 message versions by the client |
| `supportedHmacHashingAlgorithms` | List of supported hashing algorithms for the challenge response function (currently only `SHA256` is supported and **must** be present) |
| `clientHmacChallenge` | The challenge of the client for the challenge response process (see [Challenge response process](#challenge-response-process) |
| `forcePairing` | Indicate if the nodes must pair, even though they (currently) do not support the same S2 message versions (this could in the future be solved with a software update) |

Be aware that the client may never provide a value for `nodeId` and `nodeIdAlias` at the same time. When the server endpoint only represents one node, both properties may be omitted.

The client **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Pairing is failed, do not proceed with the pairing attempt |
| If self-signed TLS certificate, check if server is local | Pairing is failed, do not proceed with the pairing attempt |
| Check if same fingerprint is used as previous request (when applicable) | Pairing is failed, do not proceed with the pairing attempt | 

If no checks fail the client **should** proceed to the next step.


The server **must** perform the checks in the table below to make sure that it can proceed with this request. If one of these checks fail, the server should respond with an HTTP status 400 and a `PairingResponseErrorMessage`. The contents of the `additionalInfo` field is supposed the be helpful and up to the implementer.

| Check | Type of `PairingResponseErrorMessage` when check fails | Can be ignored when  `forcePairing` is true ?|
| --- | --- | --- |
| Is the request properly formatted and does it follow the schema? | `ParsingError` | No |
| Does it recognize the `nodeIdAlias`? | `NodeNotFound` | No |
| Are the endpoint and node ready for pairing? | `Other` | No |
| If no `nodeIdAlias` provided, does this endpoint indeed only represent one node? | `NoNodeIdProvided` | No |
| Does the targeted node have a different role than the initiator node (i.e. you cannot pair two RM's or two CEM's)? | `InvalidCombinationOfRoles` | No |
| Does the server accept any of the provided hashing algorithms for the challenge response process? | `IncompatibleHmacHashingAlgorithms` | No |
| Is there overlap between the communication protocols? | `IncompatibleCommunicationProtocols` | Yes |
| Is there overlap between the S2 message versions? | `IncompatibleS2MessageVersions` | Yes |
| If the targeted node on the HTTP server is the initiator node, did the end user provide a valid pairing token? | `NoValidPairingTokenOnPairingServer` | No |
| If the targeted node on the HTTP server is the responder node, does the node have a pairing token which has not expired? | `NoValidPairingTokenOnPairingServer` | No |
| Is this is a WAN pairing server for a LAN endpoint, does the client have a WAN deployment? | `Other` | No |

> Note: If the node that is being paired is an RM which is already paired, the pairing process proceeds. When the paring process is finished successfully the existing pairing relation must be unpaired.

> Note: If the targeted node is already paired with the initiator node, the pairing process proceeds. When the paring process is finished successfully the existing pairing relation is maintained.

> Note: This is the only step where it is checked if the pairing code has expired. If the pairing token expires after this step, but during the pairing process, the pairing process will continue. A pairing attempt is limited to 15 seconds.

If no checks fail the server **should** proceed to the next step.

### 2. Calculate clientHmacChallengeResponse
The server selects an hashing algorithm for the challenge response function from the list that was provided by the client. This has to be a hashing algorithm that the server considers secure. The server calculates a response to the provided `clientHmacChallenge`. For details see [Challenge response process](#challenge-response-process).

To mitigate brute-force attacks, the server **must** enforce a mandatory delay of one second before sending its response to the client (step 3). For any given node at the server, pairing attempts **must** be handled sequentially, such that each second only one pairing attempt can be processed for a node. Pairing attempts targeting different nodes **may** be processed in parallel. This way, a server representing multiple nodes is not globally limited to one pairing attempt per second, but instead enforces the one-second rate limit independently per node.

### 3. Response status 200
In order to formulate a response, the server **must** generate a `pairingAttemptId`. This is an identifier that **must** be generated by a cryptographically secure pseudorandom number generator and encoded using Base64. This identifier is used to keep track of all the HTTP interactions during the pairing attempt, and **must** be provided by the HTTP client as a header with all subsequent interactions. A pairing attempt **must** be completed within 15 seconds, or else the server **must** assume the pairing attempt has failed.

The server responds with the following information (for full details see the OpenAPI specification file):

| Information | Description |
| --- | --- |
| `pairingAttemptId` | The generated identifier for this pairing attempt |
| `serverNodeDescription` | Information about the node that is being targeted, such as brand, logo and type. Important fields include `id` (the node ID) and `role` of the responder node |
| `serverEndpointDescription` | Information about the server endpoint. An important field is the deployment. |
| `selectedHmacHashingAlgorithm` | The hashing algorithm for the challenge response function as selected in step 2 |
| `clientHmacChallengeResponse` | The response to the challenge provided by the HTTP client as calculated in step 2 |
| `serverHmacChallenge` | The challenge created by the HTTP server for the challenge response process (see [Challenge response process](#challenge-response-process).) |

The client **must** perform the following checks of this data.

| Check | How to proceed if check fails |
| --- | --- |
| Can the contents of the response be parsed? | Do not proceed with the pairing attempt |
| Is the response formatted according to the schema? | call `/finalizePairing` where `success` is `false` if `pairingAttemptId` is available |
| Is the role of the node at the server compatible? | call `/finalizePairing` where `success` is `false` |

If no checks fail the server **should** proceed to the next step.

### 4. HTTP Client checks clientHmacChallengeResponse
The HTTP client checks the `clientHmacChallengeResponse` provided by the HTTP server in step 3. It does that by calculating the response itself, and checking if the results is identical to the `clientHmacChallengeResponse`.

If the result is identical, the client **should** proceed to the next step. If the result is not identical, the client **must** stop the pairing attempt. It **must** attempt to inform the HTTP server of this by doing an HTTP request to `finalizePairing` where the value of `success` must be `false`.

Note that in case of a local server, the TLS certificate fingerprint is part of the challenge. So if the challenge succeeds, the certificate fingerprint is correct, and the certificate can be trusted. The client **must** pin this certificate, and trust this certificate for future use.


### 5. Calculate serverHmacChallengeResponse
The HTTP client calculates a response to the provided `serverHmacChallenge` using the hashing algorithm as indicated in the `selectedHmacHashingAlgorithm`. For details see [Challenge response process](#challenge-response-process).

From hereon the process branches into two scenarios, depending on if the HTTP client will be the communication client or the communication server. See [Mapping the CEM and RM to communication server or client](#mapping-the-cem-and-rm-to-communication-server-or-client) for which node will perform which role for communication.

If the HTTP server will be the communication *server* steps 6A, 7A and 8A **should** follow. If the HTTP server will be the communications *client* steps 6B, 7B en 8B **should** follow.

### 6A. POST /[version]/requestConnectionDetails
> Note: The `pairingAttemptId` must be provided through a header for this HTTP request

The HTTP client makes a request for the connection details. This request also serves as a way to send the HTTP server the `serverHmacChallengeResponse` calculated in step 5.

If the `pairingAttemptId` is not recognized by the server (or has expired), the server **must** respond with status code 401.

If the request was not understood by the server for any other reason, the server **must** respond with status 400.

The client **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Pairing is failed, do not proceed with the pairing attempt |
| If self-signed TLS certificate, check if server is local | Pairing is failed, do not proceed with the pairing attempt |
| Check if TLS certificate is pinned | Pairing is failed, do not proceed with the pairing attempt | 

If no checks fail the client **should** proceed to the next step.


### 7A. HTTP server checks serverHmacChallengeResponse
The HTTP server checks the `serverHmacChallengeResponse` provided by the HTTP client in step 6A. It does that by calculating the response itself, and checking if the results is identical to the `serverHmacChallengeResponse`.

If the result is identical, the server **should** proceed to the next step. If the result is not identical, the server **must** stop the pairing attempt by responding with HTTP status code 403. The `pairingAttemptId` cannot be used by the HTTP client anymore. If the HTTP client wants to make another attempt, it **must** start again at step 1 (starting with the API version selection process is also allowed).

### 8A. Response status 200
The server **must** generates an access token for the HTTP client. The access token is random binary data and **must** be generated by a cryptographically secure pseudorandom number generator and **must** have a minimum length of 32 bytes. It is encoded using Base64. The access token **cannot** be used by the initiator node until the pairing process is completed.

The server responds with two pieces of information:

| Information | Description |
| --- | --- |
| `initiateConnectionUrl` | The base URL for the connection process (does not include the version number) |
| `accessToken` | The access token that was generated for this node | 

If the response is understood and properly formatted, the HTTP client **should** proceed to the next step. Otherwise the HTTP client **must** stop the pairing attempt. It **must** attempt to inform the HTTP server of this by doing an HTTP request to `finalizePairing` where the value of `success` must be `false`.

### 6B. POST /[version]/postConnectionDetails
> Note: The `pairingAttemptId` must be provided through a header for this HTTP request

The HTTP sends the connection details to the HTTP server. This request also serves as a way to send the HTTP server the `serverHmacChallengeResponse` calculated in step 5. 

In this case the pairing server will become the communication client. Once the pairing server becomes the communication client, it does not know what the certificate that the communication server will use. That is why it needs to provide it using the property `certificateFingerprint`. This property is a map, where the key of the map is the hashing algorithm used to generate the fingerprint, and the value is the fingerprint itself. The hashing function `SHA256` and the related fingerprint **must** always be provided.

| Information | Description |
| --- | --- |
| `serverHmacChallengeResponse` | The response for the challenge response process |
| `initiateConnectionUrl` | The base URI for the connection process (does not include the version number) |
| `accessToken` | The access token that was generated for this node |
| `certificateFingerprint` | A map with the fingerprint of the CA (root) certificate. The key of the map is the name of the hashing algorithm used to generate the fingerprint, the value is the fingerprint itself. The key `SHA256` must always be provided. |

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

### 7B. HTTP server checks serverHmacChallengeResponse
The HTTP server checks the `serverHmacChallengeResponse` provided by the HTTP client in step 6A. It does that by calculating the response itself, and checking if the results is identical to the `serverHmacChallengeResponse`.

If the result is identical, the server **should** proceed to the next step. If the result is not identical, the client **must** stop the pairing attempt by responding with HTTP status code 403. The `pairingAttemptId` cannot be used by the HTTP client anymore. If the HTTP client wants to make another attempt, it **must** start again at step 1 (starting with the API version selection process is also allowed).

### 8B. Response status 204
The server confirms it has accepted the response and received the connection details by responding with HTTP status 204.

### 9. POST /[version]/finalizePairing
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

Receiving a `/finalizePairing` request marks the completion of the pairing attempt for the HTTP server. If the HTTP server issued an access token during this pairing attempt, it can now be used by a communication client to set up an S2 connection. The `pairingAttemptId` can no longer be used by the HTTP client.

### 10. Response status 204
To confirm the successful completion of the pairing attempt, the HTTP server responds to the client with HTTP status code 204. This response marks the completion of the pairing attempt for the HTTP client. If the HTTP client issued an access token during this pairing attempt, it can now be used by a communication client to set up an S2 connection. The `pairingAttemptId` can no longer be used by the HTTP client.

If the HTTP server was using a self-signed TLS certificate, the HTTP client can now store the self-signed root certificate. The client **must** check that this is the CA certificate that is used for all future interaction with this endpoint. The HTTP server is allowed to use a new self-signed server certificate, as long as it is signed by the self-signed CA certificate that was used during the pairing process.

### Interruption of the process
A pairing attempt has a maximum duration of 15 seconds. That means that once a `pairingAttemptId` has been issued, this `pairingAttemptId` cannot be used after 15 seconds since it was issued. From the perspective of the HTTP server, any pairing attempt that is not completed in 15 seconds (with success or not) is considered a failed attempt. From the perspective of the HTTP client, if the server does not respond within 15 seconds since it received the `pairingAttemptId`, it must consider the pairing attempt as failed. If the HTTP client wants to make another attempt, it should start again at step 1 (starting with the API version selection process is also allowed).

### Invalid interactions
If the server receives a wrong HTTP request (e.g. `/postConnectionDetails` while it was expecting `/requestConnectionDetails`) or when it receives the requests in the wrong order (e.g. `/finalizePairing` with `success` = `true` before calling `/requestConnectionDetails`) it **must** respond with a status 400 and consider the pairing attempt as failed. The only exception is receiving the same request twice.

# S2 Connection (normative)

After two nodes have been paired, the nodes exchange S2 messages over a secure connection. 

The following mechanism **must** be used to initiate a secure connection between two nodes. Client authentication is based on a one-time use communication token that needs to be renewed every time a new S2 session is created. The communication client will always attempt to set up an S2 connecting with the communication server when there is no connection. For more details see [Reconnection strategy](#reconnection-strategy). 

## Mapping the CEM and RM to communication server or client

The CEM and RM roles defined by the S2 protocol are distinct from the server and client roles of the pairing process. The following rules apply to determine whether the RM or CEM acts as a client or server for the communication initialization.

* If a connection is set up between a WAN node and a LAN node, the WAN node must act as a communication server, and the local node must act as a communication client.
* If a connection is set up between two nodes that are similarly deployed (i.e. both in WAN, or both in LAN), the CEM must act as a communication server, and the RM must act as a communication client.

There are four scenarios for CEM and RM deployment, and applying the rules above yields the following:

| CEM deployment | RM deployment | CEM acts as | RM acts as |
|----------------|---------------|-------------|------------|
| WAN | WAN | Communication server | Communication client |
| WAN | LAN | Communication server | Communication client |
| LAN | WAN | Communication client | Communication server |
| LAN | LAN | communication server | Communication client |

> Note: A device developed solely for use as an RM in a LAN setup will never function as a communication server.

## Session initiation

During the pairing process an `accessToken` is generated by the node which will be the communication server and sent to the node that will be the communication client. This `accessToken` can be used by the communication client to set up a session with the communication server for exchanging S2 messages. The `accessToken` does not expire, but it can only be used (successfully) once to set up a session. Each time a new session is made, the `accessToken` will be renewed. The communication server will generate a new `accessToken` and sends it to the communication client. Since this `accessToken` is the only means to connect two nodes once they are paired, the session initiation process makes sure that both nodes confirm that they have successfully persisted the new `accessToken` before invalidating the old `accessToken`.

![session initiation](@site/static/img/communication-layer/session-initiation.png)

<details>
<summary>Image generated using the following PlantUML code:</summary>

```
@startuml
participant "HTTP Client" as Client
participant "HTTP Server" as Server

Client->Server++: 1. POST /[version]/initiateSession
Server->Server: 2. Generate new pending accessToken
Server-->Client--: 3. Response status 200
Client->Client: 4. Store pending accessToken
Client->Server++: 5. POST /[version]/confirmAccessToken
Server->Server: 6. Activate new accessToken for this node ID 
Server-->Client--: 7. Response status 200
Client -> Client : 8. Remove old accessToken
@enduml
```

</details>

### 0. Precondition

Before a node can initiate a session, it needs three things.

1. The HTTP server and the HTTP client can only start with a communication request when they are fully initialized and have all the details of the nodes it represents available. 
2. The HTTP client must have the base URL of the session initiation API (e.g. `https://hostname.local/connection/`)
3. The HTTP client must have selected the version on the session initiation API that will be used (see [Selecting the version of the pairing or session initiation API](#selecting-the-version-of-rest-apis))
4. The two nodes must have been paired successfully and must have an accessToken for this pairing

If the HTTP client does not fulfill these preconditions, it **cannot** send the first HTTP request of the session initiation process.

### 1. POST /[version]/initiateSession
Since there are situations in which the client cannot know for sure which `accessToken` the communication server uses for this pairing, the communication client must keep a persisted list of `accessTokens` (which will typically contain only one `accessToken`).

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
| `clientNodeId` | The node ID of the communications client that wants to connect to the server. |
| `serverNodeId` | The node ID of the communications server that the client wants to connect to. |
| `clientNodeDescription` | Information about the node, such as brand, logo and type. This only needs to be provided if the communication client wants to update this information, otherwise the communication server will assumer the stored information is still valid. |
| `clientEndpointDescription` | Information about the client endpoint. This only needs to be provided if the communication client wants to update this information, otherwise the communication server will assumer the stored information is still valid. |
| `supportedCommunicationProtocols` | List of supported communications protocols of the client |
| `supportedS2MessageVersions` | List of supported S2 message versions by the client |

The server **must** perform the checks in the table below to make sure that it can proceed with this request. If one of these checks fail, the server should respond with an HTTP status 400 and a `CommunicationDetailsErrorMessage` or with HTTP status 401. The contents of the `additionalInfo` field of the `CommunicationDetailsErrorMessage` is supposed the be helpful and up to the implementer.

| Check | Response | What should the client do with this message? |
| --- | --- | --- |
| Is the request properly formatted and does it follow the schema? | `CommunicationDetailsErrorMessage` with errorMessage `ParsingError` | Retry later |
| Was this node ID paired with this node, but was it unpaired? | `CommunicationDetailsErrorMessage` with errorMessage `NoLongerPaired` | Do not retry, inform end user |
| Is this `clientNodeId` paired with the `serverNodeId`? | Status code 401 | Try with other `accessToken` if possible. Otherwise do not retry, inform end user |
| Is the `serverNodeId` known? | Status code 401 | Try with other `accessToken` if possible. Otherwise do not retry, inform end user |
| Is this the correct `accessToken` for this node ID?  | Status code 401 | Try with other `accessToken` if possible. Otherwise do not retry, inform end user |
| Is there overlap between the communication protocols? | `CommunicationDetailsErrorMessage` with errorMessage `IncompatibleCommunicationProtocols` | Retry later |
| Is there overlap between the S2 message versions? | `CommunicationDetailsErrorMessage` with errorMessage `IncompatibleS2MessageVersions` | Retry later |
| Are the endpoint and node ready for connecting? | `CommunicationDetailsErrorMessage` with errorMessage `Other` | Retry later |

### 2. Generate new pending `accessToken`

For each paired node the server saves an active `accessToken`. In addition to that, the server also has a list for pending `accessToken`s, that were generated but not yet confirmed by the client. This list contains entries, each consisting of an `accessToken`, the node IDs of the client and server nodes and a timestamp.

The server generates a new `accessToken` and saves this together with the node ID and the current time as in entry in the list of pending tokens. The `accessToken` **must** be generated by a cryptographically secure pseudorandom number generator.

### 3. Response status 200

In the request the client supplied a list of supported communication protocols and S2 messages versions. The server must select one of the options that were provided by the client.

The server sends the following information (for full details see the OpenAPI specification file). 

| Information | Description |
| --- | --- |
| `selectedCommunicationProtocol` | The communication protocol that was selected by the server |
| `selectedS2MessageVersion` | The S2 message version that was selected by the server |
| `accessToken` | The newly generated pending `accessToken` |
| `serverNodeDescription` | Information about the node at the server, such as brand, logo and type. This only needs to be provided if the communication server wants to update this information, otherwise the communication client will assumer the stored information is still valid. |
| `serverEndpointDescription` | Information about the server endpoint. This only needs to be provided if the communication server wants to update this information, otherwise the communication client will assumer the stored information is still valid. |

The client **must** perform the checks in the table below to make sure that it can proceed with this request.

| Check | What should the client do? |
| --- | --- |
| Is the request properly formatted and does it follow the schema? | Do not proceed and try again later with step 1 |
| Was the selected S2 message version offered in the request? | Do not proceed and try again later with step 1 |
| Was the selected communication protocol offered in the request? | Do not proceed and try again later with step 1 |

### 4. Store pending accessToken
The client adds the pending `accessToken` to its list of `accessTokens`, but does not yet remove the old one. If the client is not able to persist the pending `accessToken` (e.g. because the storage device or the DBMS is not available), the client does not proceed with the process. Once the client is able to persist `accessTokens` again, it can retry to set up a session starting with step 1.

### 5. POST /[version]/confirmAccessToken
The client confirms to the server that it has successfully persisted the pending `accessToken`. The **pending** `accessToken` is provided through the header of the request.

The client **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Do not proceed with session, try again later |
| If self-signed TLS certificate, check if server is local | Do not proceed with session, try again later |
| Check if TLS certificate is pinned | Do not proceed with session, try again later | 

If no checks fail the client **should** proceed.

### 6. Activate new `accessToken` for this node ID 

If the provided `accessToken` is in the list pending `accessToken`s, and the token was generated not more than **15 seconds** ago, the server now makes the pending `accessToken` the active `accessToken` for this pairing of nodes (thereby invalidating the old `accessToken`). Also, the entry is removed from the list of pending `accessToken`s.

If the provided `accessToken` is not in the list of pending `accessTokens`s, the server must not accept the session and respond with status 401. The client can try again later starting at step 1.

If the server is not able to active the new `accessToken` (e.g. because the storage device or the DBMS is not available), the server must not accept the session and responds with an error code 500. The client can try again later starting at step 1.

### 7. Response status 200

The communication server sends the details and credentials to open a socket for communicating the S2 messages. The exact contents of this message depend on the selected communication protocol. In any case it will be a JSON object containing the field `communicationProtocol`. The presence on other fields will depend on the value of the `communicationProtocol` field.

If the response is not understood by the communication client, the client **should** retry later.

### 8. Remove old accessToken

Step 7 functions as a confirmation to the communication client that the communication server has activated the new `accessToken` for this pairing. The old `accessToken` cannot be used anymore, so the communication client must remove the old `accessToken` from the list of `accessToken`s.

### Interruption of the process
Once the communication server has generated a new pending `accessToken`, it must be confirmed within 15 seconds by the communication client. If this doesn't happen, a client will have to start the process from step 1.

If the communication client doesn't receive a response to confirming the new `accessToken` (step 7), it does not know if the server has activated the new `accessToken`, or if the old `accessToken` is still in place. It now has (at least) two `accessToken`s in its list, and does not know for certain which one is activate at the communication server. It should try all the accessTokens sequentially. If it finds an `accessToken` that is accepted by the communication server, it can remove the other `accessTokens`.

## Reconnection strategy
After session initiation, the actual S2 communication starts via the selected transport protocol. At some point this session will terminate. Unless the reason for termination is that the nodes have been unpaired, the communication client **must** try to reconnect with the communication server. In this case the client **must** always start with the session initiation process (it is not allowed to reconnect using the transport protocol that was selected last time).

An exponential back-off strategy for reconnecting **must** be used, increasing the time between reconnection attempts at every failed attempt. It is recommended to use the following strategy for calculating the delay for the n<sup>th</sup> attempt to reconnect. The delay time starts when a failed connecting attempt is finished.

`delay_n = random(0, min(max_delay, base_delay × 2^n))`

Where:

| Variable | Description or recommended value |
| --- | --- |
| `n` | The number of the reconnection attempt (starting at 0) |
| `base_delay` | 2 seconds |
| `max_delay` | 600 seconds |

## WebSocket based communication

This section specifies how to use WebSocket Secure as the S2-over-TCP/IP application layer protocol.

The WebSocket client **must** run on the communication client and the WebSocket server on the communication server.

The choice for a WebSocket as application layer communication protocol has the advantage that the session concept is intrinsically introduced with the communication protocol. All S2 communication happens in the context of a (stateful) S2 session which is catered for by the WebSocket session. So, the S2 session matches the WebSocket session.

The client **must** perform the following checks during this request:

| Check | How to proceed if check fails |
| --- | --- |
| Check TLS certificate | Websocket connection failed, do not proceed with the connection attempt |
| If self-signed TLS certificate, check if server is local | Websocket connection failed, do not proceed with the connection attempt |
| Check if TLS certificate is pinned | Websocket connection failed, do not proceed with the connection attempt | 

If no checks fail the client **should** proceed to the next step.

### Opening the connection
Opening the WebSocket connection is performed by sending a GET request to the URL as provided during the connecting initiation process together with an upgrade request, as specified by [RFC6455](https://datatracker.ietf.org/doc/html/rfc6455). When using HTTP/2, also refer to [RFC8441](https://datatracker.ietf.org/doc/html/rfc8441).

### Authentication
For each S2 WebSocket session the client **must** authenticate itself using the commToken in the authorization header of the websocket connection request, following [RFC 6750 - The OAuth 2.0 Authorization Framework: Bearer Token Usage](https://datatracker.ietf.org/doc/html/rfc6750).

### Encrypted connection (WSS)

Communication over the WebSocket endpoint **must** be encrypted following [RFC 6455 The WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455). S2 **MUST NOT** be sent over unencrypted channels. Therefore a wss connection (the URL starting with wss://) must be used. 

### Compression
 
The WebSocket Protocol ([RFC6455](https://datatracker.ietf.org/doc/html/rfc6455)) has an extension for compression: [**RFC 7692**](https://datatracker.ietf.org/doc/html/rfc7692.html) implementing so called per-message-deflate compression. https://datatracker.ietf.org/doc/html/rfc7692

RFC 7692 is widely supported by WebSocket libraries and and we are exchanging JSON plain text messages, it is expected to save a large amount of data. Therefore, implementations of S2 WebSockets **SHOULD** support RFC 7692 and **SHOULD** enable it whenever possible.

### Keepalive & heartbeat (ping / pong)
WebSockets by default have a **keepalive** and a **heartbeat mechanism**. Keepalive is designed to keep the connection open while heartbeat is designed to check the latency and check the connection is still working. This means that periodically a ping frame is sent to the server (endpoint) and in response a pong frame is sent.

S2 WebSockets implementations **should** send a ping frame every 30 seconds, and **must not** wait more than 60 seconds between sending ping frames. Ping and pong frames **may** include a payload.

For more details see [RFC6455 Section 5.5.2](https://datatracker.ietf.org/doc/html/rfc6455#section-5.5.2%5C%5C).

### Termination

An S2 session can be terminated in different ways:

* In case a node unexpectedly becomes unavailable, the WebSocket connection **CAN** timeout. This will cause an S2 session to be terminated. More details about the timeout can be found [in the heartbeat section](#keepalive--heartbeat-ping--pong)
* a node **CAN** terminate the S2 session by sending the S2 terminate message, including an optional earliest time that the session can be restored. The other node can take this into account in planning and (in the case of a client) deciding when to attempt to reconnect.
* After two nodes have unpaired, the S2 WebSocket connection **MUST** be terminated immediately.

## Communication - JSON messages

S2 Connect uses [S2 JSON](https://github.com/flexiblepower/s2-ws-json) for its JSON schema specification.

When using S2 Connect, the `Handshake` and `HandshakeResponse` messages (as defined by S2 JSON) **can not** be sent. They are redundant by the pairing and session initiation process.

### State of communication 

![State of Communication](@site/static/img/communication-layer/state-of-communication.png)

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
| ControlType PPBC activated | PPBC.EndInterruptionInstruction<br/>PPBC.ScheduleInstruction<br/>PPBC.StartInterruptionInstruction<br/>SelectControlType<br/>SessionRequest<br/>ReceptionStatus | PPBC.PowerProfileDefinition<br/>PPBC.PowerProfileStatus<br/>RevokeObject<br/>InstructionStatusUpdate<br/>ResourceManagerDetails<br/>PowerMeasurement<br/>PowerForecast<br/>SessionRequest<br/>ReceptionStatus |
| ControlType OMBC activated | OMBC.Instruction<br/>SelectControlType<br/>SessionRequest<br/>ReceptionStatus | OMBC.Status<br/>OMBC.SystemDescription<br/>OMBC.TimerStatus RevokeObject<br/>InstructionStatusUpdate<br/>ResourceManagerDetails<br/>PowerMeasurement<br/>PowerForecast<br/>SessionRequest<br/>ReceptionStatus |
| ControlType FRBC activated | FRBC.Instruction<br/>SelectControlType<br/>SessionRequest<br/>ReceptionStatus | FRBC.ActuatorStatus<br/>FRBC.FillLevelTargetProfile<br/>FRBC.LeakageBehaviour<br/>FRBC.StorageStatus<br/>FRBC.SystemDescription<br/>FRBC.UsageForecast<br/>FRBC.TimerStatus<br/>RevokeObject<br/>InstructionStatusUpdate ResourceManagerDetails<br/>PowerMeasurement<br/>PowerForecast<br/>SessionRequest<br/>ReceptionStatus |
| ControlType DDBC activated | DDBC.Instruction<br/>SelectControlType<br/>SessionRequest<br/>ReceptionStatus | DDBC.ActuatorStatus<br/>DDBC.AverageDemandRateForecast<br/>DDBC.SystemDescription<br/>DDBC.TimerStatus<br/>RevokeObject<br/>InstructionStatusUpdate<br/>ResourceManagerDetails<br/>PowerMeasurement PowerForecast<br/>SessionRequest<br/>ReceptionStatus |

# Unpairing process (normative)

Unpairing can be initiated by either node, and **should** only be done when instructed by the end user. The node that did not take the initiative to unpair **should** try to inform the end user that the node is no longer paired.

## Unpairing by the communication client

If the communication client takes the initiative to unpair, it first **should** close the communication session regarding this pairing (if there is one). Then it **must** call the `/[version]/unpair` HTTP API endpoint of the server using its `accessToken` (after discovering the API version at the server, the same way as steps 1 to 3 as mentioned in [Session initiation](#session-initiation)). Upon receiving the unpair call from a client, the server node **must** remove all security information related to this pairing. Then the client **must** remove all security information of the communication server related to this pairing.

## Unpairing by the communication server

If the server takes the initiative to unpair, first it **must** remove all security information related to client node. After that, if there is an active S2 session, it **should** send an S2 [SessionRequest](/model-reference/Common/SessionRequest/) message with type [RECONNECT](/model-reference/Common/SessionRequestType/) to the client. The next `/[version]/initiateConnection` HTTP API request **must** fail with the `No longer paired` response to let the client know that it is not paired anymore.

Client and server **can** keep other (non-security) information for, for example, user experience purposes.

# Security (normative)

## Brute-force protection
To prevent brute-force pairing request, the server **must** implement rate limiting on the requestPairing endpoint. For more details see [2. Calculate clientHmacChallengeResponse](#2-calculate-clienthmacchallengeresponse).

## DDoS countermeasures
Especially WAN endpoints are vulnerable for DDoS attacks. It is recommended for WAN endpoints to take countermeasures against these attacks. The nature of these countermeasures are outside of the scope of this specification.

## TLS Certificates
All HTTP and WebSocket communication uses TCP over TLS with server certificates. The server certificates **must** be exchanged and validated during the initiation of the connection (HTTPS and WSS). This is default usage of most networking libraries.

There are two possible types of certificates for TLS communication. The first option is using a public server certificate, that is created through a Public Key Infrastructure (PKI) and thus signed by a public CA. The other option (only applicable to LAN servers) is to use a self-signed certificate. The latter is needed because a LAN server is not able to obtain a certificate that has been issued by a CA for its local mDNS domain name. This is also the only situation where self-signed certificates are allowed.

The following image shows the difference. On the left a public root CA that is publicly known and trusted, on the right, a self-signed root certificate, that is unknown and its trustworthiness has to be achieved in another way.

![image.png](@site/static/img/communication-layer/certificate-chains.png)

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
LAN deployed nodes will have a self-signed root certificate, and a server (leaf) certificate which is signed by the self-signed root certificate.

The `endpoint`, `nodes`, `preparePairing` and `cancelPreparePairing` operations can be called before the pairing has happened. For these operations the client **must** accept the self-signed certificates.

Also when attempting pairing (the `requestPairing` operation) the client **must** accept the self-signed certificate. During the pairing process trust is established through a two-sided challenge response mechanism. If the two-sided challenge response succeeds, that means that the client can now trust the server of the node it is paired with. The client **must** store the self-signed root certificate used by the server. Alternatively, when the pairing server becomes the communication client, the pairing client will send the fingerprint of the self-signed root certificate that the communication server will use (see [6B. POST /[version]/postConnectionDetails](#6b-post-versionpostconnectiondetails)).

When performig session initiation and unpairing the communication client **must** validate that server cerificate and check that the certificate was signed by the self-signed root certificate that was stored in the previous step.

### Updating the certificates
A server can update its leaf certificate. When a cloud server updates its certificate, it **MUST** be signed by a CA, so a client can check its validity. A server **SHOULD** update its server certificate at least once every 6 months.

If the server is deployed in the LAN, and thus uses a self-signed root certificate, the root certificate **SHOULD** be created with a validity period which is long enough for the expected lifetime of the server (or the device that hosts the server). If the used crypto for the the CA certificate is broken, or the lifetime of the server is longer than the validity of the certificate, the server **MUST** create a new self-signed CA certificate and all clients need to be paired again. Like cloud servers, a local server **SHOULD** update its leaf certificate at least once every 6 months.

## Cipher suites

Security levels of cipher suites will change over time. To stay secure, the used cipher suites should be updates regularly and adhere to regular updates. All nodes **MUST** follow **ONLY** the accepted crypto libraries as defined in [Accepted crypto algorithms](./accepted-crypto.md). This list will be kept up-to-date. When changes are made to the list of accepted crypto libraries, all nodes **MUST** follow these changes within half a year.
