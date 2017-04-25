'use strict';

const maestro = require('maestro/core');

module.exports = (container, callback) => {

    let view = {};
    view.title = "Title";
    if(container.session.hasOwnProperty('name')) {
        view.name = container.session.name;
    } else {
        view.name = "Robert";
        container.session.name = "Robert";
    }


    maestro.template.render('index.html',view,container,callback);
};