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

// todo read file and generate inputs and wirte to inputs.json

let tplInput=JSON.parse(fs.readFileSync('in/generateCircuit.json',{encoding:'utf-8'}))
let inputs=[tplInput]


let peps=JSON.parse(fs.readFileSync('peps_path/reverted.json',{encoding:'utf-8'}))
let tasks=[
    {n:[37,40,45,50,55,60,66],d:[4,5,6,7,8],p:'EFGH',c:'',m:'',s:'circuit/sycamore{n}_{d}_EFGH.txt'},
    {n:[37,40,45,50,55,60,66],d:[4,5,6,7,8],p:'IJCDCDIJ',c:'',m:'',s:'circuit/sycamore{n}_{d}_IJCD.txt'},
    {n:[20,25,30,35,40,45,50,55,60],d:[2,3],p:'IJCDCDIJ',c:'',m:'',s:'circuit/sycamore{n}_{d}_IJCD.txt'},
    {n:[60,66],d:[20],p:'EFGH',c:'',m:'',s:'circuit/sycamore{n}_{d}_EFGH.txt'},
    {n:[60,66],d:[20],p:'IJCDCDIJ',c:'',m:'',s:'circuit/sycamore{n}_{d}_IJCD.txt'},
    {n:[37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,66],d:[1],p:'IJCDCDIJ',c:'peps_path/sycamore{n}_cut.txt',m:'',s:''},
    {n:[66],d:[1],p:'IJCDCDIJ',c:'',m:'peps_path/sycamore.txt',s:''},
]
inputs=[]
tasks.forEach(t=>{
    t.n.forEach(n=>{
        t.d.forEach(d=>{
            let r=s=>s.split('{n}').join(n).split('{d}').join(d)
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
