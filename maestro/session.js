'use strict';

exports.get = (key,container,callback) => {

    const AWS = require('aws-sdk');
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    const cookies = this.getCookies(container);
    if (!cookies[key]) {
        callback(container, { valid: false });
        return;
    }
    const sid = cookies[key];
    const params = {
        TableName: process.env.SESSIONS_TABLE,
        Key: {
            sid: sid,
        },
    };
    dynamoDb.get(params, (error, result) => {
        // handle potential errors
        if (error) {
            callback(container, {
                valid : false,
                error : error
            }) ;
            return;
        }

        callback(container, {
            valid : !!result.Item.data,
            data : result.Item.data
        }) ;
    });
};

exports.set = function (key,data,container,callback) {
    const hat = require('hat');
    const cookie = require('cookie');
    const sessionId = hat();
    const newCookie = cookie.serialize(key, sessionId);
    const params = {
        TableName: process.env.SESSIONS_TABLE,
        Item: {
            sid: sessionId,
            data: data
        },
    };
    const AWS = require('aws-sdk');
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    dynamoDb.put(params, (error, result) => {
        // handle potential errors
        if (error) {
            callback({ valid: false, error : error });
            return;
        }
        container.response.headers['Set-Cookie'] = newCookie;
        callback(container, { valid: true });
    });
};

exports.destroy = function (key,container,callback) {
    //@TODO
};

exports.getCookies = function (container) {
    const cookie = require('cookie');
    const cookieStr = container.event.headers ? (container.event.headers.Cookie || '') : '';
    return cookie.parse(cookieStr);
};

