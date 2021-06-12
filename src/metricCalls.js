const baseUrl = "http://localhost:8000/metricServer"
const baseUrl2 = "http://192.168.1.228:8000/metricServer"
const baseUrl3 = "http://192.168.1.251:8000/metricServer"
const ram = "/ram"
const cpu = "/cpu"
let hosts = {
    "localhost": {
        cpuData: null,
        ramData: null,
    },
    "192.168.1.228": {
        cpuData: null,
        ramData: null
    },
    "192.168.1.251": {
        cpuData: null,
        ramData: null
    }
};
export async function metricsCall() {
    let metrics1 = call1();
    let metrics2 = call2();
    let metrics3 = call3();
    hosts.localhost = { cpuData: (await metrics1).cpuData, ramData: (await metrics1).ramData };
    hosts["192.168.1.228"] = { cpuData: (await metrics2).cpuData, ramData: (await metrics2).ramData };
    hosts["192.168.1.251"] = { cpuData: (await metrics3).cpuData, ramData: (await metrics3).ramData };
    return(hosts);
}

async function call1() {
    let response1 = await fetch(baseUrl + cpu);
    let cpuData = await response1.json();
    let response2 = await fetch(baseUrl + ram);
    let ramData = await response2.json();
    return({
        cpuData: cpuData,
        ramData: ramData
    });
}

async function call2() {
    let response1 = await fetch(baseUrl2 + cpu);
    let cpuData = await response1.json();
    let response2 = await fetch(baseUrl2 + ram);
    let ramData = await response2.json();
    return({
        cpuData: cpuData,
        ramData: ramData
    });
}

async function call3() {
    let response1 = await fetch(baseUrl3 + cpu);
    let cpuData = await response1.json();
    let response2 = await fetch(baseUrl3 + ram);
    let ramData = await response2.json();
    return({
        cpuData: cpuData,
        ramData: ramData
    });
}


export default metricsCall;