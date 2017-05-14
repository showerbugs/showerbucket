<template>
  <div>
    <!-- <h3>{{ bucket.name }}</h3> -->
    <input v-model="link" @keyup.enter="addLink">
    <hr>
    <ul>
      <app-link :key="link['.key']" :link="link" v-for="link in links"></app-link>
    </ul>
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
      if (this.link === '') return
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
        source: db.ref(`links/${this.$route.params.bucketId}`)
      }
    }
  }
}
</script>
