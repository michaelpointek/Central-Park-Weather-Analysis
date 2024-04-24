// Get the data
const data = "http://127.0.0.1:5000/";
// Fetch the JSON data and console log it
d3.json(data).then(function (data) {
  console.log(data);
});
populatePlot("tmin");

function populatePlot(value) {
  const url = "http://127.0.0.1:5000/api/annual-average/" + value;

  d3.json(url).then(function (result) {
    let data = [
      {
        x: result.Year,
        y: result.Average,
      },
    ];
    let layout = {
      title: "Annual average of 110 years",
      xaxis: { title: { text: "Year" } },
      yaxis: { title: { text: "Temperature (Fahrenheit)" } },
    };
    Plotly.newPlot("bar", data, layout);
  });
}
// Function to fetch data based on user input and log it to the console
function fetchData() {
  // Get selected month and year from the dropdown and input field
  const selectedMonth = document.getElementById("month-select").value;
  const selectedYear = document.getElementById("year-input").value;
  // Construct the URL for fetching data from Flask
  const url = `http://127.0.0.1:5000/data?year=${selectedYear}&month=${selectedMonth}`;
  // Fetch the JSON data from the Flask server
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Log the fetched data to the console
      console.log(data);
      //new:
      // Initialize variables for minimum and maximum temperatures
      let minTemp = Infinity;
      let minTempDay = "";
      let maxTemp = -Infinity;
      let maxTempDay = "";
      // Iterate through each day object in the data array
      data.forEach((day) => {
        const temperature = day["Maximum Temperature"];
        const dayNumber = day["Day"];
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
      alert(
        `Lowest Temperature Day: ${selectedMonth}/${minTempDay} ${minTemp}°F\nHighest Temperature Day: ${selectedMonth}/${maxTempDay} ${maxTemp}°F`
      );
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function populateSeasonal() {
  let seasons = getCheckedBoxes("form-check-input");
  var param = document.querySelector('input[name="flexRadio"]:checked').value;
  console.log("param: " + param + ", seasons: " + seasons);

  let data = [];
  seasons.forEach((season) => {
    const url = "http://127.0.0.1:5000/api/seasonal/" + param + "/" + season;
    d3.json(url).then(function (result) {
      data.push({
        x: result.year,
        y: result.average,
        type: "scatter",
        name: season,
      });
    });
  });
  let paramName = "";
  switch (param) {
    case "prcp":
      paramName = "Precipitation in inches";
      break;
    case "snow":
      paramName = "Snowfall in inches";
      break;
    case "snwd":
      paramName = "Snow Depth in inches";
      break;
    case "tmin":
      paramName = "Minimum Temperature(F)";
      break;
    case "tmax":
      paramName = "Maximum Temperature(F)";
      break;
  }
  setTimeout(() => {
    let layout = {
      title: "Average " + paramName + " of " + seasons.join(", "),
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

function fetchData() {
  // Get selected month and year from the dropdown and input field
  const selectedMonth = document.getElementById("month-select").value;
  const selectedYear = document.getElementById("year-input").value;
  // Construct the URL for fetching data from Flask
  const url = `http://127.0.0.1:5000/data?year=${selectedYear}&month=${selectedMonth}`;
  // Fetch the JSON data from the Flask server
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Log the fetched data to the console
      console.log(data);
      //new:
      // Initialize variables for minimum and maximum temperatures
      let minTemp = Infinity;
      let minTempDay = "";
      let maxTemp = -Infinity;
      let maxTempDay = "";
      // Iterate through each day object in the data array
      data.forEach((day) => {
        const temperature = day["Maximum Temperature"];
        const dayNumber = day["Day"];
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
      // Show temperature summary in Bootstrap Modal
      const modalBody = document.getElementById("modal-body");
      modalBody.innerHTML = `
                <p>Selected Month: ${selectedMonth}</p>
                <p>Lowest Temperature Day: ${selectedMonth}/${minTempDay} ${minTemp}°F</p>
                <p>Highest Temperature Day: ${selectedMonth}/${maxTempDay} ${maxTemp}°F</p>
            `;
    });
}
