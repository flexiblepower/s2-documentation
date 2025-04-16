---
id: "FRBC.StorageDescription"
title: "FRBC.StorageDescription"
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
# `FRBC.StorageDescription`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`diagnostic_label`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Human readable name/description of the storage (e.g. hot water buffer or battery). This element is only intended for diagnostic purposes and not for HMI applications.

</div>
<div class="field-card">
<h3>`fill_level_label`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Human readable description of the (physical) units associated with the fill_level (e.g. degrees Celsius or percentage state of charge). This element is only intended for diagnostic purposes and not for HMI applications.

</div>
<div class="field-card">
<h3>`fill_level_range`: <span className="type-link">[`NumberRange`](/docs/API/Common/NumberRange)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
The range in which the fill_level should remain. It is expected of the CEM to keep the fill_level within this range. When the fill_level is not within this range, the Resource Manager can ignore instructions from the CEM (except during abnormal conditions). 

</div>
<div class="field-card">
<h3>`provides_fill_level_target_profile`: <span className="type-link">`boolean`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Indicates whether the Storage could provide a target profile for the fill level through the `FRBC.FillLevelTargetProfile`.

</div>
<div class="field-card">
<h3>`provides_leakage_behaviour`: <span className="type-link">`boolean`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Indicates whether the Storage could provide details of power leakage behaviour through the `FRBC.LeakageBehaviour`.

</div>
<div class="field-card">
<h3>`provides_usage_forecast`: <span className="type-link">`boolean`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Indicates whether the Storage could provide a UsageForecast through the `FRBC.UsageForecast`.

</div>
</div>
</div>