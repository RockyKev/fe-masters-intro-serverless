const { query } = require("./util/hasura");

exports.handler = async (event, context) => {

    const { id, title, tagline, poster } = JSON.parse(event.body);
    const { user } = context.clientContext;

    const isLoggedIn = user && user.app_metadata;
    const roles = user.app_metadata.roles || [];

    if (!isLoggedIn || !roles.includes('admin')) {
        return {
            statusCode: 401,
            body: 'Unauthorized'
        }
    }

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