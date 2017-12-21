import 'babel-polyfill'
import Vue from 'vue'
import app from '../App'
import mui from './mui.min'
import router from '../router/index'
import "../css/mui"
import "../css/iconfont"
import store from '../store'


new Vue({
	el: '#app',
	router,
	store,
	render: h => h(app)
})

mui.init()
