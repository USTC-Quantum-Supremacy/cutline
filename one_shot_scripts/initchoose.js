N=66
tcut=[

]
rmap={}
sd.markList.map((v,i)=>rmap[i]=v)
ta=sd.markList.slice(N-66)
if(N==66)ta=[]
// ttt=circult.value.split('\n')
// ttt[1]=ta.join(',')
// circult.value=ttt.join('\n')
buildMainSVG()
patternColor.innerHTML=`
${tcut.map(v=>'.qline.q'+v.map(v=>rmap[v]).join('.q')).join(',')} {
    display:none
}

${ta.map(v=>'circle.q'+v).join(',')}{
    fill:#008
}

`
tttsyugfsd=null
tarea=`<textarea name="myInput" id="myInput" cols="40" rows="6" spellcheck="false"></textarea>`
if(document.getElementById('myInput')==null){
    tttsyugfsd=document.createElement('div')
    tttsyugfsd.innerHTML=tarea
    document.body.appendChild(tttsyugfsd)
}
copyToClipboard=function (text) {

  copyText = document.getElementById("myInput");
  copyText.value=text

  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/


  document.execCommand("copy");


}
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
console.clear()
1