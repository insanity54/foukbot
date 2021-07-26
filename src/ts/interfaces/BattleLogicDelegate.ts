import AttackableEntity from '~/ts/entity/AttackableEntity';
import TankEntity from '~/ts/entity/TankEntity';

export default interface BattleLogicDelegate {
	onTankEntitySpawned(entity: TankEntity): void;
	onAttackableEntityHealthUpdated(
		attacker: AttackableEntity,
		target: AttackableEntity,
		fromHealth: number,
		toHealth: number,
		maxHealth: number
	): void;
}