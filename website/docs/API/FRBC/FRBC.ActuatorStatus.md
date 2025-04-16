---
id: "FRBC.ActuatorStatus"
title: "FRBC.ActuatorStatus"
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
# `FRBC.ActuatorStatus`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`active_operation_mode_id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of the `FRBC.OperationMode` that is presently active.

</div>
<div class="field-card">
<h3>`actuator_id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of the actuator this messages refers to

</div>
<div class="field-card">
<h3>`message_id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of this message

</div>
<div class="field-card">
<h3>`message_type`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
TODO

</div>
<div class="field-card">
<h3>`operation_mode_factor`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
The number indicates the factor with which the `FRBC.OperationMode` is configured. The factor should be greater than or equal than 0 and less or equal to 1.

</div>
<div class="field-card">
<h3>`previous_operation_mode_id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
ID of the `FRBC.OperationMode` that was active before the present one. This value shall always be provided, unless the active `FRBC.OperationMode` is the first `FRBC.OperationMode` the Resource Manager is aware of.

</div>
<div class="field-card">
<h3>`transition_timestamp`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Time at which the transition from the previous `FRBC.OperationMode` to the active `FRBC.OperationMode` was initiated. This value shall always be provided, unless the active `FRBC.OperationMode` is the first `FRBC.OperationMode` the Resource Manager is aware of.

</div>
</div>
</div>