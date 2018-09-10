import { IDeviceType } from "./device-type";

export interface IDevice {
  name: string;
  type: IDeviceType;
  status?: any;
}
