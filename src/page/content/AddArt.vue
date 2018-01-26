<template>
	<div class="AddArt">
		<head-top></head-top>
		<el-row  class="art">
		     <div class="el-col el-col-12 el-col-offset-4">
				<el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
					   <el-form-item label="文章标题" prop="name">
					         <el-input v-model="form.name"></el-input>
					   </el-form-item>
					   <el-form-item label="栏目" prop="region">
						    <el-select v-model="form.region" placeholder="请选择栏目">
						         <el-option :label="item.c_name" :value="item.c_id" v-for="(item,index) in catList"></el-option>
						    </el-select>
					   </el-form-item>
					   <el-form-item label="描述" prop="desc">
					    	    <el-input type="textarea" v-model="form.desc"></el-input>
					   </el-form-item>
					    <el-form-item label="标签" prop="label">
					         <el-input v-model="form.label"></el-input>
					   </el-form-item>
					   <div class="upload">
					   	  <span>图片上传</span>
					   	  <div class="uploadImg">
					   	      <div v-if="image" >
					   	  	     <img :src="image">
					   	  	     <input type="file" class="file" @change="onFileChange">
					   	  	</div>
					   	  	 <div v-else="image">
						   	  	<div class="add">+</div>
						   	  	<input type="file" class="file" @change="onFileChange">
						   	 </div>
					   	  </div>
					   </div>
					  <el-form-item label="发布时间" prop="newstime">
						  <div class="block">
						      <el-date-picker v-model="form.newstime" type="datetime" placeholder="选择发布时间"></el-date-picker>
						  </div>
					  </el-form-item>
					  <el-form-item label="是否公开" prop="open">
					        <el-switch v-model="form.open"></el-switch>
					  </el-form-item>
					  <el-form-item label="是否原创" prop="original">
					        <el-switch v-model="form.original"></el-switch>
					  </el-form-item>
					  <el-form-item>
						   <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
						   <el-button>取消</el-button>
					  </el-form-item>
				</el-form>
			</div>
		</el-row>
		<div>{{file}}</div>
	</div>
</template>
<script type="text/javascript">
	import headTop from '../public/HeadTop';
	import { quillEditor } from 'vue-quill-editor';
	import { imgUrl } from '../../config/env';
	import { artCat, imgUpload } from '../../api/getData';
	export default{
		data () {
			return {
				form: {
			          name: '',
			          region: '',
			          desc: '',
			          label:'',
			          newstime: '',
			          open: '',
                          original: ''
			      },
			      catList: [],
			      imageUrl: '',
			      rules: {
			      	name: [
			      	   {required: true, message: '请输入文章标题', trigger: 'blur'}
			      	],
			      	region: [
			      	   {required: true, message: '请选择栏目', trigger: 'blur'}
			      	],
			      	desc: [
                              {required: true, message: '请输入描述', trigger: 'blur'}
			      	],
			      	label: [
                              {required: true, message: '请输入文章标签', trigger: 'blur'}
			      	],
			      	newstime: [
                              {required: true, message: '请选择发布时间', trigger: 'blur'}
			      	]
			      },
			      imgUrl,
			      image: '',
			      file: ''
			}
		},
		components: {headTop,quillEditor,imgUrl},
		created () {
			this.init();
		},
		methods: {
                onFileChange: function(e){
                    var files = e.target.files || e.dataTransfer.files;
                    if(!files.length) return;
                    console.log(files)
                    this.createImage(files[0])
                },
                createImage: function(file){
                    // var image = new Image();
                    // var reader = new FileReader();
                    // var vm = this;
                    // reader.onload = (e) => {
                    // 	 vm.image =  e.target.result;
                    // 	 this.uoloadImg(e.target.result);
                    // }
                    // reader.readAsDataURL(file);
                    console.log(file)
                    var reader = new FileReader(); 
                    reader.readAsDataURL(file);
                    var vm = this;
                    reader.onload = function(e){
                    	  vm.file = e.target.result
                    	 
                    	  var requestObj = null;
                    	   window.XMLHttpRequest ? requestObj = new XMLHttpRequest() : requestObj = new ActiveXObject;
                    	   requestObj.open('POST','http://www.fishblog.com/index.php?s=Admin/Article/uploadImg',true);
                    	   requestObj.onreadystatechange = function(){
                    	   	  if(requestObj.readyState == 4){
                    	   	  	if(requestObj.status == 200){
                    	   	  		console.log(requestObj.response);
                    	   	  	}
                    	   	  }
                    	   }
                    	    requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    	   requestObj.send("image="+e.target.result);
                    }
                },
                async uoloadImg (file){
                    var res = JSON.parse(await imgUpload({'image': file}));
                    console.log(res);
                },


			async init(){
			   const res = JSON.parse(await artCat());
			   if(res.errcode == 0){
			   	 this.catList = res.data;
			   }
			   
			},
		     onSubmit(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		              console.log(this.form);
		          } else {
		              this.$notify.error({
			            title: '错误',
			            message: '请检查输入是否正确',
			            offset: 100
			        });
		          }
		        });
		     }
		}
	}
</script>
<style type="text/css">
     .upload{
     	  margin-bottom: 20px;
     }
	.upload span{
         color: #606266;
         font-size: 14px;
         float: left;
	}
	.upload .uploadImg{
		width: 180px;
		height: 180px;
		float: left;
		margin-left: 20px;
		border:1px dotted #dcdfe6;
		position: relative;
	}
	.upload:after{
		content: '.';
		display: block;
		height: 0;
		visibility: hidden;
		clear: both;
	}
	.upload .uploadImg .add{
		font-size: 30px;
		height: 180px;
		line-height: 180px;
		text-align: center;
	}
	.upload .uploadImg .file{
		position: absolute;
		top: 0;
		width: 180px;
		height: 180px;
		opacity: 0;
	}
	.upload .uploadImg img{
		display: block;
		height: 180px;
		width: 180px;
	}

</style>