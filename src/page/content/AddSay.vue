<template>
   <div>
      <head-top></head-top>
      <!-- 新增 -->
      <el-row  class="art" v-if="show">
         <div class="el-col el-col-12 el-col-offset-4">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="这刻想法" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <div class="upload">
                    <span>图片上传</span>
                    <div class="uploadImg">
                      <div v-if="form.image" >
                          <img :src="form.image">
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
                   <el-button>取消</el-button>
                </el-form-item>
            </el-form>
          </div>
      </el-row>
      <!-- 编辑 -->
      <el-row  class="art" v-else>
         <div class="el-col el-col-12 el-col-offset-4">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="这刻想法" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <div class="upload">
                    <span>图片上传</span>
                    <div class="uploadImg">
                      <div v-if="form.image" >
                          <img :src="form.image">
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
                   <el-button>取消</el-button>
                </el-form-item>
            </el-form>
          </div>
      </el-row>
   </div>
</template>

<script type="text/javascript">
    import headTop from '../public/HeadTop';
    import { sayImgUpload, addSay, getOneSay } from '../../api/getData';
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
              name: [
                {required: true, message: '请说说你这一刻的想法', trigger: 'blur'}
              ],
              newstime: [
                {required: true, message: '请选择发布时间', trigger: 'blur'}
              ]
            },
            imageUrl: '',
            show: true
         }
      },
      components: {headTop},
      created() {
        if(this.$route.query.id){
          this.show = false;
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
              console.log(res )
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
           console.log(files);
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
              this.imageUrl = res.filepath;
              this.$message({ showClose: true, type: 'success', message: res.msg })
           }else{
              this.$message({ showClose: true, type: 'error', message: res.msg });
           }
        },
        //提交
        onSubmit(formName) {
          this.$refs[formName].validate(async(valid) => {
            if (valid) {
              if(sessionStorage.getItem('username')){
                var data = {};
                data.s_content = this.form.name;
                data.s_img = this.imageUrl;
                data.s_time = this.form.newstime.getTime() / 1000;
                data.s_show = this.form.open ? 1 : 0;
                data.s_root = sessionStorage.getItem('username');
                var res = JSON.parse(await addSay(data));
                res.errcode == 0 ? this.$router.push('/SayList') : this.$message.error(res.msg);
              }else{
                this.$router.push("/");
              }
            } else {
               this.$notify.error({ title: '错误', message: '请检查输入是否正确', offset: 100 });
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