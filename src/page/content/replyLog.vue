<template>
    <div class="replyLog">
        <head-top></head-top>
        <el-row  class="art" v-if="show">
         <div class="el-col el-col-12 el-col-offset-4">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                <el-input v-model="form.lc_id" :disabled="true" type="hidden"></el-input>
                <el-form-item label="日志标题" prop="l_name">
                    <el-input v-model="form.l_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论用户" prop="lc_name">
                    <el-input v-model="form.lc_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论内容" prop="lc_content">
                    <el-input v-model="form.lc_content" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论时间" prop="lc_time">
                  <div class="block">
                      <el-date-picker v-model="form.lc_time" type="datetime" placeholder="选择发布时间" :disabled="true"></el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="回复人" prop="lc_rename">
                    <el-input v-model="form.lc_rename" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="回复时间" prop="lc_retime">
                  <div class="block">
                      <el-date-picker v-model="form.lc_retime" type="datetime" placeholder="选择回复时间"></el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="回复内容" prop="lc_recontent" id="box">
                  <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="请输入内容" resize="none" v-model="form.lc_recontent"></el-input>
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
    import { getOneLogComment, replyLogs } from '../../api/getData';
    export default{
        data(){
            return{
               form:{
                 l_name:'',
                 lc_name: '',
                 lc_content: '',
                 lc_time: '',
                 lc_rename: '',
                 lc_retime: '',
                 lc_recontent: '',
                 lc_id: ''
               },
               rules:{
                 lc_retime: [ {required: true, message: '请选择回复时间', trigger: 'blur'} ],
                 lc_recontent: [ {required: true, message: '请选择回复内容', trigger: 'blur'} ]
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
              var res = JSON.parse(await getOneLogComment({id}));
              console.log(res)
              if(res.errcode == 0){
                this.form.lc_id = res.data.lc_id;
                this.form.l_name = res.data.l_name;
                this.form.lc_name = res.data.lc_name;
                this.form.lc_content = res.data.lc_content;
                this.form.lc_time = new Date(res.data.lc_time * 1000);
                this.form.lc_rename = this.form.lc_rename ? this.form.lc_rename : sessionStorage.getItem('username');
                this.form.lc_recontent = res.data.lc_recontent ? res.data.lc_recontent : '';
                this.form.lc_retime = res.data.lc_retime ? new Date(res.data.lc_retime * 1000) : '';
              }else{
                this.$message({type:'error', message:res.msg});
              }
           },
           //自定义事件,父组件与子组件之间的通讯
           selectEmoji(code){
              this.showEmoji = false;
              this.form.lc_recontent += code
           },
           onSubmit(formName){
              this.$refs[formName].validate(async(valid) => {
                  if(valid){
                     if(sessionStorage.getItem('username')){
                        var data = {};
                        data.lc_id = this.form.lc_id;
                        data.lc_rename = sessionStorage.getItem('username');
                        data.lc_reimg = sessionStorage.getItem('logo');
                        data.lc_recontent = this.form.lc_recontent;
                        data.lc_retime = this.form.lc_retime.getTime() / 1000;
                        var res = JSON.parse(await replyLogs(data));
                        if(res.errcode == 0){
                           this.$message({type:'success', message:res.msg});   
                           this.$router.push('/LogComment')  
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
              this.$router.push('/LogComment');
           }
        }
    }
</script>

<style lang="scss"> @import '../../assets/scss/emoji.scss'; </style>