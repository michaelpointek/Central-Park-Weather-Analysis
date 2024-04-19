from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from flask_cors import CORS, cross_origin
import pandas as pandas
import numpy as numpy
import config as config

# Flask Setup
app = Flask(__name__)
CORS(app, support_credentials=True)

# Database Setup
connection_string = config.conn
engine = create_engine(connection_string)
Base = automap_base()
Base.prepare(engine, reflect=True)
NyWeatherDataSet = Base.classes.ny_weather_data_set


############## ROUTES ################

@app.route('/')
@cross_origin(supports_credentials=True)
def get_data():
    # Create a session to query the database
    session = Session(engine)
    # Query the ny_weather_data_set and fetch the data
    results = session.query(NyWeatherDataSet.date, NyWeatherDataSet.prcp, NyWeatherDataSet.snow,
                            NyWeatherDataSet.snwd, NyWeatherDataSet.tmin, NyWeatherDataSet.tmax).all()
    # Close the session
    session.close()
    # Convert the results to a list of dictionaries
    data = []
    for result in results:
        data.append({
            "Date": result.date,
            "Precipitation": result.prcp,
            "Snow": result.snow,
            "SNWD": result.snwd,
            "Minimum Temperature": result.tmin,
            "Maximum Temperature": result.tmax,
        })
    return jsonify(data)


@app.route('/api/annual-average/<extremum>')
@cross_origin(supports_credentials=True)
def get_annual_avg(extremum):
    conn = engine.connect();
    query = text("select date_part('year', date) as year, avg(" + extremum + 
                 ") from ny_weather_data_set group by date_part('year', date)"  +
                 " order by date_part('year', date) asc");
    
    results = conn.execute(query)

    year = []
    avg = []
    for result in results:
        year.append(int(result.year))
        avg.append(result.avg)

    return jsonify({"Year":year, "Average":avg})





if __name__ == '__main__':
    app.run()


 