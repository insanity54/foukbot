import { Application, Scene } from 'pixi.js';
import { GameManagerParams } from '../interfaces/GameManagerParams';

/*
 * greets https://github.com/dolow/pixi-tower-diffense/blob/master/src/managers/GameManager.ts
 */
export default class GameManager {
	public game: Application;

	private currentScene: Scene;

	constructor (app) {
		this.game = app;
	}

	public static start(params: GameManagerParams) {
		const game = new Application(
			params.width,
			params.height,
			params.options
		);


		const instance = new GameManager(game);
		GameManager.instance = instance;

		document.body.appendChild(game.view);


		// game loop
		game.ticker.add((delta) => {
			if (instance.currentScene) {
				instance.currentScene.update(delta)
			}
		})
	}
}