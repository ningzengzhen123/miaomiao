<template>
	<div class="movie_body" ref="movie_body">
      <Loading v-if="isLoading" />
      <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
    		<ul>
          <li class="pullDown">{{message}}</li>
    			<li v-for="item in movieList">
    				<div class="pic_show" @tap="handleTodetail"><img :src="item.img | setWH('128.180')"></div>
    				<div class="info_list">
    					<h2>{{item.nm}} <img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
    					<p>观众评 <span class="grade">{{item.sc}}</span></p>
    					<p>主演: {{item.star}}</p>
    					<p>{{item.showInfo}}</p>
    				</div>
    				<div class="btn_mall">
    					购票
    				</div>
    			</li>
    		</ul>
      </Scroller>
	</div>
</template>

<script>
// import Bscroll from 'better-scroll'
export default {
  name: 'NowPlaying',
  data(){
  	return {
  		movieList:[],
  		message:'',
      isLoading:true,
      prevCityId:-1
  	} 
  },
  activated(){
    //获取城市ID
    var cityId = this.$store.state.city.id
    if( this.prevCityId === cityId){return;}
    this.isLoading = true
  	this.axios.get('/api/movieOnInfoList?cityId=' + cityId).then((res) => {
  		if(res.data.msg === 'ok'){
  			this.movieList = res.data.data.movieList
        this.isLoading = false
        this.prevCityId = cityId
  		}
  	})
  },
  methods:{
  	handleTodetail(){
  		alert(111)
  	},
    handleToScroll(pos){
      if(pos.y > 30){
        this.message = "更新中"
      }
    },
    handleToTouchEnd(pos){
      if(pos.y > 30){
       this.axios.get('/api/movieOnInfoList?cityId=11').then((res) => {
         if(res.data.msg === 'ok'){
           this.message = '更新完成'
           setTimeout(()=>{
             this.movieList = res.data.data.movieList
              this.message = ''
           },1000)
         }
       })
      }
    }
  }
}
</script>

<style scoped>
	#content .movie_body{ flex:1; overflow:auto;}
	.movie_body ul{ margin:0 12px; overflow: hidden;}
	.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
	.movie_body .pic_show{ width:64px; height: 90px;}
	.movie_body .pic_show img{ width:100%;}
	.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
	.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
	.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
	.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
	.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
	.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
	.movie_body .btn_pre{ background-color: #3c9fe6;}
	.movie_body .pullDown{ margin: 0;padding: 0;border: none; }
</style>