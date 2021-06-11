import { useEffect, useState } from 'react';
import './App.css';
import { metricsCall } from './metricCalls';
import CpuPercentChart from './charts/CpuPercentChart';
import RamPercentChart from './charts/RamPercentChart';
import { FaPause } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { jsonToArray } from './utils';

let timeInterval = 2000;

function App() {
  const [data, setData] = useState(null);
  const [dataArrays, setDataArrays] = useState({"empty": true});
  const [seconds, setSeconds] = useState([]);
  const [time, setTime] = useState(0);
  const [toggle, setToggle] = useState(true);
  
  function triggerToggle() {
    setToggle(!toggle);
  }

  async function updateArrays(data, seconds) {
    let item = "localhost";
    Object.getOwnPropertyNames(data).map(item => {
      if (!dataArrays[item]) {
        dataArrays[item] = {"cpuData": [], "ramData": []};
        dataArrays["empty"] = false;
      }
      dataArrays[item].cpuData = [...dataArrays[item].cpuData, data[item].cpuData.utilization.percent];
      dataArrays[item].ramData = [...dataArrays[item].ramData, data[item].ramData.percent];
    });
    /* we want to slice one element from the arrays so the chart doesn't squeeze */
    if (dataArrays[item].cpuData.length === 10) {
      Object.getOwnPropertyNames(data).map(item => {
        dataArrays[item].cpuData = dataArrays[item].cpuData.slice(1);
        dataArrays[item].ramData = dataArrays[item].ramData.slice(1);
      });
    }
    setDataArrays(dataArrays);
  }

  useEffect(() => {
    function getData(time) {
      if (toggle) {
        metricsCall().then(function(result){setData(result)});
        if (data != null) {
          setData(jsonToArray(data));
          setTime(time + (timeInterval / 1000));
          setSeconds(seconds => [...seconds, time.toString()]);
          updateArrays(data, seconds);
        }
      }
      if (seconds.length === 10) {
        setSeconds(seconds.slice(1));
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
      {(dataArrays.empty) ? null : 
        Object.getOwnPropertyNames(dataArrays).map((item, idx) => {
          if (item !== "empty") {
            return(
              <>
                <p key={idx}>{item}</p>
                <div className="row">
                  <div className="column">
                    {(data == null) ? null :
                      <CpuPercentChart
                        key={idx + 1}
                        data={dataArrays[item].cpuData}
                        seconds={seconds}
                      />
                    }
                  </div>
                  <div className="column">
                    {(data == null) ? null :
                      <div style={{display:"block"}}>
                        <RamPercentChart 
                          key={idx + 2}
                          data={dataArrays[item].ramData}
                          seconds={seconds}
                        />
                      </div>
                    }
                    </div>
                </div>
              </>
            )
          }
        })}
    </div>
  );
}

// Put back after confirmed obj converstion
/*<p style={{ textAlign: "center"}}>Localhost</p>
      <div className="row">
        <div className="column">
          {(data == null) ? null :
            <CpuPercentChart
              key={time}
              data={cpuPercentData}
              seconds={seconds}
            />
          }
        </div>
        <div className="column">
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
*/

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
