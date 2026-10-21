import {curriculum as starters,questions as starterQuestions} from './starter-content.mjs';
import {extraTopics,extraQuestions} from './topic-library.mjs';
export const curriculum=starters.flatMap(t=>[t,...extraTopics.filter(x=>x.grade===t.grade)]);
export function questions(id){const t=curriculum.find(t=>t.id===id);if(!t)throw Error('Unknown topic');return t.kind?extraQuestions(t):starterQuestions(id);}
