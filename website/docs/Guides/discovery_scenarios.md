As part of the S2 WebSockets Implementation a way for Resources to be able to discover each other and establish communication is necessary.
We identified the following scenarios:

# Cloud-cloud
Both an S2 resource (resource manager) and energy management system run in the cloud (for example communicating with the local device via a manufacturer specific protocol)

# Cloud-local
A hybrid scenario where one of either the resource manager (an S2 resource) or the energy management system are running S2 locally and the other is running in the cloud

# Local-local
A local LAN scenario where both S2 resource and energy management system are running on the same local network.