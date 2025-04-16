---
id: "DDBC.SystemDescription"
title: "DDBC.SystemDescription"
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
# `DDBC.SystemDescription`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`actuators`: <span className="type-link">[`DDBC.ActuatorDescription[]`](/docs/API/DDBC/DDBC.ActuatorDescription)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
List of all available actuators in the system. Must contain at least one `DDBC.ActuatorAggregated`.

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
<h3>`present_demand_rate`: <span className="type-link">[`NumberRange`](/docs/API/Common/NumberRange)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Present demand rate that needs to be satisfied by the system

</div>
<div class="field-card">
<h3>`provides_average_demand_rate_forecast`: <span className="type-link">`boolean`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Indicates whether the Resource Manager could provide a demand rate forecast through the `DDBC.AverageDemandRateForecast`.

</div>
<div class="field-card">
<h3>`valid_from`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Moment this `DDBC.SystemDescription` starts to be valid. If the system description is immediately valid, the DateTimeStamp should be now or in the past.

</div>
</div>
</div>