---
id: "PEBC.AllowedLimitRange"
title: "PEBC.AllowedLimitRange"
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
# `PEBC.AllowedLimitRange`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`abnormal_condition_only`: <span className="type-link">`boolean`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Indicates if this `PEBC.AllowedLimitRange` may only be used during an abnormal condition

</div>
<div class="field-card">
<h3>`commodity_quantity`: <span className="type-link">[`CommodityQuantity`](/docs/API/Common/CommodityQuantity)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Type of power quantity this `PEBC.AllowedLimitRange` applies to

</div>
<div class="field-card">
<h3>`limit_type`: <span className="type-link">[`PEBC.PowerEnvelopeLimitType`](/docs/API/PEBC/PEBC.PowerEnvelopeLimitType)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Indicates if this ranges applies to the upper limit or the lower limit

</div>
<div class="field-card">
<h3>`range_boundary`: <span className="type-link">[`NumberRange`](/docs/API/Common/NumberRange)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Boundaries of the power range of this `PEBC.AllowedLimitRange`. The CEM is allowed to choose values within this range for the power envelope for the limit as described in limit_type. The start of the range shall be smaller or equal than the end of the range. 

</div>
</div>
</div>