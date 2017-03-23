exports.start = function(container,callback) {
    container.response.body = container.response.body + " Maestro Session UP";
    callback(container);
};

exports.set = function () {
    //@TODO
};

exports.destroy = function () {
    //@TODO
};