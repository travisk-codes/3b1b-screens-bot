const fs = require('fs')
const Twit = require('twit')
const jimp = require('jimp')

var config = require('./config')
config = config.twitter_keys

const T = new Twit({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token: config.access_token,
	access_token_secret: config.access_token_secret,
})

const video_info = [
	["Divergence and curl: The language of Maxwell's equations, fluid flow, and more", 'rB83DpBJQsE', 941],
	["Visualizing quaternions (4d numbers) with stereographic projection", 						 'd4EgbgTm0Bg', 1907],
	["A Curious Pattern Indeed", '84hEmGHw3J8', 108],
	["Euler's Formula Poem", "zLzLxVeqdQg", 63],
	//[ "3blue1brown channel trailer", 'R7p-nPg8t_g', 93],
	//['Fractal charm: Space filling curves', 'RU0wScIj36o', 155],
	[ "Higher order derivatives | Essence of calculus, chapter 10", 'BLkz5LGWihw', 338],
	[ "Pure Fourier series animation montage", '-qgreAUpPwM', 749],
	[ "Differential equations, studying the unsolvable | DE1", 'p_di4Zn4wz4', 1637],
	["Why do prime numbers make these spirals?", 'EK32jo7i5LQ', 1351],
	["Some light quantum mechanics (with minutephysics)", "MzRCDLre1b4", 1341],
	['But what is a Fourier series From heat flow to circle drawings', 'r6sGWTCMz2k', 1484],
	['But why is a sphere\'s surface area four times its shadow', 'GNcFjFmqEc8', 1021]
	['But what is a partial differential equation', 'ly4S0oi3Yz8', 1060],
	['The more general uncertainty principle, beyond quantum', 'MBnnXbOM5S4', 1088], 
	['How colliding blocks act like a beam of light...to compute pi.','brU5yLm9DZM'882],
]

function randomImage() {
	let rand_video = Math.floor(Math.random() * video_info.length)
	console.log(rand_video)
	let rand_time = Math.round(Math.random() * video_info[rand_video][2])
	let video_id = video_info[rand_video][1]
	let video_title = video_info[rand_video][0]
	const path = `../screencaps/${video_id}/${rand_time}.png`
	return [path, video_title, video_id, rand_time]
}

function tweetScreencap() {
	const post_data = randomImage()
	console.log(post_data)
	const status = post_data[1] + ` https://youtu.be/${post_data[2]}?t=${post_data[3]}`
	const img = fs.readFileSync(post_data[0], { encoding: 'base64' })
	T.post('media/upload', { media_data: img }, (err, dat, res) => {
		console.log(dat)
		const params = { status: status, media_ids: [dat.media_id_string] }
		T.post('statuses/update', params, (err, dat, res) => console.log(dat))
	})
}

tweetScreencap()
setInterval(tweetScreencap, 1000 * 60)

