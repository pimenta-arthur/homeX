import { Injectable } from '@angular/core';
import { IDevice } from './device';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class DevicesService {
  constructor(db: AngularFireDatabase) {
    const bla = db;
    console.log(db.createPushId());
    console.log(bla);
  }

  private _devices: BehaviorSubject<IDevice[]> = new BehaviorSubject<IDevice[]>([]);

  addDevice(device: IDevice): void {
    this._devices.next(this._devices.getValue().concat(device));
  }

  removeDevice(device: IDevice): void {
    const index = this._devices.getValue().indexOf(device);
    if (index !== -1) {
      this._devices.getValue().splice(index, 1);
    }
  }

  get getDevices(): BehaviorSubject<IDevice[]> {
    return this._devices;
  }
}
