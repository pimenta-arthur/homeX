import { IDevice } from '../../devices/shared/device';

export interface IRoom {
  id?: string;
  color: string;
  cols?: number;
  name: string;
  devices: any[];
}
