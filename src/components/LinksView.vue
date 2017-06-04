<template>
  <div>
    <v-text-field v-model="link" @keyup.enter.native.stop="addLink" label="Add your new link"></v-text-field>
    <app-link class="link-card" :key="link['.key']" :link="link" v-for="link in links" :delete-link="deleteLink"></app-link>
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
    },
    deleteLink(linkKey, event) {
      db.ref(`bucket-links/${this.$route.params.bucketId}/${linkKey}`).remove()
      event.preventDefault();
    },
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
    display: block;
    text-decoration: none;
    margin: 20px 0;
  }
</style>
