
var isNodejs = typeof document === "undefined"
if (isNodejs) {
    var cutlineMain = require('../main.js')
} else {
    var cutlineMain = exports
}
/** @type {import('../main.js').StructDataClass} */
var StructDataClass = cutlineMain.StructDataClass

function keepClickOrder(params) {
    document.querySelector("#extra-keepClickOrder > input[type=button]").remove()
    StructDataClass.prototype.loadChoosen=function (choosen) {
        if (!choosen) {
            choosen=[]
        }
        this.choosen=[]
        for (let qindex = 0; qindex < this.bitCount; qindex++) {
            if (choosen.indexOf(qindex)!==-1) {
                // 排除
                this.qubit(qindex).save=0
                this.choosen.push(qindex)
            } else {
                // 保留
                this.qubit(qindex).area=0
            }
        }
        this.choosen=choosen
        return this
    }
}
