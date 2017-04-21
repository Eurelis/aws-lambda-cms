'use strict';

exports.match = function (container, callback) {
    const route = this.getRoute(container);

    /** Check if route exist **/
    if(!route) {
        return this.fireError(container,404,container.event.path);
    }

    /** check if is route is valid **/
    if(!this.checkRoute(route)) {
        return this.fireError(container,500,route);
    }

    container.current_route = route;
    callback(container);
};

exports.execute = function (container, callback) {
    const handler = require(container.current_route.handler);
    handler(container,function (container) {
        callback(container);
    });
};

exports.add = function () {
    //@TODO
};

/**
 * Check if handler of route exist
 * @param route
 * @returns {boolean}
 */
exports.checkRoute = function (route) {
    try {
        require.resolve(route.handler);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

/**
 * Check if route path exist
 * @param container
 * @returns {T}
 */
exports.getRoute = function (container) {
    return container.routes.find(function (route) {
        if (route.path.toLowerCase() === container.event.path.toLowerCase()
            && route.method.indexOf(container.event.httpMethod.toLowerCase())>=0) {
            return route;
        }
    });
};

exports.fireError = function (container, errorCode, err) {
    container.response.statusCode = errorCode;
    container.response.body = "<h1>"+errorCode+"</h1>";
    if(err) {
        console.log(err);
    }
    return container.lambda_callback(null, container.response);
};

exports.getPostData = function (container) {
    const qs = require('querystring');
    return qs.parse(container.event.body);
};