const {StructDataClass} = require('./main.js')
const fs = require('fs')

const xlsxObj=JSON.parse(fs.readFileSync('output/circuits.json',{encoding:'utf-8'}))
const taskDisplay=xlsxObj.data[0]
const fields=taskDisplay[0]

fields.push('count','show','split','expectation')

taskDisplay.slice(1).forEach(line => {
    const task=JSON.parse(line[fields.indexOf('task')])
    const input=JSON.parse(line[fields.indexOf('input')])
    if (task.target.indexOf('EXP')===-1) {
        line.push(0,'','','')
    } else {
        pushLine(task,input,line)
    }
})

function pushLine(task,input,line) {

    // ref: one_shot_scripts/calculate.js
    var sd=new StructDataClass();
    sd.import(input)

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
    var tsd=new sd.constructor().import(sd.input,{brokenBits:JSON.stringify(broken),searchPattern,showPattern})

    sd=tsd
    sd.constructor.prototype.pathsSplit=[sd.removeList]
    sd.circles=[['IJKLKLIJ','IJKL']]

    let output = sd.processPathsResult()
    let ssd=output.instance
    ssd.calExpectation()

    let count = ssd.expectation[1]
    line.push(count,JSON.stringify(ssd.input),JSON.stringify(output.maxofmin),JSON.stringify(ssd.expectation))

}

fs.writeFileSync('output/circuits_xlsx.json',JSON.stringify(xlsxObj,null,4),{encoding:'utf-8'})