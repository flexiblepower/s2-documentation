---
id: "PPBC.PowerSequenceElement"
title: "PPBC.PowerSequenceElement"
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
# `PPBC.PowerSequenceElement`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`duration`: <span className="type-link">[`Duration`](/docs/API/Common/Duration)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Duration of the `PPBC.PowerSequenceElement`.

</div>
<div class="field-card">
<h3>`power_values`: <span className="type-link">[`PowerForecastValue[]`](/docs/API/Common/PowerForecastValue)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
The value of power and deviations for the given duration. The array should contain at least one PowerForecastValue and at most one PowerForecastValue per CommodityQuantity.

</div>
</div>
</div>