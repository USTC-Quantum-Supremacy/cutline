
/**
 * @constructor
 */
function StructDataClass() {

}

StructDataClass.prototype.xsize=12
StructDataClass.prototype.ysize=11
StructDataClass.prototype.unused=0 // 黑白染色, 0,0这组不使用
StructDataClass.prototype.defaultElement={isBit:1,save:1}
StructDataClass.prototype.unusedElement={unused:1}
StructDataClass.prototype.boundaryElement={isBoundary:1}
StructDataClass.prototype.map=[[]] // map[x+1][y+1]
StructDataClass.prototype.qi2xy_dict=[]
StructDataClass.prototype.removeList=[]
StructDataClass.prototype.splitEdges=[]
StructDataClass.prototype.CInputFirstLine=''

StructDataClass.prototype.init = function (params) {
    Object.assign(this,params)
    return this
}

StructDataClass.prototype.initmap=function (params) {
    this.map=Array.from({length:this.xsize+2}).map(v=>Array.from({length:this.ysize+2}).map(v=>JSON.parse(JSON.stringify(this.defaultElement))))
    // 移除unused
    for (let yindex = 0; yindex < this.ysize+2; yindex++) {
        for (let xindex = 0; xindex < this.xsize+2; xindex++) {
            if ((xindex+yindex)%2===this.unused) {
                this.map[xindex][yindex]=JSON.parse(JSON.stringify(this.unusedElement))
            }
        }
    }
    // 移除边界
    for (let index = 0; index < this.xsize+2; index++) {
        this.map[index][0]=this.boundaryElement
        this.map[index][this.ysize+1]=JSON.parse(JSON.stringify(this.boundaryElement))
    }
    for (let index = 0; index < this.ysize+2; index++) {
        this.map[0][index]=this.boundaryElement
        this.map[this.xsize+1][index]=JSON.parse(JSON.stringify(this.boundaryElement))
    }
    // 标qi序号
    let qindex=0;
    this.qi2xy_dict=[];
    for (let yindex = 0; yindex < this.ysize+2; yindex++) {
        for (let xindex = 0; xindex < this.xsize+2; xindex++) {
            if (this.map[xindex][yindex].isBit) {
                this.qi2xy_dict[qindex]={x:xindex-1,y:yindex-1}
                this.map[xindex][yindex].qi=qindex++;
            }
        }
    }
    this.bitCount=qindex;
    return this
}

StructDataClass.prototype.getxy=function (o) {
    return this.map[o.x+1][o.y+1]
}

StructDataClass.prototype.setxy=function (o,v) {
    return (this.map[o.x+1][o.y+1]=v)
}

StructDataClass.prototype.qi2xy=function (qi) {
    return this.qi2xy_dict[qi]
}

StructDataClass.prototype.getAdjacent=function (o) {
    return [
        {x:o.x-1,y:o.y-1},{x:o.x-1,y:o.y},{x:o.x-1,y:o.y+1},
        {x:o.x-0,y:o.y-1},                {x:o.x-0,y:o.y+1},
        {x:o.x+1,y:o.y-1},{x:o.x+1,y:o.y},{x:o.x+1,y:o.y+1},
    ]
}

/**
 * @param {Number[]} choosen 以qi编号的形式列出坏掉的比特
 */
StructDataClass.prototype.loadChoosen=function (choosen) {
    if (!choosen) {
        choosen=[]
    }
    this.choosen=[]
    for (let qindex = 0; qindex < this.bitCount; qindex++) {
        if (choosen.indexOf(qindex)!==-1) {
            // 排除
            this.getxy(this.qi2xy(qindex)).save=0
            this.choosen.push(qindex)
        } else {
            // 保留
            this.getxy(this.qi2xy(qindex)).area=0
        }
    }
    return this
}

/**
 * @param {Number[]} removedStart x+y*xsize的形式给出移除的起点
 */
StructDataClass.prototype.loadRemovedStart=function (removedStart) {
    if (!removedStart) {
        removedStart=[]
    }
    this.removedStart=[]
    for (let index = 0; index < removedStart.length; index++) {
        const xy = removedStart[index];
        let x=xy%this.xsize;
        let y=(xy-x)/this.xsize;
        if (this.getxy({x,y}).unused) {
            this.getxy({x,y}).removedStart=1
        }
    }
    let endIndex=1
    let startIndex=1
    for (let y = 0; y < this.ysize; y++) {
        for (let x = 0; x < this.xsize; x++) {
            if(! (x===0 || y==0 ||x===this.xsize-1 || y===this.ysize-1))continue;
            if (! this.getxy({x,y}).unused)continue;
            this.getxy({x,y}).end=endIndex++
            if (this.getxy({x,y}).removedStart) {
                this.removedStart.push(x+y*this.xsize)
            }else{
                this.getxy({x,y}).start=startIndex++
            }
        }
    }
    return this
}

StructDataClass.prototype.pickMaxArea = function (params) {
    let areaindex=1
    let area={}
    for (let qindex = 0; qindex < this.bitCount; qindex++) {
        if (this.getxy(this.qi2xy(qindex)).area!==0) continue;
        // BFS 统计区域数和面积
        let queue=[qindex]
        while (queue.length) {
            let qi=queue.shift()
            if (this.getxy(this.qi2xy(qi)).area!==0) continue;
            this.getxy(this.qi2xy(qi)).area=areaindex
            area[areaindex]=(area[areaindex]||0)+1
            let _f = this.getAdjacent
            let pts=_f(this.qi2xy(qi))
            for (let index = 0,pt; pt=pts[index]; index++) {
                if (this.getxy(pt).area===0) {
                    queue.push(this.getxy(pt).qi)
                }
            }
        }
        areaindex++
    }
    areaindex--
    this.area=area
    this.areaNumber=areaindex
    // 取max
    let mai=0
    let man=0
    for (const ai in area) {
        if (area.hasOwnProperty(ai)) {
            const an = area[ai];
            if (an>man) {
                mai=ai
                man=an
            }
        }
    }
    this.maxArea=~~mai
    this.maxAreaCount=man
    // 统计边
    let edges = []
    let map={}
    let currentCount=1
    for (let qindex = 0; qindex < this.bitCount; qindex++) {
        if (this.getxy(this.qi2xy(qindex)).area!==this.maxArea) continue
        map[qindex]=currentCount++
        let _f = this.getAdjacent
        let pts=_f(this.qi2xy(qindex))
        for (let index = 0,pt; pt=pts[index]; index++) {
            if (this.getxy(pt).area===this.maxArea) {
                let q1=qindex
                let q2=this.getxy(pt).qi
                if (q1<q2) {
                    edges.push([q1,q2])
                }
            }
        }
    }
    this.maxAreaEdges=edges
    this.maxAreaEdgeCount=edges.length
    this.maxAreaMap=map
    return this
}

StructDataClass.prototype._area=function (params) {
    return this.map.map(v=>v.map(u=>u.isBoundary||0).join(' ')).join('\n')
}
StructDataClass.prototype._start=function (params) {
    return this.map.map(v=>v.map(u=>u.start||0).join(' ')).join('\n')
}
StructDataClass.prototype._end=function (params) {
    return this.map.map(v=>v.map(u=>u.end||0).join(' ')).join('\n')
}
StructDataClass.prototype._cost2=function (params) {
    return this.map.map(v=>v.map(u=>u.area===this.maxArea?1:0).join(' ')).join('\n')
}
StructDataClass.prototype._cost=function (params) {
    for (let qindex = 0; qindex < this.bitCount; qindex++) {
        if (this.getxy(this.qi2xy(qindex)).save===0){
            let o=this.qi2xy(qindex)
            let pts=[
                                 {x:o.x-1,y:o.y},                
                {x:o.x-0,y:o.y-1},                {x:o.x-0,y:o.y+1},
                                 {x:o.x+1,y:o.y},
            ]
            for (let index = 0,pt; pt=pts[index]; index++) {
                if (! this.getxy(pt).isBoundary) {
                    this.getxy(pt).cost1=1
                }
            }
        }
    }
    return this.map.map(v=>v.map(u=>u.cost1||0).join(' ')).join('\n')
}

StructDataClass.prototype._ndeep=function (params) {
    return Math.max(9,2*Math.min(this.xsize,this.ysize))
}
StructDataClass.prototype._edeep=function (params) {
    return this.choosen.length*2 
}
StructDataClass.prototype._max=function (params) {
    return this.maxAreaCount-this._min()
}
StructDataClass.prototype._min=function (params) {
    return ~~(this.maxAreaCount/2-2.5)
}
StructDataClass.prototype._q0x=function (params) {
    return 2 
}
StructDataClass.prototype._q0y=function (params) {
    return 1 
}

StructDataClass.prototype.generateCInput=function (params) {
    let text=`${this.xsize} ${this.ysize} ${this._ndeep()} ${this._edeep()} ${this._max()} ${this._min()} ${this._q0x()} ${this._q0y()}
${this._area()}
${this._cost()}
${this._start()}
${this._end()}
${this._cost2()}`

    if (this.CInputFirstLine) {
        text=text.split('\n')
        text[0]=this.CInputFirstLine
        text=text.join('\n')
    }
    this.CInput=text
    return this
}

StructDataClass.prototype.copy = function (params) {
    let copy=new this.constructor()
    Object.assign(copy,JSON.parse(JSON.stringify(this)))
    return copy
}

/**
 * @param {Number[]} removeList
 */
StructDataClass.prototype.setSplit = function (removeList) {
    this.removeList=removeList
    if (removeList.length===0 || removeList.length===this.maxAreaCount) {
        this.splitEdges=[]
        this.unbalance=Infinity
        return this
    }
    // 标记remove
    for (let qindex = 0; qindex < this.bitCount; qindex++) {
        let mi=this.getxy(this.qi2xy(qindex))
        if (mi.area!==this.maxArea) continue
        mi.area2=0
        if (removeList.indexOf(qindex)!==-1) {
            mi.remove=1
        } else {
            mi.area2=1
        }
    }
    // 染色
    let areaindex2=2
    let area2={}
    for (let qindex = 0; qindex < this.bitCount; qindex++) {
        if (this.getxy(this.qi2xy(qindex)).area2!==0) continue;
        // BFS 统计区域数和面积
        let queue=[qindex]
        while (queue.length) {
            let qi=queue.shift()
            if (this.getxy(this.qi2xy(qi)).area2!==0) continue;
            this.getxy(this.qi2xy(qi)).area2=areaindex2
            area2[areaindex2]=(area2[areaindex2]||0)+1
            let _f = this.getAdjacent
            let pts=_f(this.qi2xy(qi))
            for (let index = 0,pt; pt=pts[index]; index++) {
                if (this.getxy(pt).area2===0 && this.getxy(pt).remove===this.getxy(this.qi2xy(qi)).remove) {
                    queue.push(this.getxy(pt).qi)
                }
            }
        }
        areaindex2++
    }
    areaindex2--
    // 不同色则加边
    let edgemap={}
    for (let qindex = 0; qindex < this.bitCount; qindex++) {
        let mi=this.getxy(this.qi2xy(qindex))
        if (!(mi.area2>0)) continue;
        let _f = this.getAdjacent
        let pts=_f(this.qi2xy(qindex))
        for (let index = 0,pt; pt=pts[index]; index++) {
            let a1=mi.area2
            let a2=this.getxy(pt).area2
            if (this.getxy(pt).area2>0 && qindex < this.getxy(pt).qi && a1!==a2) {
                let key=a1<a2?a1+'_'+a2:a2+'_'+a1
                let edge=[qindex,this.getxy(pt).qi]
                edgemap[key]=edgemap[key]||[]
                edgemap[key].push(edge)
            }
        }
    }
    // 找max并算失衡值
    let mk;
    let mv=0
    for (const key in edgemap) {
        if (edgemap.hasOwnProperty(key)) {
            const value = edgemap[key].length;
            if (value>mv) {
                mk=key
                mv=value
            }
        }
    }
    let area2s=mk.split('_').map(v=>area2[~~v])
    let unbalance=Math.abs(2*area2s[0]-this.maxAreaCount)+Math.abs(2*area2s[1]-this.maxAreaCount)
    this.splitEdges=edgemap[mk]
    this.unbalance=unbalance
    //
    return this
}


/**
 * @constructor
 */
function VisualClass() {

}

VisualClass.prototype.xmax = 500
VisualClass.prototype.ptStrokeColor = '#000'
VisualClass.prototype.ptFillColor = '#fff'
VisualClass.prototype.ptR = 30
VisualClass.prototype.ptWidth = 10
VisualClass.prototype.lineStrokeColor = '#000'
VisualClass.prototype.lineWidth = 10
VisualClass.prototype.markOffsetQ={x:0,y:0}
VisualClass.prototype.markFontSizeQ=28
VisualClass.prototype.startR=15
VisualClass.prototype.startFill='#444'


VisualClass.prototype.init = function (params) {
    Object.assign(this,params)
    return this
}

VisualClass.prototype.data=new StructDataClass()

/**
 * @param {StructDataClass} data
 */
VisualClass.prototype.importData = function (data) {
    this.data=data
    return this
}

VisualClass.prototype.point=function (o,qi,strokeColor,fillColor) {
    return `<circle class="qpt q${qi} m${this.data.maxAreaMap[qi]}" cx="${100*o.x}" cy="${100*o.y}" r="${this.ptR}" stroke="${strokeColor}"stroke-width="${this.ptWidth}" fill="${fillColor}"/>`
}

VisualClass.prototype.start=function (x,y) {
    return `<circle class="qstart s${x+y*this.data.xsize}" cx="${100*x}" cy="${100*y}" r="${this.startR}" fill="${this.startFill}"/>`
}

VisualClass.prototype.line =function (o1,o2,q1,q2,strokeColor) {
    return `<line class="qline q${q1} q${q2} m${this.data.maxAreaMap[q1]} m${this.data.maxAreaMap[q2]}" x1="${100*o1.x}" y1="${100*o1.y}" x2="${100*o2.x}" y2="${100*o2.y}" stroke="${strokeColor}" stroke-width="${this.lineWidth}"/>`
}

VisualClass.prototype.mark=function (o,f,qi,mark,markFontSize) {
    return `<text x="${100*o.x+f.x}" y="${100*o.y+f.y}" class="mark q${qi} m${this.data.maxAreaMap[qi]}}" dominant-baseline="middle" text-anchor="middle" font-size="${markFontSize}" stroke="black">${mark}</text>`
}

VisualClass.prototype.getId=function (params) {
    if (!this.cssid) {
        this.cssid = ('I'+Math.random()).replace(/\./g,'')
    }
    return this.cssid
}

VisualClass.prototype.generateBaseSVG = function (params) {
    let points=[]
    let edges=[]
    let QMarks=[]
    let starts=[]

    let _f = this.data.getAdjacent
    for (let qindex = 0; qindex < this.data.bitCount; qindex++) {

        points.push(this.point(this.data.qi2xy(qindex),qindex,this.ptStrokeColor,this.ptFillColor))

        // QMarks.push(this.mark(this.data.qi2xy(qindex),this.markOffsetQ,qindex,qindex,this.markFontSizeQ))

        let pts=_f(this.data.qi2xy(qindex))
        for (let index = 0,pt; pt=pts[index]; index++) {
            if (this.data.getxy(pt).isBit) {
                let q1=qindex
                let q2=this.data.getxy(pt).qi
                if (q1<q2) {
                    edges.push(this.line(this.data.qi2xy(qindex),pt,q1,q2,this.lineStrokeColor))
                }
            }
        }
    }

    for (let y = 0; y < this.data.ysize; y++) {
        for (let x = 0; x < this.data.xsize; x++) {
            if (! this.data.getxy({x,y}).end)continue;
            starts.push(this.start(x,y))
        }
    }

    this.points=points
    this.edges=edges
    this.QMarks=QMarks
    this.starts=starts

    return this
}

VisualClass.prototype.generateSVGCSS = function (params) {
    let remove=[]
    let normal=[]
    let notinmax=[]
    let choosen=[]
    let splitedges=[]
    let removedStart=[]
    

    remove=this.data.removeList.map(v=>`#${this.getId()} .q${v}`)
    for (let qindex = 0; qindex < this.data.bitCount; qindex++) {
        if (this.data.removeList.indexOf(qindex)===-1) {
            normal.push(`#${this.getId()} .q${qindex}`)
        }
    }
    for (let qindex = 0; qindex < this.data.bitCount; qindex++) {
        if (this.data.getxy(this.data.qi2xy(qindex)).area!==this.data.maxArea) {
            notinmax.push(`#${this.getId()} .q${qindex}`)
        }
    }
    choosen=this.data.choosen.map(v=>`#${this.getId()} .q${v}`)
    splitedges=this.data.splitEdges.map(v=>`#${this.getId()} .qline.q${v[0]}.q${v[1]}`)
    removedStart=this.data.removedStart.map(v=>`#${this.getId()} .s${v}`)

    let tmpArr=[remove,normal,choosen,notinmax,splitedges,removedStart]
    for (let index = 0; index < tmpArr.length; index++) {
        const element = tmpArr[index];
        if (element.length===0) {
            element.push('nothing')
        }
    }

    this.SVGCSS=`
    #${this.getId()} .mark{
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    ${remove.join(', ')} {
        stroke:#009;
    }
    ${remove.map(v=>v+'.mark').join(', ')} {
        fill:#009;
    }

    ${normal.join(', ')} {
        stroke:#000;
    }
    ${normal.map(v=>v+'.mark').join(', ')} {
        fill:#000;
    }

    ${notinmax.join(', ')} {
        stroke:#bbb;
    }
    ${notinmax.map(v=>v+'.mark').join(', ')} {
        fill:#bbb;
    }
    
    ${choosen.join(', ')} {
        stroke:#fdd;
    }
    ${choosen.map(v=>v+'.mark').join(', ')} {
        fill:#fdd;
    }

    ${splitedges.join(', ')} {
        stroke:#29e142
    }

    ${removedStart.join(', ')} {
        fill:#ccc;
    }

    `
    return this
}

VisualClass.prototype.generateSVG = function (params) {
    let xsize=100*this.data.xsize+200
    let ysize=100*this.data.ysize+200
    let xmax=this.xmax
    let SVG = `
    <svg id="${this.getId()}" xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 ${xsize-100} ${ysize-100}" width="${xsize>xmax?xmax:xsize}" height="${xsize>xmax?ysize*xmax/xsize:ysize}">
        <defs xmlns="http://www.w3.org/2000/svg">
            <style xmlns="http://www.w3.org/2000/svg" type="text/css"><![CDATA[
                ${this.SVGCSS}
            ]]></style>
        </defs>
        <g>
            ${this.edges.join('\n')}
        </g>
        <g>
            ${this.points.join('\n')}
        </g>
        <g>
            ${this.QMarks.join('\n')}
        </g>
        <g>
            ${this.starts.join('\n')}
        </g>
    </svg>
    `
    this.SVG=SVG
    return this
}

VisualClass.prototype.bindSVGClick = function (svgNode,trigger) {
    let thisv=this
    let pts=Array.from(svgNode.querySelectorAll('.qpt, .mark'))
    for (let index = 0,pt; pt=pts[index]; index++) {
        (function (pt,thisv,trigger) {
            let cssclass=pt.getAttribute('class')
            pt.onclick=function (params) {
                trigger(~~(/q\d+/.exec(cssclass)[0].slice(1)),thisv,'choosen')
            }
        })(pt,thisv,trigger)
    }
    let starts=Array.from(svgNode.querySelectorAll('.qstart'))
    for (let index = 0,start; start=starts[index]; index++) {
        (function (start,thisv,trigger) {
            let cssclass=start.getAttribute('class')
            start.onclick=function (params) {
                trigger(~~(/s\d+/.exec(cssclass)[0].slice(1)),thisv,'removedStart')
            }
        })(start,thisv,trigger)
    }
    return this
}

if (typeof exports === "undefined") exports = {};
exports.StructDataClass = StructDataClass
exports.VisualClass = VisualClass


//////////////////////


var StructDataClass = exports.StructDataClass
var VisualClass = exports.VisualClass

function buildMainSVG(params) {
    var xy=[12,11]
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
    sd.init({xsize:xy[0],ysize:xy[1],CInputFirstLine:CInputFirstLine}).initmap().loadChoosen(choosen).pickMaxArea().loadRemovedStart(removedStart).generateCInput().setSplit([])
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
            document.getElementById('circult').value=`${view.data.xsize},${view.data.ysize}\n${choosen.join(',')}\n${removedStart.join(',')}`
            buildMainSVG()
        })
    }
}
buildMainSVG()