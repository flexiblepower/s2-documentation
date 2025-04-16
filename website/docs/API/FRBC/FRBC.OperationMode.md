---
id: "FRBC.OperationMode"
title: "FRBC.OperationMode"
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
# `FRBC.OperationMode`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`abnormal_condition_only`: <span className="type-link">`boolean`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Indicates if this `FRBC.OperationMode` may only be used during an abnormal condition

</div>
<div class="field-card">
<h3>`diagnostic_label`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Human readable name/description of the `FRBC.OperationMode`. This element is only intended for diagnostic purposes and not for HMI applications.

</div>
<div class="field-card">
<h3>`elements`: <span className="type-link">[`FRBC.OperationModeElement[]`](/docs/API/FRBC/FRBC.OperationModeElement)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
List of `FRBC.OperationModeElements`, which describe the properties of this `FRBC.OperationMode` depending on the fill_level. The fill_level_ranges of the items in the Array must be contiguous.

</div>
<div class="field-card">
<h3>`id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
ID of the `FRBC.OperationMode`. Must be unique in the scope of the `FRBC.ActuatorDescription` in which it is used.

</div>
</div>
</div>