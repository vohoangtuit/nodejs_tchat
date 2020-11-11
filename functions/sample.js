const {Firestore} = require('@google-cloud/firestore');
const express = require('express');
const session = require('express-session');
const apps = express();
const functions = require('firebase-functions');
 
const {FirestoreStore} = require('@google-cloud/connect-firestore');
 
apps.use(
  session({
    store: new FirestoreStore({
      dataset: new Firestore(),
      kind: 'express-sessions',
    }),
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
  })
);
 
apps.get('/', (req, res) => {
  if (!req.session.views) {
    req.session.views = 0;
  }
  const views = req.session.views++;
  res.send(`Views ${views}`);
});
 
apps.listen(4830, () => {
  console.log('Example app listening on port 4830!');
});
apps.get('/hello',(request,response)=>{
    response.send('Hello word');
});
