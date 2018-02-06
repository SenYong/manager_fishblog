<template>
    <div class="AddCol">
        <head-top></head-top>
        <!-- 新增 -->
        <el-row  class="art" v-if="show">
          <div class="el-col el-col-12 el-col-offset-4">
                <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                   <el-form-item label="栏目名称" prop="name">
                       <el-input v-model="form.name"></el-input>
                   </el-form-item>
                   <el-form-item label="栏目别名" prop="rename">
                       <el-input v-model="form.rename"></el-input>
                   </el-form-item>
                   <el-form-item label="描述" prop="desc">
                       <el-input type="textarea" v-model="form.desc"></el-input>
                   </el-form-item>
                    <el-form-item label="关键字" prop="label">
                       <el-input v-model="form.label"></el-input>
                   </el-form-item>
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
                       <el-button  @click="cancel">取消</el-button>
                   </el-form-item>
                </el-form>
            </div>
        </el-row>
        <!-- 编辑 -->
        <el-row  class="art" v-else>
          <div class="el-col el-col-12 el-col-offset-4">
                <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                   <el-form-item label="栏目名称" prop="name">
                       <el-input v-model="form.name"></el-input>
                   </el-form-item>
                   <el-form-item label="栏目别名" prop="rename">
                       <el-input v-model="form.rename"></el-input>
                   </el-form-item>
                   <el-form-item label="描述" prop="desc">
                       <el-input type="textarea" v-model="form.desc"></el-input>
                   </el-form-item>
                    <el-form-item label="关键字" prop="label">
                       <el-input v-model="form.label"></el-input>
                   </el-form-item>
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
    import { addCat, getOneCat } from '../../api/getData';
    export default{
        data () {
            return {
                form:{
                   name: "",
                   rename: "",
                   desc: "",
                   label: "",
                   newstime: "",
                   open: false
                },
                rules: {
                   name: [
                     {required: true, message: "栏目名称不能为空", trigger: "blur"}
                   ],
                   desc: [
                     {required: true, message: "描述不能为空", trigger:"blur"}
                   ],
                   label: [
                     {required: true, message: "关键字不能为空", trigger: "blur"}
                   ],
                   newstime: [
                     {required: true, message: "请选择发布时间", trigger: "blur"}
                   ]
                },
                show:true
            }
        },
        components: { headTop },
        created () {
            if(this.$route.query.id){
                this.getData(this.$route.query.id);
                this.show = false;
            }else{
                this.show = true;
            }
        },
        methods: {
           //获取栏目详情
           async getData(id){
             var res = JSON.parse(await getOneCat({id}));
             if(res.errcode == 0){ 
                this.form.name = res.data.c_name;
                this.form.rename = res.data.c_rename;
                this.form.desc = res.data.c_desc;
                this.form.label = res.data.c_keyword;
                this.form.newstime = new Date(res.data.c_time * 1000);
                this.form.open = !!res.data.c_show;
             }else{
                this.$message({type:'error', message: res.msg});
             }
           },
           onSubmit(formName) {
            this.$refs[formName].validate(async(valid) => {
              if (valid) {
                if(sessionStorage.getItem('username')){
                    var data = {};
                    data.c_name = this.form.name;
                    data.c_rename = this.form.rename;
                    data.c_desc = this.form.desc;
                    data.c_keyword = this.form.label;
                    data.c_time = this.form.newstime.getTime() / 1000;
                    data.c_root = sessionStorage.getItem('username');
                    data.c_show = this.form.open ? 1 : 0;
                    var res = JSON.parse(await addCat(data));
                    res.errcode == 0 ? this.$router.push('/ColList') : this.$message.error(res.msg);
                }
              } else {
                 this.$notify.error({ title: '错误', message: '请检查输入是否正确', offset: 100 });
              }
            });
          },
          cancel() {
            this.$router.push('/ColList');
          }
        }
    }
</script>