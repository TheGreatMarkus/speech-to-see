require('dotenv').config({ path: './.env' });
const express = require('express');
const app = express();
const port = 1337;
const common_path = '/api';
const cors = require('cors');

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
app.post(`${common_path}/voice-command`, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    console.log("get-voice-commands endpoint called");

    let nlp = require('./services/nlp');
    console.log("BODY");
    console.log(req.body);

    nlp.processString(req.body.speech).then(response => {
        console.log("response")
        res.json(response);
    }).catch(err => {
        console.log(err);
    });



});


app.get(`${common_path}/nlp-to-image`, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    console.log("get-image-url endpoint called");

    let nlpToImage = require('./services/nlpToImage');

    nlpToImage.nlpToImage(req.body.text).then(response => {
        res.json(response);
    }).catch((err) => { console.log(err) });
});
