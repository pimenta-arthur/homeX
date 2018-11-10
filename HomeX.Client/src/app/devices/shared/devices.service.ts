import { Injectable } from "@angular/core";
import { IDevice } from "./device";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DevicesService {
  constructor() {}

  private _devices: BehaviorSubject<IDevice[]> = new BehaviorSubject<IDevice[]>([]);

  addDevice(device: IDevice): void {
    this._devices.next(this._devices.getValue().concat(device));
  }

  removeDevice(device: IDevice): void {
    let index = this._devices.getValue().indexOf(device);
    if (index != -1) {
      this._devices.getValue().splice(index, 1);
    }
  }

  get getDevices(): BehaviorSubject<IDevice[]> {
    return this._devices;
  }
}
