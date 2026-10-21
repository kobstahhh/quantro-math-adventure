export const curriculum = [
  {grade:3,id:'number-trail',world:'Number Kingdom',title:'Addition and subtraction',status:'provisional'},
  {grade:4,id:'supply-station',world:'Number Kingdom',title:'Multiplication and division',status:'provisional'},
  {grade:5,id:'fraction-bridge',world:'Fraction Forest',title:'Equivalent fractions',status:'provisional'},
  {grade:6,id:'frost-path',world:'Number Kingdom',title:'Integers on a number line',status:'provisional'},
  {grade:7,id:'market-mission',world:'Money Masters',title:'Percentages',status:'provisional'},
  {grade:8,id:'equation-gate',world:'Algebra Academy',title:'Linear equations',status:'provisional'}
];
export function questions(topicId){
 const topic=curriculum.find(t=>t.id===topicId);if(!topic)throw Error('Unknown topic');
 return Array.from({length:20},(_,i)=>{
  const a=i+3,b=i%5+2;let prompt,answer,hint,explanation;
  switch(topic.grade){
   case 3: prompt=i%2?`The explorer has ${a+12} keys and uses ${b}. How many remain?`:`Collect ${a} blue gems and ${b} gold gems. How many altogether?`;answer=i%2?a+12-b:a+b;hint=i%2?'Subtract the keys used.':'Add the two groups.';explanation=i%2?`${a+12} − ${b} = ${answer}`:`${a} + ${b} = ${answer}`;break;
   case 4:prompt=i%2?`Share ${a*b} supplies equally among ${b} teams. How many per team?`:`Pack ${a} crates with ${b} supplies each. How many supplies?`;answer=i%2?a:a*b;hint=i%2?'Divide the total by the teams.':'Multiply crates by supplies per crate.';explanation=i%2?`${a*b} ÷ ${b} = ${a}`:`${a} × ${b} = ${a*b}`;break;
   case 5:prompt=`Complete the bridge: ${a}/${a+b} = ?/${(a+b)*2}`;answer=a*2;hint='The denominator was doubled. Do the same to the numerator.';explanation=`Multiplying numerator and denominator by 2 gives ${a*2}/${(a+b)*2}.`;break;
   case 6:prompt=`Start at ${-a} on the frozen path and move ${b} steps right. Where do you land?`;answer=-a+b;hint='Moving right adds to the starting number.';explanation=`${-a} + ${b} = ${answer}`;break;
   case 7:prompt=`A market chest holds ₹${a*100}. Find ${b*5}% of its value.`;answer=a*b*5;hint='Divide by 100, then multiply by the percentage.';explanation=`${a*100} × ${b*5}/100 = ₹${answer}`;break;
   case 8:prompt=`Open the gate: ${b}x + ${a} = ${b*(a+1)+a}. Find x.`;answer=a+1;hint=`Subtract ${a} from both sides, then divide by ${b}.`;explanation=`${b}x = ${b*(a+1)}, so x = ${a+1}.`;
  }
  return {id:`${topicId}-${i}`,topicId,grade:topic.grade,prompt,answer:String(answer),hint,explanation,difficulty:i<7?'easy':i<14?'medium':'hard',format:'number',points:10};
 });
}
