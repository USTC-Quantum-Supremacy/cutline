var isNodejs = typeof document === "undefined"
if (isNodejs) {
    var cutlineMain = require('./main.js')
} else {
    var cutlineMain = exports
}
var StructDataClass = cutlineMain.StructDataClass
var VisualClass = cutlineMain.VisualClass


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
    sd.import(eval('('+document.querySelector('#blocklyinput').value+')')).generateCInput()
    console.log(sd)
    
    var view=new VisualClass();
    view.init().importData(sd).generateBaseSVG().generateSVGCSS().generateSVG()
    console.log(view)
    
    window.sd=sd
    window.view=view

    buildBlocks()
    changePatten()

    document.getElementById('insertHere').innerHTML=view.SVG
    document.getElementById('formatedGateArray').innerText=sd.CInput
    view.bindSVGClick(document.getElementById('insertHere').children[0],function(clickData,thisv,type){

        let choosen=view.data.choosen
        let removedStart=view.data.removedStart
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
        document.querySelector('#blocklyinput').value=JSON.stringify(sd.buildInput().input)
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
    disablesubmit()
    document.getElementById('postresult').innerHTML='waiting'
    xhrPost('/',JSON.stringify({CInput:sd.CInput,prune:sd.input.search==='prune'}),function (err,data) {
        if (err) {
            console.log(err)
            document.getElementById('postresult').innerHTML=err
        } else {
            document.getElementById('postresult').innerHTML=sd.parseCResult(data)
            reRenderResult()
        }
        enablesubmit()
    })
}

function processCResult_page(result,showall,target) {
    /** @type {import('./main.js').StructDataClass} */
    let sd=window.sd
    if (result==null) {
        result=sd.CReturnPaths
    }
    target=target?'resultlist2':'resultlist'

    if (showall) {
        let list=[]
        let newins=new sd.constructor().import(sd.input,{part1:'[]'})
        for (let index = 0; index < Math.min(showall,result.length); index++) {
            const removeList = result[index];
            list.push(newins.copy().setSplit(removeList))
        }
        let viewList=list.map(v=>new view.constructor().init().importData(v).generateBaseSVG().generateSVGCSS().generateSVG())
        document.getElementById(target).innerHTML=viewList.map(v=>v.SVG).join('\n<br>\n')
        return;
    } 

    let output = sd.processCResult()
    window.CResultOutput=output
    console.log(output)
    let wedgestr='<br>'+JSON.stringify(output.maxofmin)+'<br>'+JSON.stringify(output.min)+'<br>'
    let cal=eval(sd.input.errorRates)
    let e1=cal[0],e2=cal[1],er=cal[2],d=~~sd.input.depth;
    output.instance.calExpectation({e1,e2,er,d})

    let view1=new window.view.constructor().init().importData(output.instance).generateBaseSVG().generateSVGCSS().generateSVG()

    document.getElementById(target).innerHTML=view1.SVG+wedgestr+view1.getExpectation().expectation
}

function processCResult_pageold(result,showall,target) {
    if (result==null) {
        result=sd.CReturnPaths
    }
    target=target?'resultlist2':'resultlist'

    let list=[]
    let tsd=new sd.constructor().import(sd.input,{part1:'[]'})
    for (let index = 0; index < result.length; index++) {
        const removeList = result[index];
        list.push(tsd.copy().setSplit(removeList))
    }
    window.slist=list
    let wedgestr=''
    if(!showall){
        list.map(v=>v.calCutLengthWithWedge())
        let pv=list[0].circles.map((ps,ii,arr)=>{
            let pattern = ps[0]
            let mini=list.map(v=>v.wegde[pattern].length+0.01*v.unbalance).reduce((iMax, x, i, arr) => x < arr[iMax] ? i : iMax, 0)
            return [list[mini].wegde[pattern].length,mini,pattern]
        })
        let pi=pv.map(v=>v[0]).reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
        list=[list[pv[pi][1]]]
        window.pv=pv
        window.ssd=list[0]
        window.spattern=pv[pi][2]
        wedgestr='<br>'+JSON.stringify(window.ssd.wegde[window.spattern])+'<br>'
        console.log(window.ssd)
        console.log(window.ssd.wegde[window.spattern])
        console.log(window.pv)
    }
    if (!showall) {
        let cal=eval(sd.input.errorRates)
        let e1=cal[0],e2=cal[1],er=cal[2],d=~~sd.input.depth;
        list.map(v=>v.calExpectation({e1,e2,er,d}))
    }
    let viewList=list.slice(0,500).map(v=>new window.view.constructor().init().importData(v).generateBaseSVG().generateSVGCSS().generateSVG())

    document.getElementById(target).innerHTML=viewList.map(v=>v.SVG+wedgestr+v.getExpectation().expectation).join('\n<br>\n')
}

function reRenderResult(shownumber) {
    processCResult_page()
    processCResult_page(null,shownumber,1)
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
    patternColor.innerHTML=sd.input.showPattern.filter(v=>v.type!=="patternNone").map(v=>`
    #insertHere .qline.pattern${v.pattern} {
        stroke: ${v.color};
        stroke-width: 20;
    }
    `).join('')
}