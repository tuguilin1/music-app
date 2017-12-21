<template>
	<div class="playlist">
		分类
	</div>
</template>

<script type="text/javascript">
import {getplaylist} from "../api/classify"
	export default{
		methods:{
			_getplaylist(categoryId,sortId){
				getplaylist(categoryId,sortId).then((res)=>{
					console.log(res)
				})
			}
		},
		created(){
			this._getplaylist(10000000,5)
		}
	}
</script>

<style type="text/css">
	.playlist{
		position: fixed;
		z-index:300;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		background: white;
		overflow-y: scroll;
	}
</style>