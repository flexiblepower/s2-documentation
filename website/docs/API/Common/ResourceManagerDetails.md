---
id: "ResourceManagerDetails"
title: "ResourceManagerDetails"
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
# `ResourceManagerDetails`
</div>


TODO

</div>

<div style={{ marginLeft: "1rem" }}>
## Fields
</div>
<div class="field-card">
<h3>`available_control_types`: <span className="type-link">[`ControlType[]`](/docs/API/Common/ControlType)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
The control types supported by this Resource Manager.

</div>
<div class="field-card">
<h3>`currency`: <span className="type-link">[`Currency`](/docs/API/Common/Currency)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Currency to be used for all information regarding costs. Mandatory if cost information is published.

</div>
<div class="field-card">
<h3>`firmware_version`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Version identifier of the firmware used in the device (provided by the manufacturer)

</div>
<div class="field-card">
<h3>`instruction_processing_delay`: <span className="type-link">[`Duration`](/docs/API/Common/Duration)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
The average time the combination of Resource Manager and HBES/BACS/SASS or (Smart) device needs to process and execute an instruction

</div>
<div class="field-card">
<h3>`manufacturer`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Name of Manufacturer

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
<h3>`model`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Name of the model of the device (provided by the manufacturer)

</div>
<div class="field-card">
<h3>`name`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Human readable name given by user

</div>
<div class="field-card">
<h3>`provides_forecast`: <span className="type-link">`boolean`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Indicates whether the ResourceManager is able to provide PowerForecasts

</div>
<div class="field-card">
<h3>`provides_power_measurement_types`: <span className="type-link">[`CommodityQuantity[]`](/docs/API/Common/CommodityQuantity)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Array of all CommodityQuantities that this Resource Manager can provide measurements for. 

</div>
<div class="field-card">
<h3>`resource_id`: <span className="type-link">[`ID`](/docs/API/Common/ID)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Identifier of the Resource Manager. Must be unique within the scope of the CEM.

</div>
<div class="field-card">
<h3>`roles`: <span className="type-link">[`Role[]`](/docs/API/Common/Role)</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Mandatory</div></h3>
Each Resource Manager provides one or more energy Roles

</div>
<div class="field-card">
<h3>`serial_number`: <span className="type-link">`string`</span> <div style={{ float: "right", color: "#888888", fontSize: '10pt', fontWeight: "400" }}>Optional</div></h3>
Serial number of the device (provided by the manufacturer)

</div>
</div>
</div>