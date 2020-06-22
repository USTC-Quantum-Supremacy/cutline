let random=(function(){
let randData=
/// random list start ///
{
    seed:0,
    list:[
        0.1,0.2,0.3
    ]
}
/// random list end ///
;
let current=0;
let random={}
function rand () {
    let ret=randData.list[current++];
    if (typeof ret!==typeof 0)throw 'random number exhaust';
    return ret
}
function randn(n,s) {
    if (s==null) return ~~(n*rand());
    return s+ ~~((n-s)*rand())
}

random.rand=rand;
random.randn=randn;
return random;
})()
if (typeof exports === "undefined") exports = {};
exports.rand=random;