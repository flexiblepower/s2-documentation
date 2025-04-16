---
id: "DDBC.ActuatorDescription"
title: "DDBC.ActuatorDescription"
hide_table_of_contents: true
pagination_next: null
pagination_prev: null
---

<div style={{ display: "flex", flexDirection: "row", alignItems: "start", justifyContent: "center" }}>
<div style={{ flexBasis: "35rem", flexGrow: "0", minWidth: "0" }}>
<div style={{ marginLeft: "1rem", marginBottom: "2rem" }}>
<div class="api-title">
<div style={{ width: "fit-content", fontWeight: 500, color: "gray" }}>
Message
</div>
# `DDBC.ActuatorDescription`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`diagnostic_label`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Human readable name/description of the actuator. This element is only intended for diagnostic purposes and not for HMI applications.

</div>
<div class="field-card">
<h3>`id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of this `DDBC.ActuatorDescription`. Must be unique in the scope of the Resource Manager, for at least the duration of the session between Resource Manager and CEM.

</div>
<div class="field-card">
<h3>`operation_modes`: <span className="type-link">[`DDBC.OperationMode[]`](/docs/API/DDBC/DDBC.OperationMode)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
List of all Operation Modes that are available for this actuator. There shall be at least one `DDBC.OperationMode`.

</div>
<div class="field-card">
<h3>`supported_commodites`: <span className="type-link">[`Commodity[]`](/docs/API/Common/Commodity)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Commodities supported by the operation modes of this actuator. There shall be at least one commodity

</div>
<div class="field-card">
<h3>`timers`: <span className="type-link">[`Timer[]`](/docs/API/Common/Timer)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
List of Timers associated with Transitions for this Actuator. Can be empty.

</div>
<div class="field-card">
<h3>`transitions`: <span className="type-link">[`Transition[]`](/docs/API/Common/Transition)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
List of Transitions between Operation Modes. Shall contain at least one Transition.

</div>
</div>
</div>