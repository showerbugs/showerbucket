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
          <v-btn icon ripple @click.native.stop="openDeleteDialog(bucket.name, bucket['.key'])">
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
  props: ['bucket', 'user', 'openDeleteDialog'],
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
      cosnt newBucketData = {
        name: this.newBucketName,
        updatedAt: firebase.database.ServerValue.TIMESTAMP
      }
      const newBucket = Object.assign(newBucketData, this.bucket)

      let updates = {}
      updates[`/buckets/${this.bucket['.key']}`] = newBucket
      updates[`/user-buckets/${this.user.uid}/${this.bucket['.key']}`] = newBucket

      db.ref().update(updates).catch((error) => {console.log(error)})
      this.disableEdit()
    }
  }
}
</script>
