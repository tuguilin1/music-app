import jsonp from '../js/jsonp'
import {commonParams, options} from './config'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)
}

export function getSingerSonglist(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk:5381,
    loginUin:0,
    hostUin:0,
    format:"jsonp",
    inCharset:"utf8",
    outCharset:"utf-8",
    notice:0,
    platform:"yqq",
    needNewCode:0,
    begin:0,
    num:100,
    _:1513428071157,
    singermid: singerId
  })
 const option={
    param: 'jsonpCallback',
    prefix:'recom28174345404343604',
    name:"MusicJsonCallbacksinger_track"
  }
  return jsonp(url, data, option)
}

export function getSingerAlbumlist(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk:5381,
    loginUin:0,
    hostUin:0,
    format:"jsonp",
    inCharset:"utf8",
    outCharset:"utf-8",
    notice:0,
    platform:"yqq",
    needNewCode:0,
    begin:0,
    num:1000,
    _:1513428071157,
    singermid: singerId
  })
 const option={
    param: 'jsonpCallback',
    prefix:'recom28174345404343604',
    name:"MusicJsonCallbacksinger_track"
  }
  return jsonp(url, data, option)
}

export function getSingerMvlist(singerId) {
  const url = 'https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk:5381,
    loginUin:0,
    hostUin:0,
    format:"jsonp",
    inCharset:"utf8",
    outCharset:"utf-8",
    notice:0,
    platform:"yqq",
    needNewCode:0,
    begin:0,
    num:1000,
    _:1513428071157,
    singermid: singerId
  })
 const option={
    param: 'jsonpCallback',
    prefix:'recom28174345404343604',
    name:"MusicJsonCallbacksinger_track"
  }
  return jsonp(url, data, option)
}