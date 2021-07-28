const express = require('express');
const dotenv = require('dotenv')
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NLUV1 = require('ibm-watson/natural-language-understanding/v1');
    const {IamAuthenticator} = require('ibm-watson/auth');

    const nlu =  new NLUV1({
        version:'2020-08-01',
        authenticator:new IamAuthenticator({apikey:api_key}),
        serviceUrl:api_url
    });

    return nlu;

}



const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const nluservice = getNLUInstance();
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': {
            'emotion': true,
            'sentiment': false,
            'limit': 2,
            },
            'keywords': {
            'emotion': true,
            'sentiment': false,
            'limit': 2,
            },
        },
    };
    
    nluservice.analyze(analyzeParams)
        .then(analysisResults => {
            res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            res.send('error:', err);
        });

    //return res.send(emresponse);
});

app.get("/url/sentiment", (req,res) => {
    const nluservice = getNLUInstance();
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': {
            'emotion': false,
            'sentiment': true,
            'limit': 2,
            },
            'keywords': {
            'emotion': false,
            'sentiment': true,
            'limit': 2,
            },
        },
    };
    
    nluservice.analyze(analyzeParams)
        .then(analysisResults => {
            res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            res.send('error:', err);
        });
    //return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    //return res.send({"happy":"10","sad":"90"});
    const nluservice = getNLUInstance();
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'entities': {
            'emotion': true,
            'sentiment': false,
            'limit': 2,
            },
            'keywords': {
            'emotion': true,
            'sentiment': false,
            'limit': 2,
            },
        },
    };
    
    nluservice.analyze(analyzeParams)
        .then(analysisResults => {
            res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            res.send('error:', err);
        });
});

app.get("/text/sentiment", (req,res) => {
    const nluservice = getNLUInstance();
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'entities': {
            'emotion': true,
            'sentiment': false,
            'limit': 2,
            },
            'keywords': {
            'emotion': true,
            'sentiment': false,
            'limit': 2,
            },
        },
    };
    
    nluservice.analyze(analyzeParams)
        .then(analysisResults => {
            res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            res.send('error:', err);
        });
    //return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8282, () => {
    console.log('Listening', server.address().port)
})

