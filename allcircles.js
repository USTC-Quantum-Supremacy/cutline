const cutlineMain = require('./main.js')
const StructDataClass = cutlineMain.StructDataClass

const execSync = require('child_process').execSync

const fs = require('fs')

// 'todo: get input from file';
let input={"type":"prog","xsize":"12","ysize":"11","use00":true,"brokenBits":"[]","part1":"[]","depth":"20","errorRates":"[0.0016,0.0062,0.038]","removedEntrances":"[]","search":"prune","generatingCircuit":[{"type":"generatingCircuitNone"}],"showMark":[{"type":"markNone"}],"showPattern":[{"type":"patternNone"}]};

let sd=new StructDataClass();
sd.import(input,{part1:'[]'})


sd.generateCInput()
fs.writeFileSync('in/allcircles.in',sd.CInput)

// let retstr=fs.readFileSync('./path4.txt',{encoding:'utf-8'})
let retstr=execSync('run2 in/allcircles.in').toString()

sd.parseCResult(retstr)

let processCResult = function (params) {
    let list=[]
    let result=this.CReturnPaths
    let circles = this.circles 
    circles = this.bitStringCircles 
    let func= this.calCutLengthWithWedge
    func = this.calCutLengthWithWedge_bitString
    /** @type {StructDataClass} */
    let newins=new this.constructor().import(this.input,{part1:'[]'})
    for (let index = 0; index < result.length; index++) {
        const removeList = result[index];
        list.push(newins.copy().setSplit(removeList))
    }
    let patternMin={};
    list.forEach((v,i,a)=>{
        console.log(`${i+1} of ${a.length}`)
        /** @type {StructDataClass} */
        let csd=v
        func.call(csd)
        circles.forEach(ps=>{
            let pattern = ps[0]
            let length=csd.wegde[pattern].length+0.01*csd.unbalance
            if (patternMin[pattern]==null || length<patternMin[pattern].length) {
                patternMin[pattern]={
                    split:csd.removeList,
                    lengthInfo:csd.wegde[pattern],
                    length:length,
                    pattern:ps,
                }
            }
        })
        delete a[i]
    })

    let pi=circles.map(ps=>patternMin[ps[0]].length).reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
    let pattern=circles[pi][0]
    let output={
        maxofmin:patternMin[pattern],
        min:patternMin,
        instance:newins.setSplit(patternMin[pattern].split)
    }
    return output
}


sd.getBitStringCircles()

let output = processCResult.call(sd)

console.log(output.min)
console.log(output.maxofmin)

