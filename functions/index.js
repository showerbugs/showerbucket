const functions = require('firebase-functions');
const fetch = require('node-fetch');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
var links = {}
admin.database().ref('/links').on('value', (snapshot) => {
    links = snapshot.val()
})

function getHashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
      hash = ~~(((hash << 5) - hash) + str.charCodeAt(i));
  }
  return (hash + 2147483647) + 1;
}

exports.preview = functions.https.onRequest((req, res) => {
  var result = {};
  const url = req.query.url
  const hashUrl = getHashCode(url)
// && new Date().getTime() - parseInt(links[hashUrl].updatedAt, 10) < (24*60*60*1000)
  // if(links[hashUrl]) {
  //   result = links[hashUrl]
  //   return cors(req, res, () => {
  //     res.setHeader('Content-Type', 'application/json')
  //     res.status(200).send(JSON.stringify(result))
  //   })
  // } else {
    return fetch(`http://ec2-13-124-65-213.ap-northeast-2.compute.amazonaws.com:9090?url=${url}`).then(res2 => res2.json()).then(json => {
      console.log(json);
      result = json;
      result.updatedAt = admin.database.ServerValue.TIMESTAMP
      result.url = url
      return cors(req, res, () => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send(JSON.stringify(result))
        return admin.database().ref('/links/' + hashUrl).set(result)
      })
    }).catch(err => console.log(err))
  // }

});
