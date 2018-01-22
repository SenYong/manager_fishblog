<template>
	<div class="AddArt">
	      <head-top></head-top>
	      <div class="home">
	      	<p>发表区</p>
	      	<div class="comment">
	      		 <div class="commentItem">
	      		 	<div class="title">文章</div>
	      		 	<div class="num">{{allNum.artNum}}</div>
	      		 </div>
	      		 <div class="commentItem">
	      		 	<div class="title">说说</div>
	      		 	<div class="num">{{allNum.sayNum}}</div>
	      		 </div>
	      		 <div class="commentItem">
	      		 	<div class="title">日志</div>
	      		 	<div class="num">{{allNum.logNum}}</div>
	      		 </div>
	      		 <div class="commentItem">
	      		 	<div class="title">留言板</div>
	      		 	<div class="num">{{allNum.boardNum}}</div>
	      		 </div>
	      	</div>
	      </div>
	</div>
</template>
<script type="text/javascript">
	import headTop from '../public/HeadTop';
	import { publishNum } from '../../api/getData';
	export default{
		data() {
			return {
			   allNum: {},
			   commentList: []
			}
		},
		components: { headTop },
		mounted () {
               this.init(); 
		},
		methods: {
               async init(){
                  var res = JSON.parse(await publishNum());
                  if(res.errcode == 0){
                      this.allNum = res.data;
                  }else{
                  	this.$message.error(res.msg);
                  }
               }
		}
	}
</script>
