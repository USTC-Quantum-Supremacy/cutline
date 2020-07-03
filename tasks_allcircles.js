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

const delay = ms => new Promise(res => setTimeout(res, ms));
let dotask = async (tasks)=>{
    for (const task of tasks) {
        console.log(JSON.stringify(task))

        let input= JSON.parse(JSON.stringify(inputTPL))
        let {xsize,balancedRange,searchPattern,screenName}=task

        input.generatingCircuit[0].pattern=Array.from(searchPattern).map(v=>('IJKL')[v]).join('')
        input.depth=searchPattern.length+''
        input.part1='[]'
        input.balancedRange=balancedRange
        input.searchPattern=searchPattern
        input.xsize=xsize

        fs.writeFileSync('in/allcircles.json',JSON.stringify(input,null,4),{encoding:'utf-8'})
        await delay(50)
        execSync(`screen -dmS ${screenName} -L -Logfile output/${screenName}.log node allcircles.js`)
        // execSync(`screen -S ${screenName} -X quit`)
        await delay(50)
    }
}
dotask(tasks)
/* 
    submit (will kill the screen when it finish)
screen -dmS abc -L -Logfile output/abc.log node allcircles.js
    give up
screen -S abc -X quit
*/