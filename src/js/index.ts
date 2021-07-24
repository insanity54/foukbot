
import Resource from 'Resource';
import GameManager from 'managers/GameManager';
import { ApplicationOptions } from 'pixi.js';
import { GameManagerParams } from 'interfaces/GameManagerParams';

// let gameDiv = document.getElementById('game');



function initGame() {
	const width = 1280;
	const height = 720;

	const pixiAppOptions: ApplicationOptions = {
		backgroundColor: 0x0000ff
	}

	GameManager.start({
		glWidth: width,
		glHeight: height,
		option: pixiAppOptions
	});

	// @todo load scene
	// GameManager.loadScene(new TitleScene());
}

window.onload = () => {
	initGame();
}