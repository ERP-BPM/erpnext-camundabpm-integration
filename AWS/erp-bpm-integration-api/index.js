// Copyright (c) Alex Ellis 2021. All rights reserved.
// Copyright (c) OpenFaaS Author(s) 2021. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict"

const express = require('express')
const app = express()
const handler = require('./start-process/handler');
const bodyParser = require('body-parser')
const { sendMessage } = require('./middleware/sm-middleware')
const { startProcess } = require('./middleware/sp-middleware')
var cors = require('cors')

const defaultMaxSize = '100kb' // body-parser default

app.disable('x-powered-by');
app.use(cors())

const rawLimit = process.env.MAX_RAW_SIZE || defaultMaxSize
const jsonLimit = process.env.MAX_JSON_SIZE || defaultMaxSize

app.use(function addDefaultContentType(req, res, next) {
    // When no content-type is given, the body element is set to 
    // nil, and has been a source of contention for new users.

    if (!req.headers['content-type']) {
        req.headers['content-type'] = "text/plain"
    }
    next()
})

if (process.env.RAW_BODY === 'true') {
    app.use(bodyParser.raw({ type: '*/*', limit: rawLimit }))
} else {
    app.use(bodyParser.text({ type: "text/*" }));
    app.use(bodyParser.json({ limit: jsonLimit }));
    app.use(bodyParser.urlencoded({ extended: true }));
}

const isArray = (a) => {
    return (!!a) && (a.constructor === Array);
};

const isObject = (a) => {
    return (!!a) && (a.constructor === Object);
};

class FunctionEvent {
    constructor(req) {
        this.body = req.body;
        this.headers = req.headers;
        this.method = req.method;
        this.query = req.query;
        this.path = req.path;
    }
}

class FunctionContext {
    constructor(cb) {
        this.statusCode = 200;
        this.cb = cb;
        this.headerValues = {};
        this.cbCalled = 0;
    }

    status(statusCode) {
        if (!statusCode) {
            return this.statusCode;
        }

        this.statusCode = statusCode;
        return this;
    }

    headers(value) {
        if (!value) {
            return this.headerValues;
        }

        this.headerValues = value;
        return this;
    }

    succeed(value) {
        let err;
        this.cbCalled++;
        this.cb(err, value);
    }

    fail(value) {
        let message;
        if (this.status() == "200") {
            this.status(500)
        }

        this.cbCalled++;
        this.cb(value, message);
    }
}



app.post('/start', startProcess);
app.post('/send', sendMessage);

/*
app.get('/*', middleware);
app.patch('/*', middleware);
app.put('/*', middleware);
app.delete('/*', middleware);
app.options('/*', middleware)
*/;

const port = process.env.http_port || 3000;

app.listen(port, () => {
    console.log(`node14 listening on port: ${port}`)
});


