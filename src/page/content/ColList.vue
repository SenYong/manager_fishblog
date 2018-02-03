<template>
    <div class="ColList">
        <head-top></head-top>
        <div class="tables">
            <template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="ID">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.c_id}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="栏目名称" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.c_name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="栏目别称">
                  <template slot-scope="scope">
                    <span>{{ scope.row.c_rename }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="关键字">
                  <template slot-scope="scope">
                    <span>{{ scope.row.c_keyword }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="描述" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.c_desc }}</span>
                  </template>
                </el-table-column>
                 <el-table-column label="发布时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.c_time }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="是否公开">
                  <template slot-scope="scope">
                    <span>{{ scope.row.c_show }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="添加人">
                  <template slot-scope="scope">
                    <span>{{ scope.row.c_root }}</span>
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
        <!-- <div class="page">
          <el-pagination background @current-change="handleCurrentChange" current-page.sync="5" :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
        </div> -->
    </div>
</template>
<script type="text/javascript">
    import headTop from '../public/HeadTop';
    import { getCat, delCat } from '../../api/getData'
    export default{
       data () {
          return {
            tableData: []
          }
       },
       components: { headTop },
       created () {
          this.init();
       },
       methods: {
          async init () {
            var res = JSON.parse(await getCat());
            if(res.errcode == 0){
               this.tableData = [];
               for(var i = 0; i < res.data.length; i++){
                 res.data[i]['c_time'] = this.timestampToTime(res.data[i]['c_time']);
               }
               this.tableData = res.data;
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
          handleEdit (index, row){
            this.$router.push({
              path: '/AddCol',
              query: { id: row.c_id}
            })
          },
          //删除
          async handleDelete(index, row){
             var res = JSON.parse(await delCat({'id': row.c_id}));
             if(res.errcode == 0){
               this.$message({type: 'success', message: res.msg});
               this.tableData.splice(index,1);
             }else{
               this.$message({type: 'error', message: res.msg});
             }
          }
       }
    }
</script>