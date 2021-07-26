import { Application } from 'pixi.js';
import GameManagerParams from '~/ts/interfaces/GameManagerParams';
import Scene from '~/ts/scenes/Scene';


/*
 * greets https://github.com/dolow/pixi-tower-diffense/blob/master/src/managers/GameManager.ts
 */
export default class GameManager {
	public static instance: GameManager;
	public game: Application;

	private currentScene?: Scene;

	constructor (app) {
		this.game = app;
	}

	public static start(params: GameManagerParams) {
		const game = new Application(
			params.options
		);

		const instance = new GameManager(game);
		GameManager.instance = instance;


		document.body.appendChild(game.view);


		// game loop
		game.ticker.add((delta: number) => {
			if (instance.currentScene) {
				instance.currentScene.update(delta)
			}

			// @todo update sound manager
			// SoundManager.update(delta);
		})
	}

	public static loadScene(newScene: Scene): void {
		const instance = GameManager.instance;

		if (!instance.currentScene) {
			newScene.beginLoadResource(() => {
				instance.sceneResourceLoaded = true;
				instance.currentScene = newScene;
			});
		}
	}
}
		
	
