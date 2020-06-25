// node generateCircuit.js depth qubitNumber pattern [outputfile]
// node /home/user/zhaouv/cutline/generateCircuit.js 15 66 EFGH
// node /home/user/zhaouv/cutline/generateCircuit.js 15 60 IJCDCDIJ abc.txt

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


let input=JSON.parse(fs.readFileSync('in/generateCircuit.json',{encoding:'utf-8'}))
let sd=new StructDataClass();
sd.import(input)
sd.generateCircuit(args=>{
    if (args.simulationFilename) {
        fs.writeFileSync(args.simulationFilename,args.circuit)
    } else {
        console.log(args.circuit)
    }
    if (args.mapFilename) {
        fs.writeFileSync(args.mapFilename,args.mapText)
    }
    if (args.cutFilename) {
        fs.writeFileSync(args.cutFilename,args.cutText)
    }
})
