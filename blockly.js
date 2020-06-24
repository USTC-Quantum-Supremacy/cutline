
function initscriptfunc(params) {
///insert-initscriptfunc///

var toolbox = (function(){

var toolboxXml=document.createElement('xml')

// 调整这个obj来更改侧边栏和其中的方块
// 可以直接填 '<block type="xxx">...</block>'
// 标签 '<label text="标签文本"></label>'
var toolboxObj = {
  // 每个键值对作为一页
  "statement" : [
    // 所有语句块
    CutlineInputBlocks["generatingCircuit"].xmlText(),
    CutlineInputBlocks["markQi"].xmlText(),
    CutlineInputBlocks["orderlist"].xmlText(),
    CutlineInputBlocks["patternA"].xmlText(),
    CutlineInputBlocks["patternC"].xmlText(),
    CutlineInputBlocks["prog"].xmlText(),
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

for (var name in toolboxObj){
  var custom = null;
  if(name=='xxxxxx')custom='xxxxxx';
  if(name=='zzzzzz')custom='zzzzzz';
  getCategory(toolboxXml,name,custom).innerHTML = toolboxObj[name].join(toolboxGap);
  var node = document.createElement('sep');
  node.setAttribute('gap',5*3);
  toolboxXml.appendChild(node);
}

return toolboxXml;
})();


var workspace = Blockly.inject('blocklyDiv',{
media: 'antlr-blockly/media/',
toolbox: toolbox,
zoom:{
  controls: true,
  wheel: false,//false
  startScale: 1.0,
  maxScale: 3,
  minScale: 0.3,
  scaleSpeed: 1.08
},
trashcan: false,
});

document.getElementById('blocklyDiv').onmousewheel = function(e){
  //console.log(e);
  e.preventDefault();
  var hvScroll = e.shiftKey?'hScroll':'vScroll';
  var mousewheelOffsetValue=20/380*workspace.scrollbar[hvScroll].handleLength_*3;
  workspace.scrollbar[hvScroll].handlePosition_+=( ((e.deltaY||0)+(e.detail||0)) >0?mousewheelOffsetValue:-mousewheelOffsetValue);
  workspace.scrollbar[hvScroll].onScroll_();
  // workspace.setScale(workspace.scale);
}

function omitedcheckUpdateFunction(event) {
try {
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  blocklyinput.value = code.slice(0,-1);
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
    var loadjs = function(src,callback){
        var script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
        script.onload = function () {
            callback();
        }
    }

    var lnum=[0];
    var tcb = function(){
        if(++lnum[0]!==3)return;
        var script = document.createElement('script');
        script.innerHTML = converter.mainFile[5]+initscript;
        document.body.appendChild(script);
    }

    loadjs('antlr-blockly/blockly_compressed.js',function(){
        loadjs('antlr-blockly/blocks_compressed.js',tcb);
        loadjs('antlr-blockly/javascript_compressed.js',tcb);
        loadjs('antlr-blockly/zh-hans.js',tcb);
        //loadjs('en.js',tcb);
    });
}

var grammerFile=''
function runOne(callback){
    converter = new Converter().init();
    converter.generBlocks(grammerFile);
    converter.renderGrammerName();
    converter.generToolbox();
    converter.generMainFile();
    console.log(converter);
    if(callback)callback();
}

var xhrg4=new XMLHttpRequest();
xhrg4.onreadystatechange = function (){
    if(xhrg4.readyState!=4) return;
    if(xhrg4.status!=200) {
        return;
    }
    grammerFile=xhrg4.responseText;
    runOne(func_Run);
}
xhrg4.open('GET','CutlineInput.g4',true);
xhrg4.send(null);