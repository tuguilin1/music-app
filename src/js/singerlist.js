/*
* @Author: tuguilin
* @Date:   2017-12-16 12:49:13
* @Last Modified by:   tuguilin
* @Last Modified time: 2017-12-19 16:10:13
*/
class singerlist{
	constructor(singer){
		this.id = singer.Fsinger_id,
		this.picurl="https://y.gtimg.cn/music/photo_new/T001R300x300M000"+singer.Fsinger_mid+".jpg",
		this.name = singer.Fsinger_name,
		this.mid=singer.Fsinger_mid
	}
}

export function CreateSinger(singer){
	return new singerlist(singer)
}