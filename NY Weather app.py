# Import the dependencies.
# import datetime as dt

from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from flask_cors import CORS, cross_origin
import pandas as pandas
import numpy as numpy
from config import user, password



#################################################
# Database Setup
#################################################


#create engine
#engine = create_engine(connection_string).connect()

# reflect an existing database into a new model
#Base = automap_base()
# reflect the tables
#Base.prepare(engine, reflect=True)
#NyWeatherDataSet = Base.classes.ny_weather_data_set
# Create our session (link) from Python to the DB
#session = Session(engine)

#query = text("Select * from ny_weather_data_set")
#data = engine.execute(query)
#print(data)

#query = text("Select * from ny_weather_data_set")
#data = engine.execute(query)

#for i in data:
 #   print(i)



#################################################
# Flask Setup
#################################################


app = Flask(__name__)
CORS(app, support_credentials=True)
# Database Setup
connection_string = f"postgresql://{user}:{password}@localhost:5432/Project 3"
engine = create_engine(connection_string)
Base = automap_base()
Base.prepare(engine, reflect=True)
NyWeatherDataSet = Base.classes.ny_weather_data_set

@app.route('/')
def get_data():
    # Create a session to query the database
    session = Session(engine)
    # Query the ny_weather_data_set and fetch the data
    results = session.query(NyWeatherDataSet.id, NyWeatherDataSet.prcp, NyWeatherDataSet.snow,
                            NyWeatherDataSet.snwd, NyWeatherDataSet.tmin, NyWeatherDataSet.tmax).all()
    # Close the session
    session.close()
    # Convert the results to a list of dictionaries
    data = []
    for result in results:
        data.append({
            "Date": result.id,
            "Precipitation": result.prcp,
            "Snow": result.snow,
            "SNWD": result.snwd,
            "Minimum Temperature": result.tmin,
            "Maximum Temperature": result.tmax,
        })
    # Return the data as JSON
    return jsonify(data)

@app.route("/api/yearly-average")
@cross_origin(supports_credentials=True)
def get_data2():
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

if __name__ == '__main__':
    app.run(debug=False)









