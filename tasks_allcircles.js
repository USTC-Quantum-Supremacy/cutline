const {StructDataClass} = require('./main.js')

const {execSync} = require('child_process')

const fs = require('fs')

let inputTPL=JSON.parse(fs.readFileSync('in/tasks_allcircles.json',{encoding:'utf-8'}))
// let sd=new StructDataClass();


let tasks=JSON.parse(fs.readFileSync('in/tasks.json',{encoding:'utf-8'}))

let renderTaskInput=(task)=>{
    let input= JSON.parse(JSON.stringify(inputTPL))
    let {xsize,balancedRange,searchPattern,screenName}=task

    input.generatingCircuit[0].pattern=Array.from(searchPattern).map(v=>('IJKL')[v]).join('')
    input.depth=searchPattern.length+''
    input.part1='[]'
    input.balancedRange=balancedRange
    input.searchPattern=searchPattern
    input.xsize=xsize
    return input
}

const delay = ms => new Promise(res => setTimeout(res, ms));

let dotask = async (tasks)=>{
    for (const task of tasks) {
        let input= renderTaskInput(task)
        let {xsize,balancedRange,searchPattern,screenName}=task
        //
        console.log(JSON.stringify(task))
        if (task.giveup) continue;
        fs.writeFileSync('in/allcircles.json',JSON.stringify(input,null,4),{encoding:'utf-8'})
        await delay(50)
        execSync(`screen -dmS ${screenName} -L -Logfile output/${screenName}.log node allcircles.js`)
        await delay(50)
    }
}
let giveuptask = async (tasks)=>{
    for (const task of tasks) {
        let input= renderTaskInput(task)
        let {xsize,balancedRange,searchPattern,screenName}=task
        //
        execSync(`screen -S ${screenName} -X quit`)
        await delay(10)
    }
}
/* 
-   submit (will kill the screen when it finish)
screen -dmS abc -L -Logfile output/abc.log node allcircles.js
-   give up
screen -S abc -X quit
*/
let parsetask = async (tasks)=>{
    let data=[]
    data.push(['name','status','n','balancedRange','depth','searchPattern','search','length','cut','wedge','DCD','start','end','n1','n2','I','J','K','L','allPatterns','input'])
    // tasks result
    for (const task of tasks) {
        let input= renderTaskInput(task)
        let {xsize,balancedRange,searchPattern,screenName}=task
        //
        let log;
        try {
            log=fs.readFileSync(`output/${screenName}.log`,{encoding:'utf-8'})
        } catch (error) {
            data.push([screenName,'error'])
            continue
        }
        let line = [screenName,'running']
        line.push(xsize==='11'?60:66,balancedRange,searchPattern.length,searchPattern)

        let content=log.split(/\d+ of \d+/).slice(-1)[0].trim().replace(/..\d+m/g,'')
        if (!content) {
            data.push(line)
            continue
        }

        line[1]='done'
        let obj=eval('('+content.split('===patterns===')[0]+')')
        input.part1=JSON.stringify(obj.split)
        obj.pattern[1].forEach((v,i)=>input.showPattern[i].bitString=v)
        
        line.push(obj.search_max,obj.lengthInfo.length,obj.lengthInfo.cut,obj.lengthInfo.wedge,obj.lengthInfo.DCD,obj.lengthInfo.start,obj.lengthInfo.end,obj.n1,obj.n2,...obj.pattern[1],content.split('===patterns===')[1].trim(),JSON.stringify(input))

        data.push(line)

    }
    // patterns
    let patternMap={}
    for (const line of data) {
        if (line[1]!=='done') continue;
        let name=line[0]
        let patterns=JSON.parse(line.slice(-2)[0])
        for (const pattern of patterns) {
            patternMap[pattern]=(patternMap[pattern]||[]).concat([name])
        }
    }
    let pairs=Object.entries(patternMap).sort((a,b)=>b[1].length-a[1].length)
    let data2=[['pattern','all','count','source']]
    for (const [pattern,source] of pairs) {
        data2.push([pattern,source.join(''),source.length,...source])
    }
    
    fs.writeFileSync('output/tasks_result.json',JSON.stringify({title:['tasks_result','patterns'],data:[data,data2],outFileName:'output/tasks_result.xlsx'}),{encoding:'utf-8'})
    await delay(50)
    execSync(`python3 convertToXlsx.py output/tasks_result.json`)
}

let analysistask = async (tasks)=>{
    let debug = false
    
    let analysis = JSON.parse(fs.readFileSync('in/task_analysis.json',{encoding:'utf-8'}))
    let parsed = JSON.parse(fs.readFileSync('output/tasks_result.json',{encoding:'utf-8'}))
    let data = parsed.data[0]
    let data2 = parsed.data[1]

    for (const {name,filter,target} of analysis) {
        console.log('name:',name,'start')
        let data3=[['pattern filted from '+filter.map(v=>'sc'+v).join(''),...target.map(v=>'sc'+v)]]
        new StructDataClass().import(renderTaskInput(tasks[filter[0]-1])).searchPath()
        let count=0;
        for (const pline of data2.slice(1)) {
            let save=true
            for (const toCheck of filter.map(v=>'sc'+v)) {
                if (pline.indexOf(toCheck)===-1) {
                    save=false
                    break;
                }
            }
            if (!save) continue;
            console.log(name,':',++count)
            if (debug && count==3) break;
            let line=[pline[0]]
            let r=s=>Array.from(s).map(v=>1-(~~v)).join('')
            let [a1,b1,a2,b2]=pline[0].split('_')
            let p=[a1+'_'+b1,a1+'_'+r(b1),a2+'_'+b2,a2+'_'+r(b2)]
            for (const ti of target) {
                let task = tasks[ti-1]
                let input= renderTaskInput(task)
                let {xsize,balancedRange,searchPattern,screenName}=task
                p.forEach((v,i)=>input.showPattern[i].bitString=v)
                let sd=new StructDataClass().import(input);
                sd.circles=[['patternName','IJKL']]
                let output=sd.processPathsResult();
                let searmax=output.maxofmin.search_max
                line.push(searmax)
            }
            data3.push(line)
        }
        parsed.data.push(data3)
        parsed.title.push(name)
    }
    if (debug && false) parsed={outFileName:parsed.outFileName,title:parsed.title.slice(2),data:parsed.data.slice(2)};
    fs.writeFileSync('output/tasks_result_analysis.json',JSON.stringify(parsed),{encoding:'utf-8'})
    await delay(50)
    execSync(`python3 convertToXlsx.py output/tasks_result_analysis.json`)
}



let argv=Array.from(process.argv)
if (argv.length<=2) {
    argv=['x/node','x/x.js','']
}
switch (argv[2]) {
    case 'do':
        dotask(tasks)
        break;
    case 'giveup':
        giveuptask(tasks)
        break;
    case 'parse':
        parsetask(tasks)
        break;
    case 'analysis':
        analysistask(tasks)
        break;
    default:
        console.log('argv need: do, giveup, parse, analysis')
        break;
}