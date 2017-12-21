/*
* @Author: tuguilin
* @Date:   2017-12-19 15:47:25
* @Last Modified by:   tuguilin
* @Last Modified time: 2017-12-19 17:47:40
*/
import * as types from "./mutation-types"

const mutations={
	[types.SET_FULL_SCREEN](state,flag){
		state.fullScreen=flag
	},
	[types.SET_PLAYLIST](state,obj){
		state.playlist.unshift(obj)
	}
}

export default mutations