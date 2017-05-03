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
      <option v-for="bucket in userBuckets" :value="bucket">{{ bucket.name }}</option>
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
import { firebase } from './firebase'

let db = firebase.database()

export default {
  data() {
    return {
      user: null,
      bucket: '',
      selectedBucket: null,
      link: ''
    }
  },
  firebase() {
    return {
      userBuckets: {
        source: db.ref('user-buckets'),
        readyCallback() {
          if(this.userBuckets.length > 0) {
            this.selectedBucket = this.userBuckets[0]
            this.bucketChanged()
          }
        }
      },
      links: db.ref('links')
    }
  },
  methods: {
    loginGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then((result) => {
        var token = result.credential.accessToken
        this.user = result.user
      }).catch((error) => {
        console.log(error)
      });
    },
    logout() {
      firebase.auth().signOut().then(() => {
        this.user = null
      }).catch((error) => {
        console.log(error)
      });
    },
    addBucket() {
      if(this.bucket === '') return

      let bucket = {
        name: this.bucket,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
      }
      const bucketKey = db.ref().child('buckets').push().key

      let updates = {}
      updates[`/buckets/${bucketKey}`] = bucket
      updates[`/user-buckets/${this.user.uid}/${bucketKey}`] = bucket

      db.ref().update(updates).catch((error) => {})

      this.bucket = ''
    },
    bucketChanged() {
      this.$bindAsArray('links', db.ref(`links/${this.selectedBucket['.key']}`))
    },
    addLink() {
      if(this.link === '') return

      this.$firebaseRefs.links.push({
        link: this.link,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
      })

      this.link = ''
    }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user

      if (user) {
        this.$bindAsArray('userBuckets', db.ref(`user-buckets/${this.user.uid}`))
      }
    });
  }
}
</script>

<style>
</style>
