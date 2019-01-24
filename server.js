const express = require('express');
const config = require("./config.js");
const authenticator = require("./authenticator.js");

const userA = require('./mocks/userA.json');
const userB = require('./mocks/userB.json');
const userC = require('./mocks/userC.json');
const userD = require('./mocks/userD.json');
const classifications = require('./mocks/classifications.json');
const pps = require('./mocks/pps.json');
const sources = require('./mocks/sources.json');

const app = express();
const port = config.config.server.port;

if (config.config.authentication.required) {
    this.app.use(authenticator.Authenticator.initialize());
    this.app.use(authenticator.Authenticator.middleware);
}

app.get('/classificationservice/api/classifications', (request, response) => {
    return response.json(classifications);
})

app.get('/classificationservice/api/sources', (request, response) => {
    return response.json(sources);
})

app.get('/classificationservice/api/pps', (request, response) => {
    return response.json(pps);
})

app.get('/classificationservice/api/userPermissions', (request, response) => {
    const userName = request.query.userName;

    switch (userName) {
        case 'a@none': {
            return response.status(200).json(userA);
        }
        case 'b@little': {
            return response.status(200).json(userB);
        }
        case 'c@moreThenLittle': {
            return response.status(200).json(userC);
        }
        case 'd@aLot': {
            return response.status(200).json(userD);
        }
        default: {
            return response.status(200).json(null);
        }
    }
})

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log(`classification mocks server is listening on ${port}`)
})