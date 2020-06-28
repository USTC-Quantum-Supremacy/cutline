grammar CutlineInput;

prog:   'xsize' Number_List 'ysize' Number_List 'use00' Bool BGNL 
        'broken bits' JsonStr BGNL
        'part1 indexes' JsonStr BGNL
        'depth' Number_List BGNL
        'search' BGNL
        '> pattern' NormalStr? BGNL
        '> e1 e2 er' JsonStr BGNL
        '> removed entrances' JsonStr BGNL
        '>' Search_List BGNL
        'show mark ~1(only for mark)' BGNL marks
        'show and define pattern ~n' BGNL patterns
        'generating circuit ~1' BGNL generatingCircuits
/* prog
name : ['xsize','ysize','use00','brokenBits','part1','depth','searchPattern','errorRates','removedEntrances','search','showMark','showPattern','generatingCircuit']
default : ['12','11',true,'[]','[]','20','01232301','[0.0016,0.0062,0.038]','[]','prune']
if (searchPattern==='') {
    throw "examples: 01232301, 0123, 012323010123230121"
}
var code = CutlineInputFunctions.defaultCode('prog',[xsize,ysize,use00,brokenBits,part1,depth,searchPattern,errorRates,removedEntrances,search,showMark,showPattern,generatingCircuit]);
      return code;
*/;

generatingCircuits
    :   generatingCircuit
    |   generatingCircuitNone
    ;

generatingCircuit
    :   'qubit number' Int 'elided(not supported now)' NormalStr? 'pattern' NormalStr BGNL 
        'seed (can not change now)' Int BGNL
        'output file name' BGNL
        '> simulation' NormalStr? BGNL
        '> cut' NormalStr? BGNL
        '> map' NormalStr? BGNL
        '> experiment(unknown now)' NormalStr? BGNL
        'order (bit indexes)' BGNL
        orderlist
        'peps cut' JsonStr BGNL
        'peps path' BGNL
        orderlist
        'gateArgs(unknown now)' BGNL
        gateArgs
/* generatingCircuit
name : ['qubitNumber','elided','pattern','seed','simulationFilename','cutFilename','mapFilename','experimentFilename','order','pepsCut','pepsPath','gateArgs']
default : [60,'0','EFGH',13874234,'circuit/sycamore60_20_EFGH.txt','peps_path/sycamore60_cut.txt','peps_path/sycamore.txt','unknown now','[8,3,8,15,20,15,20,27]']
colour : this.generatingCircuitColor
var code = CutlineInputFunctions.defaultCode('generatingCircuit',[qubitNumber,elided,pattern,seed,simulationFilename,cutFilename,mapFilename,experimentFilename,order,pepsCut,pepsPath,gateArgs]);
      return code;
*/;

gateArgs
    :   'unknow format' JsonStr
/* gateArgs
name : ['unknow']
default : ['[0.5,0.1666666667,0,0,0]']
colour : this.gateArgsColor
var code = CutlineInputFunctions.defaultCode('gateArgs',[unknow]);
      return code;
*/;

generatingCircuitNone
    :   'pass'
/* generatingCircuitNone
colour : this.generatingCircuitColor
var code = CutlineInputFunctions.defaultCode('generatingCircuitNone',[]);
      return code;
*/;

marks
    :   markQi
    |   orderlist
    |   markNone
    ;

markQi : 'original qubit index' 
/* markQi
colour : this.markColor
var code = CutlineInputFunctions.defaultCode('markQi',[]);
      return code;
*/;

orderlist : 'order' JsonStr 
/* orderlist
name : ['order']
default : ['[41,35,29,34,46,22,40,28,45,21,47,23,33,53,52,17,16,39,27,15,51,32,20,44,8,56,26,38,14,50,57,58,9,10,62,63,2,3,64,4,31,19,43,7,55,25,37,13,49,1,61,30,18,42,6,54,48,12,24,36,65,5,59,11,60,0]']
colour : this.markColor
var code = CutlineInputFunctions.defaultCode('orderlist',[order]);
      return code;
*/;

markNone : 'pass' 
/* markNone
colour : this.markColor
var code = CutlineInputFunctions.defaultCode('markNone',[]);
      return code;
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
var code = CutlineInputFunctions.defaultCode('patternA',[pattern,color]);
      return code;
*/;

patternC : '\\' PatternC_List Colour
/* patternC
name : ['pattern','color']
default : ['C','#009900']
var code = CutlineInputFunctions.defaultCode('patternC',[pattern,color]);
      return code;
*/;

patternNormal : 'show' NormalStr Colour
/* patternNormal
name : ['pattern','color']
default : ['M','#993399']
var code = CutlineInputFunctions.defaultCode('patternNormal',[pattern,color]);
      return code;
*/;

patternDefine : 'define' NormalStr ':' NormalStr
/* patternDefine
name : ['pattern','bitString']
default : ['M','1_0100100100']
if (['A','B','C','D','E','F','G','H'].indexOf(pattern)!==-1) {
    throw 'can not cover A~H'
}
var code = CutlineInputFunctions.defaultCode('patternDefine',[pattern,bitString]);
      return code;
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
Search_List : 'Min(CutLength)'|'Min(CutLength*2-wedge)'
    /*Search_List ['prune','notprune']*/ ;

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


/* Function_0
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

/* Function_1
// this.block('prog').inputsInline=true;
// this.block('idString_1_e').output='idString_e';
// this.block('idString_2_e').output='idString_e';
*/

/* Functions
CutlineInputFunctions.JsonStr_pre = function(str) {
    if (str===''||str==='JsonStr_default') {
        
    } else {
        let tmp = eval(str)
    }
    return str;
}

CutlineInputFunctions.workspace = function(){return workspace}
*/