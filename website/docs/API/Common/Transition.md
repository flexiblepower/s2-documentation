---
id: "Transition"
title: "Transition"
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
# `Transition`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`abnormal_condition_only`: <span className="type-link">`boolean`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Indicates if this Transition may only be used during an abnormal condition (see Clause )

</div>
<div class="field-card">
<h3>`blocking_timers`: <span className="type-link">[`ID[]`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
List of IDs of Timers that block this Transition from initiating while at least one of these Timers is not yet finished

</div>
<div class="field-card">
<h3>`from`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of the OperationMode (exact type differs per ControlType) that should be switched from.

</div>
<div class="field-card">
<h3>`id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of the Transition. Must be unique in the scope of the `OMBC.SystemDescription`, `FRBC.ActuatorDescription` or `DDBC.ActuatorDescription` in which it is used.

</div>
<div class="field-card">
<h3>`start_timers`: <span className="type-link">[`ID[]`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
List of IDs of Timers that will be (re)started when this transition is initiated

</div>
<div class="field-card">
<h3>`to`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of the OperationMode (exact type differs per ControlType) that will be switched to.

</div>
<div class="field-card">
<h3>`transition_costs`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Absolute costs for going through this Transition in the currency as described in the ResourceManagerDetails.

</div>
<div class="field-card">
<h3>`transition_duration`: <span className="type-link">[`Duration`](/docs/API/Common/Duration)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Indicates the time between the initiation of this Transition, and the time at which the device behaves according to the Operation Mode which is defined in the ‘to’ data element. When no value is provided it is assumed the transition duration is negligible.

</div>
</div>
</div>