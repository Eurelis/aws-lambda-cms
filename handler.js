'use strict';

const maestro = require('./maestro/core');
const fs = require('fs');
module.exports.index = (event, context, callback) => {
    maestro.execute(event, context, callback);
};