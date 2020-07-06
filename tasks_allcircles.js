// const cutlineMain = require('./main.js')
// const StructDataClass = cutlineMain.StructDataClass

const execSync = require('child_process').execSync

const fs = require('fs')

let inputTPL=JSON.parse(fs.readFileSync('in/tasks_allcircles.json',{encoding:'utf-8'}))
// let sd=new StructDataClass();


let tasks=[
    {xsize:"11",balancedRange:6,searchPattern:'012323010123'},
    {xsize:"11",balancedRange:10,searchPattern:'012323010123'},
    {xsize:"11",balancedRange:20,searchPattern:'012323010123'},
    {xsize:"11",balancedRange:6,searchPattern:'01232301012323'},
    {xsize:"11",balancedRange:10,searchPattern:'01232301012323'},
    {xsize:"11",balancedRange:20,searchPattern:'01232301012323'},
    {xsize:"11",balancedRange:6,searchPattern:'01232301012321'},
    {xsize:"11",balancedRange:10,searchPattern:'01232301012321'},
    {xsize:"11",balancedRange:20,searchPattern:'01232301012321'},
    {xsize:"11",balancedRange:6,searchPattern:'01232301012303'},
    {xsize:"11",balancedRange:10,searchPattern:'01232301012303'},
    {xsize:"11",balancedRange:20,searchPattern:'01232301012303'},
    {xsize:"11",balancedRange:6,searchPattern:'01232301012301'},
    {xsize:"11",balancedRange:10,searchPattern:'01232301012301'},
    {xsize:"11",balancedRange:20,searchPattern:'01232301012301'},
    {xsize:"11",balancedRange:6,searchPattern:'0123230101232301'},
    {xsize:"11",balancedRange:10,searchPattern:'0123230101232301'},
    {xsize:"11",balancedRange:20,searchPattern:'0123230101232301'},
    {xsize:"11",balancedRange:6,searchPattern:'012323010123230101'},
    {xsize:"11",balancedRange:10,searchPattern:'012323010123230101'},
    {xsize:"11",balancedRange:20,searchPattern:'012323010123230101'},
    {xsize:"11",balancedRange:6,searchPattern:'012323010123230103'},
    {xsize:"11",balancedRange:10,searchPattern:'012323010123230103'},
    {xsize:"11",balancedRange:20,searchPattern:'012323010123230103'},
    {xsize:"11",balancedRange:6,searchPattern:'012323010123230121'},
    {xsize:"11",balancedRange:10,searchPattern:'012323010123230121'},
    {xsize:"11",balancedRange:20,searchPattern:'012323010123230121'},
    {xsize:"11",balancedRange:6,searchPattern:'012323010123230123'},
    {xsize:"11",balancedRange:10,searchPattern:'012323010123230123'},
    {xsize:"11",balancedRange:20,searchPattern:'012323010123230123'},
    {xsize:"11",balancedRange:6,searchPattern:'01232301012323010123'},
    {xsize:"11",balancedRange:10,searchPattern:'01232301012323010123'},
    {xsize:"11",balancedRange:20,searchPattern:'01232301012323010123'},
    {xsize:"12",balancedRange:6,searchPattern:'012323010123'},
    {xsize:"12",balancedRange:10,searchPattern:'012323010123'},
    {xsize:"12",balancedRange:14,searchPattern:'012323010123'},
    {xsize:"12",balancedRange:6,searchPattern:'01232301012323'},
    {xsize:"12",balancedRange:10,searchPattern:'01232301012323'},
    {xsize:"12",balancedRange:14,searchPattern:'01232301012323'},
    {xsize:"12",balancedRange:6,searchPattern:'01232301012321'},
    {xsize:"12",balancedRange:10,searchPattern:'01232301012321'},
    {xsize:"12",balancedRange:14,searchPattern:'01232301012321'},
    {xsize:"12",balancedRange:6,searchPattern:'01232301012303'},
    {xsize:"12",balancedRange:10,searchPattern:'01232301012303'},
    {xsize:"12",balancedRange:14,searchPattern:'01232301012303'},
    {xsize:"12",balancedRange:6,searchPattern:'01232301012301'},
    {xsize:"12",balancedRange:10,searchPattern:'01232301012301'},
    {xsize:"12",balancedRange:14,searchPattern:'01232301012301'},
    {xsize:"12",balancedRange:6,searchPattern:'0123230101232301'},
    {xsize:"12",balancedRange:10,searchPattern:'0123230101232301'},
    {xsize:"12",balancedRange:14,searchPattern:'0123230101232301'},
    {xsize:"12",balancedRange:6,searchPattern:'012323010123230101'},
    {xsize:"12",balancedRange:10,searchPattern:'012323010123230101'},
    {xsize:"12",balancedRange:14,searchPattern:'012323010123230101'},
    {xsize:"12",balancedRange:6,searchPattern:'012323010123230103'},
    {xsize:"12",balancedRange:10,searchPattern:'012323010123230103'},
    {xsize:"12",balancedRange:14,searchPattern:'012323010123230103'},
    {xsize:"12",balancedRange:6,searchPattern:'012323010123230121'},
    {xsize:"12",balancedRange:10,searchPattern:'012323010123230121'},
    {xsize:"12",balancedRange:14,searchPattern:'012323010123230121'},
    {xsize:"12",balancedRange:6,searchPattern:'012323010123230123'},
    {xsize:"12",balancedRange:10,searchPattern:'012323010123230123'},
    {xsize:"12",balancedRange:14,searchPattern:'012323010123230123'},
    {xsize:"12",balancedRange:6,searchPattern:'01232301012323010123'},
    {xsize:"12",balancedRange:10,searchPattern:'01232301012323010123'},
    {xsize:"12",balancedRange:14,searchPattern:'01232301012323010123'},
]
tasks.forEach((v,i)=>v.screenName='sc'+(i+1))

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
let analysistask = async (tasks)=>{
    let data=[]
    data.push(['name','status','search','length','cut','wedge','DCD','start','end','n1','n2','I','J','K','L','input'])
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
        let content=log.split(/\d+ of \d+/).slice(-1)[0].trim().replace(/..\d+m/g,'')
        if (!content) continue;
        line[1]='done'
        let obj=eval('('+content+')')
        input.part1=JSON.stringify(obj.split)
        obj.pattern[1].forEach((v,i)=>input.showPattern[i].bitString=v)
        line.push(obj.search_max,obj.lengthInfo.length,obj.lengthInfo.cut,obj.lengthInfo.wedge,obj.lengthInfo.DCD,obj.lengthInfo.start,obj.lengthInfo.end,obj.n1,obj.n2,...obj.pattern[1],JSON.stringify(input))
        data.push(line)

    }
    fs.writeFileSync('output/tasks_result.json',JSON.stringify({title:'tasks_result',data}),{encoding:'utf-8'})
    await delay(50)
    execSync(`python3 tasks_format_allcircles.py`)
}





let argv=Array.from(process.argv)
if (argv.length<=2) {
    argv=['x/node','x/x.js','analysis']
}
switch (argv[2]) {
    case 'do':
        dotask(tasks)
        break;
    case 'giveup':
        giveuptask(tasks)
        break;
    case 'analysis':
        analysistask(tasks)
        break;
    default:
        console.log('argv need: do, giveup, analysis')
        break;
}