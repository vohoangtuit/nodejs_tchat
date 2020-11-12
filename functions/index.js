
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tchat-526d5.firebaseio.com"
  });
  
  const db = admin.firestore();
  const docRef = db.collection('users').doc('duy');
 // create
app.post('/api/create-user', (req, res) => {//https://tchat-526d5.firebaseapp.com/api/create-user
    (async () => {
        try {
            await docRef.set({
                first: 'Vo Hoang',
                last: 'Duy',
                born: 2009
              });
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  });
  // read all
app.get('/api/users', (req, res) => {//https://tchat-526d5.firebaseapp.com/api/users
    var allUsers = [];
    (async () => {
        return admin.auth().listUsers()
        .then(listUsersResult=> {
            listUsersResult.users.forEach(userRecord=> {
                // For each user
                var userData = userRecord.toJSON();
                allUsers.push(userData);
            });
           
           // res.status(200).send({users:JSON.stringify(allUsers)});
            res.status(200).send({success:true,users:allUsers});
            return null;// add return when deploy to firebase
        })
        .catch(function (error) {
            console.log("Error listing users:", error);
            res.status(500).send(error);
        });

        })();
    });
  exports.app = functions.https.onRequest(app);
  
  
  
  // firebase serve --only functions,hosting : start server run postman local
  // todo: https://indepth.dev/building-an-api-with-firebase/