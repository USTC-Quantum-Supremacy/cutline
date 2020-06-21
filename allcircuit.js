const cutlineMain = require('./main.js')
let StructDataClass = cutlineMain.StructDataClass
let VisualClass = cutlineMain.VisualClass

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

list.map(v=>v.calCutLengthWithWedge_bitString())
let pv=sd.bitStringCircles.map((ps,ii,arr)=>{
    let pattern = ps[0]
    let mini=list.map(v=>v.wegde[pattern].length+0.01*v.unbalance).reduce((iMax, x, i, arr) => x < arr[iMax] ? i : iMax, 0)
    return [list[mini].wegde[pattern].length,mini,pattern]
})
let pi=pv.map(v=>v[0]).reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
let ssd=list[pv[pi][1]]
let spattern=pv[pi][2]
console.log(ssd.wegde[spattern])
console.log(ssd.removeList)