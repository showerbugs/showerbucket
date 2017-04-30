<template>
  <div id="app">
    <h3>Showerbucket</h3>
    <input v-model="link" @keyup.enter="addLink">
    <ul>
      <li v-for="link in links">{{ link }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: '',
      links: ['www.naver.com', 'www.google.com']
    }
  },
  methods: {
    addLink() {
      this.links.push(this.link)
      this.link = ''
    }
  }
}
</script>

<style>
</style>
