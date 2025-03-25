"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7292],{371:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>s,toc:()=>h});const s=JSON.parse('{"id":"Guides/Example_HP","title":"Example: Heat Pump","description":"This page serves as a guide for implementing an S2 RM for a heat pump, or to give a CEM developer a better understanding of what to expect when controlling the energy flexibility of a heat pump. It provides some example S2 messages for same (fictional) heat pumps.","source":"@site/docs/Guides/Example_HP.md","sourceDirName":"Guides","slug":"/Guides/Example_HP","permalink":"/s2-documentation/docs/Guides/Example_HP","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"Example: Heat Pump"},"sidebar":"tutorialSidebar","previous":{"title":"Example: Electric Vehicle","permalink":"/s2-documentation/docs/Guides/Example_EV"},"next":{"title":"Example: PV Installation","permalink":"/s2-documentation/docs/Guides/Example_PV"}}');var i=t(4848),r=t(8453);const a={title:"Example: Heat Pump"},o="S2 examples for heat pumps",l={},h=[{value:"How is a heat pump flexible?",id:"how-is-a-heat-pump-flexible",level:2},{value:"Choosing the right Control Type",id:"choosing-the-right-control-type",level:2},{value:"Example: All electric heat pump utilizing the DHW buffer using FRBC",id:"example-all-electric-heat-pump-utilizing-the-dhw-buffer-using-frbc",level:2},{value:"CEM -&gt; RM: Handshake",id:"cem---rm-handshake",level:3},{value:"RM -&gt; CEM: Handshake",id:"rm---cem-handshake",level:3},{value:"CEM -&gt; RM: HandshakeResponse",id:"cem---rm-handshakeresponse",level:3},{value:"RM -&gt; CEM: ResourceManagerDetails",id:"rm---cem-resourcemanagerdetails",level:3},{value:"CEM -&gt; RM: SelectControlType",id:"cem---rm-selectcontroltype",level:3},{value:"RM -&gt; CEM: FRBC.SystemDescription",id:"rm---cem-frbcsystemdescription",level:3},{value:"RM -&gt; CEM: FRBC.LeakageBehaviour",id:"rm---cem-frbcleakagebehaviour",level:3},{value:"RM -&gt; CEM: PowerMeasurement",id:"rm---cem-powermeasurement",level:3},{value:"RM -&gt; CEM: FRBC.ActuatorStatus",id:"rm---cem-frbcactuatorstatus",level:3},{value:"RM -&gt; CEM: FRBC.StorageStatus",id:"rm---cem-frbcstoragestatus",level:3},{value:"RM -&gt; CEM: FRBC.TimerStatus",id:"rm---cem-frbctimerstatus",level:3},{value:"RM -&gt; CEM: FRBC.UsageForecast",id:"rm---cem-frbcusageforecast",level:3},{value:"CEM -&gt; RM: FRBC.Instruction",id:"cem---rm-frbcinstruction",level:3},{value:"RM -&gt; CEM: InstructionStatusUpdate",id:"rm---cem-instructionstatusupdate",level:3},{value:"RM -&gt; CEM: SessionRequest",id:"rm---cem-sessionrequest",level:3},{value:"Example: Hybrid heat pump without buffering using DDBC",id:"example-hybrid-heat-pump-without-buffering-using-ddbc",level:2}];function d(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components},{Details:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"s2-examples-for-heat-pumps",children:"S2 examples for heat pumps"})}),"\n",(0,i.jsx)(n.p,{children:"This page serves as a guide for implementing an S2 RM for a heat pump, or to give a CEM developer a better understanding of what to expect when controlling the energy flexibility of a heat pump. It provides some example S2 messages for same (fictional) heat pumps."}),"\n",(0,i.jsx)(n.h2,{id:"how-is-a-heat-pump-flexible",children:"How is a heat pump flexible?"}),"\n",(0,i.jsx)(n.p,{children:"A heat pump is a device that uses electricity to heat a building and/or Domestic Hot Water (DHW). A heat pump can do this efficiently by utilizing a heat source (typically the air or ground). In this guide we'll make the distinction between an all electric heat pump (which provides the heat for a building on its own) and a hybrid heat pump (which is typically a smaller heat pump which uses a natural gas boiler for peak demands). When a heat pump provides DHW, it typically uses a buffer tank to store an amount of hot water."}),"\n",(0,i.jsx)(n.p,{children:"There are in principle three ways a heat pump can be energy flexible. Depending on the set-up, these forms of energy flexibility can be combined."}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"Using the Domestic Hot Water (DHW) buffer as a source of energy flexibility"})}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Allow some variation in the water temperature, or don't heat the buffer immediately after DHW consumption. This requires a bit larger DHW buffer than strictly necessary, or a reliable forecast of when what amount of DHW is required."}),"\n",(0,i.jsxs)(n.ol,{start:"2",children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"Using the thermal mass of the building as a source for energy flexibility"})}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Reduce or stop heating the building for a certain period, without significantly affecting the room temperature. Preheating (again, without significantly affecting the room temperature) could even prolong the period in which the heat pump can turn off or reduce its power. This is typically implemented by defining a small temperature bandwidth (e.g. half a degree Celsius) around the thermostat set point."}),"\n",(0,i.jsxs)(n.ol,{start:"3",children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"(Hybrid heat pump only) Switching between electricity and natural gas"})}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"A hybrid heat pump can temporary reduce or stop its electricity consumption by starting or increasing the power of the natural gas boiler. This way, the heat output of the hybrid heat pump isn't significantly affected."}),"\n",(0,i.jsx)(n.h2,{id:"choosing-the-right-control-type",children:"Choosing the right Control Type"}),"\n",(0,i.jsxs)(n.p,{children:["When implementing S2, it's important to choose the right ",(0,i.jsx)(n.a,{href:"/s2-documentation/docs/Guides/Control_Types",children:"Control Type(s)"})," to implement in the RM of the heat pump. S2 is a language for conveying energy flexibility to the CEM without making any assumptions on what the CEM is optimizing for. Although there typically are multiple Control Types that can be used for a heat pump, it is preferred to pick the one that conveys the most information and control options to the CEM, so the CEM can do the best optimization that adds the most value."]}),"\n",(0,i.jsx)(n.p,{children:"As a general rule, when there is some form of energy (in this case heat) buffering involved, Fill Rate Base Control (FRBC) is the best Control Type. When there is no flexibility involved, but there is an option to switch between different fuels (as is the case with the hybrid heat pump), Demand Driven Based Control (DDBC) typically is the best option. Both Control Types give the CEM relatively direct control over the heat pump."}),"\n",(0,i.jsx)(n.p,{children:"However, in S2 it is up to the RM to implement whatever Control Type it seems best, or it can even implement multiple Control Types. There are two alternatives that still allow the CEM to utilize the energy flexibility of the heat pump, but give less direct control over the heat pump. The risk of these control types is that CEM might utilize the energy flexibility less effective or that it makes the energy flexibility of the heat pump not usable for certain use cases, decreasing the value of the energy flexibility."}),"\n",(0,i.jsx)(n.p,{children:"The first alternative Control Type is Power Envelope Based Control (PEBC). With PEBC, the CEM cannot control the heat pump, but it can request it to limit its energy consumption for certain moments. The Resource Manager defines how the CEM is allowed to limit the consumption. It is preferred (but not mandatory) that the RM provides a forecast of the energy consumption."}),"\n",(0,i.jsx)(n.p,{children:"The second alternative Control Type is Power Profile Based Control (PPBC). Here the RM could offer the CEM some alternative power profiles for the near future to choose from. It could, for example, offer a power profile where it starts heating DHW right away, and an alternative one where it does it later. It is for this Control Type necessary that the RM can make forecasts for the near future."}),"\n",(0,i.jsx)(n.p,{children:"The possible Control Types to implement are summarized in the table below."}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"DHW buffer"}),(0,i.jsx)(n.th,{children:"Thermal mass building"}),(0,i.jsx)(n.th,{children:"Switching between natural gas and electricity (hybrid heat pump only)"}),(0,i.jsx)(n.th,{children:"Preferred Control Type"}),(0,i.jsx)(n.th,{children:"Alternative Control Type"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"No"}),(0,i.jsx)(n.td,{children:"No"}),(0,i.jsx)(n.td,{children:"No"}),(0,i.jsx)(n.td,{children:"n/a"}),(0,i.jsx)(n.td,{children:"n/a"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:"Yes"})}),(0,i.jsx)(n.td,{children:"No"}),(0,i.jsx)(n.td,{children:"No"}),(0,i.jsx)(n.td,{children:"FRBC"}),(0,i.jsx)(n.td,{children:"PEBC or PPBC"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"No"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:"Yes"})}),(0,i.jsx)(n.td,{children:"No"}),(0,i.jsx)(n.td,{children:"FRBC"}),(0,i.jsx)(n.td,{children:"PEBC or PPBC"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"No"}),(0,i.jsx)(n.td,{children:"No"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:"Yes"})}),(0,i.jsx)(n.td,{children:"DDBC"}),(0,i.jsx)(n.td,{children:"PEBC or PPBC"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:"Yes"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:"Yes"})}),(0,i.jsx)(n.td,{children:"No"}),(0,i.jsx)(n.td,{children:"FRBC"}),(0,i.jsx)(n.td,{children:"PEBC or PPBC"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"No"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:"Yes"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:"Yes"})}),(0,i.jsx)(n.td,{children:"FRBC"}),(0,i.jsx)(n.td,{children:"PEBC or PPBC"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:"Yes"})}),(0,i.jsx)(n.td,{children:"No"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:"Yes"})}),(0,i.jsx)(n.td,{children:"FRBC"}),(0,i.jsx)(n.td,{children:"PEBC or PPBC"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:"Yes"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:"Yes"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:"Yes"})}),(0,i.jsx)(n.td,{children:"FRBC"}),(0,i.jsx)(n.td,{children:"PEBC or PPBC"})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"example-all-electric-heat-pump-utilizing-the-dhw-buffer-using-frbc",children:"Example: All electric heat pump utilizing the DHW buffer using FRBC"}),"\n",(0,i.jsx)(n.p,{children:"In this example we will work out the communication between CEM and RM for an all electric heat pump that utilizes the DHW buffer for energy flexibility using FRBC."}),"\n",(0,i.jsxs)(n.p,{children:["The following sequence diagram is an example of what a message exchange between a CEM and RM could look like, but messages could also be sent in a different order (see also ",(0,i.jsx)(n.a,{href:"/s2-documentation/docs/Guides/State_of_communication",children:"State of communication"})," and the ",(0,i.jsx)(n.a,{href:"/docs/API/FRBC/FRBC.SystemDescription",children:"FRBC Message reference"}),"). ",(0,i.jsx)(n.code,{children:"ReceptionStatus"})," messages are omitted for readability."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{src:"https://github.com/flexiblepower/s2-ws-json/assets/851310/49422881-d6e3-4ffc-b513-74230d61875d",alt:"XPBVhX8n4CRl-nHz0FK1l308I2Hn4xCByNhiVe66RcUTcMBmwLqW9-bXEJcty_l-TD9Pg95O6P9pcGsUpn2_-jPyy6tpsV_2xux32UO3vunWw9sRgF_uvSQ_K-xrI2UuzZQRK3ryfcoX8sV5qxvjZXOfnN_NdYfoCd6HW8Oo7I1h6CMaTNw7X60hpYQSTfVnUNx5FGMBPxA7fasxN"})}),"\n",(0,i.jsxs)(t,{children:[(0,i.jsx)(n.p,{children:"Image generated using the following PlantUML code:"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"@startuml\n\nnote over CEM, RM: WebSocket connected\n\nCEM -> RM: Handshake\nRM -> CEM: Handshake\nCEM -> RM: HandshakeResponse\n\nnote over CEM, RM: Initialized\n\nRM -> CEM: ResourceManagerDetails\nCEM -> RM: SelectControlType\n\nnote over CEM, RM: ControlType activated\n\nRM -> CEM: FRBC.SystemDescription\nRM -> CEM: FRBC.LeakageBehaviour\n\nloop in no particular order\nRM -> CEM: PowerMeasurement\n\nRM -> CEM: FRBC.ActuatorStatus\nRM -> CEM: FRBC.StorageStatus\nRM -> CEM: FRBC.TimerStatus\n\nRM -> CEM: FRBC.UsageForecast\n\nCEM -> RM: FRBC.Instruction\nRM -> CEM: InstructionStatusUpdate\nend loop\n\nRM -> CEM: SessionRequest\n\nnote over CEM, RM: WebSocket disconnected\n\n@enduml\n"})})]}),"\n",(0,i.jsx)(n.h3,{id:"cem---rm-handshake",children:"CEM -> RM: Handshake"}),"\n",(0,i.jsx)(n.p,{children:"The CEM informs the RM that it is a CEM and which versions of s2-ws-json it supports."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "Handshake",\n  "message_id": "xxx",\n  "role": "CEM",\n  "supported_protocol_versions": [\n    "0.0.2-beta"\n  ]\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"rm---cem-handshake",children:"RM -> CEM: Handshake"}),"\n",(0,i.jsx)(n.p,{children:"The RM informs the CEM that it is a RM and which versions of s2-ws-json it supports."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "Handshake",\n  "message_id": "xxx",\n  "role": "RM",\n  "supported_protocol_versions": [\n    "0.0.2-beta"\n  ]\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"cem---rm-handshakeresponse",children:"CEM -> RM: HandshakeResponse"}),"\n",(0,i.jsx)(n.p,{children:"The CEM informs the RM which version of s2-ws-json it has selected for this session."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "HandshakeResponse",\n  "message_id": "xxx",\n  "selected_protocol_version": "0.0.2-beta"\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"rm---cem-resourcemanagerdetails",children:"RM -> CEM: ResourceManagerDetails"}),"\n",(0,i.jsx)(n.p,{children:"The RM informs the CEM about several static properties of the RM/heat pump:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The resource_id is a unique string in the context of the CEM."}),"\n",(0,i.jsx)(n.li,{children:"The name is a default name or user defined name (when possible) for UI purposes."}),"\n",(0,i.jsxs)(n.li,{children:["In this context the heat pump is an electricity consumer, and not a heat producer or storage. S2 is concerned with what is exchanged with ",(0,i.jsx)(n.em,{children:"the grid"}),", and in this case the heat pump doesn't participate in a heat grid that needs to be managed by the CEM."]}),"\n",(0,i.jsx)(n.li,{children:"The instruction processing delay indicates that the heat pump will on average respond in 10000 milliseconds to an instruction from the CEM."}),"\n",(0,i.jsx)(n.li,{children:"This heat pump does not define any costs related parameters, so no currency needs to be provided."}),"\n",(0,i.jsx)(n.li,{children:"This RM only implements the FRBC Control Type."}),"\n",(0,i.jsx)(n.li,{children:"This RM does not provide power forecasts."}),"\n",(0,i.jsx)(n.li,{children:"This heat pump is a single phase electric device (when there is only one phase the phase L1 must be used), so it will only provide measurements for the single phase."}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "ResourceManagerDetails",\n  "message_id": "xxx",\n  "resource_id": "acme_heat_pump",\n  "name": "my_heat_pump",\n  "roles": [\n    {\n      "role": "ENERGY_CONSUMER",\n      "commodity": "ELECTRICITY"\n    }\n  ],\n  "manufacturer": "ACME",\n  "model": "HeatPump2000",\n  "serial_number": "123",\n  "firmware_version": "v1.0",\n  "instruction_processing_delay": 10000,\n  "available_control_types": [\n    "FILL_RATE_BASED_CONTROL"\n  ],\n  "provides_forecast": false,\n  "provides_power_measurement_types": [\n    "ELECTRIC.POWER.L1"\n  ]\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"cem---rm-selectcontroltype",children:"CEM -> RM: SelectControlType"}),"\n",(0,i.jsx)(n.p,{children:"The CEM informs the RM that it wants to use FRBC ControlType (the RM defined in the ResourceManagerDetails that this is the only supported ControlType)."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "SelectControlType",\n  "message_id": "xxx",\n  "control_type": "FILL_RATE_BASED_CONTROL"\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"rm---cem-frbcsystemdescription",children:"RM -> CEM: FRBC.SystemDescription"}),"\n",(0,i.jsx)(n.p,{children:"The idea behind FRBC is that the RM describes an abstract device, which can be mapped to the physical device. The abstract device should be accurate enough for the CEM to create realistic plans and instructions. The FRBC.SystemDescription message defines this abstract device. This description usually pretty static, but can be updated by the RM if the parameters change (e.g. due to efficiency changes do to a changing outside temperature). The FRBC.SystemDecription is relatively large message, so we'll break it down in parts."}),"\n",(0,i.jsxs)(n.p,{children:["First of all we'll take a look at how the ",(0,i.jsx)(n.em,{children:"storage"})," is described. The storage is an energy storage for which we know how ",(0,i.jsx)(n.em,{children:"full"})," it is. The fullness of the buffer is described with a number called the ",(0,i.jsx)(n.em,{children:"fill level"}),". How exactly energy is stored and what the exact unit of the fill level is is not that relevant to the CEM; it only cares about energy exchanged with the grid. In our case the storage is our DHW buffer, and the we'll use the temperature in Celsius as the fill level. For comfort and efficiency reasons, we'll allow a water temperature anywhere between 45 and 55 degrees Celsius. If it is below 45, the DHW buffer MUST be heated for user comfort and the heat pump is no longer energy flexible. A temperature above 55 degrees Celsius is not desirable due to efficiency reasons. When the temperature is above 55 the heat pump cannot turn on and also isn't energy flexible. These two temperatures are defined as the fill level range."]}),"\n",(0,i.jsx)(n.p,{children:"For debugging purposes (so for humans, not for algorithms) a label is provided for the storage and the fill level. Also, it is indicated which information the storage provides. The fill level target is not relevant in our case, so it is not provided."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'  {\n    "diagnostic_label": "DHW Buffer",\n    "fill_level_label": "temperature in Celsius",\n    "provides_leakage_behaviour": true,\n    "provides_fill_level_target_profile": false,\n    "provides_usage_forecast": true,\n    "fill_level_range": {\n      "start_of_range": 45,\n      "end_of_range": 55\n    }\n  }\n'})}),"\n",(0,i.jsx)(n.p,{children:"Secondly we'll define the heat pump itself. In FRBC this is referred to as an actuator. An actuator is something that the CEM can control, affects the fill level of the storage and exchanges power with the power grid (in our case, consuming electricity)."}),"\n",(0,i.jsx)(n.p,{children:"TODO"}),"\n",(0,i.jsx)(n.p,{children:"And finally, putting everything together in one message:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "FRBC.SystemDescription",\n  "message_id": "xxx",\n  "valid_from": "2019-08-24T14:15:22Z",\n  "actuators": [\n    {\n      "id": "actuator1",\n      "diagnostic_label": "heat pump",\n      "supported_commodities": [\n        "ELECTRICITY"\n      ],\n      "operation_modes": [\n        {\n          "id": "om1",\n          "diagnostic_label": "Off",\n          "elements": [\n            {\n              "fill_level_range": {\n                "start_of_range": 0,\n                "end_of_range": 0\n              },\n              "fill_rate": {\n                "start_of_range": 0,\n                "end_of_range": 0\n              },\n              "power_ranges": [\n                {\n                  "start_of_range": 0,\n                  "end_of_range": 0,\n                  "commodity_quantity": "ELECTRIC.POWER.L1"\n                }\n              ],\n              "running_costs": {\n                "start_of_range": 0,\n                "end_of_range": 0\n              }\n            }\n          ],\n          "abnormal_condition_only": true\n        }\n      ],\n      "transitions": [\n        {\n          "id": "string",\n          "from": "string",\n          "to": "string",\n          "start_timers": [\n            "string"\n          ],\n          "blocking_timers": [\n            "string"\n          ],\n          "transition_costs": 0,\n          "transition_duration": 0,\n          "abnormal_condition_only": true\n        }\n      ],\n      "timers": [\n        {\n          "id": "string",\n          "diagnostic_label": "string",\n          "duration": 0\n        }\n      ]\n    }\n  ],\n  "storage": {\n    "diagnostic_label": "DHW Buffer",\n    "fill_level_label": "temperature",\n    "provides_leakage_behaviour": true,\n    "provides_fill_level_target_profile": false,\n    "provides_usage_forecast": true,\n    "fill_level_range": {\n      "start_of_range": 45,\n      "end_of_range": 55\n    }\n  }\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"rm---cem-frbcleakagebehaviour",children:"RM -> CEM: FRBC.LeakageBehaviour"}),"\n",(0,i.jsx)(n.p,{children:"TODO"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "FRBC.LeakageBehaviour",\n  "message_id": "string",\n  "valid_from": "2019-08-24T14:15:22Z",\n  "elements": [\n    {\n      "fill_level_range": {\n        "start_of_range": 0,\n        "end_of_range": 0\n      },\n      "leakage_rate": 0\n    }\n  ]\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"rm---cem-powermeasurement",children:"RM -> CEM: PowerMeasurement"}),"\n",(0,i.jsx)(n.p,{children:"TODO"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "PowerMeasurement",\n  "message_id": "string",\n  "measurement_timestamp": "2019-08-24T14:15:22Z",\n  "values": [\n    {\n      "commodity_quantity": "ELECTRIC.POWER.L1",\n      "value": 0\n    }\n  ]\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"rm---cem-frbcactuatorstatus",children:"RM -> CEM: FRBC.ActuatorStatus"}),"\n",(0,i.jsx)(n.p,{children:"TODO"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "FRBC.ActuatorStatus",\n  "message_id": "string",\n  "actuator_id": "string",\n  "active_operation_mode_id": "string",\n  "operation_mode_factor": 0,\n  "previous_operation_mode_id": "string",\n  "transition_timestamp": "2019-08-24T14:15:22Z"\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"rm---cem-frbcstoragestatus",children:"RM -> CEM: FRBC.StorageStatus"}),"\n",(0,i.jsx)(n.p,{children:"TODO"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "FRBC.StorageStatus",\n  "message_id": "string",\n  "present_fill_level": 0\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"rm---cem-frbctimerstatus",children:"RM -> CEM: FRBC.TimerStatus"}),"\n",(0,i.jsx)(n.p,{children:"TODO"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "FRBC.TimerStatus",\n  "message_id": "string",\n  "timer_id": "string",\n  "actuator_id": "string",\n  "finished_at": "2019-08-24T14:15:22Z"\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"rm---cem-frbcusageforecast",children:"RM -> CEM: FRBC.UsageForecast"}),"\n",(0,i.jsx)(n.p,{children:"TODO"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "FRBC.UsageForecast",\n  "message_id": "string",\n  "start_time": "2019-08-24T14:15:22Z",\n  "elements": [\n    {\n      "duration": 0,\n      "usage_rate_upper_limit": 0,\n      "usage_rate_upper_95PPR": 0,\n      "usage_rate_upper_68PPR": 0,\n      "usage_rate_expected": 0,\n      "usage_rate_lower_68PPR": 0,\n      "usage_rate_lower_95PPR": 0,\n      "usage_rate_lower_limit": 0\n    }\n  ]\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"cem---rm-frbcinstruction",children:"CEM -> RM: FRBC.Instruction"}),"\n",(0,i.jsx)(n.p,{children:"TODO"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "FRBC.Instruction",\n  "message_id": "string",\n  "id": "string",\n  "actuator_id": "string",\n  "operation_mode": "string",\n  "operation_mode_factor": 0,\n  "execution_time": "2019-08-24T14:15:22Z",\n  "abnormal_condition": true\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"rm---cem-instructionstatusupdate",children:"RM -> CEM: InstructionStatusUpdate"}),"\n",(0,i.jsx)(n.p,{children:"TODO"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "InstructionStatusUpdate",\n  "message_id": "string",\n  "instruction_id": "string",\n  "status_type": "NEW",\n  "timestamp": "2019-08-24T14:15:22Z"\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"rm---cem-sessionrequest",children:"RM -> CEM: SessionRequest"}),"\n",(0,i.jsx)(n.p,{children:"TODO"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "SessionRequest",\n  "message_id": "string",\n  "request": "TERMINATE",\n  "diagnostic_label": "string"\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"example-hybrid-heat-pump-without-buffering-using-ddbc",children:"Example: Hybrid heat pump without buffering using DDBC"}),"\n",(0,i.jsx)(n.p,{children:"TODO"})]})}function c(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>o});var s=t(6540);const i={},r=s.createContext(i);function a(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);