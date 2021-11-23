const { URL } = require('url'); // node-specific api
const fetch = require('node-fetch'); 

const movies = require('../data/movies.json');

// destructure the event element
exports.handler = async ({ queryStringParameters }) => {


    // http://localhost:8888/.netlify/functions/movie-by-id?id=tt2975590
    // should give us Batman v. Booperman

    const { id } = queryStringParameters;
    const movie = movies.find( (m) => m.id === id); 

    if (!movie) {
        return {
            statusCode: 404,
            body: 'Not Found'
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(movie)  
    }
}