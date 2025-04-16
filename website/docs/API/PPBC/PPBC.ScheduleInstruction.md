---
id: "PPBC.ScheduleInstruction"
title: "PPBC.ScheduleInstruction"
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
# `PPBC.ScheduleInstruction`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`abnormal_condition`: <span className="type-link">`boolean`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Indicates if this is an instruction during an abnormal condition

</div>
<div class="field-card">
<h3>`execution_time`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Indicates the moment the `PPBC.PowerSequence` shall start. When the specified execution time is in the past, execution must start as soon as possible.

</div>
<div class="field-card">
<h3>`id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of the Instruction. Must be unique in the scope of the Resource Manager, for at least the duration of the session between Resource Manager and CEM.

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
<h3>`power_profile_id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of the `PPBC.PowerProfileDefinition` of which the `PPBC.PowerSequence` is being selected and scheduled by the CEM.

</div>
<div class="field-card">
<h3>`power_sequence_id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of the `PPBC.PowerSequence` that is being selected and scheduled by the CEM.

</div>
<div class="field-card">
<h3>`sequence_container_id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of the `PPBC.PowerSequnceContainer` of which the `PPBC.PowerSequence` is being selected and scheduled by the CEM.

</div>
</div>
</div>