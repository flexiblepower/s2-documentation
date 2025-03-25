---
title: "Example: Heat Pump"
---

# S2 examples for heat pumps

This page serves as a guide for implementing an S2 RM for a heat pump, or to give a CEM developer a better understanding of what to expect when controlling the energy flexibility of a heat pump. It provides some example S2 messages for same (fictional) heat pumps.

## How is a heat pump flexible?

A heat pump is a device that uses electricity to heat a building and/or Domestic Hot Water (DHW). A heat pump can do this efficiently by utilizing a heat source (typically the air or ground). In this guide we'll make the distinction between an all electric heat pump (which provides the heat for a building on its own) and a hybrid heat pump (which is typically a smaller heat pump which uses a natural gas boiler for peak demands). When a heat pump provides DHW, it typically uses a buffer tank to store an amount of hot water.

There are in principle three ways a heat pump can be energy flexible. Depending on the set-up, these forms of energy flexibility can be combined.

1. **Using the Domestic Hot Water (DHW) buffer as a source of energy flexibility**

Allow some variation in the water temperature, or don't heat the buffer immediately after DHW consumption. This requires a bit larger DHW buffer than strictly necessary, or a reliable forecast of when what amount of DHW is required.

2. **Using the thermal mass of the building as a source for energy flexibility**

Reduce or stop heating the building for a certain period, without significantly affecting the room temperature. Preheating (again, without significantly affecting the room temperature) could even prolong the period in which the heat pump can turn off or reduce its power. This is typically implemented by defining a small temperature bandwidth (e.g. half a degree Celsius) around the thermostat set point.

3. **(Hybrid heat pump only) Switching between electricity and natural gas**

A hybrid heat pump can temporary reduce or stop its electricity consumption by starting or increasing the power of the natural gas boiler. This way, the heat output of the hybrid heat pump isn't significantly affected.

## Choosing the right Control Type

When implementing S2, it's important to choose the right [Control Type(s)](./Control_Types.md) to implement in the RM of the heat pump. S2 is a language for conveying energy flexibility to the CEM without making any assumptions on what the CEM is optimizing for. Although there typically are multiple Control Types that can be used for a heat pump, it is preferred to pick the one that conveys the most information and control options to the CEM, so the CEM can do the best optimization that adds the most value.

As a general rule, when there is some form of energy (in this case heat) buffering involved, Fill Rate Base Control (FRBC) is the best Control Type. When there is no flexibility involved, but there is an option to switch between different fuels (as is the case with the hybrid heat pump), Demand Driven Based Control (DDBC) typically is the best option. Both Control Types give the CEM relatively direct control over the heat pump.

However, in S2 it is up to the RM to implement whatever Control Type it seems best, or it can even implement multiple Control Types. There are two alternatives that still allow the CEM to utilize the energy flexibility of the heat pump, but give less direct control over the heat pump. The risk of these control types is that CEM might utilize the energy flexibility less effective or that it makes the energy flexibility of the heat pump not usable for certain use cases, decreasing the value of the energy flexibility.

The first alternative Control Type is Power Envelope Based Control (PEBC). With PEBC, the CEM cannot control the heat pump, but it can request it to limit its energy consumption for certain moments. The Resource Manager defines how the CEM is allowed to limit the consumption. It is preferred (but not mandatory) that the RM provides a forecast of the energy consumption.

The second alternative Control Type is Power Profile Based Control (PPBC). Here the RM could offer the CEM some alternative power profiles for the near future to choose from. It could, for example, offer a power profile where it starts heating DHW right away, and an alternative one where it does it later. It is for this Control Type necessary that the RM can make forecasts for the near future.

The possible Control Types to implement are summarized in the table below.

| DHW buffer | Thermal mass building | Switching between natural gas and electricity (hybrid heat pump only) | Preferred Control Type | Alternative Control Type |
|------------|-----------------------|--------------------------------------------------------------------------|------------------------|--------------------------|
| No         | No                    | No                                                                       | n/a                    | n/a                      |
| **Yes**    | No                    | No                                                                       | FRBC                   | PEBC or PPBC             |
| No         | **Yes**               | No                                                                       | FRBC                   | PEBC or PPBC             |
| No         | No                    | **Yes**                                                                  | DDBC                   | PEBC or PPBC             |
| **Yes**    | **Yes**               | No                                                                       | FRBC                   | PEBC or PPBC             |
| No         | **Yes**               | **Yes**                                                                  | FRBC                   | PEBC or PPBC             |
| **Yes**    | No                    | **Yes**                                                                  | FRBC                   | PEBC or PPBC             |
| **Yes**    | **Yes**               | **Yes**                                                                  | FRBC                   | PEBC or PPBC             |

## Example: All electric heat pump utilizing the DHW buffer using FRBC

In this example we will work out the communication between CEM and RM for an all electric heat pump that utilizes the DHW buffer for energy flexibility using FRBC.

The following sequence diagram is an example of what a message exchange between a CEM and RM could look like, but messages could also be sent in a different order (see also [State of communication](./State_of_communication.md) and the [FRBC Message reference](/docs/API/FRBC/FRBC.SystemDescription)). `ReceptionStatus` messages are omitted for readability.

![XPBVhX8n4CRl-nHz0FK1l308I2Hn4xCByNhiVe66RcUTcMBmwLqW9-bXEJcty_l-TD9Pg95O6P9pcGsUpn2_-jPyy6tpsV_2xux32UO3vunWw9sRgF_uvSQ_K-xrI2UuzZQRK3ryfcoX8sV5qxvjZXOfnN_NdYfoCd6HW8Oo7I1h6CMaTNw7X60hpYQSTfVnUNx5FGMBPxA7fasxN](https://github.com/flexiblepower/s2-ws-json/assets/851310/49422881-d6e3-4ffc-b513-74230d61875d)
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
RM -> CEM: FRBC.LeakageBehaviour

loop in no particular order
RM -> CEM: PowerMeasurement

RM -> CEM: FRBC.ActuatorStatus
RM -> CEM: FRBC.StorageStatus
RM -> CEM: FRBC.TimerStatus

RM -> CEM: FRBC.UsageForecast

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
The RM informs the CEM about several static properties of the RM/heat pump:
* The resource_id is a unique string in the context of the CEM.
* The name is a default name or user defined name (when possible) for UI purposes.
* In this context the heat pump is an electricity consumer, and not a heat producer or storage. S2 is concerned with what is exchanged with _the grid_, and in this case the heat pump doesn't participate in a heat grid that needs to be managed by the CEM.
* The instruction processing delay indicates that the heat pump will on average respond in 10000 milliseconds to an instruction from the CEM.
* This heat pump does not define any costs related parameters, so no currency needs to be provided.
* This RM only implements the FRBC Control Type.
* This RM does not provide power forecasts.
* This heat pump is a single phase electric device (when there is only one phase the phase L1 must be used), so it will only provide measurements for the single phase.
```json
{
  "message_type": "ResourceManagerDetails",
  "message_id": "xxx",
  "resource_id": "acme_heat_pump",
  "name": "my_heat_pump",
  "roles": [
    {
      "role": "ENERGY_CONSUMER",
      "commodity": "ELECTRICITY"
    }
  ],
  "manufacturer": "ACME",
  "model": "HeatPump2000",
  "serial_number": "123",
  "firmware_version": "v1.0",
  "instruction_processing_delay": 10000,
  "available_control_types": [
    "FILL_RATE_BASED_CONTROL"
  ],
  "provides_forecast": false,
  "provides_power_measurement_types": [
    "ELECTRIC.POWER.L1"
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
The idea behind FRBC is that the RM describes an abstract device, which can be mapped to the physical device. The abstract device should be accurate enough for the CEM to create realistic plans and instructions. The FRBC.SystemDescription message defines this abstract device. This description usually pretty static, but can be updated by the RM if the parameters change (e.g. due to efficiency changes do to a changing outside temperature). The FRBC.SystemDecription is relatively large message, so we'll break it down in parts.

First of all we'll take a look at how the _storage_ is described. The storage is an energy storage for which we know how _full_ it is. The fullness of the buffer is described with a number called the _fill level_. How exactly energy is stored and what the exact unit of the fill level is is not that relevant to the CEM; it only cares about energy exchanged with the grid. In our case the storage is our DHW buffer, and the we'll use the temperature in Celsius as the fill level. For comfort and efficiency reasons, we'll allow a water temperature anywhere between 45 and 55 degrees Celsius. If it is below 45, the DHW buffer MUST be heated for user comfort and the heat pump is no longer energy flexible. A temperature above 55 degrees Celsius is not desirable due to efficiency reasons. When the temperature is above 55 the heat pump cannot turn on and also isn't energy flexible. These two temperatures are defined as the fill level range.

For debugging purposes (so for humans, not for algorithms) a label is provided for the storage and the fill level. Also, it is indicated which information the storage provides. The fill level target is not relevant in our case, so it is not provided.

```json
  {
    "diagnostic_label": "DHW Buffer",
    "fill_level_label": "temperature in Celsius",
    "provides_leakage_behaviour": true,
    "provides_fill_level_target_profile": false,
    "provides_usage_forecast": true,
    "fill_level_range": {
      "start_of_range": 45,
      "end_of_range": 55
    }
  }
```

Secondly we'll define the heat pump itself. In FRBC this is referred to as an actuator. An actuator is something that the CEM can control, affects the fill level of the storage and exchanges power with the power grid (in our case, consuming electricity).

TODO

And finally, putting everything together in one message:

```json
{
  "message_type": "FRBC.SystemDescription",
  "message_id": "xxx",
  "valid_from": "2019-08-24T14:15:22Z",
  "actuators": [
    {
      "id": "actuator1",
      "diagnostic_label": "heat pump",
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
                "end_of_range": 0
              },
              "fill_rate": {
                "start_of_range": 0,
                "end_of_range": 0
              },
              "power_ranges": [
                {
                  "start_of_range": 0,
                  "end_of_range": 0,
                  "commodity_quantity": "ELECTRIC.POWER.L1"
                }
              ],
              "running_costs": {
                "start_of_range": 0,
                "end_of_range": 0
              }
            }
          ],
          "abnormal_condition_only": true
        }
      ],
      "transitions": [
        {
          "id": "string",
          "from": "string",
          "to": "string",
          "start_timers": [
            "string"
          ],
          "blocking_timers": [
            "string"
          ],
          "transition_costs": 0,
          "transition_duration": 0,
          "abnormal_condition_only": true
        }
      ],
      "timers": [
        {
          "id": "string",
          "diagnostic_label": "string",
          "duration": 0
        }
      ]
    }
  ],
  "storage": {
    "diagnostic_label": "DHW Buffer",
    "fill_level_label": "temperature",
    "provides_leakage_behaviour": true,
    "provides_fill_level_target_profile": false,
    "provides_usage_forecast": true,
    "fill_level_range": {
      "start_of_range": 45,
      "end_of_range": 55
    }
  }
}
```

### RM -> CEM: FRBC.LeakageBehaviour
TODO
```json
{
  "message_type": "FRBC.LeakageBehaviour",
  "message_id": "string",
  "valid_from": "2019-08-24T14:15:22Z",
  "elements": [
    {
      "fill_level_range": {
        "start_of_range": 0,
        "end_of_range": 0
      },
      "leakage_rate": 0
    }
  ]
}
```

### RM -> CEM: PowerMeasurement
TODO
```json
{
  "message_type": "PowerMeasurement",
  "message_id": "string",
  "measurement_timestamp": "2019-08-24T14:15:22Z",
  "values": [
    {
      "commodity_quantity": "ELECTRIC.POWER.L1",
      "value": 0
    }
  ]
}
```

### RM -> CEM: FRBC.ActuatorStatus
TODO
```json
{
  "message_type": "FRBC.ActuatorStatus",
  "message_id": "string",
  "actuator_id": "string",
  "active_operation_mode_id": "string",
  "operation_mode_factor": 0,
  "previous_operation_mode_id": "string",
  "transition_timestamp": "2019-08-24T14:15:22Z"
}
```

### RM -> CEM: FRBC.StorageStatus
TODO
```json
{
  "message_type": "FRBC.StorageStatus",
  "message_id": "string",
  "present_fill_level": 0
}
```

### RM -> CEM: FRBC.TimerStatus
TODO
```json
{
  "message_type": "FRBC.TimerStatus",
  "message_id": "string",
  "timer_id": "string",
  "actuator_id": "string",
  "finished_at": "2019-08-24T14:15:22Z"
}
```

### RM -> CEM: FRBC.UsageForecast
TODO
```json
{
  "message_type": "FRBC.UsageForecast",
  "message_id": "string",
  "start_time": "2019-08-24T14:15:22Z",
  "elements": [
    {
      "duration": 0,
      "usage_rate_upper_limit": 0,
      "usage_rate_upper_95PPR": 0,
      "usage_rate_upper_68PPR": 0,
      "usage_rate_expected": 0,
      "usage_rate_lower_68PPR": 0,
      "usage_rate_lower_95PPR": 0,
      "usage_rate_lower_limit": 0
    }
  ]
}
```

### CEM -> RM: FRBC.Instruction
TODO
```json
{
  "message_type": "FRBC.Instruction",
  "message_id": "string",
  "id": "string",
  "actuator_id": "string",
  "operation_mode": "string",
  "operation_mode_factor": 0,
  "execution_time": "2019-08-24T14:15:22Z",
  "abnormal_condition": true
}
```

### RM -> CEM: InstructionStatusUpdate
TODO
```json
{
  "message_type": "InstructionStatusUpdate",
  "message_id": "string",
  "instruction_id": "string",
  "status_type": "NEW",
  "timestamp": "2019-08-24T14:15:22Z"
}
```

### RM -> CEM: SessionRequest
TODO
```json
{
  "message_type": "SessionRequest",
  "message_id": "string",
  "request": "TERMINATE",
  "diagnostic_label": "string"
}
```




## Example: Hybrid heat pump without buffering using DDBC
TODO
