---
id: "PowerMeasurement"
title: "PowerMeasurement"
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
# `PowerMeasurement`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`measurement_timestamp`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Timestamp when PowerValues were measured.

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
<h3>`values`: <span className="type-link">[`PowerValue[]`](/docs/API/Common/PowerValue)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Array of measured PowerValues. Must contain at least one item and at most one item per ‘commodity_quantity’ (defined inside the PowerValue).

</div>
</div>
</div>