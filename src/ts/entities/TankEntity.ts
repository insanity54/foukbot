import AttackableEntity from '~/ts/entities/AttackableEntity';
import TankMaster from '~/ts/interfaces/TankMaster';

export default class TankEntity extends AttackableEntity {
	public tankId: number = 0;

	constructor (tankMaster: TankMaster) {
		super();
		this.tankId = tankMaster.tankId;
		this.maxHealth = tankMaster.maxHealth;
		this.currentHealth = this.maxHealth;
	}
}