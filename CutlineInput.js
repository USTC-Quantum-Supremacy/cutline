// Generated from CutlineInput.g4 by antlr-blockly

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
                "brokenBits": "[5,17,29,53,65,41]",
                "part1": "[0,1,10,11,12,13,14,15,16,18,19,2,20,21,22,23,25,26,27,28,3,34,35,4,40,47,6,7,8,9]",
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
                        "bitString": "1_0111100000"
                    },
                    {
                        "type": "patternDefine",
                        "pattern": "J",
                        "bitString": "1_1000011111"
                    },
                    {
                        "type": "patternDefine",
                        "pattern": "K",
                        "bitString": "0_0000011110"
                    },
                    {
                        "type": "patternDefine",
                        "pattern": "L",
                        "bitString": "0_1111100001"
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
                        "pattern": "IJKLKLIJIJKLKLIJIJKL",
                        "seed": "13874234",
                        "simulationFilename": "",
                        "auxiliaryFilename": "",
                        "experimentFilename": "",
                        "order": [
                            {
                                "type": "orderlist",
                                "order": "[30,24,31,36,42,43,18,19,37,25,44,20,32,48,49,12,13,50,38,14,26,45,21,33,51,39,15,27,54,55,6,7,56,57,8,9,58,46,10,22,34,52,40,16,28,60,61,0,1,62,63,2,3,64,59,4,11,47,23,35,53,41,17,29,65,5]"
                            }
                        ],
                        "sfaCut": "-1",
                        "pepsCut": "[8,3,8,15,20,15,20,27]",
                        "pepsPath": [
                            {
                                "type": "orderlist",
                                "order": "[30,24,31,36,42,43,18,19,37,25,44,20,32,48,49,12,13,50,38,14,26,45,21,33,51,39,15,27,54,55,6,7,56,57,8,9,58,46,10,22,34,52,40,16,28,60,61,0,1,62,63,2,3,64,59,4,11,47,23,35,53,41,17,29,65,5]"
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
                "part1": "[0,1,10,11,12,13,14,15,16,17,19,2,20,21,22,23,25,26,27,28,29,3,33,34,35,4,40,41,5,6,7,8,9]",
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
                        "bitString": "0_0000001010"
                    },
                    {
                        "type": "patternDefine",
                        "pattern": "J",
                        "bitString": "0_1111110101"
                    },
                    {
                        "type": "patternDefine",
                        "pattern": "K",
                        "bitString": "1_0011000010"
                    },
                    {
                        "type": "patternDefine",
                        "pattern": "L",
                        "bitString": "1_1100111101"
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
                        "pattern": "IJKLKLIJIJKLKLIJIJKL",
                        "seed": "13874234",
                        "simulationFilename": "",
                        "auxiliaryFilename": "",
                        "experimentFilename": "",
                        "order": [
                            {
                                "type": "orderlist",
                                "order": "[30,24,31,36,42,43,18,19,37,25,44,20,32,48,49,12,13,50,38,14,26,45,21,33,51,39,15,27,54,55,6,7,56,57,8,9,58,46,10,22,34,52,40,16,28,60,61,0,1,62,63,2,3,64,59,4,11,47,23,35,53,41,17,29,65,5]"
                            }
                        ],
                        "sfaCut": "-1",
                        "pepsCut": "[8,3,8,15,20,15,20,27]",
                        "pepsPath": [
                            {
                                "type": "orderlist",
                                "order": "[30,24,31,36,42,43,18,19,37,25,44,20,32,48,49,12,13,50,38,14,26,45,21,33,51,39,15,27,54,55,6,7,56,57,8,9,58,46,10,22,34,52,40,16,28,60,61,0,1,62,63,2,3,64,59,4,11,47,23,35,53,41,17,29,65,5]"
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
    // 语句集合和表达式集合
CutlineInputBlocks = {
    "generatingCircuits": [
        "generatingCircuit",
        "generatingCircuitNone"
    ],
    "marks": [
        "markQi",
        "orderlist",
        "markNone"
    ],
    "patterns": [
        "patternA",
        "patternC",
        "patternNormal",
        "patternDefine",
        "patternNone"
    ]
}


// 所有域的默认行为
Object.assign(CutlineInputBlocks,{
    "Number_List": {
        "type": "field_dropdown",
        "options": function(){return Array.from({length:29}).map((v,i)=>[i+2+'',i+2+''])},
        "default": "12"
    },
    "PatternA_List": {
        "type": "field_dropdown",
        "options": [
            ["A","A"],
            ["B","B"],
            ["G","G"],
            ["H","H"],
            ["I","I"],
            ["J","J"]
        ],
        "default": "A"
    },
    "PatternC_List": {
        "type": "field_dropdown",
        "options": [
            ["C","C"],
            ["D","D"],
            ["E","E"],
            ["F","F"],
            ["K","K"],
            ["L","L"]
        ],
        "default": "C"
    },
    "Search_List": {
        "type": "field_dropdown",
        "options": [
            ["Min Cut","prune"],
            ["All Balanced","notprune"]
        ],
        "default": "prune"
    },
    "Seed_List": {
        "type": "field_dropdown",
        "options": [
            ["13874234","13874234"],
            ["10285102","10285102"],
            ["22886724","22886724"],
            ["92997209","92997209"],
            ["18392462","18392462"],
            ["58869319","58869319"],
            ["80531470","80531470"],
            ["53535483","53535483"],
            ["43935200","43935200"],
            ["23239930","23239930"]
        ],
        "default": "13874234"
    },
    "MulDivAddSub_List": {
        "type": "field_dropdown",
        "options": [
            ["*","*"],
            ["/","/"],
            ["+","+"],
            ["-","-"]
        ],
        "default": "*"
    },
    "JsonStr": {
        "type": "field_input",
        "text": "JsonStr_default"
    },
    "NormalStr": {
        "type": "field_input",
        "text": "NormalStr_default"
    },
    "Int": {
        "type": "field_number",
        "value": 0,
        "min": 0,
        "precision": 1
    },
    "Bool": {
        "type": "field_checkbox",
        "checked": true
    },
    "Colour": {
        "type": "field_colour",
        "colour": "#ff0000"
    },
    "BGNL": {
        "type": "input_dummy"
    }
});


// 所有方块的实际内容
Object.assign(CutlineInputBlocks,{
    "prog": {
        "type": "statement",
        "json": {
            "type": "prog",
            "message0": "xsize %1 ysize %2 use00 %3 %4 broken bits %5 %6 part1 indexes %7 %8 more parts %9 %10 depth %11 %12 search %13 > pattern %14 %15 > e1 e2 er %16 %17 > removed entrances %18 %19 > n1-n2 no bigger than %20 %21 > %22 %23 show mark ~n(only for mark) %24 %25 show and define pattern ~n %26 %27 generating circuit ~1 %28 %29",
            "args0": [
                Object.assign({},CutlineInputBlocks.Number_List,{
                    "name": "xsize",
                    "default": "12"
                }),
                Object.assign({},CutlineInputBlocks.Number_List,{
                    "name": "ysize",
                    "default": "11"
                }),
                Object.assign({},CutlineInputBlocks.Bool,{
                    "name": "use00",
                    "checked": true
                }),
                {
                    "type": "input_dummy"
                },
                Object.assign({},CutlineInputBlocks.JsonStr,{
                    "name": "brokenBits",
                    "text": "[]"
                }),
                {
                    "type": "input_dummy"
                },
                Object.assign({},CutlineInputBlocks.JsonStr,{
                    "name": "part1",
                    "text": "[]"
                }),
                {
                    "type": "input_dummy"
                },
                Object.assign({},CutlineInputBlocks.JsonStr,{
                    "name": "parts",
                    "text": "[]"
                }),
                {
                    "type": "input_dummy"
                },
                Object.assign({},CutlineInputBlocks.Number_List,{
                    "name": "depth",
                    "default": "20"
                }),
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_dummy"
                },
                Object.assign({},CutlineInputBlocks.NormalStr,{
                    "name": "searchPattern",
                    "text": "01232301"
                }),
                {
                    "type": "input_dummy"
                },
                Object.assign({},CutlineInputBlocks.JsonStr,{
                    "name": "errorRates",
                    "text": "[0.0016,0.0062,0.038]"
                }),
                {
                    "type": "input_dummy"
                },
                Object.assign({},CutlineInputBlocks.JsonStr,{
                    "name": "removedEntrances",
                    "text": "[]"
                }),
                {
                    "type": "input_dummy"
                },
                Object.assign({},CutlineInputBlocks.Int,{
                    "name": "balancedRange",
                    "value": 6
                }),
                {
                    "type": "input_dummy"
                },
                Object.assign({},CutlineInputBlocks.Search_List,{
                    "name": "search",
                    "default": "prune"
                }),
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "showMark",
                    "check": CutlineInputBlocks.marks
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "showPattern",
                    "check": CutlineInputBlocks.patterns
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "generatingCircuit",
                    "check": CutlineInputBlocks.generatingCircuits
                }
            ],
            "tooltip": "",
            "helpUrl": "",
            "colour": 260
        },
        "generFunc": function(block) {
            var xsize = block.getFieldValue('xsize');
            xsize = CutlineInputFunctions.pre('Number_List')(xsize,block,'xsize','prog');
            var ysize = block.getFieldValue('ysize');
            ysize = CutlineInputFunctions.pre('Number_List')(ysize,block,'ysize','prog');
            var use00 = block.getFieldValue('use00') === 'TRUE';
            use00 = CutlineInputFunctions.pre('Bool')(use00,block,'use00','prog');
            var brokenBits = block.getFieldValue('brokenBits');
            if (brokenBits==='') {
                throw new OmitedError(block,'brokenBits','prog');
            }
            brokenBits = CutlineInputFunctions.pre('JsonStr')(brokenBits,block,'brokenBits','prog');
            var part1 = block.getFieldValue('part1');
            if (part1==='') {
                throw new OmitedError(block,'part1','prog');
            }
            part1 = CutlineInputFunctions.pre('JsonStr')(part1,block,'part1','prog');
            var parts = block.getFieldValue('parts');
            if (parts==='') {
                throw new OmitedError(block,'parts','prog');
            }
            parts = CutlineInputFunctions.pre('JsonStr')(parts,block,'parts','prog');
            var depth = block.getFieldValue('depth');
            depth = CutlineInputFunctions.pre('Number_List')(depth,block,'depth','prog');
            var searchPattern = block.getFieldValue('searchPattern');
            searchPattern = CutlineInputFunctions.pre('NormalStr')(searchPattern,block,'searchPattern','prog');
            var errorRates = block.getFieldValue('errorRates');
            if (errorRates==='') {
                throw new OmitedError(block,'errorRates','prog');
            }
            errorRates = CutlineInputFunctions.pre('JsonStr')(errorRates,block,'errorRates','prog');
            var removedEntrances = block.getFieldValue('removedEntrances');
            if (removedEntrances==='') {
                throw new OmitedError(block,'removedEntrances','prog');
            }
            removedEntrances = CutlineInputFunctions.pre('JsonStr')(removedEntrances,block,'removedEntrances','prog');
            var balancedRange = block.getFieldValue('balancedRange');
            balancedRange = CutlineInputFunctions.pre('Int')(balancedRange,block,'balancedRange','prog');
            var search = block.getFieldValue('search');
            search = CutlineInputFunctions.pre('Search_List')(search,block,'search','prog');
            var showMark = Blockly.JavaScript.statementToCode(block, 'showMark');
            if (showMark==='') {
                throw new OmitedError(block,'showMark','prog');
            }
            var showPattern = Blockly.JavaScript.statementToCode(block, 'showPattern');
            if (showPattern==='') {
                throw new OmitedError(block,'showPattern','prog');
            }
            var generatingCircuit = Blockly.JavaScript.statementToCode(block, 'generatingCircuit');
            if (generatingCircuit==='') {
                throw new OmitedError(block,'generatingCircuit','prog');
            }
            if (searchPattern==='') {
                throw "examples: 01232301, 0123, 012323010123230121, 012323010123230103"
            }
            return CutlineInputFunctions.defaultCode('prog',eval('['+CutlineInputBlocks['prog'].args.join(',')+']'),block);
        },
        "args": ["xsize","ysize","use00","brokenBits","part1","parts","depth","searchPattern","errorRates","removedEntrances","balancedRange","search","showMark","showPattern","generatingCircuit"],
        "argsType": ["field","field","field","field","field","field","field","field","field","field","field","field","statement","statement","statement"],
        "argsGrammarName": ["Number_List","Number_List","Bool","JsonStr","JsonStr","JsonStr","Number_List","NormalStr","JsonStr","JsonStr","Int","Search_List","marks","patterns","generatingCircuits"],
        "omitted": [false,false,false,false,false,false,false,true,false,false,false,false,false,false,false],
        "multi": [false,false,false,false,false,false,false,false,false,false,false,false,true,true,true],
        "fieldDefault": function (keyOrIndex) {
            return CutlineInputFunctions.fieldDefault('prog',keyOrIndex);
        },
        "menu": [],
        "xmlText": function (inputs,next,isShadow,comment,attribute) {
            return CutlineInputFunctions.xmlText('prog',inputs,next,isShadow,comment,attribute);
        }
    },
    "generatingCircuit": {
        "type": "statement",
        "json": {
            "type": "generatingCircuit",
            "message0": "qubit number %1 elided %2 pattern %3 %4 seed %5 %6 output file name %7 > simulation %8 %9 > auxiliary %10 %11 > experiment %12 %13 order (bit indexes) %14 %15 sfa cut %16 %17 peps cut %18 %19 peps path %20 %21 gateArgs(unknown now) %22 %23",
            "args0": [
                Object.assign({},CutlineInputBlocks.Int,{
                    "name": "qubitNumber",
                    "value": 60
                }),
                Object.assign({},CutlineInputBlocks.NormalStr,{
                    "name": "elided",
                    "text": ""
                }),
                Object.assign({},CutlineInputBlocks.NormalStr,{
                    "name": "pattern",
                    "text": "EFGH"
                }),
                {
                    "type": "input_dummy"
                },
                Object.assign({},CutlineInputBlocks.Seed_List,{
                    "name": "seed",
                    "default": "13874234"
                }),
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_dummy"
                },
                Object.assign({},CutlineInputBlocks.NormalStr,{
                    "name": "simulationFilename",
                    "text": "circuit/sycamore60_20_EFGH.txt"
                }),
                {
                    "type": "input_dummy"
                },
                Object.assign({},CutlineInputBlocks.NormalStr,{
                    "name": "auxiliaryFilename",
                    "text": "circuit/sycamore60_20_EFGH.txt.json"
                }),
                {
                    "type": "input_dummy"
                },
                Object.assign({},CutlineInputBlocks.NormalStr,{
                    "name": "experimentFilename",
                    "text": "unknown now"
                }),
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "order",
                    "check": "orderlist"
                },
                Object.assign({},CutlineInputBlocks.JsonStr,{
                    "name": "sfaCut",
                    "text": "-1"
                }),
                {
                    "type": "input_dummy"
                },
                Object.assign({},CutlineInputBlocks.JsonStr,{
                    "name": "pepsCut",
                    "text": "[8,3,8,15,20,15,20,27]"
                }),
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "pepsPath",
                    "check": "orderlist"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "gateArgs",
                    "check": "gateArgs"
                }
            ],
            "tooltip": "",
            "helpUrl": "",
            "colour": 130,
            "previousStatement": "generatingCircuit",
            "nextStatement": CutlineInputBlocks.generatingCircuits
        },
        "generFunc": function(block) {
            var qubitNumber = block.getFieldValue('qubitNumber');
            qubitNumber = CutlineInputFunctions.pre('Int')(qubitNumber,block,'qubitNumber','generatingCircuit');
            var elided = block.getFieldValue('elided');
            elided = CutlineInputFunctions.pre('NormalStr')(elided,block,'elided','generatingCircuit');
            var pattern = block.getFieldValue('pattern');
            if (pattern==='') {
                throw new OmitedError(block,'pattern','generatingCircuit');
            }
            pattern = CutlineInputFunctions.pre('NormalStr')(pattern,block,'pattern','generatingCircuit');
            var seed = block.getFieldValue('seed');
            seed = CutlineInputFunctions.pre('Seed_List')(seed,block,'seed','generatingCircuit');
            var simulationFilename = block.getFieldValue('simulationFilename');
            simulationFilename = CutlineInputFunctions.pre('NormalStr')(simulationFilename,block,'simulationFilename','generatingCircuit');
            var auxiliaryFilename = block.getFieldValue('auxiliaryFilename');
            auxiliaryFilename = CutlineInputFunctions.pre('NormalStr')(auxiliaryFilename,block,'auxiliaryFilename','generatingCircuit');
            var experimentFilename = block.getFieldValue('experimentFilename');
            experimentFilename = CutlineInputFunctions.pre('NormalStr')(experimentFilename,block,'experimentFilename','generatingCircuit');
            var order = Blockly.JavaScript.statementToCode(block, 'order');
            if (order==='') {
                throw new OmitedError(block,'order','generatingCircuit');
            }
            var sfaCut = block.getFieldValue('sfaCut');
            if (sfaCut==='') {
                throw new OmitedError(block,'sfaCut','generatingCircuit');
            }
            sfaCut = CutlineInputFunctions.pre('JsonStr')(sfaCut,block,'sfaCut','generatingCircuit');
            var pepsCut = block.getFieldValue('pepsCut');
            if (pepsCut==='') {
                throw new OmitedError(block,'pepsCut','generatingCircuit');
            }
            pepsCut = CutlineInputFunctions.pre('JsonStr')(pepsCut,block,'pepsCut','generatingCircuit');
            var pepsPath = Blockly.JavaScript.statementToCode(block, 'pepsPath');
            if (pepsPath==='') {
                throw new OmitedError(block,'pepsPath','generatingCircuit');
            }
            var gateArgs = Blockly.JavaScript.statementToCode(block, 'gateArgs');
            if (gateArgs==='') {
                throw new OmitedError(block,'gateArgs','generatingCircuit');
            }
            var code = CutlineInputFunctions.defaultCode('generatingCircuit',eval('['+CutlineInputBlocks['generatingCircuit'].args.join(',')+']'),block);
            return code;
        },
        "args": ["qubitNumber","elided","pattern","seed","simulationFilename","auxiliaryFilename","experimentFilename","order","sfaCut","pepsCut","pepsPath","gateArgs"],
        "argsType": ["field","field","field","field","field","field","field","statement","field","field","statement","statement"],
        "argsGrammarName": ["Int","NormalStr","NormalStr","Seed_List","NormalStr","NormalStr","NormalStr","orderlist","JsonStr","JsonStr","orderlist","gateArgs"],
        "omitted": [false,true,false,false,true,true,true,false,false,false,false,false],
        "multi": [false,false,false,false,false,false,false,true,false,false,true,true],
        "fieldDefault": function (keyOrIndex) {
            return CutlineInputFunctions.fieldDefault('generatingCircuit',keyOrIndex);
        },
        "menu": [],
        "xmlText": function (inputs,next,isShadow,comment,attribute) {
            return CutlineInputFunctions.xmlText('generatingCircuit',inputs,next,isShadow,comment,attribute);
        }
    },
    "gateArgs": {
        "type": "statement",
        "json": {
            "type": "gateArgs",
            "message0": "unknow format %1",
            "args0": [
                Object.assign({},CutlineInputBlocks.JsonStr,{
                    "name": "unknow",
                    "text": "[1.5707963267948966,0.5235987755982988,0,0,0]"
                })
            ],
            "inputsInline": true,
            "tooltip": "",
            "helpUrl": "",
            "colour": 170,
            "previousStatement": "gateArgs",
            "nextStatement": "gateArgs"
        },
        "generFunc": function(block) {
            var unknow = block.getFieldValue('unknow');
            if (unknow==='') {
                throw new OmitedError(block,'unknow','gateArgs');
            }
            unknow = CutlineInputFunctions.pre('JsonStr')(unknow,block,'unknow','gateArgs');
            var code = CutlineInputFunctions.defaultCode('gateArgs',eval('['+CutlineInputBlocks['gateArgs'].args.join(',')+']'),block);
            return code;
        },
        "args": ["unknow"],
        "argsType": ["field"],
        "argsGrammarName": ["JsonStr"],
        "omitted": [false],
        "multi": [false],
        "fieldDefault": function (keyOrIndex) {
            return CutlineInputFunctions.fieldDefault('gateArgs',keyOrIndex);
        },
        "menu": [],
        "xmlText": function (inputs,next,isShadow,comment,attribute) {
            return CutlineInputFunctions.xmlText('gateArgs',inputs,next,isShadow,comment,attribute);
        }
    },
    "generatingCircuitNone": {
        "type": "statement",
        "json": {
            "type": "generatingCircuitNone",
            "message0": "pass",
            "args0": [],
            "inputsInline": true,
            "tooltip": "",
            "helpUrl": "",
            "colour": 130,
            "previousStatement": "generatingCircuitNone",
            "nextStatement": CutlineInputBlocks.generatingCircuits
        },
        "generFunc": function(block) {
            var code = CutlineInputFunctions.defaultCode('generatingCircuitNone',eval('['+CutlineInputBlocks['generatingCircuitNone'].args.join(',')+']'),block);
            return code;
        },
        "args": [],
        "argsType": [],
        "argsGrammarName": [],
        "omitted": [],
        "multi": [],
        "fieldDefault": function (keyOrIndex) {
            return CutlineInputFunctions.fieldDefault('generatingCircuitNone',keyOrIndex);
        },
        "menu": [],
        "xmlText": function (inputs,next,isShadow,comment,attribute) {
            return CutlineInputFunctions.xmlText('generatingCircuitNone',inputs,next,isShadow,comment,attribute);
        }
    },
    "markQi": {
        "type": "statement",
        "json": {
            "type": "markQi",
            "message0": "original qubit index",
            "args0": [],
            "inputsInline": true,
            "tooltip": "",
            "helpUrl": "",
            "colour": 70,
            "previousStatement": "markQi",
            "nextStatement": CutlineInputBlocks.marks
        },
        "generFunc": function(block) {
            var code = CutlineInputFunctions.defaultCode('markQi',eval('['+CutlineInputBlocks['markQi'].args.join(',')+']'),block);
            return code;
        },
        "args": [],
        "argsType": [],
        "argsGrammarName": [],
        "omitted": [],
        "multi": [],
        "fieldDefault": function (keyOrIndex) {
            return CutlineInputFunctions.fieldDefault('markQi',keyOrIndex);
        },
        "menu": [],
        "xmlText": function (inputs,next,isShadow,comment,attribute) {
            return CutlineInputFunctions.xmlText('markQi',inputs,next,isShadow,comment,attribute);
        }
    },
    "orderlist": {
        "type": "statement",
        "json": {
            "type": "orderlist",
            "message0": "order %1",
            "args0": [
                Object.assign({},CutlineInputBlocks.JsonStr,{
                    "name": "order",
                    "text": "[30,24,31,36,42,43,18,19,37,25,44,20,32,48,49,12,13,50,38,14,26,45,21,33,51,39,15,27,54,55,6,7,56,57,8,9,58,46,10,22,34,52,40,16,28,60,61,0,1,62,63,2,3,64,59,4,11,47,23,35,53,41,17,29,65,5]"
                })
            ],
            "inputsInline": true,
            "tooltip": "",
            "helpUrl": "",
            "colour": 70,
            "previousStatement": "orderlist",
            "nextStatement": CutlineInputBlocks.marks
        },
        "generFunc": function(block) {
            var order = block.getFieldValue('order');
            if (order==='') {
                throw new OmitedError(block,'order','orderlist');
            }
            order = CutlineInputFunctions.pre('JsonStr')(order,block,'order','orderlist');
            var code = CutlineInputFunctions.defaultCode('orderlist',eval('['+CutlineInputBlocks['orderlist'].args.join(',')+']'),block);
            return code;
        },
        "args": ["order"],
        "argsType": ["field"],
        "argsGrammarName": ["JsonStr"],
        "omitted": [false],
        "multi": [false],
        "fieldDefault": function (keyOrIndex) {
            return CutlineInputFunctions.fieldDefault('orderlist',keyOrIndex);
        },
        "menu": [],
        "xmlText": function (inputs,next,isShadow,comment,attribute) {
            return CutlineInputFunctions.xmlText('orderlist',inputs,next,isShadow,comment,attribute);
        }
    },
    "markNone": {
        "type": "statement",
        "json": {
            "type": "markNone",
            "message0": "pass",
            "args0": [],
            "inputsInline": true,
            "tooltip": "",
            "helpUrl": "",
            "colour": 70,
            "previousStatement": "markNone",
            "nextStatement": CutlineInputBlocks.marks
        },
        "generFunc": function(block) {
            var code = CutlineInputFunctions.defaultCode('markNone',eval('['+CutlineInputBlocks['markNone'].args.join(',')+']'),block);
            return code;
        },
        "args": [],
        "argsType": [],
        "argsGrammarName": [],
        "omitted": [],
        "multi": [],
        "fieldDefault": function (keyOrIndex) {
            return CutlineInputFunctions.fieldDefault('markNone',keyOrIndex);
        },
        "menu": [],
        "xmlText": function (inputs,next,isShadow,comment,attribute) {
            return CutlineInputFunctions.xmlText('markNone',inputs,next,isShadow,comment,attribute);
        }
    },
    "patternA": {
        "type": "statement",
        "json": {
            "type": "patternA",
            "message0": "/ %1 %2",
            "args0": [
                Object.assign({},CutlineInputBlocks.PatternA_List,{
                    "name": "pattern",
                    "default": "A"
                }),
                Object.assign({},CutlineInputBlocks.Colour,{
                    "name": "color",
                    "colour": "#3333ff"
                })
            ],
            "inputsInline": true,
            "tooltip": "",
            "helpUrl": "",
            "colour": 300,
            "previousStatement": "patternA",
            "nextStatement": CutlineInputBlocks.patterns
        },
        "generFunc": function(block) {
            var pattern = block.getFieldValue('pattern');
            pattern = CutlineInputFunctions.pre('PatternA_List')(pattern,block,'pattern','patternA');
            var color = block.getFieldValue('color');
            color = CutlineInputFunctions.pre('Colour')(color,block,'color','patternA');
            var code = CutlineInputFunctions.defaultCode('patternA',eval('['+CutlineInputBlocks['patternA'].args.join(',')+']'),block);
            return code;
        },
        "args": ["pattern","color"],
        "argsType": ["field","field"],
        "argsGrammarName": ["PatternA_List","Colour"],
        "omitted": [false,false],
        "multi": [false,false],
        "fieldDefault": function (keyOrIndex) {
            return CutlineInputFunctions.fieldDefault('patternA',keyOrIndex);
        },
        "menu": [],
        "xmlText": function (inputs,next,isShadow,comment,attribute) {
            return CutlineInputFunctions.xmlText('patternA',inputs,next,isShadow,comment,attribute);
        }
    },
    "patternC": {
        "type": "statement",
        "json": {
            "type": "patternC",
            "message0": "\\ %1 %2",
            "args0": [
                Object.assign({},CutlineInputBlocks.PatternC_List,{
                    "name": "pattern",
                    "default": "C"
                }),
                Object.assign({},CutlineInputBlocks.Colour,{
                    "name": "color",
                    "colour": "#009900"
                })
            ],
            "inputsInline": true,
            "tooltip": "",
            "helpUrl": "",
            "colour": 300,
            "previousStatement": "patternC",
            "nextStatement": CutlineInputBlocks.patterns
        },
        "generFunc": function(block) {
            var pattern = block.getFieldValue('pattern');
            pattern = CutlineInputFunctions.pre('PatternC_List')(pattern,block,'pattern','patternC');
            var color = block.getFieldValue('color');
            color = CutlineInputFunctions.pre('Colour')(color,block,'color','patternC');
            var code = CutlineInputFunctions.defaultCode('patternC',eval('['+CutlineInputBlocks['patternC'].args.join(',')+']'),block);
            return code;
        },
        "args": ["pattern","color"],
        "argsType": ["field","field"],
        "argsGrammarName": ["PatternC_List","Colour"],
        "omitted": [false,false],
        "multi": [false,false],
        "fieldDefault": function (keyOrIndex) {
            return CutlineInputFunctions.fieldDefault('patternC',keyOrIndex);
        },
        "menu": [],
        "xmlText": function (inputs,next,isShadow,comment,attribute) {
            return CutlineInputFunctions.xmlText('patternC',inputs,next,isShadow,comment,attribute);
        }
    },
    "patternNormal": {
        "type": "statement",
        "json": {
            "type": "patternNormal",
            "message0": "show %1 %2",
            "args0": [
                Object.assign({},CutlineInputBlocks.NormalStr,{
                    "name": "pattern",
                    "text": "M"
                }),
                Object.assign({},CutlineInputBlocks.Colour,{
                    "name": "color",
                    "colour": "#993399"
                })
            ],
            "inputsInline": true,
            "tooltip": "",
            "helpUrl": "",
            "colour": 300,
            "previousStatement": "patternNormal",
            "nextStatement": CutlineInputBlocks.patterns
        },
        "generFunc": function(block) {
            var pattern = block.getFieldValue('pattern');
            if (pattern==='') {
                throw new OmitedError(block,'pattern','patternNormal');
            }
            pattern = CutlineInputFunctions.pre('NormalStr')(pattern,block,'pattern','patternNormal');
            var color = block.getFieldValue('color');
            color = CutlineInputFunctions.pre('Colour')(color,block,'color','patternNormal');
            var code = CutlineInputFunctions.defaultCode('patternNormal',eval('['+CutlineInputBlocks['patternNormal'].args.join(',')+']'),block);
            return code;
        },
        "args": ["pattern","color"],
        "argsType": ["field","field"],
        "argsGrammarName": ["NormalStr","Colour"],
        "omitted": [false,false],
        "multi": [false,false],
        "fieldDefault": function (keyOrIndex) {
            return CutlineInputFunctions.fieldDefault('patternNormal',keyOrIndex);
        },
        "menu": [],
        "xmlText": function (inputs,next,isShadow,comment,attribute) {
            return CutlineInputFunctions.xmlText('patternNormal',inputs,next,isShadow,comment,attribute);
        }
    },
    "patternDefine": {
        "type": "statement",
        "json": {
            "type": "patternDefine",
            "message0": "define %1 : %2",
            "args0": [
                Object.assign({},CutlineInputBlocks.NormalStr,{
                    "name": "pattern",
                    "text": "M"
                }),
                Object.assign({},CutlineInputBlocks.NormalStr,{
                    "name": "bitString",
                    "text": "1_0100100100"
                })
            ],
            "inputsInline": true,
            "tooltip": "",
            "helpUrl": "",
            "colour": 300,
            "previousStatement": "patternDefine",
            "nextStatement": CutlineInputBlocks.patterns
        },
        "generFunc": function(block) {
            var pattern = block.getFieldValue('pattern');
            if (pattern==='') {
                throw new OmitedError(block,'pattern','patternDefine');
            }
            pattern = CutlineInputFunctions.pre('NormalStr')(pattern,block,'pattern','patternDefine');
            var bitString = block.getFieldValue('bitString');
            if (bitString==='') {
                throw new OmitedError(block,'bitString','patternDefine');
            }
            bitString = CutlineInputFunctions.pre('NormalStr')(bitString,block,'bitString','patternDefine');
            if (['A','B','C','D','E','F','G','H'].indexOf(pattern)!==-1) {
                throw 'can not cover A~H'
            }
            return CutlineInputFunctions.defaultCode('patternDefine',eval('['+CutlineInputBlocks['patternDefine'].args.join(',')+']'),block);
        },
        "args": ["pattern","bitString"],
        "argsType": ["field","field"],
        "argsGrammarName": ["NormalStr","NormalStr"],
        "omitted": [false,false],
        "multi": [false,false],
        "fieldDefault": function (keyOrIndex) {
            return CutlineInputFunctions.fieldDefault('patternDefine',keyOrIndex);
        },
        "menu": [],
        "xmlText": function (inputs,next,isShadow,comment,attribute) {
            return CutlineInputFunctions.xmlText('patternDefine',inputs,next,isShadow,comment,attribute);
        }
    },
    "patternNone": {
        "type": "statement",
        "json": {
            "type": "patternNone",
            "message0": "pass",
            "args0": [],
            "inputsInline": true,
            "tooltip": "",
            "helpUrl": "",
            "colour": 300,
            "previousStatement": "patternNone",
            "nextStatement": CutlineInputBlocks.patterns
        },
        "generFunc": function(block) {
            var code = CutlineInputFunctions.defaultCode('patternNone',eval('['+CutlineInputBlocks['patternNone'].args.join(',')+']'),block);
            return code;
        },
        "args": [],
        "argsType": [],
        "argsGrammarName": [],
        "omitted": [],
        "multi": [],
        "fieldDefault": function (keyOrIndex) {
            return CutlineInputFunctions.fieldDefault('patternNone',keyOrIndex);
        },
        "menu": [],
        "xmlText": function (inputs,next,isShadow,comment,attribute) {
            return CutlineInputFunctions.xmlText('patternNone',inputs,next,isShadow,comment,attribute);
        }
    }
});



//生成代码中,当一个不允许省略的值或块省略时,会抛出这个错误
function OmitedError(block, var_, rule, fileName, lineNumber) {
    var message = 'no omitted '+var_+' at '+rule;
    var instance = new Error(message, fileName, lineNumber);
    instance.block = block;
    instance.varName = var_;
    instance.blockName = rule;
    instance.name = 'OmitedError';
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, OmitedError);
    }
    return instance;
}

OmitedError.prototype = Object.create(Error.prototype);
OmitedError.prototype.constructor = OmitedError;
//处理此错误的omitedcheckUpdateFunction定义在下面

//生成代码中,当一个不允许多个语句输入的块放入多语句时,会抛出这个错误
function MultiStatementError(block, var_, rule, fileName, lineNumber) {
    var message = 'no multi-Statement '+var_+' at '+rule;
    var instance = new Error(message, fileName, lineNumber);
    instance.block = block;
    instance.varName = var_;
    instance.blockName = rule;
    instance.name = 'MultiStatementError';
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, MultiStatementError);
    }
    return instance;
}

MultiStatementError.prototype = Object.create(Error.prototype);
MultiStatementError.prototype.constructor = MultiStatementError;
//处理此错误的omitedcheckUpdateFunction定义在下面


CutlineInputFunctions={}

CutlineInputFunctions.JsonStr_pre = function(str) {
    if (str===''||str==='JsonStr_default') {
        
    } else {
        let tmp = eval(str)
    }
    return str;
}

CutlineInputBlocks.generatingCircuit.json.nextStatement=undefined;
CutlineInputBlocks.generatingCircuitNone.json.nextStatement=undefined;
CutlineInputFunctions.Int_pre = function(intstr) {
    return parseInt(intstr);
}

CutlineInputFunctions.Number_pre = function(intstr) {
    return parseFloat(intstr);
}

//返回各LexerRule文本域的预处理函数,方便用来统一转义等等
CutlineInputFunctions.pre = function(LexerId) {
    if (CutlineInputFunctions.hasOwnProperty(LexerId+'_pre')) {
        return CutlineInputFunctions[LexerId+'_pre'];
    }
    return function(obj,block,fieldName,blockType){return obj}
}



// CutlineInputFunctions.fieldDefault
// 根据输入是整数字符串或null
// 第index个或者名字为key的域的默认值, null时返回所有field默认值的数组
CutlineInputFunctions.fieldDefault = function (ruleName,keyOrIndex) {
    var rule = CutlineInputBlocks[ruleName];
    var iskey=typeof keyOrIndex==typeof '';
    var isindex=typeof keyOrIndex==typeof 0;
    function args0_content_to_default(cnt) {
        var key = ({
            'field_input':'text',
            'field_multilinetext':'text',
            'field_number':'value',
            'field_dropdown':'default',
            'field_checkbox':'checked',
            'field_colour':'colour',
            'field_angle':'angle',
            // 'field_image':'src'
        })[cnt.type];
        return cnt[key];
    }
    var allDefault=[];
    for(var ii=0,index=-1,cnt;cnt=rule.json.args0[ii];ii++){
        if (!cnt.name || cnt.type.slice(0,5)!='field' || cnt.type=='field_image') continue;
        index++;
        if (iskey && cnt.name==keyOrIndex)return args0_content_to_default(cnt);
        if (isindex && index==keyOrIndex)return args0_content_to_default(cnt);
        allDefault.push(args0_content_to_default(cnt))
    }
    if (iskey || isindex) return undefined;
    return allDefault;
}



// CutlineInputFunctions.defaultCode_TEXT
CutlineInputFunctions.defaultCode_TEXT = function (ruleName,args,block) {
    var rule = CutlineInputBlocks[ruleName];
    var message=rule.json.message0;
    var args0=rule.json.args0;
    for(var ii=0,jj=0;ii<args0.length;ii++){
        message=message.split(new RegExp('%'+(ii+1)+'\\b'));
        var content='\n';
        if (args0[ii].type==='input_dummy') {
            message[1]=message[1].slice(1);
        } else if(args0[ii].type==='field_image') {
            content=args0[ii].alt;
        } else {
            content=args[jj++];
        }
        if (args0[ii].type=="input_statement") {
            message[0]=message[0]+'\n';
            message[1]=message[1].slice(1);
        }
        message=message.join(content);
    }
    if (rule.type=='statement') {
        message=message+'\n';
    }
    return message;
}

CutlineInputFunctions.defaultCode_JSON_TYPE='type'

CutlineInputFunctions.parserPre={}
CutlineInputFunctions.parserPre.pre = function(LexerId) {
    if (CutlineInputFunctions.parserPre.hasOwnProperty(LexerId+'_pre')) {
        return CutlineInputFunctions.parserPre[LexerId+'_pre'];
    }
    return function(obj,blockObj,fieldName,blockType,index){return obj}
}
/** @class */
CutlineInputFunctions.parserClass = function (params) {
}
CutlineInputFunctions.parserClass.prototype.parse = function (obj,next) {
    var blockType = obj[CutlineInputFunctions.defaultCode_JSON_TYPE]
    var rule = CutlineInputBlocks[blockType]
    if (CutlineInputFunctions.parserPre.hasOwnProperty(blockType+'_pre')) {
        obj = CutlineInputFunctions.parserPre[blockType+'_pre'](obj)
    }
    var input = []
    for (var index = 0; index < rule.args.length; index++) {
        var dobj = obj[rule.args[index]];
        if (rule.argsType[index]==='statement') {
            if (!rule.multi[index])dobj=[dobj];
            var snext=null
            while (dobj.length) {
                var ds=dobj.pop()
                snext=this.parse(ds,snext)
            }
            input.push(snext)
        } else if (rule.argsType[index]==='value') {
            input.push(this.parse(dobj))
        } else {
            var LexerId = rule.argsGrammarName[index]
            input.push(CutlineInputFunctions.parserPre.pre(LexerId)(dobj,obj,rule.args[index],blockType,index))
        }
    }
    return rule.xmlText(input,next)
}
CutlineInputFunctions.parser=new CutlineInputFunctions.parserClass()
CutlineInputFunctions.parse=function(obj){
    var xml_text = CutlineInputFunctions.parser.parse(obj);
    var xml = Blockly.Xml.textToDom('<xml>'+xml_text+'</xml>');
    CutlineInputFunctions.workspace().clear();
    Blockly.Xml.domToWorkspace(xml, CutlineInputFunctions.workspace());
}

// CutlineInputFunctions.defaultCode_JSON
CutlineInputFunctions.defaultCode_JSON = function (ruleName,args,block) {
    var rule = CutlineInputBlocks[ruleName];
    var values=args
    var output={}
    var ret=''
    if (rule.type==='statement'||rule.type==='value') {
        output[CutlineInputFunctions.defaultCode_JSON_TYPE]=rule.json.type
        ret=block.getNextBlock()==null?'':','
    }
    for (var index = 0; index < values.length; index++) {
        var value = values[index];
        if (rule.argsType[index]==='statement') {
            output[rule.args[index]]=eval('['+value+']')
            if (!rule.multi[index]) output[rule.args[index]]=output[rule.args[index]][0];
        } else if (rule.argsType[index]==='value') {
            output[rule.args[index]]=eval('('+value+')')
        } else {
            output[rule.args[index]]=value
        }
    }
    ret=JSON.stringify(output,null,4)+ret
    return ret
}

// CutlineInputFunctions.defaultCode
CutlineInputFunctions.defaultCode=CutlineInputFunctions.defaultCode_JSON



// CutlineInputFunctions.xmlText
// 构造这个方法是为了能够不借助workspace,从语法树直接构造图块结构
// inputs的第i个元素是第i个args的xmlText,null或undefined表示空
// next是其下一个语句的xmlText
CutlineInputFunctions.xmlText = function (ruleName,inputs,next,isShadow,comment,attribute) {
    var rule = CutlineInputBlocks[ruleName];
    var blocktext = isShadow?'shadow':'block';
    var xmlText = [];
    xmlText.push('<'+blocktext+' type="'+ruleName+'"');
    for (var attr in attribute) {
        xmlText.push(' '+attr+'="'+attribute[attr]+'"');
    }
    xmlText.push('>');
    if(!inputs)inputs=[];
    var inputIsArray = inputs instanceof Array;
    for (var ii=0,inputType;inputType=rule.argsType[ii];ii++) {
        var input = inputIsArray?inputs[ii]:inputs[rule.args[ii]];
        var _input = '';
        var noinput = input==null;
        if(noinput && inputType==='field' && CutlineInputBlocks[rule.argsGrammarName[ii]].type!=='field_dropdown') continue;
        if(noinput && inputType==='field') {
            noinput = false;
            input = rule.fieldDefault(rule.args[ii])
        }
        if(noinput) input = '';
        if(inputType==='field' && CutlineInputBlocks[rule.argsGrammarName[ii]].type==='field_checkbox')input=input?'TRUE':'FALSE';
        if(inputType!=='field') {
            var subList = false;
            var subrulename = rule.argsGrammarName[ii];
            var subrule = CutlineInputBlocks[subrulename];
            if (subrule instanceof Array) {
                subrulename=subrule[subrule.length-1];
                subrule = CutlineInputBlocks[subrulename];
                subList = true;
            }
            _input = subrule.xmlText([],null,true);
            if(noinput && !subList && !isShadow) {
                //无输入的默认行为是: 如果语句块的备选方块只有一个,直接代入方块
                input = subrule.xmlText();
            }
        }
        xmlText.push('<'+inputType+' name="'+rule.args[ii]+'">');
        xmlText.push(_input+input);
        xmlText.push('</'+inputType+'>');
    }
    if(comment){
        xmlText.push('<comment><![CDATA[');
        xmlText.push(comment.replace(/]]>/g,'] ] >'));
        xmlText.push(']]></comment>');
    }
    if (next) {
        xmlText.push('<next>');
        xmlText.push(next);
        xmlText.push('</next>');
    }
    xmlText.push('</'+blocktext+'>');
    return xmlText.join('');
}



// CutlineInputFunctions.blocksIniter
// 把各方块的信息注册到Blockly中
CutlineInputFunctions.blocksIniter = function(){
    var blocksobj = CutlineInputBlocks;
    for(var key in blocksobj) {
        var value = blocksobj[key];
        if(value instanceof Array)continue;
        if(/^[A-Z].*$/.exec(key))continue;
        (function(key,value){
            if (value.menu && value.menu.length) {
                var menuRegisterMixin={
                    customContextMenu: function(options) {
                        for(var ii=0,op;op=value.menu[ii];ii++){
                            var option = {enabled: true};
                            option.text = op[0];
                            var check = 'function('
                            if (option.text.slice(0,check.length)==check){
                                option.text=eval('('+option.text+')(this)');
                            }
                            (function(block,fstr){
                                option.callback = function(){
                                    eval(fstr)
                                }
                            })(this,op[1]);
                            options.push(option);
                        }
                    }
                };
                value.json.extensions=value.json.extensions||[];
                var mixinName = 'contextMenu_CutlineInput_'+value.json.type
                value.json.extensions.push(mixinName)
                Blockly.Extensions.registerMixin(mixinName,menuRegisterMixin);
            }
            Blockly.Blocks[key] = {
                init: function() {this.jsonInit(value.json);}
            }
            Blockly.JavaScript[key] = value.generFunc;
        })(key,value);
    }
}


CutlineInputFunctions.blocksIniter();

var toolbox = (function(){return window.CutlineToolboxFunc()})();


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
    
//自动禁用任何未连接到根块的块
workspace.addChangeListener(Blockly.Events.disableOrphans);


// debugFunctions
function showXML() {
    xml = Blockly.Xml.workspaceToDom(workspace);
    xml_text = Blockly.Xml.domToPrettyText(xml);
    console.log(xml_text);
    xml_text = Blockly.Xml.domToText(xml);
    console.log(xml_text);
    console.log(xml);
}

function runCode() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    code = Blockly.JavaScript.workspaceToCode(workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval('obj=' + code);
        console.log(obj);
    } catch (e) {
        alert(e);
    }
}

    window.buildBlocks&&window.buildBlocks()
    