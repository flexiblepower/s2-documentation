---
title: "Choosing a Control Type"
---

# Control Types

A Control Type is a way in which a RM in S2 can express how a resource is flexible, what is current status is, and a way for the CEM to send instructions. There are five control types defined in S2. Each Control Type has its own set of messages. You can think of a Control Type as a sub protocol in S2.

Different types of devices are flexible in another way, and typically one Control Type fits well with how the device is energy flexible. For most devices the energy flexibility could also be expressed in another control type, but that typically makes it less powerful for that type of device.  A Control Type is an abstract device model (tailored towards energy flexibility), with messages associated to inform the CEM on how a device works (what its static properties are), what its current status is (what its dynamic properties are), and what instructions look like to change the behavior of the abstract device. Mapping a real, concrete device to one of the abstract devices as defined by the Control Types sometimes requires a bit of creativity.

A RM typically implements only one Control Type, but could implement multiple. A CEM typically implements all five control types. The RM indicates to the CEM (as part of the [ResourceManagerDetails](https://github.com/flexiblepower/s2-ws-json/wiki/Common_messages#resourcemanagerdetails) message) which Control Types it supports. The CEM can then select its preferred Control Type for that device and activates it (using the [SelectControlType](https://github.com/flexiblepower/s2-ws-json/wiki/Common_messages#selectcontroltype) message). Once the Control Type has been activated, the Control Type specific messages can be used (see [State of communication](https://github.com/flexiblepower/s2-ws-json/wiki/State_of_communication) for more details).

Not all Control Types use the same mechanics. PEBC and PPBC each have their own approach, while OMBC, FRBC and DDBC are all based on the concept of [state machines](https://en.wikipedia.org/wiki/Finite-state_machine), where states are referred to as "Operation Modes".

Sending measurements and sending forecasts to the CEM is not part of any of the Control Types. This functionality can always be used, even if no Control Type has been activated by the CEM.

## Control Types overview
| Name | Abbreviation | Description | Typical examples |
| --- | --- | --- | --- |
| _No control type_ | _n/a_ | A device which is not energy flexible, but can provide power measurements or power forecasts to the CEM | Non-curtailable PV<br />_Any non-controllable load_ |
| Power Envelope Based Control | PEBC | A device of which the power producing or consuming behavior cannot be controlled, but can be limited in some way. | Curtailable PV<br />Curtailing EV charging |
| Power Profile Based Control | PPBC | A device which has to perform a certain tasks, but is flexible in when this task can be executed. | Washing machine<br />Dishwhasher<br />Tumble dryer |
| Operation Mode Based Control | OMBC | A device which can adjust its power producing or consuming behavior, without constraints regarding the duration of the adjustment | Power generator |
| Fill Rate Based Control | FRBC | A device which can store or buffer energy in some form | Smart EV charging<br />Heat pumps with a thermal buffer<br />Battery<br />Fridge |
| Demand Driven Based Control | DDBC | Devices which need to match a given demand of something, but are flexible in which way they satisfy this demand | Hybrid heat pump |