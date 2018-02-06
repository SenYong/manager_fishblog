<template>
    <div class="UserList">
        <head-top></head-top>
        <div class="tables">
            <template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="ID">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.u_id}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="注册账号" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.u_name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="用户头像">
                  <template slot-scope="scope">
                    <img :src="baseUrl+scope.row.u_logo" class="userlogo">
                  </template>
                </el-table-column>
                <el-table-column label="权限">
                  <template slot-scope="scope">
                    <span v-if="scope.row.u_class == 1">最高管理员</span>
                    <span v-else-if="scope.row.u_class == 2">编辑</span>
                    <span v-else>游客</span>
                  </template>
                </el-table-column>
                <el-table-column label="邮箱">
                  <template slot-scope="scope">
                    <span>{{ scope.row.u_email }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.u_createtime }}</span>
                  </template>
                </el-table-column>
                 <el-table-column label="登录时间" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.u_logintime }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="注册地址">
                  <template slot-scope="scope">
                    <span>{{ scope.row.u_ip }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="登录次数">
                  <template slot-scope="scope">
                    <span>{{ scope.row.u_num }}</span>
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
    import { UserList, delUser } from '../../api/getData';
    import { baseUrl } from '../../config/env';
    export default{
        data(){
            return{
                tableData: [],
                baseUrl
            }
        },
        components:{headTop},
        created(){
           this.init();
        },
        methods:{
           async init(){  
              var res = JSON.parse(await UserList({'uclass':sessionStorage.getItem('class')}));
              if(res.errcode == 0){
                 this.tableData = [];
                 for(var i = 0; i < res.data.length; i++){
                    res.data[i]['u_createtime'] = this.timestampToTime(res.data[i]['u_createtime']);
                    res.data[i]['u_logintime'] ? res.data[i]['u_logintime'] = this.timestampToTime(res.data[i]['u_logintime']) : res.data[i]['u_logintime'] = '无登录';
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
             if(sessionStorage.getItem('class') === '1'){
                this.$router.push({
                    path: '/AddUser',
                    query: {id: row.u_id}
                });
             }else{
                this.$message({
                    type:'warning',
                    message:'您暂时还没有编辑用户权限'
                });
             }
           },
           //删除
           async handleDelete(index, row){
             if(sessionStorage.getItem('class') === '1'){
                var res = JSON.parse(await delUser({id: row.u_id}));
                if(res.errcode == 0){
                   this.$message({type:'success', message:res.msg});
                   this.tableData.splice(index,1);  
                }else{
                   this.$message({ type:'error', message: res.msg})
                }
             }else{
                this.$message({type: 'warning', message: '您暂时还没有删除用户权限'});
             } 
           }
        }
    }
</script>


