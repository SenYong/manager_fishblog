<template>
    <div class="explain">
        <head-top></head-top>
        <!-- 新增 -->
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
                        <div class="block">
                            <el-date-picker v-model="form.createtime" type="datetime" placeholder="选择发布时间"></el-date-picker>
                        </div>
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
                            <div v-if="form.img" >
                                <img :src="baseUrl+form.img">
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
        <!-- 编辑 -->
        <el-row  class="art" v-else>
          <div class="el-col el-col-12 el-col-offset-4">
                <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="网站标题" prop="title">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="关键字" prop="keyword">
                        <el-input v-model="form.keyword"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间" prop="createtime">
                        <div class="block">
                            <el-date-picker v-model="form.createtime" type="datetime" placeholder="选择发布时间"></el-date-picker>
                        </div>
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
                            <div v-if="form.img" >
                                <img :src="baseUrl+form.img">
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
    import {systemImgUpload, addSystem, getOneSystem, updateSystem} from '../../api/getData';
    import { baseUrl } from '../../config/env'; 
    export default{
        data(){
           return {
              show: true,
              form: {
                title: '小鱼博客',
                keyword: '青空,情感聊吧,study,青青唠叨',
                createtime: '',
                desc: '青春因为爱情而美丽，青春就要有青春的活力',
                username: '许勇',
                qq: '1149250421',
                profession: '前端工程师,php工程师',
                hobby: '旅游,睡觉,玩游戏',
                netname: '江湖之养马人',
                img: '',
                explain: "许勇森，男，一个90后草帽小子！15年3月入行，从业已经将近2年了。从搬砖一样的生活方式换成了现在有“单”而居的日子。跟我的职业相比,告别了朝九晚五，躲过了风吹日晒，虽然不再有阶梯式的工资，但是偶尔可以给自己放放假，一起轻装旅行。 人生就是一个得与失的过程，而我却是一个幸运者，得到的永远比失去的多。虽然刚开始入行时很辛苦，但是我仍然很享受那些熬得只剩下黑眼圈的日子，因为我在学习使用html、css、js、PHP、Java...中激发了兴趣，然后越走越远....从业到现在总是坚持的原则，喜欢一句话“冥冥中该来则来，无处可逃”。。。~W_W~",
                program: '许多人会在意别人对自己的看法,希望得到所有人的认可,结果平添出很多的烦恼。我们不可能让所有的人都对着自己唱赞歌,总会有那么一些不入耳的声音,千万不要因此而坏了每天好心情,学如逆水行舟,不进则退'
              },
              rules: {
                title: [
                  {required:true, message:'请输入网站标题', trigger:'blur'}
                ],
                createtime:[
                  {required:true, message:'请选择发布时间', trigger:'blur'}
                ]
              },
              baseUrl,
              id: ''
           }
        },
        components: {headTop},
        created(){
           if(this.$route.query.id){
              this.show = false;
              this.getData(this.$route.query.id);
           }else{
              this.show = true;
           }
        },
        methods: {
           //获取系统详情
           async getData(id){
              var res = JSON.parse(await getOneSystem({id}));
              if(res.errcode == 0){
                 this.id = res.data.id;
                 res.data.createtime = new Date(res.data.createtime * 1000);
                 this.form = res.data;
              }else{
                 this.$message({type:'error', message:res.msg});
              }
           },
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
               }
               reader.readAsDataURL(file)
           },
           async uploadImg(image){
              var res = JSON.parse(await systemImgUpload({image}));
              if(res.errcode == 0){
                this.form.img = res.filepath;
                this.$message({type:'success', message:res.msg});
              }else{
                this.$message({type:'error', message:res.msg});
              }
           },
           //提交
           onSubmit(formName){
                this.$refs[formName].validate(async (valid) =>{
                    if(valid){
                       if(sessionStorage.getItem('username')){
                           if(sessionStorage.getItem('class') !== '1'){
                               this.$message({ type: 'warning', message: '您暂时还没有添加系统设置权限' });
                               return false;
                           }
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
                           data.img = this.form.img;
                           data.explain = this.form.explain;
                           data.program = this.form.program;
                           if(this.id){
                             data.id = this.id;
                             var res = JSON.parse(await updateSystem(data));
                           }else{
                             var res = JSON.parse(await addSystem(data));
                           }
                           res.errcode == 0 ? this.$router.push('/ExplainList') : this.$message({ type: 'error', message: res.msg });
                       }else{
                           this.$router.push('/');
                       }
                    }else{
                       this.$notify.error({ title: '错误', message: '请检查输入是否正确', offset: 100 });
                    }
                })
            },
            cancel(){
                this.$router.push('/ExplainList');
            }
        }
    }
</script>