var p='I'
var s1='q2'
var s2='q1'
var getOne=(p,s1,s2)=>sd.maxAreaEdges.map(v=>sd.edge(v)).filter(v=>v.isPattern[p]).map(v=>'G'+('00'+v[s1]).slice(-2)+('00'+v[s2]).slice(-2))

var output=''
for (const p of ['I','J','K','L']) {
    output += p
    output += '\n'
    output += JSON.stringify(getOne(p,'q1','q2'))
    output += '\n'
}
for (const p of ['I','J','K','L']) {
    output += p
    output += '\n'
    output += JSON.stringify(getOne(p,'q2','q1'))
    output += '\n'
}
console.log(output);