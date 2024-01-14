exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;

    const authString = 'Basic cm9pOnJsMTIzNDU2';  

    if (typeof headers.authorization == 'undefined' || headers.authorization[0].value != authString) {
        const response = {
            status: '401',
            statusDescription: 'Unauthorized',
            body: 'Unauthorized',
            headers: {
                'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic' }]
            },
        };
        callback(null, response);
        return;
    }

    callback(null, request);
};

const encoded = new Buffer('roi:rl123456').toString('base64');
console.log(encoded);
