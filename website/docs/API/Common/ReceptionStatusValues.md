---
id: "ReceptionStatusValues"
title: "ReceptionStatusValues"
hide_table_of_contents: true
pagination_next: null
pagination_prev: null
---

<div style={{ display: "flex", flexDirection: "row", alignItems: "start", justifyContent: "center" }}>
<div style={{ flexBasis: "35rem", flexGrow: "0", minWidth: "0" }}>
<div style={{ marginLeft: "1rem", marginBottom: "2rem" }}>
<div class="api-title">
<div style={{ width: "fit-content", fontWeight: 500, color: "gray" }}>
Enumeration
</div>
# `ReceptionStatusValues`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Variants
</div>
<div class="field-card" style={{ borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1rem", border: "1px solid rgba(18, 62, 183, 0.2)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
<h3>`INVALID_CONTENT`</h3>
Message contents is invalid (e.g. contains a non-existing ID). Somewhat equivalent to BAD_REQUEST in HTTP.. Consequence: Message is ignored, proceed if possible.

</div>
<div class="field-card" style={{ borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1rem", border: "1px solid rgba(18, 62, 183, 0.2)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
<h3>`INVALID_DATA`</h3>
Message not understood (e.g. not valid JSON, no message_id found). Consequence: Message is ignored, proceed if possible

</div>
<div class="field-card" style={{ borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1rem", border: "1px solid rgba(18, 62, 183, 0.2)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
<h3>`INVALID_MESSAGE`</h3>
Message was not according to schema. Consequence: Message is ignored, proceed if possible

</div>
<div class="field-card" style={{ borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1rem", border: "1px solid rgba(18, 62, 183, 0.2)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
<h3>`OK`</h3>
Message processed normally. Consequence: Proceed normally.

</div>
<div class="field-card" style={{ borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1rem", border: "1px solid rgba(18, 62, 183, 0.2)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
<h3>`PERMANENT_ERROR`</h3>
Receiver encountered an error which it cannot recover from. Consequence: Disconnect.

</div>
<div class="field-card" style={{ borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1rem", border: "1px solid rgba(18, 62, 183, 0.2)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
<h3>`TEMPORARY_ERROR`</h3>
Receiver encountered an error. Consequence: Try to send to message again

</div>
</div>
</div>