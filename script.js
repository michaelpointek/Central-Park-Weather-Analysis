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
      title: "Annual average of 154 years",
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
      paramName = "Precipitation";
      break;
    case "snow":
      paramName = "Snowfall";
      break;
    case "snwd":
      paramName = "Snow Accumulation";
      break;
    case "tmin":
      paramName = "Temperature(min)";
      break;
    case "tmax":
      paramName = "Temperature(max)";
      break;
  }
  setTimeout(() => {
    let layout = {
      title: "Average " + paramName + " of " + seasons,
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

function compare2years() {
  var marksCanvas = document.getElementById("marksChart");
  const decade1 = document.getElementById("decade-1").value;
  const decade2 = document.getElementById("decade-2").value;
  const url1 = "http://127.0.0.1:5000/api/get-avg-year/" + decade1;
  const url2 = "http://127.0.0.1:5000/api/get-avg-year/" + decade2;

  d3.json(url1).then(function (result1) {
    d3.json(url2).then(function (result2) {
      const chartData = document.getElementById("chart-data");
      chartData.innerHTML = `
      <div class="row" style="background-color: #d1d0d0; border-radius: 10px;">
      <div class="col-md-6">
                <div>${decade1} : </div>
                <li>winter: ${result1.Average[0]}</li>
                <li>spring: ${result1.Average[1]}</li>
                <li>summer: ${result1.Average[2]}</li>
                <li>fall: ${result1.Average[3]}</li> 
                </div>
                <div class="col-md-6">
                <div>${decade2} : </div>
                <li>winter: ${result2.Average[0]}</li>
                <li>spring: ${result2.Average[1]}</li>
                <li>summer: ${result2.Average[2]}</li>
                <li>fall: ${result2.Average[3]}</li> 
                </div>
                </div>
          `;
      console.log(result1.Average);
      console.log(result2.Average);
      var marksData = {
        labels: ["Winter", "Spring", "Summer", "Fall"],
        datasets: [
          {
            label: decade1,
            backgroundColor: "rgba(200,0,0,0.2)",
            data: result1.Average,
          },
          {
            label: decade2,
            backgroundColor: "rgba(0,0,200,0.2)",
            data: result2.Average,
          },
        ],
      };

      radarChart = new Chart(marksCanvas, {
        type: "radar",
        data: marksData,
        options: {
          // scale: {
          //   ticks: {
          //     beginAtZero: true,
          //     max: 5,
          //     min: 0,
          //     stepSize: 0.1,
          //   },
          // },
          elements: {
            line: {
              borderWidth: 3,
            },
          },
        },
      });
    });
  });
  if (radarChart) radarChart.destroy();
}
