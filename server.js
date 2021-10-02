'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const weather = require('./Modules/Weather.js');
const movies = require('./Modules/Movies.js')
const PORT = process.env.PORT;
// let wData= [];
// let weatherObj=[];

app.use(cors());

// let getWeather =  (req , res) =>{
//   // let {lat , lon , searchQuery} = req.query;
//   const lat = req.query.lat;
//   const lon = req.query.lon;
//   const searchQuery = req.query.searchQuery;


//   (lat && lon && searchQuery) ? (wData = weather.find(
//     data => {
//       return data.city_name === searchQuery;

//     }
//   ),
//   weatherObj =wData.data.map(
//     data => new Forecast(data.valid_date , data.weather.description)
//   ),
//   res.status(200).json(weatherObj)
//   )
//     :
//     res.status(500).send(' error ');
// };

// class Forecast {
//   constructor(date , desc){
//     this.date = date ,
//     this.desc = desc;
//   }
// }
app.get('/weather' , weather);
app.get('/movie',movies);
app.listen(PORT , ()=> console.log('server port '+PORT));
