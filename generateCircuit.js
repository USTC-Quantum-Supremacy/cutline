// node generateCircuit.js depth qubitNumber pattern [outputfile]
// node /home/user/zhaouv/cutline/generateCircuit.js 15 66 EFGH
// node /home/user/zhaouv/cutline/generateCircuit.js 15 60 IJCDCDIJ abc.txt


const cutlineMain = require('./main.js')
const StructDataClass = cutlineMain.StructDataClass

const fs = require('fs')

let sd=new StructDataClass();
sd.init({xsize:12,ysize:11,unused:1}).initmap().loadChoosen([]).pickMaxArea().loadRemovedStart([]).pushPatterns().setSplit([])

let orderList=[41,35,29,34,46,22,40,28,45,21,47,23,33,53,52,17,16,39,27,15,51,32,20,44,8,56,26,38,14,50,57,58,9,10,62,63,2,3,64,4,31,19,43,7,55,25,37,13,49,1,61,30,18,42,6,54,48,12,24,36,65,5,59,11,60,0]

// node jsfile a1 a2 a3
if (process.argv.length==2) {
    console.log(`
node generateCircuit.js depth qubitNumber pattern [outputfile]
node generateCircuit.js 15 66 EFGH
node generateCircuit.js 15 60 IJCDCDIJ abc.txt
    `)
} else {

    let depth=process.argv[2]||15
    let qubitNumber=process.argv[3]||66
    let circle=process.argv[4]||'EFGH'
    let filename=process.argv[5]||null

    let circuitProto = sd.generateCircuitProto(circle,depth)
    let circuit = sd.renderCircuitProto(circuitProto,orderList.slice(0,qubitNumber))
    if (filename==null) {
        console.log(circuit)
    } else {
        fs.writeFileSync(filename,circuit)
    }
}