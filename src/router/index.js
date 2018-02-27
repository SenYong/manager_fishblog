import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const login = r => require.ensure([], () => r(require('../page/login/login')), 'login');
const manage = r => require.ensure([], () => r(require('../page/manage/manage')), 'manage');
const home = r => require.ensure([], () => r(require('../page/content/home')), 'home');
const AddArt = r => require.ensure([], () => r(require('../page/content/AddArt')), 'AddArt');
const AddSay = r => require.ensure([], () =>r(require('../page/content/AddSay')), 'AddSay');
const AddLog = r => require.ensure([], () =>r(require('../page/content/AddLog')), 'AddLog');
const ArtList = r => require.ensure([], () => r(require('../page/content/ArtList')), 'ArtList');
const SayList = r => require.ensure([], () => r(require('../page/content/SayList')), 'SayList');
const LogList = r => require.ensure([], () => r(require('../page/content/LogList')), 'LogList');
const AddCol = r => require.ensure([], () => r(require('../page/content/AddCol')), 'AddCol');
const ColList = r => require.ensure([], () => r(require('../page/content/ColList')), 'ColList');
const AddUser = r => require.ensure([], () => r(require('../page/content/AddUser')), 'AddUser');
const UserList = r => require.ensure([], () => r(require('../page/content/UserList')), 'UserList');
const ArtComment = r => require.ensure([], () => r(require('../page/content/ArtComment')), 'ArtComment');
const replyArt = r => require.ensure([], () => r(require('../page/content/replyArt')), 'replyArt');
const SayComment = r => require.ensure([], () => r(require('../page/content/SayComment')), 'SayComment');
const replySay = r => require.ensure([], () => r(require('../page/content/replySay')), 'replySay');
const LogComment = r => require.ensure([], () => r(require('../page/content/LogComment')), 'LogComment');
const replyLog = r => require.ensure([], () => r(require('../page/content/replyLog')), 'replyLog');
const BoardComment = r => require.ensure([], () => r(require('../page/content/BoardComment')), 'BoardComment');
const replyBoard = r => require.ensure([], () => r(require('../page/content/replyBoard')), 'replyBoard');
const Explain = r => require.ensure([], () => r(require('../page/content/Explain')), 'Explain');
const ExplainList = r => require.ensure([], () => r(require('../page/content/ExplainList')), 'ExplainList');

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
        },{
          path: '/AddSay',
          component: AddSay,
          meta: ['发布内容', '发布说说']
        },{
          path: '/AddLog',
          component: AddLog,
          meta: ['发布内容', '发布日志']
        },{
          path: '/ArtList',
          component: ArtList,
          meta: ['内容管理', '文章列表']
        },{
          path: '/SayList',
          component: SayList,
          meta: ['内容管理', '说说列表']
        },{
          path: '/LogList',
          component: LogList,
          meta: ['内容管理', '日志列表']
        },{
          path: '/AddCol',
          component: AddCol,
          meta: ['栏目', '新增栏目']
        },{
          path: '/ColList',
          component: ColList,
          meta: ['栏目', '栏目列表']
        },{
          path: '/AddUser',
          component: AddUser,
          meta: ['用户管理', '添加用户']
        },{
          path: '/UserList',
          component: UserList,
          meta: ['用户管理', '用户列表']
        },{
          path: '/ArtComment',
          component: ArtComment,
          meta: ['用户互动', '文章评论']
        },{
          path: '/replyArt',
          component: replyArt,
          meta: ['用户互动', '文章评论回复']
        },{
          path: '/SayComment',
          component: SayComment,
          meta: ['用户互动','说说评论']
        },{
          path: '/replySay',
          component: replySay,
          meta: ['用户互动', '说说评论回复']
        },{
          path: '/LogComment',
          component: LogComment,
          meta: ['用户互动', '日志评论']
        },{
          path: '/replyLog',
          component: replyLog,
          meta: ['用户互动', '日志评论回复']
        },{
          path: '/BoardComment',
          component: BoardComment,
          meta: ['用户互动', '留言板']
        },{
          path: '/replyBoard',
          component: replyBoard,
          meta: ['用户互动', '留言板回复']
        },{
          path: '/Explain',
          component: Explain,
          meta: ['系统设置', '个人中心']
        },{
          path: '/ExplainList',
          component: ExplainList,
          meta: ['系统设置', '中心列表']
        }]

    }
  ]
})
