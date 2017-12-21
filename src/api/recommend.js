import jsonp from '../js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
  })

  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    loginUin:0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format:'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList(disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return jsonp(url, data, options)
}

export function getMvlist(){
  const url = "https://c.y.qq.com/v8/fcg-bin/getmv_by_tag"
  const data = Object.assign({},commonParams,{
    g_tk:5381,
    jsonpCallback:"MusicJsonCallback24293042534959897",
    loginUin:0,
    hostUin:0,
    format:"jsonp",
    inCharset:"utf8",
    outCharset:"GB2312",
    notice:0,
    platform:"yqq",
    needNewCode:0,
    cmd:"shoubo",
    lan:"all"
  })
  const option={
    param: 'jsonpCallback',
    prefix:'recom28174345404343604',
    name:"MusicJsonCallback24293042534959897"
  }
  return jsonp(url,data,option)
}


export function getRecommenddata(){
  const url = "https://u.y.qq.com/cgi-bin/musicu.fcg"
  // const data1 = {
  //   "comm":{"ct":24},
  //   "category":{
  //     "method":"get_hot_category",
  //     "param":{"qq":""},
  //     "module":"music.web_category_svr"
  //   },
  //   "recomPlaylist":{
  //     "method":"get_hot_recommend",
  //     "param":{"async":1,"cmd":2},
  //     "module":"playlist.HotRecommendServer"
  //   },
  //   "playlist":{
  //     "method":"get_playlist_by_category",
  //     "param":{
  //       "id":8,
  //       "curPage":1,
  //       "size":40,
  //       "order":5,
  //       "titleid":8
  //     },
  //     "module":"playlist.PlayListPlazaServer"
  //   },
  //   "new_song":{
  //     "module":"QQMusic.MusichallServer",
  //     "method":"GetNewSong",
  //     "param":{
  //       "type":0
  //     }
  //   },
  //   "new_album":{
  //     "module":"QQMusic.MusichallServer",
  //     "method":"GetNewAlbum",
  //     "param":{
  //       "type":0,
  //       "category":"-1",
  //       "genre":0,
  //       "year":1,
  //       "company":-1,
  //       "sort":1,
  //       "start":0,
  //       "end":39
  //     }
  //   },
  //   "toplist":{
  //     "module":"music.web_toplist_svr",
  //     "method":"get_toplist_index",
  //     "param":{

  //     }
  //   },
  //   "focus":{
  //     "module":"QQMusic.MusichallServer",
  //     "method":"GetFocus",
  //     "param":{

  //     }
  //   }
  // }
  const data=Object.assign({},{
    callback:"recom28174345404343604",
    g_tk:5381,
    jsonpCallback:"recom28174345404343604",
    loginUin:0,
    hostUin:0,
    format:"jsonp",
    inCharset:"utf8",
    outCharset:"utf-8",
    notice:0,
    platform:"yqq",
    needNewCode:0,
    data:"%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22category%22%3A%7B%22method%22%3A%22get_hot_category%22%2C%22param%22%3A%7B%22qq%22%3A%22%22%7D%2C%22module%22%3A%22music.web_category_svr%22%7D%2C%22recomPlaylist%22%3A%7B%22method%22%3A%22get_hot_recommend%22%2C%22param%22%3A%7B%22async%22%3A1%2C%22cmd%22%3A2%7D%2C%22module%22%3A%22playlist.HotRecommendServer%22%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A8%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A8%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A0%7D%7D%2C%22new_album%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewAlbum%22%2C%22param%22%3A%7B%22type%22%3A0%2C%22category%22%3A%22-1%22%2C%22genre%22%3A0%2C%22year%22%3A1%2C%22company%22%3A-1%2C%22sort%22%3A1%2C%22start%22%3A0%2C%22end%22%3A39%7D%7D%2C%22toplist%22%3A%7B%22module%22%3A%22music.web_toplist_svr%22%2C%22method%22%3A%22get_toplist_index%22%2C%22param%22%3A%7B%7D%7D%2C%22focus%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetFocus%22%2C%22param%22%3A%7B%7D%7D%7D"
  }) 
  const option={
    param: 'jsonpCallback',
    prefix:'recom28174345404343604',
    name:"recom28174345404343604"
  }
  return jsonp(url,data,option)
}