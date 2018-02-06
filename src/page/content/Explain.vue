<template>
    <div class="explain">
        <head-top></head-top>
        <el-row  class="art" v-if="show">
          <div class="el-col el-col-12 el-col-offset-4">
                <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="网站标题" prop="title">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="关键字" prop="keyword">
                        <el-input v-model="form.keyword"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间" prop="createtime">
                        <el-input v-model="form.createtime"></el-input>
                    </el-form-item>
                    <el-form-item label="站点描述" prop="desc">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="站长" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ" prop="qq">
                        <el-input v-model="form.qq"></el-input>
                    </el-form-item>
                    <el-form-item label="职业" prop="profession">
                        <el-input v-model="form.profession"></el-input>
                    </el-form-item>
                    <el-form-item label="爱好" prop="hobby">
                        <el-input v-model="form.hobby"></el-input>
                    </el-form-item>
                    <el-form-item label="网名" prop="netname">
                        <el-input v-model="form.netname"></el-input>
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
                    <el-form-item label="个人说明" prop="explain">
                        <el-input type="textarea" v-model="form.explain"></el-input>
                    </el-form-item>
                    <el-form-item label="关于程序" prop="program">
                        <el-input type="textarea" v-model="form.program"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-row>
    </div>
</template>
<script type="text/javascript">
    import headTop from '../public/HeadTop';
    import {systemImgUpload} from '../../api/getData';
    import { baseUrl } from '../../config/env'; 
    export default{
        data(){
           return {
              show: true,
              form: {
                title: '',
                keyword: '',
                createtime: '',
                desc: '',
                username: '',
                qq: '',
                profession: '',
                hobby: '',
                netname: '',
                image: '',
                explain: '',
                program: ''
              },
              rules: {
                title: [
                  {required:true, message:'请输入网站标题', trigger:'blur'}
                ],
                createtime:[
                  {required:true, message:'请选择发布时间', trigger:'blur'}
                ]
              },
              baseUrl
           }
        },
        components: {headTop},
        created(){

        },
        methods: {
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
              var res = JSON.parse(await systemImgUpload({image}));
              if(res.errcode == 0){
                this.form.image = res.filepath;
                this.$message({type:'success', message:res.msg});
              }else{
                this.$message({type:'error', message:res.msg});
              }
           },
           //提交
           onSubmit(formName){
                this.$refs[formName].validate(async (valid) =>{
                    if(valid){
                       var data = {};
                       data.title = this.form.title;
                       data.keyword = this.form.keyword;
                       data.createtime = this.form.createtime.getTime() / 1000;
                       data.desc = this.form.desc;
                       data.username = this.form.username;
                       data.qq = this.form.qq;
                       data.profession = this.form.profession;
                       data.hobby = this.form.hobby;
                       data.netname = this.form.netname;
                       data.img = this.form.image;
                       data.explain = this.form.explain;
                       data.program = this.form.program;
                    }else{
                       this.$notify.error({ title: '错误', message: '请检查输入是否正确', offset: 100 });
                    }
                })
            },
            cancel(){

            }
        }
    }
</script>