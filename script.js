// Get the data
const data = "http://127.0.0.1:5000/";

// Fetch the JSON data and console log it
d3.json(data).then(function(data) {
  console.log(data);
});

//new
// Function to fetch and display data based on year and month
function displayData(year, month) {
  // Construct the URL to fetch data
  const apiUrl = `http://127.0.0.1:5000/data?year=${year}&month=${month}`;

  // Fetch the JSON data based on the constructed URL
  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // Process the fetched data (e.g., display in HTML)
          displayHistoricalData(data); // Call a function to display data in HTML (define this function as needed)
      })
      .catch(error => {
          console.error('There was a problem with fetching data:', error);
      });
}

// Function to fetch historical data based on selected month and year
function getHistoricalDataByMonth() {
  // Get selected month and year values from HTML elements
  const selectedMonth = document.getElementById('month-select').value;
  const selectedYear = document.getElementById('year-input').value;

  // Call the displayData function with the selected year and month
  displayData(selectedYear, selectedMonth);
}

