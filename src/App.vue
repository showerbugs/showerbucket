<template>
  <div id="app">
    <h3>{{ bucket.name }}</h3>
    <input v-model="addedLink" @keyup.enter="addLink">
    <ul>
      <li v-for="link in links">{{ link }}</li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      bucket: {
        name: 'My Bucket'
      },
      addedLink: '',
      links: ['www.naver.com', 'www.google.com']
    }
  },
  methods: {
    addLink() {
      this.links.push(this.addedLink)
      this.addedLink = ''

      const newBucketKey = firebase.database().ref().child('buckets').push().key

      let updates = {}
      updates[`/buckets/${newBucketKey}`] = this.bucket
      updates[`/links/${newBucketKey}`] = this.links

      const aaa = firebase.database().ref().update(updates)
      console.log(aaa)
    }
  }
}
</script>

<style>
</style>
