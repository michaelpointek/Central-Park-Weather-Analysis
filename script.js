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
          //new:
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
              // try to edit to get a better popup
              alert(`Lowest Temperature Day: ${selectedMonth}/${minTempDay} ${minTemp}°F\nHighest Temperature Day: ${selectedMonth}/${maxTempDay} ${maxTemp}°F`);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

function populateSeasonal() {
  let seasons = getCheckedBoxes("form-check-input");
  var param = document.querySelector('input[name="flexRadio"]:checked').value;
  console.log("param: " + param + ", seasons: " + seasons);

  data = [];
  seasons.forEach((season) => {
    const url = "http://127.0.0.1:5000/api/seasonal/" + param + "/" + season;
    d3.json(url).then(function (result) {
      data.push({
        x: result.year,
        y: result.average,
        type: "scatter",
      });
    });
  });
  setTimeout(() => {
    let layout = {
      title: "Average " + param + " of " + seasons,
      xaxis: { title: { text: "Year" } },
      yaxis: { title: { text: param } },
    };
    Plotly.newPlot("bar2", data, layout);
  }, 1000);
}

function getCheckedBoxes(chkboxClassName) {
  var checkboxes = document.getElementsByClassName(chkboxClassName);
  var checkboxesChecked = [];
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxesChecked.push(checkboxes[i].value);
    }
  }
  return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}
