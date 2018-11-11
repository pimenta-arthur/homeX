import { IDevice } from '../../devices/shared/device';

export interface IRoom {
  color: string;
  cols: number;
  name: string;
  devices: IDevice[];
}
