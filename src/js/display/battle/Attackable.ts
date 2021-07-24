import { Sprite, Container, Point } from 'pixi.js';
import UpdateObject from 'interfaces/UpdateObject';

export default abstract class Attackable implements UpdateObject {
	public sprite!: Sprite;

	protected spawnedPosition!: Point;

	protected elapsedFrameCount: number = 0;

	protected destroyed: boolean = false;

	constructor (spawnPosition: { x: number, y: number }) {
		this.sprite = new Sprite();

	}
}