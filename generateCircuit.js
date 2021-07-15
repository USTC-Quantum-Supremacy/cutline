// node generateCircuit.js
let counterorder = false // give up order when using this flag but use same makefile process

// node jsfile a1
let withOrder=false
let pepsOrder=[]
if (process.argv[2]==='order') {
    withOrder=true
}
if (process.argv[2]==='counterorder') {
    withOrder=true
    counterorder = true // give up order when using this flag but use same makefile process
}

const {StructDataClass,seeds} = require('./main.js')
const fs = require('fs')

let tplInput=JSON.parse(fs.readFileSync('in/generateCircuit.json',{encoding:'utf-8'}))
let pepsCut=JSON.parse(fs.readFileSync('in/pepsCut.json',{encoding:'utf-8'}))
if(withOrder && !counterorder)pepsOrder=JSON.parse(fs.readFileSync('output/orders_peps.json',{encoding:'utf-8'}));

const part1s=[
    '[0,1,10,11,12,13,14,15,18,19,2,20,21,24,25,26,3,30,31,32,36,37,4,42,43,48,6,7,8,9]', // 0
    '[0,1,10,11,13,14,15,16,2,20,21,22,23,26,27,28,3,33,34,35,39,4,40,46,47,52,59,7,8,9]', // 1
    '[0,1,10,11,12,13,14,15,16,18,19,2,20,21,22,24,25,26,27,3,30,31,32,33,36,4,42,6,7,8,9]', // 2
    '[0,1,10,11,12,13,14,15,16,18,19,2,20,21,24,25,26,3,30,31,32,36,37,4,42,43,6,7,8,9]', // 3
    '[0,1,10,11,12,13,14,15,16,18,19,2,20,21,22,23,25,26,27,28,3,32,33,34,35,4,40,6,7,8,9]', // 4
    '[0,1,10,12,13,14,15,18,19,2,20,21,24,25,26,3,30,31,32,36,37,4,42,43,48,54,6,7,8,9]', // 5
    '[0,1,10,11,12,13,14,15,16,18,19,2,20,21,22,23,24,26,27,28,3,30,34,35,4,40,6,7,8,9,5,17,29]', // 6
    '[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,24,25,26,27,3,30,31,32,33,36,37,38,4,5,6,7,8,9]', // 7
    '[0,1,12,13,14,18,19,2,20,21,24,25,26,3,30,31,32,33,36,37,38,42,43,44,48,49,54,55,6,60,7,8,9]', // 8
    '[0,1,10,11,13,14,15,16,17,2,20,21,22,23,26,27,28,29,3,33,34,35,39,4,40,41,46,47,5,52,53,7,8,9]', // 9
    '[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,25,26,27,28,29,3,31,35,4,41,5,6,7,8,9]', // 10
    '[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,25,26,27,28,3,30,31,32,33,34,4,5,6,7,8,9]', // 11
    '[0,1,10,11,12,13,14,15,16,2,20,21,22,23,26,27,28,3,33,34,35,39,4,40,46,47,6,7,8,9]', // 12
    '[0,12,13,18,19,24,25,30,31,32,36,37,38,42,43,44,45,48,49,50,51,54,55,56,57,58,6,60,61,62,63,64,7]', // 13
    '[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,24,25,26,27,28,3,30,32,33,38,4,5,6,7,8,9]', // 14
]

let mp = (ps,ns)=>Array.from(ns).map(v=>ps[v]).join('')

let tasks=[
    {meta:1},
    // Verification
    {n:[15,18,21,24,27,30,33],d:[10],p:mp('IJKL','01232301'),e:'6layer',s:'circuit/sycamore{n}_{d}_IJKL_E6layer.txt',target:['EXP','SA']},
    {n:[36,39,42,45,48,51,54,57,60],d:[10],p:mp('IJKL','01232301'),e:'6layer',s:'circuit/sycamore{n}_{d}_IJKL_E6layer.txt',target:['EXP','PEPS','PEPSTime','super']},
    {n:[15,18,21,24,27,30,33],d:[10],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['EXP','SA']},
    {n:[36,39,42,45,48,51,54,57,60],d:[10],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['EXP','PEPS','PEPSTime','super']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60],d:[10],p:mp('IJKL','01232301'),e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',target:['EXP','PATCH']},
    {meta:2},
    
    // 60qubit SFA supremacy
    {n:[60],d:[12],p:mp('IJKL','01232301'),e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',target:['EXP','PATCH']},
    {n:[60],d:[12],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:'[0,1,10,12,13,14,15,16,18,19,2,20,21,23,24,25,26,3,30,31,32,36,37,42,6,7,8,9]',target:['EXP','SFACutSearch','TNCTime']},
    {n:[60],d:[12],p:mp('IJKL','01232301'),e:'9',sfaCut:'5',s:'circuit/sycamore{n}_{d}_IJKL_E8gate.txt',target:['EXP','SFA','SFATime','super']},
    
    {n:[60],d:[14],p:mp('IJKL','01232301'),e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',target:['EXP','PATCH']},
    {n:[60],d:[14],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:'[0,1,10,12,13,14,15,16,18,19,2,20,21,23,24,25,26,3,30,31,32,36,37,42,6,7,8,9]',target:['EXP','SFACutSearch','TNCTime']},
    {n:[60],d:[14],p:mp('IJKL','01232301'),e:'8',sfaCut:'5',s:'circuit/sycamore{n}_{d}_IJKL_E8gate.txt',target:['EXP','SFA','SFATime','super']},

    {n:[60],d:[16],p:mp('IJKL','01232301'),e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',target:['EXP','PATCH']},
    {n:[60],d:[16],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:'[0,1,10,12,13,14,15,16,18,19,2,20,21,23,24,25,26,3,30,31,32,36,37,42,6,7,8,9]',target:['EXP','SFACutSearch','TNCTime']},
    {n:[60],d:[16],p:mp('IJKL','01232301'),e:'9',sfaCut:'5',s:'circuit/sycamore{n}_{d}_IJKL_E8gate.txt',target:['EXP','SFA','SFATime','super']},

    {n:[60],d:[18],p:mp('IJKL','01232301'),e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',target:['EXP','PATCH']},
    {n:[60],d:[18],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:'[0,1,10,12,13,14,15,16,18,19,2,20,21,23,24,25,26,3,30,31,32,36,37,42,6,7,8,9]',target:['EXP','SFACutSearch','TNCTime']},
    {n:[60],d:[18],p:mp('IJKL','01232301'),e:'9',sfaCut:'5',s:'circuit/sycamore{n}_{d}_IJKL_E8gate.txt',target:['EXP','SFA','SFATime','super']},

    {n:[60],d:[20],p:mp('IJKL','01232301'),e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',target:['EXP','PATCH']},
    {n:[60],d:[20],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:'[0,1,10,12,13,14,15,16,18,19,2,20,21,23,24,25,26,3,30,31,32,36,37,42,6,7,8,9]',target:['EXP','SFACutSearch','TNCTime']},
    {n:[60],d:[20],p:mp('IJKL','01232301'),e:'9',sfaCut:'5',s:'circuit/sycamore{n}_{d}_IJKL_E8gate.txt',target:['EXP','SFA','SFATime','super']},

    {n:[60],d:[22],p:mp('IJKL','01232301'),e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',target:['EXP','PATCH']},
    {n:[60],d:[22],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:'[0,1,10,12,13,14,15,16,18,19,2,20,21,23,24,25,26,3,30,31,32,36,37,42,6,7,8,9]',target:['EXP','SFACutSearch','TNCTime']},
    {n:[60],d:[22],p:mp('IJKL','01232301'),e:'8',sfaCut:'5',s:'circuit/sycamore{n}_{d}_IJKL_E8gate.txt',target:['EXP','SFA','SFATime','super']},

    {n:[60],d:[24],p:mp('IJKL','01232301'),e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',target:['EXP','PATCH']},
    {n:[60],d:[24],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:'[0,1,10,12,13,14,15,16,18,19,2,20,21,23,24,25,26,3,30,31,32,36,37,42,6,7,8,9]',target:['EXP','SFACutSearch','TNCTime']},
    {n:[60],d:[24],p:mp('IJKL','01232301'),e:'9',sfaCut:'5',s:'circuit/sycamore{n}_{d}_IJKL_E8gate.txt',target:['EXP','SFA','SFATime','super']},

    // 66qubit SFA supremacy
    // {n:[66],d:[12],p:mp('MNOP','012323010123'),e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,19,2,20,21,22,23,25,26,27,28,29,3,32,33,34,35,4,41,5,6,7,8,9]',target:['EXP','PATCH','once']},
    // {n:[66],d:[12],p:mp('MNOP','012323010123'),s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',part1:'[0,1,10,11,12,13,14,15,16,17,19,2,20,21,22,23,25,26,27,28,29,3,33,34,35,4,40,41,5,6,7,8,9]',target:['EXP','SFACutSearch','TNCTime','once']},
    // {n:[66],d:[12],p:mp('MNOP','012323010123'),e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,19,2,20,21,22,23,25,26,27,28,29,3,32,33,34,35,4,41,5,6,7,8,9]',target:['EXP','SFA','SFATime','super','once']},

    {n:[66],d:[14],p:mp('MNOP','01232301012301'),e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,25,26,27,28,29,3,34,35,4,40,41,5,6,7,8,9]',target:['EXP','PATCH','once']},
    {n:[66],d:[14],p:mp('MNOP','01232301012301'),s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',part1:'[0,1,10,12,13,14,15,18,19,2,20,21,24,25,26,3,30,31,32,36,37,42,43,44,48,49,54,55,6,60,7,8,9]',target:['EXP','SFACutSearch','TNCTime','once']},
    {n:[66],d:[14],p:mp('MNOP','01232301012301'),e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,25,26,27,28,29,3,34,35,4,40,41,5,6,7,8,9]',target:['EXP','SFA','SFATime','super','once']},

    {n:[66],d:[16],p:mp('MNOP','0123230101232301'),e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,25,26,27,28,29,3,34,35,4,40,41,5,6,7,8,9]',target:['EXP','PATCH','once']},
    {n:[66],d:[16],p:mp('MNOP','0123230101232301'),s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,25,26,27,28,29,3,33,34,35,4,40,5,6,7,8,9]',target:['EXP','SFACutSearch','TNCTime','once']},
    {n:[66],d:[16],p:mp('MNOP','0123230101232301'),e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,25,26,27,28,29,3,34,35,4,40,41,5,6,7,8,9]',target:['EXP','SFA','SFATime','super','once']},

    {n:[66],d:[18],p:mp('MNOP','012323010123230103'),e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',part1:'[0,1,10,11,12,13,14,15,16,18,19,2,20,21,22,24,25,26,27,3,30,31,32,33,36,37,4,42,5,6,7,8,9]',target:['EXP','PATCH']},
    {n:[66],d:[18],p:mp('MNOP','012323010123230103'),s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',part1:'[0,1,10,11,12,13,14,15,16,17,18,19,2,20,21,22,23,25,26,27,28,29,3,32,33,34,35,4,5,6,7,8,9]',target:['EXP','SFACutSearch','TNCTime']},
    {n:[66],d:[18],p:mp('MNOP','012323010123230103'),e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',part1:'[0,1,10,11,12,13,14,15,16,18,19,2,20,21,22,24,25,26,27,3,30,31,32,33,36,37,4,42,5,6,7,8,9]',target:['EXP','SFA','SFATime','super']},

    // {n:[66],d:[20],p:mp('MNOP','01232301012323010123'),e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,19,2,20,21,22,23,25,26,27,28,29,3,32,33,34,35,4,41,5,6,7,8,9]',target:['EXP','PATCH']},
    // {n:[66],d:[20],p:mp('MNOP','01232301012323010123'),s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',part1:'[0,1,10,11,12,13,14,15,16,17,19,2,20,21,22,23,25,26,27,28,29,3,33,34,35,4,40,41,5,6,7,8,9]',target:['EXP','SFACutSearch','TNCTime']},
    // {n:[66],d:[20],p:mp('MNOP','01232301012323010123'),e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',part1:'[0,1,10,11,12,13,14,15,16,17,19,2,20,21,22,23,25,26,27,28,29,3,32,33,34,35,4,41,5,6,7,8,9]',target:['EXP','SFA','SFATime','super']},

    // elided - length: 9,5,9,5,9  ,  8,8,8,4,8

    {n:[15,21,30],d:[6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_fordepthtest.txt',target:['EXP','SA','once']},

    // [...Array(66)].map((v,i)=>i).filter(v=>a.indexOf(v)==-1).join(',')
    // a=sd.input.brokenBits;a=JSON.parse(a);b=[...Array(66)].map((v,i)=>i).filter(v=>a.indexOf(v)==-1).sort((a,b)=>a-b);console.log(b.length);console.log(b.concat(a).join(','))
    {n:[18],d:[10,12,14,16,18,20,22,24,30,40],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_reargs_p1.txt',order:'[0,1,2,6,7,8,12,13,14,18,19,20,24,25,26,30,31,32,3,4,5,9,10,11,15,16,17,21,22,23,27,28,29,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65]',part1:'[0,1,2,6,7,8,12,13,14,18,19]',target:['EXP','SA','once']},
    {n:[18],d:[10,12,14,16,18,20,22,24,30,40],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_reargs_p2.txt',order:'[2,3,9,10,14,15,16,21,23,26,27,28,29,33,34,35,40,41,0,1,4,5,6,7,8,11,12,13,17,18,19,20,24,25,30,31,32,36,37,38,39,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,22]',part1:'[2,3,9,10,14,15,16,21]',target:['EXP','SA','once']},
    {n:[18],d:[10,12,14,16,18,20,22,24,30,40],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_reargs_p3.txt',order:'[30,31,32,36,37,38,42,43,44,48,49,50,54,55,56,60,61,62,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,33,34,35,39,40,41,45,46,47,51,52,53,57,58,59,63,64,65]',part1:'[30,31,32,36,37,38,42]',target:['EXP','SA','once']},
    {n:[19],d:[10,12,14,16,18,20,22,24,30,40],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_reargs_p4.txt',order:'[33,34,38,39,40,41,45,46,47,50,51,52,53,57,58,59,62,63,64,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,35,36,37,42,43,44,48,49,54,55,56,60,61,65]',part1:'[33,34,38,39,40,41,45,46,47,50]',target:['EXP','SA','once']},

    {n:[60],d:[10,12,14,16,18,20,22,24,30,40],p:mp('IJKL','01232301'),e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer_reargs2_p1.txt',part1:'[0,1,2,6,7,8,12,13,14,18,19,20,24,25,26,30,31,32]',target:['EXP','PATCH','once']},
    {n:[60],d:[10,12,14,16,18,20,22,24,30,40],p:mp('IJKL','01232301'),e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer_reargs2_p2.txt',part1:'[2,3,9,10,14,15,16,21,23,26,27,28,29,33,34,35,40,41]',target:['EXP','PATCH','once']},
    {n:[60],d:[10,12,14,16,18,20,22,24,30,40],p:mp('IJKL','01232301'),e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer_reargs2_p3.txt',part1:'[30,31,32,36,37,38,42,43,44,48,49,50,54,55,56,60,61,62]',target:['EXP','PATCH','once']},
    {n:[60],d:[10,12,14,16,18,20,22,24,30,40],p:mp('IJKL','01232301'),e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer_reargs2_p4.txt',part1:'[33,34,38,39,40,41,45,46,47,50,51,52,53,57,58,59,62,63,64]',target:['EXP','PATCH','once']},



    


    {meta:3},
    // Check(give up, use reargs circuit instead)

    {n:[60],d:[10],p:mp('IJKL','0123230101'),e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_CheckARun.txt',part1:'[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]',target:['EXP','Check','A_Run','PATCH','once']},

    {n:[66],d:[10],p:mp('MNOP','0123230101'),e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_CheckBRun.txt',part1:'[0,1,2,6,7,8,12,13,14,18,19,20,24,25,26,30,31,32,36,37,38,42,43,44,48,49,50,54,55,56,60,61,62]',target:['EXP','Check','B_Run','PATCH','once']},


    // Auxliary
    {n:[60],d:[4,6],p:'IJKLKLIJIJKLKLIJIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['PEPS']},
    {n:[66],d:[4,6],p:'MNOPOPMNMNOPOPMN',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',target:['PEPS']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:mp('IJKL','01232301'),e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer_Auxliary.txt',target:['SFA']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_Auxliary.txt',target:['SFA']},
    
    {n:[26,27,30,32,33,34,36],d:[14],p:'IJKLKLIJIJKLIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:part1s[0],target:['SA','seeds']},
    {n:[26,27,30,32,33,34,36],d:[20],p:'IJKLKLIJIJKLIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:part1s[0],target:['SA','seeds']},

    {n:[30],d:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],p:'IJKLKLIJIJKLIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_for_sample.txt',part1:part1s[0],target:['SA']},
    {n:[54],d:[14],p:'IJKLKLIJIJKLIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',part1:part1s[1],target:['PATCH']},

    {n:[53],d:[20],tpl:'1',p:mp('IJKL','01232301'),s:'circuit/google_sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['SFACutSearch']},
    

    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[10],p:'IJKLKLIJIJ',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_PYPEPSTime.txt',target:['PYPEPSTime']},
    {n:[66],d:[10],p:'MNOPOPMNMN',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit_PYPEPSTime.txt',target:['PYPEPSTime']},

    {n:[60],d:[22],tpl:'2',p:mp('IJKL','0123230101232301012301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_tail01.txt',target:[]},
    //23 39.6
    {n:[60],d:[22],p:mp('IJKL','0123230101232301012301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_sp_tail01.txt',target:[]},//37.5
    // {n:[60],d:[22],p:mp('IJKL','0123230101232301012302'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_sp_tail01.txt',target:[]},//37.1
    {n:[60],d:[22],p:mp('IJKL','0123230101232301012303'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_sp_tail03.txt',target:[]},//37.5
    {n:[60],d:[22],p:mp('IJKL','0123230101232301012310'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_sp_tail10.txt',target:[]},//38
    {n:[60],d:[22],p:mp('IJKL','0123230101232301012312'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_sp_tail12.txt',target:[]},//38.6
    {n:[60],d:[22],p:mp('IJKL','0123230101232301012313'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_sp_tail13.txt',target:[]},//39.1
    {n:[60],d:[22],p:mp('IJKL','0123230101232301012320'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_sp_tail20.txt',target:[]},//38.1
    {n:[60],d:[22],p:mp('IJKL','0123230101232301012321'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_sp_tail21.txt',target:[]},//38.5


    // cal xeb when perfect
    {n:[15,18,21,24,27,30,33,36],d:[10],p:'IJKLKLIJIJ',e:'6layer',s:'circuit/sycamore{n}_{d}_IJKL_xebcal_E6layer.txt',target:['SA','xebcal','eseeds']},
    // {n:[15,18,21,24,27,30,33,36],d:[8],p:mp('IJKL','01232301'),e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_xebcal_E4layer.txt',target:['SA','xebcal','eseeds']},
    // {n:[15,18,21,24,27,30,33,36],d:[8],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_xebcal_fullcircuit.txt',target:['SA','xebcal','eseeds']},
    // {n:[15,18,21,24,27,30,33,36],d:[8],p:'IIJJKKLL',s:'circuit/sycamore{n}_{d}_IJKL_xebcal_ABCDlike.txt',target:['SA','xebcal','eseeds']},

    // removed out exp
    {n:[15],d:[8],p:mp('IJKL','01232301'),e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',target:['PEPS']},
    {n:[18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:mp('IJKL','01232301'),e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',target:[]},
    {n:[15],d:[8],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['PEPS']},
    {n:[18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',target:[]},
    {n:[60],d:[8],p:mp('IJKL','01232301'),s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_peps.txt',target:['PEPS']},
    {n:[66],d:[8],p:mp('MNOP','01232301'),s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',target:[]},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:mp('IJKL','01232301'),e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',target:['PATCH']},
    {n:[15],d:[8],p:'IIJJKKLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['PEPS']},
    {n:[18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IIJJKKLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:[]},
    {n:[60],d:[18],p:'IIIIIJJJJKKKKLLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:[]},
    {n:[60],d:[16],p:'IIIIJJJJKKKKLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:[]},
    {n:[60],d:[14],p:'IIIIJJJKKKLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:[]},
    {n:[60],d:[12],p:'IIIJJJKKKLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:[]},
    {n:[66],d:[16],p:'MMMMNNNNOOOOPPPP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike.txt',target:[]},
    {n:[66],d:[14],p:'MMMNNNNOOOOPPP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike.txt',target:[]},
    {n:[66],d:[12],p:'MMMNNNOOOPPP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike.txt',target:[]},
    // removed out exp end

]

const taskDisplay=[['n','depth','name','task','input','targets','seedIndex','circuitIndex','taskIndex']]
let inputs=[]
let PEPSInputs=[]
let PEPSTimeInputs=[]
let SFATimeInputs=[]

let circuitIndex =1;
let taskIndex =1;
let meta=0

tasks.forEach(t=>{
    if (t.meta) {
        meta=t.meta
        return
    }
    t.n.forEach(n=>{
        t.d.forEach(d=>{
            seeds.forEach((seed,seedi)=>{
                if (seedi!==0 && ((t.target.indexOf('EXP')===-1 && t.target.indexOf('seeds')===-1 && t.target.indexOf('eseeds')===-1) || t.target.indexOf('once')!==-1)) {
                    // ((不含EXP 且 不含seeds) 或 含once) 时只用 seedi==0
                    return;
                }
                if (seedi>=20 && (t.target.indexOf('EXP')!==-1 || t.target.indexOf('eseeds')!==-1)) {
                    // EXP 只用 seedi<20
                    return;
                }
                let r=s=>(s||'').split('{n}').join(n).split('{d}').join(d)
                let tpli=~~r(t.tpl)
                let input=JSON.parse(JSON.stringify(tplInput[tpli]))
                let peps=pepsCut[tpli]
                input.generatingCircuit[0].qubitNumber=n
                input.depth=d+''
                input.part1=r(t.part1)||input.part1
                input.generatingCircuit[0].pattern=r(t.p)
                input.generatingCircuit[0].elided=r(t.e)
                input.generatingCircuit[0].sfaCut=r(t.sfaCut)||'-1'
                input.generatingCircuit[0].pepsCut=r(t.pc)||JSON.stringify((peps[n]||peps[0]).c||peps[0].c)
                input.generatingCircuit[0].pepsPath[0].order=JSON.stringify((peps[n]||peps[0]).p||peps[0].p)
                if (t.order)input.generatingCircuit[0].order[0].order=t.order
                let rr=s=>r(s).split('.txt').join((seedi===0?'':'.s'+seedi)+'.txt')
                input.generatingCircuit[0].simulationFilename=rr(t.s)
                if(t.target.indexOf('EXP')!==-1)input.generatingCircuit[0].experimentFilename=rr(t.s)+'.qcis'
                input.generatingCircuit[0].auxiliaryFilename=rr(t.s)+'.json'
                input.generatingCircuit[0].seed=seed
                if (t.target.indexOf('PEPS')!==-1) {
                    if (withOrder && !counterorder) {
                        input.generatingCircuit[0].pepsPath[0].order=JSON.stringify(pepsOrder[PEPSInputs.length].order);
                        if (t.target.indexOf('PEPSTime')!==-1) PEPSTimeInputs.push([input,t,n,d,input.generatingCircuit[0].simulationFilename]);
                    }
                    PEPSInputs.push([input,t,n,d,input.generatingCircuit[0].simulationFilename]);
                }
                if (t.target.indexOf('SFATime')!==-1 && seedi==0) SFATimeInputs.push([input,t,n,d,input.generatingCircuit[0].simulationFilename]);
                inputs.push(input)
                if (meta===2) {
                    taskIndex++
                }
                if (meta===3) {
                    taskIndex=-1
                }
                taskDisplay.push([n,d,(input.generatingCircuit[0].simulationFilename||'/').split('/')[1],JSON.stringify(t),JSON.stringify(input),t.target.join('_')||'null',seedi,circuitIndex,taskIndex])
                circuitIndex++;
            })
        })
    })
})
fs.writeFileSync('output/inputs.json','[\n'+inputs.map(v=>JSON.stringify(v)).join('\n,\n')+'\n]',{encoding:'utf-8'})
if (withOrder) {
    fs.writeFileSync('output/PEPSTimeInputs.json','[\n'+PEPSTimeInputs.map(v=>JSON.stringify(v)).join('\n,\n')+'\n]',{encoding:'utf-8'});
    fs.writeFileSync('output/SFATimeInputs.json','[\n'+SFATimeInputs.map(v=>JSON.stringify(v)).join('\n,\n')+'\n]',{encoding:'utf-8'});
} else {
    fs.writeFileSync('output/dimensionTasks.json','[\n'+PEPSInputs.map(v=>JSON.stringify(v)).join('\n,\n')+'\n]',{encoding:'utf-8'});
}

let baseDir='../MeteorCircuit'
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

if (withOrder) {
    fs.writeFileSync('output/circuits.json',JSON.stringify({outFileName:'output/circuits.xlsx',title:['circuits'],data:[taskDisplay]},null,4),{encoding:'utf-8'})
}