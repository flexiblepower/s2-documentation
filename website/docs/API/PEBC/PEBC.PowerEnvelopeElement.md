---
id: "PEBC.PowerEnvelopeElement"
title: "PEBC.PowerEnvelopeElement"
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
# `PEBC.PowerEnvelopeElement`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`duration`: <span className="type-link">[`Duration`](/docs/API/Common/Duration)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
The duration of the element

</div>
<div class="field-card">
<h3>`lower_limit`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Lower power limit according to the commodity_quantity of the containing `PEBC.PowerEnvelope`. The lower_limit must be smaller or equal to the upper_limit. The Resource Manager is requested to keep the power values for the given commodity quantity equal to or above the lower_limit. The lower_limit shall be in accordance with the constraints provided by the Resource Manager through any `PEBC.AllowedLimitRange` with limit_type LOWER_LIMIT.

</div>
<div class="field-card">
<h3>`upper_limit`: <span className="type-link">`float`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Upper power limit according to the commodity_quantity of the containing `PEBC.PowerEnvelope`. The lower_limit must be smaller or equal to the upper_limit. The Resource Manager is requested to keep the power values for the given commodity quantity equal to or below the upper_limit. The upper_limit shall be in accordance with the constraints provided by the Resource Manager through any `PEBC.AllowedLimitRange` with limit_type UPPER_LIMIT.

</div>
</div>
</div>