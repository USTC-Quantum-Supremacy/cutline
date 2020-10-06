

/* 
允许cut长度最多至22
unbalance 20
定义连通性为：1、直接相连
较小的一方从边界长成, 初始撒4个点

*/

/**
 * 前提:
 * 1.任意时刻边数不超过edgeMax(22)
 * 2.较小的一方每个局部是联通整体, 且都连着边界, 至多4个局部, 联通性定义:直接相连
 * 
 * 伪代码:
 * 
 * edgeMax 最大的边数
 * Queue 队列,先入先出
 * Map 存是否已经使用过
 * 把所有({4个边界点})加入队列
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
    const START_PART=4
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
        // for (let qi of qubits) {
        //     let q=qubit[qi]
        //     if (q.link.length!==4) {
        //         qubits.forEach(qj=>{
        //             if (qi===qj) {
        //                 return
        //             }
        //             let tq=qubit[qj]
        //             if (tq.save && qubit[tq.qi].link.length!==4) {
        //                 q.weakLink.push(tq.qi)
        //             }
        //         })
        //     }
        // }
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
         * 队列,先入先出
         */
        const MAX_COUNT = 5000000
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
        for (const pts of initalBoundaryPoints(gs)) {
            let area=Array.from({length:bitCount}).map(v=>0)
            pts.forEach(v=>area[v]=1)
            queue.push(area)
        }
        let count=0
        let node=0
        if(debug)console.log('count node size');
        if(debug)console.log('-----------------');
        let result=[]
        let currentBitCount=START_PART-1
        while (queue.size()) {
            if (debug && ++count%10000==0) {
                console.log(count,node,queue.size())
                if (queue.size()>MAX_COUNT-20000) {
                    throw 'change size'
                }
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
        let bpts = gs.qubits.filter(qi=>gs.qubit[qi].link.length!==4)
        let indexArr=Array.from({length:1+START_PART}).map(v=>-1)
        let ptsArr=[]
        let f=(indexPos)=>{
            if (indexPos<indexArr.length) {
                for (let index = indexArr[indexPos-1]+1; index < bpts.length; index++) {
                    indexArr[indexPos]=index
                    f(indexPos+1)
                }
            } else {
                ptsArr.push(indexArr.slice(1).map(v=>bpts[v]))
            }
        }
        f(1)
        return ptsArr
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

    let result = searchPathPlus.apply(sd,[13,20])
    console.log(result.length)

}

/* 
node --max-old-space-size=4096 ./searchPathPlus
*/

/* 
1.任意时刻边数不超过edgeMax
2.其中一边始终是联通整体, 联通性定义:直接相连或均为边界点
unbalanced 20
12 47789
13 165568
14 659195
15 ---
*/

/* 
4起点
12 86256
13 384998
14 1814642
*/

/*
3起点
12 86228
13 384646
14 1720918
*/

/*
2起点
12 71568
13 351238
14 1459677
15 5346631
16 : htop显示14G

node --max-old-space-size=300960 ./searchPathPlus

5280000 1438162 5880709
5290000 1440601 5887568

<--- Last few GCs --->

[33019:0x3a29b70]   138999 ms: Scavenge 9209.9 (10839.1) -> 9198.0 (10842.6) MB, 21.1 / 0.0 ms  (average mu = 0.914, current mu = 0.897) allocation failure 
[33019:0x3a29b70]   139049 ms: Scavenge 9211.8 (10842.6) -> 9199.7 (10846.1) MB, 21.7 / 0.0 ms  (average mu = 0.914, current mu = 0.897) allocation failure 
[33019:0x3a29b70]   139097 ms: Scavenge 9213.6 (10846.1) -> 9201.6 (10849.6) MB, 20.4 / 0.0 ms  (average mu = 0.914, current mu = 0.897) allocation failure 


<--- JS stacktrace --->

==== JS stack trace =========================================

    0: ExitFrame [pc: 0x3bd156a5be1d]
Security context: 0x0848d459e6e9 <JSObject>
    1: mainBFS [0x1882c3b506c1] [/home/user/guochu/Packages/cutline/searchPathPlus.js:~99] [pc=0x3bd156afc5a0](this=0x16bba111ad81 <JSGlobal Object>,gs=0x1882c3b506f9 <Object map = 0xe8fd45d9549>)
    2: searchPathPlus [0xcb9a62bf661] [/home/user/guochu/Packages/cutline/searchPathPlus.js:228] [bytecode=0x32de8a7ccad9 offset=194](this=0x1882c3b50749 <StructDa...

FATAL ERROR: invalid array length Allocation failed - JavaScript heap out of memory
 1: 0x8dc510 node::Abort() [node]
 2: 0x8dc55c  [node]
 3: 0xad9b5e v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [node]
 4: 0xad9d94 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [node]
 5: 0xec7bf2  [node]
 6: 0xea0cd4 v8::internal::Factory::NewFixedArrayWithFiller(v8::internal::Heap::RootListIndex, int, v8::internal::Object*, v8::internal::PretenureFlag) [node]
 7: 0xea12a7 v8::internal::Factory::NewUninitializedFixedArray(int, v8::internal::PretenureFlag) [node]
 8: 0xe62a20  [node]
 9: 0xe62cdf  [node]
10: 0xfd9afe v8::internal::JSObject::AddDataElement(v8::internal::Handle<v8::internal::JSObject>, unsigned int, v8::internal::Handle<v8::internal::Object>, v8::internal::PropertyAttributes, v8::internal::ShouldThrow) [node]
11: 0xff3262 v8::internal::Object::AddDataProperty(v8::internal::LookupIterator*, v8::internal::Handle<v8::internal::Object>, v8::internal::PropertyAttributes, v8::internal::ShouldThrow, v8::internal::Object::StoreFromKeyed) [node]
12: 0x100dd7d v8::internal::Object::SetProperty(v8::internal::LookupIterator*, v8::internal::Handle<v8::internal::Object>, v8::internal::LanguageMode, v8::internal::Object::StoreFromKeyed) [node]
13: 0x11686c5 v8::internal::Runtime::SetObjectProperty(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, v8::internal::LanguageMode) [node]
14: 0xf3bf8d v8::internal::Runtime_KeyedStoreIC_Slow(int, v8::internal::Object**, v8::internal::Isolate*) [node]
15: 0x3bd156a5be1d 
已放弃(吐核)

*/

/*
1起点
12 47798
13 165568
14 659195
15 1861870
*/