<template>
  <div class="signin">
    <div class="signinpanel">
      <div class="row">
        <div class="col-sm-7">
          <div class="signin-info">
            <div class="logopanel m-b">
            </div>
            <div class="m-b"></div>
            <h4>欢迎使用 <strong>snake</strong></h4>
            <ul class="m-b"></ul>
          </div>
        </div>
        <div class="col-sm-5">
          <form method="post" action="index.html">
            <p class="m-t-md" id="err_msg">登录到snake后台</p>
            <input type="text" class="form-control uname" placeholder="用户名" id="user_name" v-model="username" />
            <input type="password" class="form-control pword m-b" placeholder="密码" id="password"  v-model="password" />
            <div style="margin-bottom:70px">
              <input type="text" class="form-control" placeholder="验证码" style="color:black;width:120px;float:left;margin:0px 0px;" name="code" id="code"/>
              <img src="{:url('checkVerify')}" onclick="javascript:this.src='{:url('checkVerify')}?tm='+Math.random();" style="float:right;cursor: pointer"/>
            </div>
            <input class="btn btn-success btn-block" id="login_btn" value="登录" @click="sign()" type="button" />
          </form>
        </div>
      </div>
      <div class="signup-footer">
        <div class="pull-left">
          &copy; 2017-2019 All Rights Reserved. snake
        </div>
      </div>
    </div>
  </div>
</template>
<script>
   import { login, verifyImg } from '../../api/getData'
   export default{
     data:function () {
        return {
           username: '',
           password: ''
        }
     },
     created () {
        if(sessionStorage.getItem('username')){
           this.$router.push('/manage');
        }
     },
     methods:{
       async sign (){
          if(this.username == ''){
             alert('用户名不能为空');
             return false;
          }else if(this.password == ''){
             alert('密码不能为空');
             return false;
          }else if(this.password.length < 6){
             alert('密码长度不能小于6位数');
             return false;
          }
          var res = JSON.parse(await login({username:this.username, password:this.password}));
          if(res.errcode == 0){
             sessionStorage.setItem('username', res.username);
             sessionStorage.setItem('logo', res.logo);
             sessionStorage.setItem('class', res.class);
             this.$router.push('/manage');
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
