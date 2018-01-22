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
					   <el-form-item label="图片上传">
						    <el-upload class="avatar-uploader" :action="imgUrl" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" name="file">
							  <img v-if="imageUrl" :src="imageUrl" class="avatar">
							  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
					   </el-form-item>
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
		<div class="form-group">
                <label>背景图</label>
                <input type="file" class="form-control" @change="onFileChange">
           </div>
           <div class="form-group" v-if="image">
	        <label>背景图预览</label>
	            <img :src="image">
           </div>
           <button @click="gets()">sdsda</button>
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
			      image: ''
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
                    this.createImage(files[0])
                },
                createImage: function(file){
                    var image = new Image();
                    var reader = new FileReader();
                    var vm = this;
                    reader.onload = (e) => {
                    	 vm.image =  e.target.result;
                    }
                    reader.readAsDataURL(file);
                },
                async gets (){
                    console.log(await imgUpload({'image': this.image}))            
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
		     },
		      handleAvatarSuccess(res, file) {
                   this.imageUrl = URL.createObjectURL(file.raw);
                   console.log(res)
                },
		      beforeAvatarUpload(file) {
           //              const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
			        // const isLt2M = file.size / 1024 / 1024 < 2;

			        // if (!isJPG) {
			        //   this.$message.error('上传头像图片只能是 JPG 格式!');
			        // }
			        // if (!isLt2M) {
			        //   this.$message.error('上传头像图片大小不能超过 2MB!');
			        // }
			        // console.log(file)
			        // return isJPG && isLt2M;
			        console.log(file)
                        var fd = new FormData();
                        fd.append('file', file);
                        this.$axios({
                        	method: 'post',
                        	url: 'http://www.fishblog.com/index.php?s=admin/Article/uploadImg',
                           headers: {'Content-Type': 'multipart/form-data'}
                        }).then( res => {
                        	 console.log(res)
                        })
			        return false;
                 }
		}
	}
</script>