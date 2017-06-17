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
      if(!this.hasProtocol(this.link)){
        this.link = 'http://' + this.link
      }
      if(!this.isValidUrl(this.link)){
        alert('Invalid link')
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
    hasProtocol(url) {
      return new RegExp("^(http|https|ftp)://", "i").test(url)
    },
    isValidUrl(url) {
      if(this.link === '') return false
      return new RegExp(/(ftp|http|https):\/\/(\\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/).test(url)
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
    display: block;
    text-decoration: none;
    margin: 20px 0;
  }
</style>
