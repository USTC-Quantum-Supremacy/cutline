

const {StructDataClass,seeds} = require('../main.js')
const fs = require('fs')


let inputs=[]

let circuitIndex =0;


const tplInput={
    "type": "prog",
    "xsize": "7",
    "ysize": "7",
    "use00": true,
    "brokenBits": "[]",
    "part1": "[]",
    "depth": "20",
    "searchPattern": "01232301012323010123",
    "errorRates": "[0.0016,0.008,0.038]",
    "removedEntrances": "[]",
    "balancedRange": 6,
    "search": "notprune",
    "showMark": [
        {
            "type": "markQi"
        }
    ],
    "showPattern": [
        {
            "type": "patternDefine",
            "pattern": "I",
            "bitString": "1_00000"
        },
        {
            "type": "patternDefine",
            "pattern": "J",
            "bitString": "1_11111"
        },
        {
            "type": "patternDefine",
            "pattern": "K",
            "bitString": "0_00111"
        },
        {
            "type": "patternDefine",
            "pattern": "L",
            "bitString": "0_11000"
        },
        {
            "type": "patternA",
            "pattern": "I",
            "color": "#ff9900"
        },
        {
            "type": "patternA",
            "pattern": "J",
            "color": "#3333ff"
        },
        {
            "type": "patternC",
            "pattern": "K",
            "color": "#009900"
        },
        {
            "type": "patternC",
            "pattern": "L",
            "color": "#cc0000"
        }
    ],
    "generatingCircuit": [
        {
            "type": "generatingCircuit",
            "qubitNumber": 25,
            "elided": "",
            "pattern": "IJKLKLIJIJKLKLIJIJKL",
            "seed": "13874234",
            "simulationFilename": "circuit/allbitstring25_20_IJKL_fullcircuit.txt",
            "auxiliaryFilename": "",
            "experimentFilename": "",
            "order": [
                {
                    "type": "orderlist",
                    "order": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]"
                }
            ],
            "sfaCut": "-1",
            "pepsCut": "[7,11,11,8]",
            "pepsPath": [
                {
                    "type": "orderlist",
                    "order": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]"
                }
            ],
            "gateArgs": [
                {
                    "type": "gateArgs",
                    "unknow": "[0.5,0.1666666667,0,0,0]"
                }
            ]
        }
    ]
}

const tsd=new StructDataClass();
tsd.import(tplInput)

let getBitStringCircles = function (tsd) {
    let asize=tsd.asize
    let csize=tsd.csize
    let circles=[]
    for (let ai = 0; ai < 2**asize; ai++) {
        let pa=(ai+2**asize).toString(2).slice(1)
        let pb=(-1-ai+2*2**asize).toString(2).slice(1)
        for (let ci = 0; ci < 2**csize; ci++) {
            let pc=(ci+2**csize).toString(2).slice(1)
            let pd=(-1-ci+2*2**csize).toString(2).slice(1)
            // ['ABCDCDAB','ABCD'],
            // ['CDABABCD','CDAB'],
            circles.push(
                ['0_'+pa+'_1_'+pc,['0_'+pa,'0_'+pb,'1_'+pc,'1_'+pd],eval('0b'+pa+pc+'0')],
                ['1_'+pc+'_0_'+pa,['1_'+pc,'1_'+pd,'0_'+pa,'0_'+pb],eval('0b'+pa+pc+'1')],
            )
        }
    }
    return circles
}
const circles=getBitStringCircles(tsd)
tsd.searchPath()

const taskDisplay=[['pid','circuitIndex','pname','patterns','sfacost','input']]

circles.forEach(carr=>{
    let [pname,patterns,pid]=carr

    let input=JSON.parse(JSON.stringify(tplInput))

    patterns.forEach((pa,pi)=>{input.showPattern[pi].bitString=pa})

    let sd=new StructDataClass();
    sd.import(input)
    sd.circles=[['IJKLKLIJ','IJKL']]
    let output = sd.processPathsResult()
    let sfacost=output.instance.expectation[3]/output.instance.expectation[0]
    let infos=JSON.stringify(output.maxofmin)

    input.part1=JSON.stringify(output.maxofmin.split)

    input.generatingCircuit[0].simulationFilename=input.generatingCircuit[0].simulationFilename.split('.txt').join('_'+circuitIndex+'.txt')

    input.generatingCircuit[0].auxiliaryFilename=input.generatingCircuit[0].simulationFilename+'.json'
    input.generatingCircuit[0].seed=seed

    inputs.push(input)
    taskDisplay.push([pid,circuitIndex,pname,JSON.stringify(patterns),sfacost,JSON.stringify(input)])

    circuitIndex++;
})



let baseDir='../../MeteorCircuit'
fs.mkdirSync(baseDir+'/circuit',{recursive:true})
inputs.forEach(input=>{
    let sd=new StructDataClass();
    sd.import(input)
    sd.generateCircuit(args=>{
        if (args.simulationFilename) {
            fs.writeFileSync(baseDir+'/'+args.simulationFilename,args.circuit,{encoding:'utf-8'})
        } else {
            // console.log(args.circuit)
        }
        if (args.auxiliaryFilename) {
            fs.writeFileSync(baseDir+'/'+args.auxiliaryFilename,args.auxiliaryText,{encoding:'utf-8'})
        }
        if (args.experimentFilename) {
            fs.writeFileSync(baseDir+'/'+args.experimentFilename,args.experiment,{encoding:'utf-8'})
        }
    })
})

fs.writeFileSync('../output/circuitsAllBitstring.json',JSON.stringify({outFileName:'output/circuitsAllBitstring.xlsx',title:['circuits'],data:[taskDisplay]},null,4),{encoding:'utf-8'})
