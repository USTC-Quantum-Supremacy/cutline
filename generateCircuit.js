// node generateCircuit.js

// node jsfile a1
if (false) { // process.argv.length==2
    console.log(`
node generateCircuit.js depth qubitNumber pattern [outputfile]
node generateCircuit.js 15 66 EFGH
node generateCircuit.js 15 60 IJCDCDIJ abc.txt
    `)
}

const cutlineMain = require('./main.js')
const StructDataClass = cutlineMain.StructDataClass
const fs = require('fs')

let tplInput=JSON.parse(fs.readFileSync('in/generateCircuit.json',{encoding:'utf-8'}))
let inputs=[tplInput]


let peps=JSON.parse(fs.readFileSync('peps_path/reverted.json',{encoding:'utf-8'}))
let tasks=[
    {n:[37,40,45,50,55,60,66],d:[4,5,6,7,8,9,10],p:'EFGH',s:'circuit/sycamore{n}_{d}_EFGH.txt'},
    {n:[37,40,45,50,55,60,66],d:[4,5,6,7,8,9,10],p:'IJCDCDIJ',s:'circuit/sycamore{n}_{d}_IJCD.txt'},
    {n:[20,25,30,35,40,45,50,55,60],d:[2,3],p:'IJCDCDIJ',s:'circuit/sycamore{n}_{d}_IJCD.txt'},
    {n:[60,66],d:[20],p:'EFGH',s:'circuit/sycamore{n}_{d}_EFGH.txt'},
    {n:[60,66],d:[20],p:'IJCDCDIJ',s:'circuit/sycamore{n}_{d}_IJCD.txt'},
    {n:[37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,66],d:[1],p:'IJCDCDIJ',c:'peps_path/sycamore{n}_cut.txt'},
    {n:[66],d:[1],p:'IJCDCDIJ',m:'peps_path/sycamore.txt'},
    //
    // PEPS Verification
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IJKLKLIJ',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt'},   
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IJKLKLIJ',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt'},  
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IIJJKKLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt'},  
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IJKLKLIJ',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt'},
    // PEPS supremacy
    {n:[60],d:[12],p:'IIIJJJKKKLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt'},
    {n:[60],d:[14],p:'IIIIJJJKKKLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt'},   
    {n:[60],d:[16],p:'IIIIJJJJKKKKLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt'},
    {n:[60],d:[18],p:'IIIIIJJJJKKKKLLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt'}, 
    // SFA
    {n:[60],d:[12,16,18],p:'IJKLKLIJIJKLKLIJIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt'},   
    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt'}, 
    {n:[60],d:[12,16,18],p:'IJKLKLIJIJKLKLIJIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt'},  
    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt'}, 
    {n:[60],d:[12,16,18],p:'IJKLKLIJIJKLKLIJIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt'}, 
    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt'},    
    


]

/* 
elided 4 layer 待加入生成
12：ABCDCDABABCD;   
14: ABCDCDABABCDCB; ?
14: ABCDCDABABCDAD; ?
16：ABCDCDABABCDCDAB; 
18：ABCDCDABABCDCDABCB; x
18：ABCDCDABABCDCDABAD; v

*/

inputs=[]
tasks.forEach(t=>{
    t.n.forEach(n=>{
        t.d.forEach(d=>{
            let r=s=>(s||'').split('{n}').join(n).split('{d}').join(d)
            let input=JSON.parse(JSON.stringify(tplInput))
            input.generatingCircuit[0].qubitNumber=n
            input.depth=d+''
            input.generatingCircuit[0].pattern=t.p
            input.generatingCircuit[0].cutFilename=r(t.c)
            input.generatingCircuit[0].mapFilename=r(t.m)
            input.generatingCircuit[0].simulationFilename=r(t.s)
            input.generatingCircuit[0].pepsCut=JSON.stringify((peps[n]||{c:[]}).c)
            input.generatingCircuit[0].pepsPath[0].order=JSON.stringify((peps[n]||{p:[]}).p)
            inputs.push(input)
        })
    })
})
fs.writeFileSync('peps_path/inputs.json','[\n'+inputs.map(v=>JSON.stringify(v)).join('\n,\n')+'\n]')


inputs.forEach(input=>{
    let sd=new StructDataClass();
    sd.import(input)
    sd.generateCircuit(args=>{
        if (args.simulationFilename) {
            fs.writeFileSync(args.simulationFilename,args.circuit)
        } else {
            // console.log(args.circuit)
        }
        if (args.mapFilename) {
            fs.writeFileSync(args.mapFilename,args.mapText)
        }
        if (args.cutFilename) {
            fs.writeFileSync(args.cutFilename,args.cutText)
        }
    })
})
