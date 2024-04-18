create table ny_weather_data_set (
	date date PRIMARY KEY,
	prcp float,
	snow float,
	sndw float,
	tmin INT,
	tmax INT
);

delete from ny_weather_data_set
where sndw IS NULL;

delete from ny_weather_data_set
where snow IS NULL;

alter table ny_weather_data_set
rename sndw to snwd; 

SELECT * 
FROM ny_weather_data_set;