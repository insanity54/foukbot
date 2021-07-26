


import Resource from '~/ts/Resource';
import GameManager from '~/ts/managers/GameManager';
import { IApplicationOptions } from 'pixi.js';
import GameManagerParams from '~/ts/interfaces/GameManagerParams';
import BattleScene from '~/ts/scenes/BattleScene';
import BattleParameter from '~/ts/interfaces/BattleParameter';

// let gameDiv = document.getElementById('game');


function createBattleParameter(): BattleParameter {
	const unitIds: number[] = [];
	return {
		unitIds
	}
}


function initGame() {
	const width = 1280;
	const height = 720;

	const pixiAppOptions: IApplicationOptions = {
		width,
		height,
		backgroundColor: 0x0000ff
	}

	GameManager.start({
		glWidth: width,
		glHeight: height,
		options: pixiAppOptions
	});

	const params = createBattleParameter();

	GameManager.loadScene(new BattleScene(params));
}

window.onload = () => {
	initGame();
}