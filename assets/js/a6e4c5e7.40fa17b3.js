"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2413],{7707:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"Guides/Control_Types","title":"Choosing a Control Type","description":"A Control Type is a way in which a RM in S2 can express how a resource is flexible, what is current status is, and a way for the CEM to send instructions. There are five control types defined in S2. Each Control Type has its own set of messages. You can think of a Control Type as a sub protocol in S2.","source":"@site/docs/Guides/Control_Types.md","sourceDirName":"Guides","slug":"/Guides/Control_Types","permalink":"/s2-documentation/docs/Guides/Control_Types","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"Choosing a Control Type"},"sidebar":"tutorialSidebar","previous":{"title":"S2 Glossary","permalink":"/s2-documentation/docs/Guides/Common_concepts"},"next":{"title":"Example: Electric Vehicle","permalink":"/s2-documentation/docs/Guides/Example_EV"}}');var i=s(4848),o=s(8453);const r={title:"Choosing a Control Type"},a="Control Types",c={},l=[{value:"Control Types overview",id:"control-types-overview",level:2}];function d(e){const t={a:"a",em:"em",h1:"h1",h2:"h2",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"control-types",children:"Control Types"})}),"\n",(0,i.jsx)(t.p,{children:"A Control Type is a way in which a RM in S2 can express how a resource is flexible, what is current status is, and a way for the CEM to send instructions. There are five control types defined in S2. Each Control Type has its own set of messages. You can think of a Control Type as a sub protocol in S2."}),"\n",(0,i.jsx)(t.p,{children:"Different types of devices are flexible in another way, and typically one Control Type fits well with how the device is energy flexible. For most devices the energy flexibility could also be expressed in another control type, but that typically makes it less powerful for that type of device.  A Control Type is an abstract device model (tailored towards energy flexibility), with messages associated to inform the CEM on how a device works (what its static properties are), what its current status is (what its dynamic properties are), and what instructions look like to change the behavior of the abstract device. Mapping a real, concrete device to one of the abstract devices as defined by the Control Types sometimes requires a bit of creativity."}),"\n",(0,i.jsxs)(t.p,{children:["A RM typically implements only one Control Type, but could implement multiple. A CEM typically implements all five control types. The RM indicates to the CEM (as part of the ",(0,i.jsx)(t.a,{href:"https://github.com/flexiblepower/s2-ws-json/wiki/Common_messages#resourcemanagerdetails",children:"ResourceManagerDetails"})," message) which Control Types it supports. The CEM can then select its preferred Control Type for that device and activates it (using the ",(0,i.jsx)(t.a,{href:"https://github.com/flexiblepower/s2-ws-json/wiki/Common_messages#selectcontroltype",children:"SelectControlType"})," message). Once the Control Type has been activated, the Control Type specific messages can be used (see ",(0,i.jsx)(t.a,{href:"https://github.com/flexiblepower/s2-ws-json/wiki/State_of_communication",children:"State of communication"})," for more details)."]}),"\n",(0,i.jsxs)(t.p,{children:["Not all Control Types use the same mechanics. PEBC and PPBC each have their own approach, while OMBC, FRBC and DDBC are all based on the concept of ",(0,i.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Finite-state_machine",children:"state machines"}),', where states are referred to as "Operation Modes".']}),"\n",(0,i.jsx)(t.p,{children:"Sending measurements and sending forecasts to the CEM is not part of any of the Control Types. This functionality can always be used, even if no Control Type has been activated by the CEM."}),"\n",(0,i.jsx)(t.h2,{id:"control-types-overview",children:"Control Types overview"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Name"}),(0,i.jsx)(t.th,{children:"Abbreviation"}),(0,i.jsx)(t.th,{children:"Description"}),(0,i.jsx)(t.th,{children:"Typical examples"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.em,{children:"No control type"})}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.em,{children:"n/a"})}),(0,i.jsx)(t.td,{children:"A device which is not energy flexible, but can provide power measurements or power forecasts to the CEM"}),(0,i.jsxs)(t.td,{children:["Non-curtailable PV",(0,i.jsx)("br",{}),(0,i.jsx)(t.em,{children:"Any non-controllable load"})]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Power Envelope Based Control"}),(0,i.jsx)(t.td,{children:"PEBC"}),(0,i.jsx)(t.td,{children:"A device of which the power producing or consuming behavior cannot be controlled, but can be limited in some way."}),(0,i.jsxs)(t.td,{children:["Curtailable PV",(0,i.jsx)("br",{}),"Curtailing EV charging"]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Power Profile Based Control"}),(0,i.jsx)(t.td,{children:"PPBC"}),(0,i.jsx)(t.td,{children:"A device which has to perform a certain tasks, but is flexible in when this task can be executed."}),(0,i.jsxs)(t.td,{children:["Washing machine",(0,i.jsx)("br",{}),"Dishwhasher",(0,i.jsx)("br",{}),"Tumble dryer"]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Operation Mode Based Control"}),(0,i.jsx)(t.td,{children:"OMBC"}),(0,i.jsx)(t.td,{children:"A device which can adjust its power producing or consuming behavior, without constraints regarding the duration of the adjustment"}),(0,i.jsx)(t.td,{children:"Power generator"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Fill Rate Based Control"}),(0,i.jsx)(t.td,{children:"FRBC"}),(0,i.jsx)(t.td,{children:"A device which can store or buffer energy in some form"}),(0,i.jsxs)(t.td,{children:["Smart EV charging",(0,i.jsx)("br",{}),"Heat pumps with a thermal buffer",(0,i.jsx)("br",{}),"Battery",(0,i.jsx)("br",{}),"Fridge"]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Demand Driven Based Control"}),(0,i.jsx)(t.td,{children:"DDBC"}),(0,i.jsx)(t.td,{children:"Devices which need to match a given demand of something, but are flexible in which way they satisfy this demand"}),(0,i.jsx)(t.td,{children:"Hybrid heat pump"})]})]})]})]})}function h(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>r,x:()=>a});var n=s(6540);const i={},o=n.createContext(i);function r(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);