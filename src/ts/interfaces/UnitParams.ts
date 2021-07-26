import { SpawnPosition } from '~/ts/interfaces/SpawnPosition';


interface UnitParams<T extends SpawnPosition = SpawnPosition> {
	spawnPosition: T
}

export default UnitParams;