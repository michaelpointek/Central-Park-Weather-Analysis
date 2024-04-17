// Function to fetch historical data by month from the Flask server
function getHistoricalDataByMonth() {
    const month = document.getElementById("month-select").value;
    const year = document.getElementById("year-input").value;

    fetch(`/historical-data-by-month?month=${month}&year=${year}`)
        .then(response => response.json())
        .then(data => {
            // Process and display historical data
            document.getElementById("historical-data").innerText = JSON.stringify(data);
        })
        .catch(error => console.error('Error fetching historical data:', error));
}

// Function to fetch summary statistics from the Flask server
function getSummaryStatistics() {
    fetch("/summary-statistics")
        .then(response => response.json())
        .then(data => {
            // Process and display summary statistics
            document.getElementById("summary-stats").innerText = JSON.stringify(data);
        })
        .catch(error => console.error('Error fetching summary statistics:', error));
}

// Function to filter data by temperature range using the Flask server
function filterData() {
    const minTemp = document.getElementById("min-temp").value;
    const maxTemp = document.getElementById("max-temp").value;

    fetch(`/data-filtering?min_temp=${minTemp}&max_temp=${maxTemp}`)
        .then(response => response.json())
        .then(data => {
            // Process and display filtered data
            document.getElementById("filtered-data").innerText = JSON.stringify(data);
        })
        .catch(error => console.error('Error filtering data:', error));
}

// Function to fetch data for generating bar graph visualization from the Flask server
function generateBarGraph() {
    fetch("/bar-graph")
        .then(response => response.json())
        .then(data => {
            // Process and display bar graph
            const ctx = document.getElementById('bar-graph').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Average Maximum Temperature by Month',
                        data: data.values,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error generating bar graph:', error));
}
