'use strict';

exports.execute= function(event, context, callback) {

    const maestro_route = require('maestro/route');
    const routes = require('config/routes.json');

    const response = {
        statusCode: 200,
        body: '',
        headers: {
            'Content-Type': 'text/html',
        }
    };
    /**
     * Construct Container
     */
    let container = {};
    container.routes = routes;
    container.event = event;
    container.response = response;
    container.lambda_callback = callback;

    /**
     * Check route and execute
     */
    maestro_route.match(container, function (container) {
        maestro_route.execute(container, function (container) {
            callback(null, container.response);
        });
    });
};