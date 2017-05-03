<template>
  <div id="app">
    <nav>
      <h1>Shower Bucket</h1>
      <div v-if="user">
        <span>{{ user.displayName }}({{ user.email }})</span>
        <button @click="logout">logout</button>
      </div>
      <button @click="loginGoogle" v-else>login with google</button>
    </nav>

    <hr>

    <input v-model="bucket" @keyup.enter="addBucket">
    <select v-model="selectedBucket" @change="bucketChanged">
      <option v-for="bucket in buckets" :value="bucket">{{ bucket.name }}</option>
    </select>

    <hr>

    <h3>{{ bucket.name }}</h3>
    <input v-model="link" @keyup.enter="addLink">
    <ul>
      <li v-for="link in links">{{ link.link }}</li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyAlvdvSaAuHxTyAf9rSyQXf22lKUX-LFaw",
  authDomain: "showerbucket-1a754.firebaseapp.com",
  databaseURL: "https://showerbucket-1a754.firebaseio.com",
  projectId: "showerbucket-1a754",
  storageBucket: "showerbucket-1a754.appspot.com",
  messagingSenderId: "203690076097"
};

var db = firebase.initializeApp(config).database()

export default {
  data() {
    return {
      bucket: '',
      link: '',
      user: null,
      selectedBucket: null,
    }
  },
  firebase() {
    return {
      links: db.ref(),
      buckets: {
        source: db.ref('buckets'),
        readyCallback(){
          if(this.buckets.length > 0)
            this.selectedBucket = this.buckets[0]
        },
      },
    }
  },
  methods: {
    addBucket() {
      if(this.bucket === '') return
      this.$firebaseRefs.buckets.push({
        name: this.bucket,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
      })
      this.bucket = ''
    },
    addLink() {
      if(this.link === '') return
      this.$firebaseRefs.links.push({
        link: this.link,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
      })
      this.link = ''
    },
    selectBucket(){
      this.$bindLinks('links', db.ref('buckets/' + this.bucket['.key']))
    },
    loginGoogle(){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        var token = result.credential.accessToken
        this.user = result.user
        console.log(result)
      }).catch(function(error)  {
        console.log(error)
      });
    },
    logout(){
      firebase.auth().signOut().then(() => {
        this.user = null
      }, function(error) {
      });
    },
    bucketChanged(){
      alert(this.selectedBucket.name + ', ' + this.selectedBucket['.key'])
    }
  },
  beforeCreate(){
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user
    });
  }
}
</script>

<style>
</style>
