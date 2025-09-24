---
title: Security Considerations
---

## Crypto requirements

The described protocol, ensures the following 4 requirements:

1. Mutual authentication
2. Integrity of communication
3. Confidentiality of communication
4. Forward secrecy

There is one guarantee that explicitly is not given by this protocol:

1. Non-repudiation

## Pairing and connection initiation processes

In the image below, the relevant security communication is visualized. Note that, the first part of the communication (in red) is not part of the S2 protocol. The developer of the corresponding Client / Server is responsible for relevant security mechanisms in this part of the communication. This is important to note because the trust between the end user and both systems is the basis for the trust in the further communication.

The following sequence diagram focuses on validation of certificates and tokens. Please refer to the other sequence diagrams that contain more details about the pairing and connection initiation.

![image](/img/communication-layer/pairing-security.png)

<details>
<summary>Image generated using the following PlantUML code:</summary>

```
@startuml
participant Client
participant EndUser
participant Server
note over Client, Server : Pairing phase
note left of Client: The red part of the communication \nis not part of the S2 protocol. \n\nUsed crypto is defined by the developer \nof the Client/Server


'PRE-S2 communication
EndUser-[#red]>Server: Request pairingInfo
Server -[#red]> Server: Create a connection token
note over Server: The pairing token expires\nafter 5 minutes
Server-[#red]>EndUser: Provide pairingInfo (url, certificate fingerprint and pairing token)
EndUser-[#red]>Client: Provide pairingInfo (url, certificate fingerprint and pairing token)
note left of Client : From this point on, S2 is used

'Setting up connection
Client-[#blue]> Server : Setup TLS connection
Client -[#blue]> Client : Check certificate
alt Self-signed CA certificate
Client -[#blue]> Client : Check if server is local
alt Server is not local
Client -[#blue]> Client : Disconnect. Pairing failed.
end
Client -[#blue]> Client : Check certificate fingerprint
alt Certificate fingerprint does not match
Client -[#blue]> Client : Disconnect. Pairing failed.
end
else Certificate does not validate
Client -[#blue]> Client : Disconnect. Pairing failed.
end

'Pairing with server
Client-[#blue]> Server : HTTPS requestPairing(token, clientNodeId)
Server -[#blue]> Server: Check pairing token
alt Pairing token is not valid or expired
Server --[#blue]> Client: HTTPS requestPairingResponse(error)
else Pairing token valid
Server -[#blue]> Server: Generate accessToken
Server --[#blue]> Client : HTTPS requestPairingResponse(accessToken)
end

'Setting up connection
note over Client, Server : Future connections
Client -[#blue]> Server: Setup TLS connection
Client -[#blue]> Client: Check certificate

alt Self-signed CA certificate
Client -[#blue]> Client : Check if server is local
alt Server is not local
Client -[#blue]> Client : Disconnect. Connection failed.
end
Client -[#blue]> Client : Check if certificate fingerprint
alt Certificate unknown
Client -[#blue]> Client : Disconnect. Connection failed.
end
else Certificate does not validate
Client -[#blue]> Client : Disconnect. Connection failed.
end
Client -[#blue]> Server: HTTPS initiateConnection(accessToken, s2ClientNodeId)
Server -[#blue]> Server: Check accessToken

alt accessToken valid
Server --[#blue]> Client: initiateConnectionResponse(connectionUrl, new accessToken, commToken)
else accessToken invalid
Server --[#blue]> Client: initiateConnectionResponse(401)
end


'Websocket connection
alt
Client -[#blue]> Server: Connect to websocket with commToken \nover existing TLS connection
else
Client -[#blue]> Server: Setup TLS connection
Client -[#blue]> Client: Check certificate

alt Self-signed CA certificate
Client -[#blue]> Client : Check if server is local
alt Server is not local
Client -[#blue]> Client : Disconnect. Connection failed.
end
Client -[#blue]> Client : Check if certificate fingerprint
alt Certificate unknown
Client -[#blue]> Client : Disconnect. Connection failed.
end
else Certificate does not validate
Client -[#blue]> Client : Disconnect. Connection failed.
end
Client -[#blue]> Server: open WebSocket connection with commToken
end
Server -[#blue]> Server: Check commToken
alt Incorrect token
Server -[#blue]> Server : Disconnect. Connection failed.
end
Server -[#blue]> Client : Connection accepted.
@enduml

```

</details>

## Certificates

There are two possible types of certificates. The first option is a public server certificate, that is part of the public PKI infrastructure, (indirectly) signed by a public root CA. This protocol allows local servers to use a self signed CA certificate to sign its local server certificate. This is needed because a local server is not able to get a certificate from a public PKI infrastructure.

In the following image, the difference is shown. On the left a public root CA that's publicly known and trusted, on the right, a self signed root certificate, that's unknown and it's trustworthiness has to be achieved in another way.

![image.png](/img/communication-layer/certificate-chains.png)

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


### Trusting aself signed root certificate

The self signed root certificate is by default not trusted. However during the pairing phase, the server with the self signed root certificate will share part of the root's certificate fingerprint as part of the pairing token, via a second channel. This will enable the client to verify the self signed root certificate, and create trust. From this moment on, the client will store the complete fingerprint of the self signed root certificate, and use it to verify the server certificate for all future connections.

Note that the `preparePairing` and `cancelPreparePairing` endpoints can be called before the pairing has happened. So in the case the server is running on a LAN (and thus uses self-signed certificates), the client can skip the certificate validation steps on those endpoint.

### Updating the certificates

A server can update its certificate. When a cloud server updates it's certificate, it **MUST** be signed by a CA, so a client can check it's validity. A server **SHOULD** update its server certificate at least once every 6 months.

If the server is in local-local mode, and uses a self-signed CA certificate, the CA certificate **SHOULD** be created with a validity period which is long enough for the expected lifetime of the server. If the used crypto for the the CA certificate is broken, or the lifetime of the server is longer than the validity of the certificate, the server **MUST** create a new self-signed CA certificate and all clients need to be paired again. Like cloud servers, a local server **SHOULD** update its server certificate at least once every 6 months.

## How are the requirements met?

In the follow section, reasoning for each security requirement will be given.

### Mutual authentication

The mutual authentication is based on the trust relation between the user and the Client/Server. Since it is assumed that the user already had a trust relation with both of them, this existing trust can be used for mutual authentication between the client and the server. Note that the this communication is not part of the S2 protocol.

The enduser requests an url, certificate fingerprint and token from the server, and gives these to the client. Based on these data, the client can connect to the server, using a TLS connection, check the certificate and authenticate himself with the token. Note that if the server uses a self-signed certificate, it will also give a certificate fingerprint to the user. The client needs to use this fingerprint to verify the certificate in the TLS connection.

### Integrity of communication

Using TLS will ensure the integrity of the data.

### Confidentiality of communication

Using TLS will ensure the confidentiality of the data.

### Forward secrecy

Using TLS1.3 will ensure the forward secrecy of the data.

### Non-repudiation

Non-repudiation is not guaranteed in this protocol. Individual messages are not signed by anyone and as a result both parties could deny sending a specific request. However, while no legal proof is given, since integrity and authenticity is guaranteed by TLS, each party always knows for sure which party made what statement.

## Remaining risk

There are two remaining vulnerable situations for the described protocol. In this section both will be explained.

### Self signed certificates

In the case that a local RM and a local SEM communication, it is not possible to generate a PKI-certificate that can be publicly validated. As a result, S2 accepts in **ONLY** this situation self-signed certificates. The risk for spoofing attacks are mitigated by sharing the certificate fingerprint and pinning the self signed certificate at the client side. As a result, the client can check for all future connections whether or not it is connected with the same server.

### Trust relations between the end-user and the Client/Server

The entire trust model of S2 is based on the fact that there is already a trust relation between the end-user and the client/server. If these clients/servers do not use adequate security mechanisms, it might be possible to attack the S2 system as well.