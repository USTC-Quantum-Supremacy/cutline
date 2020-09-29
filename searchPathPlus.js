

/* 
允许cut长度最多至22
unbalance 20
定义连通性为：1、直接相连，2、边界点自动连接
黑或白是一个整体

*/

/**
 * 前提:
 * 1.任意时刻边数不超过edgeMax(22)
 * 2.其中一边始终是联通整体, 联通性定义:直接相连或均为边界点
 * 
 * 伪代码:
 * 
 * edgeMax 最大的边数
 * Queue 队列,先入先出
 * Map 存是否已经使用过
 * 把所有({边界点})加入队列
 * while队列非空
 * >取队首 (点集)
 * >如果map(点集)非空
 * >>continue
 * >map(点集)设为true
 * >如果:unbalance满足
 * >>追加结果(点集)
 * >否则:对于每个满足前提的扩张新点:
 * >>({点集}并{新点})入队
 * 
 * @param {Number} edgeMax 
 * @param {Number} unbalance 
 */
let searchPathPlus=function (edgeMax,unbalance) {
    /** @type {import('./main.js').StructDataClass} */
    let sd=this
    let n,qubit,qubits,edge,bitCount,scount,ecount;
    let gs={n,qubit,qubits,edge,bitCount,scount,ecount};
    let buildGraphStructure=(gs)=>{
        unbalance=unbalance
        let orderList=eval(sd.input.generatingCircuit[0].order[0].order)
        let n=sd.input.generatingCircuit[0].qubitNumber
        let bitCount=sd.bitCount

        let edge={}
        sd.maxAreaEdges.forEach(v=>{
            let [a,b]=v
            if(edge[a]==null)edge[a]={};
            if(edge[a][b]==null)edge[a][b]=1;
        })
        
        let qubits=orderList.slice(0,n)
        n=qubits.length
        ecount=~~((n+unbalance)/2)
        scount=n-ecount
        ecount=~~(n/2)
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
                if (tq.save) {
                    q.link.push(tq.qi)
                }
            })
            qubit[qi]=q
        }
        for (let qi of qubits) {
            let q=qubit[qi]
            if (q.link.length!==4) {
                qubits.forEach(qj=>{
                    if (qi===qj) {
                        return
                    }
                    let tq=qubit[qj]
                    if (tq.save && qubit[tq.qi].link.length!==4) {
                        q.weakLink.push(tq.qi)
                    }
                })
            }
        }
        Object.assign(gs,{n,qubit,qubits,edge,bitCount,scount,ecount})
    }
    let mainBFS=(gs)=>{
        const debug=1
        const n=gs.n
        const bitCount=gs.bitCount
        const scount=gs.scount
        const ecount=gs.ecount
        /** 存是否已经使用过 */
        let map1=Object.create(null)
        /** 
         * 优先队列,次数小的先出队 [(点集,顺序,次数,联通性)...] 
         * 联通性-1为只有一个区域, >=0时即为前提2中单独的区域的qi
         */
        const MAX_COUNT = 2000000
        let queue={
            data:new Array(MAX_COUNT),
            head:0,
            current:0,
            push:function(v){this.data[this.current++%MAX_COUNT]=v;},
            shift:function(){return this.data[this.head++%MAX_COUNT]},
            size:function(){return this.current-this.head},
        }
        const MARK = 'mark'
        queue.push(MARK)
        for (const v of initalBoundaryPoints(gs)) {
            let area=Array.from({length:bitCount}).map(v=>0)
            area[v]=1
            queue.push(area)
        }
        let count=0
        let node=0
        if(debug)console.log('count node size');
        if(debug)console.log('-----------------');
        let result=[]
        let currentBitCount=0
        while (queue.size()) {
            if (debug && ++count%10000==0) {
                console.log(count,node,queue.size())
            }
            let area=queue.shift()
            if (area===MARK) {
                currentBitCount++
                queue.push(MARK)
                map1=Object.create(null)
                if(debug)console.log('currentBitCount', currentBitCount);
                continue;
            }
            let key=area.join('')
            if (map1[key]===true) continue;
            map1[key]=true
            node++
            if (currentBitCount>=scount && currentBitCount<=ecount) {
                result.push(area)
            }
            if (currentBitCount>ecount) {
                break;
            } else {
                for(const v of newPoints(gs,area)){
                    let newArea=Array.from(area)
                    newArea[v]=1
                    queue.push(newArea)
                }
            }
        }
        if(debug)console.log(count,node,queue.size());
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
     * @returns {Number[][]} [(pt)...]
     */
    let newPoints = (gs,area_)=>{
        edgeMax=edgeMax
        let area=Array.from(area_)
        let edges=0
        let pts=[]
        for (const qi of gs.qubits) {
            if (area[qi]!==1) continue;
            for (const qj of gs.qubit[qi].link) {
                if (area[qj]!==1) edges++
                if (area[qj]) continue;
                pts.push([qj])
                area[qj]=2
            }
            for (const qj of gs.qubit[qi].weakLink) {
                if (area[qj]) continue;
                pts.push([qj])
                area[qj]=2
            }
        }
        for (const ptarr of pts) {
            const qi=ptarr[0]
            let pedges=edges
            let mcount=0
            for (const qj of gs.qubit[qi].link) {
                if (area[qj]!==1) pedges++
                else mcount++;
            }
            let ncount=pedges-mcount
            if (ncount>edgeMax) {
                ptarr.push(-1)
            } else {
                ptarr.push(0)
            }
        }
        return pts.filter(v=>v[1]>=0).map(v=>v.slice(0,1))
    }
    buildGraphStructure(gs)
    let result = mainBFS(gs)
    return result
}

if (typeof exports === "undefined") exports = {};
exports.searchPathPlus=searchPathPlus



if (typeof require !== 'undefined' && require.main === module) {

    const {StructDataClass} = require('./main.js')
    const fs = require('fs');

    let input=JSON.parse(fs.readFileSync('in/generateCircuit.json',{encoding:'utf-8'}))[0]

    let sd=new StructDataClass();

    console.log(JSON.stringify(input,null,4))

    input.generatingCircuit[0].pepsCut='[]'
    sd.import(input)

    let result = searchPathPlus.apply(sd,[13,10])
    console.log(result.length)

}

