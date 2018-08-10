import { Injectable } from "@angular/core";
import { Device } from "./device";

@Injectable()
export class DevicesService {
  constructor() {}

  private _devices: Device[];

  addDevice(device: Device): void {
    this._devices.push(device);
  }

  removeDevice(device: Device): void {
    var index = this._devices.indexOf(device);
    if (index != -1) {
      this._devices.splice(index, 1);
    }
  }

  getDevices(): Device[] {
    return this._devices;
  }
}
