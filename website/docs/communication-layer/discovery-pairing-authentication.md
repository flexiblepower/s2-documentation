---
title: The Specification
sidebar_position: 2
---

## Introduction

s2-ws-json is a WebSocket and JSON based protocol specification implementing the EN50491-12-2 "S2" standard for home and building energy management.

This specification addresses everything needed to created a secure and interoperable implementation of the S2 standard. The communication layer concerns the discovery, the pairing, the application layer communication protocol, the authentication, the message data model and the serialization.

The protocol is designed to specify communication between two devices, a resource (e.g. a heat pump or EV charger) and (home) energy management system. It is worth noting that, while this specification focuses on describing the interaction between two components, a (home) energy management is likely to be communicating with multiple resources at the same time.

## List of abbreviations

|Abbreviation | Meaning
|---|---|
|S2| European standard on Energy Flexibility EN50491-12-2|
|RM| Resource Manager |
|CEM| Customer Energy Manager |

## Background

### Requirements
The communication layer meets the following requirements:

The Customer Energy Manager (CEM) and Resource Manager (RM) are logical concepts within the S2 architecture, therefore the S2 standard does not make any assumptions on how and where the CEM and RM are deployed in a real life situation. In practice, the CEM could be deployed on a local gateway or as a server in the cloud, while the RM could be part of the device itself, deployed on an add-on module or in the cloud as well. This means that the S2 communication layer **MUST** be able to deal with multiple scenarios that are depicted in the figure below.

![Deployment_options](/img/communication-layer/deployment-options.png)

In addition to - and partly because of - supporting the various deployment options, the S2 communication layer has the following generic requirements:

- Support for full duplex communication. Both sides **MUST** be able to send and receive data simultaneously.
- Communication **MUST** be IP based.
- Communication **MUST** be encrypted.
- Communication latency between CEM and RM or vice versa **MUST** be ≤ 1 second.
- Communication **MUST** work without additional firewall configuration by the end user.
- Implementation of the communication layer **MUST** be based on a widely accepted technology and must be relatively easy to implement.
- The pairing process **SHOULD** support extensibility for other application layer communication protocols.

### Technical decisions
Given the requirements, this specification is build on the following high-level technical choices:

Application layer communication protocol: WebSocket Secure with bearer token authentication.

Pairing: Custom HTTP API specified in OpenAPI.

Discovery: DNS-SD in combination with a central registry.

Serialization: json.

**Why not oAuth 2.0?**

The short answer is: oAuth is mainly designed for accessing protected resources in the cloud and since the S2 CEM and RM would also need to be able to pair on a local network (even without requiring internet access) oAuth 2.0 is simply not a good fit. We have identified a way to make it work but since it is such non-typical way, we choose not to use oAuth 2.0. 
For the long answer, please refer to [this page](why-not-oauth.md).


# List of definitions

This specification uses the concepts that are defined below.

**S2 node (S2Node)**

Refers to either a CEM or a RM as defined in EN 50491-12-1. S2 communication between two S2 nodes can only be established if one of the S2 nodes is a CEM and the other a RM. These S2 nodes must also have the same end user.

**S2 node UI (S2NodeUI)**

A user interface through which an end user can interact with a S2 node. Interaction between the end user and the user interface must be secure, but this is out of scope for this specification. Examples of a user interface are a web interface, an app or a physical interface (HMI) on a device.

**S2 server node (S2ServerNode)**

A S2 node that implemented a WebSocket Secure server that can be used for establishing S2 communication between itself and another S2 node. The other S2 node must act as a S2 client node.

**S2 client node (S2ClientNode)**

A S2 Node that implemented a WebSocket Secure client that can be used for establishing S2 communication between itself and another S2 node. The other S2 node must act as a S2 server node.

**S2 server node UI (S2ServerNodeUI)**

This is the S2 node UI of a S2 server node. Through this user interface the end user should be able to obtain the WebSocket Secure URI and configure or generate a token to be used by a S2 client node.

**S2 client node UI (S2ClientNodeUI)**

This is the S2 node UI of a S2 client node. Through this user interface the end user must be able to retrieve a token (unless the S2 client node has a fixed string that must be configured as a token on the S2 server node UI) and configure the WebSocket Secure URI of an S2 server node that this S2 client node wants to establish S2 communication with.

**S2 server node REST API (S2ServerNodeRestAPI)**

The S2 server node features a REST API that facilitates the pairing process of a S2 client node and a S2 server node. It is also plays a role in the initiation of a WebSocket Secure connection between the client and server node.

The implementation of this REST API **MUST** follow the OpenAPI definition that can be found [here.](https://github.com/flexiblepower/s2-ws-json/blob/e238819dfb8bc0310be61c372294d6eaa316c51e/s2-pairing/s2-pairing-openapi-spec.yml)

**S2 server node endpoint (S2ServerNodeWSSEndpoint)**

This is the endpoint of the WebSocket Secure server which can be addressed through its corresponding URL.

**S2 client node endpoint (S2ClientNodeEndpoint)**

This is used to denote the endpoint of both the REST API client and the WebSocket Secure client.

**End user (EndUser)**

A person or entity that manages S2 nodes. For the purpose of this specification it is assumed that there is already a trust relationship in place between this person and the S2 nodes. The means that the way the trust relationship has been established is out of scope for this specification.

# Mapping the CEM and RM to S2 Server and Client Nodes

The CEM and RM roles defined by the S2 protocol are distinct from the Server and Client roles of the S2 pairing process. The following rules apply to determine whether the RM or CEM acts as a Client or Server in the pairing process.

* If a connection is set up between a cloud/WAN node and a local node, the cloud/WAN node must act as a S2 Server Node, and the local node must act as a S2 Client Node.
* If a connection is set up between two nodes that are similarly deployed (i.e. both in cloud/WAN, or both local), the CEM must act as a S2 Server Node, and the RM must act as a S2 Client Node.

There are four scenarios for CEM and RM deployment, and applying the rules above yields the following:

| CEM deployment | RM deployment | CEM acts as | RM acts as |
|----------------|---------------|-------------|------------|
| cloud/WAN | cloud/WAN | S2 Server Node | S2 Client Node |
| cloud/WAN | local | S2 Server Node | S2 Client Node |
| local | cloud/WAN | S2 Client Node | S2 Server Node |
| local | local | S2 Server Node | S2 Client Node |

Note: A device developed solely for use as an RM in a local setup will never function as an S2 Server Node. Similarly, a device designed exclusively for use as a CEM in a cloud/WAN deployment will never operate as an S2 Client Node.

## Hostname of S2 Server Nodes
In the case of S2 Server Nodes in LAN, the Node **MUST** advertise itself using **hostnames** rather than IP addresses and S2 Client Nodes need to identify and remember the Server using this hostname, not just the IP address as this may be subject to change. The hostname of a node **MUST** be stable and unique.

## Discovery
In order to ease the pairing process, which is specified below, the discovery process provides a way for nodes to find each other without requiring a user to know the pairing endpoint of the other node. In other words, the discovery process is a way to provide an S2 Node with the URL of another node which is needed to start the pairing process. Alternatively, it is always possible to initiate the pairing by manually providing the URL by the end user.

> NOTE: the discovery process specification is work in progress and will be updated soon.

### Cloud-cloud
Both the S2 RM and CEM run in the cloud (for example communicating with the device via a manufacturer specific protocol). Discovery of the other node by lookup in a central registry.

> NOTE: how the API of the registry will look like will be published soon

### Cloud-local
A hybrid scenario where either the RM or CEM is deployed locally and the other in the cloud. Discovery of the cloud node by lookup in a central registry or DNS-SD in case the node is also present on the LAN.

> NOTE: the DNS-SD service specification will be published soon

### Local-local
A LAN scenario where both RM and CEM are running on the same local network. Discovery through DNS-SD.

> NOTE: the DNS-SD service specification will be published soon

## The pairing process

The pairing process is based on the trust relation that the end user has with both the CEM and the RM. That trust relation is out of scope for this specification and is up to CEM and RM providers to implement. Given the deployment scenario, it [follows](# Mapping the CEM and RM to S2 Server and Client Nodes) which of the RM and the CEM is server and which is the client in the pairing process.

The pairing process can either be initiated from the client or from the server.

### Initiate pairing from the client

#### Pairing with a discovered Server

The user visits the S2ClientNodeUI and the S2ServerNode has been discovered (so the S2ServerNode base URL is known) by the the S2ClientNode per [discovery](#discovery) as specified above. The S2ClientNode does a preparePairing HTTP request to let the S2ServerNode know that there is a S2ClientNode that wants to pair. It is up to the S2ServerNode implementation to decide what to do with this signal. It can be used to display a pop-up with the pairing token in its UI to improve the user experience. It must be implemented by the client, but only when there is a clear distinction between the moment perparePairing is called and when requestPairing is called. When preparePairing is called, it is not guaranteed that a call to pairingRequest or cancelPreparePairing will follow so it is recommended to put a time-out on showing the pairing token in the S2ServerNodeUI.

The S2ServerNodeUI **can** show the S2ServerNode URL to (also) allow clients that did not discover the server to connect but it does not need to because there is a client that already knows the S2ServerNode URL and that wants to pair.

#### Pairing with server manually
If the S2ServerNode was not discovered, the process is as follows:

![image](/img/communication-layer/pairing-manually.png)

<details>
<summary>Image generated using the following PlantUML code:</summary>

```
@startuml
participant S2ClientNodeEndpoint
participant S2ClientNodeUI
participant EndUser
participant S2ServerNodeUI
participant S2ServerNodeRestAPI

note over S2ServerNodeRestAPI, S2ServerNodeUI: S2ServerNode
note over S2ClientNodeEndpoint, S2ClientNodeUI: S2ClientNode

EndUser->S2ServerNodeUI: 1. Request pairingInfo
note over S2ServerNodeUI: The pairing token that is part\nof the pairingInfo object expires\nafter 5 minutes
S2ServerNodeUI-->EndUser: 2. Provide pairingInfo 

EndUser->S2ClientNodeUI: 3. Provide pairingInfo

S2ClientNodeEndpoint->S2ServerNodeRestAPI: 4. HTTPS requestPairing(pairingRequest)
S2ServerNodeRestAPI->S2ServerNodeRestAPI: 5. Check pairing token
S2ServerNodeRestAPI-->S2ClientNodeEndpoint: 6. HTTPS pairingResponse
@enduml
```
</details>


1. The end user visits the S2ServerNodeUI to retrieve the pairingInfo, i.e. the server URL and the pairingToken. It needs this information to enter it at the S2ClientNodeUI such that the client can initiate the pairing.
2. The S2ServerNodeUI shows the pairingInfo. A JSON object that specifies the information in the pairingInfo is defined in the [s2-over-ip-pairing OpenAPI definition](https://github.com/flexiblepower/s2-ws-json/blob/e238819dfb8bc0310be61c372294d6eaa316c51e/s2-pairing/s2-pairing-openapi-spec.yml). The schema for the pairingInfo is not associated with a REST path as this information is obtained from a User Interface and not by means of a REST call.
3. The end user submits the pairingInfo in the S2ClientNodeUI.
4. The client performs the requestPairing call as defined in the [s2-over-ip-pairing OpenAPI definition](https://github.com/flexiblepower/s2-ws-json/blob/e238819dfb8bc0310be61c372294d6eaa316c51e/s2-pairing/s2-pairing-openapi-spec.yml).
5. The server check if the pairingToken in the requestPairing call matches the token that it displays to the end user.
6. The pairingResponse informs the S2ClientNode whether the pairing was successful or not.

### Initiate pairing from the server

> NOTE: the specification for initiating the pairing from the server will be published soon

## The unpairing process

Unpairing can either be initiated by S2Node that runs the CEM or the RM.

As the pairing and authorization process is based on a client/server model, the following applies to the unpairing process.

If the client node takes the initiative to unpair, it first **should** close any active connections it has and subsequently call the unpair HTTP API endpoint of the server using its access token. Upon receiving the unpair call from a client, the S2 server node **must** remove all security information related to the paired node. After the response has been received by the client, the client **must** remove all security information of the server node.

If the server takes the initiative to unpair, first it **must** remove all security information related to client node. After that, it **should** send a S2 [SessionRequest](/model-reference/Common/SessionRequest/) message with type [RECONNECT](/model-reference/Common/SessionRequestType/) to the client. The next initiateConnection HTTP API request **must** fail with the 'Unknown node ID' response to let the client know that it is not paired anymore.

Client and server **can** keep other (non-security) information for user experience purposes.

## S2 Connections

After two nodes have been paired, the nodes exchange S2 messages over a secure connection. 

The following mechanism **must** be used to initiate a secure connection between two S2 nodes. Client authentication is based on a one-time use communication token that needs to be renewed every time a new S2 session is created.


### Initiation

![connection initiation](/img/communication-layer/connection-initiation.png)

<details>
<summary>Image generated using the following PlantUML code:</summary>

```
@startuml
Client -> Server : 1. initiateConnection(s2ClientNodeId, accessToken,\n supportedCommunicationProtocols, supportedS2Versions)
Server -> Server : 2. check protocol version, generate new token pair
Server -> Client : 3. initiateConnectionResponse(s2ServerNodeId,\npendingAccessToken, commToken, connectionUrl,\nselectedCommunicationProtocol, selectedS2Version)
Client -> Client : 4. store new accessToken
Client -> Server : 5. setUpConnection(commToken)
Server -> Server : 6. activate new accessToken for this NodeId 
Client <-> Server : 7. Successful S2 session
Client -> Client : 8. accept new accessToken
@enduml
```

</details>

**1. initiateConnection**

The client has a list of pairs of accessTokens and commTokens. After the initial initiateConnection call, the list always contains at least one pair (initially there is only an accessToken as result of the pairing process). It uses one of the accessTokens to make an authorized request to retrieve a commToken and new accessToken form the server.

**2. generate new token pair**

For each paired NodeId the server saves an active accessToken and active commToken. In addition to that, the server also has a list for pending tokens. This list contains entries, each consisting of an accessToken, a commToken, a NodeId and a timestamp.
The server checks the provided accessToken from the client with the active accessToken it has saved for this node. If the provided accessToken was valid, the server generates a new accessToken and commToken and saves this together with the S2NodeId and the current time as in entry in the list of pending tokens.

**3. initiateConnection response**

a. If the provided accessToken was valid, the server sends the generated pending accessToken, commToken and connectionUrl to the client.

b. If the provided accesToken was not valid, the server responds with an error. The process terminates. If the client has multiple accessTokens stored, it can retry with another one. 

**4. store new accessToken**

a. The client has a list of accessTokens. It adds the new accessToken to the list, but does not yet remove the old one.

b. If the client was not able to persist the new accessToken (e.g. because the storage device or the DBMS is not available) the client does not proceed with the process. Once the client is able to persist accessTokens again, it can retry to set up a connection from the start.

**5. setUpConnection(commToken)**

The client initiates the S2 session, and provides the commToken.

**6. Activate new accessToken for this NodeId**

This step is the implicit acknowledgement to the server that the client has saved the accessToken successfully.

a. If the provided commToken is in the list pending tokens, and the token was generated not more than 30 seconds ago, the server replaces the associated accessToken for the associated NodeId as the active token. Also, the entry is removed from the list of pending tokens.

b. If the provided commToken is not in the list of pending tokens, the server must not accept the connection and respond with an error code.

c. If the server is not able to active the new tokens (e.g. because the storage device or the DBMS is not available), the server must not accept the connection and responds with an error code.

**7. Successful S2 session?**

a. The S2 session is successfully opened. This is an implicit acknowledgement that both server and the client are in possession of the new tokens. For the server it is an acknowledgement that is has activated the new access token successfully and for the client it means that it did correctly receive and persist the new accessToken. 

b. If for any reason the S2 session is not set up successfully, the process terminates. The client can restart the process from the beginning when desired.

**8. Remove old tokens**

a. Since the server implicitly acknowledged the new accessToken, all pairs of accessToken and commToken which do not contain the used commToken can be removed.

b. If the client is not able to remove the old tokens (e.g. because the storage device or the DBMS is not available) it can continue working as normal.

### WebSocket based communication

This section specifies how to use WebSocket Secure as the S2-over-TCP/IP application layer protocol.

The WebSocket client **must** run on the S2ClientNode and the WebSocket server on the S2ServerNode.

The choice for a WebSocket as application layer communication protocol has the advantage that the session concept is intrinsically introduced with the communication protocol. All S2 communication happens in the context of a (stateful) S2 session which is catered for by the WebSocket session. So, the S2 session matches the WebSocket session.

#### Authentication
For each S2 WebSocket session the client **must** authenticate itself using the commToken in the authorization header of the websocket connection request, following [RFC 6750 - The OAuth 2.0 Authorization Framework: Bearer Token Usage](https://datatracker.ietf.org/doc/html/rfc6750).

#### Encrypted connection (WSS)

Communication over the WebSocket endpoint **must** be encrypted following [RFC 6455 The WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455). S2 **MUST NOT** be sent over unencrypted channels. Therefore a wss connection (the URL starting with wss://) must be used. 

#### Compression

The WebSocket Protocol ([RFC6455](https://datatracker.ietf.org/doc/html/rfc6455)) has an extension for compression: [**RFC 7692**](https://datatracker.ietf.org/doc/html/rfc7692.html) implementing so called per-message-deflate compression. https://datatracker.ietf.org/doc/html/rfc7692

RFC 7692 is widely supported by WebSocket libraries and and we are exchanging JSON plain text messages, it is expected to save a large amount of data. Therefore, implementations of S2 WebSockets **SHOULD** support RFC 7692 and **SHOULD** enable it whenever possible.

#### Keepalive & heartbeat (ping / pong)

WebSockets by default have a **keepalive** and a **heartbeat mechanism**. Keepalive is designed to keep the connection open while heartbeat is designed to check the latency and check the connection is still working. This means that periodically a ping frame is sent to the server (endpoint) and in response a pong frame is sent.

In order to reduce network traffic, S2 WebSocket implementations **SHOULD** not send ping frames more often than every 50 seconds. Ping & poing frames are control frames and **MAY** include payload of maximum 125 bytes.

[https://datatracker.ietf.org/doc/html/rfc6455#section-5.5.2](https://datatracker.ietf.org/doc/html/rfc6455#section-5.5.2%5C%5C)


### State of communication 

![State of Communication](/img/communication-layer/state-of-communication.png)

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
| ControlType PPBC activated | PPBC.EndInterrptionInstruction<br/>PPBC.ScheduleInstruction<br/>PPBC.StartInterruptionInstruction<br/>SelectControlType<br/>SessionRequest<br/>ReceptionStatus | PPBC.PowerProfileDefinition<br/>PPBC.PowerProfileStatus<br/>RevokeObject<br/>InstructionStatusUpdate<br/>ResourceManagerDetails<br/>PowerMeasurement<br/>PowerForecast<br/>SessionRequest<br/>ReceptionStatus |
| ControlType OMBC activated | OMBC.Instruction<br/>SelectControlType<br/>SessionRequest<br/>ReceptionStatus | OMBC.Status<br/>OMBC.SystemDescription<br/>OMBC.TimerStatus RevokeObject<br/>InstructionStatusUpdate<br/>ResourceManagerDetails<br/>PowerMeasurement<br/>PowerForecast<br/>SessionRequest<br/>ReceptionStatus |
| ControlType FRBC activated | FRBC.Instruction<br/>SelectControlType<br/>SessionRequest<br/>ReceptionStatus | FRBC.ActuatorStatus<br/>FRBC.FillLevelTargetProfile<br/>FRBC.LeakageBehaviour<br/>FRBC.StorageStatus<br/>FRBC.SystemDescription<br/>FRBC.UsageForecast<br/>FRBC.TimerStatus<br/>RevokeObject<br/>InstructionStatusUpdate ResourceManagerDetails<br/>PowerMeasurement<br/>PowerForecast<br/>SessionRequest<br/>ReceptionStatus |
| ControlType DDBC activated | DDBC.Instruction<br/>SelectControlType<br/>SessionRequest<br/>ReceptionStatus | DDBC.ActuatorStatus<br/>DDBC.AverageDemandRateForecast<br/>DDBC.SystemDescription<br/>DDBC.TimerStatus<br/>RevokeObject<br/>InstructionStatusUpdate<br/>ResourceManagerDetails<br/>PowerMeasurement PowerForecast<br/>SessionRequest<br/>ReceptionStatus |

### Termination

A S2 session can be terminated in different ways:

* In case a S2 node unexpectedly becomes unavailable, the WebSocket connection **CAN** timeout. This will cause an S2 session to be terminated. More details about the timeout can be found [in the heartbeat section](#keepalive--heartbeat-ping--pong)
* A S2 node **CAN** terminate the S2 session by sending the S2 terminate message, including an optional earliest time that the session can be restored. The other S2 node can take this into account in planning and (in the case of a client) deciding when to attempt to reconnect.
* After two S2 nodes have unpaired, the S2 WebSocket connection **MUST** be terminated immediately.

### Reconnection strategy

Once a S2 session is terminated it cannot be resumed and if further communication is required, a new session needs to be started. A S2 client node may try to establish a WebSocket connection.

An exponential back-off strategy **SHOULD** be used, increasing the time between reconnection attempts at every failed attempt. If a reconnection time was included in any termination, S2 client nodes are permitted to make an attempt to reconnect before this time. At the specified time the delay between reconnection attempts **SHOULD** be reset.

## Security

Please refer to an extensive description of the security specifications to [Security considerations](./security-considerations.md).

### Certificates

For each S2 connection the server authenticates using a certificate. The cloud implementation certificates **MUST** be PKI certificates which are not self-signed. Only local servers can use a self-signed CA certificate, which is used to sign a server certificate.
If the S2 protocol is used in a local-local configuration, the server **CAN** use a self-signed CA certificate. In this case, the pairingInfo **MUST** include the first 9 bytes, encodes as 12 base64 encoded characters, of the fingerprint of this self-signed CA certificate and the client **MUST** check this fingerprint.

Note that all communication use TLS. This is further explained in [Security considerations](./security-considerations.md).

The server certificates **MUST** be exchanged and validated during the initiation of the connection (REST and WSS). This is default usage of most networking libraries.

### Cipher suites

Security levels of cipher suites will change over time. To stay secure, the used cipher suites should be updates regularly and adhere to regular updates. All S2Nodes **MUST** follow **ONLY** the accepted crypto libraries as defined in [Accepted crypto algorithms](./accepted-crypto.md). This list will be kept up-to-date. When changes are made to the list of accepted crypto libraries, all S2Nodes **MUST** follow these changes within half a year.

## Communication - JSON messages

The S2 standard has been encoded into a JSON schema and asyncapi specification, for details see: [JSON protocol specification for S2 WebSockets](https://github.com/flexiblepower/s2-ws-json)
