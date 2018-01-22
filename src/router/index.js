import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const login = r => require.ensure([], () => r(require('../page/login/login')), 'login');
const manage = r => require.ensure([], () => r(require('../page/manage/manage')), 'manage');
const home = r => require.ensure([], () => r(require('../page/content/home')), 'home');
const AddArt = r => require.ensure([], () => r(require('../page/content/AddArt')), 'AddArt');

export default new Router({
  routes: [
    {
        path: '/',
        component: login
    },
    {
    	  path: '/manage',
    	  component: manage,
        name: '',
        children: [{
           path: '',
           component: home,
           meta: []
        },{
           path: '/AddArt',
           component: AddArt,
           meta: ['发布内容', '发布文章']
        }]

    }
  ]
})
