<template>
  <div>
    <v-toolbar class="green">
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <router-link :to="{name: 'home'}" tag="v-toolbar-title" class="title-home white--text">Showerbucket</router-link>
    </v-toolbar>

    <v-navigation-drawer :disable-route-watcher="true" persistent light :mini-variant.sync="mini" v-model="drawer">
      <v-list>

        <template v-if="user">
          <v-list-item>
            <v-list-tile avatar tag="div">
              <v-list-tile-avatar>
                <img :src="user.photoURL"/>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ user.displayName }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon @click.native.stop="mini = !mini">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Logout</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </template>

        <v-list-item @click="loginWithGoogle" v-else>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Login with Google</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      drawer: false,
      mini: false,
      user: null
    }
  },
  methods: {
    loginWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider)
      .then(result => {
        this.$router.push({ name: 'buckets' })
      })
      .catch(error => console.log(error))
    },
    logout () {
      firebase.auth().signOut()
      .then(() => {
        this.user = null
        this.$router.push({ name: 'home' })
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user
    })
  }
}
</script>

<style>
.title-home {
  cursor: pointer;
}
</style>
