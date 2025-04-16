---
id: "PEBC.PowerEnvelope"
title: "PEBC.PowerEnvelope"
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
# `PEBC.PowerEnvelope`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`commodity_quantity`: <span className="type-link">[`CommodityQuantity`](/docs/API/Common/CommodityQuantity)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Type of power quantity this `PEBC.PowerEnvelope` applies to

</div>
<div class="field-card">
<h3>`id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Identifier of this `PEBC.PowerEnvelope`. Must be unique in the scope of the Resource Manager, for at least the duration of the session between Resource Manager and CEM.

</div>
<div class="field-card">
<h3>`power_envelope_elements`: <span className="type-link">[`PEBC.PowerEnvelopeElement[]`](/docs/API/PEBC/PEBC.PowerEnvelopeElement)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
The elements of this `PEBC.PowerEnvelope`. Shall contain at least one element. Elements must be placed in chronological order.

</div>
</div>
</div>