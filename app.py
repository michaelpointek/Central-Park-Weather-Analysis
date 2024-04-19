from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from config import user, password   #or import *
from datetime import datetime
from sqlalchemy.sql.expression import func   #new

# Flask Setup
app = Flask(__name__)
CORS(app, supports_credentials=True)
# Database Setup
connection_string = f"postgresql://{user}:{password}@localhost:5432/project3"
engine = create_engine(connection_string)
Base = automap_base()
Base.prepare(engine, reflect=True)
NyWeatherDataSet = Base.classes.ny_weather_data_set


@app.route('/')
@cross_origin(supports_credentials=True)
def get_data():
    # Create a session to query the database
    session = Session(engine)

    # Query the ny_weather_data_set and fetch the data
    results = session.query(NyWeatherDataSet.date, NyWeatherDataSet.prcp, NyWeatherDataSet.snow,
                            NyWeatherDataSet.snwd, NyWeatherDataSet.tmin, NyWeatherDataSet.tmax, NyWeatherDataSet.year, 
                              NyWeatherDataSet.month, NyWeatherDataSet.day).all()

    # Close the session
    session.close()

    # Convert the results to a list of dictionaries
    data = []
    for result in results:
        data.append({
            "Date": result.date,
            "Precipitation": result.prcp,
            "Snow": result.snow,
            "Snow Depth": result.snwd,
            "Minimum Temperature": result.tmin,
            "Maximum Temperature": result.tmax,
            "Year": result.year,
            "Month": result.month, 
            "Day": result.month
        })

    # Return the data as JSON
    return jsonify(data)



# Route to get data with optional filters for year and month
@app.route('/data')
@cross_origin(supports_credentials=True)
def get_filtered_data():
    # Get the query parameters for year and month
    year = request.args.get('year')
    month = request.args.get('month')

    # Create a session to query the database
    session = Session(engine)

    # Query the ny_weather_data_set with optional filters for year and month
    query = session.query(NyWeatherDataSet.date, NyWeatherDataSet.prcp, NyWeatherDataSet.snow,
                          NyWeatherDataSet.snwd, NyWeatherDataSet.tmin, NyWeatherDataSet.tmax,
                          NyWeatherDataSet.year, NyWeatherDataSet.month, NyWeatherDataSet.day)

    if year:
        query = query.filter(NyWeatherDataSet.year == int(year))
    if month:
        query = query.filter(NyWeatherDataSet.month == int(month))

    results = query.all()

    # Close the session
    session.close()

    # Convert the results to a list of dictionaries
    data = []
    for result in results:
        data.append({
            "Date": result.date,
            "Precipitation": result.prcp,
            "Snow": result.snow,
            "Snow Depth": result.snwd,
            "Minimum Temperature": result.tmin,
            "Maximum Temperature": result.tmax,
            "Year": result.year,
            "Month": result.month,
            "Day": result.day
        })

    # Return the data as JSON
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=False)







