import Vue from 'vue'
import Router from 'vue-router'
import Musichall from '../components/music-hall'

Vue.use(Router)

export default new Router({
  routes:[
    {
    	 path: '/', 
    	 redirect: '/musichall' 
    },
  	{
  		path:'/musichall',
  		component:Musichall
  	}
  ]
})
