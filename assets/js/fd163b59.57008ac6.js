"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9961],{6542:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>a,contentTitle:()=>t,default:()=>p,frontMatter:()=>d,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"API/Common/ReceptionStatusValues","title":"ReceptionStatusValues","description":"Variants","source":"@site/docs/API/Common/ReceptionStatusValues.md","sourceDirName":"API/Common","slug":"/API/Common/ReceptionStatusValues","permalink":"/s2-documentation/docs/API/Common/ReceptionStatusValues","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"id":"ReceptionStatusValues","title":"ReceptionStatusValues","pagination_next":null,"pagination_prev":null},"sidebar":"tutorialSidebar"}');var i=n(4848),o=n(8453);const d={id:"ReceptionStatusValues",title:"ReceptionStatusValues",pagination_next:null,pagination_prev:null},t="ReceptionStatusValues",a={},c=[{value:"Variants",id:"variants",level:2},{value:"<code>INVALID_CONTENT</code>",id:"invalid_content",level:3},{value:"<code>INVALID_DATA</code>",id:"invalid_data",level:3},{value:"<code>INVALID_MESSAGE</code>",id:"invalid_message",level:3},{value:"<code>OK</code>",id:"ok",level:3},{value:"<code>PERMANENT_ERROR</code>",id:"permanent_error",level:3},{value:"<code>TEMPORARY_ERROR</code>",id:"temporary_error",level:3}];function l(e){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",...(0,o.R)(),...e.components};return(0,i.jsx)("div",{style:{display:"flex",flexDirection:"row",alignItems:"start",justifyContent:"center"},children:(0,i.jsxs)("div",{style:{flexBasis:"35rem",flexGrow:"0",minWidth:"0"},children:[(0,i.jsx)("div",{style:{marginLeft:"1rem",marginBottom:"2rem"},children:(0,i.jsx)("div",{style:{color:"#C42759"},children:(0,i.jsx)(r.header,{children:(0,i.jsx)(r.h1,{id:"receptionstatusvalues",children:(0,i.jsx)(r.code,{children:"ReceptionStatusValues"})})})})}),(0,i.jsx)("div",{style:{marginLeft:"1rem"},children:(0,i.jsx)(r.h2,{id:"variants",children:"Variants"})}),(0,i.jsxs)("div",{class:"field-card",style:{borderRadius:"0.5rem",padding:"0.75rem 1rem",marginBottom:"1rem",border:"1px solid rgba(18, 62, 183, 0.2)",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"},children:[(0,i.jsx)(r.h3,{id:"invalid_content",children:(0,i.jsx)(r.code,{children:"INVALID_CONTENT"})}),(0,i.jsxs)(r.p,{children:["Message contents is invalid (",(0,i.jsx)(r.code,{children:"e.g"}),". contains a non-existing ID). Somewhat equivalent to BAD_REQUEST in HTTP.. Consequence: Message is ignored, proceed if possible."]})]}),(0,i.jsxs)("div",{class:"field-card",style:{borderRadius:"0.5rem",padding:"0.75rem 1rem",marginBottom:"1rem",border:"1px solid rgba(18, 62, 183, 0.2)",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"},children:[(0,i.jsx)(r.h3,{id:"invalid_data",children:(0,i.jsx)(r.code,{children:"INVALID_DATA"})}),(0,i.jsxs)(r.p,{children:["Message not understood (",(0,i.jsx)(r.code,{children:"e.g"}),". not valid JSON, no message_id found). Consequence: Message is ignored, proceed if possible"]})]}),(0,i.jsxs)("div",{class:"field-card",style:{borderRadius:"0.5rem",padding:"0.75rem 1rem",marginBottom:"1rem",border:"1px solid rgba(18, 62, 183, 0.2)",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"},children:[(0,i.jsx)(r.h3,{id:"invalid_message",children:(0,i.jsx)(r.code,{children:"INVALID_MESSAGE"})}),(0,i.jsx)(r.p,{children:"Message was not according to schema. Consequence: Message is ignored, proceed if possible"})]}),(0,i.jsxs)("div",{class:"field-card",style:{borderRadius:"0.5rem",padding:"0.75rem 1rem",marginBottom:"1rem",border:"1px solid rgba(18, 62, 183, 0.2)",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"},children:[(0,i.jsx)(r.h3,{id:"ok",children:(0,i.jsx)(r.code,{children:"OK"})}),(0,i.jsx)(r.p,{children:"Message processed normally. Consequence: Proceed normally."})]}),(0,i.jsxs)("div",{class:"field-card",style:{borderRadius:"0.5rem",padding:"0.75rem 1rem",marginBottom:"1rem",border:"1px solid rgba(18, 62, 183, 0.2)",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"},children:[(0,i.jsx)(r.h3,{id:"permanent_error",children:(0,i.jsx)(r.code,{children:"PERMANENT_ERROR"})}),(0,i.jsx)(r.p,{children:"Receiver encountered an error which it cannot recover from. Consequence: Disconnect."})]}),(0,i.jsxs)("div",{class:"field-card",style:{borderRadius:"0.5rem",padding:"0.75rem 1rem",marginBottom:"1rem",border:"1px solid rgba(18, 62, 183, 0.2)",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"},children:[(0,i.jsx)(r.h3,{id:"temporary_error",children:(0,i.jsx)(r.code,{children:"TEMPORARY_ERROR"})}),(0,i.jsx)(r.p,{children:"Receiver encountered an error. Consequence: Try to send to message again"})]})]})})}function p(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,r,n)=>{n.d(r,{R:()=>d,x:()=>t});var s=n(6540);const i={},o=s.createContext(i);function d(e){const r=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function t(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),s.createElement(o.Provider,{value:r},e.children)}}}]);