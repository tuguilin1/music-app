/*
* @Author: tuguilin
* @Date:   2017-12-17 11:05:09
* @Last Modified by:   tuguilin
* @Last Modified time: 2017-12-19 16:10:53
*/
class songlist{
	constructor(song){
		this.name=song.songname,
		this.mid=song.songmid,
		this.albumname = song.albumname,
		this.id=song.songid,
		this.albumid=song.albummid
		this.singername=song.singer[0].name
	}
}

export function createsong(song){
	return new songlist(song)
}