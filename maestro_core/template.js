'use strict';

exports.render= function(file, view, container, callback) {

    const fs = require('fs');
    const handlebars = require("handlebars");
    const maestro_route = require('maestro_core/route');

    fs.readFile('template/'+file,'utf8', function (err,data) {

        if (err) {
            return maestro_route.fireError(container,500);
        }

        const content = handlebars.compile(data);
        const rendered = content(view);

        if(fs.existsSync('template/global.html')) {

            fs.readFile('template/global.html','utf8', function (err,data) {

                if (err) {
                    return maestro_route.fireError(container,500);
                }

                const template = handlebars.compile(data);

                container.response.body = template({'content':rendered});
                callback(container);
            });
        } else {
            container.response.body = rendered;
            callback(container);
        }
    });
};