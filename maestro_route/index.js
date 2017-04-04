exports.match = function (container, callback) {

    const route = this.getRoute(container);
    console.log(container.event);
    if(!route) {
        container.response.statusCode = 404;
        container.response.body = "<h1>404</h1>";
        container.lambda_callback(null, container.response);
        return;
    }

    container.response.body = "ROUTE FOUND";
    callback(container);
};

exports.add = function () {
    //@TODO
};

exports.getRoute = function (container) {
    return container.routes.find(function (route) {
        if (route.path.toLowerCase() == container.event.path.toLowerCase()
            && route.method.toLowerCase() == container.event.httpMethod.toLowerCase()) {
            return route;
        }
    });
};