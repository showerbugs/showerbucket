<template>
  <div>
    <v-text-field v-model="bucket" @keyup.enter.native.stop="addBucket" label="Add your new bucket"></v-text-field>
    <v-list two-line subheader>
      <app-bucket :open-delete-dialog="openDeleteDialog" :key="bucket['.key']" :bucket="bucket" :user="user" v-for="bucket in userBuckets"></app-bucket>
    </v-list>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-row>
          <v-card-title>Are you sure you want to delete {{ bucket.name }}?</v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text>Links included in the bucket will also be deleted.</v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="deleteBucket">Agree</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
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
      dialog: false
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
    openDeleteDialog(bucketName, bucketKey) {
      this.dialog = true
      this.deleteBucketKey = bucketKey
    },
    deleteBucket() {
      if(!this.deleteBucketKey) return

      const bucketKey = this.deleteBucketKey
      this.deleteBucketKey = null
      this.dialog = false
      db.ref(`/buckets/${bucketKey}`).remove()
      db.ref(`/user-buckets/${this.user.uid}/${bucketKey}`).remove()
      db.ref(`bucket-links/${bucketKey}`).remove()
    },
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
