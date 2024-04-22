from matplotlib import pyplot as plt
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
# Database Setup
connection_string = "postgresql://postgres:postgres@localhost:5432/project 3"
engine = create_engine(connection_string)
Base = automap_base()
Base.prepare(engine, reflect=True)
NyWeatherDataSet = Base.classes.ny_weather_data_set
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
    return data

#precipitation over the seasons of decades 

# precipitation over the years spring
data = get_data()
precipitation = []
decades = []
decade_spring_averages = []
spring_months = ["03","04","05"]
for i in range(0, len(data), 3650):
    running_sum = 0
    end = len(data) if len(data)<i+3650 else i+3650
    for j in range(i, end):
        year,month,day = str(data[j]["Date"]).split("-")
        running_sum += data[j]["Precipitation"]
        if month in spring_months:
            precipitation.append(data[j]["Precipitation"])
            print(data[j]["Precipitation"])
    year,month,day = str(data[i]["Date"]).split("-")
    decades.append(year)
    decade_spring_averages.append(running_sum / 3650)
print(decade_spring_averages)
plt.plot(decades, decade_spring_averages) 
plt.xlabel("Year")
plt.ylabel("Average Precipitation")
plt.show()

# precipitation over the years summer
data = get_data()
precipitation = []
decades = []
decade_summer_averages = []
summer_months = ["06","07","08"]
for i in range(0, len(data), 3650):
    running_sum = 0
    end = len(data) if len(data)<i+3650 else i+3650
    for j in range(i, end):
        year,month,day = str(data[j]["Date"]).split("-")
        running_sum += data[j]["Precipitation"]
        if month in summer_months:
            precipitation.append(data[j]["Precipitation"])
            print(data[j]["Precipitation"])
    year,month,day = str(data[i]["Date"]).split("-")
    decades.append(year)
    decade_summer_averages.append(running_sum / 3650)
print(decade_summer_averages)
plt.plot(decades, decade_summer_averages) 
plt.xlabel("Year")
plt.ylabel("Average Precipitation")
plt.show()

# precipitation over the years fall
data = get_data()
precipitation = []
decades = []
decade_fall_averages = []
fall_months = ["09","10","11"]
for i in range(0, len(data), 3650):
    running_sum = 0
    end = len(data) if len(data)<i+3650 else i+3650
    for j in range(i, end):
        year,month,day = str(data[j]["Date"]).split("-")
        running_sum += data[j]["Precipitation"]
        if month in fall_months:
            precipitation.append(data[j]["Precipitation"])
            print(data[j]["Precipitation"])
    year,month,day = str(data[i]["Date"]).split("-")
    decades.append(year)
    decade_fall_averages.append(running_sum / 3650)
print(decade_fall_averages)
plt.plot(decades, decade_fall_averages) 
plt.xlabel("Year")
plt.ylabel("Average Precipitation")
plt.show()

# precipitation over the years winter
data = get_data()
precipitation = []
decades = []
decade_winter_averages = []
winter_months = ["12","01","02"]
for i in range(0, len(data), 3650):
    running_sum = 0
    end = len(data) if len(data)<i+3650 else i+3650
    for j in range(i, end):
        year,month,day = str(data[j]["Date"]).split("-")
        running_sum += data[j]["Precipitation"]
        if month in winter_months:
            precipitation.append(data[j]["Precipitation"])
            print(data[j]["Precipitation"])
    year,month,day = str(data[i]["Date"]).split("-")
    decades.append(year)
    decade_winter_averages.append(running_sum / 3650)
print(decade_winter_averages)
plt.plot(decades, decade_winter_averages) 
plt.xlabel("Year")
plt.ylabel("Average Precipitation")
plt.show()

# for entry in data:
#     year,month,day = str(entry["Date"]).split("-")
#     print(year,month,day)
#     if month in spring_months:
#         precipitation.append(entry["Precipitation"])
#         date.append(entry["Date"])
#         print(entry["Precipitation"])
# plt.plot(date, precipitation) 
# plt.xlabel("Year")
# plt.ylabel("Precipitation")
# plt.show()

# summer_months = ["06","07","08"]
# tmax = []
# for entry in data:
#     year,month,day = str(entry["Date"]).split("-")
#     print(year,month,day)
#     if month in summer_months:
#         tmax.append(entry["Maximum Temperature"])
#         date.append(entry["Date"])
#         print(entry["Maximum Temperature"])
# plt.bar(date, tmax) 
# plt.xlabel("Year")
# plt.ylabel("Average Maximum Temperature")
# plt.show()

# decade_averages = []
# for i in range(0, len(data), 3650):
#     running_sum = 0
#     end = len(data) if len(data)<i+3650 else i+3650
#     for j in range(i, end):
#         running_sum += data[j]["Maximum Temperature"]
#     decade_averages.append(running_sum / 3650)
# print(decade_averages)
# plt.plot(decade_averages) 
# plt.xlabel("Year")
# plt.ylabel("Average Maximum Temperature")
# plt.show()