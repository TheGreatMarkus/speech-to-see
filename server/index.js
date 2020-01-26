require('dotenv').config({ path: './.env' });
const express = require('express');
const app = express();
const port = 1337;
const common_path = '/api';
const cors = require('cors');

app.use(cors());
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
    console.log("voice-command endpoint called");
    console.log(`body: ${JSON.stringify(req.body)}`);

    let nlp = require('./services/nlp');


    nlp.processString(req.body.speech).then(response => {
        res.json(response);
    }).catch(err => {
        console.log(err);
    });



});
