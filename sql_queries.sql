create table ny_weather_data_set (
	date date PRIMARY KEY,
	prcp float,
	snow float,
	snwd float,
	tmin INT,
	tmax INT
);

ALTER TABLE ny_weather_data_set
ADD COLUMN year INT,
ADD COLUMN month INT,
ADD COLUMN day INT;

UPDATE ny_weather_data_set
SET
    year = EXTRACT(YEAR FROM date),
    month = EXTRACT(MONTH FROM date),
    day = EXTRACT(DAY FROM date);