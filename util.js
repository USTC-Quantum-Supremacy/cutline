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

    let f2=()=>{
        const fs = require('fs')
        const {execSync} = require('child_process')
        let oldTime=JSON.parse(fs.readFileSync('/home/user/zhaouv/callMeteor/output/pepsTimeTest.json',{encoding:'utf-8'}))
        let newTime=JSON.parse(fs.readFileSync('/home/user/guochu/Packages/callMeteor/output/pepsTimeTest.json',{encoding:'utf-8'}))
        let tasks=JSON.parse(fs.readFileSync('/home/user/guochu/Packages/callMeteor/in/dimensionTasks.json',{encoding:'utf-8'}))
        let data={title:'time',data:[['n','d','circuit','old','new']],outFileName:'output/pepsTimeCompare.xlsx'}
        for (let index = 0; index < tasks.length; index++) {
            data.data.push([...tasks[index],oldTime[index],newTime[index]])
        }
        fs.writeFileSync('output/pepsTimeCompare.json',JSON.stringify(data),{encoding:'utf-8'})
        execSync(`python3 convertToXlsx.py output/pepsTimeCompare.json`)
    }

    let pepstime=()=>{
        const fs = require('fs')
        const {execSync} = require('child_process')
        let newTime=JSON.parse(fs.readFileSync('../callMeteor/output/PEPSTimeTest.json',{encoding:'utf-8'}))
        let tasks=JSON.parse(fs.readFileSync('output/PEPSTimeInputs.json',{encoding:'utf-8'}))
        let data={title:'peps time',data:[['n','d','circuit','time']],outFileName:'output/PEPSTimeTest.xlsx'}
        for (let index = 0; index < tasks.length; index++) {
            data.data.push([...tasks[index].slice(2),newTime[index]])
        }
        fs.writeFileSync('output/PEPSTimeTest.json',JSON.stringify(data),{encoding:'utf-8'})
        execSync(`python3 convertToXlsx.py output/PEPSTimeTest.json`)
    }

    let sfatime=()=>{
        const fs = require('fs')
        const {execSync} = require('child_process')
        let newTime=JSON.parse(fs.readFileSync('../callMeteor/output/SFATimeTest.json',{encoding:'utf-8'}))
        let tasks=JSON.parse(fs.readFileSync('output/SFATimeInputs.json',{encoding:'utf-8'}))
        let data={title:'sfa time',data:[['n','d','circuit','time','paths','crossgate','npath']],outFileName:'output/SFATimeTest.xlsx'}
        for (let index = 0; index < tasks.length; index++) {
            data.data.push([...tasks[index].slice(2),...newTime[index]])
        }
        fs.writeFileSync('output/SFATimeTest.json',JSON.stringify(data),{encoding:'utf-8'})
        execSync(`python3 convertToXlsx.py output/SFATimeTest.json`)
    }

    eval('!'+(process.argv[2]||'f1')+'();')
}