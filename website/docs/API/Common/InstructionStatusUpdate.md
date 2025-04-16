---
id: "InstructionStatusUpdate"
title: "InstructionStatusUpdate"
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
# `InstructionStatusUpdate`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`instruction_id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of this instruction (as provided by the CEM) 

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
<h3>`status_type`: <span className="type-link">[`InstructionStatus`](/docs/API/Common/InstructionStatus)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Present status of this instruction.

</div>
<div class="field-card">
<h3>`timestamp`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Timestamp when status_type has changed the last time.

</div>
</div>
</div>