buildMainSVG()
var sourcesd=sd
var sourceinput=sd.input

var orderList=eval(sd.input.generatingCircuit[0].order[0].order)
var n=sd.input.generatingCircuit[0].qubitNumber
var bitCount=sd.bitCount
var qubits=orderList.slice(0,n)
n=qubits.length
var searchPattern = Array.from(sd.input.generatingCircuit[0].pattern).map(v=>({I:0,J:1,K:2,L:3,M:0,N:1,O:2,P:3})[v]).join('')
var patternType=({I:0,J:0,K:0,L:0,M:1,N:1,O:1,P:1})[sd.input.generatingCircuit[0].pattern[0]]
var showPattern=sd.input.showPattern.slice(0,8)
if (patternType) {
    showPattern=showPattern.slice(4)
    showPattern[0].pattern='I'
    showPattern[1].pattern='J'
    showPattern[2].pattern='K'
    showPattern[3].pattern='L'
}
var broken=Array.from({length:sd.bitCount}).map((v,i)=>i).filter(v=>qubits.indexOf(v)===-1)

var tsd=new sd.constructor().import(sd.input,{brokenBits:JSON.stringify(broken),searchPattern,showPattern})
blocklyinput.value=JSON.stringify(tsd.input,null,4)

buildMainSVG()
calulate()