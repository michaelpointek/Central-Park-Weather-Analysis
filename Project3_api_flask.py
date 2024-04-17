
from flask import Flask, jsonify 
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from config import user, password

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
            "Snow Depth": result.snwd,
            "Minimum Temperature": result.tmin,
            "Maximum Temperature": result.tmax,
        })

    # Return the data as JSON
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=False)





