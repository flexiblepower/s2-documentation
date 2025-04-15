---
title: "S2 Glossary"
---

The following is a list of commonly used terms in S2. This can be used as a reference.

# Abnormal Condition
In S2, an "Abnormal Condition" is a state of emergency where user comfort may be sacrificed in order to prevent even greater discomfort (e.g. a power outage). What exactly constitutes an emergency depends on local regulation, and might be subject to an audit or financial compensation. The CEM must implement the abnormal condition functionality according to this local regulation. A RM can offer functionality (e.g. an Operation Mode or Transition) which is only allowed to be used by the CEM during Abnormal Conditions, and the CEM must explicitly indicate with Instructions to the RM when there is an Abnormal Condition. Safe operation of the hardware must always be guaranteed and disproportional wear to the hardware must always be prevented; also during an Abnormal Condition.

# CEM (Customer Energy Manager)
The CEM is a logical component that uses S2 to communicate with one or multiple RMs. The CEM is usually part of an EMS. The CEM is the entity optimizing the energy flexibility of one or multiple energy flexible devices towards a certain goal. For more information see [CEM in the Architecture page](https://github.com/flexiblepower/s2-ws-json/wiki/Architecture#customer-energy-manager-cem).

# Commodity
In S2, a Commodity is a form of energy that can be consumed or produced by a device, for which the energy flexibility can be optimized by the CEM. Typically this electricity, but S2 also supports natural gas, hydrogen, heat and heating oil. Only energy exchanged with the grid is considered, not any energy exchanges within the device itself.

# Control Type
A Control Type is a way a RM can express its energy flexibility in S2. For more details see [Control Type](https://github.com/flexiblepower/s2-ws-json/wiki/Control_Types#control-types).

# CommodityQuantity
The CommodityQuantity is a data structure that combines the Commodity with a quantity and unit that is used to express power for that quantity. Additionally, for electricity it is also used to indicate phase information. A number combined with a CommodityQuantity tells you how much power a device consumes or produces.

For details see the reference of the [CommodityQuantity enum type](https://github.com/flexiblepower/s2-ws-json/wiki/Common_messages#commodityquantity).

# Costs (running costs and transition costs)
When S2 talks about costs, this is never the costs of energy. Instead, costs could indicate to the CEM if there are some cost associated with running in a certain mode or activating some flexibility. The logic of the CEM could take these costs into consideration. Examples could be exceptional wear and tear to the device or a contractual fee for activating flexibility.

The cost of energy as defined by the Commodities is not communicated from the RM to the CEM, since the CEM is component that, if relevant, should be aware of the cost of energy; not the RM.

Specifying costs is optional for a RM. But when it does, it needs to provide a currency in the [ResourceManagerDetails](https://github.com/flexiblepower/s2-ws-json/wiki/Common_messages#resourcemanagerdetails) message.

# Device
TODO

# EMS (Energy Management System)
TODO

# Operation Mode
TODO

# Power Forecast
TODO

# Power Measurement
TODO

# Power Profile
TODO

# Power
Whenever S2 tasks about power, it is referring to the power the Resource (or Device) exchanges with the power grid. S2 is not concerned with device internal power values, such as the power consumption of a single component of the device such as a compressor, or the DC power of a PV system (since typically AC power is exchanged with the power grid).

Within S2, the rule is that when energy is being consumed by the Resource, a positive value is used. When energy is produced, a negative value is used.

# Resource

# RM (Resource Manager)
The RM is a logical component that uses S2 to communicate with a CEM. The RM represents a energy flexible device (or group of devices working together) towards the CEM. It communicates the energy flexibility to the CEM and receives instructions on how to activate it. For more information see [RM in the Architecture page](https://github.com/flexiblepower/s2-ws-json/wiki/Architecture#resource-manager-rm).