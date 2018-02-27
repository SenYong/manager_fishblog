<template>
    <div class="SayComment">
        <head-top></head-top>
        <div class="tables">
            <template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="说说ID">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.s_id}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="说说内容">
                  <template slot-scope="scope">
                    <span>{{ scope.row.s_content }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="评论用户">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sc_name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="用户头像">
                  <template slot-scope="scope">
                    <img :src="baseUrl+scope.row.sc_img" class="userlogo">
                  </template>
                </el-table-column>
                <el-table-column label="评论时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sc_time }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="评论内容">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sc_content }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="地址">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sc_ip }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="回复人">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sc_rename ? scope.row.sc_rename : '无' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="回复人头像">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sc_reimg ? scope.row.sc_reimg : '无' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="回复内容">
                  <template slot-scope="scope">
                    <span v-if="scope.row.sc_recontent" v-html="emoji(scope.row.sc_recontent)"></span>
                    <span v-else>无</span>
                  </template>
                </el-table-column>
                <el-table-column label="回复时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sc_retime ? scope.row.sc_retime : '无' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="是否回复">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sc_retime ? '是' : '否' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">回复</el-button>
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
    import { getSayComment } from '../../api/getData';
    import { baseUrl } from '../../config/env';
    export default{
        data() {
           return {
             tableData: [],
             baseUrl
           } 
        },
        components: {headTop},
        created() {
          this.init();
        },
        methods: {
          async init(){
            var res = JSON.parse(await getSayComment());
            if(res.errcode == 0){
               for(var i = 0; i < res.data.length; i++){
                  res.data[i]['s_time'] = this.timestampToTime(res.data[i]['s_time']);
               }
               console.log(res.data)
               this.tableData = res.data;
            }else{
               this.$message.error(res.msg);
            }
          },
          //时间戳转换成时间
          timestampToTime(time){
            var date = new Date(time * 1000);
            var years = date.getFullYear() + '-';
            var months = (date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1) + '-';
            var days = date.getDate() + ' ';
            var hours = date.getHours() + ':';
            var minutes = date.getMinutes() + ':';
            var seconds = date.getSeconds();
            return years + months + days + hours + minutes + seconds;
          },
          //回复
          handleEdit(index, row){
            sessionStorage.getItem('class') === '1' ? this.$router.push({path: '/replySay', query: {id: row.sc_id}}) : this.$message({type:'warning', message: '您暂时还没有回复文章评论权限'});
          }
        }
    }
</script>