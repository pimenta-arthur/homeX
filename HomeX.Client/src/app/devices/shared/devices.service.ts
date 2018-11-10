import { Injectable } from "@angular/core";
import { IDevice } from "./device";

@Injectable()
export class DevicesService {
  constructor() {}

  private _devices: IDevice[] = new Array<IDevice>();

  addDevice(device: IDevice): void {
    this._devices.push(device);
  }

  removeDevice(device: IDevice): void {
    let index = this._devices.indexOf(device);
    if (index != -1) {
      this._devices.splice(index, 1);
    }
  }

  getDevices(): IDevice[] {
    return this._devices;
  }
}
