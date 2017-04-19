'use strict';

const maestro_route = require('maestro_core/route');
const maestro_session = require('maestro_core/session');
const maestro_template = require('maestro_core/template');

module.exports = (container, callback) => {

    let view = {};
    view.isLogged = false;

    maestro_session.get('current_user',container,function (container,data) {

        if(data.valid) {
            view.username = data.data;
            view.isLogged = true;
            maestro_template.render('login.html',view,container,callback);
        } else if(container.event.httpMethod.toLowerCase()==='post') {
            const formData = maestro_route.getPostData(container);
            if(formData.username) {
                maestro_session.set('current_user',formData.username,container,function (container,data) {
                    if(data.valid) {
                        view.username = formData.username;
                        view.isLogged = true;
                        maestro_template.render('login.html',view,container,callback);
                    } else {
                        return maestro_route.fireError(container,500);
                    }
                });
            }
        } else {
            maestro_template.render('login.html',view,container,callback);
        }
    });
};