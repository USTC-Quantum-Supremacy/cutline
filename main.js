
/**
 * @class
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
StructDataClass.prototype.edge_dict={} // edge_dict[q1_q2]
StructDataClass.prototype.qi2xy_dict=[]
StructDataClass.prototype.removeList=[]
StructDataClass.prototype.splitEdges=[]
StructDataClass.prototype.CInputFirstLine=''
StructDataClass.prototype.patterns=['A','B','C','D','E','F','G','H','I','J']
StructDataClass.prototype.circles=[
    ['ABCDCDAB','BC','DA'],
    ['BACDCDBA','AC','DB'],
    ['ABEFEFAB','BE','FA'],
    ['BAEFEFBA','AE','FB'],
    ['GHCDCDGH','HC','DG'],
    ['HGCDCDHG','GC','DH'],
    ['GHEFEFGH','HE','FG'],
    ['HGEFEFHG','GE','FH'],
    ['IJCDCDIJ','JC','DI'],
]
StructDataClass.prototype.bitStringCircles=(()=>{
    let pa='0000000100'
    let pb='1111111011'
    let pc='0000000000'
    let pd='1111111111'
    return [
        [pa+'_'+pc,['0_'+pb,'1_'+pc],['1_'+pd,'0_'+pa]]
    ]
})()

StructDataClass.prototype.init = function (params) {
    Object.assign(this,params)
    if(this.xsize==12 && this.ysize==11){
        this.orderList=[36,30,24,31,43,19,37,25,44,20,42,18,32,48,49,12,13,38,26,14,50,33,21,45,9,57,27,39,51,15,56,8,55,7,62,61,2,1,34,22,46,10,58,63,3,28,40,16,52,4,64,23,35,11,47,59,53,17,29,41,6,54,0,60,5,65]
        this.orderMap={}
        this.orderList.forEach((v,i)=>this.orderMap[v]=i+1)
    }
    this.getPatternSize()
    return this
}

StructDataClass.prototype.initmap=function (params) {
    this.map=Array.from({length:this.xsize+2}).map(v=>Array.from({length:this.ysize+2}).map(v=>JSON.parse(JSON.stringify(this.defaultElement))))
    this.edge_dict={}
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

StructDataClass.prototype.qi2xy=function (qi) {
    return this.qi2xy_dict[qi]
}

StructDataClass.prototype.qubit=function (qi) {
    return this.getxy(this.qi2xy(qi))
}

StructDataClass.prototype.edge=function (q1,q2) {
    if (q2==null) {
        q2=q1[1]
        q1=q1[0]
    }
    if (q1>q2) {
        let t=q1
        q1=q2
        q2=t
    }
    let key=q1+'_'+q2
    if (this.edge_dict[key]==null) {
        this.edge_dict[key]={q1,q2}
    }
    return this.edge_dict[key]
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
            this.qubit(qindex).save=0
            this.choosen.push(qindex)
        } else {
            // 保留
            this.qubit(qindex).area=0
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
        if (this.qubit(qindex).area!==0) continue;
        // BFS 统计区域数和面积
        let queue=[qindex]
        while (queue.length) {
            let qi=queue.shift()
            if (this.qubit(qi).area!==0) continue;
            this.qubit(qi).area=areaindex
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
    let currentCount=0
    for (let qindex = 0; qindex < this.bitCount; qindex++) {
        if (this.qubit(qindex).area!==this.maxArea) continue
        this.qubit(qindex).mi=currentCount++
        let _f = this.getAdjacent
        let pts=_f(this.qi2xy(qindex))
        for (let index = 0,pt; pt=pts[index]; index++) {
            if (this.getxy(pt).area===this.maxArea) {
                let q1=qindex
                let q2=this.getxy(pt).qi
                if (q1<q2) {
                    edges.push([q1,q2])
                    this.edge(q1,q2).isMaxAreaEdge=1
                }
            }
        }
    }
    this.maxAreaEdges=edges
    this.maxAreaEdgeCount=edges.length
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
        if (this.qubit(qindex).save===0){
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
    return Math.max(9,Math.max(this.xsize,this.ysize)-1)
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
    return this.qi2xy(0).x+1
}
StructDataClass.prototype._q0y=function (params) {
    return this.qi2xy(0).y+1
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

/**
 * @returns {StructDataClass}
 */
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
    // 标记remove
    let area2={1:0,2:0}
    for (let qindex = 0; qindex < this.bitCount; qindex++) {
        let mi=this.qubit(qindex)
        if (mi.area!==this.maxArea) continue
        mi.area2=0
        if (removeList.indexOf(qindex)!==-1) {
            mi.remove=1
            mi.area2=2
            area2[2]++
        } else {
            mi.area2=1
            area2[1]++
        }
    }
    // 不同色则加边
    let edgemap={}
    for (let qindex = 0; qindex < this.bitCount; qindex++) {
        let mi=this.qubit(qindex)
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
    if (removeList.length===0 || removeList.length===this.maxAreaCount) {
        this.splitEdges=[]
        this.unbalance=this.maxAreaCount*2
        return this
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
    for (let ei = 0; ei < edgemap[mk].length; ei++) {
        const edge = edgemap[mk][ei];
        this.edge(edge).isSplitEdge=1
    }
    this.splitEdges=edgemap[mk]
    this.unbalance=unbalance
    //
    return this
}

/**
 * 计算一些预期的数
 * @param {Object} params
 * @param {number} params.e1 单比特
 * @param {number} params.e2 双比特
 * @param {number} params.er 读取
 * @param {number} params.d  深度
 */
StructDataClass.prototype.calExpectation = function (params) {
    let p=Object.assign({
        n1:this.unbalance/4+this.maxAreaCount/2,
        n2:-this.unbalance/4+this.maxAreaCount/2,
        n:this.maxAreaCount,
        c:this.splitEdges.length,
        b:this.maxAreaEdgeCount
    },params)
    let f=((1-p.e1)**p.n * (1-p.e2)**(p.b/4))**p.d * (1-p.er)**p.n
    let r2=9/f/f
    let r3=r2/(0.6*1000000/200)
    let cu=(2**p.n1+2**p.n2)*4**(p.d/4*p.c)*f
    let cg=2.37684487542793e+29*0.00224
    let r6=cu/cg
    this.expectation=[f,r2,r3,cu,cg,r6]
    this.expectation_describe=['f','count','time','SFA_u','SFA_g','SFA_u/SFA_g']
    return this
}

StructDataClass.prototype.calPatterns = function (o1,o2) {
    // 待重构为用checkBitStringPattern实现
    if (this.unused!==0) {
        o1={x:o1.x,y:o1.y+1}
        o2={x:o2.x,y:o2.y+1}
    }
    let patterns=[]
    if (o1.x>o2.x) {
        let _t=o1;
        o1=o2
        o2=_t
    }
    let eq=(modbase,a)=>o1.x%modbase===a[0]&&o1.y%modbase===a[1]&&o2.x%modbase===a[2]&&o2.y%modbase===a[3]
    let ld = eq(2,[0,1,1,0])
    let ru = eq(2,[1,0,0,1])
    let big = o1.y>o2.y
    let small = o1.y<o2.y
    let s1 = (o1.x+o1.y)%4===1
    let s3 = (o1.x+o1.y)%4===3
    let m1 = ((o1.x-o1.y)%4+4)%4===1
    let m3 = ((o1.x-o1.y)%4+4)%4===3
    if (ld && big) patterns.push('A');
    if (ru && big) patterns.push('B');
    if (ld && small) patterns.push('C');
    if (ru && small) patterns.push('D');
    if (small && s1) patterns.push('E');
    if (small && s3) patterns.push('F');
    if (big && m3) patterns.push('G');
    if (big && m1) patterns.push('H');
    if (this.checkBitStringPattern(o1,o2,'0_'+Array.from({length:this.asize}).map((v,i)=>i===7?1:0).join(''))) patterns.push('I');
    if (this.checkBitStringPattern(o1,o2,'0_'+Array.from({length:this.asize}).map((v,i)=>i===7?0:1).join(''))) patterns.push('J');
    return patterns
}

StructDataClass.prototype.pushPatterns = function (params) {
    for (let ei = 0; ei < this.maxAreaEdges.length; ei++) {
        const edge = this.edge(this.maxAreaEdges[ei]);
        let patterns = this.calPatterns(this.qi2xy(edge.q1),this.qi2xy(edge.q2))
        for (let pi = 0; pi < patterns.length; pi++) {
            const pattern = patterns[pi];
            edge['isPattern_'+pattern]=1
        }
    }
    return this
}

/**
 * 
 * @param {{x:Number,y:number}} o1 
 * @param {{x:Number,y:number}} o2 
 * @param {String} pattern 形如 0_001010, _ 前是0代表左下右上, 1代表左上右下
 */
StructDataClass.prototype.checkBitStringPattern = function (o1,o2,pattern) {
    if (this.unused!==0) {
        o1={x:o1.x,y:o1.y+1}
        o2={x:o2.x,y:o2.y+1}
        throw "unfinished"
    }
    let patterns=[]
    if (o1.x>o2.x) {
        let _t=o1;
        o1=o2
        o2=_t
    }
    let big = o1.y>o2.y // 左下右上 A类
    let small = o1.y<o2.y // 左上右下 C类
    if (~~pattern[0]!=small) {
        return false
    }
    let ac = o1.x%2===0&&o1.y%2===1 // 在bitstring0时和patternAC同模式
    if (big) { 
        // 左下右上 A类
        let index=(o1.x+o1.y-1)/2
        return ac^pattern[2+index]
    } else { 
        // 左上右下 C类
        let index=(o1.x-o1.y+this.ysize-(this.ysize%2===0?3:2))/2
        return ac^pattern[2+index]
    }
}

StructDataClass.prototype.getPotentialWedgeList = function (params) {
    let list = []
    let edges=this.splitEdges
    for (let ii = 0; ii < edges.length; ii++) {
        const ei = this.edge(edges[ii])
        for (let jj = ii+1; jj < edges.length; jj++) {
            const ej = this.edge(edges[jj])
            let tocheck=1*(ei.q1===ej.q1)+2*(ei.q1===ej.q2)+3*(ei.q2===ej.q1)+4*(ei.q2===ej.q2)
            if (!tocheck) continue; // 没有相同比特
            let q1=[null,ei.q2,ei.q2,ei.q1,ei.q1][tocheck]
            let q2=[null,ej.q2,ej.q1,ej.q2,ej.q1][tocheck]
            let o1=this.qi2xy(q1)
            let o2=this.qi2xy(q2)
            if (o1.x!==o2.x && o1.y!==o2.y) continue; // 直线
            list.push([ii,jj])
        }
    }
    this.potentialWedgeList=list
    return this
}

/**
 * check if a edge is a pattern
 * @callback EdgeToIsPattern
 * @param {Object} edge edge
 * @returns {Boolean}
 */
/**
 * @param {EdgeToIsPattern} pf1 
 * @param {EdgeToIsPattern} pf2 
 */
StructDataClass.prototype.calWedge = function (pf1,pf2) {
    let count=0
    let edges=this.splitEdges
    let used={}
    let list=this.potentialWedgeList
    for (let index = 0; index < list.length; index++) {
        const li = list[index];
        if (used[li[0]] || used[li[1]]) continue;
        let ei=this.edge(edges[li[0]])
        let ej=this.edge(edges[li[1]])
        if (pf1(ei)&&pf2(ej) || pf1(ej)&&pf2(ei)) {
            used[li[0]]=1
            used[li[1]]=1
            count++
        }
    }
    return count
}

StructDataClass.prototype.calCutLengthWithWedge = function (params) {
    this.getPotentialWedgeList()
    let pf=(edge,pattern)=>edge['isPattern_'+pattern]
    let patterns=this.circles
    let wedge={}
    for (let pi = 0; pi < patterns.length; pi++) {
        const pattern = patterns[pi];
        let cwegde1=this.calWedge(e=>pf(e,pattern[1][0]),e=>pf(e,pattern[1][1]))
        let cwegde2=this.calWedge(e=>pf(e,pattern[2][0]),e=>pf(e,pattern[2][0]))
        wedge[pattern[0]]={
            length:this.splitEdges.length*2-cwegde1+cwegde2,
            cut:this.splitEdges.length,
            wegde:cwegde1+cwegde2,
            wegdes:[cwegde1,cwegde2],
            pattern:JSON.parse(JSON.stringify(pattern)),
        }
    }
    this.wegde=wedge
    return this
}

StructDataClass.prototype.calCutLengthWithWedge_bitString = function (params) {
    this.getPotentialWedgeList()
    let pf=(edge,pattern)=>this.checkBitStringPattern(this.qi2xy(edge.q1),this.qi2xy(edge.q2),pattern)
    let patterns=this.bitStringCircles
    let wedge={}
    for (let pi = 0; pi < patterns.length; pi++) {
        const pattern = patterns[pi];
        let cwegde1=this.calWedge(e=>pf(e,pattern[1][0]),e=>pf(e,pattern[1][1]))
        let cwegde2=this.calWedge(e=>pf(e,pattern[2][0]),e=>pf(e,pattern[2][0]))
        wedge[pattern[0]]={
            length:this.splitEdges.length*2-cwegde1+cwegde2,
            cut:this.splitEdges.length,
            wegde:cwegde1+cwegde2,
            wegdes:[cwegde1,cwegde2],
            // pattern:JSON.parse(JSON.stringify(pattern)),
        }
    }
    this.wegde=wedge
    return this
}

StructDataClass.prototype.getPatternSize = function (params) {
    let asize=~~((this.xsize+this.ysize)/2)-1
    let csize=~~((this.xsize-1)/2)+~~((this.ysize-1)/2)
    if (this.unused!==0) {
        asize=~~(this.xsize/2)+~~(this.ysize/2)-1
        csize=~~((this.xsize+this.ysize-1)/2)-1
    }
    this.asize=asize
    this.csize=csize
    return this
}

StructDataClass.prototype.getBitStringCircles = function (params) {
    if (this.unused!==0) {
        throw "unfinished"
    }
    let asize=this.asize
    let csize=this.csize
    let circles=[]
    for (let ai = 0; ai < 2**(asize-1); ai++) {
        let pa=(ai+2**asize).toString(2).slice(1)
        let pb=(-1-ai+2*2**asize).toString(2).slice(1)
        for (let ci = 0; ci < 2**(csize-1); ci++) {
            let pc=(ci+2**csize).toString(2).slice(1)
            let pd=(-1-ci+2*2**csize).toString(2).slice(1)
            // ['ABCDCDAB','BC','DA'],
            // ['BACDCDBA','AC','DB'],
            circles.push(
                [pa+'_'+pc,['0_'+pb,'1_'+pc],['1_'+pd,'0_'+pa]],
                [pb+'_'+pc,['0_'+pa,'1_'+pc],['1_'+pd,'0_'+pb]]
            )
        }
    }
    this.constructor.prototype.bitStringCircles=circles
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
VisualClass.prototype.expectation=''


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
    let qubit=this.data.qubit(qi)
    let save = qubit.save?'save':'notsave'
    let notinmax = (!qubit.area2 && qubit.save)?'notinmax':''
    let part12=qubit.area2?'part'+qubit.area2:''
    let cssclass=`qpt q${qi} m${qubit.mi} ${notinmax} ${save} ${part12}`
    return `<circle class="${cssclass}" cx="${100*o.x}" cy="${100*o.y}" r="${this.ptR}" stroke="${strokeColor}"stroke-width="${this.ptWidth}" fill="${fillColor}"/>`
}

VisualClass.prototype.mark=function (o,f,qi,mark,markFontSize) {
    let qubit=this.data.qubit(qi)
    let save = qubit.save?'save':'notsave'
    let notinmax = (!qubit.area2 && qubit.save)?'notinmax':''
    let part12=qubit.area2?'part'+qubit.area2:''
    let cssclass=`mark q${qi} m${this.data.qubit(qi).mi}} ${notinmax} ${save} ${part12}`
    return `<text x="${100*o.x+f.x}" y="${100*o.y+f.y}" class="${cssclass}" dominant-baseline="middle" text-anchor="middle" font-size="${markFontSize}" stroke="black">${mark}</text>`
}

VisualClass.prototype.line =function (o1,o2,q1,q2,strokeColor) {
    let qubit1=this.data.qubit(q1)
    let qubit2=this.data.qubit(q2)
    let save = (qubit1.save && qubit2.save)?'save':'notsave'
    let split = this.data.edge([q1,q2]).isSplitEdge?'split':''
    let notinmax = (!qubit1.area2 || !qubit2.area2)?'notinmax':''
    if (save==='notsave') notinmax='';
    let part12=''
    if (qubit1.area2===1&&qubit2.area2===1) part12='part1';
    if (qubit1.area2===2&&qubit2.area2===2) part12='part2';
    let cssclass=`qline q${q1} q${q2} m${qubit1.mi} m${qubit2.mi} ${this.calPatterns(q1,q2).join(' ')} ${save} ${split} ${notinmax} ${part12}`
    return `<line class="${cssclass}" x1="${100*o1.x}" y1="${100*o1.y}" x2="${100*o2.x}" y2="${100*o2.y}" stroke="${strokeColor}" stroke-width="${this.lineWidth}"/>`
}

VisualClass.prototype.start=function (x,y) {
    let sid=x+y*this.data.xsize
    let removedStart=this.data.removedStart.indexOf(sid)!==-1
    let cssclass=`qstart s${sid} ${removedStart?"removedStart":"notremovedStart"}`
    return `<circle class="${cssclass}" cx="${100*x}" cy="${100*y}" r="${this.startR}" fill="${this.startFill}"/>`
}

VisualClass.prototype.getId=function (params) {
    if (!this.cssid) {
        this.cssid = ('I'+Math.random()).replace(/\./g,'')
    }
    return this.cssid
}

VisualClass.prototype.calPatterns = function (q1,q2) {
    let edge=this.data.edge([q1,q2])
    let patterns=[]
    for (let pi = 0; pi < this.data.patterns.length; pi++) {
        const pattern = this.data.patterns[pi];
        if (edge['isPattern_'+pattern]) {
            patterns.push(pattern)
        }
    }
    if (patterns.length===0)patterns=['N'];
    patterns=patterns.map(v=>'pattern'+v)
    return patterns
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
        if (this.data.orderMap) {
            QMarks.push(this.mark(this.data.qi2xy(qindex),this.markOffsetQ,qindex,this.data.orderMap[qindex],this.markFontSizeQ))
        }

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

    this.SVGCSS=`
    #${this.getId()} .mark{
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    #${this.getId()} .part2{
        stroke:#009;
    }
    #${this.getId()} .part2.mark{
        fill:#009;
    }

    #${this.getId()} .part1{
        stroke:#000;
    }
    #${this.getId()} .part1.mark{
        fill:#000;
    }

    #${this.getId()} .notinmax{
        stroke:#bbb;
    }
    #${this.getId()} .notinmax.mark{
        fill:#bbb;
    }
    
    #${this.getId()} .notsave{
        stroke:#fdd;
    }
    #${this.getId()} .notsave.mark{
        fill:#fdd;
    }

    #${this.getId()} .split{
        stroke:#29e142
    }

    #${this.getId()} .removedStart{
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

VisualClass.prototype.getExpectation = function () {
    if (this.data.expectation) {
        this.expectation='<br>\n'+this.data.expectation.map((v,i)=>this.data.expectation_describe[i]+': '+v).join(', <br>\n')
    }
    return this
}

if (typeof exports === "undefined") exports = {};
exports.StructDataClass = StructDataClass
exports.VisualClass = VisualClass

