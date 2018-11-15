import { Injectable } from '@angular/core';
import { IDevice } from './device';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import * as Collections from 'typescript-collections';
import { AuthService } from 'src/app/core/auth.service';

@Injectable()
export class DevicesService {
  private _devices: BehaviorSubject<IDevice[]> = new BehaviorSubject<IDevice[]>(
    []
  );
  // devices: any;
  dic = new Collections.Dictionary<string, any>();

  constructor(db: AngularFireDatabase, private auth:  AuthService) {
    console.log(auth.currentUser);
    const hubDevices = db.list('hubs/-LRFGpldtgETG9teSTp3/devices');

    hubDevices.stateChanges(['child_changed']).subscribe(actions => {
      console.log('changed');
      console.log(actions.key);
      console.log(actions.payload.val());
    });

    hubDevices.stateChanges(['child_added']).subscribe(actions => {
      console.log('added');
      console.log(actions.key);
      console.log(actions.payload.val());
    });

    hubDevices.stateChanges(['child_removed']).subscribe(actions => {
      console.log('removed');
      console.log(actions.key);
      console.log(actions.payload.val());
    });
  }

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

  loadDevicesByUserHub(hubId: string): void {
    console.log('load devices here');
  }
}
