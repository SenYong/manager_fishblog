<template>
   <div>
      <head-top></head-top>
      <!-- 新增 -->
      <el-row  class="art" v-if="show">
         <div class="el-col el-col-12 el-col-offset-4">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="这刻想法" prop="name" id="box">
                  <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="请输入内容" resize="none" v-model="form.name"></el-input>
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
                <el-form-item label="这刻想法" prop="name" id="box">
                  <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="请输入内容" resize="none" v-model="form.name"></el-input>
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
                <div class="upload">
                    <span>图片上传</span>
                    <div class="uploadImg">
                      <div v-if="form.image" >
                          <img :src="baseUrl + form.image">
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
    import vueEmoji from '../../components/emoji.vue';
    import { sayImgUpload, addSay, getOneSay, updateSay } from '../../api/getData';
    import { baseUrl } from '../../config/env';
    export default{
      data () {
         return {
            form: {
               name: '',
               image: '',
               newstime: '',
               open: ''
            },
            rules: {
              name: [ {required: true, message: '请说说你这一刻的想法', trigger: 'blur'} ],
              newstime: [ {required: true, message: '请选择发布时间', trigger: 'blur'} ]
            },
            imageUrl: '',
            show: true,
            baseUrl,
            id: "",
            showEmoji: false,
            num: 0
         }
      },
      components: {headTop, vueEmoji},
      created() {
        if(this.$route.query.id){
          this.show = false;
          this.num = this.$route.query.num;
          this.getData(this.$route.query.id)
        }else{
          this.show = true;
        }
      },
      methods: {
        //获取说说详情
        async getData (id) {
           var res = JSON.parse(await(getOneSay({id})));
           if(res.errcode == 0){
              this.id = res.data.s_id;
              this.form.name = res.data.s_content;
              this.form.image = res.data.s_img;
              this.form.newstime = new Date(res.data.s_time * 1000);
              this.form.open = !!res.data.s_show;
           }else{
              this.$message({ type: 'error', message: res.msg });
           }
        },
        //图片上传
        onFileChange: function(e){
           var files = e.target.files || e.dataTransfer.files;
           if(!files.length) return;
           this.createImage(files[0]);
        },
        createImage: function(file){
           var reader = new FileReader();
           var vm = this;
           reader.onload = (e) => {
              vm.form.image = e.target.result;
              this.uploadImg(e.target.result);
           }
           reader.readAsDataURL(file);
        },
        async uploadImg(image){
           var res = JSON.parse(await sayImgUpload({image}));
           if(res.errcode == 0){
              this.form.image = res.filepath;
              this.$message({ showClose: true, type: 'success', message: res.msg })
           }else{
              this.$message({ showClose: true, type: 'error', message: res.msg });
           }
        },
        //自定义事件,父组件与子组件之间的通讯
        selectEmoji(code){
          this.showEmoji = false;
          this.form.name += code
        },
        //提交
        onSubmit(formName) {
          this.$refs[formName].validate(async(valid) => {
            if (valid) {
              if(sessionStorage.getItem('username')){
                if(sessionStorage.getItem('class') !== '1'){
                  this.$message({ type: 'warning', message: '您暂时还没有添加说说权限' });
                  return false;
                }
                var data = {};
                data.s_content = this.form.name;
                data.s_img = this.form.image;
                data.s_time = this.form.newstime.getTime() / 1000;
                data.s_show = this.form.open ? 1 : 0;
                data.s_root = sessionStorage.getItem('username');
                if(this.id){
                   data.s_id = this.id;
                   var res = JSON.parse(await updateSay(data));
                }else{
                   var res = JSON.parse(await addSay(data));
                }
                if(res.errcode == 0){
                   this.$message({type:'success', message:res.msg});
                   this.$router.push({ path: '/SayList', query: {num: this.num} });
                }else{
                   this.$message.error(res.msg);
                }
              }else{
                this.$router.push("/");
              }
            } else {
               this.$notify.error({ title: '错误', message: '请检查输入是否正确', offset: 100 });
            }
          });
        },
        //取消
        cancel(){
          this.$router.push({ path: '/SayList', query: {num: this.num} });
        }
      }
    }
</script>
<style lang="scss"> @import '../../assets/scss/emoji.scss'; </style>
