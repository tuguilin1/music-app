<template>
	<transition name="searchvue">	
	<div class="search">
		<div class="search_head">
			<span class="mui-icon Muiicons mui-icon-arrowthinleft" @click.stop="backclick"></span>
			<form method="get" id="form" action="#" ref="form">
				<input type="search" name="" ref="search" placeholder="点此搜索">
			</form>
		</div>
		<div class='singer'>
			<div v-if="singer_list.is_show" @click="singer_forward">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<img class="mui-media-object mui-pull-left" :src="singer_list.picurl" alt="">
	       				<div class="mui-media-body">
	          				 {{singer_list.name}}
	          				 <p>专辑数{{singer_list.albumnum}}---歌曲数{{singer_list.songnum}}</p>
	       				</div>
				    </li>
				</ul>
			</div>
			<div class="song-list">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell" v-for="(item,index) in search_list" :id="index" @click="play_song">
	       				 <div class="mui-media-body">
	          				  {{item.name}}
	           				 <p class='mui-ellipsis'>{{item.singername}} - {{item.albumname}}</p>
	       				 </div>
				    </li>
				</ul>
			</div>
		</div>
		<singer-detail v-if="is_singerdetailshow" :singer-id="singer_list.mid"></singer-detail>
	</div>
</transition>
</template>

<script type="text/javascript">
import {search} from "../api/search"
import {createsong} from "../js/songlist"
import {mapMutations} from "vuex"
import {getVkey} from "../api/song"
import {CreateSinger} from "../js/singerlist"
import SingerDetail from "./singerdetail"
	export default{
		data(){
			return{
				search_list:[],
				singer_list:{
					is_show:false,
				},
				is_singerdetailshow:false
			}
		},
		components:{
			SingerDetail
		},
		methods:{
			backclick(){
				this.$emit("backclick")
			},
			searchvalue(){
				const value=this.$refs.search.value
				this._search(value)
			},
			_search(val){
				this.search_list.splice(0,this.search_list.length)
				search(val).then((res)=>{
					console.log(res)
					res.data.song.list.forEach((item)=>{
						this.search_list.push(createsong(item))
					})
					if(res.data.zhida.type != "0"){
						Object.assign(this.singer_list,{
							is_show:true
						},{
							picurl:"https://y.gtimg.cn/music/photo_new/T001R300x300M000"+res.data.zhida.singermid+".jpg",
							name:res.data.zhida.singername,
							mid:res.data.zhida.singermid,
							id:res.data.zhida.singerid,
							albumnum:res.data.zhida.albumnum,
							songnum:res.data.zhida.songnum
						})
					}
					console.log(this.singer_list)
				})
			},
			_getVkey(index){
				const mid = this.search_list[index].mid
				getVkey(mid).then((res)=>{
					const V_key=res.data.items[0].vkey
					const song_url=`http://dl.stream.qqmusic.qq.com/C400${mid}.m4a?guid=8287083978&vkey=${V_key}&uin=0&fromtag=66`
					const img_url=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.search_list[index].albumid}.jpg?max_age=2592000`
					if(V_key==""){
						alert("该资源已下架")
					}
					else{
						const obj={
							"song_url":song_url,
							"img_url":img_url,
							"singername":this.search_list[index].singername,
							"songname":this.search_list[index].name
						}
						this.setplaylist(obj)
						this.setfullscreen(true)
					}
				})
			},
			singer_forward(){
				this.is_singerdetailshow=true
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
		mounted(){
			this.$refs.search.focus()
			this.$refs.form.onsubmit=()=>{
				this.searchvalue()
			}
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.search{
		position: fixed;
		z-index:200;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		background: white;
		overflow-y: scroll;
	}
	.search_head{
		position: fixed;
		left: 0;
		top:0;
		right: 0;
		height: 4rem;
		background: #10BE30;
		z-index: 300;
		.mui-icon-arrowthinleft{
			position: absolute;
			top:0.5rem;
			left: 1rem;
			font-size: 3.5rem;
			color:white
		}
		input{
			width: 90%;
			height: 100%;
			margin-left: 10%;
			background-color: transparent;
			color:white;
			text-align: left;
		}
	}
	form{
		width: 100%;
		height: 100%;
	}
	.singer{
		margin-top: 4rem;
	}
	.mui-media-body{
		font-size: 2rem;
	}
	.searchvue-enter{
      opacity: 0;
      top:50rem;
  	}
  	.searchvue-enter-active,.searchvue-leave-active{
     transition:all 0.2s linear;
    }
    .searchvue-leave-to{
      opacity:0;
   }
    .mui-table-view-cel{
	
    }
</style>