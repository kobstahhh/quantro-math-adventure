// Original synthesized cues: no downloaded recordings or external requests.
export const cues={
 correct:[{hz:783.99,at:0,duration:.28,gain:.12,type:'sine'},{hz:1046.5,at:.09,duration:.34,gain:.11,type:'sine'},{hz:1567.98,at:.1,duration:.22,gain:.025,type:'triangle'}],
 incorrect:[{hz:349.23,at:0,duration:.19,gain:.075,type:'triangle'},{hz:293.66,at:.14,duration:.26,gain:.07,type:'sine'}]
};
export function createAudio(Context=globalThis.AudioContext||globalThis.webkitAudioContext){
 let context;
 function unlock(settings){
  if(!settings.sound||!Context)return;
  try{if(!context||context.state==='closed')context=new Context();if(context.state==='suspended')context.resume().catch(()=>{});}catch{/* Sound is optional; gameplay still works. */}
 }
 function play(correct,settings){
  if(!settings.sound)return;
  const volume=Number.isFinite(settings.volume)?Math.max(0,Math.min(1,settings.volume)):.5;
  if(volume===0)return;
  unlock(settings);if(!context||context.state!=='running')return;
  try{
   const start=context.currentTime;
   for(const note of cues[correct?'correct':'incorrect']){
    const osc=context.createOscillator(),gain=context.createGain(),at=start+note.at,end=at+note.duration;
    osc.type=note.type;osc.frequency.setValueAtTime(note.hz,at);
    gain.gain.setValueAtTime(0,at);
    gain.gain.linearRampToValueAtTime(note.gain*volume,at+.012);
    gain.gain.exponentialRampToValueAtTime(.0001,end-.015);
    gain.gain.linearRampToValueAtTime(0,end);
    osc.connect(gain);gain.connect(context.destination);osc.start(at);osc.stop(end);
    osc.onended=()=>{osc.disconnect();gain.disconnect();};
   }
  }catch{/* Unsupported audio must never block answering. */}
 }
 return {unlock,play};
}
