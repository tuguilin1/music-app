import {commonParams} from './config'
import jsonp from '../js/jsonp'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getVkey(mid){
  const url = "https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg"
  const data = Object.assign({},commonParams,{
    g_tk:5381,
    loginUin:0,
    hostUin:0,
    format:"json",
    inCharset:"utf8",
    outCharset:"utf-8",
    notice:0,
    platform:"yqq",
    needNewCode:0,
    cid:205361747,
    callback:"MusicJsonCallback576044478868833",
    uin:0,
    songmid:mid,
    filename:`C400${mid}.m4a`,
    guid:8287083978,
  })
  const option={
    param: 'jsonpCallback',
    prefix:'recom28174345404343604',
    name:"MusicJsonCallback576044478868833"
  }
  return jsonp(url,data,option)
} 