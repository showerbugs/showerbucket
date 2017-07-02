import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../components/HomeView'
import BucketsView from '../components/BucketsView'
import LinksView from '../components/LinksView'
import { firebase } from '../firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomeView, name: 'home' },
    { path: '/buckets', component: BucketsView, name: 'buckets', meta: { authRequired: true } },
    { path: '/buckets/:bucketId', component: LinksView, name: 'links' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next()
      } else {
        alert('Please signin first!')
        next({ name: 'home' })
      }
    })

    next(false)
  } else {
    next()
  }
})

export default router
