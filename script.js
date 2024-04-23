// get data url
const dataURL = "http://127.0.0.1:5000/"

// fetch json data and console log it
d3.json(dataURL).then(function(dataURL) {
    console.log(dataURL)
});

// Function to fetch historical data by month
function getHistoricalDataByMonth(month, year) {
    fetch(`http://localhost:5000/historical-data-by-month?month=${month}&year=${year}`)
        .then(response => response.json())
        .then(dataURL => {
            // Process and display historical data
            console.log(dataURL);
        })
        .catch(error => console.error('Error fetching historical data:', error));
}

// Function to filter data by temperature range
function filterData(minTemp, maxTemp) {
    fetch(`http://localhost:5000/data-filtering?min_temp=${minTemp}&max_temp=${maxTemp}`)
        .then(response => response.json())
        .then(dataURL => {
            // Process and display filtered data
            console.log(dataURL);
        })
        .catch(error => console.error('Error filtering data:', error));
}

// Function to generate bar graph visualization
fetch("http://localhost:5000/bar-graph")
    .then(response => response.json())
    .then(dataURL => {
        // Process and display bar graph
        console.log(dataURL);
    })
    .catch(error => console.error('Error generating bar graph:', error));