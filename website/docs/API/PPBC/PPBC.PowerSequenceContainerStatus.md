---
id: "PPBC.PowerSequenceContainerStatus"
title: "PPBC.PowerSequenceContainerStatus"
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
# `PPBC.PowerSequenceContainerStatus`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`power_profile_id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of the `PPBC.PowerProfileDefinition` of which the data element ‘sequence_container_id’ refers to. 

</div>
<div class="field-card">
<h3>`progress`: <span className="type-link">[`Duration`](/docs/API/Common/Duration)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Time that has passed since the selected sequence has started. A value must be provided, unless no sequence has been selected or the selected sequence hasn’t started yet.

</div>
<div class="field-card">
<h3>`selected_sequence_id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
ID of selected `PPBC.PowerSequence`. When no ID is given, no sequence was selected yet.

</div>
<div class="field-card">
<h3>`sequence_container_id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of the `PPBC.PowerSequenceContainer` this `PPBC.PowerSequenceContainerStatus` provides information about.

</div>
<div class="field-card">
<h3>`status`: <span className="type-link">[`PPBC.PowerSequenceStatus`](/docs/API/PPBC/PPBC.PowerSequenceStatus)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Status of the selected `PPBC.PowerSequence`

</div>
</div>
</div>