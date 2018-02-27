<template>
    <div class="AddLog">
      <head-top></head-top>
        <!-- 新增 -->
      <el-row  class="art" v-if="show">
          <div class="el-col el-col-12 el-col-offset-4">
                <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="日志标题" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="desc">
                        <el-input type="textarea" v-model="form.desc"></el-input>
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
                    <el-form-item label="日志标题" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="desc">
                        <el-input type="textarea" v-model="form.desc"></el-input>
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
    import headTop from '../public/HeadTop';
    import {logImgUpload, addLog, getOneLog, updateLog} from '../../api/getData';
    import { baseUrl } from '../../config/env';
    export default{
        data(){
            return{
                form:{
                   name:"",
                   desc:"",
                   image:"",
                   newstime:"",
                   open:false,
                   original:false
                },
                rules:{
                   name:[
                      {required:true, message:'日志标题不能为空', trigger:'blur'}
                   ],
                   desc:[
                      {required:true, message:"日志描述不能为空", trigger:'blur'}
                   ],
                   newstime:[
                      {required:true, message:'请选择发布时间', trigger:'blur'}
                   ]
                },
                imageUrl:"",
                show:true,
                id:"",
                baseUrl
            }
        },
        components:{headTop},
        created(){
           if(this.$route.query.id){
              this.show = false;
              this.getData(this.$route.query.id);
           }else{
              this.show = true;
           }
        },
        methods:{
           //获取日志详情
           async getData(id){
              var res = JSON.parse(await getOneLog({id}));
              if(res.errcode == 0){
                this.id = res.data.l_id;
                this.form.name = res.data.l_name;
                this.form.desc = res.data.l_desc;
                this.form.image = res.data.l_img;
                this.form.newstime = new Date(res.data.l_time * 1000);
                this.form.open = !!res.data.l_show;
                this.form.original = !!res.data.l_original;
              }
           },
           //图片上传
           onFileChange:function(e){
               var files = e.target.files || e.dataTransfer.files;
               if(!files.length)return
               this.createImage(files[0]);
           },
           createImage: function(file){
               var reader = new FileReader();
               reader.onload = (e) => {
                   this.uploadImg(e.target.result);
                   this.form.image = e.target.result;
               }
               reader.readAsDataURL(file)
           },
           async uploadImg(image){
              var res = JSON.parse(await logImgUpload({image}));
              console.log(res)
              if(res.errcode == 0){
                this.form.image = res.filename;
                this.$message({type:'success', message:res.msg});
              }else{
                this.$message({type:'error', message:res.msg});
              }
           },
           //表单提交
           onSubmit(formName) {
              this.$refs[formName].validate(async (valid) => {
                if (valid) {
                     if(sessionStorage.getItem('username')){
                        if(sessionStorage.getItem('class') !== '1'){
                          this.$message({ type:'warning', message:'您暂时还没有添加日志权限' });
                          return false;
                        }
                        var data = {};
                        data.l_name = this.form.name;
                        data.l_desc = this.form.desc;
                        data.l_img = this.imageUrl ? this.imageUrl : this.form.image;
                        data.l_time = this.form.newstime.getTime() / 1000;
                        data.l_show = this.form.open ? 1 : 0;
                        data.l_original = this.form.original ? 1 : 0;
                        data.l_root = sessionStorage.getItem('username');
                        if(this.id){
                          data.l_id = this.id;
                          var res = JSON.parse(await updateLog(data));
                        }else{
                          var res = JSON.parse(await addLog(data));
                        } 
                        if(res.errcode == 0){
                           this.$message({type:'success', message:res.msg});
                           this.$router.push('/LogList') 
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
             this.$router.push('/LogList');
          }
        }
    }
</script>
