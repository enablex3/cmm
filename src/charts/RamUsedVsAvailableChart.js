import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function RamUsedVsAvailableChart({available, used}) {
    let state = {
        labels: ['Available', 'Used'],
        datasets: [
            {
                label: 'Available Vs. Used (Bytes)',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(0, 168, 107, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(0, 168, 107, 1)',
                ],
                borderWidth: 2,
                data: [available, used]
            }
        ]
    };

    return (
        <div>
            <Doughnut
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
export default RamUsedVsAvailableChart;