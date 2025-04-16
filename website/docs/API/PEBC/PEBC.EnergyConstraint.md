---
id: "PEBC.EnergyConstraint"
title: "PEBC.EnergyConstraint"
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
# `PEBC.EnergyConstraint`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`commodity_quantity`: <span className="type-link">[`CommodityQuantity`](/docs/API/Common/CommodityQuantity)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Type of power quantity which applies to upper_average_power and lower_average_power

</div>
<div class="field-card">
<h3>`id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Identifier of this `PEBC.EnergyConstraints`. Must be unique in the scope of the Resource Manager, for at least the duration of the session between Resource Manager and CEM.

</div>
<div class="field-card">
<h3>`lower_average_power`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Lower average power within the time period given by valid_from and valid_until. If the duration is multiplied with this power value, then the associated lower energy content can be derived. This is the lowest amount of energy the resource will consume during that period of time. The Power Envelope created by the CEM must allow at least this much energy production (in case the number is negative). Must be greater than or equal to lower_average_power, and can be negative in case of energy production.

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
<h3>`upper_average_power`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Upper average power within the time period given by valid_from and valid_until. If the duration is multiplied with this power value, then the associated upper energy content can be derived. This is the highest amount of energy the resource will consume during that period of time. The Power Envelope created by the CEM must allow at least this much energy consumption (in case the number is positive). Must be greater than or equal to lower_average_power, and can be negative in case of energy production.

</div>
<div class="field-card">
<h3>`valid_from`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Moment this `PEBC.EnergyConstraints` information starts to be valid

</div>
<div class="field-card">
<h3>`valid_until`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Moment until this `PEBC.EnergyConstraints` information is valid.

</div>
</div>
</div>