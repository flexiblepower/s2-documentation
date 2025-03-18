"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1021],{235:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"Guides/S2-example-for-PV","title":"S2 example for PV installations","description":"This page serves as a guide for implementing an S2 RM for a PV installation. It provides example S2 messages that help developers to understand how to interact with PV installations and what kind of flexibility they can offer.","source":"@site/docs/Guides/S2-example-for-PV.md","sourceDirName":"Guides","slug":"/Guides/S2-example-for-PV","permalink":"/s2-documentation/docs/Guides/S2-example-for-PV","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Operation Mode based Control Types","permalink":"/s2-documentation/docs/Guides/Operation_modes"},"next":{"title":"State of S2 session","permalink":"/s2-documentation/docs/Guides/State_of_communication"}}');var s=t(4848),o=t(8453);const a={},r="S2 example for PV installations",l={},c=[{value:"Flexibility of a PV installation",id:"flexibility-of-a-pv-installation",level:2},{value:"Choosing the S2 control type",id:"choosing-the-s2-control-type",level:2},{value:"Example of controlling an PV inverter using Power Envelope Based control (PEBC)",id:"example-of-controlling-an-pv-inverter-using-power-envelope-based-control-pebc",level:2},{value:"Communication between the PV installation and the Resource Manager (RM)",id:"communication-between-the-pv-installation-and-the-resource-manager-rm",level:3},{value:"Communication between de RM of the PV installation and a CEM",id:"communication-between-de-rm-of-the-pv-installation-and-a-cem",level:3},{value:"RM -&gt; CEM: Handshake",id:"rm---cem-handshake",level:3},{value:"CEM -&gt; RM: HandshakeResponse",id:"cem---rm-handshakeresponse",level:3},{value:"RM -&gt; CEM: ResourceManagerDetails",id:"rm---cem-resourcemanagerdetails",level:3},{value:"CEM -&gt; RM: SelectControlType",id:"cem---rm-selectcontroltype",level:3},{value:"Configuration of the power and/or energy constraints of the PV installation",id:"configuration-of-the-power-andor-energy-constraints-of-the-pv-installation",level:3},{value:"RM -&gt; CEM: PEBC.PowerConstraints",id:"rm---cem-pebcpowerconstraints",level:4},{value:"RM -&gt; CEM: PEBC.EnergyConstraint",id:"rm---cem-pebcenergyconstraint",level:4},{value:"Normal operation: Exchange of measurements, forecasts and curtailment instructions",id:"normal-operation-exchange-of-measurements-forecasts-and-curtailment-instructions",level:3},{value:"RM -&gt; CEM: PowerMeasurement",id:"rm---cem-powermeasurement",level:4},{value:"RM -&gt; CEM: PowerForecast",id:"rm---cem-powerforecast",level:4},{value:"CEM -&gt; RM: PEBC.Instruction",id:"cem---rm-pebcinstruction",level:4},{value:"RM -&gt; CEM: InstructionStatusUpdate",id:"rm---cem-instructionstatusupdate",level:4},{value:"RM -&gt; CEM: SessionRequest",id:"rm---cem-sessionrequest",level:3}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,o.R)(),...e.components},{Details:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"s2-example-for-pv-installations",children:"S2 example for PV installations"})}),"\n",(0,s.jsx)(n.p,{children:"This page serves as a guide for implementing an S2 RM for a PV installation. It provides example S2 messages that help developers to understand how to interact with PV installations and what kind of flexibility they can offer."}),"\n",(0,s.jsx)(n.h2,{id:"flexibility-of-a-pv-installation",children:"Flexibility of a PV installation"}),"\n",(0,s.jsx)(n.p,{children:"A PV installation produces electricity by converting solar energy into electricity. This electricity can be used for several purposes, such as self-consumption or earning money by delivering electricity to the grid."}),"\n",(0,s.jsx)(n.p,{children:"Usually a PV installation is not flexible at all, as it only produces electricity when there is sun and depending on weather circumstances (e.g. such as cloud coverage) it will produce more or less, i.e. its production is intermittent. But many PV inverters also allow to control the maximum output power of the PV installation, also known as curtailment. This curtailment is for example needed when too much installations are connected to the same local grid and produce at high power, pushing the voltage of the network above its acceptable limits, or when prices for delivering electricity back to the grid become to low (or even negative) to be profitable."}),"\n",(0,s.jsx)(n.h2,{id:"choosing-the-s2-control-type",children:"Choosing the S2 control type"}),"\n",(0,s.jsx)(n.p,{children:"S2 supports five different control types for flexibility (and one for no control possibility), each supporting a different way of modelling flexibility of a device. For PV installations the choice is somehow simple, as the capabilities of these installations are limited:"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Control\xa0capability\xa0of\xa0PV\xa0installation"}),(0,s.jsx)(n.th,{style:{textAlign:"center"},children:"Control type"}),(0,s.jsx)(n.th,{children:"Remark"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"No control possible"}),(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"NOT_CONTROLABLE"}),(0,s.jsxs)(n.td,{children:["As there is no way to control this PV installation, the ",(0,s.jsx)(n.code,{children:"NOT_CONTROLABLE"})," ControlType should be selected. Although nothing can be controlled, devices can still send ",(0,s.jsx)(n.code,{children:"PowerMeasurement"}),"s and ",(0,s.jsx)(n.code,{children:"PowerForecast"}),"s"]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"Set maximum output power"}),(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"POWER_ENVELOPE_BASED_CONTROL (PEBC)"}),(0,s.jsx)(n.td,{children:"Based on the constraints of the PV installation (e.g. the minimum and maximum power output of the inverter), the CEM can provide the Resource Manager of the PV installation a PowerEnvelope that describes the minimum (usually 0) and maximum (e.g. -2kW, negative for production) that the inverter of the PV installation should produce"})]})]})]}),"\n",(0,s.jsx)(n.p,{children:"The table shows two ways to interact with a PV installation: just using the power measurements such that the CEM can optimize based on the production of the PV installation and using Power Envelope Based Control, which allows the CEM to instruct the PV installation to curtail."}),"\n",(0,s.jsx)(n.p,{children:"We could also model the PV installation as a state machine using Operation Mode Based Control (OMBC). Different states (operation modes in S2 language) could be modeled that describe at which maximum power output the PV installation should adhere to, but this approach is more work to configure than PEBC, and does not increase the amount of flexiblity that a CEM can utilize."}),"\n",(0,s.jsxs)(n.p,{children:["The Power Envelope Based Control control type is used for devices that can be influenced to use or produce a minimum and/or maximum amount of power over time. This means that the CEM cannot control the amount of power produced or consumed by the device directly, but it can dictate power limits, which can change over time. The Resource Manager informs the CEM with which power limits it can work using the ",(0,s.jsx)(n.code,{children:"PEBC.PowerConstraints"})," message. Optionally, the Resource Manager can also instruct the CEM how much energy it needs to consume or produce in a certain timespan (by sending a ",(0,s.jsx)(n.code,{children:"PEBC.EnergyConstraints"})," message), which the CEM shall take into consideration while setting power limits."]}),"\n",(0,s.jsx)(n.h2,{id:"example-of-controlling-an-pv-inverter-using-power-envelope-based-control-pebc",children:"Example of controlling an PV inverter using Power Envelope Based control (PEBC)"}),"\n",(0,s.jsx)(n.p,{children:"This example describes how a PV interter can expose its curtailment capabilities to the CEM and let the CEM control this inverter by sending it messages that will ask it to curtail itself."}),"\n",(0,s.jsxs)(n.p,{children:["The following sequence diagram is an example of what a message exchange between a CEM and RM could look like, but messages could also be sent in a different order (see also ",(0,s.jsx)(n.a,{href:"https://github.com/flexiblepower/s2-ws-json/wiki/State_of_communication",children:"State of communication"})," and the ",(0,s.jsx)(n.a,{href:"https://github.com/flexiblepower/s2-ws-json/wiki/PEBC_messages",children:"PEBC Message reference"}),"). ReceptionStatus messages are omitted for readability."]}),"\n",(0,s.jsx)(n.p,{children:"First an overview of the messages is presented graphically, next sections will describe the example messages in more detail."}),"\n",(0,s.jsx)(n.h3,{id:"communication-between-the-pv-installation-and-the-resource-manager-rm",children:"Communication between the PV installation and the Resource Manager (RM)"}),"\n",(0,s.jsx)(n.p,{children:"For the RM to work correctly, some information is required to fill in the messages between the RM and the CEM."}),"\n",(0,s.jsx)(n.p,{children:"The diagram below depicts this process and the data that is needed."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://github.com/user-attachments/assets/b4b27f0b-8419-4e08-9c76-2ab14410e13f",alt:"POxFIWD138VlynIX5nLg7w285CH33mLPmPENT3QjWPbacScqrQStMojqzPO_l-zBLjMmMCif65iYM0iRO-8lWgWvD-68nYgm9JiI2TW7GRS1bFvSlhm1YpjIEiV2pU0wZZoW63mzRy9rtqtRcSDhEL0nAZF0wh8GH8r0VUZfkK-MqvT4A4x-kVnofGh1Pm_tZoFyIq2hB7lWImI6e"})}),"\n",(0,s.jsxs)(t,{children:[(0,s.jsx)(n.p,{children:"Image generated using the following PlantUML code:"}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'@startuml\ntitle Initialize communication between the RM and the PV installation\n\'participant CEM\nparticipant RM\nparticipant "PV Inverter" as PV\n\nnote over RM, PV: Initialize connection between RM and PV Inverter\n\nRM <-> PV: connect using inverter protocol\nPV -> RM: Send constraints, \\ne.g. maximum production power\nloop every x seconds\nPV -> RM: Send PV measurements\nPV -> RM: Send forecasts (if available)\nend loop\n@enduml\n'})})]}),"\n",(0,s.jsx)(n.p,{children:"As shown, the RM needs to know what the maximum output power of the inverter is and how it can get measurements that can be send to the CEM."}),"\n",(0,s.jsx)(n.h3,{id:"communication-between-de-rm-of-the-pv-installation-and-a-cem",children:"Communication between de RM of the PV installation and a CEM"}),"\n",(0,s.jsx)(n.p,{children:"In the picture below the S2 message exchange is depicted as a sequence diagram. It can be split up in five parts:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"Setup of the connection between the CEM and the RM"}),"\n",(0,s.jsx)(n.li,{children:"Exchange the Resource Manager configuration and selection of Control type"}),"\n",(0,s.jsx)(n.li,{children:"Configuration of the power and/or energy constraints of the PV installation"}),"\n",(0,s.jsx)(n.li,{children:"Normal operation: Exchange of measurements and curtailment instructions"}),"\n",(0,s.jsx)(n.li,{children:"Disconnect the communication between the CEM and the RM."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://github.com/user-attachments/assets/ea8c4221-b628-4bfc-a695-4f2d5a5d442d",alt:"XLDDRnCn4BtlhnYf5v00SKFA0LM4e7A8Y9821yfXiZkxiUArZJrkMfGVpqmS8gS4zHJ5y_m-dcUl4sFaFDg63Lk2sGEEGNvRFuxPcHRPU0ThuXsHW-bi3kWwMCx1zu2m-0QVdJ1OUy0rGRXCQm8wLcpzN-uqZVDCuEyfwlIL74tWEwrNljqIYwHpr39rJQCwhzyVvZUYbpQufMQfP"})}),"\n",(0,s.jsxs)(t,{children:[(0,s.jsx)(n.p,{children:"PlantUML code for this diagram:"}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"@startuml\ntitle Example communication between CEM and RM of a PV Installation\nparticipant CEM\nparticipant RM\n\nnote over CEM, RM: WebSocket connected\n\nCEM -> RM: Handshake\nRM -> CEM: Handshake\nCEM -> RM: HandshakeResponse\n\nnote over CEM, RM #lightblue: Initialized\n\n|||\n\ngroup Send RM configuration for this inverter and \\nthe control type that this RM supports\nRM -> CEM: ResourceManagerDetails\nCEM -> RM: SelectControlType\nnote right: The CEM will select the \\nPEBC control type for this RM\nend group\n\n\nnote over CEM, RM #lightgreen: ControlType PEBC activated \n\n|||\n\ngroup #fff0b7 Send power or energy constraints of this PV Installation \nRM -> CEM: PEBC.EnergyConstraint\nRM -> CEM: PEBC.PowerConstraint\nnote right: The RM informs the CEM of the\\n maximum power output of the PV inverter\nend\n\n|||\n\nloop in no particular order\n\nRM -> CEM: PowerMeasurement\nRM --\x3e CEM: PowerForecast [Optional]\n\nCEM -> RM: PEBC.Instruction\nnote right: Here the CEM will ask the RM to curtail its production\nRM -> CEM: InstructionStatusUpdate\nnote right: The RM will confirm (or not) this curtailment\nend loop\n\n|||\n\nRM -> CEM: SessionRequest\n\nnote over CEM, RM: WebSocket disconnected\n\n@enduml\n"})})]}),"\n",(0,s.jsx)(n.p,{children:"The following messages are exchanged:"}),"\n",(0,s.jsx)(n.h3,{id:"rm---cem-handshake",children:"RM -> CEM: Handshake"}),"\n",(0,s.jsx)(n.p,{children:"The RM informs the CEM that it is a RM and which versions of s2-ws-json it supports."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "Handshake",\n  "message_id": "xxx",\n  "role": "RM",\n  "supported_protocol_versions": [\n    "0.0.2-beta"\n  ]\n}\n'})}),"\n",(0,s.jsx)(n.h3,{id:"cem---rm-handshakeresponse",children:"CEM -> RM: HandshakeResponse"}),"\n",(0,s.jsx)(n.p,{children:"The CEM informs the RM which version of s2-ws-json it has selected for this session."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "HandshakeResponse",\n  "message_id": "xxx",\n  "selected_protocol_version": "0.0.2-beta"\n}\n'})}),"\n",(0,s.jsx)(n.h3,{id:"rm---cem-resourcemanagerdetails",children:"RM -> CEM: ResourceManagerDetails"}),"\n",(0,s.jsx)(n.p,{children:"The RM informs the CEM about several static properties of the RM/PV installation:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"The resource_id is a unique string in the context of the CEM."}),"\n",(0,s.jsx)(n.li,{children:"The name is a default name or user defined name (when possible) for UI purposes."}),"\n",(0,s.jsxs)(n.li,{children:["In this context the PV installation is an electricity producer and not a consumer or storage. S2 is concerned with what is exchanged with ",(0,s.jsx)(n.em,{children:"the grid"}),", and in this case the PV installation participates in an electricity grid that needs to be managed by the CEM."]}),"\n",(0,s.jsx)(n.li,{children:"The instruction processing delay indicates that the PV installation will on average respond in 5000 milliseconds to an instruction from the CEM."}),"\n",(0,s.jsx)(n.li,{children:"This PV installation does not define any costs related parameters, so no currency needs to be provided."}),"\n",(0,s.jsx)(n.li,{children:"This RM only implements the Power Envelope Based Control (PEBC) Control Type."}),"\n",(0,s.jsx)(n.li,{children:"This RM also provides power forecasts (e.g. by using an external forecast service connected to this RM)."}),"\n",(0,s.jsxs)(n.li,{children:["This PV installation is a single phase electric device (when there is only one phase the phase L1 must be used), so it will only provide measurements for the single phase. For three phase inverters, all phases should be listed here (and for each phase measurements should be provided), or in the case the three-phase power is symmetric and therefore equally shared over all phases, ",(0,s.jsx)(n.code,{children:"ELECTRIC.POWER.3_PHASE_SYMMETRIC"})," could be used here."]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "ResourceManagerDetails",\n  "message_id": "xxx",\n  "resource_id": "acme_pv_installation",\n  "name": "Solar panels on roof",\n  "roles": [\n    {\n      "role": "ENERGY_PRODUCER",\n      "commodity": "ELECTRICITY"\n    }\n  ],\n  "manufacturer": "ACME",\n  "model": "InverterType2024",\n  "serial_number": "123",\n  "firmware_version": "v1.0",\n  "instruction_processing_delay": 5000,\n  "available_control_types": [\n    "POWER_ENVELOPE_BASED_CONTROL"\n  ],\n  "provides_forecast": true,\n  "provides_power_measurement_types": [\n    "ELECTRIC.POWER.L1"\n  ]\n}\n'})}),"\n",(0,s.jsx)(n.h3,{id:"cem---rm-selectcontroltype",children:"CEM -> RM: SelectControlType"}),"\n",(0,s.jsx)(n.p,{children:"The CEM informs the RM that it wants to use PEBC ControlType (the RM defined in the ResourceManagerDetails that this is the only supported ControlType)."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "SelectControlType",\n  "message_id": "xxx",\n  "control_type": "POWER_ENVELOPE_BASED_CONTROL"\n}\n'})}),"\n",(0,s.jsx)(n.h3,{id:"configuration-of-the-power-andor-energy-constraints-of-the-pv-installation",children:"Configuration of the power and/or energy constraints of the PV installation"}),"\n",(0,s.jsx)(n.h4,{id:"rm---cem-pebcpowerconstraints",children:"RM -> CEM: PEBC.PowerConstraints"}),"\n",(0,s.jsxs)(n.p,{children:["Using the ",(0,s.jsx)(n.code,{children:"PEBC.PowerConstraints"})," message, a RM can specify the constraints in which the CEM can operate. For curtailing a PV installation, it is important for the CEM to know in what range it can control the power output. The message contains a few relevant properties (see below for the example):"]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"valid_from"})," and ",(0,s.jsx)(n.code,{children:"valid_until"})," specify for which period this constraint is valid. In the example it is defined as 24 hours. If ",(0,s.jsx)(n.code,{children:"valid_until"})," is not present, there is no determined end time of this ",(0,s.jsx)(n.code,{children:"PEBC.PowerConstraints"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"consequence_type"})," defines what happens if the constraint is applied. For PV installations it means that if the installation is curtailed, the amount of electricity that is curtailed is vanished (denoted by the the enum literal ",(0,s.jsx)(n.code,{children:"VANISHED"}),"), e.g. it will be lost and never reappear. For other devices (e.g. for an EV or other devices that can shift their consumption in time) the consequence could be ",(0,s.jsx)(n.code,{children:"DEFER"})," to denote that the load is postponed (e.g. the lost energy is caught up later in time e.g. by longer charging or compensated by faster charging later on)."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["A list of ",(0,s.jsx)(n.code,{children:"allowed_limit_ranges"})," of type ",(0,s.jsx)(n.code,{children:"PEBC.AllowedLimitRange"}),". These are the actual constraints that can be defined.\nThere shall be at least one PEBC.AllowedLimitRange for the UPPER_LIMIT and at least one AllowedLimitRange for the LOWER_LIMIT. For each Allowed\nlimit range one needs to specify:"]}),"\n",(0,s.jsxs)(n.p,{children:["a. the ",(0,s.jsx)(n.code,{children:"commodity_quantity"}),' (for our example this is "ELECTRIC.POWER.L1" (Electricity phase 1))']}),"\n",(0,s.jsxs)(n.p,{children:["b. ",(0,s.jsx)(n.code,{children:"limit_type"})," defining if it is an ",(0,s.jsx)(n.code,{children:"UPPER_LIMIT"})," or ",(0,s.jsx)(n.code,{children:"LOWER_LIMIT"})]}),"\n",(0,s.jsxs)(n.p,{children:["c. ",(0,s.jsx)(n.code,{children:"range_boundary"})," specifying the specific constraint."]}),"\n",(0,s.jsxs)(n.p,{children:["d. ",(0,s.jsx)(n.code,{children:"abnormal_condition_only"})," indicates if this is an instruction during an abnormal condition, see also \xa77.3 of the S2 standard for more\ninformation. In general setting this to ",(0,s.jsx)(n.code,{children:"true"})," will tell the CEM that this constraint is linked to a situation where user comfort may\nbe sacrificed, and might be subject to (local) laws and regulations. Usually abnormal conditions should be avoided and is a last resort to\ne.g. avoid a blackout."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"In the figure this is visualized for the PV installation for a 4 kWp pv installation. The Json example below shows how to do this in code."}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.em,{children:"NOTE:"})})," In S2, ",(0,s.jsx)(n.strong,{children:"production"})," is denoted with a negative number, as opposed to ",(0,s.jsx)(n.strong,{children:"consumption"})," which is positive. So for a 4 kWp PV installation, one should use -4000 W as constraint value."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://github.com/user-attachments/assets/b5f88769-5281-4d94-a787-710c04d5ffc8",alt:"image"})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"UPPER_LIMIT"})," is defined from 0 to 0, indicating that the maximum consumption of this device is 0, and the ",(0,s.jsx)(n.code,{children:"LOWER_LIMIT"})," is defined from 0 to -4000W indicating that the CEM can freely curtail between 0 and 4 kW. If for example the inverter could not curtail between 0 and 1 kW, the range would be from -1000 to -4000W."]}),"\n",(0,s.jsx)(n.p,{children:"This can be expressed in Json as follows:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "PEBC.PowerConstraints",\n  "message_id": "xxx",\n  "id": "powerConstraint1",\n  "valid_from": "2024-08-24T14:15:22Z",\n  "valid_until": "2024-08-25T14:15:22Z",\n  "consequence_type": "VANISH",\n  "allowed_limit_ranges": [\n    {\n      "commodity_quantity": "ELECTRIC.POWER.L1",\n      "limit_type": "LOWER_LIMIT",\n      "range_boundary": {\n        "start_of_range": 0,\n        "end_of_range": -4000\n      },\n      "abnormal_condition_only": false\n    },\n    {\n      "commodity_quantity": "ELECTRIC.POWER.L1",\n      "limit_type": "UPPER_LIMIT",\n      "range_boundary": {\n        "start_of_range": 0,\n        "end_of_range": 0\n      },\n      "abnormal_condition_only": false\n    }\n  ]\n}\n'})}),"\n",(0,s.jsx)(n.h4,{id:"rm---cem-pebcenergyconstraint",children:"RM -> CEM: PEBC.EnergyConstraint"}),"\n",(0,s.jsx)(n.p,{children:"While PEBC.PowerConstraints are always needed to be defined in Power Envelope Based Control, PEBC.EnergyConstraints are optional. With EnergyConstraints a RM can specify average power levels for a specific period of time. This is mainly useful for consumption such as EV charging, because it allows the RM to define how much energy should be transferred in a certain period, to make sure the EV is charged with a predefined SoC at a certain time, while the overall flexibility the EV provides to the CEM stays the same.\nSo for this PV Installation example EnergyConstraints are not applicable."}),"\n",(0,s.jsxs)(t,{children:[(0,s.jsx)(n.p,{children:"For the interested reader the Json message is shown below. Please refer to the EV example with PEBC for more details."}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "PEBC.EnergyConstraint",\n  "message_id": "xxx",\n  "id": "energyconstraint1",\n  "valid_from": "2024-12-24T14:15:22Z",\n  "valid_until": "2024-12-25T14:15:22Z",\n  "upper_average_power": 3000,\n  "lower_average_power": 1000,\n  "commodity_quantity": "ELECTRIC.POWER.L1"\n}\n'})})]}),"\n",(0,s.jsx)(n.h3,{id:"normal-operation-exchange-of-measurements-forecasts-and-curtailment-instructions",children:"Normal operation: Exchange of measurements, forecasts and curtailment instructions"}),"\n",(0,s.jsx)(n.h4,{id:"rm---cem-powermeasurement",children:"RM -> CEM: PowerMeasurement"}),"\n",(0,s.jsxs)(n.p,{children:["The RM sends power measurements to the CEM using the ",(0,s.jsx)(n.code,{children:"PowerMeasurement"})," message.\nIt can send multiple values with the same timestamp (e.g. for three phase measurements). For our example only one phase is used."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "PowerMeasurement",\n  "message_id": "xxx",\n  "measurement_timestamp": "2024-08-24T14:15:22Z",\n  "values": [\n    {\n      "commodity_quantity": "ELECTRIC.POWER.L1",\n      "value": 3450.6\n    }\n  ]\n}\n'})}),"\n",(0,s.jsx)(n.h4,{id:"rm---cem-powerforecast",children:"RM -> CEM: PowerForecast"}),"\n",(0,s.jsx)(n.p,{children:"It can be quite useful for a CEM to know in advance what the future energy usage of a device will be. This is\ntrue for both controllable and non-controllable devices such as our PV Installation. Such a forecast can be used by an energy\nmanagement algorithm to establish the base load it will have to work with. The data for this power forecast could for example be retrieved from a weather service that can calculate this forecast based the location and orientation of the PV installation.\nA PowerForcast can also incorporate uncertainty of the forecast in the values."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "PowerForecast",\n  "message_id": "xxx",\n  "start_time": "2024-08-24T14:00:00Z",\n  "elements": [\n    {\n      "duration": 3600000,\n      "power_values": [\n        {\n          "value_upper_limit": -3500.0,\n          "value_upper_95PPR": -3460.0,\n          "value_upper_68PPR": -3455.0,\n          "value_expected": -3450.1,\n          "value_lower_68PPR": -3445.0,\n          "value_lower_95PPR": -3440.0,\n          "value_lower_limit": -3400.0,\n          "commodity_quantity": "ELECTRIC.POWER.L1"\n        }\n      ]\n    }\n  ]\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["This Json message shows a forecast for 60 minutes (3_600_000 milliseconds), starting from 2024-08-24 14:00:00 (UTC). ",(0,s.jsx)(n.code,{children:"value_expected"})," is required to be specified, in this case -3450.1 kW (for production). The other values show the statistical distribution of the expected production, and are optional."]}),"\n",(0,s.jsx)(n.h4,{id:"cem---rm-pebcinstruction",children:"CEM -> RM: PEBC.Instruction"}),"\n",(0,s.jsx)(n.p,{children:"This message is the actual curtailment message from the CEM to the RM. The message contains a few relevant properties:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"execution_time"})," defines at what starting time this instruction is valid."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"abnormal_condition"})," indicates if this is an abnormal condition that is requested and might impact the user's comfort. See above and \xa77.3 of the standard for more information."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"power_constraints_id"})," refers to a communicated power constraint from the RM that is selected as curtailment option."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"power_envelopes"})," is a list of constraints or power envelopes (as there are multiple elements inside one power envelope) to be applied to the PV installation starting from ",(0,s.jsx)(n.code,{children:"execution_time"}),". Every PowerEnvelope contains an ",(0,s.jsx)(n.code,{children:"id"}),", ",(0,s.jsx)(n.code,{children:"commodity_quantity"})," (in our case Phase 1) and a list of ",(0,s.jsx)(n.code,{children:"PowerEnvelopeElements"})," in field ",(0,s.jsx)(n.code,{children:"power_envelope_elements"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Each power envelope element specifies a ",(0,s.jsx)(n.code,{children:"duration"})," in milliseconds and a selected ",(0,s.jsx)(n.code,{children:"lower_limit"})," and ",(0,s.jsx)(n.code,{children:"upper_limit"})," from the earlier send PEBC.PowerConstraint message referenced by ",(0,s.jsx)(n.code,{children:"power_constraints_id"}),"."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["For our example we only specify one PEBC.PowerEnvelopeElement where -2000 W is selected as curtailment for the ",(0,s.jsx)(n.code,{children:"lower_limit"})," and 0 W for the ",(0,s.jsx)(n.code,{children:"upper_limit"})," for a duration of 1 hour."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "PEBC.Instruction",\n  "message_id": "xxx",\n  "id": "envelope1",\n  "execution_time": "2024-08-24T15:00:00Z",\n  "abnormal_condition": false,\n  "power_constraints_id": "powerConstraint1",\n  "power_envelopes": [\n    {\n      "id": "pe_xxx",\n      "commodity_quantity": "ELECTRIC.POWER.L1",\n      "power_envelope_elements": [\n        {\n          "duration": 3600000,\n          "upper_limit": 0,\n          "lower_limit": -2000.0\n        }\n      ]\n    }\n  ]\n}\n'})}),"\n",(0,s.jsx)(n.h4,{id:"rm---cem-instructionstatusupdate",children:"RM -> CEM: InstructionStatusUpdate"}),"\n",(0,s.jsx)(n.p,{children:"The RM confirms the above message with an InstructionStatusUpdate message:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "InstructionStatusUpdate",\n  "message_id": "xxx",\n  "instruction_id": "envelope1",\n  "status_type": "SUCCEEDED",\n  "timestamp": "2024-08-24T14:45:00Z"\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["This message confirms the instruction with id ",(0,s.jsx)(n.code,{children:"envelope1"})," (see above) with a certain status. In this case the instruction is ",(0,s.jsx)(n.code,{children:"SUCCEEDED"}),", indicating that the instruction is accepted and successfully processed."]}),"\n",(0,s.jsxs)(n.p,{children:["The following options for ",(0,s.jsx)(n.code,{children:"status_type"})," are possible:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"NEW: Instruction was newly created"}),"\n",(0,s.jsx)(n.li,{children:"ACCEPTED: Instruction has been accepted"}),"\n",(0,s.jsx)(n.li,{children:"REJECTED: Instruction was rejected"}),"\n",(0,s.jsx)(n.li,{children:"REVOKED: Instruction was revoked"}),"\n",(0,s.jsx)(n.li,{children:"STARTED: Instruction was executed"}),"\n",(0,s.jsx)(n.li,{children:"SUCCEEDED: Instruction finished successfully"}),"\n",(0,s.jsx)(n.li,{children:"ABORTED: Instruction was aborted."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"These messages give the CEM information on the instructions it sends."}),"\n",(0,s.jsx)(n.h3,{id:"rm---cem-sessionrequest",children:"RM -> CEM: SessionRequest"}),"\n",(0,s.jsx)(n.p,{children:"With the SessionRequest message the RM can indicate a graceful disconnect or a request to reconnect. After a reconnect, the session should be setup from scratch."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "message_type": "SessionRequest",\n  "message_id": "xxx",\n  "request": "TERMINATE",\n  "diagnostic_label": "PV Inverter resource manager shutdown"\n}\n'})})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>r});var i=t(6540);const s={},o=i.createContext(s);function a(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);