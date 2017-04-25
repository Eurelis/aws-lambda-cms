'use strict';

const maestro = require('./maestro/core');

module.exports.index = (event, context, callback) => {
    maestro.execute(event, context, callback);
};