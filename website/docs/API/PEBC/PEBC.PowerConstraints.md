---
id: "PEBC.PowerConstraints"
title: "PEBC.PowerConstraints"
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
# `PEBC.PowerConstraints`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`allowed_limit_ranges`: <span className="type-link">[`PEBC.AllowedLimitRange[]`](/docs/API/PEBC/PEBC.AllowedLimitRange)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
The actual constraints. There shall be at least one `PEBC.AllowedLimitRange` for the UPPER_LIMIT and at least one AllowedLimitRange for the LOWER_LIMIT. It is allowed to have multiple `PEBC.AllowedLimitRange` objects with identical CommodityQuantities and LimitTypes.

</div>
<div class="field-card">
<h3>`consequence_type`: <span className="type-link">[`PEBC.PowerEnvelopeConsequenceType`](/docs/API/PEBC/PEBC.PowerEnvelopeConsequenceType)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Type of consequence of limiting power

</div>
<div class="field-card">
<h3>`id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Identifier of this `PEBC.PowerConstraints`. Must be unique in the scope of the Resource Manager, for at least the duration of the session between Resource Manager and CEM.

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
<h3>`valid_from`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Moment this `PEBC.PowerConstraints` start to be valid

</div>
<div class="field-card">
<h3>`valid_until`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Moment until this `PEBC.PowerConstraints` is valid. If valid_until is not present, there is no determined end time of this `PEBC.PowerConstraints`.

</div>
</div>
</div>