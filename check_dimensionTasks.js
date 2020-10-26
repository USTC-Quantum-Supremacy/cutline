const {searchPepsOrder} = require('./pepsPath.js')
const {StructDataClass} = require('./main.js')
const fs = require('fs');
const execSync = require('child_process').execSync

const delay = ms => new Promise(res => setTimeout(res, ms));

let mainProcess = async ()=>{
    let dimensionTasks = JSON.parse(fs.readFileSync('output/dimensionTasks.json',{encoding:'utf-8'}))
    let pepsDimensionInput=[]
    for (const [input,task,n,d,filename] of dimensionTasks) {
        pepsDimensionInput.push([n,d,filename])
    }
    if (true) {
        // check julia-DimensionTask is stable
        let times=20
        fs.writeFileSync('../callMeteor/in/dimensionTasks.json',JSON.stringify(pepsDimensionInput),{encoding:'utf-8'})
        for (let ii = 0; ii < times; ii++) {
            await delay(50)
            execSync('bash ../callMeteor/runDimensionTasks.sh')
            await delay(50)
            let dimensions = JSON.parse(fs.readFileSync('../callMeteor/output/dimensionTasks.json',{encoding:'utf-8'}))
            fs.writeFileSync('output/dimensions_'+ii+'.json',dimensions.map(v=>JSON.stringify(v)).join('\n\n'),{encoding:'utf-8'})
        }
    }
    
}

mainProcess()

// node check_dimensionTasks.js