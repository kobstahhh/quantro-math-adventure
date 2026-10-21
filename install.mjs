// Native installation is offered only when the browser exposes its install event.
let installPrompt,installing=false;
const control=document.createElement('button');
control.id='install-app';document.body.append(control);
const ua=navigator.userAgent;
const android=/Android/i.test(ua),ios=/iPhone|iPad|iPod/i.test(ua)||navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1;
const googleApp=/GSA\//i.test(ua),embedded=/; wv\)|\bwv\b|FBAN|FBAV|Instagram/i.test(ua);
const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone;
const message=document.createElement('div');message.id='install-status';message.setAttribute('role','status');message.style.cssText='position:fixed;bottom:70px;right:18px;max-width:min(340px,90vw);padding:16px;border-radius:12px;background:#153f32;color:white;z-index:10;font:14px/1.6 system-ui';message.hidden=true;document.body.append(message);
function label(){control.hidden=standalone();control.disabled=installing;control.textContent=installPrompt?'Install Quantro':android&&(googleApp||embedded)?'Open Chrome to install':ios?'Add Quantro to Home Screen':'Install Quantro';control.setAttribute('aria-label',control.textContent);}
function say(text){message.textContent=text;message.hidden=false;}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;message.hidden=true;label();});
window.addEventListener('appinstalled',()=>{installPrompt=null;control.hidden=true;say('Quantro is installed. Open it from your app icon.');});
control.addEventListener('click',async()=>{
 if(installing)return;
 if(installPrompt){const prompt=installPrompt;installPrompt=null;installing=true;label();try{await prompt.prompt();const choice=await prompt.userChoice;if(choice.outcome==='dismissed')say('Installation cancelled. You can try again from your browser menu.');}catch{say('Installation did not finish. Try your browser’s Install app option.');}finally{installing=false;label();}return;}
 if(android&&(googleApp||embedded)){const url=new URL(location.href);const intent='intent://'+url.host+url.pathname+url.search+'#Intent;scheme='+url.protocol.slice(0,-1)+';package=com.android.chrome;S.browser_fallback_url='+encodeURIComponent(url.href)+';end';location.assign(intent);return;}
 if(ios){say('Tap Share (the square with an up arrow), then Add to Home Screen. Apple requires this step.');return;}
 if(!window.isSecureContext){say('Open https://kobstahhh.github.io/quantro-math-adventure/ to install.');return;}
 say(android?'Tap your browser’s ⋮ menu, then Add to Home screen → Install. Your browser has not offered its automatic install prompt yet.':'Use the install icon beside your browser’s address bar. If it is missing, open the browser menu and choose Install Quantro.');
});
label();
