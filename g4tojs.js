const fs = require('fs')
const { Converter } = require('./antlr-blockly')

let grammarFile = fs.readFileSync('./CutlineInput.g4', { encoding: 'utf-8' })
let option = {
    "type": "option",
    "defaultGenerating": "JSON",
    "blocklyRuntime": {
        "type": "blocklyRuntimeStatement",
        "path": "antlr-blockly/",
        "files": "blockly_compressed.js, blocks_compressed.js, javascript_compressed.js, zh-hans.js"
    },
    "blocklyDiv": {
        "type": "fixedSizeBlocklyDiv",
        "id": "blocklyDiv",
        "height": "550px",
        "width": "1000px"
    },
    "toolbox": {
        "type": "toolboxFunc",
        "id": "toolbox",
        "func": "function(){return window.CutlineToolboxFunc()}"
    },
    "codeArea": {
        "type": "codeAreaStatement",
        "output": "function(err,data){blocklyinput.value=err?String(err):data}"
    },
    "target": {
        "type": "independentFile"
        // "type": "keepGrammar"
    }
}
let converter = Converter.withOption(grammarFile, option)


function jsContent(params) {
    // ========== mark for split ==========
    // toolboxFunc
    window.CutlineToolboxFunc = function () {

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
    }
    // ========== mark for split ==========
    window.buildBlocks&&window.buildBlocks()
    // ========== mark for split ==========
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
    CutlineInputFunctions.workspace = function(){return workspace}
    // ========== mark for split ==========
    function omitedcheckUpdateFunction(event) {
        // console.log(event);
        var codeAreaElement = document.getElementById('codeArea');
        var codeAreaFunc = function(err,data){blocklyinput.value=err?String(err):data};
        try {
            if (["delete","create","move","finished_loading"].indexOf(event.type)!==-1) return;
            var code = Blockly.JavaScript.workspaceToCode(workspace);
            codeAreaFunc(null,code);
            window.trigger&&window.trigger(event)
        } catch (error) {
            codeAreaFunc(error,null);
            if (error instanceof OmitedError ||error instanceof MultiStatementError){
                var blockName = error.blockName;
                var varName = error.varName;
                var block = error.block;
            }
            console.log(error);
        }
    }
    
    workspace.addChangeListener(omitedcheckUpdateFunction);
    // ========== mark for split ==========
}

converter.js._text.splice(1, 0, 'toolboxObj')
converter.js._text.push('alldone')
let jsContents = jsContent.toString().split('// ========== mark for split ==========')
converter.js.toolboxObj = jsContents[1]
converter.js.alldone = jsContents[2]
converter.js.BlocklyInject = jsContents[3]
converter.js.checkUpdateFunction = jsContents[4]


converter.html.bodyScripts_keepGrammar = `
<script src="antlr-blockly/Converter.bundle.min.js"></script>
<script src="CutlineInput.js"></script>
`
converter.html.bodyContent+=`<textarea name="blocklyinput" id="blocklyinput" cols="60" rows="27" spellcheck="false"></textarea>`
converter.html.bodyDebugButtons+=`<p><button onclick="CutlineInputFunctions.parse(eval('('+blocklyinput.value+')'))">parse</button></p>`

fs.writeFileSync('blockly.html', converter.html.text(), { encoding: 'utf8' })
fs.writeFileSync(converter.js._name, converter.js.text(), { encoding: 'utf8' })


