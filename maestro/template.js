'use strict';

exports.render= function(file, view, container, callback) {

    const maestro_route = require('maestro/route');
    const fs = require('fs');
    const handlebars = require("handlebars");
    const handlebars_layout = require("handlebars-layouts");
    handlebars.registerHelper(handlebars_layout(handlebars));

    fs.readFile('template/'+file,'utf8', function (err,data) {

        /**
         * Automatically load partial
         */

        const reg = new RegExp('\\{\\{#extend\\s+"([^"]+)"','g');
        let result;
        let count = 0;
         while((result = reg.exec(data)) !== null) {
             handlebars.registerPartial(result[1], fs.readFileSync('template/'+result[1]+'.html', 'utf8'));
             count++;
             if(count >= 100) {
                 break;
             }
        }

        if (err) {
            return maestro_route.fireError(container,500,err);
        }

        const content = handlebars.compile(data);

        container.response.body = content(view);
        callback(container);

        //
        // if(fs.existsSync('template/global.html')) {
        //
        //     fs.readFile('template/global.html','utf8', function (err,data) {
        //
        //         if (err) {
        //             return maestro_route.fireError(container,500);
        //         }
        //
        //         const template = handlebars.compile(data);
        //
        //         container.response.body = template({'content':rendered});
        //         callback(container);
        //     });
        // } else {
        //     container.response.body = rendered;
        //     callback(container);
        // }
    });
};