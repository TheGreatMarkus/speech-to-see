require('dotenv').config({path:'./.env'});
const express = require('express');
const app = express();
const port = 1337;
const common_path = '/api';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

app.get(`${common_path}/hello`, (req, res) => {
    res.send('Hello World!');
});

/**
 * Expected request body:
 * {
 *    "speech": string
 * }
 * 
 * How to get string: res.body.speech
 * 
 * Promised response body:
 * 
 * TBD
 * 
 */
app.post(`${common_path}/get-voice-commands`, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    console.log("get-voice-commands endpoint called");

    let nlp = require('./services/nlp');

    nlp.processString(req.body.speech).then(response => {
        res.json(response);
    });
});

app.get(`${common_path}/get-image-url`, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    console.log("get-image-url endpoint called");

    let shutterstock = require('./services/shutterstock');

    shutterstock.searchImage(req.body.keyword).then(response => {
        res.json(response);
    }).catch((err) => {console.log(err)});
});
