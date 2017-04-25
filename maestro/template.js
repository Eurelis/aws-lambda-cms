'use strict';

exports.render= function(file, view, container, callback) {

    const maestro = require('maestro/core');
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
            return maestro.route.fireError(container,500,err);
        }

        const content = handlebars.compile(data);

        container.response.body = content(view);
        callback(container);

    });
};