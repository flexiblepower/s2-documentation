---
title: "Example: PV Installation"
---

# S2 example for PV installations

This page serves as a guide for implementing an S2 RM for a PV installation. It provides example S2 messages that help developers to understand how to interact with PV installations and what kind of flexibility they can offer.

<!--  [ add architecture picture ] -->

## Flexibility of a PV installation
A PV installation produces electricity by converting solar energy into electricity. This electricity can be used for several purposes, such as self-consumption or earning money by delivering electricity to the grid. 

Usually a PV installation is not flexible at all, as it only produces electricity when there is sun and depending on weather circumstances (e.g. such as cloud coverage) it will produce more or less, i.e. its production is intermittent. But many PV inverters also allow to control the maximum output power of the PV installation, also known as curtailment. This curtailment is for example needed when too much installations are connected to the same local grid and produce at high power, pushing the voltage of the network above its acceptable limits, or when prices for delivering electricity back to the grid become to low (or even negative) to be profitable.

## Choosing the S2 control type
S2 supports five different control types for flexibility (and one for no control possibility), each supporting a different way of modelling flexibility of a device. For PV installations the choice is somehow simple, as the capabilities of these installations are limited:


| Control&nbsp;capability&nbsp;of&nbsp;PV&nbsp;installation | Control type | Remark |
|--------------------|:--------------:|---------|
| No control possible |  NOT_CONTROLABLE  | As there is no way to control this PV installation, the `NOT_CONTROLABLE` ControlType should be selected. Although nothing can be controlled, devices can still send `PowerMeasurement`s and `PowerForecast`s |
| Set maximum output power | POWER_ENVELOPE_BASED_CONTROL (PEBC) | Based on the constraints of the PV installation (e.g. the minimum and maximum power output of the inverter), the CEM can provide the Resource Manager of the PV installation a PowerEnvelope that describes the minimum (usually 0) and maximum (e.g. -2kW, negative for production) that the inverter of the PV installation should produce  |

The table shows two ways to interact with a PV installation: just using the power measurements such that the CEM can optimize based on the production of the PV installation and using Power Envelope Based Control, which allows the CEM to instruct the PV installation to curtail.

We could also model the PV installation as a state machine using Operation Mode Based Control (OMBC). Different states (operation modes in S2 language) could be modeled that describe at which maximum power output the PV installation should adhere to, but this approach is more work to configure than PEBC, and does not increase the amount of flexiblity that a CEM can utilize.

The Power Envelope Based Control control type is used for devices that can be influenced to use or produce a minimum and/or maximum amount of power over time. This means that the CEM cannot control the amount of power produced or consumed by the device directly, but it can dictate power limits, which can change over time. The Resource Manager informs the CEM with which power limits it can work using the `PEBC.PowerConstraints` message. Optionally, the Resource Manager can also instruct the CEM how much energy it needs to consume or produce in a certain timespan (by sending a `PEBC.EnergyConstraints` message), which the CEM shall take into consideration while setting power limits.

## Example of controlling an PV inverter using Power Envelope Based control (PEBC)
This example describes how a PV interter can expose its curtailment capabilities to the CEM and let the CEM control this inverter by sending it messages that will ask it to curtail itself.

The following sequence diagram is an example of what a message exchange between a CEM and RM could look like, but messages could also be sent in a different order (see also [State of communication](/docs/s2-json-over-websockets/state-of-communication.md)). ReceptionStatus messages are omitted for readability.

First an overview of the messages is presented graphically, next sections will describe the example messages in more detail.

### Communication between the PV installation and the Resource Manager (RM)
For the RM to work correctly, some information is required to fill in the messages between the RM and the CEM.

The diagram below depicts this process and the data that is needed.

![POxFIWD138VlynIX5nLg7w285CH33mLPmPENT3QjWPbacScqrQStMojqzPO_l-zBLjMmMCif65iYM0iRO-8lWgWvD-68nYgm9JiI2TW7GRS1bFvSlhm1YpjIEiV2pU0wZZoW63mzRy9rtqtRcSDhEL0nAZF0wh8GH8r0VUZfkK-MqvT4A4x-kVnofGh1Pm_tZoFyIq2hB7lWImI6e](https://github.com/user-attachments/assets/b4b27f0b-8419-4e08-9c76-2ab14410e13f)

<details>

Image generated using the following PlantUML code:

```
@startuml
title Initialize communication between the RM and the PV installation
'participant CEM
participant RM
participant "PV Inverter" as PV

note over RM, PV: Initialize connection between RM and PV Inverter

RM <-> PV: connect using inverter protocol
PV -> RM: Send constraints, \ne.g. maximum production power
loop every x seconds
PV -> RM: Send PV measurements
PV -> RM: Send forecasts (if available)
end loop
@enduml
```
</details>

As shown, the RM needs to know what the maximum output power of the inverter is and how it can get measurements that can be send to the CEM.

### Communication between de RM of the PV installation and a CEM

In the picture below the S2 message exchange is depicted as a sequence diagram. It can be split up in five parts:
1. Setup of the connection between the CEM and the RM
2. Exchange the Resource Manager configuration and selection of Control type
3. Configuration of the power and/or energy constraints of the PV installation
4. Normal operation: Exchange of measurements and curtailment instructions
5. Disconnect the communication between the CEM and the RM.

![XLDDRnCn4BtlhnYf5v00SKFA0LM4e7A8Y9821yfXiZkxiUArZJrkMfGVpqmS8gS4zHJ5y_m-dcUl4sFaFDg63Lk2sGEEGNvRFuxPcHRPU0ThuXsHW-bi3kWwMCx1zu2m-0QVdJ1OUy0rGRXCQm8wLcpzN-uqZVDCuEyfwlIL74tWEwrNljqIYwHpr39rJQCwhzyVvZUYbpQufMQfP](https://github.com/user-attachments/assets/ea8c4221-b628-4bfc-a695-4f2d5a5d442d)


<details>
PlantUML code for this diagram:

```
@startuml
title Example communication between CEM and RM of a PV Installation
participant CEM
participant RM

note over CEM, RM: WebSocket connected

CEM -> RM: Handshake
RM -> CEM: Handshake
CEM -> RM: HandshakeResponse

note over CEM, RM #lightblue: Initialized

|||

group Send RM configuration for this inverter and \nthe control type that this RM supports
RM -> CEM: ResourceManagerDetails
CEM -> RM: SelectControlType
note right: The CEM will select the \nPEBC control type for this RM
end group


note over CEM, RM #lightgreen: ControlType PEBC activated 

|||

group #fff0b7 Send power or energy constraints of this PV Installation 
RM -> CEM: PEBC.EnergyConstraint
RM -> CEM: PEBC.PowerConstraint
note right: The RM informs the CEM of the\n maximum power output of the PV inverter
end

|||

loop in no particular order

RM -> CEM: PowerMeasurement
RM --> CEM: PowerForecast [Optional]

CEM -> RM: PEBC.Instruction
note right: Here the CEM will ask the RM to curtail its production
RM -> CEM: InstructionStatusUpdate
note right: The RM will confirm (or not) this curtailment
end loop

|||

RM -> CEM: SessionRequest

note over CEM, RM: WebSocket disconnected

@enduml
```
</details>

The following messages are exchanged:

### RM -> CEM: Handshake
The RM informs the CEM that it is a RM and which versions of s2-ws-json it supports.
```json
{
  "message_type": "Handshake",
  "message_id": "xxx",
  "role": "RM",
  "supported_protocol_versions": [
    "0.0.2-beta"
  ]
}
```

### CEM -> RM: HandshakeResponse
The CEM informs the RM which version of s2-ws-json it has selected for this session.
```json
{
  "message_type": "HandshakeResponse",
  "message_id": "xxx",
  "selected_protocol_version": "0.0.2-beta"
}
```

### RM -> CEM: ResourceManagerDetails
The RM informs the CEM about several static properties of the RM/PV installation:
* The resource_id is a unique string in the context of the CEM.
* The name is a default name or user defined name (when possible) for UI purposes.
* In this context the PV installation is an electricity producer and not a consumer or storage. S2 is concerned with what is exchanged with _the grid_, and in this case the PV installation participates in an electricity grid that needs to be managed by the CEM.
* The instruction processing delay indicates that the PV installation will on average respond in 5000 milliseconds to an instruction from the CEM.
* This PV installation does not define any costs related parameters, so no currency needs to be provided.
* This RM only implements the Power Envelope Based Control (PEBC) Control Type.
* This RM also provides power forecasts (e.g. by using an external forecast service connected to this RM).
* This PV installation is a single phase electric device (when there is only one phase the phase L1 must be used), so it will only provide measurements for the single phase. For three phase inverters, all phases should be listed here (and for each phase measurements should be provided), or in the case the three-phase power is symmetric and therefore equally shared over all phases, `ELECTRIC.POWER.3_PHASE_SYMMETRIC` could be used here.

```json
{
  "message_type": "ResourceManagerDetails",
  "message_id": "xxx",
  "resource_id": "acme_pv_installation",
  "name": "Solar panels on roof",
  "roles": [
    {
      "role": "ENERGY_PRODUCER",
      "commodity": "ELECTRICITY"
    }
  ],
  "manufacturer": "ACME",
  "model": "InverterType2024",
  "serial_number": "123",
  "firmware_version": "v1.0",
  "instruction_processing_delay": 5000,
  "available_control_types": [
    "POWER_ENVELOPE_BASED_CONTROL"
  ],
  "provides_forecast": true,
  "provides_power_measurement_types": [
    "ELECTRIC.POWER.L1"
  ]
}
```

### CEM -> RM: SelectControlType
The CEM informs the RM that it wants to use PEBC ControlType (the RM defined in the ResourceManagerDetails that this is the only supported ControlType).

```json
{
  "message_type": "SelectControlType",
  "message_id": "xxx",
  "control_type": "POWER_ENVELOPE_BASED_CONTROL"
}
```

### Configuration of the power and/or energy constraints of the PV installation



#### RM -> CEM: PEBC.PowerConstraints
Using the `PEBC.PowerConstraints` message, a RM can specify the constraints in which the CEM can operate. For curtailing a PV installation, it is important for the CEM to know in what range it can control the power output. The message contains a few relevant properties (see below for the example):

1. `valid_from` and `valid_until` specify for which period this constraint is valid. In the example it is defined as 24 hours. If `valid_until` is not present, there is no determined end time of this `PEBC.PowerConstraints`.

2. `consequence_type` defines what happens if the constraint is applied. For PV installations it means that if the installation is curtailed, the amount of electricity that is curtailed is vanished (denoted by the the enum literal `VANISHED`), e.g. it will be lost and never reappear. For other devices (e.g. for an EV or other devices that can shift their consumption in time) the consequence could be `DEFER` to denote that the load is postponed (e.g. the lost energy is caught up later in time e.g. by longer charging or compensated by faster charging later on).

3. A list of `allowed_limit_ranges` of type `PEBC.AllowedLimitRange`. These are the actual constraints that can be defined.
   There shall be at least one PEBC.AllowedLimitRange for the UPPER_LIMIT and at least one AllowedLimitRange for the LOWER_LIMIT. For each Allowed
   limit range one needs to specify:

   a. the `commodity_quantity` (for our example this is "ELECTRIC.POWER.L1" (Electricity phase 1))

   b. `limit_type` defining if it is an `UPPER_LIMIT` or `LOWER_LIMIT`

   c. `range_boundary` specifying the specific constraint.

   d. `abnormal_condition_only` indicates if this is an instruction during an abnormal condition, see also §7.3 of the S2 standard for more 
      information. In general setting this to `true` will tell the CEM that this constraint is linked to a situation where user comfort may 
      be sacrificed, and might be subject to (local) laws and regulations. Usually abnormal conditions should be avoided and is a last resort to 
      e.g. avoid a blackout.

In the figure this is visualized for the PV installation for a 4 kWp pv installation. The Json example below shows how to do this in code.

> **_NOTE:_** In S2, **production** is denoted with a negative number, as opposed to **consumption** which is positive. So for a 4 kWp PV installation, one should use -4000 W as constraint value.

![image](https://github.com/user-attachments/assets/b5f88769-5281-4d94-a787-710c04d5ffc8)

The `UPPER_LIMIT` is defined from 0 to 0, indicating that the maximum consumption of this device is 0, and the `LOWER_LIMIT` is defined from 0 to -4000W indicating that the CEM can freely curtail between 0 and 4 kW. If for example the inverter could not curtail between 0 and 1 kW, the range would be from -1000 to -4000W.

This can be expressed in Json as follows:

```json
{
  "message_type": "PEBC.PowerConstraints",
  "message_id": "xxx",
  "id": "powerConstraint1",
  "valid_from": "2024-08-24T14:15:22Z",
  "valid_until": "2024-08-25T14:15:22Z",
  "consequence_type": "VANISH",
  "allowed_limit_ranges": [
    {
      "commodity_quantity": "ELECTRIC.POWER.L1",
      "limit_type": "LOWER_LIMIT",
      "range_boundary": {
        "start_of_range": 0,
        "end_of_range": -4000
      },
      "abnormal_condition_only": false
    },
    {
      "commodity_quantity": "ELECTRIC.POWER.L1",
      "limit_type": "UPPER_LIMIT",
      "range_boundary": {
        "start_of_range": 0,
        "end_of_range": 0
      },
      "abnormal_condition_only": false
    }
  ]
}
```

#### RM -> CEM: PEBC.EnergyConstraint
While PEBC.PowerConstraints are always needed to be defined in Power Envelope Based Control, PEBC.EnergyConstraints are optional. With EnergyConstraints a RM can specify average power levels for a specific period of time. This is mainly useful for consumption such as EV charging, because it allows the RM to define how much energy should be transferred in a certain period, to make sure the EV is charged with a predefined SoC at a certain time, while the overall flexibility the EV provides to the CEM stays the same. 
So for this PV Installation example EnergyConstraints are not applicable.

<details>

For the interested reader the Json message is shown below. Please refer to the EV example with PEBC for more details.

```json
{
  "message_type": "PEBC.EnergyConstraint",
  "message_id": "xxx",
  "id": "energyconstraint1",
  "valid_from": "2024-12-24T14:15:22Z",
  "valid_until": "2024-12-25T14:15:22Z",
  "upper_average_power": 3000,
  "lower_average_power": 1000,
  "commodity_quantity": "ELECTRIC.POWER.L1"
}
```
</details>

### Normal operation: Exchange of measurements, forecasts and curtailment instructions

#### RM -> CEM: PowerMeasurement
The RM sends power measurements to the CEM using the `PowerMeasurement` message.
It can send multiple values with the same timestamp (e.g. for three phase measurements). For our example only one phase is used.

```json
{
  "message_type": "PowerMeasurement",
  "message_id": "xxx",
  "measurement_timestamp": "2024-08-24T14:15:22Z",
  "values": [
    {
      "commodity_quantity": "ELECTRIC.POWER.L1",
      "value": 3450.6
    }
  ]
}
```

#### RM -> CEM: PowerForecast
It can be quite useful for a CEM to know in advance what the future energy usage of a device will be. This is
true for both controllable and non-controllable devices such as our PV Installation. Such a forecast can be used by an energy
management algorithm to establish the base load it will have to work with. The data for this power forecast could for example be retrieved from a weather service that can calculate this forecast based the location and orientation of the PV installation.
A PowerForcast can also incorporate uncertainty of the forecast in the values.

```json
{
  "message_type": "PowerForecast",
  "message_id": "xxx",
  "start_time": "2024-08-24T14:00:00Z",
  "elements": [
    {
      "duration": 3600000,
      "power_values": [
        {
          "value_upper_limit": -3500.0,
          "value_upper_95PPR": -3460.0,
          "value_upper_68PPR": -3455.0,
          "value_expected": -3450.1,
          "value_lower_68PPR": -3445.0,
          "value_lower_95PPR": -3440.0,
          "value_lower_limit": -3400.0,
          "commodity_quantity": "ELECTRIC.POWER.L1"
        }
      ]
    }
  ]
}
```

This Json message shows a forecast for 60 minutes (3_600_000 milliseconds), starting from 2024-08-24 14:00:00 (UTC). `value_expected` is required to be specified, in this case -3450.1 kW (for production). The other values show the statistical distribution of the expected production, and are optional.

#### CEM -> RM: PEBC.Instruction
This message is the actual curtailment message from the CEM to the RM. The message contains a few relevant properties:

1. `execution_time` defines at what starting time this instruction is valid.

2. `abnormal_condition` indicates if this is an abnormal condition that is requested and might impact the user's comfort. See above and §7.3 of the standard for more information.

3. `power_constraints_id` refers to a communicated power constraint from the RM that is selected as curtailment option.

4. `power_envelopes` is a list of constraints or power envelopes (as there are multiple elements inside one power envelope) to be applied to the PV installation starting from `execution_time`. Every PowerEnvelope contains an `id`, `commodity_quantity` (in our case Phase 1) and a list of `PowerEnvelopeElements` in field `power_envelope_elements`.

5. Each power envelope element specifies a `duration` in milliseconds and a selected `lower_limit` and `upper_limit` from the earlier send PEBC.PowerConstraint message referenced by `power_constraints_id`. 

For our example we only specify one PEBC.PowerEnvelopeElement where -2000 W is selected as curtailment for the `lower_limit` and 0 W for the `upper_limit` for a duration of 1 hour.

```json
{
  "message_type": "PEBC.Instruction",
  "message_id": "xxx",
  "id": "envelope1",
  "execution_time": "2024-08-24T15:00:00Z",
  "abnormal_condition": false,
  "power_constraints_id": "powerConstraint1",
  "power_envelopes": [
    {
      "id": "pe_xxx",
      "commodity_quantity": "ELECTRIC.POWER.L1",
      "power_envelope_elements": [
        {
          "duration": 3600000,
          "upper_limit": 0,
          "lower_limit": -2000.0
        }
      ]
    }
  ]
}
```


#### RM -> CEM: InstructionStatusUpdate
The RM confirms the above message with an InstructionStatusUpdate message:

```json
{
  "message_type": "InstructionStatusUpdate",
  "message_id": "xxx",
  "instruction_id": "envelope1",
  "status_type": "SUCCEEDED",
  "timestamp": "2024-08-24T14:45:00Z"
}
```

This message confirms the instruction with id `envelope1` (see above) with a certain status. In this case the instruction is `SUCCEEDED`, indicating that the instruction is accepted and successfully processed.

The following options for `status_type` are possible:

- NEW: Instruction was newly created 
- ACCEPTED: Instruction has been accepted 
- REJECTED: Instruction was rejected 
- REVOKED: Instruction was revoked 
- STARTED: Instruction was executed 
- SUCCEEDED: Instruction finished successfully 
- ABORTED: Instruction was aborted.

These messages give the CEM information on the instructions it sends.

### RM -> CEM: SessionRequest
With the SessionRequest message the RM can indicate a graceful disconnect or a request to reconnect. After a reconnect, the session should be setup from scratch.

```json
{
  "message_type": "SessionRequest",
  "message_id": "xxx",
  "request": "TERMINATE",
  "diagnostic_label": "PV Inverter resource manager shutdown"
}
```






