import AttackableMaster from '~/ts/interfaces/AttackableMaster';

interface TankMaster extends AttackableMaster {
  tankId: number,
  maxHealth: number
}

export default TankMaster;