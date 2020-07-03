const cutlineMain = require('./main.js')
const StructDataClass = cutlineMain.StructDataClass

const execSync = require('child_process').execSync

const fs = require('fs')

let input=JSON.parse(fs.readFileSync('in/check18.json',{encoding:'utf-8'}))
let sd=new StructDataClass();

let balancedRange=14
let searchPattern='012323010123230121'
searchPattern='012323010123230103'


input.generatingCircuit[0].pattern=Array.from(searchPattern).map(v=>('IJKL')[v]).join('')
input.depth=searchPattern.length+''
input.part1='[]'
input.balancedRange=balancedRange
input.searchPattern=searchPattern

// console.log(JSON.stringify(input,null,4))

fs.writeFileSync('in/allcircles.json',JSON.stringify(input,null,4),{encoding:'utf-8'})

/* 
screen -dmS abc -L -Logfile output/abc.log node allcircles.js
*/