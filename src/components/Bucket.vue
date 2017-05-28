<template>
  <v-list-item>
    <v-list-tile>
      <template v-if="!isEdit">
        <router-link :to="{name: 'links', params: {bucketId: bucket['.key']}}" tag="v-list-tile-content">
          <v-list-tile-title>{{ bucket.name }}</v-list-tile-title>
        </router-link>

        <v-list-tile-action>
          <v-btn icon ripple @click.native.stop="enableEdit">
            <v-icon class="grey--text text--lighten-1">mode_edit</v-icon>
          </v-btn>
        </v-list-tile-action>

        <v-list-tile-action>
          <v-btn icon ripple @click.native.stop="deleteBucket">
            <v-icon class="grey--text text--lighten-1">delete</v-icon>
          </v-btn>
        </v-list-tile-action>
      </template>

      <template v-else>
        <v-list-tile-content>
          <v-text-field v-model="newBucketName" @keyup.enter.native.stop="editBucket"></v-text-field>
        </v-list-tile-content>
        
        <v-list-tile-action>
          <v-btn icon ripple @click.native.stop="editBucket">
            <v-icon class="grey--text text--lighten-1">done</v-icon>
          </v-btn>
        </v-list-tile-action>

        <v-list-tile-action>
          <v-btn icon ripple @click.native.stop="disableEdit">
            <v-icon class="grey--text text--lighten-1">clear</v-icon>
          </v-btn>
        </v-list-tile-action>
      </template>
    </v-list-tile>
  </v-list-item>
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
        createdAt: this.bucket.createdAt || firebase.database.ServerValue.TIMESTAMP,
        updatedAt: firebase.database.ServerValue.TIMESTAMP
      }

      let updates = {}
      updates[`/buckets/${this.bucket['.key']}`] = bucket
      updates[`/user-buckets/${this.user.uid}/${this.bucket['.key']}`] = bucket

      db.ref().update(updates).catch((error) => {console.log(error)})

      this.disableEdit()
    },
    deleteBucket() {
      alert('TODO: deleteBucket')
    }
  }
}
</script>
