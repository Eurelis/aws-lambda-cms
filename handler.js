'use strict';

const maestro = require('./maestro_core/core');

module.exports.index = (event, context, callback) => {
    maestro.execute(event, context, callback);
};