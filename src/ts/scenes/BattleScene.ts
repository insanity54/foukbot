import { Loader } from 'pixi.js';

import UpdateObject from '~/ts/interfaces/UpdateObject';
import Resource from '~/ts/Resource';
import TankEntity from '~/ts/entities/TankEntity';
import Tank from '~/ts/display/battle/Tank';
import Field from '~/ts/display/battle/Field';
import Scene from '~/ts/scenes/Scene';
import BattleLogic from '~/ts/modules/BattleLogic';
import BattleLogicConfig from '~/ts/modules/BattleLogicConfig';

export default class BattleScene extends Scene implements BattleLogicDelegate {

	private attackables: Map<number, Attackable> = new Map();
	private field!: Field;

	constructor (params: BattleParameter) {
		super();
		this.battleLogic = new BattleLogic();
		this.unitIds = params.unitIds;
		this.battleLogicConfig = new BattleLogicConfig({

		})
	}

	public update (delta: number): void {
		this.battleLogic.update();
		this.updateRegisteredObjects(delta);
	}

	protected onResourceLoaded(): void {
		super.onResourceLoaded();

		const resources = Loader.shared.resources;
		const tankMaster = resources['atlas/tanks.json'].data;


		this.battleLogic.init({
			tankMasters: [tankMaster]
		})
	}

	public onScreenTapped (): void {
		this.battleLogic.requestSpawn(2);
	}

	public onTankEntitySpawned(entity: TankEntity): void {
		// const stageMaster = Loader.shared.resources[Resource.Api.Stage(this.stageId)].data;


		const tankY = 100; // tank will spawn in the sky and fall to the ground

		// choose where to put the tank sprite
		const tankX = Math.floor(Math.random() * stageMaster.length) + 1

		const tank = new Tank(entity.tankId, { x: tankX, y: tankY });

		this.attackables.set(entity.id, tank);

		this.field.addChild(tank.sprite);
		this.registerUpdatingObject(tank as UpdateObject);

	}

	protected createInitialResourceList(): (LoaderAddParam | string)[] {
		let assets = super.createInitialResourceList();
		assets = assets.concat(
			[Resource.Static.Tanks]
		);

		return assets;
	}
}