// servless functions how to deal with incoming requests.
// and you do that with a handler

exports.handler = async () => {
    return {
        statusCode: 200,
        body: 'Boop!',
    }
}


