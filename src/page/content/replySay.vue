<template>
    <div class="replySay">
        <head-top></head-top>
        <el-row  class="art" v-if="show">
         <div class="el-col el-col-12 el-col-offset-4">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                <el-input v-model="form.sc_id" :disabled="true" type="hidden"></el-input>
                <el-form-item label="说说内容" prop="s_content">
                    <el-input v-model="form.s_content" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论用户" prop="sc_name">
                    <el-input v-model="form.sc_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论内容" prop="sc_content">
                    <el-input v-model="form.sc_content" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论时间" prop="sc_time">
                  <div class="block">
                      <el-date-picker v-model="form.sc_time" type="datetime" placeholder="选择发布时间" :disabled="true"></el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="回复人" prop="sc_rename">
                    <el-input v-model="form.sc_rename" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="回复时间" prop="sc_retime">
                  <div class="block">
                      <el-date-picker v-model="form.sc_retime" type="datetime" placeholder="选择回复时间"></el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="回复内容" prop="sc_recontent" id="box">
                  <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="请输入内容" resize="none" v-model="form.sc_recontent"></el-input>
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
    import vueEmoji from '../../components/emoji.vue'
    import { getOneSayComment, replySays } from '../../api/getData';
    export default{
        data(){
          return {
             form:{
                s_content: '',
                sc_name: '',
                sc_content: '',
                sc_time: '',
                sc_rename: '',
                sc_retime: '',
                sc_recontent: '',
                sc_id: ''
             },
             rules:{
                sc_retime: [ {required: true, message: '请选择回复时间', trigger: 'blur'} ],
                sc_recontent: [ {required: true, message: '请选择回复内容', trigger: 'blur'} ]
             },
             show: true,
             showEmoji: false
          }
        },
        components: {headTop, vueEmoji},
        created(){
          if(this.$route.query.id){
             this.getData(this.$route.query.id)
          }
        },
        methods: {
           async getData(id){
              var res = JSON.parse(await getOneSayComment({id}));
              if(res.errcode == 0){
                this.form.sc_id = res.data.sc_id;
                this.form.s_content = res.data.s_content;
                this.form.sc_name = res.data.sc_name;
                this.form.sc_content = res.data.sc_content;
                this.form.sc_time = new Date(res.data.sc_time * 1000);
                this.form.sc_rename = this.form.sc_rename ? this.form.sc_rename : sessionStorage.getItem('username');
                this.form.sc_recontent = res.data.sc_recontent ? res.data.sc_recontent : '';
                this.form.sc_retime = res.data.sc_retime ? new Date(res.data.sc_retime * 1000) : '';
              }else{
                this.$message({type:'error', message:res.msg});
              }
           },
           //自定义事件,父组件与子组件之间的通讯
           selectEmoji(code){
              this.showEmoji = false;
              this.form.sc_recontent += code
           },
           onSubmit(formName){
              this.$refs[formName].validate(async(valid) => {
                  if(valid){
                     if(sessionStorage.getItem('username')){
                        var data = {};
                        data.sc_id = this.form.sc_id;
                        data.sc_rename = sessionStorage.getItem('username');
                        data.sc_reimg = sessionStorage.getItem('logo');
                        data.sc_recontent = this.form.sc_recontent;
                        data.sc_retime = this.form.sc_retime.getTime() / 1000;
                        var res = JSON.parse(await replySays(data));
                        if(res.errcode == 0){
                           this.$message({type:'success', message:res.msg});
                           this.$router.push('/SayComment')
                        }else{
                           this.$message.error(res.msg)
                        }
                     }
                  }else{
                     this.$notify.error({ title: '错误', message: '请检查输入是否正确', offset: 100 });
                  }
              })
           },
           cancel(){
              this.$router.push('/SayComment');
           }
        }
    }
</script>
<style lang="scss"> @import '../../assets/scss/emoji.scss'; </style>