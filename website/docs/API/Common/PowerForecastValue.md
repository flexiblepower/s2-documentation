---
id: "PowerForecastValue"
title: "PowerForecastValue"
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
# `PowerForecastValue`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`commodity_quantity`: <span className="type-link">[`CommodityQuantity`](/docs/API/Common/CommodityQuantity)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
The power quantity the value refers to

</div>
<div class="field-card">
<h3>`value_expected`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
The expected power value.

</div>
<div class="field-card">
<h3>`value_lower_68PPR`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
The lower boundary of the range with 68 % certainty the power value is in it

</div>
<div class="field-card">
<h3>`value_lower_95PPR`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
The lower boundary of the range with 95 % certainty the power value is in it

</div>
<div class="field-card">
<h3>`value_lower_limit`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
The lower boundary of the range with 100 % certainty the power value is in it

</div>
<div class="field-card">
<h3>`value_upper_68PPR`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
The upper boundary of the range with 68 % certainty the power value is in it

</div>
<div class="field-card">
<h3>`value_upper_95PPR`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
The upper boundary of the range with 95 % certainty the power value is in it

</div>
<div class="field-card">
<h3>`value_upper_limit`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
The upper boundary of the range with 100 % certainty the power value is in it

</div>
</div>
</div>