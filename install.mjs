// Browsers control whether and when installation is available.
let installPrompt;
const control=document.createElement('button');
control.id='install-app';control.textContent='Install Quantro ↗';
control.setAttribute('aria-label','Install Quantro app');
document.body.append(control);
function standalone(){return matchMedia('(display-mode: standalone)').matches||navigator.standalone;}
control.hidden=standalone();
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;control.hidden=false;});
window.addEventListener('appinstalled',()=>{installPrompt=null;control.hidden=true;});
control.addEventListener('click',async()=>{
 if(installPrompt){const prompt=installPrompt;installPrompt=null;await prompt.prompt();await prompt.userChoice;return;}
 const dialog=document.createElement('dialog');
 const secure=window.isSecureContext;
 dialog.innerHTML=`<h2>Take Quantro with you.</h2><p>${secure?'In Chrome or Edge, open the browser menu and choose Install Quantro or Install this page as an app. On iPhone or iPad, open in Safari, tap Share, then Add to Home Screen.':'Phone installation needs an HTTPS address. This local-network HTTP address supports browser play only.'}</p><p>The Codex preview browser may not offer installation. Open this address in your normal browser. On another device, localhost points to that device, not this computer.</p><p>Open once online to cache the game before playing offline. Progress stays in the browser where you played; export a backup before moving devices.</p><button class="primary">Got it</button>`;
 document.body.append(dialog);dialog.querySelector('button').onclick=()=>dialog.close();dialog.addEventListener('close',()=>dialog.remove());dialog.showModal();
});
