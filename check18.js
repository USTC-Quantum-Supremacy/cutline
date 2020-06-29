const cutlineMain = require('./main.js')
const StructDataClass = cutlineMain.StructDataClass

const execSync = require('child_process').execSync

const fs = require('fs')

let input=JSON.parse(fs.readFileSync('in/check18.json',{encoding:'utf-8'}))

let sd=new StructDataClass();
sd.import(input,{part1:'[]'})

let unbalanceSearch=20

;(()=>{
    let [ta,tb]=[sd._max(),sd._min()];
    while (ta-tb<=unbalanceSearch) {
        ta++
        tb--
    }
    ta--
    tb++
    sd._max=()=>ta
    sd._min=()=>tb
})();

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


//// 指定pattern搜18层 ////////////////////////////////////////////////////////////
/** @type {(pf,patterns)=>import('./main.js').StructDataClass} */
let _calCutLengthWithWedge = function (pf,patterns) {
    this.getPotentialWedgeList()
    let wedge={}
    for (let pi = 0; pi < patterns.length; pi++) {
        const pattern = patterns[pi];
        let [pb,pc,pd,pa]=[pattern[1][0],pattern[1][1],pattern[2][0],pattern[2][1]]
        let ps={pb,pc,pd,pa}
        let cutLengthOfPattern={pb:0,pc:0,pd:0,pa:0}
        let edges=this.splitEdges
        for (const key in cutLengthOfPattern) {
            for (let ii = 0; ii < edges.length; ii++) {
                const ei = this.edge(edges[ii])
                if (pf(ei,ps[key])) {
                    cutLengthOfPattern[key]++
                }
            }
        }
        let depth=~~this.input.depth
        let cwedge1=this.calWedge(e=>pf(e,pb),e=>pf(e,pc))
        let cwedge2=this.calWedge(e=>pf(e,pd),e=>pf(e,pa))
        let cwedge=0
        let cut=0
        // 
        let tplpattern=this.input.searchPattern
        let i2pmap={}
        i2pmap[0]='pa'
        i2pmap[1]='pb'
        i2pmap[2]='pc'
        i2pmap[3]='pd'
        let i2p=index=>i2pmap[tplpattern[index%tplpattern.length]]
        for (let index = 0; index < depth; index++) {
            cut+=cutLengthOfPattern[i2p(index)]
            if (index>=1 && i2p(index-1)==='pb' && i2p(index)==='pc') {
                cwedge+=cwedge1
            }
            if (index>=1 && i2p(index-1)==='pd' && i2p(index)==='pa') {
                cwedge+=cwedge2
            }
        }
        wedge[pattern[0]]={
            length:cut-cwedge,
            cut:cut,
            wedge:cwedge,
            wedges:[cwedge1,cwedge2],
        }
    }
    this.wedge=wedge
    return this
}

let _processCResult = function (circles,func,showProgress) {
    let list=[]
    let result=this.CReturnPaths
    // let circles = this.circles 
    // let circles = this.bitStringCircles 
    // let func= this.calCutLengthWithWedge
    // let func = this.calCutLengthWithWedge_bitString
    /** @type {import('./main.js').StructDataClass} */
    let newins=new this.constructor().import(this.input,{part1:'[]'})
    for (let index = 0; index < result.length; index++) {
        const removeList = result[index];
        list.push(newins.copy().setSplit(removeList))
    }
    let patternMin={};
    list.forEach((v,i,a)=>{
        if(showProgress)console.log(`${i+1} of ${a.length}`);
        /** @type {import('./main.js').StructDataClass} */
        let csd=v
        func.call(csd)
        circles.forEach(ps=>{
            let pattern = ps[0]
            let search_min=csd.wedge[pattern].length+Math.log2(2**(csd.unbalance/4+csd.maxAreaCount/2)+2**(-csd.unbalance/4+csd.maxAreaCount/2))/2-Math.log2(2**Math.ceil(csd.maxAreaCount/2)+2**Math.floor(csd.maxAreaCount/2))/2
            let search_max=search_min
            if (patternMin[pattern]==null || search_min<patternMin[pattern].search_min) {
                patternMin[pattern]={
                    split:csd.removeList,
                    lengthInfo:csd.wedge[pattern],
                    search_min:search_min, // for min
                    search_max:search_max, // for max
                    unbalance:csd.unbalance,
                    pattern:ps,
                }
            }
        })
        delete a[i]
    })

    let pi=circles.map(ps=>patternMin[ps[0]].search_max).reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
    let pattern=circles[pi][0]
    newins.setSplit(patternMin[pattern].split)
    newins.patternMaxMin=patternMin[pattern]
    let output={
        maxofmin:patternMin[pattern],
        min:patternMin,
        instance:newins
    }
    return output
}

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
    let circles = [[pattern,pattern.slice(1,3),pattern.slice(5,7)]]
    sd.constructor.prototype.circles=circles
    let output=_processCResult.apply(sd,[circles,func,false])
    console.log(output.maxofmin)
})();
//// 所有pattern搜18层 ////////////////////////////////////////////////////////////

sd=new StructDataClass();
sd.import(input,{part1:'[]'})

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