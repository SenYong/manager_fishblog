<template>
    <div class="ExplainList">
        <head-top></head-top>
        <div class="tables">
            <template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="ID">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.id}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="网站标题">
                  <template slot-scope="scope">
                    <span>{{ scope.row.title ? scope.row.title : '无' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="关键词">
                  <template slot-scope="scope">
                    <span>{{ scope.row.keyword ? scope.row.keyword : '无' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.createtime }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="描述">
                  <template slot-scope="scope">
                    <span>{{ scope.row.desc ? scope.row.desc : '无' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="站长">
                  <template slot-scope="scope">
                    <span>{{ scope.row.username ? scope.row.username : '无' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="QQ">
                  <template slot-scope="scope">
                    <span>{{ scope.row.qq ? scope.row.qq : '无' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="职业">
                  <template slot-scope="scope">
                    <span>{{ scope.row.profession ? scope.row.profession : '无' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="爱好">
                  <template slot-scope="scope">
                    <span>{{ scope.row.hobby ? scope.row.hobby : '无' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="图片">
                  <template slot-scope="scope">
                    <img :src="baseUrl+scope.row.img" class="userlogo">
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
        </div>
    </div>
</template>
<script type="text/javascript">
    import headTop from '../public/HeadTop';
    import {getSystemList, delSystem} from '../../api/getData';
    import { baseUrl } from '../../config/env';
    export default{
      data() {
        return{
           tableData: [],
           baseUrl
        }
      },
      components: {headTop},
      created(){
         this.init();
      },
      methods:{
        async init(){
           var res = JSON.parse(await getSystemList());
           if(res.errcode == 0){
             this.tableData = [];
             for(var i = 0; i < res.data.length; i++){
                res.data[i]['createtime'] = this.timestampToTime(res.data[i]['createtime']);
             }
             this.tableData = res.data;
           }else{
             this.$message({type:'error', message:res.msg});
           }
        },
        //时间戳转换成时间
        timestampToTime (time) {
           var date = new Date(time * 1000);
           var year = date.getFullYear() + '-';
           var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
           var day = date.getDate() + ' ';
           var hours = date.getHours() + ':';
           var minute = date.getMinutes() + ':';
           var second = date.getSeconds();
           return year + month + day + hours + minute + second;
        },
        //编辑
        handleEdit(index, row){
           sessionStorage.getItem('class') === '1' ? this.$router.push({path: '/Explain', query:{id: row.id}}) : this.$message({type: 'warning', message:'您暂时还没有编辑系统设置权限'});
        },
        //删除
        async handleDelete(index, row){
           if(sessionStorage.getItem('class') === '1'){
              var res = JSON.parse(await delSystem({id: row.id}));
              if(res.errcode == 0){
                 this.tableData.splice(index,1);
                 this.$message({type:'success', message:res.msg});
              }else{
                 this.$message({type:'error', message:res.msg});
              }
           }else{
              this.$message({type: 'warning', message:'您暂时还没有删除系统设置权限'});
           } 
        }
      }
    }
</script>