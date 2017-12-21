<template>
	<transition name="singer">	
	<div class="toplist">
		<header>
			<span class="mui-icon Muiicons mui-icon-arrowthinleft" @click="backclick"></span>
			<div class="title">{{listname}}</div>
			<span class="mui-icon Muiicons mui-icon-more"></span>
		</header>
		<div class="list-layout">
			<div class="list-image">
				<img :src="picUrl">
				<div class="list-info">{{date}}更新</div>
			</div>
			<div class="song-list">
				<ul class="mui-table-view">
    				<li class="mui-table-view-cell" v-for="(item,index) in list" :id="index" @click="play_song">
           				 <div class="mui-media-body">
              				  {{item.name}}
               				 <p class='mui-ellipsis'>{{item.singername}} - {{item.albumname}}</p>
           				 </div>
   				    </li>
   				</ul>
			</div>
		</div>
	</div>
	</transition>
</template>

<script type="text/javascript">
import {getMusicList} from "../api/rank"
import {createsong} from "../js/songlist"
import {mapMutations} from "vuex"
import {getVkey} from "../api/song"
	export default{
		props:{
			toplistId:{
				type:String,
				default:""

			},
			picUrl:{
				type:String,
				default:""
			}
		},
		data(){
			return{
				listname:'',
				date:"",
				list:[]
			}
		},
		methods:{
			_getMusicList(){
				getMusicList(this.toplistId).then((res)=>{
					res.songlist.slice(0,100).forEach((item)=>{
						this.list.push(createsong(item.data))
					})
					this.listname=res.topinfo.ListName
					this.date=res.update_time
				})
				
			},
			backclick(){
				this.$emit("backclick")
			},
			_getVkey(index){
				const mid = this.list[index].mid
				getVkey(mid).then((res)=>{
					const V_key=res.data.items[0].vkey
					const song_url=`http://dl.stream.qqmusic.qq.com/C400${mid}.m4a?guid=8287083978&vkey=${V_key}&uin=0&fromtag=66`
					const img_url=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.list[index].albumid}.jpg?max_age=2592000`
					if(V_key==""){
						alert("该资源已下架")
					}
					else{
						const obj={
							"song_url":song_url,
							"img_url":img_url,
							"singername":this.list[index].singername,
							"songname":this.list[index].name
						}
						this.setplaylist(obj)
						this.setfullscreen(true)
					}
				})
			},
			play_song(e){
				const index=e.currentTarget.id
				this._getVkey(index)
			},
			...mapMutations({
				setfullscreen:'SET_FULL_SCREEN',
				setplaylist:"SET_PLAYLIST"
			})
		},
		created(){
			this._getMusicList()
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.toplist{
		position: fixed;
		z-index:300;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		background: white;
		overflow-y: scroll;
	}
	header{
		position: fixed;
		left: 0;
		right: 0;
		top:0;
		height: 5rem;
		background:#10BE30;
		.mui-icon-arrowthinleft,.mui-icon-more{
			position: absolute;
			top:1rem;
			font-size: 4rem;
			
		}
		.mui-icon-arrowthinleft{
			left: 2rem;
		}
		.mui-icon-more{
			right: 2rem !important;
		}
		.title{
			width: 100%;
			height: 100%;
			text-align: center;
			line-height: 5rem;
			font-size: 2rem;
		}
	}
	.list-layout{
		margin-top: 5rem;
		width: 100%;
		.list-image{
			width: 100%;
			height: 20rem;
			position: relative;
			img{
				width: 100%;
				height: 100%;
			}
			.list-info{
				position: absolute;
				width: 100%;
				top:16rem;
				height: 4rem;
				text-align: center;
				line-height: 4rem;
				font-size: 2rem;
				color:white;
			}
		}
	}
	.mui-media-body{
		font-size: 1.5rem;
	}
</style>