
let searchPath=function () {
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
    this.constructor.prototype.pathsSplit=paths
    return `${paths.length} paths found`
}

let searchPathPlus=function (edgeDimension,edgeMax) {
    /** @type {import('./main.js').StructDataClass} */
    let sd=this
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
}


if (typeof exports === "undefined") exports = {};
exports.searchPathPlus=searchPathPlus


if (typeof require !== 'undefined' && require.main === module) {

    const {StructDataClass} = require('./main.js')
    const fs = require('fs');

    let input=JSON.parse(fs.readFileSync('in/tasks_allcircles.json',{encoding:'utf-8'}))

    let sd=new StructDataClass();

    console.log(JSON.stringify(input,null,4))

    // input.generatingCircuit[0].pepsCut='[]'
    sd.import(input)

    let result = searchPathPlus.apply(sd)
    console.log(result)

}

