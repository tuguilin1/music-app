<template>
	<div class="songlist mui-scroll-wrapper" ref="songList">
		<div class="mui-scroll">
			<ul class="mui-table-view">
			    <li class="mui-table-view-cell" v-for="(item,index) in songlist" :id="index"  @click="play_song">
			    	<div>{{item.name}}</div>
			    	<span>{{singer_name}} - {{item.albumname}}</span>
				</li>
			</ul>
		</div>
		<div class="wicket" v-show="is_wicketshow" ref="wicket">
			因合作方要求，该资源暂时下架
		</div>
	</div>
</template>

<script type="text/javascript">
import {mapGetters, mapMutations} from 'vuex'
import {getSingerSonglist} from "../api/singer"
import {createsong} from "../js/songlist"
import {getVkey} from "../api/song"
import mui from '../js/mui.min'
	export default{
		props:{
			singerId:{
				type:String,
				default:''
			}
		},
		computed: {
			...mapGetters([
				"fullScreen",
				"playlist"
			])
		},
		data(){
			return{
				songlist:[],
				singer_name:"",
				start_position:0,
				is_songshow:false,
				is_wicketshow:false,
			}
		},
		methods:{
			_getSingerSonglist(){
				getSingerSonglist(this.singerId).then((res)=>{
					res.data.list.forEach((item)=>{
						this.songlist.push(createsong(item.musicData))
					})
					this.singer_name=res.data.singer_name
				})
			
			},
			_getVkey(index){
					const mid = this.songlist[index].mid
					getVkey(mid).then((res)=>{
						const V_key=res.data.items[0].vkey
						const song_url=`http://dl.stream.qqmusic.qq.com/C400${mid}.m4a?guid=8287083978&vkey=${V_key}&uin=0&fromtag=66`
						const img_url=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.songlist[index].albumid}.jpg?max_age=2592000`
						if(V_key==""){
							this.is_wicketshow=true

							setTimeout(()=>{
								this.is_wicketshow=false
							},1000)
						}
						else{
							const obj={
								"song_url":song_url,
								"img_url":img_url,
								"singername":this.songlist[index].singername,
								"songname":this.songlist[index].name
							}
							this.setplaylist(obj)
							console.log(this.playlist)
						}
				})
			},
			play_song(e){
				const index=e.currentTarget.id
				this.$refs.wicket.style.top=e.currentTarget.offsetTop+"px"
				this._getVkey(index)
			},
			...mapMutations({
				setfullscreen:'SET_FULL_SCREEN',
				setplaylist:"SET_PLAYLIST"
			})
		},
		created(){
			this._getSingerSonglist()
		}
	}
</script>

<style lang="less" scoped>
	.songlist{
		top:348px;
		z-index: 300;
		overflow-y: scroll;
	}
	
	.mui-table-view-cell{
		height: 5rem;
		div{
			font-size: 1.5rem;
		}
		span{
			font-size: 1rem;
			color:gray
		}
	}
	.wicket{
		width: 12rem;
		height: 6rem;
		font-size: 1rem;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 1.5rem;
		color:white;
		z-index: 500;
		position: absolute;
		left: 50%;
		margin-left: -5.2rem;
		top:15%;
		background: rgba(0, 0, 0, 0.7);
	}
</style>