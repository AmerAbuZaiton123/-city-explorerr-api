'use strict';
let axios = require('axios');
let cachemem = {};

function movieHandler(req, res) {

    let cityName = req.query.searchQuery;
    let movieData;
    if (cachemem[cityName] !== undefined) {

        res.send(cachemem[cityName]);
    } else {

        try {

            let movieLink = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}&page=1`;

            axios.get(movieLink).then(movieDataArr => {
                movieData = movieDataArr.data.results.map(item => {
                    return new Movieforcast(item);
                });
                cachemem[cityName.toL] = movieData;
                res.send(movieData);
            });
        }
        catch (error) {
            res.status(500).send('Error in getting the city', error);
        }
    }
}
class Movieforcast {

    constructor(item) {

        this.name = item.title;

        this.image = item.poster_path;

    }

}



module.exports = movieHandler;