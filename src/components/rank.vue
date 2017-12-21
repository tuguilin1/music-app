<template>
	<transition name="singer">	
	<div class="rank">
		<header>
			<span class="mui-icon Muiicons mui-icon-arrowthinleft" @click="back_click"></span>
			<div class="title">排行</div>
			<span class="mui-icon Muiicons mui-icon-more"></span>
		</header>
		<ul class="mui-table-view" v-if="is_toplistshow">
    		<li class="mui-table-view-cell mui-media" v-for="item in toplist" :id="item.id" :picurl="item.picUrl" @click="_jump">
            	<img class="mui-media-object mui-pull-left" :src="item.picUrl">
            	<div class="mui-media-body">
              		<p class='mui-ellipsis'>1 {{item.songList[0].songname}} - {{item.songList[0].singername}}</p>
              		<p class='mui-ellipsis'>2 {{item.songList[1].songname}} - {{item.songList[1].singername}}</p>
              		<p class='mui-ellipsis'>3 {{item.songList[2].songname}} - {{item.songList[2].singername}}</p>
            	</div>
            	<span class="mui-icon iconfont icon-yinle">{{_returnnum(item.listenCount)}}</span>
				<span class="mui-icon iconfont icon-D-bianjishipin-shezhizhuti"></span>
				<span class="mui-icon Muiicons mui-icon-arrowright"></span>
   		    </li>
		</ul>
		<top-list v-if="is_listshow" :toplist-id="toplist_id" :pic-url="picUrl" @backclick="backclick"></top-list>
	</div>
</transition>
</template>

<script type="text/javascript">
import {getTopList} from "../api/rank"
import topList from "./toplist"
export default{
	components:{
		topList
	},
	data(){
		return{
			toplist:[],
			is_toplistshow:false,
			toplist_id:"",
			is_listshow:false,
			picUrl:""
		}
	
	},
	methods:{
		_getToplist(){
			getTopList().then((res)=>{
				this.toplist=res.data.topList
			})
		},
		_returnnum(num){
			var n = Math.floor(num /10000);
			return `${n}万`
		},
		_jump(e){
			this.toplist_id=e.currentTarget.id
			this.picUrl=e.currentTarget.getAttribute("picurl")
			this.is_listshow=true
		},
		backclick(){
			this.is_listshow=false
		},
		back_click(){
			this.$emit("backclick1")
		}
	},
	created(){
		this._getToplist()
	},
	mounted(){
		this.is_toplistshow=true;
	}
}
</script>

<style type="text/css" lang="less" scoped>
	.rank{
		position: fixed;
		z-index:200;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		background: white;
		overflow-y: scroll;
	}
	.mui-table-view-cell{
		position: relative;
		height: 10rem;
		img{
			width: 9rem !important;
			height: 9rem !important;
			max-width: 10rem !important;
		}
		p{
			color:black;
			height: 3rem;
			line-height: 3rem;
		}
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
	ul{
		margin-top: 5rem;
		margin-bottom: 6rem;
	}
	.icon-yinle,.icon-D-bianjishipin-shezhizhuti{
		position: absolute;
		top:8rem;
		font-size: 1rem;
	}
	.icon-yinle{
		left: 2rem;
		color:white;
	}
	.icon-D-bianjishipin-shezhizhuti{
		left: 8rem;
		color:#999;
	}
	.mui-icon-arrowright{
		position: absolute;
		font-size: 4rem;
		top:3rem;
		right: 1rem;
	}

</style>