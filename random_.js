let rand=(function(){
let randData=
/// random list start ///
{
    seed:0,
    list:[
        0.1,0.2,0.3
    ]
}
/// random list end ///
;let current=0;
let rand = function () {
    let ret=randData.list[current++];
    if (typeof ret!==typeof 0)throw 'random number exhaust';
    return ret
}
return rand;
})()
if (typeof exports === "undefined") exports = {};
exports.rand=rand;