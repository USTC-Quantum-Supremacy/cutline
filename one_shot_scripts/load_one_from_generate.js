var xhrOneFile = function(url,callback){
    var xhr = new XMLHttpRequest()
    xhr.onload = function(e) { 
        if(this.status == 200||this.status == 304){
            callback(this.responseText)
        }
    };
    xhr.open("GET",url)
    xhr.send()
}

var parseonejson = function (jsonstr,indextoload) {
    window.exportfilename='t'+indextoload
    let obj=JSON.parse(jsonstr)[indextoload]
    obj.showMark=[
        {
            "type": "markNone"
        }
    ]
    obj.part1='[]'
    document.querySelector('#blocklyinput').value=JSON.stringify(obj)
    buildMainSVG()
}

xhrOneFile('./in/generateCircuit.json',(v)=>{
    parseonejson(v,4)
})