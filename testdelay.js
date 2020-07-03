const delay = ms => new Promise(res => setTimeout(res, ms));
const abc = async () => {
    await delay(1000);
    console.log("Waited 1s");
  
    await delay(1000);
    console.log("Waited an additional 1s");
};
let d=abc()
console.log(d)
console.log("exit");