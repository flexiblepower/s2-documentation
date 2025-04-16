---
id: "FRBC.ActuatorDescription"
title: "FRBC.ActuatorDescription"
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
# `FRBC.ActuatorDescription`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`diagnostic_label`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Human readable name/description for the actuator. This element is only intended for diagnostic purposes and not for HMI applications.

</div>
<div class="field-card">
<h3>`id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of the Actuator. Must be unique in the scope of the Resource Manager, for at least the duration of the session between Resource Manager and CEM.

</div>
<div class="field-card">
<h3>`operation_modes`: <span className="type-link">[`FRBC.OperationMode[]`](/docs/API/FRBC/FRBC.OperationMode)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Provided `FRBC.OperationModes` associated with this actuator

</div>
<div class="field-card">
<h3>`supported_commodities`: <span className="type-link">[`Commodity[]`](/docs/API/Common/Commodity)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
List of all supported Commodities.

</div>
<div class="field-card">
<h3>`timers`: <span className="type-link">[`Timer[]`](/docs/API/Common/Timer)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
List of Timers associated with this actuator

</div>
<div class="field-card">
<h3>`transitions`: <span className="type-link">[`Transition[]`](/docs/API/Common/Transition)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Possible transitions between `FRBC.OperationModes` associated with this actuator.

</div>
</div>
</div>