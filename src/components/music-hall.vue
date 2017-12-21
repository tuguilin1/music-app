<template>
	<div class="music-hall">
		<div class="mui-slider">
		  <div class="mui-slider-group">
		    <!--第一个内容区容器-->
		    <div class="mui-slider-item" v-for="item in Slider">
		      <img :src="item.picUrl">
		    </div>
		    <div class="mui-slider-item">
		      <img :src="last_slider.picUrl">
		    </div>
		  </div>
		</div>
		<nav>
			<div @click="_jump">
				<span class="mui-icon iconfont icon-geshou">歌手</span>
			</div>
			<div @click="_jump">
				<span class="mui-icon iconfont icon-paixing-copy">排行</span>
			</div>
			<div>
				<span class="mui-icon iconfont icon-leimupinleifenleileibie">分类歌单</span>
			</div>
		</nav>
		<div class="recommend-playlist-head">
			<div>歌单推荐</div>
			<span class="mui-icon Muiicons mui-icon-forward"></span>
		</div>
		<div class="recommend-playlist">
			
			<div class="recommend-album" v-for="item in recommend_album">
				<img :src="item.cover">
				<div v-html="item.title"></div>
				<span class="mui-icon iconfont icon-yinle">{{_returnnum(item.listen_num)}}</span>
				<span class="mui-icon iconfont icon-D-bianjishipin-shezhizhuti"></span>
			</div>
		</div>
		<div class="recommend-playlist-head">
			<div>最新MV</div>
			<span class="mui-icon Muiicons mui-icon-forward"></span>
		</div>
		<div class="recommend-mvlist">
			
			<div class="recommend-mvlist-layout" v-for="item in mvlist">
				<img :src="item.picurl">
				<div v-html="item.mvtitle"></div>
				<div v-html="item.mvdesc"></div>
				<span class="mui-icon iconfont icon-yinle">{{_returnnum(item.listennum)}}</span>
				<span class="mui-icon iconfont icon-D-bianjishipin-shezhizhuti"></span>
			</div>
		</div>
		<singer-vue v-if="is_singershow" @backclick="backclick"></singer-vue>
		<Rank v-if="is_rankshow" @backclick1="backclick1"></Rank>
		<play-list v-if="is_playlistshow"></play-list>
	</div>
</template>

<script type="text/javascript">
import {getRecommend,getMvlist} from "../api/recommend"
import {getRecommenddata} from "../api/recommend"
import {getplaylist} from "../api/classify"
import SingerVue from "./singer"
import mui from "../js/mui.min"
import Rank from "./rank"
import playList from "./playList"
	export default{
		components:{
			SingerVue,
			Rank,
			playList
		},
		data(){
			return{
				Slider:[],
				last_slider:{},
				recommend_album:[],
				mvlist:[],
				is_singershow:false,
				is_rankshow:false,
				is_playlistshow:false
			}
		},
		methods:{
			_getSlider(){
				getRecommend().then((res)=>{
					if(res.code==0){
						this.Slider = res.data.slider
						this.last_slider = this.Slider.pop()
					}
				})
			},
			_getRecommend(){
				getRecommenddata().then((res)=>{
					this.recommend_album = res.recomPlaylist.data.v_hot.slice(0,6)
					console.log(this.recommend_album)
				})
			},
			_getMvlist(){
				getMvlist().then((res)=>{
					this.mvlist = res.data.mvlist.slice(0,4)
				})
			},
			_getplaylist(){
				getplaylist(3608034163).then((res)=>{
					console.log(res)
				})
			},
			_returnnum(num){
				var n = Math.floor(num /10000);
				return `${n}万`
			},
			_jump(e){
				if(e.target.innerHTML=="歌手"){
					this.is_singershow = true;
				}
				else{
					if(e.target.innerHTML=="排行"){
						this.is_rankshow=true;
					}
					else{
						if(e.target.innerHTML=="分类歌单"){
							this.is_playlistshow=true;
						}
					}
				}
			},
			backclick(){
				this.is_singershow=false
			},
			backclick1(){
				this.is_rankshow=false
			}
		},
		created(){
			this._getSlider()
			this._getRecommend()
			this._getMvlist()
			
		},
		mounted(){
			var gallery = mui('.mui-slider');
			gallery.slider({
			  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
			});
		}
	}
</script>

<style lang="less" scoped>
	.shape(@width:100%,@height:10rem){
		width: @width;
		height: @height;
	}
	.layout(){
		display: flex;
		display: -webkit-flex;
		-webkit-flex-wrap:wrap;
		flex-wrap:wrap;
		-webkit-justify-content:space-between;
	}
	nav{
		.shape(100%,6rem);
		div{
			.shape(100%/3,5rem);
			float: left;
			text-align: center;
			line-height: 5rem;
			font-size: 4rem;
		}
	}
	.recommend-playlist-head{
		position: relative;
		.shape(100%,4rem);
		margin-top: 2rem;
		div{
			.shape(50%,100%);
			font-size: 2rem;
			margin: 0 auto;
			text-align: center;
			line-height: 4rem;
		}
		span{
			position: absolute;
			right: 3%;
			top:25%;
		}
	}
	.recommend-playlist{
		
		.shape(100%,28rem);
		.layout();
		.recommend-album{
			.shape(99.5%/3,14rem);
			position: relative;
			img{
				.shape(100%,10rem);
				display: block;
			}
			div{
				width: 100%;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical; 
				padding: 0 0.5rem;
				font-size: 1.5rem;
			}
		
		}
		
	}
	.icon-yinle{
		position: absolute;
		left: 5%;
		top:60%;
		color:white;
	}
	.icon-D-bianjishipin-shezhizhuti{
		position: absolute;
		right: 5%;
		top:60%;
		color:gray;
	}
	.recommend-mvlist{
		margin-bottom: 5rem;
		.shape(100%,30rem);
		.layout();
		.recommend-mvlist-layout{
			position: relative;
			.shape(99.8%/2,15rem);
			img{
				.shape(100%,11rem);
				display: block;
			}
			div{
				font-size: 1.5rem;
			}
		}
	}
</style>