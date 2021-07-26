import { SpawnPosition } from '~/ts/interfaces/SpawnPosition';

interface TankParams<T extends SpawnPosition = SpawnPosition> {
	tankId: number,
	spawnPosition: T
}

export default TankParams;