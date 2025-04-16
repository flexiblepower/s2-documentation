---
id: "SessionRequestType"
title: "SessionRequestType"
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
# `SessionRequestType`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Variants
</div>
<div class="field-card" style={{ borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1rem", border: "1px solid rgba(18, 62, 183, 0.2)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
<h3>`RECONNECT`</h3>
Please reconnect the WebSocket session. Once reconnected, it starts from scratch with a handshake.

</div>
<div class="field-card" style={{ borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1rem", border: "1px solid rgba(18, 62, 183, 0.2)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
<h3>`TERMINATE`</h3>
Disconnect the session (client can try to reconnecting with exponential backoff)

</div>
</div>
</div>