
import { TankResource } from '~/ts/interfaces/TankResource';

function tankIdToString (tankId: number): string {
	if (tankId < 10) {
		return `0${tankId}`;
	} else {
		return `${tankId}`;
	}
}

export default Object.freeze({
	Api: {
		Tank: (tankIds: number[]): string => {
			const query = tankIds.join()
		}
	},
	Static:	{
		Tanks: [
			'atlas/tanks.json',
		]
	},
	Dynamic: {
		Tank: (tankId: number): TankResource => {
			return {
				hull: `atlas/tank_${tankIdToString(tankId)}_hull.png`,
				turret: `atlas/tank_${tankIdToString(tankId)}_turret.png`,
				cannon: `atlas/tank_${tankIdToString(tankId)}_cannon.png`
			}
		}
	}

	// TextureFrame: {
	// 	Tank: (tankNumber: number = 1): Texture => {
	// 		return utils.TextureCache[]
	// 	}
	// }
});


