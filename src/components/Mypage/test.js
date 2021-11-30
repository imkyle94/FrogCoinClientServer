let a = [{value:1, name:'name'},{value:2, name:'name1'},{value:3, name:'name2', price :100},]

let b = [{value:2, name:'name3'}, {value:7, name:'name2'}, {value:7, name:'name4'}]
let d = [{value:2, name:'name5'}, {value:7, name:'name2'}, {value:7, name:'name4'}]

let c = [...a, ...b, ...d]

c.sort((x,y)=>x.name.localeCompare(y.name));

// c.forEach((el,i)=>{
//   if(i<c.length-1){
//     if(el.name===c[i+1].name){
//       el.value += c[i+1].value;
//       c.splice(i+1,1)
//       i-=1;
//     }
//   }
// })
function sorting (arr, key) {
	arr.sort((a,b)=>{
    if(typeof a[key] == 'string'){
      let A = a[key].toUpperCase();
      let B = b[key].toUpperCase();
      return A.localeCompare(B)
    } else {
      let A = a[key];
      let B = b[key];
      return A-B
    }
  });
}
sorting(b,'value')
console.log(b);

function addExchange (arr, exchange) {
	return arr.map(el => (
		el = {...el, exchange: exchange}
	))
}

for (let i = 0; i < c.length; i++) {
  if(i<c.length-1){
    if(c[i].name === c[i+1].name ){
      c[i].value += c[i+1].value;
      c.splice(i+1,1);
      i-=1;
    }
  }
  
}

c = addExchange(c, 'upbit')
console.log(c)

const x = {
  '1inch': { krw: 4604.65, usd: 3.89 },
  apenft: { krw: 0.00622756, usd: 0.00000527 },
  auction: { krw: 38772, usd: 32.8 },
  flow: { krw: 14986.51, usd: 12.68 }
}

console.log(x['apenft']);