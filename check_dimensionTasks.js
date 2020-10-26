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


/* 
cat "cutline/output/orders_peps.json"|python3 -c 'import json;a=json.load(open(0));print([l["times"] for l in a])'

echo `
for ii in 7 9 11 13
do
    cat "cutline/output/orders_peps $ii.json"|python3 -c 'import json;a=json.load(open(0));print(",".join([str(l["times"]) for l in a])+"&")'
done `| python3 -c 'import json;t=json.load(open("cutline/output/dimensionTasks.json"));a=list(zip(*[l.split(",") for l in open(0).read().split("&")[:-1]]));print("\n".join([",".join([str(c[-3]),str(c[-2]),c[-1],*b]) for b,c in zip(a,t)]))'

 */

// node check_dimensionTasks.js