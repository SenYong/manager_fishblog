<template>
    <div class="SayList">
        <head-top></head-top> 
        <div class="tables">
            <template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="ID">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.s_id}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="说说内容" width="200">
                  <template slot-scope="scope">
                     <span v-html="emoji(scope.row.s_content)"></span>
                  </template>
                </el-table-column>
                <el-table-column label="说说图片">
                  <template slot-scope="scope">
                    <img :src="baseUrl+scope.row.s_img" class="userlogo">
                  </template>
                </el-table-column>
                <el-table-column label="日期" width="180">
                  <template slot-scope="scope">
                    <span>{{scope.row.s_time}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="是否公开">
                  <template slot-scope="scope">
                    <span>{{scope.row.s_show ? '是' : '否'}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="发表人">
                  <template slot-scope="scope">
                    <span>{{ scope.row.s_root }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="点击量">
                  <template slot-scope="scope">
                    <span>{{ scope.row.s_hit }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="评论数">
                  <template slot-scope="scope">
                    <span>{{ scope.row.s_num }}</span>
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
        <div class="page">
          <el-pagination background @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
        </div>
    </div>
</template>

<script type="text/javascript">
    import headTop from '../public/HeadTop';
    import { getSay, deleteSay } from '../../api/getData';
    import { baseUrl } from '../../config/env';
    export default{
        data () {
            return {
                tableData: [],
                total: 10,
                num: 0,
                page: 10,
                baseUrl,
                currentPage:1
            }
        },
        components: { headTop },
        created () {
            if(this.$route.query.num) this.num = this.$route.query.num;
            this.init(this.num,this.page);
        },
        methods: {
            async init(num,page) { 
              var res = JSON.parse(await getSay({'num': num * page, page}));
              if(res.errcode == 0){
                 this.total = res.total;
                 this.tableData = [];
                 for(var i = 0; i < res.data.length; i++){
                   res.data[i]['s_time'] = this.timestampToTime(res.data[i]['s_time']);
                 }
                 this.tableData = res.data;
              }else{
                 this.$message({ type: 'error', message: res.msg });
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
            //分页
            handleCurrentChange(val) {
               this.currentPage = val;
               this.num = val - 1;
               this.init(this.num, this.page);
            },
            //编辑
            handleEdit (index, row){
              sessionStorage.getItem('class') === '1' ? this.$router.push({ path: '/AddSay', query: {id: row.s_id, num: this.num}}) : this.$message({ type: 'warning', message: '您暂时还没有编辑说说权限' })
            },
            async handleDelete(index, row){
              if(sessionStorage.getItem('class') === '1'){
                 var res = JSON.parse(await deleteSay({'id': row.s_id}));
                 if(res.errcode == 0){
                    this.tableData.splice(index,1);
                    this.$message({ type: 'success', message: res.msg });
                 }else{
                     this.$message({ type: 'error', message: res.msg });
                 }
              }else{
                 this.$message({ type: 'warning', message: '您暂时还没有删除说说权限' });
              }
            }
        }
    }
</script>

<style>
  .page{
    padding: 20px;
    float: right;
  }
  .demo-table-expand{
    font-size: 0;
  }
  .demo-table-expand label{
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item{
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
