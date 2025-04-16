---
id: "FRBC.FillLevelTargetProfileElement"
title: "FRBC.FillLevelTargetProfileElement"
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
# `FRBC.FillLevelTargetProfileElement`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`duration`: <span className="type-link">[`Duration`](/docs/API/Common/Duration)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
The duration of the element.

</div>
<div class="field-card">
<h3>`fill_level_range`: <span className="type-link">[`NumberRange`](/docs/API/Common/NumberRange)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
The target range in which the fill_level must be for the time period during which the element is active. The start of the range must be smaller or equal to the end of the range. The CEM must take best-effort actions to proactively achieve this target.

</div>
</div>
</div>