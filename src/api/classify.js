/*
* @Author: tuguilin
* @Date:   2017-12-20 13:40:34
* @Last Modified by:   tuguilin
* @Last Modified time: 2017-12-20 21:37:01
*/
import jsonp from '../js/jsonp'
import {commonParams, options} from './config'


export function getplaylist(mid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  const data = Object.assign({}, commonParams, {
		type:1,
		json:1,
		utf8:1,
		onlysong:0,
		disstid:mid,
		format:"jsonp",
		g_tk:5381,
		loginUin:0,
		hostUin:0,
		inCharset:"utf8",
		outCharset:"utf-8",
		notice:0,
		platform:"yqq",
		needNewCode:0,
  })
  const option={
    param: 'jsonpCallback',
    name:"playlistinfoCallback"
  }
  return jsonp(url, data, option)
}