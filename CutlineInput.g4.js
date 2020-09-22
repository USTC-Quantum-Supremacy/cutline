this.grammerFile="grammar CutlineInput;\n\nprog:   'xsize' Number_List 'ysize' Number_List 'use00' Bool BGNL \n        'broken bits' JsonStr BGNL\n        'part1 indexes' JsonStr BGNL\n        'depth' Number_List BGNL\n        'search' BGNL\n        '> pattern' NormalStr? BGNL\n        '> e1 e2 er' JsonStr BGNL\n        '> removed entrances' JsonStr BGNL\n        '> n1-n2 no bigger than' Int BGNL\n        '>' Search_List BGNL\n        'show mark ~n(only for mark)' BGNL marks+\n        'show and define pattern ~n' BGNL patterns+\n        'generating circuit ~1' BGNL generatingCircuits+\n/* prog\nname : ['xsize','ysize','use00','brokenBits','part1','depth','searchPattern','errorRates','removedEntrances','balancedRange','search','showMark','showPattern','generatingCircuit']\ndefault : ['12','11',true,'[]','[]','20','01232301','[0.0016,0.0062,0.038]','[]',6,'prune']\nif (searchPattern==='') {\n    throw \"examples: 01232301, 0123, 012323010123230121, 012323010123230103\"\n}\nvar code = CutlineInputFunctions.defaultCode('prog',eval('['+CutlineInputBlocks['prog'].args.join(',')+']'));\n      return code;\n*/;\n\ngeneratingCircuits\n    :   generatingCircuit\n    |   generatingCircuitNone\n    ;\n\ngeneratingCircuit\n    :   'qubit number' Int 'elided' NormalStr? 'pattern' NormalStr BGNL \n        'seed' Seed_List BGNL\n        'output file name' BGNL\n        '> simulation' NormalStr? BGNL\n        '> auxiliary' NormalStr? BGNL\n        '> experiment' NormalStr? BGNL\n        'order (bit indexes)' BGNL orderlist+\n        'sfa cut' JsonStr BGNL\n        'peps cut' JsonStr BGNL\n        'peps path' BGNL orderlist+\n        'gateArgs(unknown now)' BGNL gateArgs+\n/* generatingCircuit\nname : ['qubitNumber','elided','pattern','seed','simulationFilename','auxiliaryFilename','experimentFilename','order','sfaCut','pepsCut','pepsPath','gateArgs']\ndefault : [60,'','EFGH',13874234,'circuit/sycamore60_20_EFGH.txt','circuit/sycamore60_20_EFGH.txt.json','unknown now','-1','[8,3,8,15,20,15,20,27]']\ncolour : this.generatingCircuitColor\nvar code = CutlineInputFunctions.defaultCode('generatingCircuit',eval('['+CutlineInputBlocks['generatingCircuit'].args.join(',')+']'));\n      return code;\n*/;\n\ngateArgs\n    :   'unknow format' JsonStr\n/* gateArgs\nname : ['unknow']\ndefault : ['[0.5,0.1666666667,0,0,0]']\ncolour : this.gateArgsColor\nvar code = CutlineInputFunctions.defaultCode('gateArgs',eval('['+CutlineInputBlocks['gateArgs'].args.join(',')+']'));\n      return code;\n*/;\n\ngeneratingCircuitNone\n    :   'pass'\n/* generatingCircuitNone\ncolour : this.generatingCircuitColor\nvar code = CutlineInputFunctions.defaultCode('generatingCircuitNone',eval('['+CutlineInputBlocks['generatingCircuitNone'].args.join(',')+']'));\n      return code;\n*/;\n\nmarks\n    :   markQi\n    |   orderlist\n    |   markNone\n    ;\n\nmarkQi : 'original qubit index' \n/* markQi\ncolour : this.markColor\nvar code = CutlineInputFunctions.defaultCode('markQi',eval('['+CutlineInputBlocks['markQi'].args.join(',')+']'));\n      return code;\n*/;\n\norderlist : 'order' JsonStr \n/* orderlist\nname : ['order']\ndefault : ['[30,24,31,36,42,43,18,19,37,25,44,20,32,48,49,12,13,50,38,14,26,45,21,33,51,39,15,27,54,55,6,7,56,57,8,9,58,46,10,22,34,52,40,16,28,60,61,0,1,62,63,2,3,64,59,4,11,47,23,35,53,41,17,29,65,5]']\ncolour : this.markColor\nvar code = CutlineInputFunctions.defaultCode('orderlist',eval('['+CutlineInputBlocks['orderlist'].args.join(',')+']'));\n      return code;\n*/;\n\nmarkNone : 'pass' \n/* markNone\ncolour : this.markColor\nvar code = CutlineInputFunctions.defaultCode('markNone',eval('['+CutlineInputBlocks['markNone'].args.join(',')+']'));\n      return code;\n*/;\n\npatterns\n    :   patternA\n    |   patternC\n    |   patternNormal\n    |   patternDefine\n    |   patternNone\n    ;\n\npatternA : '/' PatternA_List Colour\n/* patternA\nname : ['pattern','color']\ndefault : ['A','#3333ff']\nvar code = CutlineInputFunctions.defaultCode('patternA',eval('['+CutlineInputBlocks['patternA'].args.join(',')+']'));\n      return code;\n*/;\n\npatternC : '\\\\' PatternC_List Colour\n/* patternC\nname : ['pattern','color']\ndefault : ['C','#009900']\nvar code = CutlineInputFunctions.defaultCode('patternC',eval('['+CutlineInputBlocks['patternC'].args.join(',')+']'));\n      return code;\n*/;\n\npatternNormal : 'show' NormalStr Colour\n/* patternNormal\nname : ['pattern','color']\ndefault : ['M','#993399']\nvar code = CutlineInputFunctions.defaultCode('patternNormal',eval('['+CutlineInputBlocks['patternNormal'].args.join(',')+']'));\n      return code;\n*/;\n\npatternDefine : 'define' NormalStr ':' NormalStr\n/* patternDefine\nname : ['pattern','bitString']\ndefault : ['M','1_0100100100']\nif (['A','B','C','D','E','F','G','H'].indexOf(pattern)!==-1) {\n    throw 'can not cover A~H'\n}\nvar code = CutlineInputFunctions.defaultCode('patternDefine',eval('['+CutlineInputBlocks['patternDefine'].args.join(',')+']'));\n      return code;\n*/;\n\npatternNone : 'pass' ;\n\n\nstatExprSplit : '=== statement ^ === expression v ===' ;\n\n// expression\n//     :   expression MulDivAddSub_List expression\n//     |   idExpr\n//     |   intExpr\n//     ;\n\nNumber_List : 'dynamic'|'12' /* Number_List function(){return Array.from({length:29}).map((v,i)=>[i+2+'',i+2+''])}*/;\nPatternA_List : 'A'|'B'|'G'|'H'|'I'|'J' ;\nPatternC_List : 'C'|'D'|'E'|'F'|'K'|'L' ;\nSearch_List : 'Min Cut'|'All Balanced'\n    /*Search_List ['prune','notprune']*/ ;\nSeed_List : '13874234'|'10285102'|'22886724'|'92997209'|'18392462'|'58869319'|'80531470'|'53535483'|'43935200'|'23239930' ;\n\nMulDivAddSub_List : '*'|'/'|'+'|'-' ;\n\nJsonStr\n    :   'varfas'+ ;\nNormalStr\n    :   'varfass'+ ;\nInt :   [0-9]+ ;\nBool:   'true'|'false' ;\nColour:   'asdfgdh'* ;\nBGNL:   'asfvaswvr'? 'asdvaswvr'? ;\n\nMeaningfulSplit : '=== meaningful ^ ===' ;\n\nNEWLINE:'\\r'? '\\n' ; \n        // return newlines to parser (is end-statement signal)\nWS  :   [ \\t]+ -> skip ;         // toss out whitespace\n\n\n/* Function_0\n//this.evisitor.recieveOrder='ORDER_NONE';\n// this.evisitor.valueColor=330;\nthis.evisitor.statementColor=300;\n// this.evisitor.entryColor=250;\n\n// this.evisitor.idstring_eColor=310;\nthis.evisitor.gateArgsColor=170;\nthis.evisitor.markColor=70;\nthis.evisitor.generatingCircuitColor=130;\n// this.evisitor.eventColor=220;\n// this.evisitor.soundColor=20;\n*/\n\n/* Function_1\n// this.block('prog').inputsInline=true;\n// this.block('idString_1_e').output='idString_e';\n// this.block('idString_2_e').output='idString_e';\n*/\n\n/* Functions\nCutlineInputFunctions.JsonStr_pre = function(str) {\n    if (str===''||str==='JsonStr_default') {\n        \n    } else {\n        let tmp = eval(str)\n    }\n    return str;\n}\n\nCutlineInputFunctions.workspace = function(){return workspace}\n*/"