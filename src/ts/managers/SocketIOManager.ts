
import { io } from 'socket.io-client';


export default class SocketIOManager {


	constructor () {

	}

	public init () {
		this.socket = io();

		this.socket.on('join', this.handleJoin);
	}


	private handleJoin () {

	}
}