// Exact rational arithmetic. No eval, runtime AI, or floating point comparison.
export function rational(input) {
  const s=String(input).trim();
  if(s.length>100) throw Error('Answer too long');
  let n,d;
  if (/^[+-]?\d+\s*\/\s*[+-]?\d+$/.test(s)) [n,d]=s.split('/').map(x=>BigInt(x.trim()));
  else if (/^[+-]?\d+(\.\d+)?$/.test(s)) {const [a,b='']=s.split('.');d=10n**BigInt(b.length);n=BigInt(a+b);}
  else throw Error('Enter a number, decimal, or fraction');
  if(d===0n) throw Error('Denominator cannot be zero');
  if(d<0n){n=-n;d=-d;}
  return [n,d];
}
export function equal(a,b){try{const [n,d]=rational(a),[x,y]=rational(b);return n*y===x*d;}catch{return false;}}
