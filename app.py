# Import the dependencies.
# import datetime as dt
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, MetaData, text
from flask import Flask, jsonify
#################################################
# Database Setup
#################################################
#create postgres connection
connection_string = "postgresql://postgres:postgres@localhost:5432/project_3"
#create engine
engine = create_engine(connection_string).connect()
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)
# Create our session (link) from Python to the DB
session = Session(engine)
query = text("select * from ny_weather_data_base")
data = conn.execute(query)
for i in data:
    print(i)