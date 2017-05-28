import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../components/HomeView'
import BucketsView from '../components/BucketsView'
import LinksView from '../components/LinksView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', component: HomeView, name: 'home'},
    {path: '/buckets', component: BucketsView, name: 'buckets'},
    {path: '/buckets/:bucketId', component: LinksView, name: 'links'}
  ]
})
