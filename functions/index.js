
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
app.get('/api/getall', (req, res) => {//https://tchat-526d5.firebaseapp.com/api/getall
    (async () => {
        try {
            let query = db.collection('users');
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        item: doc.data().item
                    };
                    response.push(selectedItem);
                }
                return response;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
  exports.app = functions.https.onRequest(app);
  // firebase serve --only functions,hosting