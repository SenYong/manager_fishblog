<template>
	<div class="manage fillcontain"> 
		<el-row style="height: 100%">
		    <el-col :span="4"  style="min-height: 100%; background-color: #545c64;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;"  class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>发布内容</template>
						<el-menu-item index="AddArt">发布文章</el-menu-item>
						<el-menu-item index="AddSay">发布说说</el-menu-item>
						<el-menu-item index="AddLog">发布日志</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>内容管理</template>
						<el-menu-item index="ArtList">文章列表</el-menu-item>
						<el-menu-item index="SayList">说说列表</el-menu-item>
						<el-menu-item index="LogList">日志列表</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>栏目</template>
						<el-menu-item index="AddCol">新增栏目</el-menu-item>
						<el-menu-item index="ColList">栏目列表</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-star-on"></i>用户管理</template>
						<el-menu-item index="AddUser">添加用户</el-menu-item>
						<el-menu-item index="UserList">用户列表</el-menu-item>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>用户互动</template>
						<el-menu-item index="ArtComment">文章评论</el-menu-item>
						<el-menu-item index="SayComment">说说评论</el-menu-item>
						<el-menu-item index="LogComment">日志评论</el-menu-item>
						<el-menu-item index="BoardComment">留言板评论</el-menu-item>
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>系统设置</template>
						<el-menu-item index="Explain">个人中心</el-menu-item>
						<el-menu-item index="ExplainList">中心列表</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<router-view></router-view>
			</el-col>
		</el-row>
	</div>
</template>

<script type="text/javascript">
	export default{
		computed: {
			defaultActive: function(){
                return this.$route.path.replace('/', '');
			}
		}
	}
</script>