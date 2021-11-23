const { URL } = require("url"); // node-specific api
const fetch = require("node-fetch");
const { query } = require("./util/hasura");

// const movies = require("../data/movies.json");

exports.handler = async () => {
  const api = new URL("https://www.omdbapi.com/");


  // a GraphQL query
  const { movies } = await query({
    query: `
        query {
            movies {
                id
                poster
                tagline
                title
            }
        }      
    `,
  });

  // add secret API key to the query string
  api.searchParams.set("apikey", process.env.OMDB_API_KEY);

  // we make a call to ALL movies, and then wait for everything to come in with the Promise.all.
  // REF: https://www.learnwithjason.dev/blog/keep-async-await-from-blocking-execution/
  // if we awaited at the `return fetch()`, it would be movie, wait for call... movie wait for call. Will take longer.
  // by putting the promise at the beginning, it executes in parallel.

  const promises = movies.map((movie) => {
    // use the movie's IMDB ID to look up the details
    api.searchParams.set("i", movie.id);

    return fetch(api)
      .then((response) => response.json())
      .then((data) => {
        const scores = data.Ratings;

        return {
          ...movie,
          scores,
        };
      });
  });

  const moviesWithRatings = await Promise.all(promises);

  return {
    statusCode: 200,
    body: JSON.stringify(moviesWithRatings),
  };
};
