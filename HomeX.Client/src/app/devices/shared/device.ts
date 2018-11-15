import { IDeviceType } from './device-type';

export interface IDevice {
  id?: string;
  name: string;
  nwkAddress?: string;
  roomId?: string;
  type: IDeviceType;
  status?: any;
}
