<template>
	<transition name="singer">	
	<div class="singerdetail">
		<div class="singer-img">
			<span @click="clickback" class="mui-icon Muiicons mui-icon-arrowleft"></span>
			<span class="mui-icon Muiicons mui-icon-more"></span>
			<img :src="picurl">
		</div>
		<div class="singer-nav">
				<div class="active1">歌曲</div>
				<div>专辑</div>
				<div>MV</div>
		</div>
		<song-list :singer-id="singerId"></song-list>
	</div>
</transition>
</template>

<script type="text/javascript">
import SongList from "./songlist"
	export default{
		props:{
			singerId:{
				type:String,
				default:0
			}
		},
		components:{
			SongList
		},
		data(){
			return{
				picurl:"https://y.gtimg.cn/music/photo_new/T001R300x300M000"+this.singerId+".jpg"
			}
		},
		methods:{
			clickback(){
				this.$emit("clickback")
			}
		}
		
	}
</script>

<style scoped lang="less">
	.icon-position(@left,@top,@right){
		position: absolute;
		left: @left;
		top:@top;
		right:@right;
		color:white;
		font-size: 4rem
	}
	.singerdetail{
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		background: white;
		z-index: 200
	}
	.singer-img{
		width: 100%;
		height: 25rem;
		position: relative;
		img{
			width: 100%;
			height: 25rem;
		}
		.mui-icon-more{
			.icon-position(auto,5%,2%)
		}
		.mui-icon-arrowleft{
			.icon-position(2%,5%,auto)
		}
	}
	.singer-nav{
		background: white;
		width: 100%;
		height: 4rem;
		display: flex;
		display: -webkit-flex;
		border-bottom: 0.1px solid gray;
		div{
			flex:1;
			font-size: 2rem;
			text-align: center;
			line-height: 4rem;
			width: 100%;
			height: 100%;
			color:#757575;
		}
	}
	.active1{
		color:#10BE30 !important;
		border-bottom: 2px solid #10BE30;
	}
</style>