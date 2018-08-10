import { Device } from "../../devices/shared/device";

export interface Room {
  color: string;
  cols: number;
  rows: number;
  name: string;
  devices: Device[];
}
