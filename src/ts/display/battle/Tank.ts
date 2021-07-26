import { utils, Container, Sprite } from 'pixi.js';

import Attackable from '~/ts/display/battle/Attackable';
import HealthGauge from '~/ts/display/battle/HealthGauge';
import TankParams from '~/ts/interfaces/TankParams';
import Resource from '~/ts/Resource';

export default class Tank extends Attackable {
	protected healthGauge: HealthGauge | null = null;

	public container: Container;
	public explodeContainer: Container = new Container();


	protected tankId: number;

	private turret: Sprite;
	private hull: Sprite;
	private cannon: Sprite;

	constructor (params: TankParams) {
		const { spawnPosition, tankId } = params;
		
		super(spawnPosition);

		this.tankId = tankId;

		this.container = new Container();

		this.turret = new Sprite(Resource.Dynamic.Tank(tankId).turret);
		this.cannon = new Sprite(Resource.Dynamic.Tank(tankId).cannon);
		this.hull = new Sprite(Resource.Dynamic.Tank(tankId).hull);

		this.hull.anchor.set(0.5, 0.5)
		this.hull.position.set(170, 70);
		this.hull.scale.set(0.25, 0.25);

		this.turret.anchor.set(0.5, 0.5)
		this.turret.position.set(165, 50);
		this.turret.scale.set(0.25, 0.25);

		this.cannon.anchor.set(0, 0.5);
		this.cannon.position.set(170, 40);
		this.cannon.scale.set(0.25, 0.25);
		this.cannon.rotation = -0.5;

		this.container.addChild(this.hull);
		this.container.addChild(this.turret);
		this.container.addChild(this.cannon);

		this.container.position.set(
			spawnPosition.x,
			spawnPosition.y
		)
	}

	public update(_dt: number): void {
		this.updateAnimation();
	}



}