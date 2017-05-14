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


exports.preview = functions.https.onRequest((req, res) => {
  const url = req.query.url;
  const mock = {
    Title: "Python Slack 봇 개발 및 CI 연동 삽질기",
    Description: "작년 11월, 구글 번역 서비스가 신경망 학습을 적용해서 개편되었다. (관련기사) 벌써 서너달이 지난 일이지만, 현재까지도 웹에서 아티클이나 문서를 읽을 때 구글 번역 크롬 익스텐션의 도움을 많이 받고 있다.",
    Images: ["https://qodot.github.io/image/google-translate-test.png"]
  }
  cors(req, res, () => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(mock));
  });
  // Grab the text parameter.
  // const url = req.query.url;
  // fetch('http://headers.jsontest.com?url='+ url).then(function(res2) {
  //   console.log(res2.json());
  //   res.status(200).send(res2.json());
  // });
// what you want with response

  // // Push it into the Realtime Database then send a response
  // admin.database().ref('/links').push({original: original}).then(snapshot => {
  //   // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  //   res.redirect(303, snapshot.ref);
  // });
});
