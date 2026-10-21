import {curriculum,questions} from './curriculum.mjs';
import {equal} from './math.mjs';
export function initialState(){return {version:1,mascot:'lion',grade:3,xp:0,coins:0,answers:{},mistakes:[],badges:[],daily:{},settings:{sound:true,reducedMotion:false}};}
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
export function validState(s){return s?.version===1&&['lion','turtle','boy','girl'].includes(s.mascot)&&Number.isInteger(s.grade)&&s.grade>=3&&s.grade<=8&&Number.isSafeInteger(s.xp)&&s.xp>=0&&Number.isSafeInteger(s.coins)&&s.coins>=0&&object(s.answers)&&Object.entries(s.answers).every(([id,a])=>id.length<100&&object(a)&&typeof a.correct==='boolean'&&Number.isSafeInteger(a.attempts)&&a.attempts>0)&&Array.isArray(s.mistakes)&&s.mistakes.every(x=>typeof x==='string')&&Array.isArray(s.badges)&&s.badges.every(x=>typeof x==='string')&&object(s.daily)&&Object.values(s.daily).every(x=>x===true)&&object(s.settings)&&typeof s.settings.sound==='boolean'&&typeof s.settings.reducedMotion==='boolean'&&(s.settings.volume===undefined||typeof s.settings.volume==='number'&&s.settings.volume>=0&&s.settings.volume<=1)&&(s.onboarded===undefined||typeof s.onboarded==='boolean')&&(s.selectedTopic===undefined||typeof s.selectedTopic==='string');}
export function preferences(state,{grade=state.grade,mascot=state.mascot}={}){const next={...state,grade,mascot};if(!validState(next))throw Error('Invalid preferences');return next;}
export function answer(state,topicId,questionId,input){
 if(!validState(state))throw Error('Invalid progress');
 const topic=curriculum.find(t=>t.id===topicId&&t.grade===state.grade);if(!topic)throw Error('Topic does not belong to selected grade');
 const q=questions(topicId).find(q=>q.id===questionId);if(!q)throw Error('Unknown question');
 const next=structuredClone(state),correct=equal(input,q.answer),old=next.answers[q.id];
 if(old?.correct)return {state:next,correct:true,reward:0,explanation:q.explanation};
 next.answers[q.id]={correct,attempts:(old?.attempts||0)+1};
 if(correct){next.xp+=q.points;next.coins+=2;next.mistakes=next.mistakes.filter(id=>id!==q.id);next.streak=(next.streak||0)+1;}
 else if(!next.mistakes.includes(q.id))next.mistakes.push(q.id);
 if(!correct)next.streak=0;
 if(next.streak>=5&&!next.badges.includes('streak-five'))next.badges.push('streak-five');
 if(correct&&(old?.attempts||0)>=2&&!next.badges.includes('persistent-solver'))next.badges.push('persistent-solver');
 const done=questions(topicId).filter(q=>next.answers[q.id]?.correct).length;
 if(done===20&&!next.badges.includes(`mission:${topicId}`))next.badges.push(`mission:${topicId}`);
 return {state:next,correct,reward:correct?q.points:0,hint:q.hint,explanation:q.explanation,completed:done===20};
}
