const baseUrl = "http://localhost:8000/metricServer"
const ram = "/ram"
const cpu = "/cpu"

export async function metricsCall() {
    let response1 = await fetch(baseUrl + cpu);
    let cpuData = await response1.json();
    let response2 = await fetch(baseUrl + ram);
    let ramData = await response2.json();
    return({
        cpuData: cpuData,
        ramData: ramData
    });
}


export default metricsCall;