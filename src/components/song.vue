<template>
	<div class="play">
		<audio :src="songUrl" autoplay="autoplay"  ref="audio" loop="loop" @timeupdate="updateTime"></audio>
		<div class="bg-play" ref="bg_play">
			<div class="bgimg" ref="bgimg">
			
			</div>
			<div class="circle">
				<img :src="imgUrl">
			</div>
			<div class="progress">
				
				<div id="progress" class="mui-progressbar">
					<span></span>
					<div class="btn1" ref="btn1"></div>
					
				</div>
			</div>
			<div class="currentTime">{{currentTime}}</div>
			<div class="totalTime">{{totalTime}}</div>
			<div class="player">
				<span class="mui-icon iconfont icon-icon-prev-song"></span>
				<span :class="class_play" @click="stop"></span>
				<span class="mui-icon iconfont icon-bofangqixiashou"></span>
			</div>
			<span class="mui-icon Muiicons mui-icon-back" @click="back_click"></span>
		</div>
			
		<div class="small-play" ref="small_play" @click.prevent="back_click">
			<img :src="imgUrl" alt="">
			<div class="songname">{{playlist[index].songname}}</div>
			<span :class="class_play" @click.stop="stop"></span>
		</div>
	</div>
</template>

<script type="text/javascript">
import mui from "../js/mui.min"
import {mapGetters,mapMutations} from "vuex"
	export default{
		data(){
			return{
				class_play:"mui-icon iconfont icon-bofangqizanting40",
				is_timeshow:false,
				currentTime:"00:00",
				totalTime:"0:00",
				index:0,
				songUrl:"",
				imgUrl:""
			}
		},
		computed:{
			...mapGetters([
				"fullScreen",
				"playlist"
				])
		},
		methods:{
			stop(){
				if(this.class_play=="mui-icon iconfont icon-bofangqibofang40"){
					this.class_play="mui-icon iconfont icon-bofangqizanting40"
					this.$refs.audio.play()
				}
				else{
					this.class_play="mui-icon iconfont icon-bofangqibofang40"
					this.$refs.audio.pause()
				}
			},
			back_click(){
				this.$emit("backclick")
			},
			updateTime(){
				var percent = this.$refs.audio.currentTime/this.$refs.audio.duration*100
				mui("#progress").progressbar({progress:percent}).show()
				this.$refs.btn1.style.left=percent+"%"
				this.currentTime=this.formatTime(this.$refs.audio.currentTime)
				this.totalTime=this.formatTime(this.$refs.audio.duration)
			},
			formatTime(interval) {
			    interval = interval | 0
		        const minute = interval / 60 | 0
		        const second = this._pad(interval % 60)
		        return `${minute}:${second}`
			},
			_pad(num, n = 2) {
		        let len = num.toString().length
		        while (len < n) {
		          num = '0' + num
		          len++
		        }
		        return num
		    },
		    back_click(){
		    	if(this.fullScreen==true){
		    		this.setfullscreen(false)
		    	}
		    	else{
		    		this.setfullscreen(true)
		    	}
		    },
		    ...mapMutations({
				setfullscreen:'SET_FULL_SCREEN',
				setplaylist:"SET_PLAYLIST"
			})
		},
		mounted(){
			this.songUrl=this.playlist[this.index].song_url
			this.imgUrl=this.playlist[this.index].img_url
			this.$refs.bgimg.style.background=`url('${this.playlist[this.index].img_url}') no-repeat center center fixed`
			this.$refs.bgimg.style["background-size"]="cover"
		},
		watch:{
			playlist:function(){
				this.songUrl=this.playlist[this.index].song_url
				this.imgUrl=this.playlist[this.index].img_url
				this.$refs.bgimg.style.background=`url('${this.playlist[this.index].img_url}') no-repeat center center fixed`
				this.$refs.bgimg.style["background-size"]="cover"
			},
			fullScreen:function(){
				if(this.fullScreen){
					this.$refs.bg_play.style.display="block",
					this.$refs.small_play.style.display="none"
				}
				else{
					this.$refs.bg_play.style.display="none",
					this.$refs.small_play.style.display="block"
				}
			}
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.border(){
	     -moz-border-radius: 50%; /* Firefox */
	    -webkit-border-radius: 50%; /* Safari 和 Chrome */
	    border-radius: 50%; /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
	 }
	.bg-play{
		position: fixed;
		top:0;
		left: 0;
		bottom: 0;
		right: 0;
		background: white;
		z-index: 600;
		display: none;
	}
	.bgimg{
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-filter: blur(30px);
		filter: blur(30px);
		z-index: -1;
	}
	.circle{
		width: 20rem;
		left: 20rem;
		position: absolute;
		left: 50%;
		margin-left: -10rem;
		top:20%;
		padding: 1rem;
		.border();
		border:0.5rem solid #444;
		img{
			width: 100%;
			height: 100%;
			.border();
		}
	}
	.mui-progressbar{
		overflow: visible;
		margin-top: 0.5rem;
		.btn1{
			position: absolute;
			left: 25%;
			width: 1rem;
			height: 1rem;
			top:-0.35rem;
			.border();
			background: #00BAF5;
		}
	}
	.progress{
		position: absolute;
		top: 75%;
		width: 80%;
		left: 10%;
		height: 2.5rem;
		overflow: hidden;
		
	}
	.currentTime,.totalTime{
		position: absolute;
		top:74.5%;
		color:black;
	}
	.currentTime{
		left: 1%;
	}
	.totalTime{
		right: 1%;
	}
	.player{
		width: 100%;
		height: 4rem;
		margin-top: 145%;
		display: flex;
		span{
			flex:1;
			text-align: center;
			font-size: 3rem;
			color:white;
		}
	}
	.mui-icon-back{
		position: absolute;
		top:3%;
		left: 3%;
		font-size: 4rem;
	}
	.small-play{
		position: fixed;
		left: 0;
		bottom:0;
		right: 0;
		height: 5rem;
		background: #DDD;
		z-index: 600;
		img{
			display: block;
			width: 4rem;
			height: 4rem;
			.border();
			margin-left: 1rem;
			margin-top: 0.5rem;
		}
		span{
				position: absolute;
				right: 5rem;
				top:1rem;
				font-size: 4rem;
			}
		div{
			position: absolute;
			left: 7rem;
			top:1rem;
			color:#111;
			font-size: 1.5rem;
		}
	}
</style>