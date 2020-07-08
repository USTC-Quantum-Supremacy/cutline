var isNodejs = typeof document === "undefined"
if (isNodejs) {
    var cutlineMain = require('./main.js')
} else {
    var cutlineMain = exports
}
var StructDataClass = cutlineMain.StructDataClass
var VisualClass = cutlineMain.VisualClass

if (localStorage.getItem('blocklyinput')!=null) {
    try {
        document.querySelector('#blocklyinput').value=localStorage.getItem('blocklyinput')
    } catch (error) {
    }
}

function buildBlocks(params) {
    try {
        CutlineInputFunctions.parse(eval('('+document.querySelector('#blocklyinput').value+')'))
    } catch (error) {
        console.error(error)
    }
}
function buildMainSVG(params) {
    if(typeof resultlist2)resultlist2.innerHTML=``
    
    var sd=new StructDataClass();
    sd.import(eval('('+document.querySelector('#blocklyinput').value+')'))
    console.log(sd)
    try {
        localStorage.setItem('blocklyinput',document.querySelector('#blocklyinput').value)
    } catch (error) {
    }
    
    var view=new VisualClass();
    view.init().importData(sd).generateBaseSVG().generateSVGCSS().generateSVG()
    console.log(view)
    
    window.sd=sd
    window.view=view

    showCircuit()
    buildBlocks()
    changePatten()

    document.getElementById('insertHere').innerHTML=view.SVG
    view.bindSVGClick(document.getElementById('insertHere').children[0],function(clickData,thisv,type){

        let choosen=thisv.data.choosen
        let removedStart=thisv.data.removedStart
        if (type==='choosen') {
            if (choosen.indexOf(clickData)===-1) {
                choosen.push(clickData)
            } else {
                choosen.splice(choosen.indexOf(clickData),1)
            }
        }
        if (type==='removedStart') {
            if (removedStart.indexOf(clickData)===-1) {
                removedStart.push(clickData)
            } else {
                removedStart.splice(removedStart.indexOf(clickData),1)
            }
        }
        document.querySelector('#blocklyinput').value=JSON.stringify(sd.buildInput().input,null,4)
        buildMainSVG()
    })
}
buildMainSVG()



function xhrPost(url,data,callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4){
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                callback(null,xhr.responseText);
            }else{
                callback([xhr.status,xhr.responseText],null);
            }
        }
    }
    xhr.open('post',url);
    xhr.setRequestHeader('Content-Type','text/plain')
    xhr.send(data);
}

function enablesubmit(params) {
    document.getElementById('Search').disabled = false
}

function disablesubmit(params) {
    document.getElementById('Search').disabled = true
}

function submit(params) {
    buildMainSVG()
    disablesubmit()
    document.getElementById('postresult').innerHTML='waiting'
    document.getElementById('postresult').innerHTML=sd.searchPath()
    document.getElementById('reRenderResult').onclick()
    enablesubmit()
}

function processPathsResult_page(result,showall,target) {
    /** @type {import('./main.js').StructDataClass} */
    let sd=window.sd
    
    target=target?'resultlist2':'resultlist'

    if (showall) {
        if (result==null) {
            result=sd.pathsSplit
        }
        let list=[]
        /** @type {import('./main.js').StructDataClass} */
        let newins=new sd.constructor().import(sd.input,{part1:'[]'})
        for (let index = 0; index < Math.min(showall,result.length); index++) {
            const removeList = result[index];
            list.push(newins.copyThis().setSplit(removeList))
        }
        let viewList=list.map(v=>new view.constructor().init().importData(v).generateBaseSVG().generateSVGCSS().generateSVG())
        document.getElementById(target).innerHTML=viewList.map(v=>v.SVG).join('\n<br>\n')

    } else {

        let output = sd.processPathsResult()
        window.PathsResultOutput=output
        window.ssd=output.instance
        console.log(output)
        let wedgestr='<br><br> maxofmin: <br>'+JSON.stringify(output.maxofmin)+'<br><br> all pattern: <br>'+JSON.stringify(output.min)+'<br>'
        output.instance.calExpectation()
        
        let view1=new window.view.constructor().init().importData(output.instance).generateBaseSVG().generateSVGCSS().generateSVG()
        
        document.getElementById(target).innerHTML=view1.SVG+view1.getExpectation().expectation+wedgestr
    }
}

function reRenderResult(shownumber) {
    processPathsResult_page()
    processPathsResult_page(null,shownumber,1)
}

var lastinputstr=''
var delaydo=null
function trigger(event) {
    if (document.querySelector('#blocklyinput').value===lastinputstr) {
        
    } else {
        lastinputstr=document.querySelector('#blocklyinput').value
        blocklyDone()
    }
    // console.log(event)
    // if(event.type==="change"){
    //     if (delaydo!=null) {
    //         clearTimeout(delaydo)
    //     }
    //     delaydo=setTimeout(v=>{buildMainSVG();delaydo=null},2000)
    // }
}

function blocklyDone(params) {
    sd.input=JSON.parse(document.querySelector('#blocklyinput').value)
    changePatten()
}

function changePatten(params) {
    resultlist2.innerHTML=``
    patternColor.innerHTML=sd.input.showPattern.filter(v=>["patternNone","patternDefine"].indexOf(v.type)===-1).map(v=>`
    #insertHere .qline.pattern${v.pattern} {
        stroke: ${v.color};
        stroke-width: 20;
    }
    `).join('')
}

function showCircuit(params) {
    buildMainSVG()
    sd.generateCircuit(args=>{
        document.querySelector('#formatedGateArray').innerText=`circuit:\n${args.circuit}\n\ncut:\n${args.cutText}\n\nmap:\n${args.mapText}`
    })
}