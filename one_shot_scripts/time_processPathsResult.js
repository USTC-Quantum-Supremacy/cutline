const {StructDataClass} = require('../main.js')
const fs = require('fs')

const inputs=JSON.parse(fs.readFileSync('../in/generateCircuit.json',{encoding:'utf-8'}))

function time1(input,depth,balancedRange,loglevel) {
    // ref: one_shot_scripts/calculate.js
    var sd=new StructDataClass();
    sd.import(input)

    sd.input.depth=''+depth
    sd.input.balancedRange=balancedRange
    sd.input.generatingCircuit[0].pattern = "IJKLKLIJIJKLKLIJIJKLKLIJIJKLKLIJIJKLKLIJIJKLKLIJIJKLKLIJIJKLKLIJIJKLKLIJIJKLKLIJIJKLKLIJ".slice(0,depth)

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

    // pepsPath.js#L146
    let t0=new Date()-0
    sd.searchPath()

    var tsd=new sd.constructor().import(sd.input,{brokenBits:JSON.stringify(broken),searchPattern,showPattern})

    sd=tsd
    sd.circles=[['IJKLKLIJ','IJKL']]

    let output = sd.processPathsResult()
    let ssd=output.instance
    ssd.calExpectation()
    let sfacost=ssd.expectation[3]/ssd.expectation[0]

    let time=(new Date()-t0)

    if (loglevel?.pathsSplit) console.log(ssd.pathsSplit.length) 
    if (loglevel?.input) console.log(JSON.stringify(ssd.input))
    if (loglevel?.shortreturn) return [sfacost]
    
    return ['sfa (n1-n2 <=',balancedRange,'): time',time,'ms, cost',sfacost,'\nsfa search information (n1-n2 <=',balancedRange,'): ',JSON.stringify(output.maxofmin)]

}

function time2(input,depth,balancedRange,loglevel) {
    let t0=new Date()-0
    let totalnum=loglevel?.num||10
    for (let index = 0; index < totalnum; index++) {
        var ret=time1(input,depth,balancedRange,loglevel)
    }
    let time=(new Date()-t0)
    ret[3]=time/totalnum
    console.log(ret.join(' '))
}

if (0) {
time2(inputs[9],20,6)
time2(inputs[9],20,14)
time2(inputs[9],20,20)
time2(inputs[6],16,6)
time2(inputs[6],16,14)
time2(inputs[6],16,20)
time2(inputs[6],24,6)
time2(inputs[6],24,14)
time2(inputs[6],24,20)
time2(inputs[4],16,6)
time2(inputs[4],16,14)
time2(inputs[4],16,20)
time2(inputs[4],24,6)
time2(inputs[4],24,14)
time2(inputs[4],24,20)
}
if(0){
for (const ii of [9,10,11,12,13,14,15]) time2(inputs[ii],20,6,{shortreturn:1,num:1,input:0,pathsSplit:0})
for (const ii of [9,10,11,12,13,14,15]) time2(inputs[ii],20,14,{shortreturn:1,num:1,input:0,pathsSplit:0})
for (const ii of [9,10,11,12,13,14,15]) time2(inputs[ii],20,20,{shortreturn:1,num:1,input:0,pathsSplit:0})

}
if(1){
let a=(ii,dd)=>{
    time2(inputs[ii],dd,6,{shortreturn:1,num:1,input:0,pathsSplit:0})
    time2(inputs[ii],dd,14,{shortreturn:1,num:1,input:0,pathsSplit:0})
    time2(inputs[ii],dd,20,{shortreturn:1,num:1,input:0,pathsSplit:0})
}
a(8,16)
a(8,24)
a(4,16)
a(4,24)
a(6,24)
a(6,16)
a(7,24)
a(7,16)

}