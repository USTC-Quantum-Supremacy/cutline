if (typeof document === "undefined") {
    var rand = require('./random.js').rand
} else {
    var rand = exports.rand
}

/**
 * @class
 */
function StructDataClass() {

}

StructDataClass.prototype.xsize=12
StructDataClass.prototype.ysize=11
StructDataClass.prototype.use00=true // 黑白染色, 0:0,0这组不使用, 1:0,1这组不使用
StructDataClass.prototype.defaultElement={isBit:1,save:1}
StructDataClass.prototype.unusedElement={unused:1}
StructDataClass.prototype.boundaryElement={isBoundary:1}
StructDataClass.prototype.map=[[]] // map[x+1][y+1]
StructDataClass.prototype.edge_dict={} // edge_dict[q1_q2]
StructDataClass.prototype.qi2xy_dict=[]
StructDataClass.prototype.removeList=[]
StructDataClass.prototype.splitEdges=[]
StructDataClass.prototype.CInputFirstLine=''
StructDataClass.prototype.patterns=['A','B','C','D','E','F','G','H','I','J','K','L']
StructDataClass.prototype.circles=[
    ['ABCDCDAB','ABCD'],
    ['BACDCDBA','BACD'],
    ['ABEFEFAB','ABEF'],
    ['BAEFEFBA','BAEF'],
    ['GHCDCDGH','GHCD'],
    ['HGCDCDHG','HGCD'],
    ['GHEFEFGH','GHEF'],
    ['HGEFEFHG','HGEF'],

    ['ABDCDCAB','ABDC'],
    ['BADCDCBA','BADC'],
    ['ABFEFEAB','ABFE'],
    ['BAFEFEBA','BAFE'],
    ['GHDCDCGH','GHDC'],
    ['HGDCDCHG','HGDC'],
    ['GHFEFEGH','GHFE'],
    ['HGFEFEHG','HGFE'],

    ['CDABABCD','CDAB'],
    ['CDBABACD','CDBA'],
    ['EFABABEF','EFAB'],
    ['EFBABAEF','EFBA'],
    ['CDGHGHCD','CDGH'],
    ['CDHGHGCD','CDHG'],
    ['EFGHGHEF','EFGH'],
    ['EFHGHGEF','EFHG'],

    ['DCABABDC','DCAB'],
    ['DCBABADC','DCBA'],
    ['FEABABFE','FEAB'],
    ['FEBABAFE','FEBA'],
    ['DCGHGHDC','DCGH'],
    ['DCHGHGDC','DCHG'],
    ['FEGHGHFE','FEGH'],
    ['FEHGHGFE','FEHG'],

    ['IJKLKLIJ','IJKL'],
]
StructDataClass.prototype.bitStringCircles=(()=>{
    let pa='0000000100'
    let pb='1111111011'
    let pc='0000000000'
    let pd='1111111111'
    return [
        ['0_'+pa+'_1_'+pc,['0_'+pa,'0_'+pb,'1_'+pc,'1_'+pd]]
    ]
})()

StructDataClass.prototype.import = function (input,cover,params) {
    input = Object.assign({},input,cover)
    this.input=input
    input=this.fixInput().input
    this.init(Object.assign({
        xsize:~~input.xsize,
        ysize:~~input.ysize,
        use00:input.use00,
    },params))
    .getPatternSize()
    .initmap()
    .buildMarkMap()
    .loadChoosen(eval(input.brokenBits))
    .pickMaxArea()
    .loadRemovedStart(eval(input.removedEntrances))
    .definePattern(input.showPattern)
    .pushPatterns()
    .setSplit(eval(input.part1))
    return this
}

StructDataClass.prototype.fixInput = function () {
    let input = this.input
    input.searchPattern=input.searchPattern||'01232301'
    input.brokenBits=input.brokenBits||'[]'
    input.removedEntrances=input.removedEntrances||'[]'
    input.showPattern=input.showPattern||[]
    input.part1=input.part1||'[]'
    return this
}

StructDataClass.prototype.buildInput = function (params) {
    if (!this.input) this.input={};
    let input={
        type:'prog',
        xsize:this.xsize+'',
        ysize:this.ysize+'',
        use00:this.use00,
        brokenBits:JSON.stringify(this.choosen||[]),
        part1:JSON.stringify(this.removeList||[]),
        depth:(this.input.depth||'20')+'',
        searchPattern:this.input.searchPattern||'01232301',
        errorRates:(this.input.errorRates||'[0.0016,0.0062,0.038]')+'',
        removedEntrances:JSON.stringify(this.removedStart||[]),
        balancedRange:this.input.balancedRange==null?6:this.input.balancedRange,
        search:(this.input.search||'prune')+'',
        generatingCircuit:this.input.generatingCircuit||[],
        showMark:this.input.showMark||[],
        showPattern:this.input.showPattern||[],
    }
    this.input=input
    return this
}

StructDataClass.prototype.init = function (params) {
    Object.assign(this,params)
    if (!this.input) this.buildInput();
    this.patternsDefinition={}
    return this
}

StructDataClass.prototype.getPatternSize = function (params) {
    let asize=~~((this.xsize+this.ysize)/2)-1
    let csize=~~((this.xsize-1)/2)+~~((this.ysize-1)/2)
    if (this.use00) {
        asize=~~(this.xsize/2)+~~(this.ysize/2)-1
        csize=~~((this.xsize+this.ysize-1)/2)-1
    }
    this.asize=asize
    this.csize=csize
    return this
}

/**
 * 深拷贝一个对象
 */
StructDataClass.prototype.clone = function (data) {
    if (data==null) return null;
    // array
    if (data instanceof Array) {
        let copy = [];
        for (let i in data) {
            copy[i] = this.clone(data[i]);
        }
        return copy;
    }
    // // Map
    // if (data instanceof Map) {
    //     let copy = new Map();
    //     for (let [k,v] of data) {
    //         copy.set(this.clone(k),this.clone(v));
    //     }
    //     return copy;
    // }
    // object
    if (data instanceof Object) {
        let copy = {};
        for (let i in data) {
            if (data.hasOwnProperty(i) && !(data instanceof Function))
                copy[i] = this.clone(data[i]);
        }
        return copy;
    }
    return data;
}

StructDataClass.prototype.initmap=function (params) {
    this.map=Array.from({length:this.xsize+2}).map(v=>Array.from({length:this.ysize+2}).map(v=>this.clone(this.defaultElement)))
    this.edge_dict={}
    // 移除unused
    for (let yindex = 0; yindex < this.ysize+2; yindex++) {
        for (let xindex = 0; xindex < this.xsize+2; xindex++) {
            if ((xindex+yindex)%2===~~this.use00) { //(0+0)%2 === 1 ~> false
                this.map[xindex][yindex]=this.clone(this.unusedElement)
            }
        }
    }
    // 移除边界
    for (let index = 0; index < this.xsize+2; index++) {
        this.map[index][0]=this.boundaryElement
        this.map[index][this.ysize+1]=this.clone(this.boundaryElement)
    }
    for (let index = 0; index < this.ysize+2; index++) {
        this.map[0][index]=this.boundaryElement
        this.map[this.xsize+1][index]=this.clone(this.boundaryElement)
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

StructDataClass.prototype.buildMarkMap = function (params) {
    let markOption=this.input.showMark.filter(v=>v.type!=='markNone')[0]
    if (!markOption) return this;
    if (markOption.type==='markQi') {
        this.markList=Array.from({length:this.bitCount}).map((v,i)=>i)
    }
    if (markOption.type==='orderlist') {
        this.markList=eval(markOption.order)
    }
    this.markMap={}
    this.markList.forEach((v,i)=>this.markMap[v]=i)
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
        [q1,q2]=[q2,q1]
    }
    if (this.edge_dict[q1]==null) {
        this.edge_dict[q1]={}
    }
    if (this.edge_dict[q1][q2]==null) {
        this.edge_dict[q1][q2]={q1,q2}
    }
    return this.edge_dict[q1][q2]
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
    this.n=man
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
    return Math.floor((this.n+this.input.balancedRange)/2)
}
StructDataClass.prototype._min=function (params) {
    return Math.ceil((this.n-this.input.balancedRange)/2)
}
StructDataClass.prototype._q0x=function (params) {
    return this.qi2xy(0).x+1
}
StructDataClass.prototype._q0y=function (params) {
    return this.qi2xy(0).y+1
}

/**
 * deprecated
 * c code given up
 * use StructDataClass.prototype.searchPath
 */
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
    this.constructor.prototype.CInput=text
    return this
}

/**
 * deprecated
 * c code given up
 * use StructDataClass.prototype.searchPath
 */
StructDataClass.prototype.parseCResult = function (resultStr) {
    // 2 paths found
    // shortest length & unbalance: 2,1
    // qubits: 2, 1, 1, 2, 2, 3, 1, 4,
    // start,end: 2 4 3 1
    // ===2
    // 2,1: 2, 1, 1, 2, 2, 3, 1, 4,
    // 2,1: 2, 1, 1, 2, 3, 2, 2, 3, 1, 4,
    let check={}
    let paths=[]
    let str=resultStr.split('===')[1]
    let lines=str.split('\n')
    for (let ii = 1; ii <= ~~lines[0]; ii++) {
        let a=eval('['+lines[ii].split(':')[1]+']')
        let b=a.map((v,i,a)=>{ return {x:v-1,y:a[i+1]-1}}).filter((v,i)=>i%2==0).map(v=>this.getxy(v).qi).sort()
        if (check[JSON.stringify(b)]==null) {
            check[JSON.stringify(b)]=1
            paths.push(b)
        }
    }
    this.constructor.prototype.CReturnPaths=paths
    return `${paths.length} paths found`
}

StructDataClass.prototype.searchPath=function () {
    let xsize,ysize,ndeep,edeep,max,min,q0x,q0y,prune,area,cost,start,end,cost2;
    let gg={xsize,ysize,ndeep,edeep,max,min,q0x,q0y,prune,area,cost,start,end,cost2}
    let scanInput=(gg)=>{
        gg.xsize=this.xsize+2
        gg.ysize=this.ysize+2
        gg.ndeep=this._ndeep()
        gg.edeep=this._edeep()
        gg.max=this._max()
        gg.min=this._min()
        gg.q0x=this._q0x()
        gg.q0y=this._q0y()
        gg.prune=this.input.search==='prune'
        gg.area=this._area().split(/\s+/).map(v=>~~v)
        gg.cost=this._cost().split(/\s+/).map(v=>~~v)
        gg.start=this._start().split(/\s+/).map(v=>~~v)
        gg.end=this._end().split(/\s+/).map(v=>~~v)
        gg.cost2=this._cost2().split(/\s+/).map(v=>~~v)
    }
    let output=[]
    /**
     * @typedef {Object} pathType
     * @property {Number} startx
     * @property {Number} starty
     * @property {Number} endx
     * @property {Number} endy
     * @property {Number} currentCount
     * @property {Number} stage 0 for running, 1 for failed
     * @property {Number} ndeep
     * @property {Number} unbalance
     * @property {Number[]} qubits
     */
    let Results=[]
    let _walkingArea=function (gg, pp, area2, sx, sy) {
        if (pp.stage)
            return 1;
        pp.currentCount += gg.cost2[sx * gg.ysize + sy];
        if (pp.currentCount > gg.max)
        {
            pp.stage = 1;
            return 1;
        }
        area2[sx * gg.ysize + sy] = 1;
        if (gg.cost2[sx * gg.ysize + sy])
        {
            pp.qubits.push(sx);
            pp.qubits.push(sy);
        }
        let xi = [-1, 1, 0, 0];
        let yi = [0, 0, -1, 1];
        for (let ii = 0; ii < 4; ii++)
        {
            let xx = sx + xi[ii];
            let yy = sy + yi[ii];
            if (area2[xx * gg.ysize + yy] == 0)
            {
                _walkingArea(gg, pp, area2, xx, yy);
            }
        }
        return 0;
    }
    let check=function (gg, startx, starty, endx, endy, nd)
    {
        let area2 = Array.from(gg.area);
        /** @type {pathType} */
        let pp = {};
        pp.startx = startx;
        pp.starty = starty;
        pp.endx = endx;
        pp.endy = endy;
        pp.ndeep = nd;
        pp.currentCount = 0;
        pp.stage = 0;
        pp.qubits=[];
        _walkingArea(gg, pp, area2, gg.q0x, gg.q0y);
        delete area2;
        if (pp.currentCount < gg.min)
        {
            pp.stage = 1;
        }
        if (pp.stage == 1)
        {
            delete pp;
        }
        else
        {
            pp.unbalance = (gg.max - pp.currentCount) - (pp.currentCount - gg.min);
            pp.unbalance *= pp.unbalance < 0 ? -1 : 1;
            if (gg.prune && nd < gg.ndeep)
            {
                gg.ndeep = nd;
            }
            Results.push(pp);
        }
        return 0;
    }
    let _walkingPath=function (gg, sx, sy, precost, nd, ed, startx, starty)
    {
        // bfs
        gg.area[sx * gg.ysize + sy] = 1;
        let cost = gg.cost[sx * gg.ysize + sy];
        if (precost == 1 && cost == 1)
        {
            if (++ed > gg.edeep)
            {
                gg.area[sx * gg.ysize + sy] = 0;
                return 1;
            }
        }
        else
        {
            if (++nd > gg.ndeep)
            {
                gg.area[sx * gg.ysize + sy] = 0;
                return 1;
            }
        }
        if (gg.end[sx * gg.ysize + sy])
        {
            check(gg, startx, starty, sx, sy, nd);
            gg.area[sx * gg.ysize + sy] = 0;
            return 1;
        }
        let xi = [-1, 1, 1, -1];
        let yi = [-1, 1, -1, 1];
        for (let ii = 0; ii < 4; ii++)
        {
            let xx = sx + xi[ii];
            let yy = sy + yi[ii];
            if (gg.area[xx * gg.ysize + yy] == 0)
            {
                _walkingPath(gg, xx, yy, cost, nd, ed, startx, starty);
            }
        }
        gg.area[sx * gg.ysize + sy] = 0;
        return 0;
    }
    let findPath=function (gg, sx, sy)
    {
        gg.area[sx * gg.ysize + sy] = 1;
        let cost = gg.cost[sx * gg.ysize + sy];
        let xi = [-1, 1, 1, -1];
        let yi = [-1, 1, -1, 1];
        for (let ii = 0; ii < 4; ii++)
        {
            let xx = sx + xi[ii];
            let yy = sy + yi[ii];
            if (gg.area[xx * gg.ysize + yy] == 0)
            {
                _walkingPath(gg, xx, yy, cost, 0, 0, sx, sy);
            }
        }
        gg.area[sx * gg.ysize + sy] = 0;
        return 0;
    }
    let initPath=function (gg)
    {
        for (let xx = 0; xx < gg.xsize; xx++)
        {
            for (let yy = 0; yy < gg.ysize; yy++)
            {
                if (gg.start[xx * gg.ysize + yy])
                {
                    findPath(gg, xx, yy);
                }
            }
        }
        return 0;
    }
    let printPath=function (pp, qubitsOnly)
    {
        output.push(pp.qubits)
    }
    let filtResult=function (gg)
    {
        if (Results.length == 0)
        {
            return 0;
        }
        let tlist=[];
        if (gg.prune) {
            let ndeep = 999999;
            let unbalance = 999999;
            while (Results.length)
            {
                let pp = Results.pop();
                if (pp.ndeep < ndeep || (pp.ndeep == ndeep && pp.unbalance < unbalance))
                {
                    tlist=[pp];
                    ndeep = pp.ndeep;
                    unbalance = pp.unbalance;
                }
                else if (pp.ndeep == ndeep && pp.unbalance == unbalance)
                {
                    tlist.push(pp);
                }
                else
                {
                    delete pp;
                }
            }
        } else {
            tlist = Results;
        }
        for (let ii = tlist.length - 1; ii >= 0; ii--)
        {
            printPath(tlist[ii], true);
        }
        return 0;
    }
    let convertToSplit=(output)=>{
        let check={}
        let paths=[]
        for (let ii = 0; ii < output.length; ii++) {
            let a=output[ii]
            let b=a.map((v,i,a)=>{ return {x:v-1,y:a[i+1]-1}}).filter((v,i)=>i%2==0).map(v=>this.getxy(v).qi).sort()
            if (check[JSON.stringify(b)]==null) {
                check[JSON.stringify(b)]=1
                paths.push(b)
            }
        }
        return paths
    }
    scanInput(gg);
    initPath(gg);
    filtResult(gg);
    let paths=convertToSplit(output);
    this.constructor.prototype.CReturnPaths=paths
    return `${paths.length} paths found`
}

/**
 * @returns {StructDataClass}
 */
StructDataClass.prototype.copyThis = function (params) {
    let copy=new this.constructor()
    .import(this.input)
    // Object.assign(copy,this.clone(this))
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
    if (removeList.length===0 || removeList.length===this.n) {
        this.splitEdges=[]
        this.unbalance=this.n*2
        this.n1=this.n
        this.n2=0
        return this
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
    let unbalance=Math.abs(2*area2s[0]-this.n)+Math.abs(2*area2s[1]-this.n)
    for (let ei = 0; ei < edgemap[mk].length; ei++) {
        const edge = edgemap[mk][ei];
        this.edge(edge).isSplitEdge=1
    }
    this.splitEdges=edgemap[mk]
    this.unbalance=unbalance
    this.n1=this.unbalance/4+this.n/2
    this.n2=-this.unbalance/4+this.n/2
    //
    return this
}

StructDataClass.prototype.calPatterns = function (o1,o2) {
    // 待重构为用checkBitStringPattern实现
    if (this.use00) {
        o1={x:o1.x,y:o1.y+1}
        o2={x:o2.x,y:o2.y+1}
    }
    let patterns=[]
    if (o1.x>o2.x) {
        [o1,o2]=[o2,o1]
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
    let [c1,c2]=this.use00?[{x:o1.x,y:o1.y-1},{x:o2.x,y:o2.y-1}]:[o1,o2]
    for (const key in this.patternsDefinition) {
        if (this.patternsDefinition.hasOwnProperty(key)) {
            const bitString = this.patternsDefinition[key];
            if (this.checkBitStringPattern(c1,c2,bitString)) patterns.push(key);
        }
    }
    return patterns
}

StructDataClass.prototype.definePattern = function (patternDefines) {
    patternDefines=[
        {"type":"patternDefine","pattern":"I","bitString":'0_'+Array.from({length:this.asize}).map((v,i)=>i===2?1:0).join('')},
        {"type":"patternDefine","pattern":"J","bitString":'0_'+Array.from({length:this.asize}).map((v,i)=>i===2?0:1).join('')},
        {"type":"patternDefine","pattern":"K","bitString":'1_'+Array.from({length:this.asize}).map((v,i)=>0).join('')},
        {"type":"patternDefine","pattern":"L","bitString":'1_'+Array.from({length:this.asize}).map((v,i)=>1).join('')},
    ].concat(patternDefines).filter(v=>v.type==="patternDefine")
    this.patterns=Array.from(this.patterns)
    patternDefines.forEach(p=>{
        if (this.patterns.indexOf(p.pattern)===-1) {
            this.patterns.push(p.pattern)
        }
        this.patternsDefinition[p.pattern]=p.bitString
    })
    return this
}

StructDataClass.prototype.pushPatterns = function (params) {
    for (let ei = 0; ei < this.maxAreaEdges.length; ei++) {
        const edge = this.edge(this.maxAreaEdges[ei]);
        let patterns = this.calPatterns(this.qi2xy(edge.q1),this.qi2xy(edge.q2))
        for (let pi = 0; pi < patterns.length; pi++) {
            const pattern = patterns[pi];
            if (edge.isPattern==null) edge.isPattern={};
            edge.isPattern[pattern]=1
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
    if (this.use00) {
        o1={x:o1.x,y:o1.y+1}
        o2={x:o2.x,y:o2.y+1}
    }
    if (o1.x>o2.x) {
        [o1,o2]=[o2,o1]
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
        if (this.use00) index = (o1.x+o1.y-3)/2;
        return ac^pattern[2+index]
    } else { 
        // 左上右下 C类
        let index=(o1.x-o1.y+this.ysize-(this.ysize%2===0?3:2))/2
        if (this.use00) index=(o1.x-o1.y+this.ysize-(this.ysize%2===0?1:2))/2
        return ac^pattern[2+index]
    }
}

StructDataClass.prototype.getBitStringCircles = function (params) {
    let asize=this.asize
    let csize=this.csize
    let circles=[]
    for (let ai = 0; ai < 2**asize; ai++) {
        let pa=(ai+2**asize).toString(2).slice(1)
        let pb=(-1-ai+2*2**asize).toString(2).slice(1)
        for (let ci = 0; ci < 2**csize; ci++) {
            let pc=(ci+2**csize).toString(2).slice(1)
            let pd=(-1-ci+2*2**csize).toString(2).slice(1)
            // ['ABCDCDAB','ABCD'],
            // ['CDABABCD','CDAB'],
            circles.push(
                ['0_'+pa+'_1_'+pc,['0_'+pa,'0_'+pb,'1_'+pc,'1_'+pd]],
                ['1_'+pc+'_0_'+pa,['1_'+pc,'1_'+pd,'0_'+pa,'0_'+pb]],
            )
        }
    }
    this.constructor.prototype.bitStringCircles=circles
    return this
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
 * @param {(edge)=>Boolean} pf1 
 * @param {(edge)=>Boolean} pf2 
 */
StructDataClass.prototype.calWedge = function (pf1,pf2,used) {
    let count=0
    let edges=this.splitEdges
    let list=this.potentialWedgeList
    used=used==null?{}:used
    for (let index = 0; index < list.length; index++) {
        const li = list[index];
        if (used[li[0]] || used[li[1]]) continue;
        let e0=this.edge(edges[li[0]])
        let e1=this.edge(edges[li[1]])
        if (pf1(e0)&&pf2(e1)) {
            used[li[0]]=1
            used[li[1]]=2
            count++
        }
        if (pf1(e1)&&pf2(e0)) {
            used[li[0]]=2
            used[li[1]]=1
            count++
        }
    }
    return {count,used}
}

StructDataClass.prototype.getPotentialDCDList = function (params) {
    let list = []
    let edges=this.splitEdges
    let _f = this.getAdjacent
    for (let ii = 0; ii < edges.length; ii++) {
        const ei = this.edge(edges[ii])
        let [o1,o2]=[ei.q1,ei.q2].map(v=>this.qi2xy(v))
        let [s1,s2]=[[o1,o2],[o2,o1]].map(v=>{
            let [u1,u2]=v
            return this.getxy({x:2*u1.x-u2.x,y:2*u1.y-u2.y}).area2||0
        })
        if(s1*s2===0)list.push(ii)
    }
    // let pts=_f(this.qi2xy(qindex))
    this.potentialDCDList=list
    return this
}

/**
 * @param {(edge)=>Boolean} pf
 */
StructDataClass.prototype.calDCD = function (pf,used0,used2) {
    let count=0
    let edges=this.splitEdges
    let list=this.potentialDCDList
    let used={}
    for (let index = 0; index < list.length; index++) {
        const li = list[index];
        if (used0[li] || used2[li]) continue;
        let ei=this.edge(edges[li])
        if (pf(ei)) {
            used[li]=true
            count++
        }
    }
    return {count,used}
}

/**
 * @param {(edge,pattern)=>Boolean} pf
 */
StructDataClass.prototype._calCutLengthWithWedge = function (pf,patterns) {
    this.getPotentialWedgeList()
    this.getPotentialDCDList()
    let wedge={}
    for (let pi = 0; pi < patterns.length; pi++) {
        const pattern = patterns[pi];
        let [pa,pb,pc,pd]=Array.from(pattern[1])
        let ps={pa,pb,pc,pd}
        let cutLengthOfPattern={pa:0,pb:0,pc:0,pd:0}
        let edges=this.splitEdges
        for (let ii = 0; ii < edges.length; ii++) {
            const ei = this.edge(edges[ii])
            for (const key in cutLengthOfPattern) {
                if (pf(ei,ps[key])) {
                    ei.p=key
                    cutLengthOfPattern[key]++
                    break
                }
            }
        }
        let depth=~~this.input.depth
        let cwedge=0
        let DCD=0
        let cut=0
        let start=0
        let end=0
        let tplpattern=this.input.searchPattern
        let i2pmap=['pa','pb','pc','pd']
        let i2p=index=>i2pmap[tplpattern[index%tplpattern.length]]
        let toCheckWedge=(p0,p1)=>{
            if (['pa','pb'].indexOf(p0)!==-1 && ['pc','pd'].indexOf(p1)!==-1) return true;
            if (['pa','pb'].indexOf(p1)!==-1 && ['pc','pd'].indexOf(p0)!==-1) return true;
            return false
        }
        let toCheckDCD=(p0,p1,p2)=>{
            if (p0!==p2) return false;
            if ({pa:'pb',pb:'pa',pc:'pd',pd:'pc'}[p0]===p1) {
                return true;
            }
            return false
        }
        // 
        let useds={0:{}}
        for (let index = 0; index < depth; index++) {
            cut+=cutLengthOfPattern[i2p(index)]
            if (index==0) continue;
            let p0=i2p(index),p1=i2p(index-1)
            useds[index]={}
            if (toCheckWedge(p0,p1)) {
                let {count,used}=this.calWedge(e=>e.p==p1,e=>e.p==p0,Object.assign({},useds[index-1]))
                cwedge+=count
                for (const key in used) {
                    const element = used[key];
                    if (element===1) {
                        useds[index-1][key]=true
                    } else if (element===2) {
                        useds[index][key]=true
                    }
                }
            }
            if (index==1) continue;
            let p2=i2p(index-2)
            if (toCheckDCD(p0,p1,p2)) {
                let {count,used}=this.calDCD(e=>e.p==p0,useds[index],useds[index-2])
                DCD+=count
                Object.assign(useds[index],used)
                Object.assign(useds[index-2],used)
            }
        }
        for (let ii = 0; ii < edges.length; ii++) {
            const ei = this.edge(edges[ii])
            if (ei.p==i2p(0) && !useds[0][ii]) {
                start++
            }
            if (ei.p==i2p(depth-1) && !useds[depth-1][ii]) {
                end++
            }
        }
        wedge[pattern[0]]={
            length:cut-cwedge-DCD-start/2-end/2,
            cut:cut,
            wedge:cwedge,
            DCD:DCD,
            start:start,
            end:end,
        }
    }
    this.wedge=wedge
    return this
}

StructDataClass.prototype.calCutLengthWithWedge = function (params) {
    let pf=(edge,pattern)=>edge.isPattern[pattern]
    let patterns=this.circles
    this._calCutLengthWithWedge(pf,patterns)
    return this
}

StructDataClass.prototype.calCutLengthWithWedge_bitString = function (params) {
    let pf=(edge,pattern)=>this.checkBitStringPattern(this.qi2xy(edge.q1),this.qi2xy(edge.q2),pattern)
    let patterns=this.bitStringCircles
    this._calCutLengthWithWedge(pf,patterns)
    return this
}

StructDataClass.prototype._processCResult = function (circles,func,showProgress) {
    let list=[]
    let result=this.CReturnPaths
    // let circles = this.circles 
    // let circles = this.bitStringCircles 
    // let func= this.calCutLengthWithWedge
    // let func = this.calCutLengthWithWedge_bitString
    /** @type {StructDataClass} */
    let newins=new this.constructor().import(this.input,{part1:'[]'})
    for (let index = 0; index < result.length; index++) {
        const removeList = result[index];
        list.push(newins.copyThis().setSplit(removeList))
    }
    let patternMin={};
    list.forEach((v,i,a)=>{
        if(showProgress)console.log(`${i+1} of ${a.length}`);
        /** @type {StructDataClass} */
        let csd=v
        func.call(csd)
        circles.forEach(ps=>{
            let pattern = ps[0]
            let search_min=csd.wedge[pattern].length+Math.log2(2**(csd.n1)+2**(csd.n2))/2-Math.log2(2**Math.ceil(csd.n/2)+2**Math.floor(csd.n/2))/2
            let search_max=search_min
            if (patternMin[pattern]==null || search_min<patternMin[pattern].search_min) {
                patternMin[pattern]={
                    split:csd.removeList,
                    lengthInfo:csd.wedge[pattern],
                    search_min:search_min, // for min
                    search_max:search_max, // for max
                    unbalance:csd.unbalance,
                    n1:csd.n1,
                    n2:csd.n2,
                    pattern:ps,
                }
            }
        })
        delete a[i]
    })

    let pi=circles.map(ps=>patternMin[ps[0]].search_max).reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
    let pattern=circles[pi][0]
    newins.setSplit(patternMin[pattern].split)
    newins.patternMaxMin=patternMin[pattern]
    let output={
        maxofmin:patternMin[pattern],
        min:patternMin,
        instance:newins
    }
    return output
}

StructDataClass.prototype.processCResult = function (params) {
    let circles = this.circles 
    let func= this.calCutLengthWithWedge
    let showProgress=false
    return this._processCResult(circles,func,showProgress)
}

StructDataClass.prototype.processCResult_bitString = function (params) {
    let circles = this.bitStringCircles 
    let func= this.calCutLengthWithWedge_bitString
    let showProgress=true
    return this._processCResult(circles,func,showProgress)
}

StructDataClass.prototype.calExpectation = function () {
    let cal=eval(sd.input.errorRates)
    let e1=cal[0],e2=cal[1],er=cal[2],d=~~sd.input.depth;
    let p=Object.assign({
        n1:this.n1,
        n2:this.n2,
        n:this.n,
        c:this.patternMaxMin.lengthInfo.length,
        b:this.maxAreaEdgeCount
    },{e1,e2,er,d})
    let f=((1-p.e1)**p.n * (1-p.e2)**(p.b/4))**p.d * (1-p.er)**p.n
    let r2=9/f/f
    let r3=r2/(0.6*1000000/200)
    let cu=(2**p.n1+2**p.n2)*4**(p.c)*f
    let cg=(2**26+2**27)*4**31*0.00224
    let r6=cu/cg
    this.expectation=[f,r2,r3,cu,cg,r6]
    this.expectation_describe=['f','count','time','SFA_u','SFA_g','SFA_u/SFA_g']
    return this
}

/**
 * 
 * @param {String|String[]} circle 
 * @param {Number} depth 
 */
StructDataClass.prototype.generateCircuitProto = function (circle,depth) {
    rand.reset()
    circle=Array.from(circle)
    let proto={circle,depth,layer:[],cut:0}
    let pushSingleLayer=()=>{
        let gates={}
        let layerno=proto.layer.length
        for (let qindex = 0; qindex < this.bitCount; qindex++) {
            let qubit=this.qubit(qindex)
            if (!qubit.area2) continue;
            if (layerno===0) {
                gates[qindex]={qi:qindex,type:rand.randn(3)}
            } else {
                let rt=rand.randn(2)
                rt+= rt>=proto.layer[layerno-2][qindex].type
                gates[qindex]={qi:qindex,type:rt}
            }
        }
        proto.layer.push(gates)
    }
    let pushDoubleLayer=()=>{
        let gates={}
        let layerno=proto.layer.length
        let pf=(edge,pattern)=>edge.isPattern[pattern]
        for (let eindex = 0; eindex < this.maxAreaEdges.length; eindex++) {
            const edge = this.edge(this.maxAreaEdges[eindex]);
            let pattern = circle[((layerno-1)/2)%circle.length]
            if (!pf(edge,pattern)) continue;
            gates[eindex]={q1:edge.q1,q2:edge.q2,cut:edge.isSplitEdge?proto.cut++:null}
        }
        proto.layer.push(gates)
    }
    for (let index = 0; index < depth; index++) {
        pushSingleLayer()
        pushDoubleLayer()
    }
    pushSingleLayer()
    return proto
}

/**
 * 
 * @param {String} elidedMod 'number' or 'layer', default 'number'
 * @param {{String:Number[]}} gateArgs 
 */
StructDataClass.prototype.renderCircuitProto = function (proto,saveBitList,elided,elidedMod,gateArgs) {
    elidedMod=elidedMod==='layer'?'layer':'number'
    throw '按照层进行elided尚未支持'
    let text=[saveBitList.length]
    let existCheck={}
    saveBitList.forEach((v,i)=>existCheck[v]=i)
    let edgeargs=()=>[]
    if (gateArgs==null) {
        // theta/pi phi/pi deltaplus deltaminus deltaminusoff
        edgeargs=(q1,q2)=>[1/2,1/6,0,0,0]
    } else {
        throw 'todo 待与实验侧约定格式'
    }
    // pickup cut for elided
    let savedCuts=[]
    let savedCut=proto.cut
    for (let layerno = 0; elided!=null && layerno < proto.layer.length; layerno++) {
        const layer = proto.layer[layerno];
        if (layerno%2==0) {
        } else {
            for (const gi in layer) {
                if (layer.hasOwnProperty(gi)) {
                    const gate = layer[gi];
                    if (existCheck[gate.q1]==null || existCheck[gate.q2]==null) continue;
                    if (gate.cut!=null)savedCuts.push(gate.cut)
                }
            }
        }
    }
    if (elided!=null && savedCuts.length>elided) {
        // elided 0 ~ delete length ~ savedCuts[length-1]
        // elided 1 ~ delete length-1 ~ savedCuts[length-1 -1]
        // elided length-1 ~ delete 1 ~ savedCuts[0]
        // elided length ~ delete 0 ~ proto.cut
        savedCut=savedCuts[savedCuts.length-1-elided]
    }
    // generate
    for (let layerno = 0; layerno < proto.layer.length; layerno++) {
        const layer = proto.layer[layerno];
        if (layerno%2==0) {
            for (const gi in layer) {
                if (layer.hasOwnProperty(gi)) {
                    const gate = layer[gi];
                    if (existCheck[gate.qi]==null) continue;
                    let gatestr=['x_1_2','y_1_2','hz_1_2'][gate.type]
                    text.push(`${layerno} ${gatestr} ${gate.qi}`)
                }
            }
        } else {
            for (const gi in layer) {
                if (layer.hasOwnProperty(gi)) {
                    const gate = layer[gi];
                    if (existCheck[gate.q1]==null || existCheck[gate.q2]==null) continue;
                    if (elided!=null && gate.cut!=null && gate.cut<=savedCut) continue;
                    text.push(`${layerno} fsimplus(${edgeargs(gate.q1,gate.q2).join(', ')}) ${gate.q1} ${gate.q2}`)
                }
            }
        }
    }
    return text.join('\n')
}

StructDataClass.prototype.renderAuxiliaryFiles = function (orderList,qubitNumber,pepsPath,pepsCut) {
    let qindexs=orderList.slice(0,qubitNumber)
    let Aindexes=[]
    let Bindexes=[]
    for (let qi = 0; qi < this.bitCount; qi++) {
        const qubit = this.qubit(qi);
        if (qubit.area2===2 && qindexs.indexOf(qi)!==-1) {
            Aindexes.push(qi)
        }
        if (qubit.area2===1 && qindexs.indexOf(qi)!==-1) {
            Bindexes.push(qi)
        }
    }
    let cutText=`${qubitNumber}\n\n${Aindexes.join('\n')}\n\n${Bindexes.join('\n')}\n\n${pepsPath.join('\n')}\n\n${pepsCut.map((v,i)=>v+(i%2?'\n':' ')).join('')}`
    let mapText=`${orderList.map((v,i)=>v+' '+(i+1)).join('\n')}\n`
    return {cutText,mapText}
}

/**
 * it is a sync process
 * @param {*} outputFunc sync callback
 */
StructDataClass.prototype.generateCircuit = function (outputFunc) {
    let circuitInput=this.input.generatingCircuit.filter(v=>v.type!=='generatingCircuitNone')[0]
    if (circuitInput) {
        let depth=~~this.input.depth
        let circle=circuitInput.pattern
        let orderList=eval(circuitInput.order[0].order)
        let qubitNumber=circuitInput.qubitNumber
        if (qubitNumber>orderList.length) {
            throw 'qubitNumber bigger than the length of bit indexes'
        }
        let pepsPath=eval(circuitInput.pepsPath[0].order)
        let pepsCut=eval(circuitInput.pepsCut)
        let simulationFilename=circuitInput.simulationFilename
        let mapFilename=circuitInput.mapFilename
        let cutFilename=circuitInput.cutFilename
        let elided=circuitInput.elided===''?null:~~circuitInput.elided
        let circuitProto = this.generateCircuitProto(circle,depth)
        let circuit = this.renderCircuitProto(circuitProto,orderList.slice(0,qubitNumber),elided)
        let {cutText,mapText} = this.renderAuxiliaryFiles(orderList,qubitNumber,pepsPath,pepsCut)
        if (outputFunc) {
            outputFunc({depth,circle,orderList,qubitNumber,pepsPath,pepsCut,simulationFilename,mapFilename,cutFilename,elided,circuitProto,circuit,cutText,mapText})
        }
    }
    return this
}

/**
 * @class
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
        if (edge.isPattern && edge.isPattern[pattern]) {
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
        if (this.data.markMap && this.data.markMap[qindex]!=null) {
            QMarks.push(this.mark(this.data.qi2xy(qindex),this.markOffsetQ,qindex,this.data.markMap[qindex],this.markFontSizeQ))
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

