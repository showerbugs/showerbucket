<template>
  <div class="home-container">
    <h4>Showerbucket</h4>
    <p>웹페이지를 수집하고 공유하세요!</p>
  </div>
</template>

<script>
import { firebase } from '../firebase'

export default {
  data () {
    return {
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push({ name: 'buckets' })
      }
    })
  }
}
</script>

<style>
main {
  position: relative;
}

.home-container::after {
  content: '';
  background-image: url('../assets/simpson1.png');
  background-size: 100% 100%;
  opacity: 0.5;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}
</style>
