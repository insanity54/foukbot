import { Loader, Container } from 'pixi.js';
import UpdateObject from '~/ts/interfaces/UpdateObject';
import LoaderAddParam from '~/ts/interfaces/LoaderAddParam'


export default abstract class Scene extends Container {
	protected elapsedFrameCount: number = 0;
	protected objectsToUpdate: UpdateObject[] = [];

	public update (delta: number): void {
		this.elapsedFrameCount++;
		this.updateRegisteredObjects(delta);
	}

	protected registerUpdatingObject(object: UpdateObject): void {
		this.objectsToUpdate.push(object);
	}

	protected updateRegisteredObjects(delta: number): void {
		const nextObjectsToUpdate = [];
		for (let i = 0; i < this.objectsToUpdate.length; i++) {
			const obj = this.objectsToUpdate[i];
			if (!obj || obj.isDestroyed()) {
				continue;
			}
			obj.update(delta);
			nextObjectsToUpdate.push(obj);
		}

		this.objectsToUpdate = nextObjectsToUpdate;
	}

	public beginLoadResource(onLoaded: () => void): Promise<void> {
		return new Promise<void> ((resolve) => {
		  this.loadInitialResource(() => resolve());
		}).then(() => {
		  onLoaded();
		}).then(() => {
		  this.onResourceLoaded();
		});
	}

	protected createInitialResourceList(): (LoaderAddParam | string)[] {
		return [];
	}

	protected loadInitialResource(onLoaded: () => void): void {
		const assets = this.createInitialResourceList();

		Loader.shared.add(assets).load(() => onLoaded());
	}



	protected updateRegisteredObjects(delta: number): void {
		const nextObjectsToUpdate = [];

		for (let i = 0; i < this.objectsToUpdate.length; i++) {
			const obj = this.objectsToUpdate[i];
			if (!obj || obj.isDestroyed()) {
				continue;
			}
			obj.update(delta);
			nextObjectsToUpdate.push(obj);
		}

		this.objectsToUpdate = nextObjectsToUpdate;
	}

	protected onResourceLoaded(): void {
		
		// @todo add sprite or container to scene
		
	}
	

}