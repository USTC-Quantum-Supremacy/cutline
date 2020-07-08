const {searchPepsOrder} = require('./pepsPath.js')
const {StructDataClass} = require('./main.js')
const fs = require('fs');
const execSync = require('child_process').execSync

const delay = ms => new Promise(res => setTimeout(res, ms));

let mainProcess = async ()=>{
    let dimensionTasks = JSON.parse(fs.readFileSync('output/dimensionTasks.json',{encoding:'utf-8'}))
    let pepsDimensionInput=[]
    for (const [input,task,n,d] of dimensionTasks) {
        pepsDimensionInput.push([n,d,input.generatingCircuit[0].simulationFilename])
    }
    fs.writeFileSync('../callMeteor/in/dimensionTasks.json',JSON.stringify(pepsDimensionInput),{encoding:'utf-8'})
    await delay(50)
    execSync('bash ../callMeteor/runDimensionTasks.sh')
    await delay(50)
    let dimensions = JSON.parse(fs.readFileSync('../callMeteor/output/dimensionTasks.json',{encoding:'utf-8'}))
    let results=[]
    for (let index = 0; index < dimensions.length; index++) {
        const dimension = dimensions[index];
        const [input,task,n,d] = dimensionTasks[index];
        let sd=new StructDataClass();
        sd.import(input)
        let result = searchPepsOrder.apply(sd,[dimensions,7])
        results.push(result)
    }
    fs.writeFileSync('output/orders_peps.json','[\n'+result.map(v=>JSON.stringify(v)).join('\n,\n')+'\n]',{encoding:'utf-8'})
}

mainProcess()