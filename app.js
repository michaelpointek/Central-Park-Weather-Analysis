// get data url
const data = "http://127.0.0.1:5000/"

// fetch json data and console log it
d3.json(data).then(function(data) {
    console.log(data)
});

