---
title: "Example: Electric Vehicle"
---

# S2 examples for electric vehicles

This page serves as a guide for implementing a S2 RM for an electric vehicle (charge point), or to give a CEM developer a better understanding of what to expect when controlling the energy flexibility of electric vehicles. It provides some example S2 messages for a (fictional) EV as well.

## How is an EV (charger) flexible?

From an energy flexibility point of view, an electric vehicle is a battery on wheels with a charging need (which depends on the mileage). Compared to a typical home battery, an EV battery actually is a *big* battery on wheels (is 2-10 times larger than a home battery). Obviously, the energy flexibility is only available if the EV is connected to a charger. We call the period that EV is connected to the charger a charging session. Within that period, the EV needs to charge to fulfill the end users charging need but the exact time and power at which charging is done is most of the times not relevant for the user. Hence, the charging session provides flexibility. In addition, an EV and the charger might be capable of discharging, which is referred to as Vehicle to Grid (V2G), that provides even more energy flexibility.

The power at which the battery is charged can typically be set at any value between a minimum and maximum charging power, although some charger-EV combinations only offer binary (i.e. on/off) charging control.

## Resource Manager for the EV or the charge point?

The battery management system in the EV consists of hardware and software that ultimately controls the charging power. However, the charging point has a certain charging capacity that limits the charging power of EV. Every charger has a static maximum capacity (determined by the hardware) but could have a dynamic limit which could be set through an energy management system. The charge point, which is called electric vehicle supply equipment (EVSE) in charging vocabulary, communicates the maximum charging power to the EV.
In principle, the RM can be implemented either on EV level or on the charge point level. However, the availability of the required data for the RM depends on the interfaces between EV and charge point (so both the EV and the charge point need to support right interfaces). For example, some EVs do not share State-of-Charge (SoC) information with the charge point and, on the other hand, the EV typically doesn't know where it is connected in the grid. Depending on the energy flexibility use case and as long as the RM has the required data, it can be implemented both on EV or on charge point level. However, in a specific situation, there should only be one RM for the charger-EV combination.

## Choosing the right Control Type
S2 is a language for conveying energy flexibility to the CEM without making any assumptions on what the CEM is optimizing for. Although there are multiple [Control Type(s)](/docs/concepts/control-types.md) that can be used for an EV, it is preferred to pick the one that conveys the most information and control options to the CEM, so the CEM can do the best optimization that adds the most value. In the ideal situation, the RM has access to the following data points:
 - Minimum charging power (and discharging power, only relevant for V2G)
 - Maximum charging power (and discharging power, only relevant for V2G)
 - SoC at arrival
 - Desired SoC at departure
 - Battery capacity
 - Time of departure
 - Minimum SoC during the charging session (relevant in case of V2G)

In addition, the RM should have the capability to set the (dis)charging power at any value between the minimum and maximum power in the ideal situation.

If that information is available, then the RM should use the Fill Rate Based Control (FRBC) type. That Control Type offers the best description of the energy flexibility of the RM to the CEM and allows the CEM to optimize and control the flexibility most precisely.

However, when some of the data is lacking it might be needed for the RM to fall back to a less advanced way of describing the flexibility of the EV. The first alternative control type is Power Envelope Based Control (PEBC). With PEBC, the CEM cannot control the EV charging, but it can request it to limit its energy consumption for certain moments. The RM defines how the CEM is allowed to limit the consumption. It is preferred (but not mandatory) that the RM provides a forecast of the energy consumption.

The second alternative Control Type is Power Profile Based Control (PPBC), in which the RM could offer the CEM some alternative power profiles for the near future to choose from. It could, for example, offer a power profile where it starts charging the EV right away, and an alternative one where it does it later. It is for this Control Type necessary that the RM can make forecasts for the near future (and thus know or estimate the required amount of energy to charge).

The minimum and maximum charging power are always needed for all control types.

The possible Control Types to implement are summarized in the table below.

| SoC at arrival | Desired SoC at departure | Battery capacity | Time of Departure | Preferred Control Type | Alternative Control Type |
|-|-|-|-|-|-|
Yes | Yes | - | Yes | FRBC | PEBC*, PPBC |
Yes | -  | Yes | Yes | FRBC | PEBC*, PPBC |
No | No | No | No | PEBC | - |

\* with energy constraint

## Example: EV using FRBC

In this example we will detail out the communication between CEM and RM for an unidirectional EV charger that uses FRBC.

We cover the situation in which the RM has access to the following data:
 - Minimum charging power
 - Maximum charging power
 - SoC at arrival
 - Desired SoC at departure
 - Battery capacity
 - Time of departure

Furthermore, the RM can control the charging power of the EV such that it can set the power at any value between the minimum and maximum value.

The following sequence diagram is an example of what a message exchange between the CEM and RM could look like, but messages could also be sent in a different order (see also [State of communication](/docs/s2-json-over-websockets/state-of-communication.md) and the [FRBC Message reference](/model-reference/FRBC/FRBC.SystemDescription)). `ReceptionStatus` messages are omitted for readability.

![cem_rm_interactions](https://www.plantuml.com/plantuml/png/VP7DJiCm3CVlUOey0F007D1W0x539TI2E9lKWcYf7MndQ3mzeI0HMCNLF_y_BA_KGAnCoH4RUjwZ-FLrT-Bxxjm_ujF0OOVc0nDXC1oTgzIVNipy5cZK5zYXw-TPHUrmQRD7pKoARYblIz4YfFXUSrhBAk8Y0JiWU4RPe45CsleFc33Ocic4q_qXB_itt4Emk0VxatJJNwtFXeCQJXlK835RP78kCMSVoHFx368nb0JYMKQKLdx7RoWTWXR12ScElI-35J2MmS2A7aTNL4_yfks5CzwIcfGmTsgapVXB-P17C7H8e_zi_gl6WAfriSVNWchk_x-FKNzUlwf-PKeV)
<details>

Image generated using the following PlantUML code:

```
@startuml

note over CEM, RM: WebSocket connected

CEM -> RM: Handshake
RM -> CEM: Handshake
CEM -> RM: HandshakeResponse

note over CEM, RM: Initialized

RM -> CEM: ResourceManagerDetails
CEM -> RM: SelectControlType

note over CEM, RM: ControlType activated

RM -> CEM: FRBC.SystemDescription

loop in no particular order
RM -> CEM: PowerMeasurement

RM -> CEM: FRBC.ActuatorStatus
RM -> CEM: FRBC.StorageStatus

CEM -> RM: FRBC.Instruction
RM -> CEM: InstructionStatusUpdate
end loop

RM -> CEM: SessionRequest

note over CEM, RM: WebSocket disconnected

@enduml
```

</details>

### CEM -> RM: Handshake
The CEM informs the RM that it is a CEM and which versions of s2-ws-json it supports.
```json
{
  "message_type": "Handshake",
  "message_id": "xxx",
  "role": "CEM",
  "supported_protocol_versions": [
    "0.0.2-beta"
  ]
}
```

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
The RM informs the CEM about several static properties of the EV:
* The resource_id is a unique string in the context of the CEM.
* The name is a default name or user defined name (when possible) for UI purposes.
* In this context the EV is an electricity consumer (if V2G would be applied, the RM would have the storage role).
* The instruction processing delay indicates that the EV will on average respond in 3000 milliseconds to an instruction from the CEM.
* This EV does not define any costs related parameters, so no currency needs to be provided.
* This RM only implements the FRBC Control Type.
* This RM does not provide power forecasts.
* This EV charger is a three-phase electric device, so it will only provide three-phase measurements.
```json
{
  "message_type": "ResourceManagerDetails",
  "message_id": "xxx",
  "resource_id": "acme_ev_xxxxxx",
  "name": "My Electric Vehicle RM",
  "roles": [
    {
      "role": "ENERGY_CONSUMER",
      "commodity": "ELECTRICITY"
    }
  ],
  "manufacturer": "ACME",
  "model": "WallBox-b100",
  "serial_number": "123",
  "firmware_version": "v1.0",
  "instruction_processing_delay": 3000,
  "available_control_types": [
    "FILL_RATE_BASED_CONTROL"
  ],
  "provides_forecast": false,
  "provides_power_measurement_types": [
    "ELECTRIC.POWER.3_PHASE_SYMMETRIC"
  ]
}
```

### CEM -> RM: SelectControlType
The CEM informs the RM that it wants to use FRBC ControlType (the RM defined in the ResourceManagerDetails that this is the only supported ControlType).
```json
{
  "message_type": "SelectControlType",
  "message_id": "xxx",
  "control_type": "FILL_RATE_BASED_CONTROL"
}
```

### RM -> CEM: FRBC.SystemDescription
In the S2 standard, the RM describes an abstract device that can be mapped to the physical device. The abstract device should be accurate enough for the CEM to create realistic plans and instructions. The FRBC.SystemDescription message defines this abstract device. This description usually is pretty static, but can be updated by the RM if the parameters change. Since the FRBC.SystemDecription is relatively large message, we'll break it down in parts.

First, we take a look at how the _storage_ is described. The level to which a storage is filled is described by a number called the _fill level_. How energy is exactly stored and what the exact unit of the fill level is, is not that relevant to the CEM; it only cares about energy exchanged with the grid. In our case the storage is the battery in our EV and we use the SoC as the fill level. We have different options to define the fill level range, depending on the availability of data. If the battery capacity is available, we can (and should) define the fill level range over the allowed SoC range. Taking into account that the EV battery management systems already uses limits that are such that the battery capacity hardly degrades, the range can be defined from 0 to 100. If the battery capacity is not available (and the desired SoC at the end of the charging session is available) the `fill_level_range` is associated to the amount of energy to charge in the session and range then also from 0 to 100.

For debugging purposes (so for humans, not for algorithms) a label is provided for the storage and the fill level. Also, it is indicated which information the storage provides. If available, the desired SoC at the end of the charging session can be expressed in the fill level target, which we do in this example. Furthermore, we do not model the battery self-discharge losses because they are neglectable (particularly during a charging session) so we set the provides leakage behavior is set to false. Finally, this RM provides a forecast neither.

```json
  {
    "diagnostic_label": "Battery SoC",
    "fill_level_label": "EV Battery SoC",
    "provides_leakage_behaviour": false,
    "provides_fill_level_target_profile": true,
    "provides_usage_forecast": false,
    "fill_level_range": {
      "start_of_range": 0,
      "end_of_range": 100
    }
  }
```

Secondly, we define the characteristics of charging the EV. In FRBC this is referred to as an actuator. An actuator is something that the CEM can control, affects the fill level of the storage and exchanges power with the power grid (in our case, consuming electricity).

An actuator consist of operation modes, transitions and timers. Transitions occur when a CEM instructs the RM to switch from one operation mode to another. Timers can be optionaly linked to transitions to indicate that a transition to another operation mode is temporarily blocked (until the timer finishes).

Because a RM can change the charging power of an EV very fast, there is in practice no need to define timers actuators for FRBC battery charging.

Our actuator has two operation modes. One to turn off the EV charging and one to charge the EV between 1.4 kW and 11 kW. The trick to put the right `fill_rate` values in the message. Those values describe how much the fill level increase at the corresponding power in the power ranges. The `power_ranges.start_of_range` corresponds to the `fill_rate.start_of_range` and similarly for the `end_of_range` values. To calculate those values, we also need the battery capacity (or alternatively, the amount of energy to charge in the session). Let's say we have an EV with a capacity of 60 kWh. So charging the EV at the lowest possible power would take 60 / 1.4 * 3600 = 154.286 seconds. So the corresponding `fill_rate` (recall that's the fill level increase per second) for charging at minimum power is 100/154,285 = 0.00065. Likewise for the max charging power: 0.0051.

```json
{
  "id": "actuator1",
  "diagnostic_label": "EV charger",
  "supported_commodities": [
    "ELECTRICITY"
  ],
  "operation_modes": [
    {
      "id": "om1",
      "diagnostic_label": "Off",
      "elements": [
        {
          "fill_level_range": {
            "start_of_range": 0,
            "end_of_range": 100
          },
          "fill_rate": {
            "start_of_range": 0,
            "end_of_range": 0
          },
          "power_ranges": [
            {
              "start_of_range": 0,
              "end_of_range": 0,
              "commodity_quantity": "ELECTRIC.POWER.3_PHASE_SYMMETRIC"
            }
          ]
        }
      ],
      "abnormal_condition_only": true
    },
    {
      "id": "om2",
      "diagnostic_label": "Charging",
      "elements": [
        {
          "fill_level_range": {
            "start_of_range": 0,
            "end_of_range": 100
          },
          "fill_rate": {
            "start_of_range": 0.00065,
            "end_of_range": 0.0051
          },
          "power_ranges": [
            {
              "start_of_range": 1400,
              "end_of_range": 11000,
              "commodity_quantity": "ELECTRIC.POWER.3_PHASE_SYMMETRIC"
            }
          ]
        }
      ],
      "abnormal_condition_only": true
    }
  ],
  "transitions": [
    {
      "id": "transition1",
      "from": "om1",
      "to": "om2",
      "start_timers": [],
      "blocking_timers": [],
      "transition_duration": 3000,
      "abnormal_condition_only": true
    },
    {
      "id": "transition2",
      "from": "om2",
      "to": "om1",
      "start_timers": [],
      "blocking_timers": [],
      "transition_duration": 3000,
      "abnormal_condition_only": true
    }
  ],
  "timers": []
}
```

And finally, putting everything together in one message:

```json
{
  "message_type": "FRBC.SystemDescription",
  "message_id": "xxx",
  "valid_from": "2019-08-24T14:15:22Z",
  "actuators": [
    {
  "id": "actuator1",
  "diagnostic_label": "EV charger",
  "supported_commodities": [
    "ELECTRICITY"
  ],
  "operation_modes": [
    {
      "id": "om1",
      "diagnostic_label": "Off",
      "elements": [
        {
          "fill_level_range": {
            "start_of_range": 0,
            "end_of_range": 100
          },
          "fill_rate": {
            "start_of_range": 0,
            "end_of_range": 0
          },
          "power_ranges": [
            {
              "start_of_range": 0,
              "end_of_range": 0,
              "commodity_quantity": "ELECTRIC.POWER.3_PHASE_SYMMETRIC"
            }
          ]
        }
      ],
      "abnormal_condition_only": true
    },
    {
      "id": "om2",
      "diagnostic_label": "Charging",
      "elements": [
        {
          "fill_level_range": {
            "start_of_range": 0,
            "end_of_range": 100
          },
          "fill_rate": {
            "start_of_range": 0.00065,
            "end_of_range": 0.0051
          },
          "power_ranges": [
            {
              "start_of_range": 1400,
              "end_of_range": 11000,
              "commodity_quantity": "ELECTRIC.POWER.3_PHASE_SYMMETRIC"
            }
          ]
        }
      ],
      "abnormal_condition_only": true
    }
  ],
  "transitions": [
    {
      "id": "transition1",
      "from": "om1",
      "to": "om2",
      "start_timers": [],
      "blocking_timers": [],
      "transition_duration": 3000,
      "abnormal_condition_only": true
    },
    {
      "id": "transition2",
      "from": "om2",
      "to": "om1",
      "start_timers": [],
      "blocking_timers": [],
      "transition_duration": 3000,
      "abnormal_condition_only": true
    }
  ],
  "timers": []
}
  ],
  "storage":   {
    "diagnostic_label": "Battery SoC",
    "fill_level_label": "EV Battery SoC",
    "provides_leakage_behaviour": false,
    "provides_fill_level_target_profile": true,
    "provides_usage_forecast": false,
    "fill_level_range": {
      "start_of_range": 0,
      "end_of_range": 100
    }
  }
}
```

### RM -> CEM: PowerMeasurement
To inform the CEM about the actual power consumption of the device in real-time, the RM can send power measurement.

Below is given an example of a power measurement message:
```json
{
  "message_type": "PowerMeasurement",
  "message_id": "xxx",
  "measurement_timestamp": "2019-08-24T14:15:22Z",
  "values": [
    {
      "commodity_quantity": "ELECTRIC.POWER.3_PHASE_SYMMETRIC",
      "value": 10963
    }
  ]
}
```

### RM -> CEM: FRBC.ActuatorStatus
In S2, the RM is in charge of the control of a device. It receives instructions form the CEM how to operate and it is supposed to follow that as closely as possible. However, if user constraints of device constraints would be violated, the RM can decide by itself to deviate from the instructions as received from the CEM. It is also possible that the CEM did not send any instructions at all. Therefore, the RM must send updates about the status of the actuators to the CEM. The message below is example of such an update. It is up to the RM to decide when this actually send but the principle is that it must send an update if the state changes significantly.
```json
{
  "message_type": "FRBC.ActuatorStatus",
  "message_id": "xxx",
  "actuator_id": "actuator1",
  "active_operation_mode_id": "string",
  "operation_mode_factor": 0,
  "previous_operation_mode_id": "string",
  "transition_timestamp": "2019-08-24T14:15:22Z"
}
```

### RM -> CEM: FRBC.StorageStatus
Similarly as for the FRBC.ActuatorStatus, the FRBC RM must also send updates for fill level of the storage. Again, the principle is that the RM must send an update when the state changes significantly. The message below is example of such an update:
```json
{
  "message_type": "FRBC.StorageStatus",
  "message_id": "string",
  "present_fill_level": 0
}
```


### CEM -> RM: FRBC.Instruction
After the CEM has determined how to use the energy flexibility provided by the RM(s), it sends instructions to the RM(s). This instructions are telling the RM when (the `execution_time`) to change an actuator's operation mode and operation mode factor. Below is given an example:
```json
{
  "message_type": "FRBC.Instruction",
  "message_id": "xxx",
  "id": "instruction1",
  "actuator_id": "actuator1",
  "operation_mode": "om1",
  "operation_mode_factor": 1,
  "execution_time": "2019-08-24T14:15:22Z",
  "abnormal_condition": false
}
```

### RM -> CEM: InstructionStatusUpdate
After the RM has received an instruction, it handles it internally. To inform the CEM about the result of handling the instruction, the RM can send updates on the status of the instruction. The message below is an example of such a message.
```json
{
  "message_type": "InstructionStatusUpdate",
  "message_id": "xxx",
  "instruction_id": "instruction1",
  "status_type": "NEW",
  "timestamp": "2019-08-24T14:15:22Z"
}
```

### RM -> CEM or CEM -> RM: SessionRequest
When the RM or CEM wants close the current connection and possibly initiate a new S2 session, either one of them should send a session request message. This is mainly meant to be used by the websocket server (which can either be run by the CEM or RM) to tell the client to close the current connection and terminate or do a reconnect.
```json
{
  "message_type": "SessionRequest",
  "message_id": "xxx",
  "request": "RECONNECT",
  "diagnostic_label": "string"
}
```

## Example: EV using PEBC
TODO
