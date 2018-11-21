import { IDeviceType } from './device-type';

export interface IDevice {
  macAddress?: string;
  name: string;
  nwkAddress?: string;
  roomId?: string;
  type: any;
  status?: any;
}
