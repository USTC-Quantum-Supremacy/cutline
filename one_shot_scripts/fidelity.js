// > From [Javascript 随机数函数 学习之二：产生服从正态分布随机数 - Tong Zeng - 博客园](https://www.cnblogs.com/zztt/p/4025207.html)

function getNumberInNormalDistribution(mean, std_dev) {
    return mean + (randomNormalDistribution() * std_dev);
}

function randomNormalDistribution() {
    var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
    do {
        //获得两个（-1,1）的独立随机变量
        u = Math.random() * 2 - 1.0;
        v = Math.random() * 2 - 1.0;
        w = u * u + v * v;
    } while (w == 0.0 || w >= 1.0)
    //这里就是 Box-Muller转换
    c = Math.sqrt((-2 * Math.log(w)) / w);
    //返回2个标准正态分布的随机数，封装进一个数组返回
    //当然，因为这个函数运行较快，也可以扔掉一个
    //return [u*c,v*c];
    return u * c;
}

// <

function getNumberInUniformDistribution(mean, std_dev) {
    let b_a = std_dev * Math.sqrt(12)
    let a = -b_a/2+mean
    let r = a + b_a * Math.random()
    return r
}

StructDataClass.prototype.dispatchErrorRateWithRandomFunction = function (e1, e2, er, d1, d2, dr, getNumber) {
    let between05 = v => v < 0 ? 0 : v > 0.05 ? 0.05 : v
    let between01 = v => v < 0 ? 0 : v > 0.1 ? 0.1 : v
    let lessthan1 = v => v > 1 ? 1 : v
    for (let qi = 0; qi < this.bitCount; qi++) {
        const qubit = this.qubit(qi);
        if (qubit.area2) {
            qubit.e1 = lessthan1(getNumber(e1, d1))
            qubit.er = lessthan1(getNumber(er, dr))
        }
    }
    for (let ei = 0; ei < this.maxAreaEdges.length; ei++) {
        const edge = this.edge(this.maxAreaEdges[ei]);
        edge.e2 = lessthan1(getNumber(e2, d2))
    }
}

StructDataClass.prototype.dispatchErrorRate = function (e1, e2, er, d1, d2, dr) {
    return this.dispatchErrorRateWithRandomFunction(e1, e2, er, d1, d2, dr, getNumberInNormalDistribution)
}

StructDataClass.prototype.dispatchErrorRateUniform = function (e1, e2, er, d1, d2, dr) {
    return this.dispatchErrorRateWithRandomFunction(e1, e2, er, d1, d2, dr, getNumberInUniformDistribution)
}

StructDataClass.prototype.fidelityWithDispatchedErrorRate = function (pf, pattern) {
    let [pa, pb, pc, pd] = Array.from(pattern[1])
    let depth = ~~this.input.depth
    let fidelities = []
    let tplpattern = this.input.searchPattern
    let i2pmap = [pa, pb, pc, pd]
    let i2p = index => i2pmap[tplpattern[index % tplpattern.length]]
    let f1 = 1
    let fr = 1
    for (let qi = 0; qi < this.bitCount; qi++) {
        const qubit = this.qubit(qi);
        if (qubit.area2) {
            f1 *= 1 - qubit.e1
            fr *= 1 - qubit.er
        }
    }
    for (let index = 0; index < depth; index++) {
        let layerPattern = i2p(index)
        let f2 = 1
        for (let ei = 0; ei < this.maxAreaEdges.length; ei++) {
            const edge = this.edge(this.maxAreaEdges[ei]);
            if (pf(edge, layerPattern)) {
                f2 *= 1 - edge.e2
            }
        }
        fidelities.push(f1, f2)
    }
    fidelities.push(f1, fr)
    let f = fidelities.reduce((pv, cv) => pv * cv, 1)
    // console.log(fidelities, f)
    return f
}

/* 
buildMainSVG();calculate();
var ers=[0.0016,0.0062,0.038]
var erds=ers.map(v=>0.1*v)
sd.dispatchErrorRate(...ers,...erds)
sd.fidelityWithDispatchedErrorRate((edge,pattern)=>edge.isPattern[pattern],['IJKLKLIJ','IJKL'])
 */

/* 
buildMainSVG();calculate();
// e1, e2, er, d1, d2, dr
sd.dispatchErrorRate(0.0016,0.0062,0.038,0,0,0)
sd.fidelityWithDispatchedErrorRate((edge,pattern)=>edge.isPattern[pattern],['IJKLKLIJ','IJKL'])
 */

/* 

import numpy as np
import matplotlib.pyplot as plt
def p(dx,dy,title,xlabel,with3hour=True):
    plt.figure()
    plt.plot(dx, dy, marker='o', mec='b', mfc='b',label='time')
    if with3hour==True:
        plt.plot(np.array([dx[0],dx[-1]]), np.array([3600*3,3600*3]), 'r',label='3 hours')
    else:
        plt.errorbar(dx,dy,yerr=with3hour,fmt='o',ecolor='r',color='b',elinewidth=2,capsize=4)
    plt.xlabel(xlabel)
    plt.ylabel('time(s)')
    plt.legend(loc=4) #指定legend的位置右下角
    # plt.legend(loc=1) #指定legend的位置右上角
    plt.title(title)

dx= [1,1.003,1.006,1.009,1.012,1.015,1.018,1.021,1.024,1.027,1.03,1.033,1.036,1.039,1.042,1.045,1.048,1.051,1.054,1.057,1.06,1.063,1.066,1.069,1.072,1.075,1.078,1.081,1.084,1.087] 
dy= [5020.408804068345,5250.78216077956,5491.738226016065,5743.7636685564485,6007.367562074682,6283.0824177192035,6571.4652643464815,6873.098778578037,7188.592467018813,7518.583903013581,7863.740020497663,8224.758467525739,8602.369022292422,8997.335074499526,9410.455175097566,9842.564657553236,10294.537333964046,10767.28726946307,11261.770638550115,11778.987667100402,12319.9846640532,12885.85614690103,13477.747065330135,14096.855127508516,14744.433233830696,15421.792023032156,16130.302535900328,16871.399002016056,17646.58175517123,18457.420283482395]
p(dx,dy,'sample time - error - 60bit - 20layer','rate of error rate')

dx= [1,1.006,1.012,1.018,1.024,1.03,1.036,1.042,1.048,1.054,1.06,1.066,1.072,1.078,1.084,1.09,1.096,1.102,1.108,1.114,1.12,1.126,1.1320000000000001,1.138,1.1440000000000001,1.15,1.156,1.162,1.168,1.174] 
dy= [1835.4209504638698,1995.6230979031839,2169.826061764314,2359.254998607586,2565.242410495829,2789.2375623866105,3032.8167267821864,3297.694328369339,3585.735067843216,3898.9671110348513,4239.596437089601,4610.022447658012,5012.854948104938,5450.932621440388,5927.343126413361,6445.444962685569,7008.891258704838,7621.655651517803,8288.060442775444,9012.807231327079,9801.010240598373,10658.232578029458,11590.525684955797,12604.472257933761,13707.232947445002,14906.597166788104,16211.038373443553,17629.77421701698,19172.831982869175,20851.119798120424]
p(dx,dy,'sample time - error - 60bit - 18layer','rate of error rate')

dx= [0,0.06896551724137931,0.13793103448275862,0.20689655172413793,0.27586206896551724,0.3448275862068966,0.41379310344827586,0.48275862068965514,0.5517241379310345,0.6206896551724138,0.6896551724137931,0.7586206896551724,0.8275862068965517,0.896551724137931,0.9655172413793103,1.0344827586206897,1.103448275862069,1.1724137931034482,1.2413793103448276,1.3103448275862069,1.3793103448275863,1.4482758620689655,1.5172413793103448,1.5862068965517242,1.6551724137931034,1.7241379310344827,1.793103448275862,1.8620689655172413,1.9310344827586206,2,2.111111111111111,2.2222222222222223,2.3333333333333335,2.4444444444444446,2.5555555555555554] 
dy= [10510.31870321245,10536.923539192441,10587.888855235122,10431.109633002781,10549.37319970224,10599.433233974956,10973.900714527797,10443.675383446724,10757.113402945402,11123.131574753097,11054.487257666315,10750.204640678347,10759.043992480107,11224.43132771496,11304.664160633416,11657.218940421008,11709.961268406298,11989.720659975634,11677.469229186496,13216.222643065892,11450.363288559305,12193.16724540959,12217.168454638739,13219.427709535707,13800.030612420418,15091.332027644823,13011.570934196077,16216.634712642626,14349.482318921446,15617.115644744175,14543.74303077547,15308.89776188047,16305.529873872141,12712.720022082964,16724.03437197557] 
ddy= [7.275957614183426e-12,265.3230566327928,544.6831235688157,729.2240871553931,1174.733678461842,1368.6797716824808,1926.88282893653,1938.882265496599,2207.3081240267984,2351.320000250043,2754.625791980324,3117.4761416684764,3444.459628606227,3476.443477168849,3782.0616516370364,4030.764502952607,5364.441371804215,5629.606989582021,5346.079229711894,7239.648395750716,5888.602411960147,7096.758934619403,6972.627011802024,8993.839871529633,8762.621082331902,9726.919057124347,11048.653958555527,13959.31133092385,9323.685939109886,13510.403297355193,14650.910535798905,15286.723064465956,11790.584689683663,9822.478368278624,20427.02669528217]
p(dx,dy,'sample time - std - 60bit - 18layer - NormalDistribution','rate of std',with3hour=ddy)

dx= [0,0.06896551724137931,0.13793103448275862,0.20689655172413793,0.27586206896551724,0.3448275862068966,0.41379310344827586,0.48275862068965514,0.5517241379310345,0.6206896551724138,0.6896551724137931,0.7586206896551724,0.8275862068965517,0.896551724137931,0.9655172413793103,1.0344827586206897,1.103448275862069,1.1724137931034482,1.2413793103448276,1.3103448275862069,1.3793103448275863,1.4482758620689655,1.5172413793103448,1.5862068965517242,1.6551724137931034,1.7241379310344827,1.793103448275862,1.8620689655172413,1.9310344827586206,2,2.111111111111111,2.2222222222222223,2.3333333333333335,2.4444444444444446,2.5555555555555554] 
dy= [10510.31870321245,10548.426002474138,10527.539390766882,10520.801158460243,10642.677974302836,10680.522556606886,10416.60186859635,10802.185970116285,11035.788792006242,10689.421404011497,11528.904555715993,11019.784998607129,11113.076752278448,11621.197816325712,11127.33317039739,12140.764134712454,11091.814818582101,12986.539095028913,11627.930602764536,11750.744025253798,11913.532154071361,12152.72934944541,12961.625927538997,13266.224512310058,12686.341297481948,14582.795168292216,14309.031836228762,12404.457110602627,14674.19079356501,14420.446569428175,14997.37434479157,12260.184409462821,17402.736805734687,18300.102580702336,18786.29063941602] 
ddy= [7.275957614183426e-12,274.49257028904213,522.3072474532564,692.1425886628505,1013.4125787599157,1453.8242280017635,1623.2871410356222,1969.6200945465325,2130.767578319618,2263.2854846557616,2864.4346313792807,3099.61482520599,3565.5732412224443,3254.791799206938,3925.6049754079727,4622.458616337807,4552.296883113106,6041.869248375451,5644.713158137959,6863.414645114405,6802.954712114546,6339.05751451397,7184.825827366808,9338.537005279162,6686.766511057501,9539.534655568912,11912.687058669651,9154.852158891319,13161.510417882897,11040.828842094432,10653.941802600024,8141.921886406155,14587.646128284587,18259.195756918354,18279.389227446034]
p(dx,dy,'sample time - std - 60bit - 18layer - UniformDistribution','rate of std',with3hour=ddy)

plt.show()

 */

buildMainSVG(); calculate();
var ers = [0.0016, 0.0062, 0.038]
var erds = [0.0005, 0.0024, 0.0161]

// 20
var x = [...Array(30)].map((v, i) => 1 + 0.003 * i)
var y = []

for (const xx of x) {
    sd.dispatchErrorRate(...ers.map(v => v * xx), ...erds.map(v => 0))
    let f = sd.fidelityWithDispatchedErrorRate((edge, pattern) => edge.isPattern[pattern], ['IJKLKLIJ', 'IJKL'])
    let yy = 9 / f / f / (1.0 * 1000000 / 200)
    y.push(yy)
}
console.log('dx=', JSON.stringify(x), '\ndy=', JSON.stringify(y))

// 18
var x = [...Array(30)].map((v, i) => 1 + 0.006 * i)
var y = []

for (const xx of x) {
    sd.dispatchErrorRate(...ers.map(v => v * xx), ...erds.map(v => 0))
    let f = sd.fidelityWithDispatchedErrorRate((edge, pattern) => edge.isPattern[pattern], ['IJKLKLIJ', 'IJKL'])
    let yy = 9 / f / f / (1.0 * 1000000 / 200)
    y.push(yy)
}
console.log('dx=', JSON.stringify(x), '\ndy=', JSON.stringify(y))

// std gauss
var x = [...[...Array(30)].map((v, i) => 2 / 29 * i), ...[...Array(5)].map((v, i) => 2 + 1 / 9 * (i + 1))]
var y = []
var dy = []

for (const xx of x) {
    var ts = []
    var n = 100
    for (let index = 0; index < n; index++) {
        sd.dispatchErrorRate(...ers.map(v => v * 0.18 / 0.16), ...erds.map(v => v * xx))
        let f = sd.fidelityWithDispatchedErrorRate((edge, pattern) => edge.isPattern[pattern], ['IJKLKLIJ', 'IJKL'])
        let t = 9 / f / f / (1.0 * 1000000 / 200)
        ts.push(t)
    }
    let avg = ts.reduce((pv, cv) => pv + cv, 0) / n
    let std = Math.sqrt(ts.map(v => (v - avg) * (v - avg)).reduce((pv, cv) => pv + cv, 0) / n)
    y.push(avg)
    dy.push(std)
}
console.log('dx=', JSON.stringify(x), '\ndy=', JSON.stringify(y), '\nddy=', JSON.stringify(dy))

// std Uniform
var x = [...[...Array(30)].map((v, i) => 2 / 29 * i), ...[...Array(5)].map((v, i) => 2 + 1 / 9 * (i + 1))]
var y = []
var dy = []

for (const xx of x) {
    var ts = []
    var n = 100
    for (let index = 0; index < n; index++) {
        sd.dispatchErrorRateUniform(...ers.map(v => v * 0.18 / 0.16), ...erds.map(v => v * xx))
        let f = sd.fidelityWithDispatchedErrorRate((edge, pattern) => edge.isPattern[pattern], ['IJKLKLIJ', 'IJKL'])
        let t = 9 / f / f / (1.0 * 1000000 / 200)
        ts.push(t)
    }
    let avg = ts.reduce((pv, cv) => pv + cv, 0) / n
    let std = Math.sqrt(ts.map(v => (v - avg) * (v - avg)).reduce((pv, cv) => pv + cv, 0) / n)
    y.push(avg)
    dy.push(std)
}
console.log('dx=', JSON.stringify(x), '\ndy=', JSON.stringify(y), '\nddy=', JSON.stringify(dy))
