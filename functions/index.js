const functions = require('firebase-functions');
const expresss = require('express');
const app = expresss();
app.get('/timestamp',(request,response)=>{
    response.send(`${Date.now()}`);
});
app.get('/timestamp-cached',(request,response)=>{
    response,set('Cache-Control','public,max-age=300,s-maxage=600');
    response.send(`${Date.now()}`);
});


exports.app = functions.https.onRequest(app);
//todo url on web : https://tchat-526d5.firebaseapp.com/timestamp

