
function initscriptfunc(params) {
///insert-initscriptfunc///

/**
 * @class
 */
function CutlineBlocklyConverter(params) {
}
CutlineBlocklyConverter.prototype.parse = function (obj,next) {
    let rule = CutlineInputBlocks[obj.type]
    let input = []
    for (let index = 0; index < rule.args.length; index++) {
        const dobj = obj[rule.args[index]];
        if (rule.argsType[index]==='statement') {
            let snext=null
            while (dobj.length) {
                let ds=dobj.pop()
                snext=this.parse(ds,snext)
            }
            input.push(snext)
        } else {
            input.push(dobj)
        }
    }
    if (rule.type==='statement' && next!=null) {
        input.push(next)
    }
    return rule.xmlText(input)
}
CutlineInputFunctions.parser=new CutlineBlocklyConverter()

var toolbox = (function(){

var toolboxXml=document.createElement('xml')

// 调整这个obj来更改侧边栏和其中的方块
// 可以直接填 '<block type="xxx">...</block>'
// 标签 '<label text="标签文本"></label>'
var toolboxObj = {
  // 每个键值对作为一页
  "statement" : [
    // 所有语句块
    CutlineInputBlocks["markQi"].xmlText(),
    CutlineInputBlocks["orderlist"].xmlText(['[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65]']),
    CutlineInputBlocks["orderlist"].xmlText(),
    CutlineInputFunctions.parser.parse({"type":"patternA","pattern":"I","color":"#ff9900"}),
    CutlineInputFunctions.parser.parse({"type":"patternA","pattern":"J","color":"#3333ff"}),
    CutlineInputFunctions.parser.parse({"type":"patternC","pattern":"K","color":"#009900"}),
    CutlineInputFunctions.parser.parse({"type":"patternC","pattern":"L","color":"#cc0000"}),
    CutlineInputBlocks["patternDefine"].xmlText(),
    CutlineInputBlocks["patternNormal"].xmlText(),
    CutlineInputBlocks["generatingCircuit"].xmlText(),
    '<label text="60bit"></label>',
    CutlineInputFunctions.parser.parse({
        "type": "prog",
        "xsize": "12",
        "ysize": "11",
        "use00": false,
        "brokenBits": "[5,17,29,41,53,65]",
        "part1": "[0,1,10,11,12,13,14,15,16,18,19,2,20,21,22,23,24,26,27,28,3,30,34,35,4,40,6,7,8,9,5,17,29]",
        "depth": "18",
        "searchPattern": "012323010123230103",
        "errorRates": "[0.0016,0.0062,0.038]",
        "removedEntrances": "[]",
        "balancedRange": 20,
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
                "bitString": "0_0011100000"
            },
            {
                "type": "patternDefine",
                "pattern": "J",
                "bitString": "0_1100011111"
            },
            {
                "type": "patternDefine",
                "pattern": "K",
                "bitString": "1_0100011100"
            },
            {
                "type": "patternDefine",
                "pattern": "L",
                "bitString": "1_1011100011"
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
                "qubitNumber": 60,
                "elided": "",
                "pattern": "IJKLKLIJIJKLKLIJIL",
                "seed": 13874234,
                "simulationFilename": "",
                "auxiliaryFilename": "",
                "experimentFilename": "unknown now",
                "order": [
                    {
                        "type": "orderlist",
                        "order": "[30,24,31,36,42,43,18,19,37,25,44,20,32,48,49,12,13,50,38,14,26,45,21,33,51,39,15,27,54,55,6,7,56,57,8,9,58,46,10,22,34,52,40,16,28,60,61,0,1,62,63,2,3,64,59,4,11,47,23,35,53,41,17,29,65,5]"
                    }
                ],
                "sfaCut": "-1",
                "pepsCut": "[]",
                "pepsPath": [
                    {
                        "type": "orderlist",
                        "order": "[]"
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
    }),
    '<label text="66bit"></label>',
    CutlineInputFunctions.parser.parse({
        "type": "prog",
        "xsize": "12",
        "ysize": "11",
        "use00": false,
        "brokenBits": "[]",
        "part1": "[0,1,12,13,14,18,19,2,20,21,24,25,26,3,30,31,32,33,36,37,38,42,43,44,48,49,54,55,6,60,7,8,9]",
        "depth": "16",
        "searchPattern": "0123230101232301",
        "errorRates": "[0.0016,0.0062,0.038]",
        "removedEntrances": "[]",
        "balancedRange": 14,
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
                "simulationFilename": "",
                "auxiliaryFilename": "",
                "experimentFilename": "unknown now",
                "order": [
                    {
                        "type": "orderlist",
                        "order": "[30,24,31,36,42,43,18,19,37,25,44,20,32,48,49,12,13,50,38,14,26,45,21,33,51,39,15,27,54,55,6,7,56,57,8,9,58,46,10,22,34,52,40,16,28,60,61,0,1,62,63,2,3,64,59,4,11,47,23,35,53,41,17,29,65,5]"
                    }
                ],
                "sfaCut": "-1",
                "pepsCut": "[]",
                "pepsPath": [
                    {
                        "type": "orderlist",
                        "order": "[]"
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
    }),
    '<label text="google"></label>',
    CutlineInputFunctions.parser.parse({
      "type": "prog",
      "xsize": "12",
      "ysize": "9",
      "use00": true,
      "brokenBits": "[3]",
      "part1": "[0,1,12,13,14,18,19,2,20,24,25,26,30,31,32,36,37,38,42,43,44,48,49,50,6,7,8]",
      "depth": "20",
      "searchPattern": "01232301",
      "errorRates": "[0.0016,0.0062,0.038]",
      "removedEntrances": "[]",
      "balancedRange": 6,
      "search": "notprune",
      "generatingCircuit": [
          {
              "type": "generatingCircuitNone"
          }
      ],
      "showMark": [
          {
              "type": "markQi"
          }
      ],
      "showPattern": [
          {
              "type": "patternA",
              "pattern": "A",
              "color": "#ff9900"
          },
          {
              "type": "patternA",
              "pattern": "B",
              "color": "#3333ff"
          },
          {
              "type": "patternC",
              "pattern": "C",
              "color": "#009900"
          },
          {
              "type": "patternC",
              "pattern": "D",
              "color": "#cc0000"
          }
      ]
    }),
  ],
//   "value" : [
//     // 所有值块
//   ]
}

var getCategory = function(toolboxXml,name,custom){
  var node = document.createElement('category');
  node.setAttribute('name',name);
  if(custom)node.setAttribute('custom',custom);
  toolboxXml.appendChild(node);
  return node;
}

var toolboxGap = '<sep gap="5"></sep>'

// for (var name in toolboxObj){
//   var custom = null;
//   if(name=='xxxxxx')custom='xxxxxx';
//   if(name=='zzzzzz')custom='zzzzzz';
//   getCategory(toolboxXml,name,custom).innerHTML = toolboxObj[name].join(toolboxGap);
//   var node = document.createElement('sep');
//   node.setAttribute('gap',5*3);
//   toolboxXml.appendChild(node);
// }
toolboxXml.innerHTML = toolboxObj.statement.join(toolboxGap);

return toolboxXml;
})();


var workspace = Blockly.inject('blocklyDiv',{
media: 'antlr-blockly/media/',
toolbox: toolbox,
zoom:{
  controls: true,
  wheel: false,//false
  startScale: 0.8,
  maxScale: 3,
  minScale: 0.3,
  scaleSpeed: 1.08
},
trashcan: false,
});

// document.getElementById('blocklyDiv').onmousewheel = function(e){
//   //console.log(e);
//   e.preventDefault();
//   var hvScroll = e.shiftKey?'hScroll':'vScroll';
//   var mousewheelOffsetValue=20/380*workspace.scrollbar[hvScroll].handleLength_*3;
//   workspace.scrollbar[hvScroll].handlePosition_+=( ((e.deltaY||0)+(e.detail||0)) >0?mousewheelOffsetValue:-mousewheelOffsetValue);
//   workspace.scrollbar[hvScroll].onScroll_();
//   // workspace.setScale(workspace.scale);
// }

function omitedcheckUpdateFunction(event) {
try {
  if (["delete","create","move","finished_loading"].indexOf(event.type)!==-1) return;
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  try {
    blocklyinput.value = JSON.stringify(eval('['+code+']')[0],null,4)
  } catch (error) {
    blocklyinput.value = code.slice(0,-1);
  }
  window.trigger&&window.trigger(event)
} catch (error) {
  blocklyinput.value = String(error);
  if (error instanceof OmitedError){
    var blockName = error.blockName;
    var varName = error.varName;
    var block = error.block;
  }
  console.log(error);
}
}

workspace.addChangeListener(omitedcheckUpdateFunction);

workspace.addChangeListener(Blockly.Events.disableOrphans);
//自动禁用任何未连接到根块的块


CutlineInputFunctions.defaultCode = function (ruleName,args) {
    var rule = CutlineInputBlocks[ruleName];
    let values=args.filter(v=>v!=='\n')
    let output={}
    for (let index = 0; index < values.length; index++) {
        const value = values[index];
        if (rule.argsType[index]==='statement') {
            output[rule.args[index]]=eval('['+value+']')
        } else {
            output[rule.args[index]]=value
        }
    }
    let ret
    if (rule.type==='statement') {
        ret=JSON.stringify(Object.assign({type:rule.json.type},output))+','
    } else {
        ret=JSON.stringify(output)
    }
    return ret
}


CutlineInputFunctions.parse=function(obj){
    CutlineInputFunctions.workspace().clear();
    xml_text = CutlineInputFunctions.parser.parse(obj);
    xml = Blockly.Xml.textToDom('<xml>'+xml_text+'</xml>');
    Blockly.Xml.domToWorkspace(xml, CutlineInputFunctions.workspace());
}
window.buildBlocks&&window.buildBlocks()

///insert-initscriptfunc///
}

var initscript=initscriptfunc.toString().split('///insert-initscriptfunc///')[1]


/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////


function func_Run(){
    var script = document.createElement('script');
    script.innerHTML = converter.mainFile[5]+initscript;
    document.body.appendChild(script);
}

function runOne(callback){
    converter = new Converter().init();
    converter.generBlocks(grammerFile);
    converter.renderGrammerName();
    converter.generToolbox();
    converter.generMainFile();
    console.log(converter);
    if(callback)callback();
}

// var grammerFile=''
// var xhrg4=new XMLHttpRequest();
// xhrg4.onreadystatechange = function (){
//     if(xhrg4.readyState!=4) return;
//     if(xhrg4.status!=200) {
//         return;
//     }
//     grammerFile=xhrg4.responseText;
//     runOne(func_Run);
// }
// xhrg4.open('GET','CutlineInput.g4',true);
// xhrg4.send(null);
runOne(func_Run);