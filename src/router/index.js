import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/movie',
      component: () => import('@/views/Movie.vue'),
      children:[
        {
          path: 'nowPlaying',
          component: () => import('@/components/NowPlaying.vue'),
        },
        {
          path: 'comingSoon',
          component: () => import('@/components/ComingSoon.vue'),
        },
        {
          path: 'city',
          component: () => import('@/components/City.vue'),
        },
        {
          path: 'search',
          component: () => import('@/components/Search.vue'),
        },
        {
          path: '/movie',
          redirect:'/movie/nowPlaying'
        } 
      ]
    },
    {
      path: '/cinema',
      component: () => import('@/views/Cinema.vue')
    },
    {
      path: '/user',
      component: () => import('@/views/User.vue')
    },
    {
      path: '/*',
      redirect: '/movie'
    },
  ]
})
