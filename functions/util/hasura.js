const fetch = require('node-fetch');

async function query({ query, variables = {} }) {


    const result = await fetch(process.env.HASURA_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET
        },
        body: JSON.stringify( { query, variables }),    
    })
    .then( (response) => response.json());

    // TODO: in a production app, check if the query is correct and formed. Show helpful info. 
    // results.errors

    return result.data;
}

// named exports
exports.query = query;

