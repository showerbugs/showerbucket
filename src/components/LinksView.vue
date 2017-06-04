<template>
  <div>
    <v-text-field v-model="link" @keyup.enter.native.stop="addLink" label="Add your new link"></v-text-field>
    <app-link class="link-card" :key="link['.key']" :link="link" v-for="link in links"></app-link>
  </div>
</template>

<script>
import { firebase } from '../firebase'
import appLink from './Link'

const db = firebase.database()

export default {
  components: {
    appLink
  },
  data() {
    return {
      link: null
    }
  },
  methods: {
    addLink() {
      if (this.link === '') {
        return
      }

      this.$firebaseRefs.links.push({
        link: this.link,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
      })

      this.link = ''
    }
  },
  firebase() {
    return {
      links: {
        source: db.ref(`bucket-links/${this.$route.params.bucketId}`)
      }
    }
  }
}
</script>
<style scoped>
  .link-card {
    margin: 20px 0;
  }
</style>
