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
      title: "Annual average of 154 years",
      xaxis: { title: { text: "Year" } },
      yaxis: { title: { text: "Temperature (Fahrenheit)" } },
    };
    Plotly.newPlot("bar", data, layout);
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
      new bootstrap.Modal(document.getElementById("temperature-modal")).show();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
// Call fetchData function when the button is clicked
document.getElementById("fetch-data-btn").addEventListener("click", fetchData);
