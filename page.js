var isNodejs = typeof document === "undefined"
if (isNodejs) {
    var cutlineMain = require('./main.js')
} else {
    var cutlineMain = exports
}
var StructDataClass = cutlineMain.StructDataClass
var VisualClass = cutlineMain.VisualClass

function buildMainSVG(params) {
    if(typeof resultlist2)resultlist2.innerHTML=``
    var xy=[12,11,1]
    var choosen=[]
    var removedStart=[]
    var CInputFirstLine=''
    if (typeof document !== "undefined") {
        var inputstr=document.getElementById('circult').value
        var xy=eval('['+inputstr.split('\n')[0]+']')
        var choosen=eval('['+inputstr.split('\n')[1]+']')
        var removedStart=eval('['+inputstr.split('\n')[2]+']')
        var CInputFirstLine=inputstr.split('\n')[3]||''
    }

    var sd=new StructDataClass();
    sd.init({xsize:xy[0],ysize:xy[1],unused:xy[2],CInputFirstLine:CInputFirstLine}).initmap().loadChoosen(choosen).pickMaxArea().loadRemovedStart(removedStart).pushPatterns().setSplit([]).generateCInput()
    console.log(sd)

    var view=new VisualClass();
    view.init().importData(sd).generateBaseSVG().generateSVGCSS().generateSVG()
    console.log(view)

    if (typeof document !== "undefined") {
        window.sd=sd
        window.view=view
        // var node=document.createElement('div')
        // node.innerHTML=view.SVG
        // document.getElementById('insertHere').appendChild(node)
        document.getElementById('insertHere').innerHTML=view.SVG
        document.getElementById('formatedGateArray').innerText=sd.CInput
        view.bindSVGClick(document.getElementById('insertHere').children[0],function(clickData,thisv,type){
            /**
             * @type {VisualClass}
             */
            let view=thisv
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
            document.getElementById('circult').value=`${view.data.xsize},${view.data.ysize},${view.data.unused}\n${choosen.join(',')}\n${removedStart.join(',')}\n`+document.getElementById('circult').value.split('\n').slice(3).join('\n')
            buildMainSVG()
        })
    }
    return [sd,view]
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
    document.getElementById('Submit').disabled = false
}

function disablesubmit(params) {
    document.getElementById('Submit').disabled = true
}

function submit(params) {
    disablesubmit()
    document.getElementById('postresult').innerHTML='waiting'
    xhrPost('/',JSON.stringify({CInput:window.sd.CInput,prune:eval(isusingwegde.value)}),function (err,data) {
        if (err) {
            console.log(err)
            document.getElementById('postresult').innerHTML=err
        } else {
            document.getElementById('postresult').innerHTML=preProcessResult(data)
            reRenderResult()
        }

        enablesubmit()
    })
}

function preProcessResult(resultStr) {
    // 2 paths found
    // shortest length & unbalance: 2,1
    // qubits: 2, 1, 1, 2, 2, 3, 1, 4,
    // start,end: 2 4 3 1
    // ===2
    // 2,1: 2, 1, 1, 2, 2, 3, 1, 4,
    // 2,1: 2, 1, 1, 2, 3, 2, 2, 3, 1, 4,
    try {
        let check={}
        let sd= window.sd
        let last=[]
        let str=resultStr.split('===')[1]
        let lines=str.split('\n')
        for (let ii = 1; ii <= ~~lines[0]; ii++) {
            let a=eval('['+lines[ii].split(':')[1]+']')
            let b=a.map((v,i,a)=>{ return {x:v-1,y:a[i+1]-1}}).filter((v,i)=>i%2==0).map(v=>sd.getxy(v).qi).sort()
            if (check[JSON.stringify(b)]==null) {
                check[JSON.stringify(b)]=1
                last.push(b)
            }
        }
        window.lastResult=last
    } catch (error) {
    }
    return resultStr
}

function processCNFResult(result,showall,target) {
    if (result==null) {
        result=window.lastResult
    }
    target=target?'resultlist2':'resultlist'


    let list=[]
    for (let index = 0; index < result.length; index++) {
        const removeList = result[index];
        list.push(window.sd.copy().setSplit(removeList))
    }
    window.slist=list
    let cal = document.getElementById('circult').value.split('\n')[4]
    if (cal && !showall) {
        cal=eval('['+cal+']')
        let e1=cal[0],e2=cal[1],er=cal[2],d=cal[3];
        list.map(v=>v.calExpectation({e1,e2,er,d}))
    }
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
    let viewList=list.slice(0,500).map(v=>new window.view.constructor().init().importData(v).generateBaseSVG().generateSVGCSS().generateSVG())

    document.getElementById(target).innerHTML=viewList.map(v=>v.SVG+wedgestr+v.getExpectation().expectation).join('\n<br>\n')
}

function reRenderResult(params) {
    processCNFResult()
    processCNFResult(null,1,1)
}

function changePatten(params) {
    resultlist2.innerHTML=``
    patternColor.innerHTML=`
        #insertHere .qline.pattern${patternSelect.value} {
            stroke: blue;
            stroke-width: 20;
        }

        #insertHere .qline.pattern${patternSelect2.value} {
            stroke: green;
            stroke-width: 20;
        }
    `
}