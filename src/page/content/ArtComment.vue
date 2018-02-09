<template>
   <div class="ArtComment">
       <head-top></head-top>
       <div class="tables">
            <template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="文章ID">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.a_id}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="文章标题">
                  <template slot-scope="scope">
                    <span>{{ scope.row.a_name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="评论用户">
                  <template slot-scope="scope">
                    <span>{{ scope.row.ac_name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="用户头像">
                  <template slot-scope="scope">
                    <img :src="baseUrl+scope.row.ac_img" class="userlogo">
                  </template>
                </el-table-column>
                <el-table-column label="评论时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.ac_time }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="地址">
                  <template slot-scope="scope">
                    <span>{{ scope.row.ac_ip }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="回复人">
                  <template slot-scope="scope">
                    <span>{{ scope.row.ac_rename ? scope.row.ac_rename : '无' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="回复人头像">
                  <template slot-scope="scope">
                    <span>{{ scope.row.ac_reimg ? scope.row.ac_reimg : '无' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="回复内容">
                  <template slot-scope="scope">
                    <span>{{ scope.row.ac_recontent ? scope.row.ac_recontent : '无' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="回复时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.ac_retime ? scope.row.ac_retime : '无' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="是否回复">
                  <template slot-scope="scope">
                    <span>{{ scope.row.ac_retime ? '是' : '否' }}</span>
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
    import { getArtComment } from '../../api/getData';
    import { baseUrl } from '../../config/env';
    export default{
        data(){
            return {
                tableData: [],
                baseUrl
            }
        },
        components: {headTop},
        created(){
           this.init();
        },
        methods: {
           async init(){
              var res = JSON.parse(await getArtComment());
              console.log(res.data)
              if(res.errcode == 0){
                 this.tableData = res.data;
              }else{

              }
           },
            //编辑
            handleEdit(index, row){
               sessionStorage.getItem('class') === '1' ? this.$router.push({path: '/replyArt', query:{id: row.ac_id}}) : this.$message({ type: 'warning', message:'您暂时还没有回复文章评论权限' });
            }
        }
    }
</script>
