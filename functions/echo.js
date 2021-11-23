exports.handler = async (event) => {

    // how to grab a query string
    // echo? text="Hello!"

    // netlify functions/aws 
    // azure/google functions... the syntax might be different

    console.log(event.queryStringParameters);
    console.log("HELLO")
    const { text } = event.queryStringParameters;

    // http://localhost:8888/.netlify/functions/echo?text=Hello!&one=1&two=2
    // { text: 'Hello!', one: '1', two: '2' }

    return {
        statusCode: 200,
        body: `You said: ${text}`
    }

}