// Get the data
const data = "http://127.0.0.1:5000/";

// Fetch the JSON data and console log it
d3.json(data).then(function(data) {
  console.log(data);
});

// Function to fetch historical data by month
function getHistoricalDataByMonth(month, year) {
    fetch(`http://localhost:5000/historical-data-by-month?month=${month}&year=${year}`)
        .then(response => response.json())
        .then(data => {
            // Process and display historical data
            console.log(data);
        })
        .catch(error => console.error('Error fetching historical data:', error));
}

// Function to fetch summary statistics
fetch("http://localhost:5000/summary-statistics")
    .then(response => response.json())
    .then(data => {
        // Process and display summary statistics
        console.log(data);
    })
    .catch(error => console.error('Error fetching summary statistics:', error));

// Function to filter data by temperature range
function filterData(minTemp, maxTemp) {
    fetch(`http://localhost:5000/data-filtering?min_temp=${minTemp}&max_temp=${maxTemp}`)
        .then(response => response.json())
        .then(data => {
            // Process and display filtered data
            console.log(data);
        })
        .catch(error => console.error('Error filtering data:', error));
}

// Function to generate bar graph visualization
fetch("http://localhost:5000/bar-graph")
    .then(response => response.json())
    .then(data => {
        // Process and display bar graph
        console.log(data);
    })
    .catch(error => console.error('Error generating bar graph:', error));