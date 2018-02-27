<template>
	<div class="header">
		<div class="header_top">
			<el-dropdown @command="newCommand" menu-align='start'>
			    	<span class="el-dropdown-link">
	                     新消息<i class="new">{{allNum}}</i><i class="el-icon-caret-bottom el-icon--right"></i>
	                </span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="/Artcomment">文章<i class="new">{{numList.artNum}}</i></el-dropdown-item>
					<el-dropdown-item command="/Saycomment">说说<i class="new">{{numList.sayNum}}</i></el-dropdown-item>
					<el-dropdown-item command="/Logcomment">日志<i class="new">{{numList.logNum}}</i></el-dropdown-item>
					<el-dropdown-item command="/Boardcomment">留言板<i class="new">{{numList.boardNum}}</i></el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-dropdown @command="stateCommand" menu-align='start'>
			    <img v-if="logo" :src="baseUrl+logo" class="avator">
				<img v-else src="../../assets/images/a1.jpg" class="avator">
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="1">首页</el-dropdown-item>
					<el-dropdown-item command="2">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
          </div>
          <div class="header_bottom">
          	  <el-breadcrumb separator="/">
				  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				  <el-breadcrumb-item v-for="(item, index) in $route.meta">{{item}}</el-breadcrumb-item>
			  </el-breadcrumb>
          </div>
	</div>
</template>

<script type="text/javascript">
    import { baseUrl } from '../../config/env';
    import { publishNum } from '../../api/getData';
	export default{
		data() {
			return {
				logo:'',
				baseUrl,
                numList: [],
                allNum: 0
			}
		},
		created () {
			sessionStorage.getItem('username') ? this.logo = sessionStorage.getItem('logo') : this.$router.push('/');
            this.init();
		},
		methods:{
            async init(){
               var res = JSON.parse(await publishNum());
               if(res.errcode == 0){
                  this.numList = res.data;
                  this.allNum = parseInt(res.data.artNum) + parseInt(res.data.sayNum) + parseInt(res.data.logNum) + parseInt(res.data.boardNum);
               }else{
                  this.$message({type: 'error', message: res.msg});
               }
            },
		    newCommand(command){
              this.$router.push(command);
		    },
		    stateCommand(command){
              if(command == 1){
                 
              }else{
              	 sessionStorage.clear();
              	 this.$router.push('/')
              }
		    }
		}
	}
</script>
<style type="text/css">
     .header{
     	height: 60px;
     	background-color: #EFF2F7;
     }
	.header_top{
		height: 60px;
		width: 50%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding:0 20px;
		float: right;
	}
	.header_bottom{
		height: 60px;
		display: flex;
		justify-content: start;
		align-items: center;
		padding-left: 20px;
	}
	.new{
		background-color: #777; 
		padding: 3px 7px;
		border-radius: 10px;
		color: #fff;
		margin: 0 10px;
	}
	.news{
		
	}
	.avator{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 20px;
		display: block;
		margin: 10px 20px 0 0 ;
	}.el-dropdown{
		margin: 0 15px;
		height: 60px;
		line-height: 60px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>