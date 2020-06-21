const cutlineMain = require('./main.js')
let StructDataClass = cutlineMain.StructDataClass

const exec = require('child_process').exec
// exec('echo 1',(err,stdout,stderr)=>console.log(err,stdout,stderr));
const fs = require('fs')

let sd=new StructDataClass();
sd.init({xsize:12,ysize:11}).initmap().loadChoosen([]).pickMaxArea().loadRemovedStart([]).pushPatterns().setSplit([])

let retstr=fs.readFileSync('./path3.txt',{encoding:'utf-8'})

function preProcessResult(resultStr,sd) {
    // 2 paths found
    // shortest length & unbalance: 2,1
    // qubits: 2, 1, 1, 2, 2, 3, 1, 4,
    // start,end: 2 4 3 1
    // ===2
    // 2,1: 2, 1, 1, 2, 2, 3, 1, 4,
    // 2,1: 2, 1, 1, 2, 3, 2, 2, 3, 1, 4,

    let check={}
    let last=[]
    let str=resultStr.split('===')[1]
    let lines=str.split('\n')
    for (let ii = 1; ii <= ~~lines[0]; ii++) {
        let a=eval('['+lines[ii].split(':')[1]+']')
        let b=a.map((v,i,a)=>{ return {x:v-1,y:a[i+1]-1}}).filter((v,i)=>i%2==0).map(v=>sd.getxy(v).qi).sort()
        if (check[JSON.stringify(b)]==null) {
            check[JSON.stringify(b)]=1
            last.push(b)
        }
    }
    return last
}

let result = preProcessResult(retstr,sd)

let list=[]
for (let index = 0; index < result.length; index++) {
    const removeList = result[index];
    list.push(sd.copy().setSplit(removeList))
}

sd.getBitStringCircles()

let patternMin={};
list.forEach((v,i,a)=>{
    console.log(`${i+1} of ${a.length}`)
    /** @type {import('./main.js').StructDataClass} */
    let csd=v
    csd.calCutLengthWithWedge_bitString()
    sd.bitStringCircles.forEach(ps=>{
        let pattern = ps[0]
        let length=csd.wegde[pattern].length+0.01*csd.unbalance
        if (patternMin[pattern]==null || length<patternMin[pattern].length) {
            patternMin[pattern]={
                split:csd.removeList,
                lengthInfo:csd.wegde[pattern],
                length:length,
            }
        }
    })
    delete a[i]
})

let pi=sd.bitStringCircles.map(ps=>patternMin[ps[0]].length).reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
let pattern=sd.bitStringCircles[pi][0]
console.log(JSON.stringify(patternMin[pattern].lengthInfo))
console.log(JSON.stringify(patternMin[pattern].split))