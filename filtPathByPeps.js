const cutlineMain = require('./main.js')
const StructDataClass = cutlineMain.StructDataClass

const execSync = require('child_process').execSync

const fs = require('fs')

let input=JSON.parse(fs.readFileSync('in/filtPathByPeps.json',{encoding:'utf-8'}))

let sd=new StructDataClass();
sd.import(input,{part1:'[]'})


sd.generateCInput()
fs.writeFileSync('in/filtPathByPeps.in',sd.CInput)

let retstr=execSync('./run2 in/filtPathByPeps.in').toString()

sd.parseCResult(retstr)

let generateFormatPaths = function (params) {
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
        list.push(newins.copy().setSplit(removeList).splitEdges)
    }

    return list
}

let paths = generateFormatPaths.call(sd)
let circuit,cutText,mapText;
sd.generateCircuit(args=>{
    [circuit,cutText,mapText]=[args.circuit,args.cutText,args.mapText]
})

fs.writeFileSync('output/filtPathByPeps.txt',JSON.stringify({circuit,cutText,mapText,paths}))