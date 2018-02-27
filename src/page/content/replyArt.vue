<template>
    <div class="replyArt">
        <head-top></head-top>
        <el-row  class="art" v-if="show">
         <div class="el-col el-col-12 el-col-offset-4">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                <el-input v-model="form.ac_id" :disabled="true" type="hidden"></el-input>
                <el-form-item label="文章标题" prop="a_name">
                    <el-input v-model="form.a_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论用户" prop="ac_name">
                    <el-input v-model="form.ac_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论内容" prop="ac_content">
                    <el-input v-model="form.ac_content" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论时间" prop="ac_time">
                  <div class="block">
                      <el-date-picker v-model="form.ac_time" type="datetime" placeholder="选择发布时间" :disabled="true"></el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="回复人" prop="ac_rename">
                    <el-input v-model="form.ac_rename" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="回复时间" prop="ac_retime">
                  <div class="block">
                      <el-date-picker v-model="form.ac_retime" type="datetime" placeholder="选择回复时间"></el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="回复内容" prop="ac_recontent" id="box">
                  <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="请输入内容" resize="none" v-model="form.ac_recontent"></el-input>
                  <div class="icon clearfix">
                    <i class="icon iconfont icon-face" @click="showEmoji = !showEmoji"></i>
                    <transition name="fade" mode="">
                       <div class="emoji-box" v-if="showEmoji" >
                          <el-button  class="pop-close"  :plain="true"  type="danger"  size="mini" icon="close" @click="showEmoji = false"></el-button>
                          <vue-emoji @select="selectEmoji"></vue-emoji>
                          <span class="pop-arrow arrow"></span>
                       </div>       
                    </transition>
                  </div>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" @click="onSubmit('ruleForm')">回复</el-button>
                   <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
          </div>
        </el-row>
    </div>
</template>
<script type="text/javascript">
    import headTop from '../public/HeadTop';
    import vueEmoji from '../../components/emoji.vue';
    import { getOneArtComment, replyArts } from '../../api/getData';
    export default{
        data(){
            return{
               form:{
                 a_name:'',
                 ac_name: '',
                 ac_content: '',
                 ac_time: '',
                 ac_rename: '',
                 ac_retime: '',
                 ac_recontent: '',
                 ac_id: ''
               },
               rules:{
                 ac_retime: [ {required: true, message: '请选择回复时间', trigger: 'blur'} ],
                 ac_recontent: [ {required: true, message: '请选择回复内容', trigger: 'blur'} ]
               },
               show: true,
               showEmoji: false
            }
        },
        components: {headTop,vueEmoji},
        created(){
           if(this.$route.query.id){
             this.getData(this.$route.query.id);
           }
        },
        methods:{
           async getData(id){
              var res = JSON.parse(await getOneArtComment({id}));
              if(res.errcode == 0){
                this.form.ac_id = res.data.ac_id;
                this.form.a_name = res.data.a_name;
                this.form.ac_name = res.data.ac_name;
                this.form.ac_content = res.data.ac_content;
                this.form.ac_time = new Date(res.data.ac_time * 1000);
                this.form.ac_rename = res.data.ac_rename ? res.data.ac_rename : sessionStorage.getItem('username');
                this.form.ac_recontent = res.data.ac_recontent ? res.data.ac_recontent : '';
                this.form.ac_retime = res.data.ac_retime ? new Date(res.data.ac_retime * 1000) : '';
              }else{
                this.$message({type:'error', message:res.msg});
              }
           },
           //自定义事件,父组件与子组件之间的通讯
           selectEmoji(code){
              this.showEmoji = false;
              this.form.ac_recontent += code
           },
           onSubmit(formName){
              this.$refs[formName].validate(async(valid) => {
                  if(valid){
                     if(sessionStorage.getItem('username')){
                        var data = {};
                        data.ac_id = this.form.ac_id;
                        data.ac_rename = sessionStorage.getItem('username');
                        data.ac_reimg = sessionStorage.getItem('logo');
                        data.ac_recontent = this.form.ac_recontent;
                        data.ac_retime = this.form.ac_retime.getTime() / 1000;
                        var res = JSON.parse(await replyArts(data));
                        if(res.errcode == 0){
                          this.$message({type:'success', message:res.msg});
                          this.$router.push('/ArtComment');
                        }else{
                          this.$message.error(res.msg);
                        }
                     }
                  }else{
                     this.$notify.error({ title: '错误', message: '请检查输入是否正确', offset: 100 });
                  }
              })
           },
           cancel(){
              this.$router.push('/ArtComment');
           }
        }
    }
</script>
<style lang="scss"> @import '../../assets/scss/emoji.scss'; </style>
