create table ny_weather_data_set (
	id date PRIMARY KEY,
	prcp float,
	snow float,
	snwd float,
	tmin INT,
	tmax INT
);

select *
from ny_weather_data_set;

delete from ny_weather_data_set
where sndw IS NULL;

alter table ny_weather_data_set
rename sndw to snwd;

SELECT * FROM ny_weather_data_set

ALTER TABLE ny_weather_data_set
ADD COLUMN year INT,
ADD COLUMN month INT,
ADD COLUMN day INT;

UPDATE ny_weather_data_set
SET
    year = EXTRACT(YEAR FROM id),
    month = EXTRACT(MONTH FROM id),
    day = EXTRACT(DAY FROM id);
