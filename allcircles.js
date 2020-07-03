const cutlineMain = require('./main.js')
const StructDataClass = cutlineMain.StructDataClass

const fs = require('fs')

let input=JSON.parse(fs.readFileSync('in/allcircles.json',{encoding:'utf-8'}))

let sd=new StructDataClass();

console.log(JSON.stringify(input,null,4))

sd.import(input)


sd.searchPath()

// // 生成线路,cut,map,paths
// let generateFormatPaths = function (params) {
//     let list=[]
//     let result=this.CReturnPaths
//     let circles = this.circles 
//     circles = this.bitStringCircles 
//     let func= this.calCutLengthWithWedge
//     func = this.calCutLengthWithWedge_bitString
//     /** @type {import('./main.js').StructDataClass} */
//     let newins=new this.constructor().import(this.input,{part1:'[]'})
//     for (let index = 0; index < result.length; index++) {
//         const removeList = result[index];
//         list.push(newins.copy().setSplit(removeList).splitEdges)
//     }
//     return list
// }
// let paths = generateFormatPaths.call(sd)
// let circuit,cutText,mapText;
// sd.generateCircuit(args=>{
//     [circuit,cutText,mapText]=[args.circuit,args.cutText,args.mapText]
// })
// fs.writeFileSync('output/check18.txt',JSON.stringify({circuit,cutText,mapText,paths}))


/** @type {(pf,patterns)=>import('./main.js').StructDataClass} */
let _calCutLengthWithWedge = sd._calCutLengthWithWedge

let _processCResult = sd._processCResult 

//// 指定pattern ////////////////////////////////////////////////////////////

/** @type {()=>import('./main.js').StructDataClass} */
let calCutLengthWithWedge = function (params) {
    let pf=(edge,pattern)=>edge['isPattern_'+pattern]
    let patterns=this.circles
    _calCutLengthWithWedge.apply(this,[pf,patterns])
    return this
}

;(()=>{
    let func= calCutLengthWithWedge
    let pattern = sd.input.generatingCircuit[0].pattern
    let circles = [[pattern,pattern.slice(0,4)]]
    sd.constructor.prototype.circles=circles
    let output=_processCResult.apply(sd,[circles,func,false])
    console.log(output.maxofmin)
})();
//// 所有pattern ////////////////////////////////////////////////////////////

sd=new StructDataClass();
sd.import(input)

/** @type {()=>import('./main.js').StructDataClass} */
let calCutLengthWithWedge_bitString = function (params) {
    let pf=(edge,pattern)=>this.checkBitStringPattern(this.qi2xy(edge.q1),this.qi2xy(edge.q2),pattern)
    let patterns=this.bitStringCircles
    _calCutLengthWithWedge.apply(this,[pf,patterns])
    return this
}
;(()=>{
    let func= calCutLengthWithWedge_bitString
    sd.getBitStringCircles()
    let circles = sd.bitStringCircles 
    let output=_processCResult.apply(sd,[circles,func,true])
    console.log(output.maxofmin)
})();