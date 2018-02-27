<template>
    <div class="replyLog">
        <head-top></head-top>
        <el-row  class="art" v-if="show">
         <div class="el-col el-col-12 el-col-offset-4">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                <el-input v-model="form.b_id" :disabled="true" type="hidden"></el-input>
                <el-form-item label="留言用户" prop="b_name">
                    <el-input v-model="form.b_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="留言内容" prop="b_content">
                    <el-input v-model="form.b_content" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="留言时间" prop="b_time">
                  <div class="block">
                      <el-date-picker v-model="form.b_time" type="datetime" placeholder="选择发布时间" :disabled="true"></el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="回复人" prop="b_rename">
                    <el-input v-model="form.b_rename" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="回复时间" prop="b_retime">
                  <div class="block">
                      <el-date-picker v-model="form.b_retime" type="datetime" placeholder="选择回复时间"></el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="回复内容" prop="b_recontent" id="box">
                  <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="请输入内容" resize="none" v-model="form.b_recontent"></el-input>
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
    import { getOneBoardComment, replyBoards } from '../../api/getData';
    export default{
        data(){
            return{
               form:{
                 b_name:'',
                 b_name: '',
                 b_content: '',
                 b_time: '',
                 b_rename: '',
                 b_retime: '',
                 b_recontent: '',
                 b_id: ''
               },
               rules:{
                 b_retime: [ {required: true, message: '请选择回复时间', trigger: 'blur'} ],
                 b_recontent: [ {required: true, message: '请选择回复内容', trigger: 'blur'} ]
               },
               show: true,
               showEmoji: false
            }
        },
        components: {headTop, vueEmoji},
        created(){
           if(this.$route.query.id){
             this.getData(this.$route.query.id);
           }
        },
        methods:{
           async getData(id){
              var res = JSON.parse(await getOneBoardComment({id}));
              if(res.errcode == 0){
                this.form.b_id = res.data.b_id;
                this.form.b_name = res.data.b_name;
                this.form.b_content = res.data.b_content;
                this.form.b_time = new Date(res.data.b_time * 1000);
                this.form.b_rename = this.form.b_rename ? this.form.b_rename : sessionStorage.getItem('username');
                this.form.b_retime = res.data.b_retime ? new Date(res.data.b_retime * 1000) : '';
                this.form.b_recontent = res.data.b_recontent ? res.data.b_recontent : '';
              }else{
                this.$message({type:'error', message:res.msg});
              }
           },
           //自定义事件,父组件与子组件之间的通讯
           selectEmoji(code){
              this.showEmoji = false;
              this.form.b_recontent += code
           },
           onSubmit(formName){
              this.$refs[formName].validate(async(valid) => {
                  if(valid){
                     if(sessionStorage.getItem('username')){
                        var data = {};
                        data.b_id = this.form.b_id;
                        data.b_rename = sessionStorage.getItem('username');
                        data.b_reimg = sessionStorage.getItem('logo');
                        data.b_recontent = this.form.b_recontent;
                        data.b_retime = this.form.b_retime.getTime() / 1000;
                        var res = JSON.parse(await replyBoards(data));
                        if(res.errcode == 0){
                          this.$message({type:'success', message:res.msg});
                          this.$router.push('/BoardComment');
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
              this.$router.push('/BoardComment');
           }
        }
    }
</script>
<style lang="scss"> @import '../../assets/scss/emoji.scss'; </style>