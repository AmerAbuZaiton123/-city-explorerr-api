'use strict';

let axios = require('axios');
let cachmem2 = {};

function handelWeather(req, res) {

    let cityName = req.query.searchQuery;

    let weatherData;
    if (cachmem2[cityName] !== undefined) {

        res.send(cachmem2[cityName]);
    }else{

        try {

            let weatherLink = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${cityName}`;

            axios.get(weatherLink).then(weatherDataArr => {
                weatherData = weatherDataArr.data.data.map(item => {
                    return new Forecast(item.datetime, item.weather.description);
                });
                cachmem2[cityName] = weatherData;

                res.send(weatherData);

            });
        }
        catch (error) {

            res.status(500).send('Error in getting the city', error);

        }
    }

    }





// Classes

class Forecast {

    constructor(date, description) {

        this.date = date;

        this.description = description;

    }

}



module.exports = handelWeather;