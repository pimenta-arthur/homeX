import { Injectable } from '@angular/core';
import { IDevice } from './device';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Dictionary } from 'typescript-collections';
import { AuthService } from '../../core/auth.service';
import { DeviceType } from './device-type';

@Injectable()
export class DevicesService {
  private _devices: BehaviorSubject<IDevice[]> = new BehaviorSubject<IDevice[]>(
    []
  );
  private _devicesDict: BehaviorSubject<
    Dictionary<string, any>
  > = new BehaviorSubject<Dictionary<string, any>>(
    new Dictionary<string, any>()
  );

  constructor(private db: AngularFireDatabase) {}

  // TODO: essa funcão não vai existir, acões de adicionar, remover e atualizar dispositivos no banco
  // serão todas feitas pelo hub
  addDevice(device: IDevice, hubId: string): void {
    const deviceRef = this.db.object(`hubs/${hubId}/devices/${device.macAddress}`).update(device);
    // const dict: Dictionary<string, any>  = this._devicesDict.getValue();
    // dict.setValue(device.id, device);
    // this._devicesDict.next(dict);
  }

  // TODO: essa funcão não vai existir, acões de adicionar, remover e atualizar dispositivos no banco
  // serão todas feitas pelo hub
  removeDevice(device: IDevice): void {
    // if (this._devicesDict.getValue().containsKey(device.id)) {
    //   const dict: Dictionary<string, any> = this._devicesDict.getValue();
    //   dict.remove(device.id);

    //   this._devicesDict.next(dict);
    // }
  }

  updateDeviceRoomIdByUserHub(hubId: string, deviceId: string, roomId: string): void {
    console.log('Updated devices roomId');
    const hubRoomsRef = this.db.list(`hubs/${hubId}/devices`);
    hubRoomsRef.update(deviceId, {roomId: roomId});
  }

  get getDevices(): Observable<Dictionary<string, any>> {
    return this._devicesDict;
  }

  listenDevicesByUserHub(hubId: string): void {
    console.log('Listening hub devices');
    const hubDevices = this.db.list(`hubs/${hubId}/devices`);

    hubDevices.stateChanges(['child_changed']).subscribe(result => {
      let device: IDevice;
      device = <IDevice>result.payload.val();
      device.type = DeviceType.propertiesOf(device.type);
      // device.macAddress = result.key;

      // this.updateDevice(device);
      if (this._devicesDict.getValue().containsKey(device.macAddress)) {
        const dict: Dictionary<string, any> = this._devicesDict.getValue();
        dict.setValue(device.macAddress, device);

        this._devicesDict.next(dict);
      }

      console.log('Device updated successfully');
      console.log(this._devicesDict.getValue());
    });

    hubDevices.stateChanges(['child_added']).subscribe(result => {
      let device: IDevice;
      device = <IDevice>result.payload.val();
      device.type = DeviceType.propertiesOf(device.type);
      // device.macAddress = result.key;

      // this._devicesDict.getValue().setValue(device.id, device);
      // this.addDevice(device);
      const dict: Dictionary<string, any> = this._devicesDict.getValue();
      dict.setValue(device.macAddress, device);

      this._devicesDict.next(dict);

      console.log('Device added successfully');
      console.log(this._devicesDict.getValue());
    });

    hubDevices.stateChanges(['child_removed']).subscribe(result => {
      let device: IDevice;
      device = <IDevice>result.payload.val();
      device.type = DeviceType.propertiesOf(device.type);
      // device.macAddress = result.key;

      // this._devicesDict.getValue().remove(result.key);
      // this.removeDevice(device);
      if (this._devicesDict.getValue().containsKey(device.macAddress)) {
        const dict: Dictionary<string, any> = this._devicesDict.getValue();
        dict.remove(device.macAddress);

        this._devicesDict.next(dict);
      }

      console.log('Device removed successfully');

      console.log(this._devicesDict.getValue());
    });
  }
}
