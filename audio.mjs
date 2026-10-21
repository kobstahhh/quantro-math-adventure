// Original synthesized cues. Feature-detected Apple playback session; no microphone.
export const cues={
 correct:[{hz:783.99,at:0,duration:.32,gain:.24,type:'sine'},{hz:1046.5,at:.1,duration:.38,gain:.22,type:'sine'},{hz:1567.98,at:.11,duration:.25,gain:.05,type:'triangle'}],
 incorrect:[{hz:349.23,at:0,duration:.21,gain:.15,type:'triangle'},{hz:293.66,at:.15,duration:.28,gain:.14,type:'sine'}]
};
export function createAudio(Context=globalThis.AudioContext||globalThis.webkitAudioContext,nav=globalThis.navigator){
 let context,pending;
 function unlock(settings){
  if(!settings.sound||!Context)return Promise.resolve(false);
  try{
   // Apple can route Web Audio through the silent/ringer channel by default.
   try{if(nav?.audioSession)nav.audioSession.type='playback';}catch{}
   if(!context||context.state==='closed')context=new Context();
   if(context.state==='running')return Promise.resolve(true);
   if(pending)return pending;
   // resume() must be called synchronously within the tap/submit event.
   const resume=context.resume();
   if(context.createBuffer&&context.createBufferSource){const source=context.createBufferSource();source.buffer=context.createBuffer(1,1,22050);source.connect(context.destination);source.start(0);source.onended=()=>source.disconnect();}
   let timer;
   pending=Promise.race([Promise.resolve(resume).then(()=>context.state==='running'),new Promise(resolve=>{timer=setTimeout(()=>resolve(false),2000);})]).catch(()=>false).finally(()=>{clearTimeout(timer);pending=null;});
   return pending;
  }catch{return Promise.resolve(false);}
 }
 async function play(correct,settings){
  if(!settings.sound)return false;
  const volume=Number.isFinite(settings.volume)?Math.max(0,Math.min(1,settings.volume)):.65;
  if(volume===0)return false;
  if(!await unlock(settings))return false;
  try{
   const start=context.currentTime+.01;
   for(const note of cues[correct?'correct':'incorrect']){
    const osc=context.createOscillator(),gain=context.createGain(),at=start+note.at,end=at+note.duration;
    osc.type=note.type;osc.frequency.setValueAtTime(note.hz,at);
    gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(note.gain*volume,at+.012);
    gain.gain.exponentialRampToValueAtTime(.0001,end-.015);gain.gain.linearRampToValueAtTime(0,end);
    osc.connect(gain);gain.connect(context.destination);osc.start(at);osc.stop(end);
    osc.onended=()=>{osc.disconnect();gain.disconnect();};
   }
   return true;
  }catch{return false;}
 }
 return {unlock,play,status:()=>({supported:!!Context,state:context?.state||'not-started'})};
}
