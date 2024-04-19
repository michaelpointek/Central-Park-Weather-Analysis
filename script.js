// Get the data
const data = "http://127.0.0.1:5000/";

// Fetch the JSON data and console log it
d3.json(data).then(function(data) {
  console.log(data);
});

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
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

// Call fetchData function when the button is clicked
document.getElementById('fetch-data-btn').addEventListener('click', fetchData);


