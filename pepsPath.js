// node --max-old-space-size=4096  pepsPath.js
const cutlineMain = require('./main.js')
const StructDataClass = cutlineMain.StructDataClass

function PriorityQueue(){
    this.length = 0;
    this._pq = Array(1);
}
PriorityQueue.prototype.init = function(/* Function(element1,element2){return element1.a-element2.a} */compare ,/* int */ num){
    var _num = ~~num;
    _num = _num<512?512:_num;
    this._pq = new Array(_num);
    if(compare instanceof Function){
        this._less = function(i, j){
            return compare(this._pq[i], this._pq[j])<0;
        }
    }
    return this;
}

PriorityQueue.prototype.offer = function(v){
    this._pq[++this.length] = v;
    this._swim(this.length);
}
PriorityQueue.prototype.poll = function(){
    var max = this._pq[1];
    this._exch(1, this.length--);
    this._pq[this.length+1] = undefined;
    this._sink(1);
    return max;
}
PriorityQueue.prototype.top = function(){
    return this._pq[1];
}

//由下至上的堆有序化(上浮)的实现
PriorityQueue.prototype._swim = function(k){
    while((k > 1) && this._less(~~(k/2), k)){
        this._exch(~~(k/2), k);
        k = ~~(k/2);
    }
}

//由上至下的堆有序化(下沉)的实现
PriorityQueue.prototype._sink = function(k){
    while(2*k <= this.length){
        var j = 2*k;
        if((j < this.length) && this._less(j, j+1)){
            j++;
        }
        if(!this._less(k, j)){
            break;
        }
        this._exch(k, j);
        k = j;
    }
}

//堆实现的比较和交换方法
PriorityQueue.prototype._less = function(i, j){
    return this._pq[i] < this._pq[j];
}
PriorityQueue.prototype._exch = function(i, j){
    var temp = this._pq[i];
    this._pq[i] = this._pq[j];
    this._pq[j] = temp;
}

const fs = require('fs');

let input=JSON.parse(fs.readFileSync('in/generateCircuit.json',{encoding:'utf-8'}))
let edgeDimension=JSON.parse(fs.readFileSync('../callMeteor/output/s2.json',{encoding:'utf-8'}))

let sd=new StructDataClass();

console.log(JSON.stringify(input,null,4))

sd.import(input)


debugorder=(order)=>'['+order.join(',')+']'
debugarea=(area)=>debugorder(area.map((v,i)=>[v,i]).filter(v=>v[0]===1).map(v=>v[1]))

/**
 * 前提:
 * 1.最优路径的任意时刻边数不超过edgeMax(此图为11)
 * 2.最优路径的任意时刻都是联通整体,最多再有一个几乎联通的在边界的比特并且下一步就能联通
 * 
 * 伪代码:
 * 
 * edgeMax 最大的边数
 * Queue 优先队列,次数小的先出队
 * Map 存是否已经使用过
 * 把所有({边界点},[边界点],0,-1)加入队列
 * while队列非空
 * >取队首 (点集,顺序,次数,联通性)
 * >如果map(点集)非空
 * >>continue
 * >map(点集)设为true
 * >如果:全满
 * >>得到结果(顺序,次数)
 * >否则:对于每个满足前提的扩张新点:
 * >>({点集}并{新点},顺序+[新点],次数+扩新点的计算次数,新联通性)入队
 * 
 * 问题规模为 edgeMax*点集数
 * 正常时为66*2^66
 * 由于前提的存在使得edgeMax为11,点集数为10万左右
 * @param {Number[][]} edgeDimension [[mapQ1,mapQ2,dimension]...]
 * @param {Number} edgeMax 
 */
let searchPepsOrder=function (edgeDimension,edgeMax) {
    /** @type {import('./main.js').StructDataClass} */
    let sd=this
    let n,qubit,qubits,edge,bitCount;
    let gs={n,qubit,qubits,edge,bitCount};
    let buildGraphStructure=(gs)=>{
        edgeDimension=edgeDimension
        let orderList=eval(sd.input.generatingCircuit[0].order[0].order)
        let n=sd.input.generatingCircuit[0].qubitNumber
        let cutInput=eval(sd.input.generatingCircuit[0].pepsCut)
        let bitCount=sd.bitCount

        let cut_obj={}
        cutInput.map((v,i,a)=>[v,a[i+1]]).filter((v,i)=>i%2===0).forEach(v=>{
            let a=v[0],b=v[1];
            if (a>b) {
                [a,b]=[b,a]
            }
            if(cut_obj[a]==null)cut_obj[a]={};
            cut_obj[a][b]=true
        })
        let cut=(a,b)=>{
            if (a>b) {
                [a,b]=[b,a]
            }
            if(cut_obj[a]==null)return false
            return cut_obj[a][b]===true
        }

        let edge={}
        edgeDimension.forEach(v => {
            let a=orderList[v[0]],b=orderList[v[1]];
            if (a>b) {
                [a,b]=[b,a]
            }
            if(edge[a]==null)edge[a]={};
            edge[a][b]=v[2]
        });
        
        let qubits=orderList.slice(0,n)
        n=qubits.length
        let broken=Array.from({length:sd.bitCount}).map((v,i)=>i).filter(v=>qubits.indexOf(v)===-1)
        /** @type {import('./main.js').StructDataClass} */
        let tsd=new sd.constructor().import(sd.input,{brokenBits:JSON.stringify(broken),part1:'[]'})
        let qubit={}
        for (let qi of qubits) {
            let o=tsd.qi2xy(qi)
            let q={
                qi,
                link:[],
                weakLink:[],
            }
            let _f1=(o)=>[
                {x:o.x-1,y:o.y-1},                {x:o.x-1,y:o.y+1},
                               
                {x:o.x+1,y:o.y-1},                {x:o.x+1,y:o.y+1},
            ]
            _f1(o).forEach(v=>{
                let tq=tsd.getxy(v)
                if (tq.save && !cut(qi,tq.qi)) {
                    q.link.push(tq.qi)
                }
            })
            qubit[qi]=q
        }
        for (let qi of qubits) {
            let o=tsd.qi2xy(qi)
            let q=qubit[qi]
            let _f2=(o)=>[
                                  {x:o.x-2,y:o.y}, 
                {x:o.x-0,y:o.y-2},                {x:o.x-0,y:o.y+2},
                                  {x:o.x+2,y:o.y}
            ]
            if (q.link.length!==4) {
                _f2(o).forEach(v=>{
                    if (v.x+1<0||v.x+1>tsd.xsize+1||v.y+1<0||v.y+1>tsd.ysize+1) {
                        return
                    }
                    let tq=tsd.getxy(v)
                    if (tq.save && qubit[tq.qi].link.length!==4) {
                        q.weakLink.push(tq.qi)
                    }
                })
            }
        }
        Object.assign(gs,{n,qubit,qubits,edge,bitCount})
    }
    let mainBFS=(gs)=>{
        let n=gs.n
        let bitCount=gs.bitCount
        /** 存是否已经使用过 */
        let map1=Object.create(null)
        /** 
         * 优先队列,次数小的先出队 [(点集,顺序,次数,联通性)...] 
         * 联通性-1为只有一个区域, >=0时即为前提2中单独的区域的qi
         */
        let queue={
            data:new PriorityQueue().init((a,b)=>b[2]-a[2],2000000),
            push:function(v){this.data.offer(v)},
            shift:function(){return this.data.poll()},
            size:function(){return this.data.length},
        }
        for (const v of initalBoundaryPoints(gs)) {
            let area=Array.from({length:bitCount}).map(v=>0)
            area[v]=1
            queue.push([area,[v],0,-1])
        }
        let count=0
        let ecount=0
        console.log('count ecount size')
        console.log('-----------------')
        let result={times:null,order:[]}
        while (queue.size()) {
            if (++count%10000==0) {
                console.log(count,ecount,queue.size())
            }
            let [area,order,times,connecting]=queue.shift()
            let key=area.join('')
            if (map1[key]===true) continue;
            map1[key]=true
            ecount++
            if (order.length===n) {
                result = {times,order}
                break;
            } else {
                for(const [v,t,c] of newPoints(gs,area,connecting)){
                    let newArea=Array.from(area)
                    newArea[v]=1
                    queue.push([newArea,order.concat([v]),times+t,c])
                }
            }
        }
        console.log(count,ecount,queue.size())
        return result
    }
    /**
     * @returns {Number[]} [pt...]
     */
    let initalBoundaryPoints = (gs)=>{
        let pts = gs.qubits.filter(qi=>gs.qubit[qi].link.length!==4)
        return pts
    }
    /**
     * @param {Number[]} area_
     * @param {Number} connecting
     * @returns {Number[][]} [(pt,times,connecting)...]
     */
    let newPoints = (gs,area_,connecting)=>{
        edgeMax=edgeMax
        area=Array.from(area_)
        let edges=[1]
        let pts=[]
        for (const qi of gs.qubits) {
            if (qi===connecting) continue;
            if (area[qi]!==1) continue;
            for (const qj of gs.qubit[qi].link) {
                if (area[qj]!==1) edges.push(qi<qj?gs.edge[qi][qj]:gs.edge[qj][qi])
                if (area[qj]) continue;
                pts.push([qj])
                area[qj]=2
            }
            if (connecting>-1) continue;
            for (const qj of gs.qubit[qi].weakLink) {
                if (area[qj]) continue;
                pts.push([qj])
                area[qj]=2
            }
        }
        let times=edges.reduce((p,c)=>p*c)
        let count=edges.length-1
        for (const ptarr of pts) {
            const qi=ptarr[0]
            let pedges=[times]
            let mcount=0
            let c=connecting
            for (const qj of gs.qubit[qi].link) {
                if (area[qj]!==1) pedges.push(qi<qj?gs.edge[qi][qj]:gs.edge[qj][qi])
                else mcount++;
                if (qj===c) c=-1;
            }
            if (mcount===0 && connecting==-1) c=qi;
            let ncount=pedges.length-1+count-mcount
            if (ncount>edgeMax) {
                ptarr.push(-1,-1)
            } else {
                ptarr.push(pedges.reduce((p,c)=>p*c),c)
            }
        }
        return pts.filter(v=>v[1]>=0)
    }
    buildGraphStructure(gs)
    let result = mainBFS(gs)
    return result
}
let result = searchPepsOrder.apply(sd,[edgeDimension,7])
console.log(JSON.stringify(result))