<template>
    <div class="AddUser">
        <head-top></head-top>
        <!-- 新增 -->
        <el-row  class="art" v-if="show">
           <div class="el-col el-col-12 el-col-offset-4">
              <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                  <el-form-item label="注册账号" prop="username">
                      <el-input v-model="form.username"></el-input>
                  </el-form-item>
                  <el-form-item label="注册密码" prop="password">
                      <el-input type="password" v-model="form.password"></el-input>
                  </el-form-item>
                  <div class="upload">
                      <span>头像上传</span>
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
                  <el-form-item label="权限" prop="class">
                      <el-select v-model="form.class" placeholder="请分配用户权限">
                           <el-option :label="item.name" :value="item.id" v-for="(item,index) in classList"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                      <el-input v-model="form.email"></el-input>
                  </el-form-item>
                  <el-form-item label="注册时间" prop="createtime">
                    <div class="block">
                        <el-date-picker v-model="form.createtime" type="datetime" placeholder="选择注册时间"></el-date-picker>
                    </div>
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
                  <input type="hidden" value="form.id">
                  <el-form-item label="权限" prop="class">
                      <el-select v-model="form.class" placeholder="请分配用户权限">
                           <el-option :label="item.name" :value="item.id" v-for="(item,index) in classList"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                      <el-input v-model="form.email"></el-input>
                  </el-form-item>
                  <el-form-item>
                     <el-button type="primary" @click="editUser('ruleForm')">立即修改</el-button>
                     <el-button>取消</el-button>
                  </el-form-item>
              </el-form>
            </div>
        </el-row>
    </div>
</template>
<script type="text/javascript">
    import headTop from '../public/HeadTop';
    import { addUser, getUserInfo, updateUser, userLogoUpload } from '../../api/getData';
    export default{
       data(){
         return{
            show:true,
            form:{
               name:'',
               password:'',
               image: '',
               class:"",
               email:"",
               createtime:"",
               id:""
            },
            rules:{
               username:[
                 {required:true, message:"注册账号不能为空", trigger:'blur'}
               ],
               password:[
                 {required:true, message:"注册密码不能为空", trigger:'blur'}
               ],
               email:[
                 { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                 { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
               ],
               class:[
                 {required:true, message:"请给注册用户分配合理权限", trigger:'blur'}
               ],
               createtime:[
                 {required:true, message:"请选择注册时间", trigger:'blur'}
               ]
            },
            classList:[ {id:1, name:'最高管理员'}, {id:2, name:'编辑'}, {id:3, name:'游客'} ],
            imageUrl: ''
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
          //初始化
          async getData(id){
             var res = JSON.parse(await getUserInfo({id}));
             if(res.errcode == 0){
                this.form.id = res.data.u_id;
                this.form.class = res.data.u_class;
                this.form.email = res.data.u_email;   
             }else{
                this.$message({
                  type: 'error',
                  message: res.msg
                })
             }
          },
          //图片上传
          onFileChange: function(e){
            var files = e.target.files || e.dataTransfer.files;
            if(!files.length) return;
            this.createImage(files[0]);
          },
          createImage: function(file){
             console.log(file)
             var reader = new FileReader();
             reader.onload = (e) =>{
                this.form.image = e.target.result;
                this.uploadImg(e.target.result);
             };
             reader.readAsDataURL(file);
          },
          async uploadImg(image){
             var res = JSON.parse(await userLogoUpload({image}));
             console.log(res)
             if(res.errcode == 0){
                this.imageUrl = res.filename;
                this.$message({type:'success', message:res.msg});
             }else{
                this.$message({type:'error', message:res.msg});
             }
          },
          //提交
          onSubmit(formName) {
            this.$refs[formName].validate(async(valid) => {
              if (valid) {
                if(sessionStorage.getItem('username')){
                  if(sessionStorage.getItem('class')!=='1'){
                     this.$message({
                       type:'warning',
                       message:"您暂时还没有添加用户权限"
                     });
                     return false;
                  }
                  var data = {};
                  data.u_name = this.form.username;
                  data.u_password = this.form.password;
                  data.u_class = this.form.class;
                  data.u_email = this.form.email;
                  data.u_createtime = this.form.createtime.getTime() / 1000;
                  data.u_root = sessionStorage.getItem('username');
                  var res = JSON.parse(await addUser(data));
                  res.errcode == 0 ? this.$router.push('/UserList') : this.$message.error(res.msg);
                }else{
                  this.$router.push("/");
                }
              } else {
                 this.$notify.error({ title: '错误', message: '请检查输入是否正确', offset: 100 });
              }
            });
          },
          //修改
          editUser(formName){
             this.$refs[formName].validate(async(valid) =>{
                if(valid){
                   var data = {};
                   data.u_id = this.form.id;
                   data.u_class = this.form.class;
                   data.u_email = this.form.email;
                   var res = JSON.parse(await updateUser(data));
                   if(res.errcode == 0){
                      this.$message({ type: 'success', message: res.msg });
                      this.$router.push('/UserList');
                   }else{
                      this.$message({ type: 'error', message: res.msg });
                   }
                }else{
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