<template>
  <div>
    <h3>Sign-in</h3>
    <button @click="signInGoogle">Sign-in with google</button>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
</template>

<script>
  import { firebase } from '../firebase'

  export default{
    methods: {
      signInGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithPopup(provider).then((result) => {
          this.$router.push({name: 'buckets'})
        }).catch((error) => {
          console.log(error)
        })
      },
    },
    beforeCreate() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$router.push({name: 'buckets'})
        }
      });
    }
  }
</script>
