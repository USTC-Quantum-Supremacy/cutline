grammar CutlineInput;

prog:   'xsize' Int 'ysize' Int 'use00' Bool BGNL 
        'broken bits' JsonStr BGNL
        'removed entrance' JsonStr BGNL
        'SFA arguments' JsonStr BGNL
        'search' Search_List BGNL
        'show mark' marks
        'show pattern' patterns
/* prog
default : [12,11,true,'[]','[]','[0.0016,0.0062,0.038,20]','true']
var code = CutlineInputFunctions.defaultCode('prog',[Int_0,Int_1,Bool_0,"\n",JsonStr_0,"\n",JsonStr_1,"\n",JsonStr_2,"\n",Search_List_0,"\n",marks_0,patterns_0]);
      return code;
*/;


marks
    :   markQi
    |   markmap
    |   markNone
    ;
markQi : 'qubit index' 
/* markQi
colour : this.markColor
var code = CutlineInputFunctions.defaultCode('markQi',[]);
      return code;
*/;
markmap : 'order list' JsonStr 
/* markmap
default : ['[41,35,29,34,46,22,40,28,45,21,47,23,33,53,52,17,16,39,27,15,51,32,20,44,8,56,26,38,14,50,57,58,9,10,62,63,2,3,64,4,31,19,43,7,55,25,37,13,49,1,61,30,18,42,6,54,48,12,24,36,65,5,59,11,60,0]']
colour : this.markColor
var code = CutlineInputFunctions.defaultCode('markmap',[JsonStr_0]);
      return code;
*/;
markNone : 'None' 
/* markNone
colour : this.markColor
var code = CutlineInputFunctions.defaultCode('markNone',[]);
      return code;
*/;

patterns
    :   patternA
    |   patternC
    |   patternNone
    ;
patternA : '/' PatternA_List Colour;
patternC : '\\' PatternC_List Colour;
patternNone : 'None' ;


statExprSplit : '=== statement ^ === expression v ===' ;

// expression
//     :   expression MulDivAddSub_List expression
//     |   idExpr
//     |   intExpr
//     ;

PatternA_List : 'A'|'B'|'G'|'H'|'I'|'J' ;
PatternC_List : 'C'|'D'|'E'|'F' ;
Search_List : 'Min(CutLength)'|'Min(CutLength*2-wegde)'
    /*Search_List ['true','false']*/ ;

MulDivAddSub_List : '*'|'/'|'+'|'-' ;

JsonStr
    :   'varfas'+ ;
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
// this.evisitor.statementColor=70;
// this.evisitor.entryColor=250;

// this.evisitor.idstring_eColor=310;
this.evisitor.patternColor=190;
this.evisitor.markColor=70;
// this.evisitor.dataColor=130;
// this.evisitor.eventColor=220;
// this.evisitor.soundColor=20;
*/

/* Function_1
// this.block('prog').inputsInline=true;
// this.block('idString_1_e').output='idString_e';
// this.block('idString_2_e').output='idString_e';
*/

/* Functions

*/