<template>
	<div class="AddArt">
	      <head-top></head-top>
	      <div class="home">
	      	<p>发表区</p>
	      	<div class="comment">
	      		 <div class="commentItem">
	      		 	<div class="title">文章</div>
	      		 	<div class="num">{{allNum.artNum}}</div>
	      		 </div>
	      		 <div class="commentItem">
	      		 	<div class="title">说说</div>
	      		 	<div class="num">{{allNum.sayNum}}</div>
	      		 </div>
	      		 <div class="commentItem">
	      		 	<div class="title">日志</div>
	      		 	<div class="num">{{allNum.logNum}}</div>
	      		 </div>
	      		 <div class="commentItem">
	      		 	<div class="title">留言板</div>
	      		 	<div class="num">{{allNum.boardNum}}</div>
	      		 </div>
	      	</div>
	      </div>
          <div id="myChart" style="height: 500px; margin-top:100px;"></div>
	</div>
</template>
<script type="text/javascript">
	import headTop from '../public/HeadTop';
	import { publishNum } from '../../api/getData';
    let echarts = require('echarts/lib/echarts')
    // 引入折线图组件
    require('echarts/lib/chart/line')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
	export default{
		data() {
			return {
			   allNum: {},
			   commentList: []
			}
		},
		components: { headTop },
		created () {
           this.init();
		},
		methods: {
           async init(){
              var res = JSON.parse(await publishNum());
              if(res.errcode == 0){
                  this.allNum = res.data;
                  this.drawLine();
              }else{
              	  this.$message.error(res.msg);
              }
           },
          drawLine(){
                // 基于准备好的dom，初始化echarts实例
                var that = this;
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '历史评论总量'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['评论总量']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['文章评论','说说评论','日志评论','留言板']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            type:'line',
                            stack: '总量',
                            data:[that.allNum.artAll, that.allNum.sayAll, that.allNum.logAll, that.allNum.boardNum]
                        }
                    ]
                });
            }
		}
	}
</script>
