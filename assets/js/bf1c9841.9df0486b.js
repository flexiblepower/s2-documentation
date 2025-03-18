"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[549],{6478:(e,r,i)=>{i.r(r),i.d(r,{assets:()=>l,contentTitle:()=>t,default:()=>p,frontMatter:()=>s,metadata:()=>d,toc:()=>a});const d=JSON.parse('{"id":"API/PEBC/PEBC.PowerConstraints","title":"PEBC.PowerConstraints","description":"TODO","source":"@site/docs/API/PEBC/PEBC.PowerConstraints.md","sourceDirName":"API/PEBC","slug":"/API/PEBC/PEBC.PowerConstraints","permalink":"/s2-documentation/docs/API/PEBC/PEBC.PowerConstraints","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"id":"PEBC.PowerConstraints","title":"PEBC.PowerConstraints","pagination_next":null,"pagination_prev":null},"sidebar":"tutorialSidebar"}');var n=i(4848),o=i(8453);const s={id:"PEBC.PowerConstraints",title:"PEBC.PowerConstraints",pagination_next:null,pagination_prev:null},t="PEBC.PowerConstraints",l={},a=[{value:"Fields",id:"fields",level:2},{value:"<code>allowed_limit_ranges</code>: <span><code>PEBC.AllowedLimitRange[]</code></span> <div>Mandatory</div>",id:"allowed_limit_ranges-pebcallowedlimitrange-mandatory",level:3},{value:"<code>consequence_type</code>: <span><code>PEBC.PowerEnvelopeConsequenceType</code></span> <div>Mandatory</div>",id:"consequence_type-pebcpowerenvelopeconsequencetype-mandatory",level:3},{value:"<code>id</code>: <span><code>ID</code></span> <div>Mandatory</div>",id:"id-id-mandatory",level:3},{value:"<code>message_id</code>: <span><code>ID</code></span> <div>Mandatory</div>",id:"message_id-id-mandatory",level:3},{value:"<code>message_type</code>: <span><code>string</code></span> <div>Mandatory</div>",id:"message_type-string-mandatory",level:3},{value:"<code>valid_from</code>: <span><code>string</code></span> <div>Mandatory</div>",id:"valid_from-string-mandatory",level:3},{value:"<code>valid_until</code>: <span><code>string</code></span> <div>Optional</div>",id:"valid_until-string-optional",level:3}];function c(e){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",...(0,o.R)(),...e.components};return(0,n.jsx)("div",{style:{display:"flex",flexDirection:"row",alignItems:"start",justifyContent:"center"},children:(0,n.jsxs)("div",{style:{flexBasis:"35rem",flexGrow:"0",minWidth:"0"},children:[(0,n.jsxs)("div",{style:{marginLeft:"1rem",marginBottom:"2rem"},children:[(0,n.jsx)("div",{style:{color:"#C42759"},children:(0,n.jsx)(r.header,{children:(0,n.jsx)(r.h1,{id:"pebcpowerconstraints",children:(0,n.jsx)(r.code,{children:"PEBC.PowerConstraints"})})})}),(0,n.jsx)(r.p,{children:"TODO"})]}),(0,n.jsx)("div",{style:{marginLeft:"1rem"},children:(0,n.jsx)(r.h2,{id:"fields",children:"Fields"})}),(0,n.jsxs)("div",{class:"field-card",style:{borderRadius:"0.5rem",padding:"0.75rem 1rem",marginBottom:"1rem",border:"1px solid rgba(18, 62, 183, 0.2)",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"},children:[(0,n.jsxs)(r.h3,{id:"allowed_limit_ranges-pebcallowedlimitrange-mandatory",children:[(0,n.jsx)(r.code,{children:"allowed_limit_ranges"}),": ",(0,n.jsx)("span",{style:{color:"#C42759"},children:(0,n.jsx)(r.code,{children:"PEBC.AllowedLimitRange[]"})})," ",(0,n.jsx)("div",{style:{float:"right",color:"#888888",fontSize:"10pt"},children:"Mandatory"})]}),(0,n.jsxs)(r.p,{children:["The actual constraints. There shall be at least one ",(0,n.jsx)(r.code,{children:"PEBC.AllowedLimitRange"})," for the UPPER_LIMIT and at least one AllowedLimitRange for the LOWER_LIMIT. It is allowed to have multiple ",(0,n.jsx)(r.code,{children:"PEBC.AllowedLimitRange"})," objects with identical CommodityQuantities and LimitTypes."]})]}),(0,n.jsxs)("div",{class:"field-card",style:{borderRadius:"0.5rem",padding:"0.75rem 1rem",marginBottom:"1rem",border:"1px solid rgba(18, 62, 183, 0.2)",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"},children:[(0,n.jsxs)(r.h3,{id:"consequence_type-pebcpowerenvelopeconsequencetype-mandatory",children:[(0,n.jsx)(r.code,{children:"consequence_type"}),": ",(0,n.jsx)("span",{style:{color:"#C42759"},children:(0,n.jsx)(r.code,{children:"PEBC.PowerEnvelopeConsequenceType"})})," ",(0,n.jsx)("div",{style:{float:"right",color:"#888888",fontSize:"10pt"},children:"Mandatory"})]}),(0,n.jsx)(r.p,{children:"Type of consequence of limiting power"})]}),(0,n.jsxs)("div",{class:"field-card",style:{borderRadius:"0.5rem",padding:"0.75rem 1rem",marginBottom:"1rem",border:"1px solid rgba(18, 62, 183, 0.2)",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"},children:[(0,n.jsxs)(r.h3,{id:"id-id-mandatory",children:[(0,n.jsx)(r.code,{children:"id"}),": ",(0,n.jsx)("span",{style:{color:"#C42759"},children:(0,n.jsx)(r.code,{children:"ID"})})," ",(0,n.jsx)("div",{style:{float:"right",color:"#888888",fontSize:"10pt"},children:"Mandatory"})]}),(0,n.jsxs)(r.p,{children:["Identifier of this ",(0,n.jsx)(r.code,{children:"PEBC.PowerConstraints"}),". Must be unique in the scope of the Resource Manager, for at least the duration of the session between Resource Manager and CEM."]})]}),(0,n.jsxs)("div",{class:"field-card",style:{borderRadius:"0.5rem",padding:"0.75rem 1rem",marginBottom:"1rem",border:"1px solid rgba(18, 62, 183, 0.2)",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"},children:[(0,n.jsxs)(r.h3,{id:"message_id-id-mandatory",children:[(0,n.jsx)(r.code,{children:"message_id"}),": ",(0,n.jsx)("span",{style:{color:"#C42759"},children:(0,n.jsx)(r.code,{children:"ID"})})," ",(0,n.jsx)("div",{style:{float:"right",color:"#888888",fontSize:"10pt"},children:"Mandatory"})]}),(0,n.jsx)(r.p,{children:"ID of this message"})]}),(0,n.jsxs)("div",{class:"field-card",style:{borderRadius:"0.5rem",padding:"0.75rem 1rem",marginBottom:"1rem",border:"1px solid rgba(18, 62, 183, 0.2)",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"},children:[(0,n.jsxs)(r.h3,{id:"message_type-string-mandatory",children:[(0,n.jsx)(r.code,{children:"message_type"}),": ",(0,n.jsx)("span",{style:{color:"#C42759"},children:(0,n.jsx)(r.code,{children:"string"})})," ",(0,n.jsx)("div",{style:{float:"right",color:"#888888",fontSize:"10pt"},children:"Mandatory"})]}),(0,n.jsx)(r.p,{children:"TODO"})]}),(0,n.jsxs)("div",{class:"field-card",style:{borderRadius:"0.5rem",padding:"0.75rem 1rem",marginBottom:"1rem",border:"1px solid rgba(18, 62, 183, 0.2)",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"},children:[(0,n.jsxs)(r.h3,{id:"valid_from-string-mandatory",children:[(0,n.jsx)(r.code,{children:"valid_from"}),": ",(0,n.jsx)("span",{style:{color:"#C42759"},children:(0,n.jsx)(r.code,{children:"string"})})," ",(0,n.jsx)("div",{style:{float:"right",color:"#888888",fontSize:"10pt"},children:"Mandatory"})]}),(0,n.jsxs)(r.p,{children:["Moment this ",(0,n.jsx)(r.code,{children:"PEBC.PowerConstraints"})," start to be valid"]})]}),(0,n.jsxs)("div",{class:"field-card",style:{borderRadius:"0.5rem",padding:"0.75rem 1rem",marginBottom:"1rem",border:"1px solid rgba(18, 62, 183, 0.2)",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"},children:[(0,n.jsxs)(r.h3,{id:"valid_until-string-optional",children:[(0,n.jsx)(r.code,{children:"valid_until"}),": ",(0,n.jsx)("span",{style:{color:"#C42759"},children:(0,n.jsx)(r.code,{children:"string"})})," ",(0,n.jsx)("div",{style:{float:"right",color:"#888888",fontSize:"10pt"},children:"Optional"})]}),(0,n.jsxs)(r.p,{children:["Moment until this ",(0,n.jsx)(r.code,{children:"PEBC.PowerConstraints"})," is valid. If valid_until is not present, there is no determined end time of this ",(0,n.jsx)(r.code,{children:"PEBC.PowerConstraints"}),"."]})]})]})})}function p(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},8453:(e,r,i)=>{i.d(r,{R:()=>s,x:()=>t});var d=i(6540);const n={},o=d.createContext(n);function s(e){const r=d.useContext(o);return d.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function t(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),d.createElement(o.Provider,{value:r},e.children)}}}]);