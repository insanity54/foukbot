import { utils, Container } from 'pixi.js';

import Attackable from 'display/battle/Attackable';
import HealthGauge from 'display/battle/single_shot/HealthGauge';
import UnitParams from 'interfaces/UnitParams';

export default class Tank extends Attackable {
	protected healthGauge: HealthGauge | null = null;

	public container: Container;

	constructor (params: UnitParams) {
		const { spawnPosition } = params;
		
		super(spawnPosition);

		this.container = new Container();

		let turret = new Sprite(resourceId["tank_02_turret.png"]);
		let cannon = new Sprite(resourceId["tank_02_cannon.png"]);
		let hull = new Sprite(resourceId["tank_02_hull.png"]);

		hull.anchor.set(0.5, 0.5)
		hull.position.set(170, 70);
		hull.scale.set(0.25, 0.25);

		turret.anchor.set(0.5, 0.5)
		turret.position.set(165, 50);
		turret.scale.set(0.25, 0.25);

		cannon.anchor.set(0, 0.5);
		cannon.position.set(170, 40);
		cannon.scale.set(0.25, 0.25);
		cannon.rotation = -0.5;

		this.container.addChild(hull);
		this.container.addChild(turret);
		this.container.addChild(cannon);

		container.position.set(
			spawnPosition.x,
			spawnPosition.y
		)


	}



}