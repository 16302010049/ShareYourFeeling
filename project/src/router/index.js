import Vue from 'vue'
import Router from 'vue-router'
import register from '../pages/register'
import login from '../pages/login'
import index from '../pages/index'
import details from '../pages/details'
import post from '../pages/post'
import self from '../pages/self'
import messagepage from '../pages/messagepage'
import collect from '../pages/collect'
import nearby from '../pages/nearby'
import findfriend from '../pages/findfriend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/detail',
      name: 'detail',
      component: details
    },
    {
      path: '/post',
      name: 'post',
      component: post
    },
    {
      path: '/self-*',
      name: 'self',
      component: self
    },
    {
      path: '/message',
      name: 'message',
      component: messagepage
    },
    {
      path: '/collect',
      name: 'collect',
      component: collect
    },
    {
      path: '/nearby',
      name: 'nearby',
      component: nearby
    },
    {
      path: '/findfriend',
      name: 'findfriend',
      component: findfriend
    }
  ]
})
