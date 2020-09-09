const fs = require('fs')
const sourceg4=fs.readFileSync('CutlineInput.g4',{encoding:'utf8'}).replace(/\r/g,'')
fs.writeFileSync('CutlineInput.g4.js','this.grammerFile='+JSON.stringify(sourceg4),{encoding:'utf8'})