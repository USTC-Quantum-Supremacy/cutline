var input={
    "type": "prog",
    "xsize": "12",
    "ysize": "11",
    "use00": false,
    "brokenBits": "[]",
    "part1": "[0,1,12,13,14,18,19,2,20,21,24,25,26,3,30,31,32,33,36,37,38,42,43,44,48,49,54,55,6,60,7,8,9]",
    "depth": "8",
    "searchPattern": "01232301",
    "errorRates": "[0.0016,0.0062,0.038]",
    "removedEntrances": "[]",
    "balancedRange": 6,
    "search": "prune",
    "showMark": [
        {
            "type": "orderlist",
            "order": "[54,60,48,55,42,61,62,56,49,43,36,30,50,44,37,31,24,18,38,32,25,19,12,6,0,7,13,20,26,33,1,8,2,14,21,27,9,15,22,3,10,4,16,11,5,17,23,29,28,35,41,34,40,47,39,46,53,52,59,65,64,58,45,51,57,63]"
        }
    ],
    "showPattern": [
        {
            "type": "patternDefine",
            "pattern": "I",
            "bitString": "0_0000000000"
        },
        {
            "type": "patternDefine",
            "pattern": "J",
            "bitString": "0_1111111111"
        },
        {
            "type": "patternDefine",
            "pattern": "K",
            "bitString": "1_0000001100"
        },
        {
            "type": "patternDefine",
            "pattern": "L",
            "bitString": "1_1111110011"
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
            "qubitNumber": 66,
            "elided": "",
            "pattern": "IJKLKLIJ",
            "seed": 13874234,
            "simulationFilename": "circuit/sycamore66_8_IJKL_fullcircuit.txt",
            "cutFilename": "",
            "mapFilename": "",
            "experimentFilename": "",
            "order": [
                {
                    "type": "orderlist",
                    "order": "[30,24,31,36,42,43,18,19,37,25,44,20,32,48,49,12,13,50,38,14,26,45,21,33,51,39,15,27,54,55,6,7,56,57,8,9,58,46,10,22,34,52,40,16,28,60,61,0,1,62,63,2,3,64,59,4,11,47,23,35,53,41,17,29,65,5]"
                }
            ],
            "pepsCut": "[38,45,45,50,50,57,57,62]",
            "pepsPath": [
                {
                    "type": "orderlist",
                    "order": "[1]"
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
document.querySelector("#blocklyinput").value=JSON.stringify(input)
buildMainSVG()
var edgeDimension=[
    [54,60,4],
    [5,8,8],
    [27,40,16],
    [23,25,16],
    [33,49,4],
    [32,46,4],
    [14,32,16],
    [6,15,4],
    [3,4,4],
    [24,36,16],
    [18,21,16],
    [55,56,4],
    [31,47,4],
    [58,63,4],
    [13,28,4],
    [11,16,16],
    [27,39,8],
    [33,50,4],
    [22,26,8],
    [22,27,16],
    [35,51,4],
    [0,1,4],
    [43,58,16],
    [56,62,4],
    [38,55,4],
    [2,3,8],
    [25,37,16],
    [7,15,16],
    [35,52,4],
    [1,2,16],
    [12,18,16],
    [14,29,8],
    [18,23,8],
    [41,54,16],
    [9,11,8],
    [59,63,4],
    [15,30,4],
    [15,31,8],
    [0,3,4],
    [2,8,16],
    [34,48,4],
    [1,7,8],
    [7,16,8],
    [12,20,8],
    [37,41,16],
    [38,43,16],
    [54,64,2],
    [37,42,8],
    [39,43,8],
    [36,50,4],
    [21,24,16],
    [42,59,8],
    [53,54,4],
    [24,33,8],
    [20,23,16],
    [30,47,4],
    [25,40,8],
    [26,35,16],
    [10,14,8],
    [57,61,4],
    [16,31,16],
    [40,44,8],
    [34,51,4],
    [29,45,4],
    [16,34,8],
    [17,21,8],
    [36,41,8],
    [21,25,8],
    [36,53,4],
    [43,56,8],
    [9,12,16],
    [11,19,8],
    [19,22,16],
    [57,60,4],
    [26,38,8],
    [19,34,16],
    [31,48,4],
    [38,52,4],
    [10,17,16],
    [17,33,16],
    [10,18,8],
    [41,57,8],
    [1,6,4],
    [20,22,8],
    [42,57,16],
    [4,13,4],
    [58,62,4],
    [44,59,16],
    [28,45,4],
    [29,46,4],
    [24,37,8],
    [3,5,16],
    [8,12,8],
    [17,32,8],
    [56,65,4],
    [19,35,8],
    [11,20,16],
    [40,42,16],
    [32,49,4],
    [13,29,16],
    [2,9,8],
    [8,10,16],
    [44,58,8],
    [39,44,16],
    [59,61,4],
    [5,13,8],
    [5,14,16],
    [23,27,8],
    [26,39,16],
    [7,9,16]
]
var orderList=eval(sd.input.generatingCircuit[0].order[0].order)
var n=sd.input.generatingCircuit[0].qubitNumber
var cutInput=eval(sd.input.generatingCircuit[0].pepsCut)
var bitCount=sd.bitCount

var cut_obj={}
cutInput.map((v,i,a)=>[v,a[i+1]]).filter((v,i)=>i%2===0).forEach(v=>{
    var a=v[0],b=v[1];
    if (a>b) {
        [a,b]=[b,a]
    }
    if(cut_obj[a]==null)cut_obj[a]={};
    cut_obj[a][b]=true
})
var cut=(a,b)=>{
    if (a>b) {
        [a,b]=[b,a]
    }
    if(cut_obj[a]==null)return false
    return cut_obj[a][b]===true
}

var edge={}
edgeDimension.forEach(v => {
    var a=orderList[v[0]],b=orderList[v[1]];
    if (a>b) {
        [a,b]=[b,a]
    }
    if(edge[a]==null)edge[a]={};
    edge[a][b]=v[2]
});

/*
{
    "0": {
        "6": 4,
        "7": 4
    },
    "1": {
        "7": 4,
        "8": 4
    },
    "2": {
        "8": 4,
        "9": 4
    },
    "3": {
        "9": 4,
        "10": 4
    },
    "4": {
        "10": 4,
        "11": 4
    },
    "5": {
        "11": 4
    },
    "6": {
        "12": 4
    },
    "7": {
        "12": 8,
        "13": 16
    },
    "8": {
        "13": 8,
        "14": 16
    },
    "9": {
        "14": 8,
        "15": 16
    },
    "10": {
        "15": 8,
        "16": 16
    },
    "11": {
        "16": 8,
        "17": 4
    },
    "12": {
        "18": 4,
        "19": 16
    },
    "13": {
        "19": 8,
        "20": 16
    },
    "14": {
        "20": 8,
        "21": 16
    },
    "15": {
        "21": 8,
        "22": 16
    },
    "16": {
        "22": 8,
        "23": 16
    },
    "17": {
        "23": 4
    },
    "18": {
        "24": 4
    },
    "19": {
        "24": 8,
        "25": 16
    },
    "20": {
        "25": 8,
        "26": 16
    },
    "21": {
        "26": 8,
        "27": 16
    },
    "22": {
        "27": 8,
        "28": 16
    },
    "23": {
        "28": 8,
        "29": 4
    },
    "24": {
        "30": 4,
        "31": 16
    },
    "25": {
        "31": 8,
        "32": 16
    },
    "26": {
        "32": 8,
        "33": 16
    },
    "27": {
        "33": 8,
        "34": 16
    },
    "28": {
        "34": 8,
        "35": 16
    },
    "29": {
        "35": 4
    },
    "30": {
        "36": 4
    },
    "31": {
        "36": 8,
        "37": 16
    },
    "32": {
        "37": 8,
        "38": 16
    },
    "33": {
        "38": 8,
        "39": 16
    },
    "34": {
        "39": 8,
        "40": 16
    },
    "35": {
        "40": 8,
        "41": 4
    },
    "36": {
        "42": 4,
        "43": 16
    },
    "37": {
        "43": 8,
        "44": 16
    },
    "38": {
        "44": 8,
        "45": 16
    },
    "39": {
        "45": 8,
        "46": 16
    },
    "40": {
        "46": 8,
        "47": 16
    },
    "41": {
        "47": 4
    },
    "42": {
        "48": 4
    },
    "43": {
        "48": 8,
        "49": 16
    },
    "44": {
        "49": 8,
        "50": 16
    },
    "45": {
        "50": 8,
        "51": 16
    },
    "46": {
        "51": 8,
        "52": 16
    },
    "47": {
        "52": 8,
        "53": 4
    },
    "48": {
        "54": 4,
        "55": 16
    },
    "49": {
        "55": 8,
        "56": 16
    },
    "50": {
        "56": 8,
        "57": 16
    },
    "51": {
        "57": 8,
        "58": 16
    },
    "52": {
        "58": 8,
        "59": 16
    },
    "53": {
        "59": 4
    },
    "54": {
        "60": 4
    },
    "55": {
        "60": 4,
        "61": 4
    },
    "56": {
        "61": 4,
        "62": 4
    },
    "57": {
        "62": 4,
        "63": 4
    },
    "58": {
        "63": 4,
        "64": 4
    },
    "59": {
        "64": 4,
        "65": 2
    }
}
*/

var thissvg=document.querySelector("#insertHere > svg")
var thisg=document.createElement('g')



var newline =function (o1,o2,q1,q2,mark) {
    let qubit1=this.data.qubit(q1)
    let qubit2=this.data.qubit(q2)
    let save = (qubit1.save && qubit2.save)?'save':'notsave'
    let split = this.data.edge([q1,q2]).isSplitEdge?'split':''
    let notinmax = (!qubit1.area2 || !qubit2.area2)?'notinmax':''
    if (save==='notsave') notinmax='';
    let part12=''
    if (qubit1.area2===1&&qubit2.area2===1) part12='part1';
    if (qubit1.area2===2&&qubit2.area2===2) part12='part2';
    let cssclass=`qline q${q1} q${q2} m${qubit1.mi} m${qubit2.mi} ${this.calPatterns(q1,q2).join(' ')} ${save} ${split} ${notinmax} ${part12}`
    return `<text x="${50*o1.x+50*o2.x}" y="${50*o1.y+50*o2.y}" class="part1 mark" dominant-baseline="middle" text-anchor="middle" font-size="${40}" stroke="black">${mark}</text>`
    return `<line class="${cssclass}" x1="${100*o1.x}" y1="${100*o1.y}" x2="${100*o2.x}" y2="${100*o2.y}" stroke="${strokeColor}" stroke-width="${this.lineWidth}"/>`
}

var newedges = function (params) {

    let edges=[]
    let _f = this.data.getAdjacent
    for (let qindex = 0; qindex < this.data.bitCount; qindex++) {

        let pts=_f(this.data.qi2xy(qindex))
        for (let index = 0,pt; pt=pts[index]; index++) {
            if (this.data.getxy(pt).isBit) {
                let q1=qindex
                let q2=this.data.getxy(pt).qi
                if (q1<q2) {
                    edges.push(newline.call(this,this.data.qi2xy(qindex),pt,q1,q2,edge[q1][q2]))
                }
            }
        }
    }

    return edges
}

thisg.innerHTML= newedges.call(view).join('\n')
thissvg.appendChild(thisg)
document.querySelector("#insertHere").innerHTML+=' '