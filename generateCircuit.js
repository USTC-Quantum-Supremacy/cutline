// node generateCircuit.js

// node jsfile a1
let withOrder=false
let pepsOrder=[]
if (process.argv[2]==='order') {
    withOrder=true
}

const {StructDataClass,seeds} = require('./main.js')
const fs = require('fs')

let tplInput=JSON.parse(fs.readFileSync('in/generateCircuit.json',{encoding:'utf-8'}))
let pepsCut=JSON.parse(fs.readFileSync('in/pepsCut.json',{encoding:'utf-8'}))
if(withOrder)pepsOrder=JSON.parse(fs.readFileSync('output/orders_peps.json',{encoding:'utf-8'}));

const part1s=[
]

let tasks=[
    {meta:1},
    // Verification
    {n:[15,16,17,18,19,20,21,22,23,24,25,26,27],d:[8],p:'MNOPOPMN',e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',target:['EXP','SA','xebcal','once']},
    
    {n:[15,16,17,18,19,20,21,22,23,24,25,26,27],d:[8],p:'MNOPOPMN',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',target:['EXP','SA','xebcal','once']},
 
    {n:[15,16,17,18,19,20,21,22,23,24,25,26,27],d:[8],p:'MNOPOPMN',e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',target:['EXP','SA','once']},
    {n:[15,16,17,18,19,20,21,22,23,24,25,26,27],d:[8],p:'MMNNOOPP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike.txt',target:['EXP','SA','xebcal','once']},
    {meta:2},
    
    // 66qubit SFA supremacy -> 27
    {n:[27],d:[16],p:'MNOPOPMNMNOPOPMN',e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',target:['EXP','SA','once']},
    {n:[27],d:[16],p:'MNOPOPMNMNOPOPMN',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',target:['EXP','SA','once']},
    {n:[27],d:[16],p:'MNOPOPMNMNOPOPMN',e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',target:['EXP','SA','once']},
    {n:[27],d:[16],p:'MMMMNNNNOOOOPPPP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike.txt',target:['EXP','SA','once']},


    {n:[27],d:[14],p:'MNOPOPMNMNOPON',e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',target:['EXP','SA','once']},
    {n:[27],d:[14],p:'MNOPOPMNMNOPON',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',target:['EXP','SA','once']},
    {n:[27],d:[14],p:'MNOPOPMNMNOPON',e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',target:['EXP','SA','once']},
    {n:[27],d:[14],p:'MMMNNNNOOOOPPP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike.txt',target:['EXP','SA','once']},



    {n:[27],d:[12],p:'MNOPOPMNMNOPOPMN',e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',target:['EXP','SA','once']},
    {n:[27],d:[12],p:'MNOPOPMNMNOPOPMN',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',target:['EXP','SA','once']},
    {n:[27],d:[12],p:'MNOPOPMNMNOPOPMN',e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',target:['EXP','SA','once']},
    {n:[27],d:[12],p:'MMMNNNOOOPPP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike.txt',target:['EXP','PEPS','SA','once']},


    {n:[27],d:[16],p:'MNOPOPMNMNOPOPMN',e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer_all.txt',target:['EXP','SA','SFATime']},
    

    {meta:3},
    // Check
    {n:[27],d:[8],tpl:'1',p:'IJKLKLIJ',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_CheckARun.txt',target:['EXP','Check','A_Run','SA','once']},
    {n:[14],d:[8],tpl:'2',p:'IJKLKLIJ',s:'circuit/sycamore{n}_{d}_IJKL_CheckAP1.txt',target:['Check','A_P1','SA']},
    {n:[13],d:[8],tpl:'3',p:'IJKLKLIJ',s:'circuit/sycamore{n}_{d}_IJKL_CheckAP2.txt',target:['Check','A_P2','SA']},
    {n:[27],d:[8],tpl:'4',p:'MNOPOPMN',e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_CheckBRun.txt',target:['EXP','Check','B_Run','SA','once']},
    {n:[14],d:[8],tpl:'5',p:'MNOPOPMN',s:'circuit/sycamore{n}_{d}_MNOP_CheckBP1.txt',target:['Check','B_P1','SA']},
    {n:[13],d:[8],tpl:'6',p:'MNOPOPMN',s:'circuit/sycamore{n}_{d}_MNOP_CheckBP2.txt',target:['Check','B_P2','SA']},

    // Auxliary
    {n:[15],d:[8],p:'IJKLKLIJ',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer_Auxliary.txt',target:['SFA']},
    {n:[15],d:[8],p:'IJKLKLIJ',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',target:['PEPS','PEPSTime']},

]

const taskDisplay=[['n','depth','name','task','input','targets','seedIndex','circuitIndex','taskIndex']]
let inputs=[]
let PEPSInputs=[]
let PEPSTimeInputs=[]
let SFATimeInputs=[]

let circuitIndex =1;
let taskIndex =1;
let meta=0

tasks.forEach(t=>{
    if (t.meta) {
        meta=t.meta
        return
    }
    t.n.forEach(n=>{
        t.d.forEach(d=>{
            seeds.forEach((seed,seedi)=>{
                if (seedi!==0 && ((t.target.indexOf('EXP')===-1 && t.target.indexOf('seeds')===-1 && t.target.indexOf('eseeds')===-1) || t.target.indexOf('once')!==-1)) {
                    // ((不含EXP 且 不含seeds) 或 含once) 时只用 seedi==0
                    return;
                }
                if (seedi>=10 && (t.target.indexOf('EXP')!==-1 || t.target.indexOf('eseeds')!==-1)) {
                    // EXP 只用 seedi<10
                    return;
                }
                let r=s=>(s||'').split('{n}').join(n).split('{d}').join(d)
                let tpli=~~r(t.tpl)
                let input=JSON.parse(JSON.stringify(tplInput[tpli]))
                let peps=pepsCut[tpli]
                input.generatingCircuit[0].qubitNumber=n
                input.depth=d+''
                input.part1=r(t.part1)||input.part1
                input.generatingCircuit[0].pattern=r(t.p)
                input.generatingCircuit[0].elided=r(t.e)
                input.generatingCircuit[0].sfaCut=r(t.sfaCut)||'-1'
                input.generatingCircuit[0].pepsCut=r(t.pc)||JSON.stringify((peps[n]||peps[0]).c||peps[0].c)
                input.generatingCircuit[0].pepsPath[0].order=JSON.stringify((peps[n]||peps[0]).p||peps[0].p)
                let rr=s=>r(s).split('.txt').join((seedi===0?'':'.s'+seedi)+'.txt')
                input.generatingCircuit[0].simulationFilename=rr(t.s)
                if(t.target.indexOf('EXP')!==-1)input.generatingCircuit[0].experimentFilename=rr(t.s)+'.qcis'
                input.generatingCircuit[0].auxiliaryFilename=rr(t.s)+'.json'
                input.generatingCircuit[0].seed=seed
                if (t.target.indexOf('PEPS')!==-1) {
                    if (withOrder) {
                        input.generatingCircuit[0].pepsPath[0].order=JSON.stringify(pepsOrder[PEPSInputs.length].order);
                        if (t.target.indexOf('PEPSTime')!==-1) PEPSTimeInputs.push([input,t,n,d,input.generatingCircuit[0].simulationFilename]);
                    }
                    PEPSInputs.push([input,t,n,d,input.generatingCircuit[0].simulationFilename]);
                }
                if (t.target.indexOf('SFATime')!==-1) SFATimeInputs.push([input,t,n,d,input.generatingCircuit[0].simulationFilename]);
                inputs.push(input)
                if (meta===2) {
                    taskIndex++
                }
                if (meta===3) {
                    taskIndex=-1
                }
                taskDisplay.push([n,d,(input.generatingCircuit[0].simulationFilename||'/').split('/')[1],JSON.stringify(t),JSON.stringify(input),t.target.join('_')||'null',seedi,circuitIndex,taskIndex])
                circuitIndex++;
            })
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

let baseDir='../MeteorCircuit'
fs.mkdirSync(baseDir+'/circuit',{recursive:true})
inputs.forEach(input=>{
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
        if (args.experimentFilename) {
            fs.writeFileSync(baseDir+'/'+args.experimentFilename,args.experiment,{encoding:'utf-8'})
        }
    })
})

if (withOrder) {
    fs.writeFileSync('output/circuits.json',JSON.stringify({outFileName:'output/circuits.xlsx',title:['circuits'],data:[taskDisplay]},null,4),{encoding:'utf-8'})
}