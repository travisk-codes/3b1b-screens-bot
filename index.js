var Twit = require('twit')
var config = require('./config')
config = config.config

var T = new Twit({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token: config.access_token,
	access_token_secret: config.access_token_secret,
	timeout_ms: 60 * 1000,
})

T.post('statuses/update', { status: 'test?' }, (e, data, res) => {
	console.log(data)
})
