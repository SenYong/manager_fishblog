import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import login from "../page/login/login";
import manage from "../page/manage/manage";
import home from "../page/content/home";
import AddArt from "../page/content/AddArt";
import AddSay from "../page/content/AddSay";
import AddLog from "../page/content/AddLog";
import ArtList from "../page/content/ArtList";
import SayList from "../page/content/SayList";
import LogList from "../page/content/LogList";
import AddCol from "../page/content/AddCol";
import ColList from "../page/content/ColList";
import AddUser from "../page/content/AddUser";
import UserList from "../page/content/UserList";
import ArtComment from "../page/content/ArtComment";
import replyArt from "../page/content/replyArt";
import SayComment from "../page/content/SayComment";
import replySay from "../page/content/replySay";
import LogComment from "../page/content/LogComment";
import replyLog from  "../page/content/replyLog";
import BoardComment from "../page/content/BoardComment";
import replyBoard from "../page/content/replyBoard";
import Explain from "../page/content/Explain";
import ExplainList from "../page/content/ExplainList";

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
