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

const fs = require('fs')

let input=JSON.parse(fs.readFileSync('in/generateCircuit.json',{encoding:'utf-8'}))
let edgeDimension=JSON.parse(fs.readFileSync('../callMeteor/output/s2.json',{encoding:'utf-8'}))

let sd=new StructDataClass();

console.log(JSON.stringify(input,null,4))

sd.import(input)


/* 
前提:
最优路径的任意时刻边数不超过edgeMax(此图为11)
最优路径的任意时刻都是联通整体,最多再有一个几乎联通的在边界的比特并且下一步就能联通

伪代码:

贪心算法搜索,得出最大的边数edgeMax和一个总次数times用来剪枝(或者手动指定一组)

Queue 先入先出队列
Map 点集->计算次数
Map2 点集->顺序
把所有({边界点},边界点,0)加入队列
while队列非空
>取队首 (点集,上一个点,次数)
>如果map(点集)非空 且 次数大于map(点集)或贪心的次数
>>continue
>map(点集)设为次数
>map2(点集)设为map2(点集-上一个点)追加上一个点
>对于每个满足前提的扩张新点
>>({点集}并{新点},新点,次数+扩新点的计算次数)入队
得到map({所有点})次数和map2({所有点})顺序

问题规模为 edgeMax*点集数
正常时为66*2^66
由于前提的存在使得edgeMax为11,点集数为10万左右
*/

/**
 * 前提:
 * 最优路径的任意时刻边数不超过edgeMax(此图为11)
 * 最优路径的任意时刻都是联通整体,最多再有一个几乎联通的在边界的比特并且下一步就能联通
 * 
 * 伪代码:
 * 
 * edgeMax 最大的边数
 * Queue 优先队列,次数小的先出队
 * Map 点集->计算次数
 * 把所有({边界点},[边界点],0)加入队列
 * while队列非空
 * >取队首 (点集,顺序,次数)
 * >如果map(点集)非空 且 次数大于map(点集)或贪心的次数
 * >>continue
 * >map(点集)设为次数
 * >如果:全满
 * >>得到结果(顺序,次数)
 * >否则:对于每个满足前提的扩张新点:
 * >>({点集}并{新点},顺序+[新点],次数+扩新点的计算次数)入队
 * 
 * 问题规模为 edgeMax*点集数
 * 正常时为66*2^66
 * 由于前提的存在使得edgeMax为11,点集数为10万左右
 * @param {Number[][]} edgeDimension [[mapQ1,mapQ2,dimension]...]
 */
let searchPepsOrder=function (edgeDimension) {
    // prepare

    /** @type {import('./main.js').StructDataClass} */
    let sd=this
    let orderList=eval(sd.input.generatingCircuit[0].order[0].order)
    edgeDimension.forEach(v => sd.edge(orderList[v[0]],orderList[v[1]]).pepsDimension=v[2]);
    let n = this.n

    let mainBFS=()=>{
        /** 存计算次数 */
        let map1={}
        /** 优先队列,次数小的先出队 [(点集,顺序,次数)...] */
        let queue={
            data:new PriorityQueue().init((a,b)=>b[2]-a[2],1000000),
            push:function(v){this.data.offer(v)},
            shift:function(){return this.data.poll()},
            size:function(){return this.data.length},
        }
        for (const v of initalBoundaryPoints()) {
            let area=Array.from({length:n}).map(v=>0)
            area[v]=1
            queue.push([area,[v],0])
        }
        while (queue.size()) {
            let [area,order,times]=queue.shift()
            let key=area.join('')
            if (map1[key]!=null && times>=map1[key]) continue;
            map1[key]=times
            if (order.length===n) {
                return {times,order}
            } else {
                for(const [v,t] of newPoints(area)){
                    let newArea=Array.from(area)
                    newArea[v]=1
                    queue.push([newArea,order.concat([v]),times+t])
                }
            }
        }
        return {times:null,order:[]}
    }
    let initalBoundaryPoints = ()=>{

    }
    let newPoints = (area)=>{

    }
}
searchPepsOrder.apply(sd,[edgeDimension])
