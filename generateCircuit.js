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
    // Verification
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51],d:[8],p:'IJKLKLIJ',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,26,27,28,29,3,30,34,35,4,40,5,6,7,8,9]',target:['EXP','PEPS','PEPSTime']},
    {n:[54,60,66],d:[8],p:'IJKLKLIJ',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,26,27,28,29,3,30,34,35,4,40,5,6,7,8,9]',target:['EXP','PEPS','PEPSTime','super']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IJKLKLIJ',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,26,27,28,29,3,30,34,35,4,40,5,6,7,8,9]',target:['EXP','SFA']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IIJJKKLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['EXP','PEPS']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51],d:[8],p:'IJKLKLIJ',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['EXP','PEPS','PEPSTime']},
    {n:[54,60,66],d:[8],p:'IJKLKLIJ',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['EXP','PEPS','PEPSTime','super']},
    {n:[66],d:[8],p:'MNOPOPMN',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',target:['EXP','PEPS','PEPSTime']},
    // 60qubit PEPS supremacy
    {n:[60],d:[12],p:'IIIJJJKKKLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['EXP','PEPS']},
    {n:[60],d:[14],p:'IIIIJJJKKKLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['EXP','PEPS']},
    {n:[60],d:[16],p:'IIIIJJJJKKKKLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['EXP','PEPS']},
    {n:[60],d:[18],p:'IIIIIJJJJKKKKLLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['EXP','PEPS','PEPSTime']},
    // 60qubit SFA
    {n:[60],d:[12],p:'IJKLKLIJIJKLKLIJIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',part1:'[0,1,10,11,12,13,14,15,18,19,2,20,21,24,25,26,3,30,31,32,36,37,4,42,43,48,6,7,8,9]',target:['EXP','SFA','SFATime','super']},
    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',part1:'[0,1,10,11,13,14,15,16,2,20,21,22,23,26,27,28,3,33,34,35,39,4,40,46,47,52,59,7,8,9]',target:['EXP','SFA','SFATime','super']},
    {n:[60],d:[16],p:'IJKLKLIJIJKLKLIJIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',part1:'[0,1,10,11,12,13,14,15,16,18,19,2,20,21,24,25,26,3,30,31,32,36,37,4,42,43,6,7,8,9]',target:['EXP','SFA','SFATime','super']},
    {n:[60],d:[18],p:'IJKLKLIJIJKLKLIJIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',part1:'[0,1,10,12,13,14,15,18,19,2,20,21,24,25,26,3,30,31,32,36,37,4,42,43,48,54,6,7,8,9]',target:['EXP','SFA','SFATime','super']},

    {n:[60],d:[12],p:'IJKLKLIJIJKLKLIJIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',part1:'[0,1,10,11,12,13,14,15,18,19,2,20,21,24,25,26,3,30,31,32,36,37,4,42,43,48,6,7,8,9]',target:['EXP','SFA']},
    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',part1:'[0,1,10,11,13,14,15,16,2,20,21,22,23,26,27,28,3,33,34,35,39,4,40,46,47,52,59,7,8,9]',target:['EXP','SFA']},
    {n:[60],d:[16],p:'IJKLKLIJIJKLKLIJIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',part1:'[0,1,10,11,12,13,14,15,16,18,19,2,20,21,24,25,26,3,30,31,32,36,37,4,42,43,6,7,8,9]',target:['EXP','SFA']},
    {n:[60],d:[18],p:'IJKLKLIJIJKLKLIJIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',part1:'[0,1,10,12,13,14,15,18,19,2,20,21,24,25,26,3,30,31,32,36,37,4,42,43,48,54,6,7,8,9]',target:['EXP','SFA']},

    {n:[60],d:[12],p:'IJKLKLIJIJKLKLIJIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:'[0,1,10,11,12,13,14,15,16,18,19,2,20,21,22,24,25,26,27,3,30,31,32,33,36,4,42,6,7,8,9]',target:['EXP','SFACutSearch']},
    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:'[0,1,10,11,12,13,14,15,18,19,2,20,21,24,25,26,3,30,31,32,36,37,4,42,43,48,6,7,8,9]',target:['EXP','SFACutSearch']},
    {n:[60],d:[16],p:'IJKLKLIJIJKLKLIJIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:'[0,1,10,11,12,13,14,15,16,18,19,2,20,21,22,23,25,26,27,28,3,32,33,34,35,4,40,6,7,8,9]',target:['EXP','SFACutSearch']},
    {n:[60],d:[18],p:'IJKLKLIJIJKLKLIJIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:'[0,1,10,11,12,13,14,15,16,18,19,2,20,21,22,23,24,26,27,28,3,30,34,35,4,40,6,7,8,9,5,17,29]',target:['EXP','SFACutSearch']},

    // 66qubit PEPS supremacy
    {n:[66],d:[12],p:'MMMNNNOOOPPP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike.txt',target:['EXP','PEPS']},
    {n:[66],d:[14],p:'MMMNNNNOOOOPPP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike.txt',target:['EXP','PEPS']},
    {n:[66],d:[16],p:'MMMMNNNNOOOOPPPP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike.txt',target:['EXP','PEPS']},
    // 66qubit SFA
    {n:[66],d:[12],p:'MNOPOPMNMNOPOPMN',e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,25,26,27,28,3,30,31,32,33,34,4,5,6,7,8,9]',target:['EXP','SFA','SFATime','super']},
    {n:[66],d:[14],p:'MNOPOPMNMNOPON',e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',part1:'[0,1,10,11,13,14,15,16,17,2,20,21,22,23,26,27,28,29,3,33,34,35,39,4,40,41,46,47,5,52,53,7,8,9]',target:['EXP','SFA','SFATime','super']},
    {n:[66],d:[16],p:'MNOPOPMNMNOPOPMN',e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,24,25,26,27,3,30,31,32,33,36,37,38,4,5,6,7,8,9]',target:['EXP','SFA','SFATime','super']},

    {n:[66],d:[12],p:'MNOPOPMNMNOPOPMN',e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,25,26,27,28,3,30,31,32,33,34,4,5,6,7,8,9]',target:['EXP','SFA']},
    {n:[66],d:[14],p:'MNOPOPMNMNOPON',e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',part1:'[0,1,10,11,13,14,15,16,17,2,20,21,22,23,26,27,28,29,3,33,34,35,39,4,40,41,46,47,5,52,53,7,8,9]',target:['EXP','SFA']},
    {n:[66],d:[16],p:'MNOPOPMNMNOPOPMN',e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,24,25,26,27,3,30,31,32,33,36,37,38,4,5,6,7,8,9]',target:['EXP','SFA']},
    
    {n:[66],d:[12],p:'MNOPOPMNMNOPOPMN',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',part1:'[0,1,12,13,14,18,19,2,20,21,24,25,26,3,30,31,32,33,36,37,38,42,43,44,48,49,54,55,6,60,7,8,9]',target:['EXP','SFACutSearch']},
    {n:[66],d:[14],p:'MNOPOPMNMNOPON',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,25,26,27,28,29,3,31,35,4,41,5,6,7,8,9]',target:['EXP','SFACutSearch']},
    {n:[66],d:[16],p:'MNOPOPMNMNOPOPMN',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',part1:'[0,1,12,13,14,18,19,2,20,21,24,25,26,3,30,31,32,33,36,37,38,42,43,44,48,49,54,55,6,60,7,8,9]',target:['EXP','SFACutSearch']},

    // Auxliary
    {n:[60],d:[4,6],p:'IJKLKLIJIJKLKLIJIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['PEPS']},
    {n:[66],d:[4,6],p:'MNOPOPMNMNOPOPMN',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',target:['PEPS']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IJKLKLIJ',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer_Auxliary.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,26,27,28,29,3,30,34,35,4,40,5,6,7,8,9]',target:['SFA']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IJKLKLIJ',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_Auxliary.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,26,27,28,29,3,30,34,35,4,40,5,6,7,8,9]',target:['SFA']},
    {n:[60,66],d:[8],p:'IJKLKLIJ',e:'4',s:'circuit/sycamore{n}_{d}_IJKL_E4.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,26,27,28,29,3,30,34,35,4,40,5,6,7,8,9]',target:['superSFATest']},
    {n:[30,32,34,36],d:[14],p:'IJKLKLIJIJKLIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:'[0,1,10,11,12,13,14,15,18,19,2,20,21,24,25,26,3,30,31,32,36,37,4,42,43,48,6,7,8,9]',target:['SA']},

    {n:[60],d:[7],p:'IJKLKLIJIJKLKLIJIL',e:'3layer',s:'circuit/sycamore{n}_{d}_IJKL_E3layer.txt',part1:'[0,1,10,11,12,13,14,15,16,2,20,21,22,23,26,27,28,3,33,34,35,39,4,40,46,47,6,7,8,9]',target:['SFA','PEPS']},
    {n:[60],d:[8],p:'IJKLKLIJIJKLKLIJIL',e:'3layer',s:'circuit/sycamore{n}_{d}_IJKL_E3layer.txt',part1:'[0,1,10,12,13,14,15,18,19,2,20,21,24,25,26,3,30,31,32,36,37,4,42,43,48,54,6,7,8,9]',target:['SFA','PEPS']},
    {n:[66],d:[7],p:'MNOPOPMNMNOPOPMN',e:'3layer',s:'circuit/sycamore{n}_{d}_MNOP_E3layer.txt',part1:'[0,12,13,18,19,24,25,30,31,32,36,37,38,42,43,44,45,48,49,50,51,54,55,56,57,58,6,60,61,62,63,64,7]',target:['SFA','PEPS']},
    {n:[66],d:[8],p:'MNOPOPMNMNOPOPMN',e:'3layer',s:'circuit/sycamore{n}_{d}_MNOP_E3layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,25,26,27,28,3,30,32,33,38,4,5,6,7,8,9]',target:['SFA','PEPS']},

    // {n:[15,18,21,24,27,30,33,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,66],d:[1],p:'IJCDCDIJ',c:'peps_path/sycamore{n}_cut.txt',target:[]},
    // {n:[66],d:[1],p:'IJCDCDIJ',m:'peps_path/sycamore.txt',target:[]},

    {n:[37,40,45,50,55,60,66],d:[4,5,6,7,8,9,10],p:'EFGH',s:'circuit/sycamore{n}_{d}_EFGH.txt',target:[]},
    {n:[37,40,45,50,55,60,66],d:[4,5,6,7,8,9,10],p:'IJCDCDIJ',s:'circuit/sycamore{n}_{d}_IJCD.txt',target:[]},
    {n:[20,25,30,35,40,45,50,55,60],d:[2,3],p:'IJCDCDIJ',s:'circuit/sycamore{n}_{d}_IJCD.txt',target:[]},
    {n:[60,66],d:[20],p:'EFGH',s:'circuit/sycamore{n}_{d}_EFGH.txt',target:[]},
    {n:[60,66],d:[20],p:'IJCDCDIJ',s:'circuit/sycamore{n}_{d}_IJCD.txt',target:[]},
]

let taskDisplay=[['n','depth','name','task','input','targets']]
inputs=[]
let PEPSInputs=[]
let PEPSTimeInputs=[]
let SFATimeInputs=[]
tasks.forEach(t=>{
    t.n.forEach(n=>{
        t.d.forEach(d=>{
            let r=s=>(s||'').split('{n}').join(n).split('{d}').join(d)
            let input=JSON.parse(JSON.stringify(tplInput))
            input.generatingCircuit[0].qubitNumber=n
            input.depth=d+''
            input.part1=r(t.part1)||input.part1
            input.generatingCircuit[0].pattern=r(t.p)
            input.generatingCircuit[0].elided=r(t.e)
            input.generatingCircuit[0].simulationFilename=r(t.s)
            input.generatingCircuit[0].auxiliaryFilename=r(t.s)+'.json'
            input.generatingCircuit[0].pepsCut=JSON.stringify((peps[n]||peps[0]).c||peps[0].c)
            input.generatingCircuit[0].pepsPath[0].order=JSON.stringify((peps[n]||peps[0]).p||peps[0].p)
            if (t.target.indexOf('PEPS')!==-1) {
                if (withOrder) {
                    input.generatingCircuit[0].pepsPath[0].order=JSON.stringify(pepsOrder[PEPSInputs.length].order);
                    if (t.target.indexOf('PEPSTime')!==-1) PEPSTimeInputs.push([input,t,n,d,input.generatingCircuit[0].simulationFilename]);
                }
                PEPSInputs.push([input,t,n,d,input.generatingCircuit[0].simulationFilename])
            }
            if (t.target.indexOf('SFATime')!==-1) SFATimeInputs.push([input,t,n,d,input.generatingCircuit[0].simulationFilename]);
            inputs.push(input)
            taskDisplay.push([n,d,(input.generatingCircuit[0].simulationFilename||'/').split('/')[1],t,input,t.target.join('_')||'null'])
        })
    })
})
fs.writeFileSync('output/inputs.json','[\n'+inputs.map(v=>JSON.stringify(v)).join('\n,\n')+'\n]',{encoding:'utf-8'})
if (withOrder) {
    fs.writeFileSync('output/PEPSTimeInputs.json','[\n'+PEPSTimeInputs.map(v=>JSON.stringify(v)).join('\n,\n')+'\n]',{encoding:'utf-8'});
    fs.writeFileSync('output/SFATimeInputs.json','[\n'+SFATimeInputs.map(v=>JSON.stringify(v)).join('\n,\n')+'\n]',{encoding:'utf-8'});
} else {
    fs.writeFileSync('output/dimensionTasks.json','[\n'+PEPSInputs.map(v=>JSON.stringify(v)).join('\n,\n')+'\n]',{encoding:'utf-8'});
}

inputs.forEach(input=>{
    let baseDir='../MeteorCircuit'
    let sd=new StructDataClass();
    sd.import(input)
    sd.generateCircuit(args=>{
        if (args.simulationFilename) {
            fs.writeFileSync(baseDir+'/'+args.simulationFilename,args.circuit,{encoding:'utf-8'})
        } else {
            // console.log(args.circuit)
        }
        if (args.auxiliaryFilename) {
            fs.writeFileSync(baseDir+'/'+args.auxiliaryFilename,args.auxiliaryText,{encoding:'utf-8'})
        }
    })
})

fs.writeFileSync('output/circuits.json',JSON.stringify({title:['circuits'],data:[taskDisplay],outFileName:'output/circuits.xlsx'}),{encoding:'utf-8'})