let random=(function(){
let randData=
/// random list start ///
{
    seed:"1",
    seeds:["1","2"],
    list:[],
    "1":[0.1,0.2,0.3],
    "2":[0.1,0.2,0.3],
}
/// random list end ///
;
let current=0;
let random={};
function rand () {
    let ret=randData.list[current++];
    if (typeof ret!==typeof 0)throw 'random number exhaust';
    return ret;
}
function randn(n,s) {
    if (s==null) return ~~(n*rand());
    return s+ ~~((n-s)*rand());
}
function reset(params) {
    randData.list=randData[randData.seed];
    current=0;
}
function seed(seed_) {
    if(randData[seed_]==null)throw 'seed not allowed';
    randData.seed=seed_;
    reset();
}

reset();
random.rand=rand;
random.randn=randn;
random.reset=reset;
random.seed=seed;
return random;
})();
if (typeof exports === "undefined") exports = {};
exports.rand=random;