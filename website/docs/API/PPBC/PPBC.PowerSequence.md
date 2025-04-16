---
id: "PPBC.PowerSequence"
title: "PPBC.PowerSequence"
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
# `PPBC.PowerSequence`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`abnormal_condition_only`: <span className="type-link">`boolean`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Indicates if this `PPBC.PowerSequence` may only be used during an abnormal condition

</div>
<div class="field-card">
<h3>`elements`: <span className="type-link">[`PPBC.PowerSequenceElement[]`](/docs/API/PPBC/PPBC.PowerSequenceElement)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
List of `PPBC.PowerSequenceElements`. Shall contain at least one element. Elements must be placed in chronological order.

</div>
<div class="field-card">
<h3>`id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of the `PPBC.PowerSequence`. Must be unique in the scope of the `PPBC.PowerSequnceContainer` in which it is used.

</div>
<div class="field-card">
<h3>`is_interruptible`: <span className="type-link">`boolean`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Indicates whether the option of pausing a sequence is available.

</div>
<div class="field-card">
<h3>`max_pause_before`: <span className="type-link">[`Duration`](/docs/API/Common/Duration)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
The maximum duration for which a device can be paused between the end of the previous running sequence and the start of this one

</div>
</div>
</div>