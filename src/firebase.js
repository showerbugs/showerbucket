import firebaseLib from 'firebase'

const config = {
  apiKey: 'AIzaSyAlvdvSaAuHxTyAf9rSyQXf22lKUX-LFaw',
  authDomain: 'showerbucket-1a754.firebaseapp.com',
  databaseURL: 'https://showerbucket-1a754.firebaseio.com',
  projectId: 'showerbucket-1a754',
  storageBucket: 'showerbucket-1a754.appspot.com',
  messagingSenderId: '203690076097'
}

firebaseLib.initializeApp(config)

export const firebase = firebaseLib
