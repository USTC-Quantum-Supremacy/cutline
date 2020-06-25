// 把旧的使用0~n的索引还原为初始id
const fs = require('fs')

let m={0:41,1:35,2:29,3:34,4:46,5:22,6:40,7:28,8:45,9:21,10:47,11:23,12:33,13:53,14:52,15:17,16:16,17:39,18:27,19:15,20:51,21:32,22:20,23:44,24:8,25:56,26:26,27:38,28:14,29:50,30:57,31:58,32:9,33:10,34:62,35:63,36:2,37:3,38:64,39:4,40:31,41:19,42:43,43:7,44:55,45:25,46:37,47:13,48:49,49:1,50:61,51:30,52:18,53:42,54:6,55:54,56:48,57:12,58:24,59:36,60:65,61:5,62:59,63:11,64:60,65:0}
let fname=n=>`sycamore${n}_cut.txt`
let ns = Array.from({length:61-37}).map((v,i)=>i+37).concat([66])
let all = {source:{}}
ns.forEach(v=>{
    let obj={}
    all[v]=obj
    obj.sourceName=fname(v)
    let source=fs.readFileSync(obj.sourceName,{encoding:'utf-8'})
    let match=/^(\d+)\s*((?:\d+\s)+)\s*((?:\d+\s)+)\s*((?:\d+\s)+)\s*((?:\d+\s)+)\s*$/.exec(source.split('\r\n').join('\n'))
    //          N       A              B              P              C               
    if (!match) {
        console.log(obj.sourceName)
        return
    }
    obj.n=~~match[1]
    obj.a=match[2].trim().split(/\s+/).map(u=>m[u])
    obj.b=match[3].trim().split(/\s+/).map(u=>m[u])
    obj.p=match[4].trim().split(/\s+/).map(u=>m[u])
    obj.c=match[5].trim().split(/\s+/).map(u=>m[u])
    all.source[v]=source
})
fs.writeFileSync('reverted.json',JSON.stringify(all))