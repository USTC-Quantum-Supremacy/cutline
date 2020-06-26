const cutlineMain = require('./main.js')
const StructDataClass = cutlineMain.StructDataClass

const execSync = require('child_process').execSync

const fs = require('fs')

let input=JSON.parse(fs.readFileSync('in/allcircles.json',{encoding:'utf-8'}))

let sd=new StructDataClass();
sd.import(input,{part1:'[]'})


sd.generateCInput()
fs.writeFileSync('in/allcircles.in',sd.CInput)

// let retstr=fs.readFileSync('./path4.txt',{encoding:'utf-8'})
let retstr=execSync('./run2 in/allcircles.in').toString()

sd.parseCResult(retstr)

sd.getBitStringCircles()

let output = sd.processCResult_bitString()

// console.log(output.min)
console.log(output.maxofmin)

