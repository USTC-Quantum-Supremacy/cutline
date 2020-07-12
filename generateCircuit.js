// node generateCircuit.js

// node jsfile a1
let withOrder=false
let pepsOrder=[]
if (process.argv[2]==='order') {
    withOrder=true
}

const {StructDataClass} = require('./main.js')
const fs = require('fs')

let tplInput=JSON.parse(fs.readFileSync('in/generateCircuit.json',{encoding:'utf-8'}))
let inputs=[tplInput]
let peps=JSON.parse(fs.readFileSync('in/pepsCut.json',{encoding:'utf-8'}))
if(withOrder)pepsOrder=JSON.parse(fs.readFileSync('output/orders_peps.json',{encoding:'utf-8'}));

let tasks=[
    {n:[37,40,45,50,55,60,66],d:[4,5,6,7,8,9,10],p:'EFGH',s:'circuit/sycamore{n}_{d}_EFGH.txt',target:[]},
    {n:[37,40,45,50,55,60,66],d:[4,5,6,7,8,9,10],p:'IJCDCDIJ',s:'circuit/sycamore{n}_{d}_IJCD.txt',target:[]},
    {n:[20,25,30,35,40,45,50,55,60],d:[2,3],p:'IJCDCDIJ',s:'circuit/sycamore{n}_{d}_IJCD.txt',target:[]},
    {n:[60,66],d:[20],p:'EFGH',s:'circuit/sycamore{n}_{d}_EFGH.txt',target:[]},
    {n:[60,66],d:[20],p:'IJCDCDIJ',s:'circuit/sycamore{n}_{d}_IJCD.txt',target:[]},
    {n:[15,18,21,24,27,30,33,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,66],d:[1],p:'IJCDCDIJ',c:'peps_path/sycamore{n}_cut.txt',target:[]},
    {n:[66],d:[1],p:'IJCDCDIJ',m:'peps_path/sycamore.txt',target:[]},
    //
    // PEPS Verification
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IJKLKLIJ',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',target:['PEPS']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IIJJKKLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['PEPS']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IJKLKLIJ',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['PEPS']},
    // PEPS supremacy
    {n:[60],d:[12],p:'IIIJJJKKKLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['PEPS']},
    {n:[60],d:[14],p:'IIIIJJJKKKLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['PEPS']},
    {n:[60],d:[16],p:'IIIIJJJJKKKKLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['PEPS']},
    {n:[60],d:[18],p:'IIIIIJJJJKKKKLLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['PEPS']},
    // SFA
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IJKLKLIJ',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',target:['SFA']},
    {n:[60],d:[12,16,18],p:'IJKLKLIJIJKLKLIJIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',target:['SFA']},
    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',target:['SFA']},
    {n:[60],d:[12,16,18],p:'IJKLKLIJIJKLKLIJIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',target:['SFA']},
    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',target:['SFA']},
    {n:[60],d:[12,16,18],p:'IJKLKLIJIJKLKLIJIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['SFA']},
    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['SFA']},
    


]

inputs=[]
let PEPSInputs=[]
tasks.forEach(t=>{
    t.n.forEach(n=>{
        t.d.forEach(d=>{
            let r=s=>(s||'').split('{n}').join(n).split('{d}').join(d)
            let input=JSON.parse(JSON.stringify(tplInput))
            input.generatingCircuit[0].qubitNumber=n
            input.depth=d+''
            input.generatingCircuit[0].pattern=r(t.p)
            input.generatingCircuit[0].elided=r(t.e)
            input.generatingCircuit[0].cutFilename=r(t.c)
            input.generatingCircuit[0].mapFilename=r(t.m)
            input.generatingCircuit[0].simulationFilename=r(t.s)
            input.generatingCircuit[0].pepsCut=JSON.stringify((peps[n]||peps[0]).c||peps[0].c)
            input.generatingCircuit[0].pepsPath[0].order=JSON.stringify((peps[n]||peps[0]).p||peps[0].p)
            if (n===66) {
                // let pp='0_0011100000_1_0100011100' // 60
                let pp='0_0000000000_1_0000001100' // 66
                let r=s=>Array.from(s).map(v=>1-(~~v)).join('')
                let [a1,b1,a2,b2]=pp.split('_')
                let p=[a1+'_'+b1,a1+'_'+r(b1),a2+'_'+b2,a2+'_'+r(b2)]
                p.forEach((v,i)=>input.showPattern[i].bitString=v)
                input.part1='[0,1,12,13,14,18,19,2,20,21,24,25,26,3,30,31,32,33,36,37,38,42,43,44,48,49,54,55,6,60,7,8,9]'
            }
            if (t.target.indexOf('PEPS')!==-1) {
                if (withOrder) {
                    input.generatingCircuit[0].pepsPath[0].order=JSON.stringify(pepsOrder[PEPSInputs.length].order);
                    input.generatingCircuit[0].cutFilename=input.generatingCircuit[0].simulationFilename+'.cut'
                }
                PEPSInputs.push([input,t,n,d])
            }
            inputs.push(input)
        })
    })
})
fs.writeFileSync('peps_path/inputs.json','[\n'+inputs.map(v=>JSON.stringify(v)).join('\n,\n')+'\n]',{encoding:'utf-8'})
if (!withOrder) fs.writeFileSync('output/dimensionTasks.json','[\n'+PEPSInputs.map(v=>JSON.stringify(v)).join('\n,\n')+'\n]',{encoding:'utf-8'});


inputs.forEach(input=>{
    let sd=new StructDataClass();
    sd.import(input)
    sd.generateCircuit(args=>{
        if (args.simulationFilename) {
            fs.writeFileSync(args.simulationFilename,args.circuit,{encoding:'utf-8'})
        } else {
            // console.log(args.circuit)
        }
        if (args.mapFilename) {
            fs.writeFileSync(args.mapFilename,args.mapText,{encoding:'utf-8'})
        }
        if (args.cutFilename) {
            fs.writeFileSync(args.cutFilename,args.cutText,{encoding:'utf-8'})
        }
    })
})
