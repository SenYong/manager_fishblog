<template>
  <div class="signin">
    <div class="signinpanel">
      <div class="row">
        <div class="col-sm-7">
          <div class="signin-info">
            <div class="logopanel m-b">
            </div>
            <div class="m-b"></div>
            <h4>欢迎来到 <strong>小鱼博客</strong></h4>
            <ul class="m-b"></ul>
          </div>
        </div>
        <div class="col-sm-5">
          <form method="post" action="index.html">
            <p class="m-t-md" id="err_msg">登录到小鱼博客后台</p>
            <input type="text" class="form-control uname" placeholder="用户名"  v-model="username" />
            <input type="password" class="form-control pword m-b" placeholder="密码"  v-model="password" />
            <div style="margin-bottom:70px">
              <input type="text" class="form-control" placeholder="验证码" style="color:black;width:120px;float:left;margin:0px 0px;" v-model="codes"/>
              <!-- <img src="http://www.myblog.com/?s=Admin/Login/verify" onclick="javascript:this.src='http://www.myblog.com/?s=Admin/Login/verify&tm='+Math.random();" style="float:right;cursor: pointer"/> -->
              <img :src="imgUrl" @click="getImg" style="float:right;cursor: pointer"/>
            </div>
            <input class="btn btn-success btn-block" id="login_btn" value="登录" @click="sign()" type="button" />
          </form>
        </div>
      </div>
      <div class="signup-footer">
        <!-- <div class="pull-left"> &copy; 2017-2019 All Rights Reserved. snake </div> -->
        <div class="pull-left" style="color:red">温馨提示 : 用户名不存在将自动创建</div>
      </div>
    </div>
  </div>
</template>
<script>
   import { login } from '../../api/getData';
   import { baseUrl } from '../../config/env';
   export default{
     data () {
        return {
           username: '',
           password: '',
           codes: '',
           baseUrl,
           imgUrl: ''
        }
     },
     created () {
        if(sessionStorage.getItem('username')){
           this.$router.push('/manage');
        }else{
           this.imgUrl =  baseUrl + "/?s=Admin/Login/verify";
        }
     },
     methods:{
       async getImg(){
          this.imgUrl =  baseUrl + "/?s=Admin/Login/verify&tm=" + Math.random();
       },
       async sign (){
          if(this.username == ''){
             this.$message({type:'warning', message:'用户名不能为空'});
             return false;
          }else if(this.password == ''){
             this.$message({type:'warning', message:'密码不能为空'});
             return false;
          }else if(this.password.length < 6){
             this.$message({type:'warning', message:'密码长度不能小于6位数'});
             return false;
          }else if(this.codes == ''){
             this.$message({type:'warning', message:'请输入验证码'});
             return false;
          }
          var res = JSON.parse(await login({username:this.username, password:this.password, codes:this.codes}));
          if(res.errcode == 0 || res.errcode == 2){
             this.$message({type:'success', message:res.msg});
             sessionStorage.setItem('username', res.username);
             sessionStorage.setItem('logo', res.logo);
             sessionStorage.setItem('class', res.class);
             this.$router.push('/manage');
          }else{
             this.$message({type:'error', message:res.msg});
          }
       }
     }
   }
</script>

<style lang="css" scoped>
  @import '../../assets/css/boostrap.css';
  @import '../../assets/css/font-awesome.min.css';
  @import '../../assets/css/animate.min.css';
  @import '../../assets/css/style.min.css';
  @import '../../assets/css/login.min.css';
</style>
