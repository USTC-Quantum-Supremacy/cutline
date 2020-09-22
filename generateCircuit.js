// node generateCircuit.js

// node jsfile a1
let withOrder=false
let pepsOrder=[]
if (process.argv[2]==='order') {
    withOrder=true
}

const {StructDataClass,seeds} = require('./main.js')
const fs = require('fs')

let tplInput=JSON.parse(fs.readFileSync('in/generateCircuit.json',{encoding:'utf-8'}))
let pepsCut=JSON.parse(fs.readFileSync('in/pepsCut.json',{encoding:'utf-8'}))
if(withOrder)pepsOrder=JSON.parse(fs.readFileSync('output/orders_peps.json',{encoding:'utf-8'}));

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

let tasks=[
    {meta:1},
    // Verification
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51],d:[8],p:'IJKLKLIJ',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',target:['EXP','PEPS','PEPSTime','once']},
    {n:[54,60,66],d:[8],p:'IJKLKLIJ',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',target:['EXP','PEPS','PEPSTime','super','once']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51],d:[8],p:'IJKLKLIJ',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['EXP','PEPS','PEPSTime','once']},
    {n:[54,60,66],d:[8],p:'IJKLKLIJ',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['EXP','PEPS','PEPSTime','super','once']},
    {n:[66],d:[8],p:'MNOPOPMN',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',target:['EXP','PEPS','PEPSTime','super','once']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IJKLKLIJ',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',target:['EXP','SFA','once']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IIJJKKLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['EXP','PEPS','once']},
    {meta:2},
    // check and politics
    {n:[60],d:[12],p:'IJKLKLIJIJKLKLIJIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer_politics.txt',part1:part1s[0],target:['EXP','SFA','once']},
    {n:[60],d:[12],p:'IJKLKLIJIJKLKLIJIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_politics.txt',part1:part1s[2],target:['EXP','once']},
    {n:[60],d:[12],p:'IJKLKLIJIJKLKLIJIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer_politics.txt',part1:part1s[0],target:['EXP','SFA','SFATime','super','once']},

    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer_politics.txt',part1:part1s[1],target:['EXP','SFA','once']},
    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_politics.txt',part1:part1s[0],target:['EXP','once']},
    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer_politics.txt',part1:part1s[1],target:['EXP','SFA','SFATime','super','once']},
    
    {n:[60],d:[16],p:'IJKLKLIJIJKLKLIJIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer_politics.txt',part1:part1s[3],target:['EXP','SFA','once']},
    {n:[60],d:[16],p:'IJKLKLIJIJKLKLIJIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_politics.txt',part1:part1s[4],target:['EXP','once']},
    {n:[60],d:[16],p:'IJKLKLIJIJKLKLIJIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer_politics.txt',part1:part1s[3],target:['EXP','SFA','SFATime','super','once']},
    
    {n:[60],d:[18],p:'IJKLKLIJIJKLKLIJIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer_politics.txt',part1:part1s[5],target:['EXP','SFA','once']},
    {n:[60],d:[18],p:'IJKLKLIJIJKLKLIJIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_politics.txt',part1:part1s[6],target:['EXP','once']},
    {n:[60],d:[18],p:'IJKLKLIJIJKLKLIJIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer_politics.txt',part1:part1s[5],target:['EXP','SFA','SFATime','super','once']},
    
    // 60qubit SFA supremacy
    {n:[60],d:[18],p:'IJKLKLIJIJKLKLIJIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',part1:part1s[5],target:['EXP','SFA']},
    {n:[60],d:[18],p:'IJKLKLIJIJKLKLIJIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:part1s[6],target:['EXP','SFACutSearch']},
    {n:[60],d:[18],p:'IJKLKLIJIJKLKLIJIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',part1:part1s[5],target:['EXP','SFA','SFATime','super']},
    {n:[60],d:[18],p:'IIIIIJJJJKKKKLLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['EXP','PEPS','PEPSTime','super']},


    {n:[60],d:[16],p:'IJKLKLIJIJKLKLIJIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',part1:part1s[3],target:['EXP','SFA']},
    {n:[60],d:[16],p:'IJKLKLIJIJKLKLIJIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:part1s[4],target:['EXP','SFACutSearch']},
    {n:[60],d:[16],p:'IJKLKLIJIJKLKLIJIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',part1:part1s[3],target:['EXP','SFA','SFATime','super']},
    {n:[60],d:[16],p:'IIIIJJJJKKKKLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['EXP','PEPS','super']},



    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',part1:part1s[1],target:['EXP','SFA']},
    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:part1s[0],target:['EXP','SFACutSearch']},
    {n:[60],d:[14],p:'IJKLKLIJIJKLIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',part1:part1s[1],target:['EXP','SFA','SFATime','super']},
    {n:[60],d:[14],p:'IIIIJJJKKKLLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['EXP','PEPS','super']},

    
    {n:[60],d:[12],p:'IJKLKLIJIJKLKLIJIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',part1:part1s[0],target:['EXP','SFA']},
    {n:[60],d:[12],p:'IJKLKLIJIJKLKLIJIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:part1s[2],target:['EXP','SFACutSearch']},
    {n:[60],d:[12],p:'IJKLKLIJIJKLKLIJIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer.txt',part1:part1s[0],target:['EXP','SFA','SFATime','super']},
    {n:[60],d:[12],p:'IIIJJJKKKLLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike.txt',target:['EXP','PEPS','super']},

    
    // 66qubit SFA supremacy

    {n:[66],d:[16],p:'MNOPOPMNMNOPOPMN',e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',part1:part1s[7],target:['EXP','SFA']},
    {n:[66],d:[16],p:'MNOPOPMNMNOPOPMN',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',part1:part1s[8],target:['EXP','SFACutSearch']},
    {n:[66],d:[16],p:'MNOPOPMNMNOPOPMN',e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',part1:part1s[7],target:['EXP','SFA','SFATime','super']},
    {n:[66],d:[16],p:'MMMMNNNNOOOOPPPP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike.txt',target:['EXP','PEPS','super']},


    {n:[66],d:[14],p:'MNOPOPMNMNOPON',e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',part1:part1s[9],target:['EXP','SFA']},
    {n:[66],d:[14],p:'MNOPOPMNMNOPON',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',part1:part1s[10],target:['EXP','SFACutSearch']},
    {n:[66],d:[14],p:'MNOPOPMNMNOPON',e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',part1:part1s[9],target:['EXP','SFA','SFATime','super']},
    {n:[66],d:[14],p:'MMMNNNNOOOOPPP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike.txt',target:['EXP','PEPS','super']},



    {n:[66],d:[12],p:'MNOPOPMNMNOPOPMN',e:'0layer',s:'circuit/sycamore{n}_{d}_MNOP_E0layer.txt',part1:part1s[11],target:['EXP','SFA']},
    {n:[66],d:[12],p:'MNOPOPMNMNOPOPMN',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',part1:part1s[8],target:['EXP','SFACutSearch']},
    {n:[66],d:[12],p:'MNOPOPMNMNOPOPMN',e:'4layer',s:'circuit/sycamore{n}_{d}_MNOP_E4layer.txt',part1:part1s[11],target:['EXP','SFA','SFATime','super']},
    {n:[66],d:[12],p:'MMMNNNOOOPPP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike.txt',target:['EXP','PEPS','super']},
    {meta:3},
    // Auxliary
    {n:[60],d:[4,6],p:'IJKLKLIJIJKLKLIJIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['PEPS']},
    {n:[66],d:[4,6],p:'MNOPOPMNMNOPOPMN',s:'circuit/sycamore{n}_{d}_MNOP_fullcircuit.txt',target:['PEPS']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IJKLKLIJ',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer_Auxliary.txt',target:['SFA']},
    {n:[15,18,21,24,27,30,33,36,39,42,45,48,51,54,60,66],d:[8],p:'IJKLKLIJ',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_Auxliary.txt',target:['SFA']},
    {n:[60,66],d:[8],p:'IJKLKLIJ',e:'1',s:'circuit/sycamore{n}_{d}_IJKL_E1.txt',target:['superSFATest']},
    {n:[60,66],d:[8],p:'IJKLKLIJ',e:'2',s:'circuit/sycamore{n}_{d}_IJKL_E2.txt',target:['superSFATest']},
    {n:[60,66],d:[8],p:'IJKLKLIJ',e:'3',s:'circuit/sycamore{n}_{d}_IJKL_E3.txt',target:['superSFATest']},
    {n:[60,66],d:[8],p:'IJKLKLIJ',e:'4',s:'circuit/sycamore{n}_{d}_IJKL_E4.txt',target:['superSFATest']},
    {n:[60,66],d:[8],p:'IJKLKLIJ',e:'5',s:'circuit/sycamore{n}_{d}_IJKL_E5.txt',target:['superSFATest']},
    {n:[60,66],d:[8],p:'IJKLKLIJ',e:'6',s:'circuit/sycamore{n}_{d}_IJKL_E6.txt',target:['superSFATest']},
    {n:[60,66],d:[8],p:'IJKLKLIJ',e:'7',s:'circuit/sycamore{n}_{d}_IJKL_E7.txt',target:['superSFATest']},
    {n:[60,66],d:[8],p:'IJKLKLIJ',e:'8',s:'circuit/sycamore{n}_{d}_IJKL_E8.txt',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'1',s:'circuit/sycamore{n}_{d}_IJKL_E1_C0.txt',sfaCut:'0',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'2',s:'circuit/sycamore{n}_{d}_IJKL_E2_C0.txt',sfaCut:'0',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'3',s:'circuit/sycamore{n}_{d}_IJKL_E3_C0.txt',sfaCut:'0',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'4',s:'circuit/sycamore{n}_{d}_IJKL_E4_C0.txt',sfaCut:'0',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'5',s:'circuit/sycamore{n}_{d}_IJKL_E5_C0.txt',sfaCut:'0',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'6',s:'circuit/sycamore{n}_{d}_IJKL_E6_C0.txt',sfaCut:'0',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'7',s:'circuit/sycamore{n}_{d}_IJKL_E7_C0.txt',sfaCut:'0',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'8',s:'circuit/sycamore{n}_{d}_IJKL_E8_C0.txt',sfaCut:'0',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'1',s:'circuit/sycamore{n}_{d}_IJKL_E1_C1.txt',sfaCut:'1',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'2',s:'circuit/sycamore{n}_{d}_IJKL_E2_C1.txt',sfaCut:'1',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'3',s:'circuit/sycamore{n}_{d}_IJKL_E3_C1.txt',sfaCut:'1',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'4',s:'circuit/sycamore{n}_{d}_IJKL_E4_C1.txt',sfaCut:'1',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'5',s:'circuit/sycamore{n}_{d}_IJKL_E5_C1.txt',sfaCut:'1',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'6',s:'circuit/sycamore{n}_{d}_IJKL_E6_C1.txt',sfaCut:'1',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'7',s:'circuit/sycamore{n}_{d}_IJKL_E7_C1.txt',sfaCut:'1',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'8',s:'circuit/sycamore{n}_{d}_IJKL_E8_C1.txt',sfaCut:'1',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'1',s:'circuit/sycamore{n}_{d}_IJKL_E1_C2.txt',sfaCut:'2',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'2',s:'circuit/sycamore{n}_{d}_IJKL_E2_C2.txt',sfaCut:'2',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'3',s:'circuit/sycamore{n}_{d}_IJKL_E3_C2.txt',sfaCut:'2',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'4',s:'circuit/sycamore{n}_{d}_IJKL_E4_C2.txt',sfaCut:'2',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'5',s:'circuit/sycamore{n}_{d}_IJKL_E5_C2.txt',sfaCut:'2',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'6',s:'circuit/sycamore{n}_{d}_IJKL_E6_C2.txt',sfaCut:'2',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'7',s:'circuit/sycamore{n}_{d}_IJKL_E7_C2.txt',sfaCut:'2',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'8',s:'circuit/sycamore{n}_{d}_IJKL_E8_C2.txt',sfaCut:'2',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'1',s:'circuit/sycamore{n}_{d}_IJKL_E1_C3.txt',sfaCut:'3',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'2',s:'circuit/sycamore{n}_{d}_IJKL_E2_C3.txt',sfaCut:'3',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'3',s:'circuit/sycamore{n}_{d}_IJKL_E3_C3.txt',sfaCut:'3',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'4',s:'circuit/sycamore{n}_{d}_IJKL_E4_C3.txt',sfaCut:'3',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'5',s:'circuit/sycamore{n}_{d}_IJKL_E5_C3.txt',sfaCut:'3',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'6',s:'circuit/sycamore{n}_{d}_IJKL_E6_C3.txt',sfaCut:'3',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'7',s:'circuit/sycamore{n}_{d}_IJKL_E7_C3.txt',sfaCut:'3',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'8',s:'circuit/sycamore{n}_{d}_IJKL_E8_C3.txt',sfaCut:'3',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'1',s:'circuit/sycamore{n}_{d}_IJKL_E1_C4.txt',sfaCut:'4',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'2',s:'circuit/sycamore{n}_{d}_IJKL_E2_C4.txt',sfaCut:'4',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'3',s:'circuit/sycamore{n}_{d}_IJKL_E3_C4.txt',sfaCut:'4',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'4',s:'circuit/sycamore{n}_{d}_IJKL_E4_C4.txt',sfaCut:'4',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'5',s:'circuit/sycamore{n}_{d}_IJKL_E5_C4.txt',sfaCut:'4',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'6',s:'circuit/sycamore{n}_{d}_IJKL_E6_C4.txt',sfaCut:'4',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'7',s:'circuit/sycamore{n}_{d}_IJKL_E7_C4.txt',sfaCut:'4',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'8',s:'circuit/sycamore{n}_{d}_IJKL_E8_C4.txt',sfaCut:'4',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'1',s:'circuit/sycamore{n}_{d}_IJKL_E1_C5.txt',sfaCut:'5',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'2',s:'circuit/sycamore{n}_{d}_IJKL_E2_C5.txt',sfaCut:'5',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'3',s:'circuit/sycamore{n}_{d}_IJKL_E3_C5.txt',sfaCut:'5',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'4',s:'circuit/sycamore{n}_{d}_IJKL_E4_C5.txt',sfaCut:'5',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'5',s:'circuit/sycamore{n}_{d}_IJKL_E5_C5.txt',sfaCut:'5',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'6',s:'circuit/sycamore{n}_{d}_IJKL_E6_C5.txt',sfaCut:'5',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'7',s:'circuit/sycamore{n}_{d}_IJKL_E7_C5.txt',sfaCut:'5',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'8',s:'circuit/sycamore{n}_{d}_IJKL_E8_C5.txt',sfaCut:'5',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'1',s:'circuit/sycamore{n}_{d}_IJKL_E1_C6.txt',sfaCut:'6',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'2',s:'circuit/sycamore{n}_{d}_IJKL_E2_C6.txt',sfaCut:'6',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'3',s:'circuit/sycamore{n}_{d}_IJKL_E3_C6.txt',sfaCut:'6',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'4',s:'circuit/sycamore{n}_{d}_IJKL_E4_C6.txt',sfaCut:'6',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'5',s:'circuit/sycamore{n}_{d}_IJKL_E5_C6.txt',sfaCut:'6',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'6',s:'circuit/sycamore{n}_{d}_IJKL_E6_C6.txt',sfaCut:'6',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'7',s:'circuit/sycamore{n}_{d}_IJKL_E7_C6.txt',sfaCut:'6',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'8',s:'circuit/sycamore{n}_{d}_IJKL_E8_C6.txt',sfaCut:'6',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'1',s:'circuit/sycamore{n}_{d}_IJKL_E1_C7.txt',sfaCut:'7',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'2',s:'circuit/sycamore{n}_{d}_IJKL_E2_C7.txt',sfaCut:'7',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'3',s:'circuit/sycamore{n}_{d}_IJKL_E3_C7.txt',sfaCut:'7',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'4',s:'circuit/sycamore{n}_{d}_IJKL_E4_C7.txt',sfaCut:'7',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'5',s:'circuit/sycamore{n}_{d}_IJKL_E5_C7.txt',sfaCut:'7',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'6',s:'circuit/sycamore{n}_{d}_IJKL_E6_C7.txt',sfaCut:'7',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'7',s:'circuit/sycamore{n}_{d}_IJKL_E7_C7.txt',sfaCut:'7',target:['superSFATest']},
    {n:[60],d:[8],p:'IJKLKLIJ',e:'8',s:'circuit/sycamore{n}_{d}_IJKL_E8_C7.txt',sfaCut:'7',target:['superSFATest']},
    
    {n:[30,32,33,34,36],d:[14],p:'IJKLKLIJIJKLIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:part1s[0],target:['SA','seeds']},
    {n:[30,32,33,34,36],d:[20],p:'IJKLKLIJIJKLIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit.txt',part1:part1s[0],target:['SA','seeds']},

    {n:[30],d:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],p:'IJKLKLIJIJKLIL',s:'circuit/sycamore{n}_{d}_IJKL_fullcircuit_for_sample.txt',part1:part1s[0],target:['SA']},
    {n:[54],d:[14],p:'IJKLKLIJIJKLIL',e:'0layer',s:'circuit/sycamore{n}_{d}_IJKL_E0layer.txt',part1:part1s[1],target:['SFA']},


    {n:[60],d:[18],p:'IIIIJJJJKKKKLLLLLI',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike_for_sample5.txt',target:['PEPS']},
    {n:[60],d:[18],p:'IIIIJJJJKKKKLLLLIL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike_for_sample6.txt',target:['PEPS']},

    {n:[66],d:[16],p:'MMMMNNNNOOOOPPPP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike_for_sample4.txt',target:['PEPS']},
    {n:[66],d:[16],p:'MMMNNNNOOOOPPPPM',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike_for_sample5.txt',target:['PEPS']},
    {n:[66],d:[16],p:'MMMNNNNOOOOPPPMP',s:'circuit/sycamore{n}_{d}_MNOP_ABCDlike_for_sample6.txt',target:['PEPS']},

    // i~iiiii total 40
    // I IJ IJK IJKL IJKLI IJKLIL IJKLKLI IJKLKLIJ IJKLK IJKLKL
    // {n:[51],d:[8],p:'IIJJKKLL',s:'circuit/sycamore{n}_{d}_IJKL_ABCDlike_for_sample.txt',target:['PEPS']},

    // 跑sfacut+-1 53:1000条 prefix后的 单核SFA
    // 60:100  66:12条
    {n:[53],d:[20],tpl:'1',p:'IJKLKLIJ',s:'circuit/google_sycamore{n}_{d}_IJKL_fullcircuit.txt',target:['SFACutSearch']},

    {n:[60],d:[16],p:'IJKLKLIJIJKLKLIJIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer_C4.txt',part1:part1s[3],sfaCut:'4',target:['superSFATest']},
    {n:[60],d:[16],p:'IJKLKLIJIJKLKLIJIL',e:'4layer',s:'circuit/sycamore{n}_{d}_IJKL_E4layer_C5.txt',part1:part1s[3],sfaCut:'5',target:['superSFATest']},


    {n:[60],d:[7],p:'IJKLKLIJIJKLKLIJIL',e:'3layer',s:'circuit/sycamore{n}_{d}_IJKL_E3layer.txt',part1:part1s[12],target:['SFA','PEPS']},
    {n:[60],d:[8],p:'IJKLKLIJIJKLKLIJIL',e:'3layer',s:'circuit/sycamore{n}_{d}_IJKL_E3layer.txt',part1:part1s[5],target:['SFA','PEPS']},
    {n:[66],d:[7],p:'MNOPOPMNMNOPOPMN',e:'3layer',s:'circuit/sycamore{n}_{d}_MNOP_E3layer.txt',part1:part1s[13],target:['SFA','PEPS']},
    {n:[66],d:[8],p:'MNOPOPMNMNOPOPMN',e:'3layer',s:'circuit/sycamore{n}_{d}_MNOP_E3layer.txt',part1:part1s[14],target:['SFA','PEPS']},

    // {n:[15,18,21,24,27,30,33,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,66],d:[1],p:'IJCDCDIJ',c:'peps_path/sycamore{n}_cut.txt',target:[]},
    // {n:[66],d:[1],p:'IJCDCDIJ',m:'peps_path/sycamore.txt',target:[]},

    {n:[37,40,45,50,55,60,66],d:[4,5,6,7,8,9,10],p:'EFGH',s:'circuit/sycamore{n}_{d}_EFGH.txt',target:[]},
    {n:[37,40,45,50,55,60,66],d:[4,5,6,7,8,9,10],p:'IJCDCDIJ',s:'circuit/sycamore{n}_{d}_IJCD.txt',target:[]},
    {n:[20,25,30,35,40,45,50,55,60],d:[2,3],p:'IJCDCDIJ',s:'circuit/sycamore{n}_{d}_IJCD.txt',target:[]},
    {n:[60,66],d:[20],p:'EFGH',s:'circuit/sycamore{n}_{d}_EFGH.txt',target:[]},
    {n:[60,66],d:[20],p:'IJCDCDIJ',s:'circuit/sycamore{n}_{d}_IJCD.txt',target:[]},
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
                if (seedi!==0 && ((t.target.indexOf('EXP')===-1 && t.target.indexOf('seeds')===-1) || t.target.indexOf('once')!==-1)) {
                    // ((不含EXP 且 不含seeds) 或 含once) 时只用 seedi==0
                    return;
                }
                if (seedi>=10 && t.target.indexOf('EXP')!==-1) {
                    // EXP 只用 seedi<10
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
                input.generatingCircuit[0].pepsCut=JSON.stringify((peps[n]||peps[0]).c||peps[0].c)
                input.generatingCircuit[0].pepsPath[0].order=JSON.stringify((peps[n]||peps[0]).p||peps[0].p)
                let rr=s=>r(s).split('.txt').join((seedi===0?'':'.s'+seedi)+'.txt')
                input.generatingCircuit[0].simulationFilename=rr(t.s)
                if(t.target.indexOf('EXP')!==-1)input.generatingCircuit[0].experimentFilename=rr(t.s)+'.qcis'
                input.generatingCircuit[0].auxiliaryFilename=rr(t.s)+'.json'
                input.generatingCircuit[0].seed=seed
                if (t.target.indexOf('PEPS')!==-1) {
                    if (withOrder) {
                        input.generatingCircuit[0].pepsPath[0].order=JSON.stringify(pepsOrder[PEPSInputs.length].order);
                        if (t.target.indexOf('PEPSTime')!==-1) PEPSTimeInputs.push([input,t,n,d,input.generatingCircuit[0].simulationFilename]);
                    }
                    PEPSInputs.push([input,t,n,d,input.generatingCircuit[0].simulationFilename]);
                }
                if (t.target.indexOf('SFATime')!==-1) SFATimeInputs.push([input,t,n,d,input.generatingCircuit[0].simulationFilename]);
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