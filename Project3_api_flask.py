
from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base

# Flask Setup
app = Flask(__name__)

# Database Setup
connection_string = "postgresql://postgres:postgres@localhost:5432/project3"
engine = create_engine(connection_string)
Base = automap_base()
Base.prepare(engine, reflect=True)
NyWeatherDataSet = Base.classes.ny_weather_data_set

# Flask Routes
# @app.route('/')
# def home():
#     # Render the HTML template
#     return render_template('html.html')

@app.route('/')
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

    # Return the data as JSON
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=False)





