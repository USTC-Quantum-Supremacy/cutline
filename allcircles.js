const {StructDataClass} = require('./main.js')

const fs = require('fs')

let input=JSON.parse(fs.readFileSync('in/allcircles.json',{encoding:'utf-8'}))

let sd=new StructDataClass();

console.log(JSON.stringify(input,null,4))

sd.import(input)

sd.searchPath()

/** @type {(pf,patterns)=>import('./main.js').StructDataClass} */
let _calCutLengthWithWedge = sd._calCutLengthWithWedge

let _processPathsResult = sd._processPathsResult 

//// 指定pattern ////////////////////////////////////////////////////////////

/** @type {(patterns)=>import('./main.js').StructDataClass} */
let calCutLengthWithWedge = function (patterns) {
    let pf=(edge,pattern)=>edge.isPattern[pattern]
    _calCutLengthWithWedge.apply(this,[pf,patterns])
    return this
}

;(()=>{
    let func= calCutLengthWithWedge
    let pattern = sd.input.generatingCircuit[0].pattern
    let circles = [[pattern,pattern.slice(0,4)]]
    let output=_processPathsResult.apply(sd,[circles,func,false])
    console.log(output.maxofmin)
})();
//// 所有pattern ////////////////////////////////////////////////////////////

sd=new StructDataClass();
sd.import(input)

/** @type {(patterns)=>import('./main.js').StructDataClass} */
let calCutLengthWithWedge_bitString = function (patterns) {
    let pf=(edge,pattern)=>this.checkBitStringPattern(this.qi2xy(edge.q1),this.qi2xy(edge.q2),pattern)
    _calCutLengthWithWedge.apply(this,[pf,patterns])
    return this
}

let getAllMaxPattern = (circles,output)=>{
    let maxValue=output.maxofmin.search_max
    let patterns=circles.map((ps,i)=>[output.min[ps[0]].search_max,ps[0]]).filter(v=>v[0]===maxValue).map(v=>v[1])
    return patterns
}

;(()=>{
    let func= calCutLengthWithWedge_bitString
    sd.getBitStringCircles()
    let circles = sd.bitStringCircles 
    let output=_processPathsResult.apply(sd,[circles,func,true])
    console.log(output.maxofmin)
    console.log('\n===patterns===\n')
    console.log(JSON.stringify(getAllMaxPattern(circles,output)))
})();