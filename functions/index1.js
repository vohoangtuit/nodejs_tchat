const functions = require('firebase-functions');
const expresss = require('express');
const app = expresss();
app.get('/timestamp',(request,response)=>{//https://tchat-526d5.firebaseapp.com/timestamp
    response.send(`${Date.now()}`);
});
app.get('/timestamp-cached',(request,response)=>{
    response,set('Cache-Control','public,max-age=300,s-maxage=600');
    response.send(`${Date.now()}`);
});
app.get('/hello',(request,response)=>{//https://tchat-526d5.firebaseapp.com/hello
    response.send('Welcome to TChat');
});

exports.app = functions.https.onRequest(app);
//todo url on web : https://tchat-526d5.firebaseapp.com/

