var json={
    stringify:(data,replacer,space,d)=>{
        d=~~d
        if (typeof space==typeof 0) {
            space=Array.from({length:space+1}).join(' ')
        }
        if (d<=0 || !space) {
            return JSON.stringify(data,replacer,space);
        }
        return json.json(JSON.parse(JSON.stringify(data,replacer)),d,space,'\n')
    },
    parse:JSON.parse,
    json:(data,d,space,pre)=>{
        if (d<=0) {
            return JSON.stringify(data);
        }
        if (data instanceof Array) {
            if (data.length==0) {
                return '[]'
            }
            let texts = [];
            for (let v of data) {
                texts.push(space+json.json(v,d-1,space,pre+space));
            }
            return '['+pre+texts.join(','+pre)+pre+']';
        }
        if (data instanceof Object) {
            if (Object.keys(data).length==0) {
                return '{}'
            }
            let texts = [];
            for (let i in data) {
                texts.push(space+'"'+i+'": '+json.json(data[i],d-1,space,pre+space))
            }
            return '{'+pre+texts.join(','+pre)+pre+'}';
        }
        return JSON.stringify(data);
    },
    d1:(data)=>json.stringify(data,null,4,1),
    l1:(data)=>console.log(json.stringify(data,null,4,1)),
    d2:(data)=>json.stringify(data,null,4,2),
    l2:(data)=>console.log(json.stringify(data,null,4,2)),
}

if (typeof exports === "undefined") exports = {};
exports.json=json

if (typeof require !== 'undefined' && require.main === module) {
    let f1=()=>{
        let a=[
            {
                name: "60",
                filter: [16,17,18,22,23,24],
                target: [1,2,3,10,11,12]
            },
            {
                name: "66",
                filter: [40,41,42,49,50,51],
                target: [34,35,36]
            }
        ]
        json.l1(a)
    }

    eval('!'+(process.argv[2]||'f1')+'();')
}