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
