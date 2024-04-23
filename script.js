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


// precipitation over the seasons of decades  
// precipitation over the years spring

populatePlot("Precipitation");

function populatePlot(value) {
  const url = "http://127.0.0.1:5000/api/annual-average/" + value;

  d3.json(url).then(function (result) {
    let decades = [];
    let decade_precipitation_spring_averages = [];
    let spring_months = ["03", "04", "05"];

    for (let i = 0; i < result.length; i += 3650) {
      let running_sum = 0;
      let end = Math.min(result.length, i + 3650);
      for (let j = i; j < end; j++) {
        let date = result[j].Date.split("-");
        let year = date[0];
        let month = date[1];
        let day = date[2];
        running_sum += result[j].Precipitation; 
        if (spring_months.includes(month)) {
          decade_precipitation_spring_averages.push(result[j].Precipitation);
          console.log(result[j].Precipitation);
        }
      }
      let date = result[i].Date.split("-");
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

// precipitation over the years summer 
populatePlot("Precipitation");

function populatePlot(value) {
  const url = "http://127.0.0.1:5000/api/annual-average/" + value;

  d3.json(url).then(function (result) {
    let decades = [];
    let decade_precipitation_summer_averages = [];
    let summer_months = ["06", "07", "08"];

    for (let i = 0; i < result.length; i += 3650) {
      let running_sum = 0;
      let end = Math.min(result.length, i + 3650);
      for (let j = i; j < end; j++) {
        let date = result[j].Date.split("-");
        let year = date[0];
        let month = date[1];
        let day = date[2];
        running_sum += result[j].Precipitation; 
        if (summer_months.includes(month)) {
          decade_precipitation_summer_averages.push(result[j].Precipitation);
          console.log(result[j].Precipitation);
        }
      }
      let date = result[i].Date.split("-");
      let year = date[0];
      let month = date[1];
      let day = date [2];
      decades.push(year);
      decade_precipitation_summer_averages.push(running_sum / 3650);
    }

    let plotData = [{
      x: decades,
      y: decade_precipitation_summer_averages, 
      type: 'scatter',
      mode: 'lines',
      name: 'Average Precipitaton'
    }]
      
    let layout = {
      title: 'Summer Precipitation by Decades',
      xaxis: { title: 'Decades' },
      yaxis: { title: 'Average Precipitation' }
    };

    Plotly.newPlot('bar', plotData, layout);
  });
}

// precipitation over the years fall 
populatePlot("Precipitation");

function populatePlot(value) {
  const url = "http://127.0.0.1:5000/api/annual-average/" + value;

  d3.json(url).then(function (result) {
    let decades = [];
    let decade_precipitation_fall_averages = [];
    let fall_months = ["09", "10", "11"];

    for (let i = 0; i < result.length; i += 3650) {
      let running_sum = 0;
      let end = Math.min(result.length, i + 3650);
      for (let j = i; j < end; j++) {
        let date = result[j].Date.split("-");
        let year = date[0];
        let month = date[1];
        let day = date[2];
        running_sum += result[j].Precipitation; 
        if (fall_months.includes(month)) {
          decade_precipitation_fall_averages.push(result[j].Precipitation);
          console.log(result[j].Precipitation);
        }
      }
      let date = result[i].Date.split("-");
      let year = date[0];
      let month = date[1];
      let day = date [2];
      decades.push(year);
      decade_precipitation_fall_averages.push(running_sum / 3650);
    }

    let plotData = [{
      x: decades,
      y: decade_precipitation_fall_averages, 
      type: 'scatter',
      mode: 'lines',
      name: 'Average Precipitaton'
    }]
      
    let layout = {
      title: 'Fall Precipitation by Decades',
      xaxis: { title: 'Decades' },
      yaxis: { title: 'Average Precipitation' }
    };

    Plotly.newPlot('bar', plotData, layout);
  });
}

// precipitation over the years winter 
populatePlot("Precipitation");

function populatePlot(value) {
  const url = "http://127.0.0.1:5000/api/annual-average/" + value;

  d3.json(url).then(function (result) {
    let decades = [];
    let decade_precipitation_winter_averages = [];
    let winter_months = ["12", "01", "02"];

    for (let i = 0; i < result.length; i += 3650) {
      let running_sum = 0;
      let end = Math.min(result.length, i + 3650);
      for (let j = i; j < end; j++) {
        let date = result[j].Date.split("-");
        let year = date[0];
        let month = date[1];
        let day = date[2];
        running_sum += result[j].Precipitation; 
        if (winter_months.includes(month)) {
          decade_precipitation_winter_averages.push(result[j].Precipitation);
          console.log(result[j].Precipitation);
        }
      }
      let date = result[i].Date.split("-");
      let year = date[0];
      let month = date[1];
      let day = date [2];
      decades.push(year);
      decade_precipitation_winter_averages.push(running_sum / 3650);
    }

    let plotData = [{
      x: decades,
      y: decade_precipitation_winter_averages, 
      type: 'scatter',
      mode: 'lines',
      name: 'Average Precipitaton'
    }]
      
    let layout = {
      title: 'Winter Precipitation by Decades',
      xaxis: { title: 'Decades' },
      yaxis: { title: 'Average Precipitation' }
    };

    Plotly.newPlot('bar', plotData, layout);
  });
}

// snow over the seasons of decades 
// snow over the years spring

let data = get_data();
let snow = [];
let decades = [];
let decade_snow_spring_averages = []; 
let spring_months = ["03", "04", "05"]; 

for (let i = 0; i < data.length; i += 3650) {
  let running_sum = 0; 
  let end = Math.min(data.length, i + 3650);

  for (let j = i; j < end; j++) {
    let [year, month, day] = data[j]["Date"].split("-");
    running_sum += data[j]["Snow"]; 

    if (spring_months.includes(month)) {
      snow.push(data[j]["Snow"]);
      console.log(data[j]["Snow"]);
    }
  }
  
  let [year, month, day] = data[i]["Date"].split("-");
  decades.push(year);
  decade_snow_spring_averages.push(running_sum / 3650);
}

console.log(decade_snow_spring_averages); 

let plotData = [{
  x: decades, 
  y: decade_snow_spring_averages
  type: 'scatter'
  mode: 'lines'
  name: 'Average Snow'
}];

let layout = {
  title: 'Spring Snow by Decades',
  xaxis: { title: 'Decades' },
  yaxis: { title: 'Average Snow' }
};

Plotly.newPlot('bar', plotData, layout); 

// data = get_data()
// snow = []
// decades = []
// decade_snow_spring_averages = []
// spring_months = ["03","04","05"]
// for i in range(0, len(data), 3650):
//     running_sum = 0
//     end = len(data) if len(data)<i+3650 else i+3650
//     for j in range(i, end):
//         year,month,day = str(data[j]["Date"]).split("-")
//         running_sum += data[j]["Snow"]
//         if month in spring_months:
//             snow.append(data[j]["Snow"])
//             print(data[j]["Snow"])
//     year,month,day = str(data[i]["Date"]).split("-")
//     decades.append(year)
//     decade_snow_spring_averages.append(running_sum / 3650)
// print(decade_snow_spring_averages)
// plt.plot(decades, decade_snow_spring_averages) 
// plt.xlabel("Spring by Decades")
// plt.ylabel("Average Snow")
// plt.show()