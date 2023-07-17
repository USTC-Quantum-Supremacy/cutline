grammar CutlineInput;

prog:   'xsize' xsize=Number_List 'ysize' ysize=Number_List 'use00' use00=Bool BGNL 
        'broken bits' brokenBits=JsonStr BGNL
        'part1 indexes' part1=JsonStr BGNL
        'more parts' parts=JsonStr BGNL
        'depth' depth=Number_List BGNL
        'search' BGNL
        '> pattern' searchPattern=NormalStr? BGNL
        '> e1 e2 er' errorRates=JsonStr BGNL
        '> removed entrances' removedEntrances=JsonStr BGNL
        '> n1-n2 no bigger than' balancedRange=Int BGNL
        '>' search=Search_List BGNL
        'show mark ~n(only for mark)' BGNL showMark=marks+
        'show and define pattern ~n' BGNL showPattern=patterns+
        'generating circuit ~1' BGNL generatingCircuit=generatingCircuits+
/* prog
defaultMap : {xsize:'12',ysize:'11',use00:true,brokenBits:'[]',part1:'[]',parts:'[]',depth:'20',searchPattern:'01232301',errorRates:'[0.0016,0.0062,0.038]',removedEntrances:'[]',balancedRange:6,search:'prune'}
if (searchPattern==='') {
    throw "examples: 01232301, 0123, 012323010123230121, 012323010123230103"
}
return CutlineInputFunctions.defaultCode('prog',eval('['+CutlineInputBlocks['prog'].args.join(',')+']'),block);
*/;

generatingCircuits
    :   generatingCircuit
    |   generatingCircuitNone
    ;

generatingCircuit
    :   'qubit number' qubitNumber=Int 'elided' elided=NormalStr? 'pattern' pattern=NormalStr BGNL 
        'seed' seed=Seed_List BGNL
        'output file name' BGNL
        '> simulation' simulationFilename=NormalStr? BGNL
        '> auxiliary' auxiliaryFilename=NormalStr? BGNL
        '> experiment' experimentFilename=NormalStr? BGNL
        'order (bit indexes)' BGNL order=orderlist+
        'sfa cut' sfaCut=JsonStr BGNL
        'peps cut' pepsCut=JsonStr BGNL
        'peps path' BGNL pepsPath=orderlist+
        'gateArgs(unknown now)' BGNL gateArgs=gateArgs+
/* generatingCircuit
defaultMap : {qubitNumber:60,elided:'',pattern:'EFGH',seed:'13874234',simulationFilename:'circuit/sycamore60_20_EFGH.txt',auxiliaryFilename:'circuit/sycamore60_20_EFGH.txt.json',experimentFilename:'unknown now',sfaCut:'-1',pepsCut:'[8,3,8,15,20,15,20,27]'}
colour : this.generatingCircuitColor
*/;

gateArgs
    :   'unknow format' JsonStr
/* gateArgs
name : ['unknow']
default : ['[1.5707963267948966,0.5235987755982988,0,0,0]']
colour : this.gateArgsColor
*/;

generatingCircuitNone
    :   'pass'
/* generatingCircuitNone
colour : this.generatingCircuitColor
*/;

marks
    :   markQi
    |   orderlist
    |   markNone
    ;

markQi : 'original qubit index' 
/* markQi
colour : this.markColor
*/;

orderlist : 'order' JsonStr 
/* orderlist
name : ['order']
default : ['[30,24,31,36,42,43,18,19,37,25,44,20,32,48,49,12,13,50,38,14,26,45,21,33,51,39,15,27,54,55,6,7,56,57,8,9,58,46,10,22,34,52,40,16,28,60,61,0,1,62,63,2,3,64,59,4,11,47,23,35,53,41,17,29,65,5]']
colour : this.markColor
*/;

markNone : 'pass' 
/* markNone
colour : this.markColor
*/;

patterns
    :   patternA
    |   patternC
    |   patternNormal
    |   patternDefine
    |   patternNone
    ;

patternA : '/' PatternA_List Colour
/* patternA
name : ['pattern','color']
default : ['A','#3333ff']
*/;

patternC : '\\' PatternC_List Colour
/* patternC
name : ['pattern','color']
default : ['C','#009900']
*/;

patternNormal : 'show' NormalStr Colour
/* patternNormal
name : ['pattern','color']
default : ['M','#993399']
*/;

patternDefine : 'define' NormalStr ':' NormalStr
/* patternDefine
name : ['pattern','bitString']
default : ['M','1_0100100100']
if (['A','B','C','D','E','F','G','H'].indexOf(pattern)!==-1) {
    throw 'can not cover A~H'
}
return CutlineInputFunctions.defaultCode('patternDefine',eval('['+CutlineInputBlocks['patternDefine'].args.join(',')+']'),block);
*/;

patternNone : 'pass' ;


statExprSplit : '=== statement ^ === expression v ===' ;

// expression
//     :   expression MulDivAddSub_List expression
//     |   idExpr
//     |   intExpr
//     ;

Number_List : 'dynamic'|'12' /* Number_List function(){return Array.from({length:29}).map((v,i)=>[i+2+'',i+2+''])}*/;
PatternA_List : 'A'|'B'|'G'|'H'|'I'|'J' ;
PatternC_List : 'C'|'D'|'E'|'F'|'K'|'L' ;
Search_List : 'Min Cut'|'All Balanced'
    /*Search_List ['prune','notprune']*/ ;
Seed_List : '13874234'|'10285102'|'22886724'|'92997209'|'18392462'|'58869319'|'80531470'|'53535483'|'43935200'|'23239930' ;

MulDivAddSub_List : '*'|'/'|'+'|'-' ;

JsonStr
    :   'varfas'+ ;
NormalStr
    :   'varfass'+ ;
Int :   [0-9]+ ;
Bool:   'true'|'false' ;
Colour:   'asdfgdh'* ;
BGNL:   'asfvaswvr'? 'asdvaswvr'? ;

MeaningfulSplit : '=== meaningful ^ ===' ;

NEWLINE:'\r'? '\n' ; 
        // return newlines to parser (is end-statement signal)
WS  :   [ \t]+ -> skip ;         // toss out whitespace


/* Call_BeforeType
//this.evisitor.recieveOrder='ORDER_NONE';
// this.evisitor.valueColor=330;
this.evisitor.statementColor=300;
// this.evisitor.entryColor=250;

// this.evisitor.idstring_eColor=310;
this.evisitor.gateArgsColor=170;
this.evisitor.markColor=70;
this.evisitor.generatingCircuitColor=130;
// this.evisitor.eventColor=220;
// this.evisitor.soundColor=20;
*/

/* Call_BeforeBlock
// this.block('prog').inputsInline=true;
// this.block('idString_1_e').output='idString_e';
// this.block('idString_2_e').output='idString_e';
*/

/* Insert_FunctionStart
CutlineInputFunctions.JsonStr_pre = function(str) {
    if (str===''||str==='JsonStr_default') {
        
    } else {
        let tmp = eval(str)
    }
    return str;
}

CutlineInputBlocks.generatingCircuit.json.nextStatement=undefined;
CutlineInputBlocks.generatingCircuitNone.json.nextStatement=undefined;
*/