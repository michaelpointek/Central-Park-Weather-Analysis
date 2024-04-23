// Function to fetch data based on user input and log it to the console
function fetchData() {
  // Get selected month and year from the dropdown and input field
  const selectedMonth = document.getElementById('month-select').value;
  const selectedYear = document.getElementById('year-input').value;

  // Construct the URL for fetching data from Flask
  const url = `http://127.0.0.1:5000/data?year=${selectedYear}&month=${selectedMonth}`;

  // Fetch the JSON data from the Flask server
  fetch(url)
      .then(response => response.json())
      .then(data => {
          // Log the fetched data to the console
          console.log(data);

          // Initialize variables for minimum and maximum temperatures
          let minTemp = Infinity;
          let minTempDay = '';
          let maxTemp = -Infinity;
          let maxTempDay = '';

          // Iterate through each day object in the data array
          data.forEach(day => {
              const temperature = day['Maximum Temperature'];
              const dayNumber = day['Day'];

              // Update minimum temperature if current temperature is lower
              if (temperature < minTemp) {
                  minTemp = temperature;
                  minTempDay = dayNumber;
              }

              // Update maximum temperature if current temperature is higher
              if (temperature > maxTemp) {
                  maxTemp = temperature;
                  maxTempDay = dayNumber;
              }
          });

          // Display a popup with lowest and highest temperature days
          alert(`Lowest Temperature Day: ${selectedMonth}/${minTempDay} ${minTemp}°F\nHighest Temperature Day: ${selectedMonth}/${maxTempDay} ${maxTemp}°F`);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

// Call fetchData function when the button is clicked
document.getElementById('fetch-data-btn').addEventListener('click', fetchData);

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
