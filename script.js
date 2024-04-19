// Get the data
const data = "http://127.0.0.1:5000/";

// Fetch the JSON data and console log it
d3.json(data).then(function(data) {
  console.log(data);
});

// Function to fetch historical data by month using D3.js
function getHistoricalDataByMonth(month, year) {
    const url = `http://localhost:5000/historical-data-by-month?month=${month}&year=${year}`;
    d3.json(url).then(function(data) {
        // Process and display historical data
        console.log(data);
    }).catch(error => console.error('Error fetching historical data:', error));
}

// Fetch summary statistics using D3.js
const summaryStatsUrl = "http://localhost:5000/summary-statistics";
d3.json(summaryStatsUrl).then(function(data) {
    // Process and display summary statistics
    console.log(data);
}).catch(error => console.error('Error fetching summary statistics:', error));

// Function to filter data by temperature range using D3.js
function filterData(minTemp, maxTemp) {
    const url = `http://localhost:5000/data-filtering?min_temp=${minTemp}&max_temp=${maxTemp}`;
    d3.json(url).then(function(data) {
        // Process and display filtered data
        console.log(data);
    }).catch(error => console.error('Error filtering data:', error));
}

// Fetch data for bar graph visualization using D3.js
const barGraphUrl = "http://localhost:5000/bar-graph";
d3.json(barGraphUrl).then(function(data) {
    // Process and display bar graph data
    console.log(data);
}).catch(error => console.error('Error generating bar graph:', error));
