const { Router } = require('express');
const chat = require('../chat');

const router = new Router();

router.get('/:channel', (req, res) => {
	const { channel } = req.params;

	if (typeof channel === 'undefined' || channel === "") return res.send('a channel is required in the URL. Example: /channel/cj_clippy');


	// 1) tap into socket namespace for this channel
	// 2) render a game page

	res.send()

})


module.exports = router;