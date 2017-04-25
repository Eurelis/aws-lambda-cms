'use strict';

exports.route = require('maestro/route');
exports.template = require('maestro/template');
exports.session = require('maestro/session');

exports.execute = function(event, context, callback) {

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
    container.session = {};
    container.event = event;
    container.response = response;
    container.lambda_callback = callback;


    exports.route.match(container, function (container) { // check route
        exports.getSession(container, function (container) { // get maestro session
            exports.route.execute(container, function (container) { // execute route
                exports.setSession(container,function (container) { // set session before final callback
                    callback(null, container.response);
                });
            });
        });
    });
};

exports.getSession = function (container,callback) {
    exports.session.get('maestro',container,function (container,data) {
        if(data.valid) {
            container.session = data.data ;
        }
        callback(container);
    });
};

exports.setSession = function (container, callback) {
    exports.session.set('maestro',container.session,container, function(container, data){
        callback(container);
    });
};