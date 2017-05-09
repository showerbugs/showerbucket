<template>
  <div>
    <input v-model="bucket" @keyup.enter="addBucket">
    <ul>
      <app-bucket :key="bucket['.key']" :bucket="bucket" v-for="bucket in userBuckets"></app-bucket>
    </ul>
  </div>
</template>

<script>
import { firebase } from '../firebase'
import appBucket from './Bucket'

const db = firebase.database()

export default {
  components: {
    appBucket
  },
  data() {
    return {
      user: null,
      bucket: '',
    }
  },
  firebase() {
    return {
      userBuckets: {
        source: db.ref('user-buckets')
      }
    }
  },
  methods: {
    addBucket() {
      if (this.bucket === '') return

      const bucket = {
        name: this.bucket,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
      }
      const bucketKey = db.ref().child('buckets').push().key

      let updates = {}
      updates[`/buckets/${bucketKey}`] = bucket
      updates[`/user-buckets/${this.user.uid}/${bucketKey}`] = bucket

      db.ref().update(updates).catch((error) => {console.log(error)})
      this.bucket = ''
    },
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user

      if (user) {
        this.$bindAsArray('userBuckets', db.ref(`user-buckets/${this.user.uid}`))
      }
    })
  }
}
</script>
