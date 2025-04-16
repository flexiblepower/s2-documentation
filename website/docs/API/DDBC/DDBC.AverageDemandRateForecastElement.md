---
id: "DDBC.AverageDemandRateForecastElement"
title: "DDBC.AverageDemandRateForecastElement"
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
# `DDBC.AverageDemandRateForecastElement`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`demand_rate_expected`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
The most likely value for the demand rate; the expected increase or decrease of the fill_level per second

</div>
<div class="field-card">
<h3>`demand_rate_lower_68PPR`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
The lower limit of the range with a 68 % probability that the demand rate is within that range

</div>
<div class="field-card">
<h3>`demand_rate_lower_95PPR`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
The lower limit of the range with a 95 % probability that the demand rate is within that range

</div>
<div class="field-card">
<h3>`demand_rate_lower_limit`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
The lower limit of the range with a 100 % probability that the demand rate is within that range

</div>
<div class="field-card">
<h3>`demand_rate_upper_68PPR`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
The upper limit of the range with a 68 % probability that the demand rate is within that range

</div>
<div class="field-card">
<h3>`demand_rate_upper_95PPR`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
The upper limit of the range with a 95 % probability that the demand rate is within that range

</div>
<div class="field-card">
<h3>`demand_rate_upper_limit`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
The upper limit of the range with a 100 % probability that the demand rate is within that range

</div>
<div class="field-card">
<h3>`duration`: <span className="type-link">[`Duration`](/docs/API/Common/Duration)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Duration of the element

</div>
</div>
</div>