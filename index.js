const fs = require('fs')
var Twit = require('twit')

var config = require('./config')
config = config.twitter_keys

const T = new Twit({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token: config.access_token,
	access_token_secret: config.access_token_secret,
})

function randomImage() {
	let rand = Math.random() * 540
	rand = Math.round(rand)
	return `./screencaps/screen${rand}.png`
}

function tweetScreencap() {
	T.postMediaChunked({ file_path: randomImage() }, (e, data, res) => {
		console.log(data)
		const params = { status: 'test', media_ids: [data.media_id_string] }
		T.post('statuses/update', params, (err, dat, res) => console.log(dat))
	})
}
tweetScreencap()

//setInterval(tweetScreencap, 1000 * 60 * 60)

/*
1. every hour
2. load random image
3. post with video title and url-at-time
*/
