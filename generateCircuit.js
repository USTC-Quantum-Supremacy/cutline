// node generateCircuit.js depth qubitNumber pattern [outputfile]
// node /home/user/zhaouv/cutline/generateCircuit.js 15 66 EFGH
// node /home/user/zhaouv/cutline/generateCircuit.js 15 60 IJCDCDIJ abc.txt


const cutlineMain = require('./main.js')
const StructDataClass = cutlineMain.StructDataClass

const fs = require('fs')

let input=JSON.parse(fs.readFileSync('in/generateCircuit.json',{encoding:'utf-8'}))
let sd=new StructDataClass();
sd.import(input)

// node jsfile a1
if (false) { // process.argv.length==2
    console.log(`
node generateCircuit.js depth qubitNumber pattern [outputfile]
node generateCircuit.js 15 66 EFGH
node generateCircuit.js 15 60 IJCDCDIJ abc.txt
    `)
} else {

    sd.generateCircuit(args=>{
        if (args.simulationFilename==null) {
            console.log(args.circuit)
        } else {
            fs.writeFileSync(args.simulationFilename,args.circuit)
        }
    })

}