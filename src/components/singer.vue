<template>
	<transition name="singer">	
		<div class="all-components">
			<header>
				<span @click="backclick" class="mui-icon Muiicons mui-icon-arrowleft"></span>
				<span class="mui-icon Muiicons mui-icon-search"></span>
				<div>热门歌手</div>
			</header>
			<ul class="mui-table-view" @click.stop="open_singerdetail">
			    <li class="mui-table-view-cell" v-for="item in singerlist" :id="item.mid">
			    	<img :src="item.picurl" :id="item.mid">
				    <div :id="item.mid">{{item.name}}</div>
				    <span class="mui-icon Muiicons mui-icon-arrowright" :id="item.mid"></span>
				</li>
			</ul>
			<singer-detail v-if="is_singerdetailshow" :singer-id="singer_id" @clickback="clickback"></singer-detail>
		</div>
	</transition>
</template>

<script type="text/javascript">
import {getSingerList} from "../api/singer"
import {CreateSinger} from "../js/singerlist"
import SingerDetail from "./singerdetail"
export default{
	components:{
		SingerDetail
	},
	data(){
		return{
			singerlist:[],
			is_singerdetailshow:false,
			singer_id:""
		}
	},
	methods:{
		_getSingerList(){
			getSingerList().then((res)=>{
				res.data.list.forEach((item)=>{
					this.singerlist.push(CreateSinger(item))
				})
			})
		},
		backclick(){
			this.$emit('backclick')
		},
		open_singerdetail(e){
			this.singer_id=e.target.id
			this.is_singerdetailshow=true
		},
		clickback(){
			this.is_singerdetailshow=false
		}
	},
	created(){
		this._getSingerList()
	}
}
</script>

<style scoped lang="less">
	.border(){
	     -moz-border-radius: 50%; /* Firefox */
	    -webkit-border-radius: 50%; /* Safari 和 Chrome */
	    border-radius: 50%; /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
	 }
	.all-components	{
		position: fixed;
		z-index:200;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		background: white;
		overflow-y: scroll;
	}
	header{
		height: 4rem !important;
		div{
			width: 50%;
			margin: 0 auto;
			text-align: center;
			font-size: 2rem;
			line-height: 4rem;
			color:white;
		}
		.mui-icon-arrowleft,.mui-icon-search{
			position: absolute;
			top:20%;
			color:white;
		}
		.mui-icon-arrowleft{
			left: 3%;
		}
		.mui-icon-search{
			right: 10%;
		}
	}
	.mui-table-view{
		margin-top: 4rem;
		li{
			height: 5rem;
		}
		img{
			height: 3.5rem;
			width: 3.5rem;
			position: absolute;
			left: 1rem;
			top:15%;
			.border()
		}
		div{
			margin-left: 4.5rem;
			line-height: 3rem;
			font-size: 1.5rem;
		}
		span{
			position: absolute;
			right: 5%;
			top:30%;
		}
	}
</style>