import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/question/:id',
      name: 'question-page',
      component: () => import(/* webpackChunkName: "create" */ './views/Question.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      children: [{
        path: 'update/:id',
        name: 'update',
        component: () => import(/* webpackChunkName: "update" */ './views/Update.vue')
      }]
    },
    {
      path: '/create',
      name: 'create',
      component: () => import(/* webpackChunkName: "create" */ './views/Create.vue')
    }
  ]
})
