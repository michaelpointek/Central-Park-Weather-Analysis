#  Project 3 - New York Weather Analysis
- Group Members: Michael Pointek, Khali Baasandorj, Victoria Ro, Will Midson, Jordan Mayville
- Project Track: Data Visualization
## Overview and Purpose
- Our primary goal was to examine the climate shift in Central Park over the past 154 years. We made a decision to exclude data related to snow accumulation as this was not tracked or available until 1912 so we felt it would not be a fair or accurate representation compared to the entire dataset. Through our research and analysis, we aimed to uncover trends and patterns that could provide valuable insights into the impacts of climate change. 
## Visuals: 
<img width="631" alt="Screen Shot 2024-04-25 at 7 31 51 PM" src="https://github.com/michaelpointek/project3/assets/57199813/af99290a-d797-48b0-b582-9f8c5807e5ea">

### Visual 1 - Annual Average Minimum and Maximum Temperatures
 - Using the drop down tab, the user can chose to view either the average minimum temperature graph or the average maximum temperature graph. Each graph shows the average minimum/maximum temperatures for each year over a 154 year period. 
 
### Visual 2 - Average Seasonal Weather Phenomena 
 - This visual shows seasonal data revolving around different weather phenomena. The user can select the check boxes on the right hand side to view the data for one, two, three, or all four seasons. They may then select from the list of weather phenomena they want to view on the plot (average precipitation, average snowfall, average minimum temp, average maximum temp). The graph then plots the data with each colored line representing the data for the weather phenomena of choice for the selected season(s). 

<img width="602" alt="Screen Shot 2024-04-25 at 7 32 28 PM" src="https://github.com/michaelpointek/project3/assets/57199813/bc2b0d45-9e84-41de-9cbf-fe08a1b74c34">

### Visual 3 - Min/Max Temperature by Month: Interactive Popup
 - User selects a month from the dropdown menu and then inputs a year (1912-2023). A popup will then show the minimum and maximum temperature days for that month in that year. The visual allows the user to narrow down min/max temperature data to a specific month, providing a closer look at temperature extremes. 

<img width="838" alt="Screen Shot 2024-04-25 at 7 32 40 PM" src="https://github.com/michaelpointek/project3/assets/57199813/6235a3af-cd37-4cdf-96f7-7c39a144b1e2">

### Visual 4 - Comparison of Maximum Temperatures for Two Selected Decades
 - Users can select two distinct decades between 1870 and 2010 using dropdown menus. Utilizing the Chart.js library, a dynamic radar chart vividly illustrates the disparities in average temperatures across the four seasons (winter, spring, summer, fall) between the two chosen decades. This intuitive visualization empowers users to directly compare the average maximum temperature data from two different time periods, facilitating deeper insights into historical climate trends. 

## Efforts and Ethical Considerations 
Our dataset consists of weather observations collected by the National Weather Service, with records dating back to 1869 in Central Park. Since 1920, measurements have been taken at Belvedere Castle by an automated station. While most data is consistently recorded, snow accumulation data, which began in 1912, is excluded from our analysis due to potential inconsistencies. Although the station is automated, snowfall measurements were manually taken with a ruler, which could have varied in different parts of the city. As the data is collected from a single station, it's possible that nearby weather variations may affect its accuracy slightly. Factors such as urbanization and population growth could influence temperature readings. We've strived for accuracy by excluding less reliable factors from our analysis, ensuring the dataset's accountability while maintaining a focus on the most accurate data available.

## References 
- Original data source: https://www.kaggle.com/datasets/danbraswell/new-york-city-weather-18692022/data
- https://www.chartjs.org/
- ChatGPT and additonal AI tools assisted in some of the code.

## Contributions
Will - Created flask route to access min/max temperature data + java script and html to create a functioning popup (visualization)
