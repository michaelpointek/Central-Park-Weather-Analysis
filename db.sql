create table ny_weather_data_set (
	id date PRIMARY KEY,
	prcp float,
	snow float,
	sndw float,
	tmin INT,
	tmax INT
);

select *
from ny_weather_data_set;

delete from ny_weather_data_set
where sndw IS NULL;

alter table ny_weather_data_set
rename sndw to snwd;