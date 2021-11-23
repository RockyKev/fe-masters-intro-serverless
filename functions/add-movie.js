const { query } = require("./util/hasura");

exports.handler = async (event) => {

    console.log(event);

    const { id, title, tagline, poster } = JSON.parse(event.body);


    const result = await query({
        // the String! is a GraphQL 'required' query.
        query: `
            mutation ($poster: String!, $tagline: String!, $title: String!, $id: String!) {
                insert_movies_one(object: {poster: $poster, tagline: $tagline, title: $title, id: $id}) {
                id
                }
            }        
        `,
        variables: { id, title, tagline, poster }
    })
    


    // just so it doesn't time out
    return {
        statusCode: 200,
        body: JSON.stringify(result)
    }
}