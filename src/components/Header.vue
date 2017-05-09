<template>
  <nav>
    <router-link :to="{name: 'signin'}" tag="a"><h1>Shower Bucket</h1></router-link>
    <div v-if="user">
      <span>{{ user.displayName }}({{ user.email }})</span>
      <button @click="logout">logout</button>
    </div>
  </nav>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data() {
      return {
        user: null,
      }
    },
    methods: {
      logout() {
        firebase.auth().signOut().then(() => {
          this.user = null
          this.$router.push({name: 'signin'})
        }).catch((error) => {
          console.log(error)
        });
      },
    },
    beforeCreate() {
      firebase.auth().onAuthStateChanged((user) => {
        this.user = user
      })
    }
  }
</script>
