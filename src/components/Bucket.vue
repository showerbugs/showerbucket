<template>
  <li>
    <router-link v-if="!isEdit" :to="{name: 'links', params: {bucketId: bucket['.key']}}" tag="a">{{ bucket.name }}</router-link>
    <button v-if="!isEdit" @click="enableEdit">Edit</button>

    <input v-if="isEdit" v-model="newBucketName" @keyup.enter="editBucket">
    <button v-if="isEdit" @click="editBucket">OK</button>
    <button v-if="isEdit" @click="disableEdit">Cancel</button>

    <button @click="deleteBucket">Delete</button>
  </li>
</template>

<script>
import { firebase } from '../firebase'

const db = firebase.database()

export default {
  props: ['bucket', 'user'],
  data() {
    return {
      isEdit: false,
      newBucketName: null
    }
  },
  methods: {
    enableEdit() {
      this.isEdit = true
      this.newBucketName = this.bucket.name
    },
    disableEdit() {
      this.isEdit = false
    },
    editBucket() {
      const bucket = {
        name: this.newBucketName,
        createdAt: this.bucket.createdAt,
        updatedAt: firebase.database.ServerValue.TIMESTAMP
      }

      let updates = {}
      updates[`/buckets/${this.bucket['.key']}`] = bucket
      updates[`/user-buckets/${this.user.uid}/${this.bucket['.key']}`] = bucket

      db.ref().update(updates).catch((error) => {console.log(error)})

      this.disableEdit()
    },
    deleteBucket() {

    }
  }
}
</script>
