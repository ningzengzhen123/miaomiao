<template>
	<div class="city_body">
		<div class="city_list">
      <Loading v-if="isLoading" />
      <Scroller v-else ref="city_list">
          <div>
      			<div class="city_hot">
      				<h2>热门城市</h2>
      				<ul class="clearfix">
      					<li v-for='item in hotList' :key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
      				</ul>
      			</div>
      			<div class="city_sort" ref="city_sort">
      				<div v-for="item in cityList" :key="item.index">
      					<h2>{{item.index}}</h2>
      					<ul>
      						<li v-for="city in item.list" :key="city.id" @tap="handleToCity(city.nm,city.id)">{{city.nm}}</li>
      					</ul>
      				</div>
      			</div>
        </div>
      </Scroller>
		</div>
		<div class="city_index">
			<ul>
				<li v-for="(item,key) in cityList" :key="item.index" @touchstart="handleToIndex(key)">{{item.index}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Storage from '@/model/storage'
export default {
  name: 'City',
  data(){
  	return {
  		cityList:[],
  		hotList:[],
      isLoading:true
  	}

  },
  mounted(){
      //取出缓存里的城市数据
      var cityList = Storage.get('cityList')
      var hotList = Storage.get('hotList')
      if(cityList && hotList){
          this.cityList = cityList
          this.hotList = hotList
          this.isLoading = false
      }else{
        this.axios.get('/api/cityList').then((res) => {
          if(res.data.msg === 'ok'){
            var cities = res.data.data.cities
            var {cityList,hotList} = this.formateCityList(cities)
            this.cityList = cityList
            this.hotList = hotList
            this.isLoading = false
            Storage.set('cityList',cityList)
            Storage.set('hotList',hotList)
          }
        })
      }
    	
  },
  methods:{
  	formateCityList(cities){
  		var cityList = [];
  		var hotList = [];
  		for(var i=0;i<cities.length;i++){
  			var firstLetter = cities[i].py.substring(0,1).toUpperCase();
  			if(toCom(firstLetter)){  //新增
  				cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]});
  			}else{  //累加
  				for(var j=0;j<cityList.length;j++){
  					cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
  				}
  			}
  		}

  		cityList.sort((n1,n2)=>{
  			if(n1.index > n2.index){
  				return 1;
  			}else if(n1.index < n2.index){
  				return -1;
  			}else{
  				return 0;
  			}
  		})
  		
  		for(var i=0;i<cities.length;i++){
  			if(cities[i].isHot === 1){
  				hotList.push(cities[i])
  			}
  		}

  		function toCom(firstLetter){
  			for(var i=0;i<cityList.length;i++){
  				if(cityList[i].index === firstLetter){
  					return false;
  				}
  			}
  			return true;
  		}
  		// console.log(cityList)
  		// console.log(hotList)
  		return {
  			cityList,
  			hotList
  		}
  	},
  	handleToIndex(index){
  		var h2 = this.$refs.city_sort.getElementsByTagName('h2');
  		// this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
      this.$refs.city_list.toScrollTop(-h2[index].offsetTop)
  	},
    handleToCity(nm,id){
      this.$store.commit('city/CITY_INFO',{nm,id})
      Storage.set('nowNm',nm)
      Storage.set('nowId',id)
      this.$router.push('/movie/nowPlaying')
    }
  }
}
</script>

<style scoped>
	#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
	.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
	.city_body .city_list::-webkit-scrollbar{
	    background-color:transparent;
	    width:0;
	}
	.city_body .city_hot{ margin-top: 20px;}
	.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
	.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
	.city_body .city_sort div{ margin-top: 20px;}
	.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
	.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
	.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
	.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>