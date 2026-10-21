import {curriculum,questions} from './curriculum.mjs';
export function gradeTopics(grade){return curriculum.filter(t=>t.grade===grade);}
export function dailyKey(grade,date){return `g${grade}:${date}`;}
export function selectQuestions(state,topic,mode,date){
 const qs=questions(topic.id),pool=gradeTopics(state.grade).flatMap(t=>questions(t.id));
 if(mode==='daily'){const seed=Number(date.replaceAll('-',''));return Array.from({length:5},(_,i)=>pool[(seed+i*37)%pool.length]);}
 if(mode==='revision')return pool.filter(q=>state.mistakes.includes(q.id));
 if(mode==='boss')return qs.slice(15,20);
 if(mode==='puzzle'){const patterns=gradeTopics(state.grade).find(t=>['patterns','algebra','identities'].includes(t.kind));return questions(patterns?.id||topic.id).slice(8,13);}
 if(mode==='practice')return qs;
 return qs.filter(q=>!state.answers[q.id]?.correct).slice(0,5);
}
export function topicProgress(state,id){return questions(id).filter(q=>state.answers[q.id]?.correct).length;}
export function worldOpen(state,world){const worlds=[...new Set(gradeTopics(state.grade).map(t=>t.world))],i=worlds.indexOf(world);return i<=0||gradeTopics(state.grade).filter(t=>t.world===worlds[i-1]).some(t=>topicProgress(state,t.id)>=5);}
