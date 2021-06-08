import { useEffect, useState } from 'react';
import './App.css';
import { metricsCall } from './metricCalls';
import CpuPercentChart from './charts/CpuPercentChart';
import RamPercentChart from './charts/RamPercentChart';
import { FaPause } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
//import RamUsedVsAvailableChart from './charts/RamUsedVsAvailableChart';

let timeInterval = 2000;

function App() {
  const [data, setData] = useState(null);
  const [cpuPercentData, setCpuPercentData] = useState([]);
  const [ramPercentData, setRamPercentData] = useState([]);
  const [seconds, setSeconds] = useState([]);
  const [time, setTime] = useState(0);
  const [toggle, setToggle] = useState(true);
  /*const [ramUsed, setRamUsed] = useState(null);
  const [ramAvailable, setRamAvailable] = useState(null);
  const [cFrequency, setCFrequency] = useState(null);
  const [minFrequency, setMinFrequency] = useState(null);
  const [maxFrequency, setMaxFrequency] = useState(null);
  const [cpuCount, setCpuCount] = useState(null);
  const [ramTotal, setRamTotal] = useState(null);*/
  
  function triggerToggle() {
    setToggle(!toggle);
  }

  useEffect(() => {
    function getData(time) {
      if (toggle) {
        metricsCall().then(function(result){setData(result)});
        if (data != null) {
          setCpuPercentData(cpuPercentData => [...cpuPercentData, data.cpuData.utilization.percent]);
          setRamPercentData(ramPercentData => [...ramPercentData, data.ramData.percent]);
          setTime(time + (timeInterval / 1000));
          setSeconds(seconds => [...seconds, time.toString()]);
          /*setRamUsed(data.ramData.used);
          setRamAvailable(data.ramData.available);
          setCFrequency(data.cpuData.frequency.current);
          setMinFrequency(data.cpuData.frequency.min);
          setMaxFrequency(data.cpuData.frequency.max);
          setCpuCount(data.cpuData.count);
          setRamTotal(data.ramData.total);*/
        }
        /* we want to slice one element from the arrays so the chart doesn't squeeze */
        if (cpuPercentData.length >= 10) {
          setCpuPercentData(cpuPercentData.slice(1));
          setRamPercentData(ramPercentData.slice(1));
          setSeconds(seconds.slice(1));
        }
      }
    }
    const interval = setInterval(() => getData(time), timeInterval);
    return() => {
      clearInterval(interval)
    }
  }, null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Computer Performance</h1>
      </header>
      <div className="toggle" onClick={() => triggerToggle()}>
        {toggle ? <FaPause color='rgba(75,192,192,1)' size={30} /> : <FaPlay color='rgba(0,168,107,1)' size={30}/>}
      </div>
      <div className="row">
        <div className="column">
          <p>Computer Processor {(data == null) ? " waiting..." : null}</p>
          {(data == null) ? null :
            <CpuPercentChart
              key={time}
              data={cpuPercentData}
              seconds={seconds}
            />
          }
        </div>
        <div className="column">
          <p>Memory {(data == null) ? "waiting..." : null}</p>
          {(data == null) ? null :
            <div style={{display:"block"}}>
              <RamPercentChart 
                key={time}
                data={ramPercentData}
                seconds={seconds}
                redraw={true}
              />
            </div>
          }
          </div>
        </div>
    </div>
  );
}

// Add beneath RamPercentChart to show used vs. available
// this works, but rerender causes the scroll to reposition
/*
              <RamUsedVsAvailableChart
                key={time+1}
                available={ramAvailable}
                used={ramUsed}
              />
*/
export default App;
