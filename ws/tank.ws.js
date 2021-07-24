


const handleIncomingConnection = (socket) => {
	console.log(`🦌 ws conn. est. ID: ${socket.client.id}. User? ${socket.request.user}`);

	if (!socket.request.user) {
		console.warn(`Ignoring unauthorized socket.io user ${socket.client.id}`)
		return;
	}

	if (!socket.request.user.id) {
		console.error(`socket request user did not have an id, which is required`)
		return;
	}

	if (!socket.request.user.displayName) {
		console.error(`socket request user did not have an displayName, which is required`)
		return;
	}

	if (!socket.request.user.profileImageUrl) {
		console.error(`socket request user did not have an profileImageUrl, which is required`)
		return;
	}

	const { id, displayName, profileImageUrl } = socket.request.user;

	// prepare to emit on user-specific room
	socket.to(id);

	// emit join event
	socket.emit('join', { id, displayName, profileImageUrl });
}


const tankSocketHandler = (io) => {
	io.on('connection', handleIncomingConnection);
};




module.exports = {
	tankSocketHandler
}