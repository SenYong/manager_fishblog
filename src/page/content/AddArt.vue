<template>
	<div class="AddArt">
		<head-top></head-top>
    <!-- 新增 -->
		<el-row  class="art" v-if="show">
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
					   	      <div v-if="form.image" >
					   	  	     <img :src="baseUrl+form.image">
					   	  	     <input type="file" class="file" @change="onFileChange">
					   	  	</div>
					   	  	 <div v-else="form.image">
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
                      <el-form-item label="文章内容" prop="content">
                           <div class="quill-wrap">
                                <quill-editor v-model="form.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
                           </div>
                      </el-form-item>
					  <el-form-item>
						   <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
						   <el-button @click="cancel">取消</el-button>
					  </el-form-item>
				</el-form>
			</div>
		</el-row>
    <!-- 编辑 -->
    <el-row  class="art" v-else>
         <div class="el-col el-col-12 el-col-offset-4">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                   <input type="hidden" v-model="id">
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
                          <div v-if="form.image" >
                             <img :src="baseUrl+form.image">
                             <input type="file" class="file" @change="onFileChange">
                        </div>
                         <div v-else>
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
                  <el-form-item label="文章内容" prop="content">
                        <quill-editor ref="myTextEditor" v-model="form.content" :config="editorOption"  @change="onEditorChange($event)"></quill-editor>
                  </el-form-item>
                  <el-form-item>
                       <el-button type="primary" @click="onSubmit('ruleForm')">修改</el-button>
                       <el-button @click="cancel">取消</el-button>
                  </el-form-item>
            </el-form>
        </div>
    </el-row>
	</div>
</template>
<script type="text/javascript">
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
	import headTop from '../public/HeadTop';
	import { quillEditor, Quill } from 'vue-quill-editor';
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module';
    Quill.register('modules/ImageExtend', ImageExtend)
	import { artCat, imgUpload, addArt, getOneArt, updateArt } from '../../api/getData';
    import { baseUrl } from '../../config/env';
	export default{
		data () {
			return {
				form: {
			      name: '',
			      region: '',
			      desc: '',
			      label:'',
                  image: '',
			      newstime: '',
			      open: '',
                  original: '',
                  content: ''
			    },
			    catList: [],
			    imageUrl: '',
			    rules: {
			      	name: [ {required: true, message: '请输入文章标题', trigger: 'blur'} ],
			      	region: [ {required: true, message: '请选择栏目', trigger: 'blur'} ],
			      	desc: [ {required: true, message: '请输入描述', trigger: 'blur'} ],
			      	label: [ {required: true, message: '请输入文章标签', trigger: 'blur'} ],
			      	newstime: [ {required: true, message: '请选择发布时间', trigger: 'blur'} ]
			    },
                show: true,
                id: "",
                baseUrl,
                num:0,
                editorOption: {
                   modules: {
                      ImageExtend: {  // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入 
                         loading: true,
                         name: 'img',  // 图片参数名
                         action: "http://www.myblog.com/?s=Admin/Article/editor",  // 服务器地址, 如果action为空，则采用base64插入图片
                         // response 为一个函数用来获取服务器返回的具体图片地址
                         // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
                         // 则 return res.data.url
                         response: (res) => {
                            console.log(res)
                            return baseUrl + res.url;
                         }
                      },
                      toolbar: {  // 如果不上传图片到服务器，此处不必配置
                         container: container,  // container为工具栏，此次引入了全部工具栏，也可自行配置
                         handlers: {
                             'image': function (value) {  // 劫持原来的图片点击按钮事件
                                 QuillWatch.emit(this.quill.id)
                             }
                         }
                      }
                   } 
                }
			}
		},
		components: {headTop,quillEditor},
		created () {
      if(this.$route.query.id){
         this.show = false; 
         this.num = this.$route.query.num;
         this.getData(this.$route.query.id);
      }else{
         this.show = true;
      }
			this.init();
		},
		methods: {
        //获取文章详情
        async getData(id){
          var res = JSON.parse(await getOneArt({id}));
          if(res.errcode == 0){
             this.id = res.data.a_id;
             this.form.name = res.data.a_name;
             this.form.region = res.data.pid;
             this.form.desc = res.data.a_desc;
             this.form.label = res.data.a_keyword;
             this.form.image = res.data.a_img; 
             this.form.newstime =  new Date(res.data.a_time * 1000);
             this.form.open = !! res.data.a_show;
             this.form.original = !! res.data.a_original;
             this.form.content = res.data.a_content;
          }else{ 
             this.$message.error(res.msg);
          }
        },
        //时间戳转换成时间
        timestampToTime (time) {
           var date = new Date(time * 1000);
           var year = date.getFullYear() + '-';
           var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
           var day = date.getDate() + ' ';
           var hours = date.getHours() + ':';
           var minute = date.getMinutes() + ':';
           var second = date.getSeconds();
           return year + month + day + hours + minute + second;
        },
        //图片上传
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
            	 this.uploadImg(e.target.result);
            }
            reader.readAsDataURL(file);
        },
        async uploadImg (file){
            var res = JSON.parse(await imgUpload({'image': file}));
            if(res.errcode == 0){
               this.form.image = res.filepath;
               this.$message({
                 message: res.msg,
                 type: 'success'
               }); 
            }else{
               this.$message.error(res.msg);
            }
        },
        //初始化获取栏目
      	async init(){
      	   const res = JSON.parse(await artCat());
      	   if(res.errcode == 0){
      	   	 this.catList = res.data;
      	   }
      	},
        //表单提交
  	    onSubmit(formName) {
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
                 if(sessionStorage.getItem('username')){
                    if(sessionStorage.getItem('class') !== '1'){
                      this.$message({ type: 'warning', message: '您暂时还没有添加文章权限' });
                      return false;
                    }
                    var data = {};
                    data.a_name = this.form.name;
                    data.pid = this.form.region;
                    data.a_desc = this.form.desc;
                    data.a_keyword = this.form.label;
                    data.a_img = this.form.image;
                    data.a_time = this.form.newstime.getTime() / 1000;
                    data.a_show = this.form.open ? 1 : 0;
                    data.a_original = this.form.original ? 1 : 0;
                    data.a_content = this.form.content;
                    data.a_root = sessionStorage.getItem('username');
                    if(this.id){
                      data.a_id = this.id;
                      var res = JSON.parse(await updateArt(data));
                    }else{
                      var res = JSON.parse(await addArt(data));
                    } 
                    if(res.errcode == 0){
                       this.$message({type:'success', message:res.msg}); 
                       this.$router.push({path:'/ArtList', query:{num: this.num}})
                    }else{
                       this.$message.error(res.msg);
                    }
                 }else{
                    this.$router.push("/");
                 }
            }else{
                this.$notify.error({ title: '错误', message: '请检查输入是否正确', offset: 100 });
            }
        });
      },
      //取消
      cancel(){
        this.$router.push({ path: '/ArtList', query: {num: this.num} });
      }
		}
	}
</script>
<style scoped>
.quill-editor 
{
  height: 465px;
  width: 700px;
  margin-bottom:150px;
} 
.ql-container 
{
  height: 400px;
}

</style>


<!-- 
JS 格林威治时间格式（GMT)与普通时间格式的互相转换: http://blog.csdn.net/shuaizi96/article/details/73610599
 -->