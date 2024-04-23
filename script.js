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
  }, 4000);
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
