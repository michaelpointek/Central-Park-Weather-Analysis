
# from flask import Flask, jsonify, request
# from flask_cors import CORS, cross_origin
# from sqlalchemy import create_engine, text
# from sqlalchemy.orm import Session
# from sqlalchemy.ext.automap import automap_base
# from config import user, password   #or import *
# from datetime import datetime
# from sqlalchemy.sql.expression import func   #new

# # Flask Setup
# app = Flask(__name__)
# CORS(app, supports_credentials=True)
# # Database Setup
# connection_string = f"postgresql://{user}:{password}@localhost:5432/project3"
# engine = create_engine(connection_string)
# Base = automap_base()
# Base.prepare(engine, reflect=True)
# NyWeatherDataSet = Base.classes.ny_weather_data_set


# #new - function
# # Function to extract year and month from a date string
# def extract_year_month(date_str):
#     date_obj = datetime.strptime(date_str, "%a, %d %b %Y %H:%M:%S %Z")
#      # Extract year and month from the datetime object
#     year = date_obj.year
#     month = date_obj.month
#     return date_obj.year, date_obj.month



# @app.route('/')
# @cross_origin(supports_credentials=True)
# def get_data():
#     # Create a session to query the database
#     session = Session(engine)

#     # Query the ny_weather_data_set and fetch the data
#     results = session.query(NyWeatherDataSet.date, NyWeatherDataSet.prcp, NyWeatherDataSet.snow,
#                             NyWeatherDataSet.snwd, NyWeatherDataSet.tmin, NyWeatherDataSet.tmax).all()

#     # Close the session
#     session.close()

#     # Convert the results to a list of dictionaries
#     data = []
#     for result in results:
#         year, month = extract_year_month(result.date)  #new
#         data.append({
#             "Year": year,   #new,new
#             "Month": month, 
#             "Date": result.date,
#             "Precipitation": result.prcp,
#             "Snow": result.snow,
#             "Snow Depth": result.snwd,
#             "Minimum Temperature": result.tmin,
#             "Maximum Temperature": result.tmax,
#         })

#     # Return the data as JSON
#     return jsonify(data)


# #new route - fetch data by year and month 
# @app.route('/data', methods=['GET'])
# @cross_origin(supports_credentials=True)
# def get_data_by_month_year():
#     # Get the year and month parameters from the request
#     year = request.args.get('year')
#     month = request.args.get('month')

#      #new:
#      # Convert year and month to integers
#     year = int(year)
#     month = int(month)

#     # Create a session to query the database
#     session = Session(engine)

#     # Query the ny_weather_data_set and fetch the data for the specified year and month
#     results = session.query(NyWeatherDataSet.date, NyWeatherDataSet.prcp, NyWeatherDataSet.snow,
#                             NyWeatherDataSet.snwd, NyWeatherDataSet.tmin, NyWeatherDataSet.tmax) \
#         .filter(func.extract('year', NyWeatherDataSet.date) == year,
#                 func.extract('month', NyWeatherDataSet.date) == month).all()

#     # Close the session
#     session.close()

#     # Convert the results to a list of dictionaries
#     data = []
#     for result in results:
#         data.append({
       
#             "Date": result.date,
#             "Precipitation": result.prcp,
#             "Snow": result.snow,
#             "Snow Depth": result.snwd,
#             "Minimum Temperature": result.tmin,
#             "Maximum Temperature": result.tmax,
#         })

#     # Return the data for the specified year and month as JSON
#     return jsonify(data)

# if __name__ == '__main__':
#     app.run(debug=False)


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
connection_string = f"postgresql://{user}:{password}@localhost:5432/project3" # Update with your credentials
engine = create_engine(connection_string)
Base = automap_base()
Base.prepare(engine, reflect=True)
NyWeatherDataSet = Base.classes.ny_weather_data_set

# Function to extract year and month from a date string
def extract_year_month(date_str):
    # Convert the date string to a datetime object
    date_obj = datetime.strptime(date_str, "%a, %d %b %Y %H:%M:%S")

    # Extract year and month from the datetime object
    year = date_obj.year
    month = date_obj.month
    return year, month

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
        year, month = extract_year_month(result.date)  # Extract year and month
        data.append({
            "Year": year,
            "Month": month,
            "Date": result.date,
            "Precipitation": result.prcp,
            "Snow": result.snow,
            "Snow Depth": result.snwd,
            "Minimum Temperature": result.tmin,
            "Maximum Temperature": result.tmax,
        })

    # Return the data as JSON
    return jsonify(data)

@app.route('/data', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_data_by_month_year():
    # Get the year and month parameters from the request
    year = request.args.get('year')
    month = request.args.get('month')

    # Convert year and month to integers
    year = int(year)
    month = int(month)

    # Create a session to query the database
    session = Session(engine)

    # Query the ny_weather_data_set and fetch the data for the specified year and month
    results = session.query(NyWeatherDataSet.date, NyWeatherDataSet.prcp, NyWeatherDataSet.snow,
                            NyWeatherDataSet.snwd, NyWeatherDataSet.tmin, NyWeatherDataSet.tmax) \
        .filter(func.extract('year', NyWeatherDataSet.date) == year,
                func.extract('month', NyWeatherDataSet.date) == month).all()

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
        })

    # Return the data for the specified year and month as JSON
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=False)





