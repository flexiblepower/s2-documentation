---
id: "PPBC.PowerSequenceStatus"
title: "PPBC.PowerSequenceStatus"
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
# `PPBC.PowerSequenceStatus`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Variants
</div>
<div class="field-card" style={{ borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1rem", border: "1px solid rgba(18, 62, 183, 0.2)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
<h3>`ABORTED`</h3>
The selected `PPBC.PowerSequence` was aborted by the device and will not continue

</div>
<div class="field-card" style={{ borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1rem", border: "1px solid rgba(18, 62, 183, 0.2)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
<h3>`EXECUTING`</h3>
The selected `PPBC.PowerSequence` is currently being executed

</div>
<div class="field-card" style={{ borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1rem", border: "1px solid rgba(18, 62, 183, 0.2)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
<h3>`FINISHED`</h3>
The selected `PPBC.PowerSequence` was executed and finished successfully

</div>
<div class="field-card" style={{ borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1rem", border: "1px solid rgba(18, 62, 183, 0.2)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
<h3>`INTERRUPTED`</h3>
The selected `PPBC.PowerSequence` is being executed, but is currently interrupted and will continue afterwards

</div>
<div class="field-card" style={{ borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1rem", border: "1px solid rgba(18, 62, 183, 0.2)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
<h3>`NOT_SCHEDULED`</h3>
No `PPBC.PowerSequence` within the `PPBC.PowerSequenceContainer` is scheduled

</div>
<div class="field-card" style={{ borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1rem", border: "1px solid rgba(18, 62, 183, 0.2)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
<h3>`SCHEDULED`</h3>
The selected `PPBC.PowerSequence` is scheduled to be executed in the future

</div>
</div>
</div>