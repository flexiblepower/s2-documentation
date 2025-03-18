# Architecture

**TODO add pictures**

## Architecture overview
Energy management is a complicated task, involving many aspects. For example, an energy management system might need to forecast PV production, heat usage, EV usage, but also might think about energy tariffs and the capacity of the grid connection. In order to achieve optimal interoperability and to simplify implementation, the S2 architecture splits the energy management system in two logical parts: The Customer Energy Manager (**CEM**) and the Resource Manager (**RM**). The CEM and the RM communicate with each other through the S2 protocol.

* The *RM* represents a flexible device and informs the CEM on how it is flexible. A RM communicates with only one CEM. The CEM sends instructions on how the device should behave, within the flexibility parameters offered by the RM. The RM does not know why the CEM wants the device te behave a certain way.
* The *CEM* represents the building and decides how to use the flexibility offered by the RM. A CEM typically communicates with multiple RM's, one for each flexible device. A CEM decides how it wants a flexible device to behave, within the flexibility parameters offered by the RM. It does not know exactly what kind of device the RM is controlling.

A device that is flexible typically has some task it needs to perform (e.g. keep the building warm inside, charge the EV before a certain deadline), but is flexible in how it performs the task (e.g. do it quickly with a lot of power or do it slowly with less power). You can think of S2 as a menu in a restaurant. The RM decides what is on the menu. The CEM selects an item from the menu. The RM is fully in control of the device, since the RM creates the menu. If it doesn't want to do a certain thing, it shouldn't put it on the menu. The CEM can only pick items that are on the menu. The CEM knows the reason why it favors one item over the other; the RM doesn't know and doesn't care.

S2 is designed with a service oriented architecture in mind. This means that S2 defines how a CEM should communicate with a RM and *what* kind of responsibilities they have, but it doesn't define *how* they should do it. For example, a CEM or a RM implementation could be very simple, but also very advanced. They could do all the work themselves, or they could connect with other systems to gather information or offload certain tasks. They can communicate with whatever system using whatever protocol. The S2 architecture extremely flexible in order to be able to accommodate as many situations as possible.

## Resource Manager (RM)
The RM is preferably developed by the device manufacturer and implemented in the device hardware. However, the RM could also be implemented in a separate piece of hardware (e.g. a bridge), inside a HEMS device or in the cloud back-end of the manufacturer or of another party. For legacy devices which already implement an existing protocol (e.g. Modbus), the RM could also be implemented by any third party.

### Devices controlled by the RM
To be precise, the RM doesn't necessarily represent one device, but one *source of flexibility*. Typically that is one device (e.g. a dishwasher), but it could also be multiple devices working together (e.g. a heating system consisting of a heat pump, buffer, pumps and valves). All devices connected to a RM should be able to be controlled independently from other devices in the building. If there are dependencies between two devices (e.g. two devices cannot run at the same time), they should be represented by one RM.

### User comfort
Most devices have to execute some task for the end user (e.g. keep the inside of the building warm). This requirement from the user is what we call *user comfort*. For the CEM it is a given *that* this task needs to be accomplished. But often the CEM can influence *how* this task will be accomplished. In order to inform the CEM about these options, the RM needs to know what the state of the device is and how it behaves from an energy point of view. But it also needs to know what the user comfort requirements are. User comfort is something that is handled by the Resource Manager, not by the CEM.

For example, imagine you have a heating system that is controlled by a wall thermostat. The user expresses its comfort requirements by setting a required temperature in the wall thermostat, as well as a bandwidth around this temperature it is willing to accept (e.g. plus or minus half a degree Celsius). Based on information from the heating system, as well as from the wall thermostat, the RM can determine how much heat production can be decreased or increased while staying within the bandwidth set by the user. It then sends this information to the CEM through S2. The CEM is not directly aware of the temperature and bandwidth set in the wall thermostat, but merely knows how much it is allowed to alter the heat production in order to stay within the user comfort requirements.

The S2 protocol does specify 'abnormal conditions', in which in case of emergency the CEM can send instructions the RM that would go against user comfort.

### Knowledge about the device
A RM needs to inform the CEM about the flexibility of the device. This is something different than the state of the device, which is usually the information a RM receives from a device. A RM typically needs to have knowledge about the device in order to translate device state information into flexibility information that can be used by the CEM.

For example, imagine a simple battery system that can either be charging with 1kW, discharging with 1kw or idle (0kW). The battery system reports to the RM if it is charging, discharging or idle. This information cannot be directly sent to the CEM, since these terms are not explicitly defined in S2. Instead, the RM needs to report to the CEM that there are three *operation modes*, one called 'charging', for which the system draws 1kW from the power grid and increases the storage with 1% per minute, one called 'discharging', for which the system delivers 1kW to the power grid and decreases the storage with 1% per minute, and one called 'idle', for which the system draws 0kW from the grid and doesn't affect the storage.

Very often, the information received from the device isn't enough to define its energy or flexibility behavior. The RM needs to have specific knowledge about the device to translate device state information into energy flexibility information. What this information looks like exactly depends on the type of energy flexibility offered by the device. There are several strategies the RM could get this information, for example:

* Put it hard coded in the RM. This means this RM is only suitable for one specific device model
* Make it configurable
* Request this information from an external source
* Learn this information by observing how the device behaves over time (machine learning)

### RM responsibilities
A RM is always responsible for user comfort, safe operation and durability of the device. The CEM merely sends requests to the RM (which we call instructions), that the RM can accept or reject. When the CEM sends instructions that would lead to discomfort for the user (e.g. it wouldn't charge the EV before the deadline) or unsafe operation of the device (e.g. it would turn on the heat pump when it already reached a critical temperature), the RM must reject these instructions and send the right instructions to the actual device. A malfunctioning CEM implementation may never lead to discomfort, unsafe situations or unacceptable wear to the device.

### Communicating with the device
A RM could be directly implemented inside the device, which gives it access to all the device internals. However, RM's are currently mostly implemented for existing devices that were not specifically designed for S2. In that case RM is a piece of software that runs on a computer external to the device, and communicates with the devices through any protocol that is implemented by the device. This could for example be Modbus, KNX, SPINE, BACnet, Zigbee or any proprietary protocol. Communication can be direct or indirect, for example through a cloud API. A particular RM can communicate with the device(s) it is controlling any way it likes, as long as it receives data of which it can construct energy flexibility information and is capable sending instructions to the device to alter its behavior.

## Customer Energy Manager (CEM)
The CEM is preferably developed by the developer of the energy management system and implemented in the a separate energy management system device inside the building. However, the CEM could also be implemented in the hardware of an energy flexible device or in the cloud.

### CEM Objective
The reason the CEM exists is to optimize the energy flexibility towards one or multiple objectives. What this objective is, is defined within the CEM implementation. It is the reason why the CEM favors one energy flexibility option over another. The RM implementations do not know and do not care what this objective is.

We can roughly classify CEM objectives into four categories (that aren't necessary mutually exclusive):

* **Operational objectives**: Objectives that make sure the power systems operates as intended. For example, an objective of the CEM could be to make sure the power consumption or production never exceeds the capacity of the main fuse. It could do that for example by curtailing the EV charger or the PV system. Another example would be dealing with a congestion signal coming from the DSO in case of local grid congestion. Operational objectives typically require a quick and certain response.
* **Green objectives**: Objectives that make the energy consumption more _green_. For example, using electricity when it is produced locally by the PV system, or using electricity when there is a high level of renewable power in the grid (e.g. a relatively large amount of solar and wind energy is being produced).
* **Incentivized objectives**: Objectives that optimize on a cost or profit scheme. Examples include optimizing for day- and night tariffs, optimizing for hourly tariffs or optimizing for a power bandwidth on the main connection. Incentivized objectives can typically be calculated in the local currency and be provide a clear business case for a CEM. [Transactive Energy](https://en.wikipedia.org/wiki/Transactive_energy) is a popular term for these types of systems.
* **External objectives**: The CEM forwards the flexibility in some way to an external entity. Typically this is a company called an Aggregator that aggregates energy flexibility from many sources and uses this to trade on energy markets and/or balancing markets. It could also be an energy traded looking to optimize its portfolio. These companies tend to compensate the owner of the CEM for the provided flexibility, but this is not an incentive the CEM is directly aware of.

A CEM could implement one objective or multiple. For example, you could have CEM that implements an incentivized objective and an operational objective, and prioritizes the operational objective over the other.

Which objectives make sense to implement depends on the local situation and might vary depending on the chosen energy supplier, size of the flexible devices, country and legislation.

### CEM algorithms
In order to calculate the desired instructions for the RM the CEM needs to implement algorithms. What these algorithms look like highly depend on the objectives, as well as the used computing science techniques. We can put them in roughly two categories:

_Reactive algorithms_ look at the current state of the flexible devices and the objective and calculates instructions based on that. These algorithms can respond quickly and are relatively easy to implement. They are typically very suitable for operational objectives.

_Proactive algorithms_ look at the current state of the system, but also at the future. They use knowledge about flexible devices and forecasts to make a plan for the near future. Proactive algorithms are typically more complex, but offer significant benefits for certain types of optimizations. For example, when you know that energy will be very cheap somewhere in the future, you can postpone all your energy usage until that moment. A popular method for these kind of algorithms is [Model Predictive Control](https://en.wikipedia.org/wiki/Model_predictive_control).

It is also not uncommon to combine these two types of algorithms.

### Connections with other systems
A CEM could be implemented any way you like, and might communicate with any system you would like. Some typical systems a CEM connects with other than RMs are:

* The main meter (i.e. Smart Meter)
* Forecasting services
* Tariff provider

## Functions other than energy flexibility
Energy flexibility is often not the only reason to make a device smart or connected. Other reasons might be to have a smartphone app, do remote monitoring, remote maintenance, installing firmware updates or billing. The scope of S2 is to only deal with energy flexibility, not with other functions of smart devices. S2 does nothing to facilitate these kind of functions, but also does not hinder them. You are free to implement other functions any way you like and using any protocol you like. You could implement these functions inside a device itself, inside a RM or even inside a CEM. If other functions influence the flexibility, this should be reflected in the energy flexibility information sent from the RM to the CEM. 

For example, if you have a home automation system that turns on the heating when you are in proximity of your home, the RM should be made aware of the change in the thermostat temperature and should inform the CEM on how this changed its energy flexibility options.

When using s2-ws-json, other functions can easily be piggy bagged on the HTTP connection that is used for s2-ws-json, requiring only one connection between a device and an (energy) management system. On top of that you are of course free to set up any communication parallel to the s2-ws-json session as you like.

## Deployment
The RM and the CEM are merely software modules. In order to support as many situations as possible, the S2 architecture doesn't define how they should be implemented and where they run physically.

A RM could, for example, be implemented...
* On the device itself. This means the device must have a network connection and must have sufficient computational power to fulfill the responsibilities of a RM.
* On a dedicated gateway device for the specific device or brand
* As an app on a dedicated Energy Management computer inside the building, which could also host the CEM
* In the cloud environment of the device manufacturer

From a functional point of view it doesn't matter if the CEM or RM is running locally in the building or running externally and connected via Internet. However, for privacy, robustness, responsiveness or ease of use reasons you might want to favor one option over the other.
* Privacy: Some people won't like it if their data is stored in the cloud.
* Robustness: A local network connection is typically more reliable than an Internet connection. If you rely on energy flexibility for the operation of the local power grid this might be an issue.
* Responsiveness: If the energy flexibility use cases requires quick responses, an Internet based solution might not always suffice.
* Ease of use: People might prefer connecting through the cloud in order to avoid setting up hardware locally.
* Costs: Dedicated energy management hardware is costly and requires power. This can be avoided by connecting devices directly to the cloud.