<template>
    <div class="replyArt">
        <head-top></head-top>
        <el-row  class="art" v-if="show">
         <div class="el-col el-col-12 el-col-offset-4">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="文章标题" prop="name">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论用户" prop="name">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论内容" prop="name">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论时间" prop="newstime">
                  <div class="block">
                      <el-date-picker v-model="form.newstime" type="datetime" placeholder="选择发布时间" :disabled="true"></el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="回复人" prop="name">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="回复时间" prop="newstime">
                  <div class="block">
                      <el-date-picker v-model="form.newstime" type="datetime" placeholder="选择发布时间"></el-date-picker>
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
    import { getOneArtComment } from '../../api/getData';
    export default{
        data(){
            return{
               form:{

               },
               rules:{

               },
               show: true
            }
        },
        components: {headTop},
        created(){
           if(this.$route.query.id){
             this.getData(this.$route.query.id);
           }
        },
        methods:{
           async getData(id){
              console.log(JSON.parse(await getOneArtComment(id)));
           },
           onSubmit(formName){
              this.$refs[formName].validate(async(valid) => {
                  if(valid){

                  }else{
                     this.$notify.error({ title: '错误', message: '请检查输入是否正确', offset: 100 });
                  }
              })
           },
           cancel(){

           }
        }
    }
</script>