<template>
	<div class="index">
		<header>
      <div class="mui-icon Muiicons mui-icon-bars"></div>
      <div class="mui-icon Muiicons mui-icon-plusempty"></div>
      <nav>
        <div class="nav-item">我的</div>
        <router-link tag="div" to="/musichall" class="nav-item">音乐馆</router-link>
        <div class="nav-item">发现</div>
      </nav>
      <div class="mui-input-row mui-search">
          <input type="search" style="height:2rem" class="mui-input-clear" @focus="search_show" placeholder="">
      </div>
		</header>
    <router-view></router-view>
    <song></song>
    <search v-if="is_searchshow" @backclick="backclick"></search>
	</div>    
</template>
<script>
import song from './components/song'
import {mapGetters} from "vuex"
import search from "./components/search"
export default {
  components:{
    song,
    search
  },
  data () {
    return {
      msg: 'Hello from vue-loader',
      is_searchshow:false
    }
  } ,
  methods:{
    search_show(){
      this.is_searchshow=true;
    },
    backclick(){
      this.is_searchshow=false
    }
  }     
}
</script>
<style lang="less">
  @usual-color:#10BE30;
  *{
    margin: 0;
    padding: 0;
    font-size: 62.5%;
  }
  body{
    margin-top: 6rem;
  }
  
  .location(@which:absolute,@top:5%,@left:5%){
    position: @which;
    top:@top;
    left: @left;
  }
  header{
    background: @usual-color;
    width: 100%;
    height:6rem;
    position: fixed;
    z-index: 100;
    top:0;
    .mui-icon-bars,.mui-icon-plusempty{
      color:white;
    }
    .mui-icon-bars{
      .location(absolute,10%,5%)
    }
    .mui-icon-plusempty{
      .location(absolute,3%,90%);
      font-size: 3rem;
    }
    nav{
      width: 60%;
      margin: 0 auto;
      height: 3.5rem;
      display: flex;
      .nav-item{
        flex:1;
        text-align: center;
        font-size: 2rem;
        line-height: 3rem;
        color:white;
      }
    }
    .mui-icon-search:before{
      position: absolute;
      top:5%;
    }
    .mui-icon-clear:before, .mui-icon-close-filled:before{
      position: absolute;
      top:-10%;
    }
  }
  .singer-enter{
      opacity: 0;
  }
  .singer-enter-active,.singer-leave-active{
     transition:all 0.2s linear;
    }
    .singer-leave-to{
      opacity:0;
   }
</style>