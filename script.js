// populatePlot("tmin");

// function populatePlot(value) {
//   const url = "http://127.0.0.1:5000/api/annual-average/" + value;

//   d3.json(url).then(function (result) {
//     let data = [
//       {
//         x: result.Year,
//         y: result.Average,
//       },
//     ];
//     let layout = {
//       title: "Annual average of 154 years",
//       xaxis: { title: { text: "Year" } },
//       yaxis: { title: { text: "Temperature (Fahrenheit)" } },
//     };
//     Plotly.newPlot("bar", data, layout);
//   });
// }

populatePlot("Precipitation");

function populatePlot(value) {
  const url = "http://127.0.0.1:5000/api/annual-average/" + value;

  d3.json(const url).then(function (result) {
    let decades = [];
    let decade_precipitation_spring_averages = [];
    let spring_months = ["03", "04", "05"];

    for (let i = 0; i < data.length; i += 3650) {
      let running_sum = 0;
      let end = Math.min(data.length, i + 3650);
      for (let j = i; j < end; j++) {
        let date = data[j].Date.split("-");
        let year = date[0];
        let month = date[1];
        let day = date[2];
        running_sum += data[j].Precipitation; 
        if (spring_months.includes(month)) {
          precipitation.push(data[j].Precipitation);
          console.log(data[j].Precipitation);
        }
      }
      let date = data[i].Date.split("-");
      let year = date[0];
      let month = date[1];
      let day = date [2];
      decades.push(year);
      decade_precipitation_spring_averages.push(running_sum / 3650);
    }

    let plotData = [{
      x: decades,
      y: decade_precipitation_spring_averages, 
      type: 'scatter',
      mode: 'lines',
      name: 'Average Precipitaton'
    }]
      
    let layout = {
      title: 'Spring Precipitation by Decades',
      xaxis: { title: 'Decades' },
      yaxis: { title: 'Average Precipitation' }
    };

    Plotly.newPlot('bar', plotData, layout);
  });
}


// # precipitation over the years spring
// data = get_data()
// precipitation = []
// decades = []
// decade_precipitation_spring_averages = []
// spring_months = ["03","04","05"]
// for i in range(0, len(data), 3650):
//     running_sum = 0
//     end = len(data) if len(data)<i+3650 else i+3650
//     for j in range(i, end):
//         year,month,day = str(data[j]["Date"]).split("-")
//         running_sum += data[j]["Precipitation"]
//         if month in spring_months:
//             precipitation.append(data[j]["Precipitation"])
//             print(data[j]["Precipitation"])
//     year,month,day = str(data[i]["Date"]).split("-")
//     decades.append(year)
//     decade_precipitation_spring_averages.append(running_sum / 3650)
// print(decade_precipitation_spring_averages)
// plt.plot(decades, decade_precipitation_spring_averages) 
// plt.xlabel("Spring by Decades")
// plt.ylabel("Average Precipitation")
// plt.show()