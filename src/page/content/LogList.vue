<template>
   <div class="LogList">
       <head-top></head-top>
       <div class="tables">
            <template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="ID">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.l_id}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="标题" width="200">
                  <template slot-scope="scope">
                    <span>{{ scope.row.l_name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="日期">
                  <template slot-scope="scope">
                    <span>{{ scope.row.l_time }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="是否公开">
                  <template slot-scope="scope">
                    <span>{{ scope.row.l_show }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="是否原创">
                  <template slot-scope="scope">
                    <span>{{ scope.row.l_original }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="发表人">
                  <template slot-scope="scope">
                    <span>{{ scope.row.l_root }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="点击量">
                  <template slot-scope="scope">
                    <span>{{ scope.row.l_hit }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="评论数">
                  <template slot-scope="scope">
                    <span>{{ scope.row.l_num }}</span>
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
     import {getLog} from '../../api/getData';
    export default{
        data(){
            return{
               tableData:[]
            }
        },
        components:{headTop},
        created(){
           this.init();
        },
        methods:{
           async init(){
             var res = JSON.parse(await getLog());
             console.log(res)
             if(res.errcode == 0){
                this.tableData = [];
                for(var i = 0; i < res.data.length; i++){
                    res.data[i]['l_time'] = this.timestampToTime(res.data[i]['l_time']);
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
           handleEdit(index,row){
             this.$router.push({
                path: '/AddLog',
                query: {id: row.l_id}
             })
           }
        }
    }
</script>