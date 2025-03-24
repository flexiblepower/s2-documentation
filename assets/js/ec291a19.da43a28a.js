"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8468],{7518:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"API/FRBC/FRBC.ActuatorDescription","title":"FRBC.ActuatorDescription","description":"TODO","source":"@site/docs/API/FRBC/FRBC.ActuatorDescription.md","sourceDirName":"API/FRBC","slug":"/API/FRBC/FRBC.ActuatorDescription","permalink":"/s2-documentation/docs/API/FRBC/FRBC.ActuatorDescription","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"id":"FRBC.ActuatorDescription","title":"FRBC.ActuatorDescription","pagination_next":null,"pagination_prev":null},"sidebar":"tutorialSidebar"}');var n=i(4848),r=i(8453);const o={id:"FRBC.ActuatorDescription",title:"FRBC.ActuatorDescription",pagination_next:null,pagination_prev:null},c="FRBC.ActuatorDescription",d={},l=[{value:"Fields",id:"fields",level:2}];function a(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",...(0,r.R)(),...e.components};return(0,n.jsx)("div",{style:{display:"flex",flexDirection:"row",alignItems:"start",justifyContent:"center"},children:(0,n.jsxs)("div",{style:{flexBasis:"35rem",flexGrow:"0",minWidth:"0"},children:[(0,n.jsxs)("div",{style:{marginLeft:"1rem",marginBottom:"2rem"},children:[(0,n.jsx)("div",{style:{color:"#C42759"},children:(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"frbcactuatordescription",children:(0,n.jsx)(t.code,{children:"FRBC.ActuatorDescription"})})})}),(0,n.jsx)(t.p,{children:"TODO"})]}),(0,n.jsx)("div",{style:{marginLeft:"1rem"},children:(0,n.jsx)(t.h2,{id:"fields",children:"Fields"})}),(0,n.jsx)("div",{class:"field-card",children:(0,n.jsxs)(t.p,{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(t.code,{children:"diagnostic_label"}),": ",(0,n.jsx)("span",{className:"type-link",children:(0,n.jsx)(t.code,{children:"string"})})," ",(0,n.jsx)("div",{style:{float:"right",color:"#888888",fontSize:"10pt",fontWeight:"400"},children:"Optional"})]}),"\nHuman readable name/description for the actuator. This element is only intended for diagnostic purposes and not for HMI applications."]})}),(0,n.jsx)("div",{class:"field-card",children:(0,n.jsxs)(t.p,{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(t.code,{children:"id"}),": ",(0,n.jsx)("span",{className:"type-link",children:(0,n.jsx)(t.a,{href:"/docs/API/Common/ID",children:(0,n.jsx)(t.code,{children:"ID"})})})," ",(0,n.jsx)("div",{style:{float:"right",color:"#888888",fontSize:"10pt",fontWeight:"400"},children:"Mandatory"})]}),"\nID of the Actuator. Must be unique in the scope of the Resource Manager, for at least the duration of the session between Resource Manager and CEM."]})}),(0,n.jsx)("div",{class:"field-card",children:(0,n.jsxs)(t.p,{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(t.code,{children:"operation_modes"}),": ",(0,n.jsx)("span",{className:"type-link",children:(0,n.jsx)(t.a,{href:"/docs/API/FRBC/FRBC.OperationMode",children:(0,n.jsx)(t.code,{children:"FRBC.OperationMode[]"})})})," ",(0,n.jsx)("div",{style:{float:"right",color:"#888888",fontSize:"10pt",fontWeight:"400"},children:"Mandatory"})]}),"\nProvided ",(0,n.jsx)(t.code,{children:"FRBC.OperationModes"})," associated with this actuator"]})}),(0,n.jsx)("div",{class:"field-card",children:(0,n.jsxs)(t.p,{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(t.code,{children:"supported_commodities"}),": ",(0,n.jsx)("span",{className:"type-link",children:(0,n.jsx)(t.a,{href:"/docs/API/Common/Commodity",children:(0,n.jsx)(t.code,{children:"Commodity[]"})})})," ",(0,n.jsx)("div",{style:{float:"right",color:"#888888",fontSize:"10pt",fontWeight:"400"},children:"Mandatory"})]}),"\nList of all supported Commodities."]})}),(0,n.jsx)("div",{class:"field-card",children:(0,n.jsxs)(t.p,{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(t.code,{children:"timers"}),": ",(0,n.jsx)("span",{className:"type-link",children:(0,n.jsx)(t.a,{href:"/docs/API/Common/Timer",children:(0,n.jsx)(t.code,{children:"Timer[]"})})})," ",(0,n.jsx)("div",{style:{float:"right",color:"#888888",fontSize:"10pt",fontWeight:"400"},children:"Mandatory"})]}),"\nList of Timers associated with this actuator"]})}),(0,n.jsx)("div",{class:"field-card",children:(0,n.jsxs)(t.p,{children:[(0,n.jsxs)("h3",{children:[(0,n.jsx)(t.code,{children:"transitions"}),": ",(0,n.jsx)("span",{className:"type-link",children:(0,n.jsx)(t.a,{href:"/docs/API/Common/Transition",children:(0,n.jsx)(t.code,{children:"Transition[]"})})})," ",(0,n.jsx)("div",{style:{float:"right",color:"#888888",fontSize:"10pt",fontWeight:"400"},children:"Mandatory"})]}),"\nPossible transitions between ",(0,n.jsx)(t.code,{children:"FRBC.OperationModes"})," associated with this actuator."]})})]})})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}},8453:(e,t,i)=>{i.d(t,{R:()=>o,x:()=>c});var s=i(6540);const n={},r=s.createContext(n);function o(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);