(function(n,o){typeof exports=="object"&&typeof module<"u"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(n=typeof globalThis<"u"?globalThis:n||self,o(n.MessageWidget={}))})(this,function(n){"use strict";var _=Object.defineProperty;var x=(n,o,a)=>o in n?_(n,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[o]=a;var c=(n,o,a)=>(x(n,typeof o!="symbol"?o+"":o,a),a);const o=`
.widget__container * {
    box-sizing: border-box;
}
h3, p, input, textarea, button {
    margin: 0;
    padding: 0;
}
.widget__container {
    box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
    width: 400px;
    overflow: auto;
    position: fixed;
    right: 30px;
    bottom: 30px;
    transition: max-height .2s ease;
    font-family: Helvetica, Arial, sans-serif;
    background-color: #e6e6e6a6;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}
.widget__icon {
    cursor: pointer;
    transition: transform .3s ease;
    padding: 0;
    line-height: 1;
}
.button__container {
    border: none;
    background-color: #6B46C1; 
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    bottom: -30px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.widget__header {
    padding: 1rem 2rem;
    background-color: #6B46C1;
    color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
}
form {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.form__field label {
    font-size: 14px;
    margin-bottom: 8px;
}
.form__field input,
.form__field textarea {
    border: 1px solid #000000ad;
    border-radius: 3px;
    padding: 10px;
    background-color: #fff;
}
.form__field input {
    height: 40px;
}
.form__field textarea {
    height: 100px;
    resize: vertical;
}
form button {
    height: 48px;
    border-radius: 6px;
    font-size: 16px;
    background-color: #6B46C1;
    color: #fff;
    border: none;
    cursor: pointer;
}
form button:hover {
    background-color: rgba(107, 70, 193, 0.85);
}
.messages__container {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
    margin-bottom: 10px;
}
.chat__input {
    flex-grow: 1;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
}
.chat__submit {
    width: auto;
    padding: 0 20px;
}
.widget__hidden {
    display: none;
}
`,a=`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
`,p=`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
`;class m{constructor(e="bottom-right",i="Welcome to Rejoy Chat",t,s){c(this,"lastMessageElement",null);c(this,"isNewMessage",!0);c(this,"position","");c(this,"open",!1);c(this,"widgetContent",null);this.position=this.getPosition(e),this.welcomeMessage=i,this.orgId=t,this.projectId=s,this.open=!1,this.initialize(),this.injectStyles()}getPosition(e){const[i,t]=e.split("-");return{[i]:"30px",[t]:"30px"}}async initialize(){const e=document.createElement("div");e.style.position="fixed",Object.keys(this.position).forEach(r=>e.style[r]=this.position[r]),document.body.appendChild(e);const i=document.createElement("button");i.classList.add("button__container");const t=document.createElement("span");t.innerHTML=a,t.classList.add("widget__icon"),this.widgetIcon=t;const s=document.createElement("span");s.innerHTML=p,s.classList.add("widget__icon","widget__hidden"),this.closeIcon=s,i.appendChild(this.widgetIcon),i.appendChild(this.closeIcon),i.addEventListener("click",this.toggleOpen.bind(this)),this.widgetContainer=document.createElement("div"),this.widgetContainer.classList.add("widget__hidden","widget__container"),this.createWidgetContent(),e.appendChild(this.widgetContainer),e.appendChild(i),this.setupEventListeners()}createWidgetContent(){this.widgetContainer.innerHTML=`
          <header class="widget__header">
          <h3>${this.welcomeMessage}</h3>
      </header>
      <div class="messages__container"></div> <!-- Container for chat messages -->
      <form id="chatForm" class="chat__form">
          <input
              type="text"
              id="chatMessage"
              name="message"
              placeholder="Type your message here..."
              class="chat__input"
              autocomplete="off" /> <!-- Improved input field for typing messages -->
          <button type="submit" class="chat__submit">Send</button>
      </form>
    `}injectStyles(){const e=document.createElement("style");e.innerHTML=o.replace(/^\s+|\n/gm,""),document.head.appendChild(e)}toggleOpen(){this.open=!this.open,this.open?(this.widgetIcon.classList.add("widget__hidden"),this.closeIcon.classList.remove("widget__hidden"),this.widgetContainer.classList.remove("widget__hidden")):(this.createWidgetContent(),this.widgetIcon.classList.remove("widget__hidden"),this.closeIcon.classList.add("widget__hidden"),this.widgetContainer.classList.add("widget__hidden"))}setupEventListeners(){document.getElementById("chatForm").addEventListener("submit",async i=>{i.preventDefault();const t=document.getElementById("chatMessage"),s=t.value.trim();if(s){try{await this.fetchChatResponse(s)}catch(r){console.error("Failed to fetch chat response.",r)}t.value=""}})}async fetchChatResponse(e){if(console.log("Input message: ",e),!e.trim())return;this.isNewMessage=!0,this.displayMessage(e,!0);const i=new URLSearchParams({query:e,project_id:this.projectId,org_id:this.orgId}),t=await fetch(`https://rejoy-dp-7wy44zlxvq-uc.a.run.app/generate_response?${i}`,{method:"POST",headers:{"Content-Type":"application/json","X-Rejoy-Widget-Identifier":"rejoy-widget-identifier"}});if(t.body){const s=t.body.getReader();let r="";try{for(;;){const{done:l,value:f}=await s.read();if(l)break;r+=new TextDecoder().decode(f,{stream:!0});try{let d=r.indexOf(`
`)+1;for(;d;){const w=r.slice(0,d-1);r=r.slice(d);const h=JSON.parse(w);h.text&&(this.isNewMessage?(this.displayMessage(h.text,!1),this.isNewMessage=!1):this.lastMessageElement.textContent+=h.text),d=r.indexOf(`
`)+1}}catch(d){console.error("Error parsing JSON:",d)}}}catch(l){console.error("Streaming error:",l)}finally{s.releaseLock()}}}displayMessage(e,i){const t=this.widgetContainer.querySelector(".messages__container"),s=document.createElement("div");s.textContent=e,s.className=i?"user-message":"bot-message",t.appendChild(s),this.lastMessageElement=s,t.scrollTop=t.scrollHeight}}function u(g="bottom-right",e="Welcome to Rejoy Chat",i,t){return new m(g,e,i,t)}window.initializeWidget=u,n.CLOSE_ICON=p,n.MESSAGE_ICON=a,n.styles=o,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
