'use strict';

const maestro_route = require('maestro/route');
const maestro_session = require('maestro/session');
const maestro_template = require('maestro/template');

module.exports = (container, callback) => {

    let view = {};
    view.title = "Page Index";
    view.name = "Julien";

    maestro_template.render('index.html',view,container,callback);

    // maestro_session.get('current_user',container,function (container,data) {
    //
    //     if(data.valid) {
    //         view.username = data.data;
    //         view.isLogged = true;
    //         maestro_template.render('login.html',view,container,callback);
    //     } else if(container.event.httpMethod.toLowerCase()==='post') {
    //         const formData = maestro_route.getPostData(container);
    //         if(formData.username) {
    //             maestro_session.set('current_user',formData.username,container,function (container,data) {
    //                 if(data.valid) {
    //                     view.username = formData.username;
    //                     view.isLogged = true;
    //
    //                 } else {
    //                     return maestro_route.fireError(container,500);
    //                 }
    //             });
    //         }
    //     } else {
    //         maestro_template.render('login.html',view,container,callback);
    //     }
    // });
};