

/* [markdown]
 * **为 elided layer 搜索出最合适的切割线**  
 * 做法是把elided之前的层全部标记为已经使用 (?大概吧)  
 * 模仿 `StructDataClass.prototype._calCutLengthWithWedge` 新增函数来计算  
 * 模仿 `StructDataClass.prototype.calCutLengthWithWedge` 和 `StructDataClass.prototype.processPathsResult` 新增函数作为接口  
 * 不会干扰已有函数的计算 (确信)
 * 
 * 目前仅仅复制了模板还没改
 */

const {StructDataClass} = require('../main.js')

StructDataClass.prototype.processPathsResultOfElided = function (params) {
    let circles = this.circles 
    let func= this.calCutLengthWithWedgeOfElided
    let showProgress=false
    return this._processPathsResult(circles,func,showProgress)
}

StructDataClass.prototype.calCutLengthWithWedgeOfElided = function (patterns) {
    let pf=(edge,pattern)=>edge.isPattern[pattern]
    this._calCutLengthWithWedgeOfElided(pf,patterns)
    return this
}

/**
 * @param {(edge,pattern)=>Boolean} pf
 */
StructDataClass.prototype._calCutLengthWithWedgeOfElided = function (pf,patterns) {
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