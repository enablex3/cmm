import React from 'react';
import { Line } from 'react-chartjs-2';

function RamPercentChart({data, seconds}) {
    let state = {
        labels: seconds,
        datasets: [
            {
                label: 'Usage (Out of 100%)',
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgba(0,168,107,1)',
                borderColor: 'rgba(1,0,0,1)',
                borderWidth: 2,
                data: data
            }
        ]
    };

    return (
        <div>
            <Line
                data={state}
                options={{
                    animation: {
                        duration: 0
                    },
                }}
            />
        </div>
    )
}
export default RamPercentChart;