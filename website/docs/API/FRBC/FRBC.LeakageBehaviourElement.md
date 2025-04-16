---
id: "FRBC.LeakageBehaviourElement"
title: "FRBC.LeakageBehaviourElement"
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
# `FRBC.LeakageBehaviourElement`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`fill_level_range`: <span className="type-link">[`NumberRange`](/docs/API/Common/NumberRange)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
The fill level range for which this `FRBC.LeakageBehaviourElement` applies. The start of the range must be less than the end of the range.

</div>
<div class="field-card">
<h3>`leakage_rate`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Indicates how fast the momentary fill level will decrease per second due to leakage within the given range of the fill level. A positive value indicates that the fill level decreases over time due to leakage.

</div>
</div>
</div>