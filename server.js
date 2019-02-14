const express = require('express');
const config = require('./config.js');
const authenticator = require('./authenticator.js');
const fs = require('fs');
const path = require('path');
const classifications = require('./mocks/classifications.json');
const pps = require('./mocks/pps.json');
const sources = require('./mocks/sources.json');

const app = express();
const port = config.config.server.port;

if (config.config.authentication.required) {
    app.use(authenticator.Authenticator.initialize());
    app.use(authenticator.Authenticator.middleware);
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
    const filePath = path.join(__dirname, 'mocks', `${userName}.json`);

    if (fs.existsSync(filePath)) {
        return response.status(200).json(JSON.parse(fs.readFileSync(filePath, 'utf8')));
    }

    return response.status(200).json(null);
});

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
})