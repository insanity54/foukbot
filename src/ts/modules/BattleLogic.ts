import TankMaster from '~/ts/interfaces/TankMaster';
import UnitMaster from '~/ts/interfaces/UnitMaster';
import BattleLogicDelegate from '~/ts/interfaces/BattleLogicDelegate';
import BattleLogicConfig from '~/ts/modules/BattleLogicConfig';
import TankEntity from '~/ts/entities/TankEntity';
import AttackableEntity from '~/ts/entities/AttackableEntity';

export default class BattleLogic {

	private config: BattleLogicConfig = Object.freeze(new BattleLogicConfig());
	private nextEntityId: number = 0;
	private tankEntities?: TankEntity[];
	private attackableEntities: AttackableEntity[] = [];
	private spawnRequestedTankIds: {
		tankId: number
	}[] = [];
	private tankMasterCache: Map<number, TankMaster> = new Map();
  	private delegator?: BattleLogicDelegate;

	public init(params: {
		delegator: BattleLogicDelegate,
		config?: BattleLogicConfig
		tankMasters: TankMaster[]
	}): void {
		if (params.config) {
			this.config = Object.freeze(params.config);
		}

		this.tankMasterCache.clear();
		this.requestSpawn(2);
	}

	public update(): void {
		this.updateSpawnRequest();
	}

	public requestSpawn(tankId: number): void {
		this.spawnRequestedTankIds.push({ tankId });
	}

	private updateSpawnRequest(): void {
		if (this.spawnRequestedTankIds.length === 0) {
			return;
		}


		for (let i = 0; i < this.spawnRequestedTankIds.length; i++) {
			const reservedTank = this.spawnRequestedTankIds[i];

			const master = this.tankMasterCache.get(reservedTank.tankId);

			if (!master) {
				continue;
			}

			const entity = new TankEntity(reservedTank.tankId);

			entity.id = this.nextEntityId++;
			entity.maxHealth = master.maxHealth;
			entity.currentHealth = master.maxHealth;

			this.attackableEntities.push(entity);

			if (this.delegator) {
				this.delegator.onTankEntitySpawned(entity);
			}
		}

		this.spawnRequestedTankIds = [];
	}

	private spawnTank(tank: TankMaster): TankEntity {
		const entity = new TankEntity(tank);

		entity.id = this.nextEntityId++;
		this.attackableEntities.push(entity);

		if (this.delegator) {
			this.delegator.onTankEntitySpawned(entity);
		}

		return entity;
	}
}