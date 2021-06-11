# Computer Metrics Monitor (Beta)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Requirements:
<ul>
 <li>Node</li>
 <li>NPM or Yarn</li>
 <li>Python 3.7 or later</li>
 <li>Django</li>
 <li>Django-cors-headers (will be removed in the future)</li>
</ul>

## Run the React App
1. On the command line navigate to `<project_dir>`.
2. On the command line type `npm install` and press ENTER.
3. On the command line type `npm run start` and press ENTER.
4. In your browser, go to <a href="http:localhost:3000">localhost:3000</a>.

## Run the Metric Server
1. On the command line navigate to `<project_dir>/python/ComputerMetrics/`.
2. On the command line type `python manage.py runserver` and press ENTER.
3. NOTE: The server will serve data on <a href="http:localhost:8000/metricServer">localhost:8000/metricServer</a>.

## What is CMM?
CMM is a fun, educational tool that will process computer metrics such as RAM and CPU utilization. The software can be run on Mac, Linux or Windows machines as long as they fulfill the requirements above. The way the software works, is the React App is a dashboard viewed in the browser, and the Metric Server collects the metric data and provides api end points for this data. The React App will submit GET requests to the metric server in order to collect this data.

### Flow charts
<img src="https://github.com/enablex3/cmm/blob/main/singleHostChart.PNG" alt="singlehostchart.png"/>
<img src="https://github.com/enablex3/cmm/blob/main/singleHostRemoteChart.PNG" alt="singlehostchart.png"/>
<img src="https://github.com/enablex3/cmm/blob/main/multipleHostRemoteChart.PNG" alt="singlehostchart.png"/>

### Demo

<img src="https://github.com/enablex3/cmm/blob/main/Demo.PNG" alt="demo.png"/>
