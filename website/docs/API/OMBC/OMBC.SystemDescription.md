---
id: "OMBC.SystemDescription"
title: "OMBC.SystemDescription"
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
# `OMBC.SystemDescription`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
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
<h3>`operation_modes`: <span className="type-link">[`OMBC.OperationMode[]`](/docs/API/OMBC/OMBC.OperationMode)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
`OMBC.OperationModes` available for the CEM in order to coordinate the device behaviour.

</div>
<div class="field-card">
<h3>`timers`: <span className="type-link">[`Timer[]`](/docs/API/Common/Timer)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Timers that control when certain transitions can be made.

</div>
<div class="field-card">
<h3>`transitions`: <span className="type-link">[`Transition[]`](/docs/API/Common/Transition)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Possible transitions to switch from one `OMBC.OperationMode` to another.

</div>
<div class="field-card">
<h3>`valid_from`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Moment this `OMBC.SystemDescription` starts to be valid. If the system description is immediately valid, the DateTimeStamp should be now or in the past.

</div>
</div>
</div>