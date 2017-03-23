'use strict';
const maestro_session = require('./maestro_session/index');
const maestro_route = require('./maestro_route/index');
const routes = require('./maestro_config/routes.json');

module.exports.index = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: '',
        headers: {
            'Content-Type': 'text/html',
        }
    };
    let container = {};
    container.routes = routes;
    container.event = event;
    container.response = response;
    maestro_session.start( container,function (container) {
        maestro_route.match(container, function (container) {
            callback(null, container.response);
        });
    });

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};


