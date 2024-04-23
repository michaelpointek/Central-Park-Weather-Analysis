// get data url
const dataURL = "http://127.0.0.1:5000/"

// fetch json data and console log it
d3.json(dataURL).then(function(dataURL) {
    console.log(dataURL)
});
