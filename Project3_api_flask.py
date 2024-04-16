# Import the dependencies.
import numpy as np
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, text
from flask import Flask, jsonify


#################################################
# Database Setup
#################################################

# Create the connection string
connection_string = "postgresql://postgres:postgres@localhost:5432/project3"

# Create the engine using the connection string
engine = create_engine(connection_string)
#connect to engine 
conn = engine.connect()

# Declare a Base using `automap_base()`
Base = automap_base()
# Use the Base class to reflect the database tables
Base.prepare(engine, reflect=True)
# Save references as NyWeatherDataSet
NyWeatherDataSet = Base.classes.ny_weather_data_set

query = text("Select * from ny_weather_data_set")
data = conn.execute(query)
print(data)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

# @app.route('/')
# def home():
#     return "Welcome to NY Weather API!"

# @app.route('/api/data')
# def get_data():
#     # Create a session to query the database
#     session = Session(engine)

#     # Query the ny_weather_data_set and fetch the data
#     results = session.query(NyWeatherDataSet.date, NyWeatherDataSet.prcp, NyWeatherDataSet.snow, ).all()

#     # Close the session
#     session.close()

#     # Convert the results to a list of dictionaries
#     data = []
#     for result in results:
#         data.append({
#             "column1": result.column1,
#             "column2": result.column2
#         })

#     # Return the data as JSON
#     return jsonify(data)

# if __name__ == '__main__':
#     app.run(debug=True)





