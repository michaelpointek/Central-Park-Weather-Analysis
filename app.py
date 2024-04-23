from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from config import user, password
from datetime import datetime
from sqlalchemy.sql.expression import func

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
                            NyWeatherDataSet.snwd, NyWeatherDataSet.tmin, NyWeatherDataSet.tmax,
                            NyWeatherDataSet.year, NyWeatherDataSet.month, NyWeatherDataSet.day).all()

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

@app.route("/api/annual-average/<extremum>")
@cross_origin(supports_credentials=True)
def get_annual_avg(extremum):
    conn = engine.connect()
    query = text("select date_part('year', date) as year, avg(" + extremum + 
                 ") from ny_weather_data_set group by date_part('year', date)"  +
                 " order by date_part('year', date) asc")
    
    results = conn.execute(query)

    year = []
    avg = []
    for result in results:
        year.append(int(result.year))
        avg.append(result.avg)

    return jsonify({"Year": year, "Average": avg})

@app.route("/api/seasons/<year>")
@cross_origin(supports_credentials=True)
def seasons_data(year):
    query1 = text("SELECT year, season, AVG(snow) as avg_snow FROM (SELECT year, CASE " +
                                    "WHEN month IN (12, 1, 2) THEN 'Winter' " +
                                    "WHEN month IN (3, 4, 5) THEN 'Spring' " +
                                    "WHEN month IN (6, 7, 8) THEN 'Summer' " +
                                    "WHEN month IN (9, 10, 11) THEN 'Fall' " +
                                "END AS season, " +
                                "snow " +
                           "FROM " +
                                "public.ny_weather_data_set " +
                        ") AS seasons " +
                        "WHERE " +
                            "year =  "  + year + 
                        "GROUP BY " +
                            "year, season " +
                        "ORDER BY " +
                            "year, season")
    conn = engine.connect()
    results = conn.execute(query1)
    year = []
    season = []
    avg_snow = []
    for i in results:
        year.append(i.year)
        season.append(i.season)
        avg_snow.append(i.avg_snow)
    return jsonify({"year": year, "season": season, "avg_snow": avg_snow})

if __name__ == '__main__':
    app.run(debug=False)
