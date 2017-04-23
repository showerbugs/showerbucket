// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from 'firebase'
import VueFire from 'vuefire'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAlvdvSaAuHxTyAf9rSyQXf22lKUX-LFaw",
  authDomain: "showerbucket-1a754.firebaseapp.com",
  databaseURL: "https://showerbucket-1a754.firebaseio.com",
  projectId: "showerbucket-1a754",
  storageBucket: "showerbucket-1a754.appspot.com",
  messagingSenderId: "203690076097"
};
firebase.initializeApp(config);

Vue.config.productionTip = false
Vue.use(VueFire)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  firebase: {
    googleProvider: function () {
      return new firebase.auth.GoogleAuthProvider()
    }
  }
})
